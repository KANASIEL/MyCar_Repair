import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode'; 
import './Register.css';

function RegisterStore() {
  const navigate = useNavigate();

  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const [formData, setFormData] = useState({
    storeId: '',
    password: '',
    storeName: '', // ★ 1. 업체명 상태 추가 (DB의 store_name과 매핑될 변수)
    email: '',
    phoneNumber: '',
    
    zonecode: '',      
    address: '',       
    detailAddress: '', 
    
    dayType: '평일',
    startTime: '',
    endTime: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleComplete = (data) => {
    let fullAddress = data.address; 
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setFormData(prev => ({
      ...prev,
      zonecode: data.zonecode,
      address: fullAddress
    }));
  };

  const handleSearchClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사에도 storeName 추가
    if (!formData.storeId || !formData.password || !formData.address || !formData.storeName) {
        alert("필수 정보를 모두 입력해주세요.");
        return;
    }

    const finalData = {
        ...formData,
        address: `(${formData.zonecode}) ${formData.address} ${formData.detailAddress}`.trim()
    };

    try {
      const response = await fetch("http://localhost:8484/api/registerstore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (await response.text() === "success") {
        alert("🏢 업체 가입 신청이 완료되었습니다! 관리자 승인 후 이용 가능합니다.");
        navigate("/"); 
      } else {
        alert("가입 실패: 이미 존재하는 아이디일 수 있습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 연결 실패");
    }
  };

  return (
    <div className="register-container">
      
      <div className="tab-button-group">
        <button className="tab-button" onClick={() => navigate('/register')}>일반 회원가입</button>
        <button className="tab-button active" disabled>업체 회원가입</button>
      </div>

      <h1>업체 회원가입</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="storeId">업체 아이디</label>
          <input type="text" name="storeId" placeholder="아이디" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
        </div>

        {/* ▼▼▼ ★ 2. 업체명 입력칸 추가 (비밀번호 밑) ▼▼▼ */}
        <div className="form-group">
          <label htmlFor="storeName">업체명 (가게 이름)</label>
          <input 
            type="text" 
            name="storeName" 
            placeholder="상호명을 입력해주세요" 
            onChange={handleChange} 
            required 
          />
        </div>
        {/* ▲▲▲ 추가 끝 ▲▲▲ */}

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" name="email" placeholder="store@example.com" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">전화번호</label>
          <input type="text" name="phoneNumber" placeholder="02-1234-5678" onChange={handleChange} required />
        </div>

        {/* 주소 입력 부분 */}
        <div className="form-group">
          <label>업체 주소</label>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <input 
                type="text" 
                name="zonecode" 
                value={formData.zonecode}
                placeholder="우편번호"
                readOnly 
                style={{ width: '120px' }} 
              />
              <button 
                type="button" 
                onClick={handleSearchClick}
                className="address-search-btn" 
                style={{ 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    backgroundColor: '#333', 
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px'
                }}
              >
                주소 찾기
              </button>
          </div>

          <input 
            type="text" 
            name="address" 
            value={formData.address}
            placeholder="기본 주소"
            readOnly 
            style={{ marginBottom: '8px' }}
          />

          <input 
            type="text" 
            name="detailAddress" 
            value={formData.detailAddress}
            placeholder="상세 주소 (예: 1층 101호)"
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
            <label>영업 시간</label>
            <div className="form-time-group">
                <select name="dayType" className="time-select" onChange={handleChange} value={formData.dayType}>
                    <option value="평일">평일</option>
                    <option value="주말">주말</option>
                    <option value="연중무휴">연중무휴</option>
                </select>
                <input type="number" name="startTime" className="time-input" min="0" max="23" placeholder="09" onChange={handleChange} required />
                <span className="time-unit">시 ~</span>
                <input type="number" name="endTime" className="time-input" min="0" max="23" placeholder="18" onChange={handleChange} required />
                <span className="time-unit">시</span>
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="description">업체 상세 소개</label>
            <textarea name="description" placeholder="소개글 입력..." onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="submit-button">가입하기</button>
      </form>
    </div>
  );
}

export default RegisterStore;