import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InquiryFloating from "../../components/common/InquiryFloating";
import "./Inquiry_write.css" // 💡 CSS 파일 경로를 표준 표기법으로 수정 (InquiryWrite.css)

export default function InquiryWrite() {
    // 1. 상태 추가: 백엔드에서 받아온 회원 정보를 저장합니다.
    const [customerInfo, setCustomerInfo] = useState({});
    const [role, setRole] = useState(sessionStorage.getItem("ROLE") || "");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPage = useCallback(async () => {
        try {
            const res = await axios.get("/api/inquiry/write", { withCredentials: true });

            if (res.data.redirect) {
                navigate(res.data.redirect);
                return;
            }

            // 백엔드에서 받아온 회원 정보를 상태에 저장합니다.
            if (res.data.customerInfo) {
                setCustomerInfo(res.data.customerInfo);
            }

        } catch (err) {
            alert("페이지 로드 실패");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchPage();
    }, [fetchPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            // 서버에서 사용자 정보를 재확보하므로, 폼 데이터는 문의 제목/내용에 집중합니다.
            await axios.post("/api/inquiry/writeProcess", new URLSearchParams(data), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                withCredentials: true,
            });
            alert("문의가 등록되었습니다.");
            navigate("/inquiry/history");
        } catch (err) {
            alert("등록 실패");
        }
    };

    if (loading) return <div className="inquiry-write-loading">로딩 중...</div>;

    return (
        <main className="inquiry-write-page">
            <InquiryFloating role={role} />

            <form onSubmit={handleSubmit} className="inquiry-write-form">
                <h2 className="inquiry-write-title">문의 등록</h2>

                {/* --- 읽기 전용 필드: 서버에서 가져온 사용자 정보 --- */}
                <div className="inquiry-write-group">
                    <label>이름</label>
                    <input
                        type="text"
                        name="customer_name" // 💡 수정: name 속성은 정적인 바인딩 키를 사용해야 합니다.
                        required
                        // value 및 readOnly 적용: 서버에서 결정된 값은 수정 불가능
                        value={customerInfo.customer_name || ''}
                        readOnly
                    />
                </div>

                <div className="inquiry-write-group">
                    <label>연락처</label>
                    <input
                        type="tel"
                        name="customer_phone" // 💡 수정: name 속성은 정적인 바인딩 키를 사용해야 합니다.
                        required
                        // value 및 readOnly 적용: 서버에서 결정된 값은 수정 불가능
                        value={customerInfo.customer_phone || ''}
                        readOnly
                    />
                </div>

                <div className="inquiry-write-group">
                    <label>이메일</label>
                    <input
                        type="email"
                        name="customer_email" // 💡 수정: name 속성은 정적인 바인딩 키를 사용해야 합니다.
                        required
                        // value 및 readOnly 적용: 서버에서 결정된 값은 수정 불가능
                        value={customerInfo.customer_email || ''}
                        readOnly
                    />
                </div>
                {/* ------------------------------------------- */}

                <div className="inquiry-write-group">
                    <label>제목</label>
                    <input type="text" name="inquiry_title" required />
                </div>

                <div className="inquiry-write-group">
                    <label>문의내용</label>
                    <textarea name="inquiry_content" rows="10" required></textarea>
                </div>

                <div className="inquiry-write-actions">
                    <button type="submit" className="inquiry-write-submit-btn">등록</button>
                </div>
            </form>
        </main>
    );
}