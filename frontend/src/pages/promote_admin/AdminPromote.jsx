import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/common/Header"; // 헤더 경로 확인 필수
import "./AdminPromote.css"; // CSS 파일 연결 (있다고 가정)

export default function AdminPromote() {
    const navigate = useNavigate();
    
    // 상태 관리
    const [loginId, setLoginId] = useState('');
    const [adminKey, setAdminKey] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // 1. 페이지 로드 시 로그인 체크
    useEffect(() => {
        // ★ [핵심 수정] F12에서 확인한 대문자 키 'ACCOUNT_ID' 사용
        const storedId = sessionStorage.getItem('ACCOUNT_ID'); 
        
        if (storedId) {
            setLoginId(storedId);
        } else {
            alert("로그인이 필요한 서비스입니다.");
            navigate('/login');
        }
    }, [navigate]);

    // 2. 권한 승급 요청 (Fetch 사용)
    const handlePromote = async (e) => {
        e.preventDefault();

        if (!adminKey) {
            setMessage("관리자 키를 입력해주세요.");
            setIsError(true);
            return;
        }

        try {
            // 스프링 부트 컨트롤러 주소 (/api/admin/promote)
            const response = await fetch('http://localhost:8484/api/admin/promote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminKey: adminKey }),
                credentials: 'include', // ★ [핵심] 세션 유지를 위해 필수!
            });

            const data = await response.json();

            if (data.success) {
                // 성공 시
                setMessage(data.message);
                setIsError(false);
                
                // 프론트엔드 세션 정보도 즉시 관리자로 업데이트
                sessionStorage.setItem('ROLE', 'ADMIN'); // 대문자 ROLE
                
                alert("🎉 관리자로 승급되었습니다!");
                
                // 0.5초 후 메인으로 이동 (새로고침 효과를 위해 href 사용)
                setTimeout(() => {
                    window.location.href = "/"; 
                }, 500);

            } else {
                // 실패 시
                setMessage(data.message);
                setIsError(true);
            }

        } catch (error) {
            console.error("승급 오류:", error);
            setMessage("서버와 통신할 수 없습니다.");
            setIsError(true);
        }
    };

    return (
        <>
            {/* 헤더가 이미 App.jsx에 있다면 이 줄은 빼도 됩니다. 중복되면 제거하세요. */}
            {/* <Header /> */} 

            <div className="promote-container">
                <div className="promote-form">
                    
                    <h1>관리자 권한 승급</h1>

                    {/* 메시지 표시 */}
                    {message && (
                        <div className={`message ${isError ? 'error' : 'success'}`}>
                            {message}
                        </div>
                    )}

                    <div className="guide-text">
                        관리자 키를 입력하시면 현재 로그인된 계정<br/>
                        (<span className="user-id">{loginId}</span>)이<br/>
                        <strong>관리자(ADMIN)</strong> 권한으로 승급됩니다.
                    </div>

                    <form onSubmit={handlePromote}>
                        <div className="form-group">
                            <label htmlFor="adminKey">관리자 키 (Secret Key)</label>
                            <input 
                                type="password" 
                                id="adminKey" 
                                placeholder="비밀키를 입력하세요"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                required 
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            승급 신청하기
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}