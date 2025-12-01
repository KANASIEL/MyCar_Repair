import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFaqDetail, modifyFaq } from '../../api/faqApi'; 
import './faq.css';

const FaqModify = () => {
  const { faqNo } = useParams(); // URL에서 글번호 가져오기
  const navigate = useNavigate();

  // 💡 State 키를 백엔드 HashMap 키와 일치시켜 혼동을 줄이거나, 
  //    혹은 DTO 필드명(faqTitle, faqContent) 그대로 사용합니다.
  const [faqTitle, setFaqTitle] = useState('');
  const [faqContent, setFaqContent] = useState('');

  // 1. 기존 글 내용 불러오기
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getFaqDetail(faqNo);
        // DTO 필드명(faqTitle, faqContent)으로 상태 업데이트
        setFaqTitle(data.faqTitle);
        setFaqContent(data.faqContent);
      } catch (err) {
        alert("데이터를 불러오지 못했습니다.");
        navigate('/faq');
      }
    };
    // faqNo가 유효한지 확인 후 로드 시작 (옵션)
    if (faqNo) {
        loadData();
    } else {
        navigate('/faq');
    }
  }, [faqNo, navigate]);

  // 2. 수정 완료 버튼 클릭
  const handleModify = async (e) => {
    e.preventDefault();

    try {
      // 💡 Body에 담아 보낼 데이터만 객체로 준비합니다.
      // 백엔드 HashMap 키: faqTitle, faqContent에 맞춥니다.
      const dataToSend = {
        faqTitle: faqTitle,    // 💡 백엔드 HashMap 키 이름에 맞게 수정
        faqContent: faqContent // 💡 백엔드 HashMap 키 이름에 맞게 수정
      };

      await modifyFaq(faqNo, dataToSend); 
      
      alert("글이 수정되었습니다.");
      navigate(`/faq/view/${faqNo}`); // 상세 페이지로 이동
    } catch (err) {
      console.error("수정 실패:", err);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="faq-container">
      <h2 style={{ textAlign: 'center', margin: '30px 0' }}>FAQ 수정하기</h2>
      <form onSubmit={handleModify} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <table className="faq-table">
          <tbody>
            <tr>
              <th style={{ width: '20%' }}>제목</th>
              <td>
                <input 
                  type="text" 
                  value={faqTitle}
                  onChange={(e) => setFaqTitle(e.target.value)}
                  style={{ width: '95%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea 
                  value={faqContent}
                  onChange={(e) => setFaqContent(e.target.value)}
                  style={{ width: '95%', height: '300px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>수정완료</button>
          <button type="button" onClick={() => navigate('/faq')} style={{ padding: '10px 20px', backgroundColor: '#aaa', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default FaqModify;