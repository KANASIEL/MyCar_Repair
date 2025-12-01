// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ pageMaker, goToPage, currentPage }) {
    if (!pageMaker) return null;

    const pageNumbers = Array.from(
        {length: pageMaker.endPage - pageMaker.startPage + 1},
        (_, i) => pageMaker.startPage + i
    );

    return (
        <nav className="pagination-container" aria-label="페이지 네비게이션">
            <ul className="pagination-list">
                {/* 이전 */}
                {pageMaker.prev && (
                    <li className="pagination-item prev">
                        <button onClick={() => goToPage(pageMaker.startPage - 1)}>
                            이전
                        </button>
                    </li>
                )}

                {/* 번호 */}
                {pageNumbers.map((num) => (
                    <li
                        key={num}
                        className={`pagination-item ${currentPage === num ? "active" : ""}`}
                    >
                        <button onClick={() => goToPage(num)}>{num}</button>
                    </li>
                ))}

                {/* 다음 */}
                {pageMaker.next && (
                    <li className="pagination-item next">
                        <button onClick={() => goToPage(pageMaker.endPage + 1)}>
                            다음
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}