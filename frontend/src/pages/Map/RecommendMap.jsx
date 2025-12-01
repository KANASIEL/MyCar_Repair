import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MapPin, Search, Phone, Navigation, Filter } from 'lucide-react';
import './RecommendMap.css'; // 수정된 CSS 파일 연결

export default function RecommendMap() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLoc, setSelectedLoc] = useState(null);
  const mapContainer = useRef(null);
  const infoWindowRef = useRef(null);
  const allMarkersRef = useRef({});
  // 🚨 JS 수정 필요: 리스트 패널과 항목 참조
  const listPanelRef = useRef(null); 
  const itemRefs = useRef({}); 

  // ESC로 패널 닫기
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && selectedLoc) {
        resetSelection();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedLoc]);

  // 1. 지도 초기화 (JSP의 initMap 대체)
  useEffect(() => {
    const container = mapContainer.current;
    
    // 카카오맵 로드 대기 (네트워크 속도 고려하여 0.1초마다 체크)
    const waitForKakao = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(waitForKakao);
        
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 11
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);
        
        // 초기 데이터 로드
        loadMarkers(""); 

        // 컨테이너 크기 변화 시 지도 리레이아웃 처리
        const handleResize = () => {
          if (kakaoMap) {
            kakaoMap.relayout();
          }
        };
        window.addEventListener('resize', handleResize);
        // 초기 한 번 강제 relayout (비가시 상태였다가 보일 때 대비)
        setTimeout(() => kakaoMap.relayout(), 100);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }, 100);

    return () => clearInterval(waitForKakao);
  }, []);
  
  // 🚨 JS 수정 필요: 선택된 항목으로 스크롤 이동
  useEffect(() => {
      if (selectedLoc && listPanelRef.current) {
          const key = selectedLoc.storeId;
          const selectedElement = itemRefs.current[key];
          
          if (selectedElement) {
              // 스크롤 이동 (smooth behavior)
              selectedElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start' // 상단에 맞춤
              });
          }
      }
  }, [selectedLoc]);


  // 2. 데이터 불러오기 (Spring Boot API 호출)
  const loadMarkers = async (region) => {
    try {
      // Vite proxy를 사용해 동일 출처로 요청
      const response = await axios.get('/api/react/recommend', {
        params: { region: region }
      });
      const raw = response.data;
      const list = Array.isArray(raw) ? raw : (Array.isArray(raw?.list) ? raw.list : []);
      setRecommendList(list);
      drawMarkers(list);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  };

  // 3. 마커 그리기
  const drawMarkers = (list) => {
    if (!map) return;
    const { kakao } = window;

    // 기존 마커 삭제
    markers.forEach(m => m.setMap(null));
    const newMarkers = [];
    allMarkersRef.current = {};
    const bounds = new kakao.maps.LatLngBounds();

    list.forEach(loc => {
        if (!loc.latitude || !loc.longitude) return;

        const position = new kakao.maps.LatLng(loc.latitude, loc.longitude);
        const marker = new kakao.maps.Marker({ position, map: map });

        // 마커 클릭 이벤트 (인포윈도우 열기)
        kakao.maps.event.addListener(marker, 'click', () => {
            handleSelectLocation(loc);
        });

        newMarkers.push(marker);
        bounds.extend(position);

        // storeId 기준으로 참조 저장 (없으면 좌표 문자열 fallback)
        const key = loc.storeId || `${loc.latitude},${loc.longitude}`;
        allMarkersRef.current[key] = marker;
    });

    setMarkers(newMarkers);
    
    // 검색 결과가 있으면 지도 범위 재설정, 없으면 서울 중심으로 이동
    if (list.length > 0) {
        map.setBounds(bounds);
    } else {
        map.setCenter(new kakao.maps.LatLng(37.5665, 126.9780));
        map.setLevel(11);
    }
  };

  // 인포윈도우 열기
  const openInfoWindow = (marker, loc) => {
      const { kakao } = window;
      
      // 기존에 열린 인포윈도우가 있으면 닫기
      if (infoWindowRef.current) {
          infoWindowRef.current.close();
      }

      // 인포윈도우 내용 (HTML)
      const content = `
          <div style="padding:16px; min-width:220px; border-radius:12px; background:white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
              <h4 style="margin:0 0 8px; font-weight:700; font-size:16px; color:#111827; display:flex; align-items:center; gap:6px;">
                  <span style="color:#0d9488;">📍</span> ${loc.storeId}
              </h4>
              <p style="margin:0 0 6px; color:#4b5563; font-size:13px;">${loc.address}</p>
              <p style="margin:0; color:#0d9488; font-weight:600; font-size:13px;">📞 ${loc.phoneNumber || '전화번호 없음'}</p>
          </div>
      `;

      const iw = new kakao.maps.InfoWindow({ content, removable: true });
      iw.open(map, marker);
      infoWindowRef.current = iw;
  };
  
  // 길찾기 기능 (실제 카카오맵 길찾기 페이지로 이동)
  const openDirections = (loc) => {
      if (!loc.address) {
          alert("주소 정보가 없어 길찾기를 실행할 수 없습니다.");
          return;
      }
      // 카카오맵 길찾기 URL: https://map.kakao.com/link/to/목적지이름,위도,경도
      const url = `https://map.kakao.com/link/to/${loc.storeId},${loc.latitude},${loc.longitude}`;
      window.open(url, '_blank');
  };

  // 주소 복사 기능
  const copyAddress = (loc) => {
      if (loc.address) {
          navigator.clipboard.writeText(loc.address)
              .then(() => alert(`주소 복사 완료: ${loc.address}`))
              .catch(err => console.error('주소 복사 실패:', err));
      } else {
          alert("복사할 주소가 없습니다.");
      }
  };


  // 리스트 클릭 시 해당 위치로 지도 이동
  const handleListClick = (loc) => {
      handleSelectLocation(loc);
  };

  // 선택 공통 처리: 지도 이동 + 선택 마커만 표시 + 인포윈도우 열기
  const handleSelectLocation = (loc) => {
      if (!map || !loc) return;
      const { kakao } = window;
      setSelectedLoc(loc);
      const pos = new kakao.maps.LatLng(loc.latitude, loc.longitude);
      map.setLevel(4);
      map.panTo(pos);

      // 마커 표시 제어: 선택만 보이게
      Object.values(allMarkersRef.current).forEach(m => m.setMap(null));
      const key = loc.storeId || `${loc.latitude},${loc.longitude}`;
      const selMarker = allMarkersRef.current[key];
      if (selMarker) {
        selMarker.setMap(map);
        openInfoWindow(selMarker, loc);
      }
  };

  // 선택 해제/전체보기
  const resetSelection = () => {
      setSelectedLoc(null);
      drawMarkers(recommendList);
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null;
      }
  };

  const listLen = Array.isArray(recommendList) ? recommendList.length : 0;

  return (
    <div className="map-page-container">
      <div className="content-wrapper">

        {/* 1. 히어로 배너 */}
        <div className="hero-banner group"
             style={{
                 backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1543363363-c69e0303f83d?q=80&w=2070')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center 40%'
             }}>
            <div className="hero-overlay"></div>
            <div className="hero-text-container">
                <h2 className="hero-title">신뢰할 수 있는 정비소 찾기</h2>
                <p className="hero-subtitle">
                    MY CAR 정비소가 검증한 전국 정비소 위치를<br className="md:hidden"/> 한눈에 확인하세요.
                </p>
            </div>
        </div>

        {/* 2. 필터 영역 */}
        <div className="filter-section">
            <div className="filter-label">
                <Filter size={20} className="text-teal-500"/>
                <span>지역 검색</span>
            </div>
            <div className="filter-controls">
                <select 
                    className="region-select"
                    style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition:`right 0.5rem center`, backgroundRepeat:`no-repeat`, backgroundSize:`1.5em 1.5em`, paddingRight: '2.5rem'}}
                    value={selectedRegion} 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                >
                    <option value="">전체 지역</option>
                    {["서울","부산","대구","인천","광주","대전","울산","세종","경기","강원","충북","충남","전북","전남","경북","경남","제주"].map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                <button onClick={() => loadMarkers(selectedRegion)} className="search-btn">
                    <Search size={20}/> 검색
                </button>
            </div>
        </div>

        {/* 3. 메인 카드 (지도 + 리스트) */}
        <div className="main-card">
          
          {/* 좌측 리스트 (PC 버전) */}
          <div className="list-panel">
              <div className="list-header">
                  <h3 className="font-bold text-gray-800 text-lg">검색 결과</h3>
                  <span className="list-count-badge">{listLen}개</span>
                  {selectedLoc && (
                    <button onClick={resetSelection} className="text-sm font-bold text-teal-600 hover:text-teal-700">
                      전체보기
                    </button>
                  )}
              </div>
              {/* 선택된 항목 요약 정보 (선택된 경우에만 보임) */}
              {selectedLoc && (
                <div className="p-4 border-b border-gray-50 bg-gray-50/60">
                  <div className="font-bold text-gray-800 text-base flex items-center gap-2">
                    <MapPin size={18} className="text-teal-500"/>
                    {selectedLoc.storeId}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{selectedLoc.address}</div>
                  <div className="mt-1 text-sm text-teal-700 font-medium">{selectedLoc.phoneNumber || '전화번호 없음'}</div>
                </div>
              )}
              
              {/* 🚨 JS 수정 필요: 스크롤 영역에 ref와 클래스 적용 */}
              <div ref={listPanelRef} className="flex-1 min-h-0 overflow-y-auto custom-scrollbar"> 
                  {listLen === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 space-y-4">
                          <Search size={48} className="text-gray-200"/>
                          <p className="text-lg font-medium">검색 결과가 없습니다.</p>
                      </div>
                  ) : (
                      (Array.isArray(recommendList) ? recommendList : []).map((item, idx) => (
                          <div 
                              key={idx} 
                              ref={el => itemRefs.current[item.storeId] = el}
                              onClick={() => handleListClick(item)} 
                              className={`list-item group ${selectedLoc && selectedLoc.storeId === item.storeId ? 'is-selected' : ''}`}
                          >
                              <h4 className="store-name">{item.storeId}</h4>
                              <div className="mt-3 space-y-1.5">
                                  <p className="text-sm text-gray-500 flex items-start gap-2.5">
                                      <MapPin size={16} className="mt-0.5 text-gray-400 flex-shrink-0"/> 
                                      <span className="line-clamp-2">{item.address}</span>
                                  </p>
                                  <p className="text-sm text-gray-500 flex items-center gap-2.5">
                                      <Phone size={16} className="text-gray-400 flex-shrink-0"/> 
                                      <span className="font-medium text-teal-600/80">{item.phoneNumber || '전화번호 없음'}</span>
                                  </p>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>

          {/* 우측 지도 영역 */}
          <div className="map-section">
              <div ref={mapContainer} className="w-full h-full" style={{ width: '100%', height: '100%' }}></div>

              {/* 데스크톱: 우측 슬라이드 정보 패널 */}
              {selectedLoc && (
                <aside className="detail-panel">
                  <div className="panel-header">
                    <h4 className="panel-title">{selectedLoc.storeId}</h4>
                    <button className="panel-close" onClick={resetSelection}>×</button>
                  </div>
                  <div className="panel-body">
                    <p className="panel-address">{selectedLoc.address}</p>
                    <p className="panel-phone">{selectedLoc.phoneNumber || '전화번호 없음'}</p>
                    <div className="panel-actions">
                      <a className="action-btn call" href={`tel:${selectedLoc.phoneNumber || ''}`} aria-label="전화걸기">전화</a>
                      <button className="action-btn route" onClick={() => openDirections(selectedLoc)} aria-label="길찾기">길찾기</button>
                      <button className="action-btn copy" onClick={() => copyAddress(selectedLoc)} aria-label="주소복사">복사</button>
                    </div>
                  </div>
                </aside>
              )}
              
              {/* 모바일 목록 보기 버튼 */}
              <div className="mobile-list-btn-wrapper">
                  <button className="mobile-list-btn">
                      <span className="flex items-center gap-2"><Navigation size={18} className="text-teal-500"/> 목록 보기</span>
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">{listLen}개</span>
                  </button>
              </div>

              {/* 모바일: 하단 바텀시트 정보 패널 */}
              {selectedLoc && (
                <div className="detail-sheet">
                  <div className="sheet-handle" />
                  <div className="sheet-header">
                    <h4 className="sheet-title">{selectedLoc.storeId}</h4>
                    <button className="sheet-close" onClick={resetSelection}>닫기</button>
                  </div>
                  <div className="sheet-body">
                    <p className="sheet-address">{selectedLoc.address}</p>
                    <p className="sheet-phone">{selectedLoc.phoneNumber || '전화번호 없음'}</p>
                    <div className="sheet-actions">
                      <a className="action-btn call" href={`tel:${selectedLoc.phoneNumber || ''}`} aria-label="전화걸기">전화</a>
                      <button className="action-btn route" onClick={() => openDirections(selectedLoc)} aria-label="길찾기">길찾기</button>
                      <button className="action-btn copy" onClick={() => copyAddress(selectedLoc)} aria-label="주소복사">복사</button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

      </div>
    </div>
  );
}