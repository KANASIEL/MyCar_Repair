// src/pages/inquiry/ReplyWrite.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InquiryFloating from "../../components/common/InquiryFloating";
import "./Reply_write.css" // 💡 CSS 파일명도 ReplyWrite.css로 변경했다고 가정

export default function ReplyWrite() {
    const [reply, setReply] = useState({});
    const [role, setRole] = useState(sessionStorage.getItem("ROLE") || "");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { inquiry_no } = useParams();

    const fetchReply = useCallback(async () => {
        if (!inquiry_no) {
            navigate("/manage");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.get(`/api/inquiry/reply_write/${inquiry_no}`, {
                withCredentials: true,
            });

            if (res.data.redirect) {
                navigate(res.data.redirect);
                return;
            }

            setReply(res.data.reply || {});
        } catch (err) {
            alert("문의 정보를 불러올 수 없습니다.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [inquiry_no, navigate]);

    useEffect(() => {
        fetchReply();
    }, [fetchReply]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            await axios.post("/api/inquiry/replyProcess", new URLSearchParams(data), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                withCredentials: true,
            });
            alert("답변이 저장되었습니다.");

            navigate(`/inquiry/view/${inquiry_no}`);
        } catch (err) {
            alert("저장 실패");
            console.error(err);
        }
    };

    if (loading) return <div className="reply-write-loading">로딩 중...</div>;

    return (
        <main className="reply-write-page">
            <InquiryFloating role={role} />

            <div className="reply-write-container">
                <section className="reply-write-header">
                    <h2 className="reply-write-title">{reply.inquiry_title}</h2>
                    <hr className="reply-write-divider" />
                </section>

                <article className="reply-write-body">
                    <div
                        className="reply-write-content"
                        dangerouslySetInnerHTML={{ __html: reply.inquiry_content }}
                    />
                    <div className="reply-write-meta">
                        <span className="reply-write-date">{reply.inquiry_created}</span>
                    </div>
                </article>

                <form onSubmit={handleSubmit} className="reply-write-form">
                    {/* input value에 inquiry_no 사용 */}
                    <input type="hidden" name="inquiry_no" value={inquiry_no} />
                    <section className="reply-write-reply-section">
                        <h3 className="reply-write-reply-title">관리자 답변</h3>
                        <textarea
                            name="reply_content"
                            className="reply-write-content-area"
                            rows="10"
                            defaultValue={reply.reply_content || ""}
                            required
                        />
                    </section>
                    <div className="reply-write-submit">
                        <button type="submit" className="reply-write-btn reply-write-btn-primary">
                            {reply.reply_content ? "수정" : "답변"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}