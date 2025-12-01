import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notice_write.css";

export default function NoticeWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // 당신이 원하는 방식! role 하나로 통일
    const [role, setRole] = useState(sessionStorage.getItem("ROLE") || "GUEST");
    const isAdmin = role === "ADMIN";  // 편리하게 사용

    const navigate = useNavigate();

    // 실시간 ROLE 감지 (다른 탭 로그인/로그아웃도 즉시 반영)
    useEffect(() => {
        const updateRole = () => {
            const newRole = sessionStorage.getItem("ROLE") || "GUEST";
            setRole(newRole);
        };

        updateRole();

        window.addEventListener("storage", updateRole);
        window.addEventListener("sessionUpdated", updateRole);

        return () => {
            window.removeEventListener("storage", updateRole);
            window.removeEventListener("sessionUpdated", updateRole);
        };
    }, []);

    // 비관리자는 진입 불가
    useEffect(() => {
        if (!isAdmin) {
            alert("관리자만 공지사항을 작성 권한이 있습니다.");
            navigate("/notice/list", { replace: true });
        }
    }, [isAdmin, navigate]);

    // 로딩 중이거나 권한 없을 때
    if (!isAdmin) {
        return (
            <div className="notice-write-loading">
                <div className="notice-write-spinner"></div>
                <p>권한 확인 중...</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setMessage("제목을 입력해주세요.");
            document.getElementById("notice-write-title")?.focus();
            return;
        }

        if (!content.trim()) {
            setMessage("내용을 입력해주세요.");
            document.getElementById("notice-write-content")?.focus();
            return;
        }

        if (!window.confirm("공지사항을 등록하시겠습니까?")) return;

        setIsLoading(true);
        setMessage("");

        try {
            await axios.post(
                "/api/notice/write",  // 프록시 사용! CORS 안 터짐!
                { notice_title: title, notice_content: content },
                { withCredentials: true }
            );

            alert("공지사항이 성공적으로 등록되었습니다.");
            navigate("/notice/list");
        } catch (err) {
            const errorMsg = err.response?.data?.message || "등록 중 오류가 발생했습니다.";
            setMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const goToList = () => {
        navigate("/notice/list");
    };

    return (
        <main className="notice-write-main">
            <h1 className="notice-write-title">공지사항 작성</h1>

            <form onSubmit={handleSubmit} className="notice-write-form">
                <div className="notice-write-table-wrapper">
                    <table className="notice-write-table">
                        <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    id="notice-write-title"
                                    className="notice-write-input-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="공지사항 제목을 입력하세요"
                                    maxLength="100"
                                    disabled={isLoading}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                    <textarea
                                        id="notice-write-content"
                                        className="notice-write-textarea"
                                        rows="20"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="공지사항 내용을 입력하세요."
                                        disabled={isLoading}
                                        required
                                    />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* 메시지 표시 */}
                {message && (
                    <div className={`notice-write-message ${message.includes("성공") ? "success" : "error"}`}>
                        {message}
                    </div>
                )}

                {/* 버튼 그룹 */}
                <div className="notice-write-buttons">
                    <button
                        type="submit"
                        className="notice-write-btn-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "등록 중..." : "등록하기"}
                    </button>
                    <button
                        type="button"
                        className="notice-write-btn-cancel"
                        onClick={goToList}
                        disabled={isLoading}
                    >
                        취소
                    </button>
                </div>
            </form>
        </main>
    );
}