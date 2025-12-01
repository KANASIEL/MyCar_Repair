import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './reservation.css'; 

// 현재 시각을 YYYY-MM-DDThh:mm 포맷으로 변환 (min 속성용)
const getMinDatetimeLocal = () => {
    const now = new Date();
    // 5분 단위 올림
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(Math.ceil(now.getMinutes() / 5) * 5).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const Reservation = () => {
    const navigate = useNavigate();

    const minDatetime = getMinDatetimeLocal(); 

    const [stores, setStores] = useState([]); 
    const [isStoreLoading, setIsStoreLoading] = useState(true); 
    // ⭐️ 오류 메시지 상태 추가 (네트워크 오류 발생 시 사용)
    const [storeError, setStoreError] = useState(null); 

    const [reservationData, setReservationData] = useState({
        accountId: sessionStorage.getItem('ACCOUNT_ID') || '',
        storeId: '',      
        rsvDate: '',      
        carModel: '',    
        serviceType: '',  
        requestMemo: '',  
    });
    
    const [isLoading, setIsLoading] = useState(false);

    // ⭐️ useEffect: 컴포넌트 마운트 시 정비소 목록 불러오기
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:8484/api/stores'); 
                const fetchedStores = response.data;

                setStores(fetchedStores);
                
                // 목록이 비어있지 않다면 첫 번째 항목을 기본값으로 설정 (UX 개선)
                if (fetchedStores.length > 0) {
                     setReservationData(prev => ({ ...prev, storeId: fetchedStores[0].storeId }));
                }

                setIsStoreLoading(false); 
                
            } catch (error) {
                console.error("정비소 목록 로딩 실패:", error);
                // ⭐️ 오류 메시지 상태를 설정
                setStoreError("정비소 목록을 불러오는 데 실패했습니다."); 
                setIsStoreLoading(false);
            }
        };

        fetchStores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ⭐️ 정비소 목록 로딩에 실패했거나, 목록이 비어있다면 예약 제출 방지
        if (isStoreLoading || stores.length === 0 || storeError) {
             alert("예약 가능한 정비소가 없어 예약을 진행할 수 없습니다.");
             return;
        }

        if (isLoading) return; 

        // 1. 필수 필드 검증
        const { storeId, rsvDate, carModel, serviceType } = reservationData;
        
        if (!storeId || !rsvDate || !carModel || !serviceType) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        // 2. 예약 시간 유효성 검증
        if (new Date(rsvDate) < new Date(minDatetime)) {
            alert("예약 시간은 현재 시각 이후로 선택해야 합니다.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:8484/api/reservation', 
                reservationData,
                { withCredentials: true }
            );

            if (response.status === 201 || response.status === 200) {
                alert("예약이 성공적으로 등록되었습니다. 업체 승인을 기다려주세요.");
                navigate(-1); 
            } else {
                 alert(`예약 등록에 실패했습니다. (응답 코드: ${response.status})`);
            }

        } catch (error) {
            console.error("예약 등록 실패:", error.response || error);
            const errorMessage = error.response?.data?.message || "예약 등록 중 서버 오류가 발생했습니다. 관리자에게 문의하세요.";
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // ⭐️ 로딩/목록 없음 조건 없이 폼을 바로 렌더링
    return (
        <div className="reservation-container">
            <h2>정비 예약하기</h2>
            <form onSubmit={handleSubmit}>
                <table className="reservation-form-table">
                    <tbody>
                        {/* 1. 정비소 선택 (⭐️ SELECT 드롭다운 내부에서 상태 처리) */}
                        <tr>
                            <th>정비소 선택</th>
                            <td>
                                {isStoreLoading ? (
                                    <p>정비소 목록을 불러오는 중...</p>
                                ) : storeError || stores.length === 0 ? (
                                    <p className="error-message">
                                        {storeError || "현재 예약 가능한 정비소가 없습니다."}
                                    </p>
                                ) : (
                                    <select 
                                        name="storeId" 
                                        value={reservationData.storeId} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        {/* 선택된 정비소가 없을 때만 '선택하세요' 표시 */}
                                        {!reservationData.storeId && (
                                            <option value="" disabled>정비소를 선택하세요</option>
                                        )}
                                        {/* DB에서 불러온 정비소 목록을 옵션으로 생성 */}
                                        {stores.map(store => (
                                            <option key={store.storeId} value={store.storeId}>
                                                {store.storeName} ({store.address})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </td>
                        </tr>
                        
                        {/* 2. 예약 날짜/시간 */}
                        <tr>
                            <th>예약 날짜/시간</th>
                            <td>
                                <input
                                    type="datetime-local" name="rsvDate" value={reservationData.rsvDate} onChange={handleChange}
                                    min={minDatetime} 
                                    step="300"
                                    required
                                />
                                <small> (현재 시간 이후, 업체 영업 시간 내로 선택하세요)</small>
                            </td>
                        </tr>
                        
                        {/* 3. 차량 모델 */}
                        <tr>
                            <th>차량 모델</th>
                            <td>
                                <input type="text" name="carModel" value={reservationData.carModel} onChange={handleChange}
                                    placeholder="차종 입력 (예: 기아 K5)" required
                                />
                            </td>
                        </tr>
                        {/* 4. 희망 서비스 */}
                        <tr>
                            <th>희망 서비스</th>
                            <td>
                                <select name="serviceType" value={reservationData.serviceType} onChange={handleChange} required>
                                    <option value="">선택하세요</option>
                                    <option value="엔진오일 교환">엔진오일 교환</option>
                                    <option value="타이어 교체">타이어 교체</option>
                                    <option value="브레이크 패드 교체">브레이크 패드 교체</option>
                                    <option value="정기 점검">정기 점검</option>
                                    <option value="기타">기타</option>
                                </select>
                            </td>
                        </tr>
                        {/* 5. 요청 사항 */}
                        <tr>
                            <th>요청 사항</th>
                            <td>
                                <textarea name="requestMemo" value={reservationData.requestMemo} onChange={handleChange}
                                    placeholder="특이 사항이나 요청 메모를 남겨주세요."
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="button-group">
                    <button 
                        type="submit" 
                        className="btn-submit" 
                        disabled={isLoading || stores.length === 0 || isStoreLoading || storeError} 
                        // ⭐️ 로딩 중이거나 정비소가 없으면 버튼 비활성화
                    >
                        {isLoading ? '예약 신청 중...' : '예약 신청'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => navigate(-1)} disabled={isLoading}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Reservation;