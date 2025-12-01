// src/components/Maintenance/Maintenance.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Maintenance.css';

export default function Maintenance() {
    const [myCars, setMyCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [tab, setTab] = useState('repair');
    const [repairs, setRepairs] = useState([]);
    const [consumableLogs, setConsumableLogs] = useState([]);
    const [consumableItems, setConsumableItems] = useState([]);
    const [favoriteOrder, setFavoriteOrder] = useState({}); // 즐겨찾기 순서 상태
    const [modal, setModal] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // 날짜 포맷
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\. /g, '-').replace(/\.$/, '');
    };

    // 초기 데이터 로드
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const carsRes = await axios.get('/api/maintenance/cars');
                setMyCars(carsRes.data);
                if (carsRes.data.length > 0) {
                    setSelectedCar(carsRes.data[0]);
                }

                const itemsRes = await axios.get('/api/maintenance/consumables');
                setConsumableItems(itemsRes.data);
            } catch (err) {
                alert('데이터 로드 실패');
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    // 차량 바뀔 때마다 모든 데이터 + 즐겨찾기 불러오기
    useEffect(() => {
        if (!selectedCar) return;

        const loadCarData = async () => {
            try {
                const [repairRes, logRes, favRes] = await Promise.all([
                    axios.get(`/api/maintenance/repairHistory/${selectedCar.car_number}`),
                    axios.get(`/api/maintenance/consumable/log/${selectedCar.car_number}`),
                    axios.get(`/api/maintenance/${encodeURIComponent(selectedCar.car_number)}`)
                ]);

                setRepairs(repairRes.data);
                setConsumableLogs(logRes.data);
                setFavoriteOrder(favRes.data || {}); // 즐겨찾기 순서 적용
            } catch (err) {
                console.error(err);
                setRepairs([]);
                setConsumableLogs([]);
                setFavoriteOrder({});
            }
        };
        loadCarData();
    }, [selectedCar]);

    const currentMileage = selectedCar?.car_mileage || 0;

    const getLatestLog = (key) => {
        return consumableLogs
            .filter(log => log.consumable_key === key)
            .sort((a, b) => new Date(b.replacement_date) - new Date(a.replacement_date))[0];
    };

    // 즐겨찾기 토글 함수
    const toggleFavorite = async (consumable_key) => {
        try {
            await axios.post('/api/maintenance/toggle', {
                car_number: selectedCar.car_number,      // ← car_number → carNumber
                consumable_key: consumable_key           // ← consumable_key → consumableKey
            });

            setFavoriteOrder(prev => {
                const newOrder = { ...prev };
                if (newOrder[consumable_key]) {
                    delete newOrder[consumable_key]; // 해제
                } else {
                    const nextOrder = Object.keys(newOrder).length + 1;
                    newOrder[consumable_key] = nextOrder; // 맨 위로 추가
                }
                return newOrder;
            });
        } catch (err) {
            alert('즐겨찾기 처리 실패');
        }
    };

    // 정비 이력 추가
    const handleAddRepair = async () => {
        const payload = {
            car_number: selectedCar.car_number,
            repair_date: document.getElementById('repair-date').value,
            mileage: parseInt(document.getElementById('repair-mileage').value),
            description: document.getElementById('repair-desc').value,
            shop_name: document.getElementById('repair-shop').value || null,
            cost: parseInt(document.getElementById('repair-cost').value) || null,
            memo: document.getElementById('repair-memo').value || null,
        };

        try {
            const res = await axios.post('/api/maintenance/repair', payload);
            setRepairs(prev => [res.data, ...prev]);
            setModal(null);
        } catch (err) {
            alert('정비 등록 실패');
        }
    };

    // 소모품 교체 추가
    const handleAddConsumableLog = async () => {
        const payload = {
            car_number: selectedCar.car_number,
            consumable_key: document.getElementById('consumable-key').value,
            replacement_date: document.getElementById('consumable-date').value,
            replacement_mileage: parseInt(document.getElementById('consumable-mileage').value),
            shop_name: document.getElementById('consumable-shop').value || null,
            cost: parseInt(document.getElementById('consumable-cost').value) || null,
            memo: document.getElementById('consumable-memo').value || null,
        };

        try {
            const res = await axios.post('/api/maintenance/consumable/log', payload);
            setConsumableLogs(prev => [res.data, ...prev]);
            setModal(null);
        } catch (err) {
            alert('소모품 등록 실패');
        }
    };

    const handleDeleteRepair = async (repair_id) => {
        if (!confirm('정비 이력을 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`/api/maintenance/delete/repairHistory/${repair_id}`);
            setRepairs(prev => prev.filter(r => r.repair_id !== repair_id));
        } catch (err) {
            alert('삭제 실패');
        }
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (myCars.length === 0) return (
        <div className="maintenance-no-cars">
            <div className="icon">Car</div>
            <h2>등록된 차량이 없습니다</h2>
            <p>
                아직 내 차량을 등록하지 않으셨네요!<br />
                마이페이지에서 차량을 등록하면 정비 이력과 소모품 관리를 시작할 수 있어요.
            </p>
            <button
                className="btn-add-car"
                onClick={() => window.location.href = '/mypage/user'}  // 마이페이지로 이동
            >
                + 내 차량 등록하러 가기
            </button>
        </div>
    );

    return (
        <div className="maintenance-app">
            <div className="maintenance-container">
                {/* 차량 선택기 */}
                <div className="maintenance-car-selector">
                    <label>내 차량 선택</label>
                    <select
                        value={selectedCar?.car_number || ''}
                        onChange={(e) => {
                            const car = myCars.find(c => c.car_number === e.target.value);
                            setSelectedCar(car);
                        }}
                    >
                        {myCars.map(car => (
                            <option key={car.car_number} value={car.car_number}>
                                {car.car_number} · {car.car_model} ({new Date(car.model_year).getFullYear()}년식)
                            </option>
                        ))}
                    </select>
                </div>

                <header className="maintenance-header">
                    <h1>정비 & 소모품 관리</h1>
                    <div className="maintenance-carinfo">
                        {selectedCar.car_number} · {selectedCar.car_model}<br />
                        현재 주행거리: <strong>{currentMileage.toLocaleString()} km</strong>
                    </div>
                </header>

                <div className="maintenance-tabs">
                    <div className={`maintenance-tab ${tab === 'repair' ? 'active' : ''}`} onClick={() => setTab('repair')}>
                        정비 이력
                    </div>
                    <div className={`maintenance-tab ${tab === 'consumable' ? 'active' : ''}`} onClick={() => setTab('consumable')}>
                        소모품 관리
                    </div>
                </div>

                <div className="maintenance-content">
                    {tab === 'repair' ? (
                        <>
                            <button className="maintenance-btn" onClick={() => setModal('repair')}>+ 정비 이력 추가</button>
                            <table className="maintenance-table">
                                <thead>
                                <tr>
                                    <th>날짜</th><th>주행거리</th><th>내용</th><th>정비소</th><th>비용</th><th>메모</th><th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {repairs.map(r => (
                                    <tr key={r.repair_id}>
                                        <td>{formatDate(r.repair_date)}</td>
                                        <td>{r.mileage?.toLocaleString() || '-'} km</td>
                                        <td>{r.description || '-'}</td>
                                        <td>{r.shop_name || '-'}</td>
                                        <td>{r.cost ? r.cost.toLocaleString() + '원' : '-'}</td>
                                        <td>{r.memo || '-'}</td>
                                        <td>
                                            <button className="maintenance-btn-danger" onClick={() => handleDeleteRepair(r.repair_id)}>
                                                삭제
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <button className="maintenance-btn" onClick={() => setModal('consumable')}>+ 소모품 교체 추가</button>
                            <div className="maintenance-grid">
                                {[...consumableItems]
                                    .sort((a, b) => (favoriteOrder[a.consumable_key] || 999) - (favoriteOrder[b.consumable_key] || 999))
                                    .map(item => {
                                        const latest = getLatestLog(item.consumable_key);
                                        const kmSince = latest ? currentMileage - latest.replacement_mileage : null;
                                        const remainKm = latest && item.standard_cycle_km ? item.standard_cycle_km - kmSince : null;
                                        const isWarning = remainKm !== null && remainKm < 3000;
                                        const isOver = remainKm !== null && remainKm <= 0;

                                        const allLogs = consumableLogs
                                            .filter(l => l.consumable_key === item.consumable_key)
                                            .sort((a, b) => new Date(b.replacement_date) - new Date(a.replacement_date));

                                        return (
                                            <div
                                                key={item.consumable_key}
                                                className={`maintenance-card ${isWarning ? 'warning' : isOver ? 'danger' : ''}`}
                                                onClick={() => setSelectedItem({ ...item, logs: allLogs })}
                                            >
                                                {/* 즐겨찾기 별 버튼 */}
                                                <button
                                                    className="favorite-star"
                                                    data-favorite={!!favoriteOrder[item.consumable_key]}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(item.consumable_key);
                                                    }}
                                                >
                                                    {favoriteOrder[item.consumable_key] ? '★' : '☆'}
                                                </button>

                                                <h3>{item.name}</h3>
                                                {latest ? (
                                                    <>
                                                        <p>최근: {formatDate(latest.replacement_date)}<br />
                                                            ({latest.replacement_mileage?.toLocaleString()}km)</p>
                                                        {item.standard_cycle_km > 0 && <p>주기: {item.standard_cycle_km.toLocaleString()}km</p>}
                                                        {remainKm !== null && (
                                                            remainKm > 0
                                                                ? <p><strong>{remainKm.toLocaleString()}km 남음</strong></p>
                                                                : <p className="over"><strong>{Math.abs(remainKm).toLocaleString()}km 초과!</strong></p>
                                                        )}
                                                    </>
                                                ) : (
                                                    <p className="no-record">교체 이력 없음</p>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </>
                    )}
                </div>

                {/* 소모품 상세 모달 */}
                {selectedItem && (
                    <div className="maintenance-modal active" onClick={() => setSelectedItem(null)}>
                        <div className="maintenance-modal-content" onClick={e => e.stopPropagation()}>
                            <div className="maintenance-modal-header">{selectedItem.name} 교체 이력</div>
                            {selectedItem.logs.length === 0 ? (
                                <p style={{textAlign:'center', padding:'50px', color:'#666'}}>교체 이력이 없습니다.</p>
                            ) : (
                                <table className="maintenance-table">
                                    <thead><tr><th>교체일</th><th>주행거리</th><th>장소</th><th>비용</th><th>메모</th></tr></thead>
                                    <tbody>
                                    {selectedItem.logs.map(log => (
                                        <tr key={log.replace_id}>
                                            <td>{formatDate(log.replacement_date)}</td>
                                            <td>{log.replacement_mileage?.toLocaleString()} km</td>
                                            <td>{log.shop_name || '-'}</td>
                                            <td>{log.cost ? log.cost.toLocaleString() + '원' : '-'}</td>
                                            <td>{log.memo || '-'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                            <div className="maintenance-modal-footer">
                                <button className="maintenance-btn" style={{background:'#64748b'}} onClick={() => setSelectedItem(null)}>닫기</button>
                                <button className="maintenance-btn" onClick={() => {
                                    setModal('consumable');
                                    setSelectedItem(null);
                                    setTimeout(() => {
                                        document.getElementById('consumable-key').value = selectedItem.consumable_key;
                                    }, 100);
                                }}>
                                    + 새 교체 등록
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 정비 이력 추가 모달 */}
                {modal === 'repair' && (
                    <div className="maintenance-modal active" onClick={() => setModal(null)}>
                        <div className="maintenance-modal-content" onClick={e => e.stopPropagation()}>
                            <div className="maintenance-modal-header">정비 이력 추가</div>
                            <div className="maintenance-form-group"><label>날짜</label><input type="date" id="repair-date" required /></div>
                            <div className="maintenance-form-group"><label>주행거리</label><input type="number" id="repair-mileage" defaultValue={currentMileage} required /></div>
                            <div className="maintenance-form-group"><label>정비 내용</label><textarea id="repair-desc" rows="3" required></textarea></div>
                            <div className="maintenance-form-group"><label>정비소</label><input type="text" id="repair-shop" /></div>
                            <div className="maintenance-form-group"><label>비용</label><input type="number" id="repair-cost" /></div>
                            <div className="maintenance-form-group"><label>메모</label><textarea id="repair-memo" rows="2"></textarea></div>
                            <div className="maintenance-modal-footer">
                                <button className="maintenance-btn" style={{background:'#64748b'}} onClick={() => setModal(null)}>취소</button>
                                <button className="maintenance-btn" onClick={handleAddRepair}>저장</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 소모품 교체 등록 모달 */}
                {modal === 'consumable' && (
                    <div className="maintenance-modal active" onClick={() => setModal(null)}>
                        <div className="maintenance-modal-content" onClick={e => e.stopPropagation()}>
                            <div className="maintenance-modal-header">소모품 교체 등록</div>
                            <div className="maintenance-form-group">
                                <label>소모품</label>
                                <select id="consumable-key" required>
                                    {consumableItems.map(item => (
                                        <option key={item.consumable_key} value={item.consumable_key}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="maintenance-form-group"><label>교체일</label><input type="date" id="consumable-date" required /></div>
                            <div className="maintenance-form-group"><label>주행거리</label><input type="number" id="consumable-mileage" defaultValue={currentMileage} required /></div>
                            <div className="maintenance-form-group"><label>장소</label><input type="text" id="consumable-shop" /></div>
                            <div className="maintenance-form-group"><label>비용</label><input type="number" id="consumable-cost" /></div>
                            <div className="maintenance-form-group"><label>메모</label><textarea id="consumable-memo" rows="2"></textarea></div>
                            <div className="maintenance-modal-footer">
                                <button className="maintenance-btn" style={{background:'#64748b'}} onClick={() => setModal(null)}>취소</button>
                                <button className="maintenance-btn" onClick={handleAddConsumableLog}>저장</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}