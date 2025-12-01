import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './reservation.css'; // 상세 페이지 CSS 파일

// ⭐️ 예약 상태 코드를 한국어로 변환하는 함수 (History에서 가져옴)
const translateStatus = (status) => {
    switch (status) {
        case 'PENDING': return '승인 대기';
        case 'APPROVED': return '예약 확정';
        case 'REJECTED': return '예약 거절';
        case 'CANCELLED': return '예약 취소';
        case 'COMPLETED': return '정비 완료';
        default: return status;
    }
};

// ⭐️ Timezone 변환 없이 KST 문자열을 한국어 형식으로 포맷하는 유틸리티 함수 (History에서 가져옴)
const formatIsoToKSTDisplay = (isoString) => {
    if (!isoString) return '날짜 정보 없음';

    const datePart = isoString.substring(0, 10);
    const timePart = isoString.substring(11, 16);
    const [hour, minute] = timePart.split(':').map(Number);
    const ampm = hour >= 12 ? '오후' : '오전';
    const displayHour = hour % 12 || 12;
    const [year, month, day] = datePart.split('-');

    return `${year}년 ${month}월 ${day}일 ${ampm} ${displayHour}:${minute}`;
};


function ReservationDetail() {
    const { rsvNo } = useParams(); 
    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🌟 예약 정보를 불러오는 함수 (취소 후 갱신은 필요 없으므로 useEffect 내에 포함)
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                // GET /api/reservation/{rsvNo} 호출
                const response = await axios.get(`http://localhost:8484/api/reservation/${rsvNo}`); 
                setReservation(response.data);
                setLoading(false);
            } catch (err) {
                setError('예약 상세 정보를 불러오는 데 실패했습니다.');
                setLoading(false);
                console.error('Detail Fetch Error:', err);
            }
        };

        fetchReservation();
    }, [rsvNo]);


    // --- 버튼 핸들러 ---
    
    // 1. 예약 취소 핸들러
    const handleCancel = async () => {
        if (!window.confirm(`${reservation.rsvNo}번 예약을 정말 취소하시겠습니까?`)) {
            return;
        }
        setLoading(true);

        try {
            // DELETE /api/reservation/{rsvNo} 엔드포인트 호출 (취소 로직)
            const response = await axios.delete(`http://localhost:8484/api/reservation/${rsvNo}`); 
            
            if (response.status === 200 || response.status === 204) {
                alert('예약이 성공적으로 취소되었습니다.');
                navigate('/reservation/history'); // 목록으로 돌아가기
            }
        } catch (e) {
            alert('예약 취소 중 오류가 발생했습니다. 관리자에게 문의하세요.');
            setLoading(false); // 오류 발생 시 로딩 해제
        }
    };
    
    // 2. 예약 수정 페이지로 이동
    const handleModify = () => {
        // 예약 번호를 포함하여 수정 페이지로 이동
        navigate(`/reservation/modify/${rsvNo}`);
    };

    // --- 화면 렌더링 ---

    if (loading) return <div className="detail-loading">예약 상세 정보를 불러오는 중입니다...</div>;
    if (error) return <div className="detail-error" style={{color: 'red'}}>오류: {error}</div>;
    if (!reservation) return <div className="detail-no-data">예약 정보를 찾을 수 없습니다.</div>;

    // ⭐ 승인 대기 중일 때만 수정/취소 가능
    const isPending = reservation.status === 'PENDING';

    return (
        <div className="reservation-detail-container">
            <h1>✅ 예약 상세 정보 ({reservation.rsvNo})</h1>

            <div className="detail-box">
                <p><strong>정비소:</strong> {reservation.storeName || '정보 없음'}</p> 
                <p><strong>주소:</strong> {reservation.storeAddress || '정보 없음'}</p> 
                
                {/* ⭐️ 시간 포맷 함수 적용 */}
                <p><strong>예약 일시:</strong> {formatIsoToKSTDisplay(reservation.rsvDate)}</p>
                
                <p><strong>차량 모델:</strong> {reservation.carModel}</p>
                <p><strong>서비스 유형:</strong> {reservation.serviceType}</p>
                <p><strong>상태:</strong> <span className={reservation.status === 'PENDING' ? 'status-pending' : 'status-other'}>{translateStatus(reservation.status)}</span></p>
            </div>
            
            <div className="request-note-section">
                <h2>📝 고객 요청 사항</h2>
                <div className="request-note-content">
                    {reservation.requestMemo || '특별한 요청사항이 없습니다.'}
                </div>
            </div>
            
            <div className="action-buttons">
                {isPending && (
                    <>
                        <button 
                            onClick={handleModify} 
                            className="btn-modify">
                            예약 수정 
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="btn-cancel">
                            예약 취소 
                        </button>
                    </>
                )}
                <button 
                    onClick={() => navigate('/reservation/history')} 
                    className="btn-back">
                    목록으로 돌아가기
                </button>
				
				{reservation.status === 'COMPLETED' && (
				        <button
				            onClick={() => navigate(`/review/${reservation.storeId}/${reservation.rsvNo}`)}
				            className="btn-review"
				        >
				            리뷰 작성
				        </button>
				    )}

            </div>
        </div>
    );
}

export default ReservationDetail;