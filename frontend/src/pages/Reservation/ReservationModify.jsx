import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // useParams 추가
import './reservation.css'; 

// 현재 시각을 YYYY-MM-DDThh:mm 포맷으로 변환 (min 속성용)
const getMinDatetimeLocal = () => {
    const now = new Date();
    // 5분 단위 올림 로직 유지
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(Math.ceil(now.getMinutes() / 5) * 5).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const ReservationModify = () => {
    const navigate = useNavigate();
    // ⭐️ URL 파라미터에서 예약 번호(rsvNo) 가져오기
    const { rsvNo } = useParams(); 
    const isModifyMode = !!rsvNo; // rsvNo가 있으면 수정 모드

    const minDatetime = getMinDatetimeLocal(); 

    // 정비소 목록 및 로딩 상태
    const [stores, setStores] = useState([]); 
    const [isStoreLoading, setIsStoreLoading] = useState(true); 
    const [storeError, setStoreError] = useState(null); 
    
    // ⭐️ 예약 데이터 상태 (rsvNo 필드 포함)
    const [reservationData, setReservationData] = useState({
        accountId: sessionStorage.getItem('ACCOUNT_ID') || '',
        storeId: '',      
        rsvDate: '',      
        carModel: '',    
        serviceType: '',  
        requestMemo: '',
        rsvNo: rsvNo || null,
    });
    const [isLoading, setIsLoading] = useState(false);

    // ⭐️ useEffect: 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        
        // 예약 상세 정보를 불러오는 내부 함수
        const fetchReservationDetail = async () => {
            if (!rsvNo) return;
            
            try {
                // GET /api/reservation/{rsvNo} 호출하여 상세 데이터 로드
                const response = await axios.get(`http://localhost:8484/api/reservation/${rsvNo}`);
                const detail = response.data;
                
                // DB에서 불러온 날짜/시간 포맷을 input 타입에 맞게 조정 (YYYY-MM-DDTHH:MM)
                const formattedRsvDate = detail.rsvDate ? detail.rsvDate.substring(0, 16) : ''; 
                
                setReservationData({
                    accountId: detail.accountId,
                    storeId: detail.storeId,
                    rsvDate: formattedRsvDate, 
                    carModel: detail.carModel,
                    serviceType: detail.serviceType,
                    requestMemo: detail.requestMemo || '',
                    rsvNo: detail.rsvNo
                });
                
            } catch (error) {
                alert("예약 상세 정보를 불러오는 데 실패했거나 수정할 수 없는 상태입니다.");
                navigate('/reservation/history'); 
            }
        };


        const fetchStores = async () => {
            try {
                // 1. 정비소 목록 로드 (공통)
                const response = await axios.get('http://localhost:8484/api/stores'); 
                const fetchedStores = response.data;
                setStores(fetchedStores);
                setIsStoreLoading(false); 
                
                // 2. 수정 모드일 때 기존 데이터 로드 후 폼 채우기
                if (isModifyMode) {
                    await fetchReservationDetail();
                } else if (fetchedStores.length > 0) {
                    // 등록 모드: 첫 번째 정비소를 기본값으로 설정
                    setReservationData(prev => ({ ...prev, storeId: fetchedStores[0].storeId }));
                }
            } catch (error) {
                console.error("정비소 목록 로딩 실패:", error);
                setStoreError("정비소 목록을 불러오는 데 실패했습니다."); 
                setIsStoreLoading(false);
            }
        };

        fetchStores();
    }, [rsvNo, navigate]); // rsvNo가 변경될 때마다 재실행

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ... (유효성 검증 로직 생략) ...
        if (isStoreLoading || stores.length === 0 || storeError) {
             alert("예약 가능한 정비소가 없어 예약을 진행할 수 없습니다.");
             return;
        }
        if (isLoading) return; 

        // 필수 필드 검증 (생략)
        const { storeId, rsvDate, carModel, serviceType } = reservationData;
        if (!storeId || !rsvDate || !carModel || !serviceType) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }
        // 시간 유효성 검증 (생략)
        if (new Date(rsvDate) < new Date(minDatetime)) {
            alert("예약 시간은 현재 시각 이후로 선택해야 합니다.");
            return;
        }

        setIsLoading(true);

        try {
            // ⭐️ API 엔드포인트 및 HTTP 메서드 선택: rsvNo가 있으면 PUT, 없으면 POST
            const apiEndpoint = `http://localhost:8484/api/reservation${isModifyMode ? '/' + rsvNo : ''}`;
            const method = isModifyMode ? axios.put : axios.post; // 수정이면 PUT, 등록이면 POST
            
            const response = await method(
                apiEndpoint, 
                reservationData,
                { withCredentials: true }
            );

            if (response.status === 201 || response.status === 200) {
                alert(`예약이 성공적으로 ${isModifyMode ? '수정' : '등록'}되었습니다. 업체 승인을 기다려주세요.`);
                navigate('/reservation/history'); // 수정/등록 후 예약 목록으로 이동
            } else {
                alert(`예약 ${isModifyMode ? '수정' : '등록'}에 실패했습니다. (응답 코드: ${response.status})`);
            }

        } catch (error) {
            console.error("예약 처리 실패:", error.response || error);
            const errorMessage = error.response?.data?.message || `예약 ${isModifyMode ? '수정' : '등록'} 중 서버 오류가 발생했습니다.`;
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="reservation-container">
            <h2>정비 예약 {isModifyMode ? '수정' : '하기'}</h2> {/* ⭐️ 제목 변경 */}
            <form onSubmit={handleSubmit}>
                <table className="reservation-form-table">
                    <tbody>
                        {/* 1. 정비소 선택 (수정 모드 시 변경 불가) */}
                        <tr>
                            <th>정비소 선택</th>
                            <td>
                                {!isStoreLoading && !storeError && stores.length > 0 && (
                                    <select 
                                        name="storeId" 
                                        value={reservationData.storeId} 
                                        onChange={handleChange} 
                                        required
                                        disabled={isModifyMode} // ⭐️ 수정 모드 시 비활성화
                                    >
                                        <option value="" disabled>정비소를 선택하세요</option>
                                        {stores.map(store => (
                                            <option key={store.storeId} value={store.storeId}>
                                                {store.storeName} ({store.address})
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {(isStoreLoading || storeError || stores.length === 0) && (
                                    <p className="error-message">
                                        {isStoreLoading ? '로딩 중...' : storeError || "정비소 없음."}
                                    </p>
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
                        <tr><th>차량 모델</th><td><input type="text" name="carModel" value={reservationData.carModel} onChange={handleChange} placeholder="차종 입력 (예: 기아 K5)" required /></td></tr>
                        {/* 4. 희망 서비스 */}
                        <tr><th>희망 서비스</th><td><select name="serviceType" value={reservationData.serviceType} onChange={handleChange} required><option value="">선택하세요</option><option value="엔진오일 교환">엔진오일 교환</option><option value="타이어 교체">타이어 교체</option><option value="브레이크 패드 교체">브레이크 패드 교체</option><option value="정기 점검">정기 점검</option><option value="기타">기타</option></select></td></tr>
                        {/* 5. 요청 사항 */}
                        <tr><th>요청 사항</th><td><textarea name="requestMemo" value={reservationData.requestMemo} onChange={handleChange} placeholder="특이 사항이나 요청 메모를 남겨주세요." /></td></tr>
                    </tbody>
                </table>
                
                <div className="button-group">
                    <button 
                        type="submit" 
                        className="btn-submit" 
                        disabled={isLoading || isStoreLoading || storeError} 
                    >
                        {isModifyMode ? (isLoading ? '수정 중...' : '수정 완료') : (isLoading ? '신청 중...' : '예약 신청')}
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => navigate('/reservation/history')} disabled={isLoading}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationModify;