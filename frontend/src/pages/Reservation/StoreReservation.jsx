import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // ⭐️ 1. 주소창 값을 받기 위해 추가
import './StoreReservation.css';

const StoreReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // ⭐️ 2. ID 가져오기 로직 (우선순위: URL 파라미터 > 세션 스토리지)
    const { storeId: paramId } = useParams(); // URL에서 가져온 ID
    const sessionId = sessionStorage.getItem("ACCOUNT_ID"); // 로그인 세션에서 가져온 ID
    
    // URL에 적힌 게 있으면 그걸 쓰고, 없으면 로그인 정보를 씁니다.
    const storeId = paramId || sessionId || ""; 

    // 예약 목록 가져오기 함수
    const fetchReservations = async () => {
        // ID가 없으면 중단
        if (!storeId) {
            alert("업체 ID를 찾을 수 없습니다. (주소창 확인 또는 로그인 필요)");
            setIsLoading(false);
            return;
        }

        try {
            console.log(`[요청] 예약 목록 조회 시작 (Store ID: ${storeId})`);
            
            // 백엔드 API 호출
            const response = await axios.get(`http://localhost:8484/api/store/reservations/${storeId}`);
            
            console.log("[응답] 받아온 데이터:", response.data);
            setReservations(response.data);
        } catch (error) {
            console.error("[에러] 데이터 로딩 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // storeId가 변경될 때마다 실행
    useEffect(() => {
        fetchReservations();
    }, [storeId]);

    // 승인/거절 처리 핸들러
    const handleStatus = async (rsvNo, newStatus) => {
        const action = newStatus === 'APPROVED' ? '승인' : '거절';
        
        if (!window.confirm(`정말 이 예약을 ${action}하시겠습니까?`)) return;

        try {
            await axios.put(`http://localhost:8484/api/store/reservation/${rsvNo}/status`, {
                status: newStatus
            });
            alert(`예약이 ${action}되었습니다.`);
            fetchReservations(); // 목록 새로고침
        } catch (error) {
            console.error("상태 변경 실패:", error);
            alert("처리 중 오류가 발생했습니다.");
        }
    };

    // 날짜 포맷 함수
    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ` +
               `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
    };

    // 뱃지 스타일 반환 함수
    const getBadge = (status) => {
        if (status === 'APPROVED') return <span className="badge confirm">승인됨</span>;
        if (status === 'CANCELED') return <span className="badge cancel">취소됨</span>;
        if (status === 'COMPLETED') return <span className="badge complete">정비완료</span>;
        return <span className="badge pending">대기중</span>;
    };

    return (
        <div className="store-rsv-container">
            <h2>🛠️ 정비 예약 관리 (업체용)</h2>
            
            {/* 현재 관리 중인 ID 표시 (디버깅용, 나중에 지워도 됨) */}
            <p style={{textAlign: 'right', color: '#888', fontSize: '14px'}}>
                관리 대상 ID: <strong>{storeId}</strong>
            </p>

            <div className="table-wrapper">
                <table className="store-rsv-table">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>예약일시</th>
                            <th>고객명 (연락처)</th>
                            <th>차종 / 서비스</th>
                            <th>요청사항</th>
                            <th>상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="7" className="center-msg">로딩중...</td></tr>
                        ) : reservations.length === 0 ? (
                            <tr><td colSpan="7" className="center-msg">접수된 예약 내역이 없습니다.</td></tr>
                        ) : (
                            reservations.map((item) => (
                                <tr key={item.rsvNo}>
                                    <td>{item.rsvNo}</td>
                                    <td>{formatDate(item.rsvDate)}</td>
                                    <td>
                                        <div className="cust-name">{item.customerName}</div>
                                        <div className="cust-phone">{item.customerPhone}</div>
                                    </td>
                                    <td>
                                        <div className="car-model">{item.carModel}</div>
                                        <div className="svc-type">{item.serviceType}</div>
                                    </td>
                                    <td className="memo-box">{item.requestMemo || "-"}</td>
                                    <td>{getBadge(item.status)}</td>
                                    <td>
                                        {/* 대기(PENDING) 상태일 때만 버튼 표시 */}
                                        {item.status === 'PENDING' && (
                                            <div className="btns">
                                                <button className="btn-ok" onClick={() => handleStatus(item.rsvNo, 'APPROVED')}>승인</button>
                                                <button className="btn-no" onClick={() => handleStatus(item.rsvNo, 'CANCELED')}>거절</button>
                                            </div>
                                        )}
                                        {/* 그 외 상태는 처리됨 텍스트 표시 */}
                                        {item.status !== 'PENDING' && <span className="done-txt">처리됨</span>}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreReservation;