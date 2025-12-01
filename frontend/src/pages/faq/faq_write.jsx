import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { writeFaq } from '../../api/faqApi'; // 위에서 만든 함수 import
import './faq.css'; // 스타일 재사용

const FaqWrite = () => {
  // 1. 입력값을 저장할 상태 변수
  const [faqTitle, setFaqTitle] = useState('');
  const [faqContent, setFaqContent] = useState('');
  
  const navigate = useNavigate(); // 페이지 이동용

  // 2. 저장 버튼 클릭 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 화면 새로고침 방지

    if (!faqTitle || !faqContent) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {

      const faqData = {
        faq_title: faqTitle,     // DTO나 Mapper의 #{faq_title}과 이름 일치해야 함
        faq_content: faqContent,
        faq_writer: "관리자"
      };

      // API 호출 (formData 대신 faqData 전달)
      await writeFaq(faqData);
      
      alert("글이 성공적으로 등록되었습니다.");
      navigate('/'); 
    } catch (err) {
      console.error(err); // 콘솔에 에러 내용을 자세히 출력
      alert("글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="faq-container">
      <h2>FAQ 글쓰기</h2>
      
      <form onSubmit={handleSubmit}>
        <table className="faq-table">
          <tbody>
            <tr>
              <th style={{ width: '20%' }}>제목</th>
              <td>
                <input 
                  type="text" 
                  value={faqTitle}
                  onChange={(e) => setFaqTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  style={{ width: '95%', padding: '8px' }}
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea 
                  value={faqContent}
                  onChange={(e) => setFaqContent(e.target.value)}
                  placeholder="내용을 입력하세요"
                  style={{ width: '95%', height: '200px', padding: '8px', resize: 'vertical' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="pagination" style={{ marginTop: '20px' }}>
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white' }}>저장</button>
          <button type="button" onClick={() => navigate('/')}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default FaqWrite;