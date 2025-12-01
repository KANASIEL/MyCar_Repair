import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Notice_list.css";   // 새로 만들 CSS 파일

function NoticeList() {
    const [notices, setNotices] = useState([]);
    const [pageMaker, setPageMaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem("ROLE") === "ADMIN");

    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const currentPage = parseInt(query.get("pageNum") || "1", 10);

    const fetchNotices = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8484/api/notice/list", {
                params: { pageNum: page, amount: 10 },
            });
            setNotices(res.data.list || []);
            setPageMaker(res.data.pageMaker);
        } catch (err) {
            console.error("공지사항 로드 실패:", err);
            alert("공지사항을 불러올 수 없습니다.");
            setNotices([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const goToPage = (page) => {
        if (page < 1) return;
        navigate(`?pageNum=${page}&amount=10`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        fetchNotices(currentPage);
    }, [currentPage, fetchNotices]);

    useEffect(() => {
        const checkAdmin = () => setIsAdmin(sessionStorage.getItem("ROLE") === "ADMIN");
        checkAdmin();
        window.addEventListener("storage", checkAdmin);
        return () => window.removeEventListener("storage", checkAdmin);
    }, []);

    const pageNumbers = pageMaker
        ? Array.from(
            { length: pageMaker.endPage - pageMaker.startPage + 1 },
            (_, i) => pageMaker.startPage + i
        )
        : [];

    return (
        <main className="notice-list-main">
            {/* 헤더 */}
            <section className="notice-list-header">
                <h1 className="notice-list-title">공지사항</h1>
            </section>

            {/* 로딩 */}
            {loading && <div className="notice-list-loading">공지사항을 불러오는 중...</div>}

            {/* 빈 데이터 */}
            {!loading && notices.length === 0 && (
                <div className="notice-list-empty">등록된 공지사항이 없습니다.</div>
            )}

            {/* 테이블 */}
            {!loading && notices.length > 0 && (
                <section className="notice-list-table-wrapper">
                    <table className="notice-list-table">
                        <thead>
                        <tr>
                            <th className="notice-list-th-no">번호</th>
                            <th className="notice-list-th-title">제목</th>
                            <th className="notice-list-th-writer">작성자</th>
                            <th className="notice-list-th-date">작성일</th>
                            <th className="notice-list-th-views">조회수</th>
                        </tr>
                        </thead>
                        <tbody>
                        {notices.map((notice) => (
                            <tr key={notice.notice_no} className="notice-list-row">
                                <td className="notice-list-td-no">{notice.notice_no}</td>
                                <td className="notice-list-td-title">
                                    <Link
                                        to={`/notice/view/${notice.notice_no}?pageNum=${currentPage}&amount=10`}
                                        className="notice-list-link"
                                    >
                                        {notice.notice_title}
                                    </Link>
                                </td>
                                <td className="notice-list-td-writer">
                                    {notice.notice_writer || "관리자"}
                                </td>
                                <td className="notice-list-td-date">{notice.notice_created}</td>
                                <td className="notice-list-td-views">{notice.notice_views || 0}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            )}

            {/* 페이징 */}
            {pageMaker && !loading && (
                <nav className="notice-list-pagination" aria-label="공지사항 페이징">
                    <ul className="notice-list-pagination-list">
                        {/* 이전 */}
                        {pageMaker.prev && (
                            <li className="notice-list-page-item">
                                <button
                                    onClick={() => goToPage(pageMaker.startPage - 1)}
                                    className="notice-list-prev-btn"
                                >
                                    이전
                                </button>
                            </li>
                        )}

                        {/* 숫자 */}
                        {pageNumbers.map((num) => (
                            <li
                                key={num}
                                className={`notice-list-page-item ${
                                    currentPage === num ? "notice-list-active" : ""
                                }`}
                            >
                                <button
                                    onClick={() => goToPage(num)}
                                    className="notice-list-page-btn"
                                >
                                    {num}
                                </button>
                            </li>
                        ))}

                        {/* 다음 */}
                        {pageMaker.next && (
                            <li className="notice-list-page-item">
                                <button
                                    onClick={() => goToPage(pageMaker.endPage + 1)}
                                    className="notice-list-next-btn"
                                >
                                    다음
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            )}

            {/* 관리자 전용 글쓰기 버튼 */}
            {isAdmin && (
                <div className="notice-list-admin-write-container" id="write-button-area">
                    <Link
                        to="/notice/write"
                        className="notice-list-admin-write-btn"
                        id="admin-write-link"
                    >
                        글쓰기
                    </Link>
                </div>
            )}
        </main>
    );
}

export default NoticeList;