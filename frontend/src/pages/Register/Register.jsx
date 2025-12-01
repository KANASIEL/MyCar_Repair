// src/register/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // 수정된 CSS 불러오기

function Register() {
  const navigate = useNavigate(); // 페이지 이동 도구

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    userName: '',
    accountId: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 폼 전송 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 (간단 예시)
    if (!formData.accountId || !formData.password || !formData.userName) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8484/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (await response.text() === "success") {
        alert("🎉 회원가입 성공! 로그인 해주세요.");
        navigate("/login"); // 로그인 페이지로 이동 (나중에 만드실 예정)
      } else {
        alert("회원가입 실패: 이미 존재하는 아이디일 수 있습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 연결 실패");
    }
  };

  return (
    <div className="register-container">
      
      {/* [★수정됨★] 버튼형 탭 메뉴 */}
      <div className="tab-button-group">
        <button 
            className="tab-button active" 
            disabled // 현재 페이지니까 클릭 안 되게
        >
            일반 회원가입
        </button>
        <button 
            className="tab-button" 
            onClick={() => navigate('/registerstore')} // 클릭 시 업체 가입으로 이동
        >
            업체 회원가입
        </button>
      </div>

      <h1>일반 회원가입</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">이름</label>
          <input 
            type="text" 
            id="userName"
            name="userName" 
            placeholder="홍길동"
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountId">아이디</label>
          <input 
            type="text" 
            id="accountId"
            name="accountId" 
            placeholder="사용할 아이디를 입력하세요"
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input 
            type="password" 
            id="password"
            name="password" 
            placeholder="비밀번호를 입력하세요"
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            placeholder="example@email.com"
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">휴대폰 번호</label>
          <input 
            type="text" 
            id="phoneNumber"
            name="phoneNumber" 
            placeholder="010-1234-5678" 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="submit-button">가입하기</button>

        <p className="link-text">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;