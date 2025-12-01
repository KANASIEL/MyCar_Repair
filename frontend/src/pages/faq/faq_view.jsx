// src/pages/faq/FaqView.jsx (정리된 코드)

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFaqDetail, deleteFaq } from '../../api/faqApi'; 
import './faq.css';

// 🔑 [필수] 관리자 여부를 확인하는 함수 (컴포넌트 외부에 위치)
const isAdmin = () => {
    return sessionStorage.getItem("ROLE") === 'ADMIN'; 
}

const FaqView = () => {
    const { faqNo } = useParams();
    const navigate = useNavigate();
    const [faq, setFaq] = useState(null);

    useEffect(() => {
        const loadDetail = async () => {
            try {
                const data = await getFaqDetail(faqNo);
                
                if (!data) {
                    throw new Error("API에서 유효한 데이터를 받지 못했습니다.");
                }
                
                setFaq(data);
            } catch (err) {
                console.error("FAQ 상세 정보를 불러오는 중 오류 발생:", err);
                alert("글을 불러오지 못했거나 데이터가 없습니다.");
                navigate('/faq');
            }
        };
        
        if (faqNo) {
            loadDetail();
        } else {
            console.warn("FAQ 번호(faqNo)가 유효하지 않아 목록으로 돌아갑니다.");
            navigate('/faq');
        }
    }, [faqNo, navigate]);

    // 수정 버튼 핸들러
    const handleModify = () => {
        if (!isAdmin()) {
            alert("FAQ 수정은 관리자만 가능합니다.");
            return;
        }
        navigate(`/faq/modify/${faqNo}`);
    };

    // 삭제 버튼 핸들러
    const handleDelete = async () => {
        if (!isAdmin()) {
            alert("FAQ 삭제는 관리자만 가능합니다.");
            return;
        }
        
        if (window.confirm("정말로 이 FAQ 글을 삭제하시겠습니까?")) {
            try {
                await deleteFaq(faqNo); 
                alert("글이 성공적으로 삭제되었습니다.");
                navigate('/faq'); 
            } catch (err) {
                console.error("FAQ 삭제 실패:", err);
                alert("글 삭제에 실패했습니다.");
            }
        }
    };

    if (!faq) return <div>로딩중...</div>;

    return (
        <div className="faq-container">
            <h2>FAQ 상세 보기</h2>
            <table className="faq-table" style={{ marginTop: '20px' }}>
                <tbody>
                    <tr>
                        <th style={{ width: '20%' }}>번호</th>
                        <td>{faq.faqNo}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{faq.faqTitle}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td className="faq-content-cell"> 
                            {faq.faqContent}
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                {isAdmin() && (
                    <>
                        <button onClick={handleModify} style={{ backgroundColor: '#28a745', color: 'white' }}>수정</button> 
                        <button onClick={handleDelete} style={{ backgroundColor: '#dc3545', color: 'white' }}>삭제</button> 
                    </>
                )}
                <button onClick={() => navigate('/faq')}>목록으로</button>
            </div>
        </div>
    );
};

export default FaqView;