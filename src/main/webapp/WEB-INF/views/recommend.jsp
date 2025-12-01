<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="true"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>MY CAR 정비소</title>
    <style>
        /* 1. 기본 스타일 */
        html, body { margin:0; padding:0; height:100%; width:100%; background-color: #f5f5f5; }
        
        /* 2. 필터 영역 */
        #filterBox {
            width: 90%; max-width:900px; margin: 20px auto; text-align: center;
        }
        select, button {
            padding: 8px 12px;
            font-size: 14px;
            margin: 0 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button { cursor: pointer; background-color: #f8f8f8; }
        button:hover { background-color: #e0e0e0; }

        /* 3. (수정) 맵과 목록을 감싸는 래퍼 */
        #map-wrapper {
            position: relative; /* 버튼 목록의 'absolute' 기준점 */
            width: 90%;
            max-width: 900px;
            height: 75vh;
            margin: 20px auto;
            border: 1px solid #ccc;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        /* 4. (수정) 맵 스타일 */
        #map {
            width: 100%;
            height: 100%;
        }

        /* 5. (추가) 버튼 목록 컨테이너 스타일 */
        #button-list-container {
            position: absolute; /* 맵 위에 띄우기 */
            top: 10px;
            left: 10px;
            width: 280px; /* 너비 조절 */
            height: calc(100% - 20px); /* 래퍼 높이에 맞춤 (상하 여백 10px) */
            background-color: white;
            border-radius: 5px;
            border: 1px solid #ddd;
            overflow-y: auto; /* 목록 길어지면 스크롤 */
            z-index: 10; /* 맵 컨트롤보다 위에 오도록 */
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        /* 6. (추가) 목록 안의 버튼 스타일 */
        .place-button {
            display: block;
            width: 100%;
            padding: 12px 15px;
            border: none;
            border-bottom: 1px solid #eee;
            background: #fff;
            text-align: left;
            cursor: pointer;
            font-size: 14px;
            line-height: 1.4;
        }
        .place-button:hover {
            background: #f9f9f9;
        }
        .place-button strong {
            font-size: 15px;
            color: #333;
        }
        .place-button .address {
            display: block;
            font-size: 12px;
            color: #777;
            margin-top: 4px;
        }
        /* 목록이 비었을 때 메시지 */
        .empty-message {
            text-align:center; 
            padding:30px 10px; 
            color:#888;
        
			}
			#hero-banner {
			    width: 100%;
			    height: 200px; /* 배너 높이 조절 */
			    /* 멋진 자동차 정비소 무료 이미지 예시입니다 */
			    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
			                      url('https://images.unsplash.com/photo-1543363363-c69e0303f83d?q=80&w=2070');
			    background-size: cover;
			    background-position: center 40%;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    text-align: center;
			    color: white;
			    text-shadow: 0 2px 4px rgba(0,0,0,0.6); /* 글자 잘보이게 그림자 */
			    margin-bottom: 20px; /* 타이틀과의 간격 */
			}
			.hero-content h2 {
			    font-size: 2.2em;
			    font-weight: bold;
			    margin: 0;
			}
			.hero-content p {
			    font-size: 1.1em;
			    margin-top: 10px;
			}
    </style>
</head>
<body>

<jsp:include page="/WEB-INF/views/header.jsp" />
<div id="hero-banner">
    <div class="hero-content">
        <h2>신뢰할 수 있는 정비소 찾기</h2>
        <p>MY CAR 정비소가 검증한 전국 정비소 위치를 한눈에 확인하세요.</p>
    </div>
</div>


<div id="filterBox">
	<label for="regionSelect">지역 선택:</label>
	<select id="regionSelect">
	    <option value="">전체</option>
	    <option value="서울">서울특별시</option>
	    <option value="부산">부산광역시</option>
	    <option value="대구">대구광역시</option>
	    <option value="인천">인천광역시</option>
	    <option value="광주">광주광역시</option>
	    <option value="대전">대전광역시</option>
	    <option value="울산">울산광역시</option>
	    <option value="세종">세종특별자치시</option>
	    <option value="경기">경기도</option>
	    <option value="강원">강원특별자치도</option>
	    <option value="충북">충청북도</option>
	    <option value="충남">충청남도</option>
	    <option value="전북">전북특별자치도</option>
	    <option value="전남">전라남도</option>
	    <option value="경북">경상북도</option>
	    <option value="경남">경상남도</option>
	    <option value="제주">제주특별자치도</option>
	</select>
	<button onclick="filterMarkers()">검색</button>
</div>
	
<div id="map-wrapper">
    <div id="map">지도 로드 중...</div>
    <div id="button-list-container">
        </div>
</div>

<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0b4604468a48427fe628a6489a0547be"></script>

<script>
let map, markers = [], allData = [], currentInfowindow;
let buttonListContainer;

function initMap() {
    const container = document.getElementById('map');
    buttonListContainer = document.getElementById('button-list-container');
    const center = new kakao.maps.LatLng(37.5665, 126.9780);
    map = new kakao.maps.Map(container, { center, level: 11 });
    console.log("[INFO] 지도 초기화 완료");
    loadMarkers();
}

async function loadMarkers(region = "") {
    let url = '/api/recommend';
    if (region) url += '?region=' + encodeURIComponent(region);

    try {
        const response = await fetch(url);
        const data = await response.json();
        allData = data;
        console.log(`[INFO] ${region || '전체'} 데이터 ${data.length}개 수신`);
        drawMarkers(data);
    } catch (err) {
        console.error("[ERROR] 데이터 불러오기 실패:", err);
    }
}

function drawMarkers(list) {
    markers.forEach(m => m.setMap(null));
    markers = [];
    buttonListContainer.innerHTML = '';

    const bounds = new kakao.maps.LatLngBounds();

    if (list.length === 0) {
        buttonListContainer.innerHTML = '<p class="empty-message">검색 결과가 없습니다.</p>';
        map.setCenter(new kakao.maps.LatLng(37.5665, 126.9780));
        map.setLevel(11);
        return;
    }

    list.forEach(loc => {
        if (!loc.latitude || !loc.longitude) return;
        const position = new kakao.maps.LatLng(loc.latitude, loc.longitude);
        const marker = new kakao.maps.Marker({ position });
        marker.setMap(map);
        markers.push(marker);
        bounds.extend(position);

        const infoContent = `
            <div style="padding:10px 10px 30px; font-size:13px; min-width:250px;">
                <h4 style="margin:0 0 8px;">${loc.storeId || '이름 없음'}</h4>
                <p style="margin:0;"><strong>주소:</strong> ${loc.address || '정보 없음'}</p>
                <p style="margin:0;"><strong>전화:</strong> ${loc.phoneNumber || '정보 없음'}</p>
            </div>`;

        const iw = new kakao.maps.InfoWindow({ content: infoContent, removable: true });

        const button = document.createElement('button');
        button.className = 'place-button';
        button.innerHTML = `<strong>${loc.storeId}</strong><span class="address">${loc.address}</span>`;
        buttonListContainer.appendChild(button);

        const onClick = () => {
            if (currentInfowindow) currentInfowindow.close();
            iw.open(map, marker);
            currentInfowindow = iw;
            map.setLevel(4);
            map.panTo(position);
        };

        kakao.maps.event.addListener(marker, 'click', onClick);
        button.addEventListener('click', onClick);
    });

    map.setBounds(bounds);
    console.log(`[INFO] 지도에 ${list.length}개 표시 완료`);
}

function filterMarkers() {
    const region = document.getElementById('regionSelect').value;
    loadMarkers(region);
}

const check = setInterval(() => {
    if (window.kakao && kakao.maps) {
        clearInterval(check);
        initMap();
    }
}, 100);
</script>
<jsp:include page="/WEB-INF/views/footer.jsp" />
</body>
</html>