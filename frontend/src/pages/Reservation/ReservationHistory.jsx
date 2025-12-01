import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './reservation.css'; 

// ⭐️ 예약 상태 코드를 한국어로 변환하는 함수
const translateStatus = (status) => {
    switch (status) {
        case 'PENDING':
            return '승인 대기';
        case 'APPROVED':
            return '예약 확정';
        case 'REJECTED':
            return '예약 거절';
        case 'CANCELED':
            return '예약 취소';
        case 'COMPLETED':
            return '정비 완료';
        default:
            return status;
    }
};

// ⭐️ Timezone 변환 없이 KST 문자열을 한국어 형식으로 포맷하는 유틸리티 함수 (시간 오류 해결)
const formatIsoToKSTDisplay = (isoString) => {
    if (!isoString) return '날짜 정보 없음';

    const datePart = isoString.substring(0, 10);  // YYYY-MM-DD
    const timePart = isoString.substring(11, 16); // HH:MM

    // 시간과 분을 숫자로 분리
    const [hour, minuteNum] = timePart.split(':').map(Number);
    
    // ⭐️ 수정 부분: 분(minute) 값을 문자열로 변환하고, 2자리 수가 되도록 앞에 0을 채웁니다.
    const paddedMinute = String(minuteNum).padStart(2, '0'); 

    const ampm = hour >= 12 ? '오후' : '오전';
    const displayHour = hour % 12 || 12; 
    const [year, month, day] = datePart.split('-');

    // ⭐️ 최종 출력 시 paddedMinute 사용 ⭐️
    return `${year}년 ${month}월 ${day}일 ${ampm} ${displayHour}:${paddedMinute}`;
};


const ReservationHistory = () => {
    const navigate = useNavigate();
    
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const accountId = sessionStorage.getItem('ACCOUNT_ID');

    // 🌟 예약 목록을 불러오는 함수
    const fetchReservations = async () => {
        if (!accountId) return; 
        
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8484/api/reservation/user/${accountId}`);
            setReservations(response.data);
            
        } catch (err) {
            console.error("예약 내역 조회 실패:", err);
            setError("예약 내역을 불러오는 중 서버 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!accountId) {
            alert("예약 내역을 조회하려면 로그인이 필요합니다.");
            navigate('/login');
            return;
        }
        fetchReservations();
    }, [accountId, navigate]);


    // ⭐️ 상세보기 페이지로 이동하는 함수
    const handleViewDetails = (rsvNo) => {
        navigate(`/reservation/details/${rsvNo}`); 
    };

    // ----------------------
    // 뷰 렌더링 로직
    // ----------------------
    if (isLoading && reservations.length === 0) {
        return <div className="history-container"><h2>예약 내역</h2><p>예약 내역을 불러오는 중...</p></div>;
    }

    if (error) {
        return <div className="history-container error"><h2>예약 내역</h2><p style={{color: 'red'}}>오류: {error}</p></div>;
    }

    return (
        <div className="history-container">
            <h2>나의 정비 예약 내역</h2>
            
            {reservations.length === 0 ? (
                <p className="no-data">등록된 예약 내역이 없습니다.</p>
            ) : (
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>정비소</th>
                            <th>예약 일시</th>
                            <th>차량 모델</th>
                            <th>서비스 종류</th>
                            <th>상태</th>
                            <th>관리</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((rsv) => (
                            <tr key={rsv.rsvNo}> 
                                <td>{rsv.rsvNo}</td>
                                <td>{rsv.storeName || '정보 없음'}</td> 
                                
                                {/* ⭐️ 시간 포맷 함수 적용 */}
                                <td>{formatIsoToKSTDisplay(rsv.rsvDate)}</td> 
                                
                                <td>{rsv.carModel}</td>
                                <td>{rsv.serviceType}</td>
                                <td>{translateStatus(rsv.status)}</td> 
                                
                                <td>
                                    {/* ⭐️ 상세보기 버튼만 남깁니다. */}
                                    <button 
                                        className="btn-detail" 
                                        onClick={() => handleViewDetails(rsv.rsvNo)}
                                    >
                                        상세보기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservationHistory;