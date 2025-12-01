// src/pages/inquiry/InquiryView.jsx
import React, {useEffect, useState, useCallback} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import InquiryFloating from "../../components/common/InquiryFloating";
import "./InquiryView.css";

export default function InquiryView() {
    const [inquiry, setInquiry] = useState({});
    const [loading, setLoading] = useState(true);
    const [role] = useState(sessionStorage.getItem("ROLE") || "");
    const navigate = useNavigate();
    const {inquiry_no} = useParams();

    const fetchInquiry = useCallback(async () => {
        if (!inquiry_no || isNaN(inquiry_no)) {
            navigate("/inquiry/history");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`/api/inquiry/view/${inquiry_no}`, {withCredentials: true});

            if (res.data.redirect) {
                navigate(res.data.redirect);
                return;
            }

            setInquiry(res.data.inquiryView || {});
        } catch (err) {
            if (err.response?.status === 404) {
                alert("해당 문의가 존재하지 않거나 삭제되었습니다.");
            } else {
                alert("문의 내용을 불러올 수 없습니다.");
            }
            navigate("/inquiry/history");
        } finally {
            setLoading(false);
        }
    }, [inquiry_no, navigate]);

    useEffect(() => {
        fetchInquiry();
    }, [fetchInquiry]);

    if (loading) return <main className="view-page">
        <div className="view-loading">로딩 중...</div>
    </main>;
    if (!inquiry.inquiry_no) return <main className="view-page">
        <div className="view-empty">문의가 존재하지 않습니다.</div>
    </main>;

    return (
        <>
            <InquiryFloating/>

            <main className="view-page">
                <div className="view-container">

                    <header className="view-header">
                        <h1 className="view-title">
                            {inquiry.inquiry_title}
                            <span
                                className={`status-badge small ${inquiry.inquiry_status === "답변대기" ? "waiting" : "completed"}`}>
                                {inquiry.inquiry_status}
                            </span>
                        </h1>
                        <div className="view-meta">
                            <span>{inquiry.inquiry_created}</span>
                            {inquiry.customer_name && <span>｜ 작성자: {inquiry.customer_name}</span>}
                        </div>
                    </header>

                    <section className="view-content-section">
                        <div
                            className="view-content"
                            dangerouslySetInnerHTML={{__html: inquiry.inquiry_content}}
                        />
                    </section>

                    {(role === "ADMIN" || inquiry.reply_content) && (
                        <section className="view-reply">
                            <h3 className="view-reply-title">
                                관리자 답변
                                {role === "ADMIN" && (
                                    <span className="reply-status">
                                        {inquiry.reply_content ? "(작성됨)" : "(미작성)"}
                                    </span>
                                )}
                            </h3>

                            {inquiry.reply_content ? (
                                <>
                                    <div
                                        className="view-reply-content"
                                        dangerouslySetInnerHTML={{__html: inquiry.reply_content}}
                                    />
                                    {inquiry.reply_created && (
                                        <div className="view-reply-date">
                                            답변 작성일: {inquiry.reply_created}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="view-no-reply">아직 답변이 작성되지 않았습니다.</p>
                            )}

                            {role === "ADMIN" && (
                                <div className="view-reply-actions">
                                    <button
                                        // 💡 수정! 정확한 라우터 경로를 사용합니다.
                                        onClick={() => navigate(`/inquiry/reply_write/${inquiry.inquiry_no}`)}
                                        className="btn-primary"
                                    >
                                        {inquiry.reply_content ? "답변 수정" : "답변 작성"}
                                    </button>
                                </div>
                            )}
                        </section>
                    )}

                    <div className="view-footer">
                        <button onClick={() => navigate(-1)} className="btn-back">
                            ← 목록으로 돌아가기
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}