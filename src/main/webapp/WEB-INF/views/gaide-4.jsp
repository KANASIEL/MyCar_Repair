<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>꿀 팁 가이드</title>
	<style>
	/* 꿀팁 페이지 레이아웃 (본문 + 사이드바) */
	.tips-page-wrapper {
	    display: flex;
	    width: 90%;
	    max-width: 1100px; /* 헤더와 너비 맞추기 */
	    margin: 30px auto; /* 위아래 여백 */
	    gap: 30px; /* 메인과 사이드바 간격 */
	}

	/* 1. 메인 컨텐츠 영역 (70% 정도) */
	.main-content {
	    flex: 1; /* 남는 공간 다 차지 */
	    min-width: 0; /* flex 버그 방지 */
	}

	/* 2. 사이드바 영역 (30% 정도) */
	.sidebar {
	    flex-basis: 280px; /* 고정 너비 */
	    flex-shrink: 0;
	}

	/* (상세 페이지) 글 본문 스타일 */
	.tip-article h1 {
	    font-size: 2.5em;
	    margin-bottom: 20px;
	}
	.tip-article .hero-image {
	    width: 100%;
	    height: auto;
	    border-radius: 8px;
	    margin-bottom: 25px;
	}
	.article-body {
	    font-size: 16px;
	    line-height: 1.7;
	    color: #333;
	}

	/* (사이드바) 위젯 스타일 */
	.widget {
	    background-color: #f9f9f9;
	    padding: 20px;
	    border-radius: 8px;
	    margin-bottom: 20px;
	}
	.widget h3 {
	    margin-top: 0;
	    border-bottom: 2px solid #eee;
	    padding-bottom: 10px;
	}
	.widget ul {
	    list-style: none;
	    padding: 0;
	    margin: 0;
	}
	.widget ul li a {
	    text-decoration: none;
	    color: #007bff;
	    line-height: 2;
	}
	</style>
</head>
<body>
	<jsp:include page="/WEB-INF/views/header.jsp" />

	<div class="tips-page-wrapper">

	    <main class="main-content">
	        
	        <article class="tip-article">
	            <h1>타이어 체인 관리 및 이용 가이드</h1>
	            <img src="${pageContext.request.contextPath}/img/gaide-4.png" alt="계절" class="hero-image">
				<div class="article-body">
				    <p>겨울철 눈길 운전의 필수 안전장비가 바로 <strong>타이어 체인</strong>이에요.  
				    초보 운전자라면 체인을 언제, 어떻게 사용해야 하는지 꼭 알아둬야 합니다.</p>

				    <p><strong>1️⃣ 체인이 필요한 상황</strong><br>
				    도로에 <b>눈이 5cm 이상 쌓였거나</b>, <b>빙판길</b> 또는 <b>경사로</b> 주행 시 체인을 사용하세요.  
				    특히 산간 지역이나 고속도로에서는 체인 장착 의무 구간이 있을 수 있습니다.</p>

				    <p><strong>2️⃣ 체인 종류</strong><br>
				    <b>금속 체인</b>은 미끄럼 방지력이 뛰어나지만 소음이 크고 장착이 번거로워요.  
				    <b>고무 체인</b>이나 <b>벨트형 체인</b>은 가볍고 설치가 쉬워 초보자에게 적합합니다.</p>

				    <p><strong>3️⃣ 장착 방법</strong><br>
				    ① 차량을 평평한 곳에 세우고 시동을 끈 뒤 사이드 브레이크를 걸어요.<br>
				    ② 체인을 타이어 앞에 펼친 후 바퀴를 살짝 움직여 밑으로 넣어요.<br>
				    ③ 체인을 바퀴에 감싸 고정 고리를 연결하고 단단히 조여주세요.<br>
				    ④ 장착 후 짧은 거리 주행으로 체인 상태를 점검하면 안전합니다.</p>

				    <p><strong>4️⃣ 주의사항</strong><br>
				    눈이 없는 일반 도로에서는 체인을 <b>즉시 제거</b>하세요.  
				    체인을 계속 사용하면 타이어와 노면 손상이 발생할 수 있습니다.  
				    또한 장착 후에는 <b>시속 50km 이하</b>로 주행하는 것이 좋아요.</p>

				    <p><strong>5️⃣ 사용 후 관리</strong><br>
				    체인을 분리한 뒤에는 <b>눈과 흙을 깨끗이 씻고 완전히 건조</b>시켜 보관하세요.  
				    녹 방지제를 뿌려두면 다음 겨울에도 문제없이 사용할 수 있습니다.</p>

				    <p><strong>요약:</strong><br>
				    ❄️ 눈길·빙판길에서는 반드시 체인 장착<br>
				    🔧 금속보다 고무·벨트형 체인이 초보자에게 적합<br>
				    🚗 일반 도로에서는 즉시 제거, 사용 후 세척·건조 필수</p>

				    <p>타이어 체인은 ‘준비할 때’가 아닌 ‘필요할 때’ 이미 늦습니다.  
				    겨울이 오기 전 미리 연습해두면 안전운전에 큰 도움이 돼요 ✅</p>
				</div>

	        </article>
	        
	        </main>

	    <aside class="sidebar">
	        <div class="widget">
	            <h3>카테고리</h3>
	            <ul>
	                <li><a href="gaide">엔진 오일</a></li>
	                <li><a href="gaide-1">타이어 관리</a></li>
	                <li><a href="gaide-2">계절별 관리</a></li>
	            </ul>
	        </div>
	        <div class="widget">
	            <h3>인기 꿀팁</h3>
				<ul>
				    <li><a href="gaide">엔진오일</a></li>
				    <li><a href="gaide-3">타이어 적정 공기압</a></li>
				    <li><a href="gaide-4">겨울 체인</a></li>
				</ul>
	            </div>
	    </aside>

	</div>

	<jsp:include page="/WEB-INF/views/footer.jsp" />
</body>
</html>