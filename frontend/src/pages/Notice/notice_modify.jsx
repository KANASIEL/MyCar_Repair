import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Notice_modify.css";

export default function NoticeModify() {
    const { notice_no } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    // 당신이 원하는 방식! role 하나로 통일
    const [role, setRole] = useState(sessionStorage.getItem("ROLE") || "GUEST");

    // role이 "ADMIN"이면 true → 편리하게 사용
    const isAdmin = role === "ADMIN";

    const searchParams = new URLSearchParams(location.search);
    const pageNum = Math.max(1, parseInt(searchParams.get("pageNum") || "1", 10));
    const amount = parseInt(searchParams.get("amount") || "10", 10);

    // 실시간 ROLE 감지 (storage + 커스텀 이벤트)
    useEffect(() => {
        const updateRole = () => {
            const newRole = sessionStorage.getItem("ROLE") || "GUEST";
            setRole(newRole);
        };

        updateRole(); // 즉시 반영

        window.addEventListener("storage", updateRole);
        window.addEventListener("sessionUpdated", updateRole);

        return () => {
            window.removeEventListener("storage", updateRole);
            window.removeEventListener("sessionUpdated", updateRole);
        };
    }, []);

    // 권한 없으면 차단 (깜짝 alert 없음!)
    useEffect(() => {
        if (!isAdmin) {
            alert("관리자만 공지사항을 수정할 수 있습니다.");
            navigate("/notice/list", { replace: true });
        }
    }, [isAdmin, navigate]);

    // 데이터 불러오기
    useEffect(() => {
        if (!isAdmin) return;

        const fetchNotice = async () => {
            try {
                const res = await axios.get(`/api/notice/modify/${notice_no}`, {
                    params: { pageNum, amount },
                    withCredentials: true,
                });

                const { notice_title, notice_content } = res.data.notice;
                setTitle(notice_title || "");
                setContent(notice_content || "");
            } catch (err) {
                const status = err.response?.status;
                if (status === 403 || status === 401) {
                    alert("수정 권한이 없습니다.");
                } else if (status === 404) {
                    alert("존재하지 않는 공지사항입니다.");
                } else {
                    alert("공지사항을 불러오는 중 오류가 발생했습니다.");
                }
                navigate("/notice/list", { replace: true });
            } finally {
                setDataLoading(false);
            }
        };

        fetchNotice();
    }, [notice_no, pageNum, amount, navigate, isAdmin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return setMessage("제목을 입력해주세요.");
        if (!content.trim()) return setMessage("내용을 입력해주세요.");

        if (!window.confirm("공지사항을 수정하시겠습니까?")) return;

        setIsLoading(true);
        setMessage("");

        try {
            await axios.put(
                `/api/notice/modify/${notice_no}`,
                { notice_title: title, notice_content: content },
                { withCredentials: true }
            );

            alert("공지사항이 성공적으로 수정되었습니다.");
            navigate(`/notice/view/${notice_no}?pageNum=${pageNum}&amount=${amount}`);
        } catch (err) {
            setMessage(err.response?.data?.message || "수정 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const goToList = () => {
        navigate(`/notice/list?pageNum=${pageNum}&amount=${amount}`);
    };

    // 로딩 중
    if (dataLoading && isAdmin) {
        return (
            <div className="notice-modify-loading">
                <div className="notice-modify-spinner"></div>
                <p>공지사항을 불러오는 중...</p>
            </div>
        );
    }

    // 비관리자는 null → 위에서 리다이렉트 처리
    if (!isAdmin) return null;

    return (
        <main className="notice-modify-main">
            <h1 className="notice-modify-title">공지사항 수정</h1>

            <form onSubmit={handleSubmit} className="notice-modify-form">
                <div className="notice-modify-table-wrapper">
                    <table className="notice-modify-table">
                        <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    id="notice-modify-title"
                                    className="notice-modify-input-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="제목을 입력하세요"
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
                                        id="notice-modify-content"
                                        className="notice-modify-textarea"
                                        rows="18"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="내용을 입력하세요"
                                        disabled={isLoading}
                                        required
                                    />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {message && (
                    <div className={`notice-modify-message ${message.includes("성공") ? "success" : "error"}`}>
                        {message}
                    </div>
                )}

                <div className="notice-modify-buttons">
                    <button type="submit" className="notice-modify-btn-submit" disabled={isLoading}>
                        {isLoading ? "수정 중..." : "수정 완료"}
                    </button>
                    <button type="button" className="notice-modify-btn-cancel" onClick={goToList} disabled={isLoading}>
                        취소
                    </button>
                </div>
            </form>
        </main>
    );
}