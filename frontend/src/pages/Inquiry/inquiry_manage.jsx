// src/pages/inquiry/InquiryManage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import InquiryFloating from "../../components/common/InquiryFloating";
import Pagination from "../../components/common/Pagination";
import "./InquiryManage.css"; // 전용 CSS로 분리!

export default function InquiryManage() {
    const [list, setList] = useState([]);
    const [pageMaker, setPageMaker] = useState(null);
    const [role] = useState(sessionStorage.getItem("ROLE") || "");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const currentPage = parseInt(query.get("pageNum") || "1", 10);
    const type = query.get("type") || ""; // W 또는 C

    const fetchManage = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/inquiry/manage", {
                params: { pageNum: currentPage, amount: 10, type },
                withCredentials: true,
            });

            if (res.data.redirect) {
                navigate(res.data.redirect);
                return;
            }

            setList(res.data.inquiryManage || []); // 백엔드 키 확인!
            setPageMaker(res.data.pageMaker);
        } catch (err) {
            alert("문의 목록을 불러올 수 없습니다.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, type, navigate]);

    useEffect(() => {
        fetchManage();
    }, [fetchManage]);

    const goToPage = (page) => {
        const params = new URLSearchParams();
        params.set("pageNum", page);
        if (type) params.set("type", type);
        navigate(`?${params.toString()}`);
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        navigate(newType ? `?pageNum=1&type=${newType}` : "?pageNum=1");
    };

    return (
        <>
            <InquiryFloating />

            <main className="manage-page">
                <div className="manage-container">

                    <header className="manage-header">
                        <h1 className="manage-title">문의 관리 (관리자)</h1>
                        <hr className="manage-divider" />
                    </header>

                    <div className="manage-filter">
                        <select value={type} onChange={handleTypeChange}>
                            <option value="">전체 문의</option>
                            <option value="답변대기">답변대기</option>
                            <option value="답변완료">답변완료</option>
                        </select>
                    </div>

                    {loading && <div className="manage-loading">문의 목록을 불러오는 중...</div>}
                    {!loading && list.length === 0 && <div className="manage-empty">문의 내역이 없습니다.</div>}

                    {!loading && list.length > 0 && (
                        <>
                            <div className="manage-table-wrapper">
                                <table className="manage-table">
                                    <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>작성자</th>
                                        <th>작성일</th>
                                        <th>상태</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list.map((item) => (
                                        <tr key={item.inquiry_no}>
                                            <td className="manage-col-no">{item.inquiry_no}</td>
                                            <td className="manage-col-title">
                                                <Link to={`/inquiry/view/${item.inquiry_no}`}>
                                                    {item.inquiry_title}
                                                </Link>
                                            </td>
                                            <td className="manage-col-author">{item.customer_id || item.customer_name}</td>
                                            <td className="manage-col-date">{item.inquiry_created}</td>
                                            <td className="manage-col-status">
                                                <span
                                                    className={`status-badge ${item.inquiry_status === "답변대기" ? "waiting" : "completed"}`}>
                                                    {item.inquiry_status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="manage-pagination">
                                <Pagination pageMaker={pageMaker} goToPage={goToPage} currentPage={currentPage} />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}