// src/pages/faq/FaqList.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFaqList } from '../../api/faqApi';
import './faq.css';

// 🔑 [필수] 관리자 여부를 확인하는 함수 (Header, FaqView와 동일해야 함)
// sessionStorage에서 "ROLE" 값을 가져와서 'ADMIN'과 비교합니다.
const isAdmin = () => {
    return sessionStorage.getItem("ROLE") === 'ADMIN'; 
}

const FaqList = () => {
    // 1. 상태 변수 정의
    const [faqs, setFaqs] = useState([]);
    const [pageMaker, setPageMaker] = useState({
        prev: false,
        next: false,
        startPage: 1,
        endPage: 1,
        cri: { pageNum: 1 }
    });
    
    // ⭐️ [검색 추가] 검색 관련 상태 정의
    const [searchType, setSearchType] = useState('T'); // 기본: 제목 (T: Title)
    const [keyword, setKeyword] = useState('');      // 검색 키워드
    
    const navigate = useNavigate();

    // 2. 컴포넌트 마운트 시 초기 데이터 로드 (1페이지)
    useEffect(() => {
        fetchData(1);
    }, []);

    // 3. 데이터 가져오는 함수 (검색 조건 포함)
    const fetchData = async (pageNum) => {
        try {
            // API 호출 시 pageNum 외에 searchType과 keyword를 함께 전달
            const data = await getFaqList(pageNum, 10, searchType, keyword); 
            
            setFaqs(data.list || []);
            setPageMaker(data.pageMaker || { prev: false, next: false, startPage: 1, endPage: 1, cri: { pageNum: 1 } });
        } catch (err) {
            console.error("API 호출 오류:", err);
            alert("데이터를 불러오지 못했습니다.");
            setFaqs([]);
        }
    };

    // ⭐️ [추가] 글쓰기 버튼 클릭 핸들러 (권한 확인)
    const handleWriteClick = () => {
        if (isAdmin()) {
            navigate('/faq/write');
        } else {
            alert("FAQ 등록은 관리자만 가능합니다.");
        }
    };
    
    // ⭐️ [추가] 검색 실행 핸들러
    const handleSearch = () => {
        // 검색 실행 시 무조건 1페이지부터 다시 시작
        fetchData(1);
    };

    // 4. 페이지 번호 버튼을 만드는 함수
    const renderPagination = () => {
        if (!pageMaker || !pageMaker.cri) return null;

        const pageNumbers = [];
        for (let i = pageMaker.startPage; i <= pageMaker.endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination">
                {pageMaker.prev && (
                    <button onClick={() => fetchData(pageMaker.startPage - 1)}>
                        &lt; 이전
                    </button>
                )}

                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        className={pageMaker.cri.pageNum === num ? 'active' : ''}
                        onClick={() => fetchData(num)}
                    >
                        {num}
                    </button>
                ))}

                {pageMaker.next && (
                    <button onClick={() => fetchData(pageMaker.endPage + 1)}>
                        다음 &gt;
                    </button>
                )}
            </div>
        );
    };

    // 5. JSX 렌더링
    return (
        <div className="faq-container">
            <h2>FAQ 게시판</h2>
            
            {/* ⭐️ [권한] 글쓰기 버튼 (관리자일 때만 노출) */}
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                {isAdmin() && ( 
                    <button onClick={handleWriteClick} className="write-button">
                        글쓰기
                    </button>
                )}
            </div>
            
            {/* ⭐️ [검색] 검색 UI 영역 */}
            <div className="faq-search-area">
                <select 
                    value={searchType} 
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="T">제목</option>
                    <option value="C">내용</option>
                    <option value="TC">제목 + 내용</option>
                </select>

                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') { 
                            handleSearch();
                        }
                    }}
                    placeholder="검색어를 입력하세요"
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            <table className="faq-table">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>번호</th>
                        <th style={{ width: '60%' }}>제목</th>
                        <th style={{ width: '30%' }}>작성자/내용</th>
                    </tr>
                </thead>
                <tbody>
                    {!faqs || faqs.length === 0 ? (
                        <tr>
                            <td colSpan="3">게시글이 없습니다.</td>
                        </tr>
                    ) : (
                        faqs.map((faq) => (
                            <tr key={faq.faqNo}>
                                <td>{faq.faqNo}</td>
                                <td style={{ textAlign: 'left', paddingLeft: '20px' }}>
                                    <Link to={`/faq/view/${faq.faqNo}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        {faq.faqTitle}
                                    </Link>
                                </td>
                                <td>{faq.faqContent}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {renderPagination()}

        </div>
    );
};

export default FaqList;