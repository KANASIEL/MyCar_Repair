import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Notice_view.css";

// 추후 커스텀 모달로 교체
const showConfirm = (message) => window.confirm(message);

export default function NoticeView() {
    const { notice_no } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [notice, setNotice] = useState(null);
    const [pageMaker, setPageMaker] = useState(null);
    const [role, setRole] = useState(sessionStorage.getItem("ROLE") || "GUEST");
    const [loading, setLoading] = useState(true);

    const searchParams = new URLSearchParams(location.search);
    const pageNum = Math.max(1, parseInt(searchParams.get("pageNum") || "1", 10));
    const amount = parseInt(searchParams.get("amount") || "10", 10);

    // 공지사항 상세 불러오기 (프록시 사용!)
    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await axios.get(`/api/notice/view/${notice_no}`, {
                    params: { pageNum, amount },
                    withCredentials: true,  // 세션 유지
                });

                setNotice(res.data.view);
                setPageMaker(res.data.pageMaker || null);
            } catch (err) {
                console.error("공지사항 조회 실패:", err);
                if (err.response?.status === 404) {
                    alert("삭제되었거나 존재하지 않는 공지사항입니다.");
                } else {
                    alert("공지사항을 불러올 수 없습니다.");
                }
                navigate("/notice/list", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchNotice();
    }, [notice_no, pageNum, amount, navigate]);

    // 실시간 ROLE 감지
    useEffect(() => {
        const updateRole = () => {
            setRole(sessionStorage.getItem("ROLE") || "GUEST");
        };
        updateRole();
        window.addEventListener("storage", updateRole);
        window.addEventListener("sessionUpdated", updateRole);
        return () => {
            window.removeEventListener("storage", updateRole);
            window.removeEventListener("sessionUpdated", updateRole);
        };
    }, []);

    const goToList = () => {
        const page = pageMaker?.cri?.pageNum || pageNum;
        const amt = pageMaker?.cri?.amount || amount;
        navigate(`/notice/list?pageNum=${page}&amount=${amt}`);
    };

    const goToModify = () => {
        navigate(`/notice/modify/${notice_no}?pageNum=${pageNum}&amount=${amount}`);
    };

    const deleteNotice = async () => {
        if (!showConfirm("정말로 이 공지사항을 삭제하시겠습니까?")) return;
        if (role !== "ADMIN") return alert("삭제 권한이 없습니다.");

        try {
            await axios.delete(`/api/notice/view/${notice_no}`, {
                withCredentials: true,
            });

            alert("공지사항이 삭제되었습니다.");
            goToList();
        } catch (err) {
            alert(err.response?.data?.message || "삭제 실패했습니다.");
        }
    };

    if (loading) {
        return (
            <div className="notice-view-loading">
                <div className="notice-view-spinner"></div>
                <p>공지사항을 불러오는 중...</p>
            </div>
        );
    }

    if (!notice) {
        return (
            <div className="notice-view-empty">
                <p>공지사항을 찾을 수 없습니다.</p>
                <button onClick={goToList} className="notice-view-btn-list">
                    목록으로
                </button>
            </div>
        );
    }

    return (
        <main className="notice-view-main">
            <section className="notice-view-header">
                <h2 className="notice-view-title">{notice.notice_title}</h2>
                <div className="notice-view-info">
                    <span className="notice-view-writer">
                        작성자: {notice.notice_writer || "관리자"}
                    </span>
                    <span className="notice-view-date">{notice.notice_created}</span>
                    <span className="notice-view-views">
                        조회수: {notice.notice_views || 0}
                    </span>
                </div>
                <hr className="notice-view-divider" />
            </section>

            <article className="notice-view-content">
                <div
                    className="notice-view-content-inner"
                    dangerouslySetInnerHTML={{ __html: notice.notice_content }}
                />
            </article>

            <hr className="notice-view-divider" />

            <section className="notice-view-actions">
                <div className="notice-view-button-group">
                    {role === "ADMIN" && (
                        <>
                            <button onClick={goToModify} className="notice-view-btn-modify">
                                수정
                            </button>
                            <button onClick={deleteNotice} className="notice-view-btn-delete">
                                삭제
                            </button>
                        </>
                    )}
                    <button onClick={goToList} className="notice-view-btn-list">
                        목록
                    </button>
                </div>
            </section>
        </main>
    );
}