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
	            <h1>초보 운전자를 위한 타이어 관리 가이드</h1>
	            <img src="${pageContext.request.contextPath}/img/gaide-1.png" alt="타이어" class="hero-image">
				<div class="article-body">
				    <p>타이어는 자동차와 도로가 맞닿는 유일한 부분으로, <strong>안전과 연비에 직접적인 영향</strong>을 줍니다. 초보 운전자라면 타이어 관리만 잘해도 사고 위험을 크게 줄일 수 있어요.</p>

				    <p><strong>1️⃣ 공기압 확인</strong><br>
				    타이어 공기압은 <b>한 달에 한 번</b> 이상 확인하세요.  
				    적정 공기압은 보통 운전석 문 옆 스티커에 표시되어 있습니다.<br>
				    ▶ <b>공기압이 낮으면</b> 연비가 떨어지고 마모가 빨라지며,  
				    ▶ <b>공기압이 높으면</b> 승차감이 나빠지고 제동력이 약해집니다.</p>

				    <p><strong>2️⃣ 마모 상태 점검</strong><br>
				    타이어 홈 깊이가 <b>1.6mm 이하</b>로 줄면 교체해야 합니다.  
				    500원짜리 동전을 홈에 넣었을 때 절반 이상 보이면 교체 시기예요.</p>

				    <p><strong>3️⃣ 위치 교환 (로테이션)</strong><br>
				    앞뒤 타이어의 마모 속도를 균일하게 하기 위해  
				    <b>10,000km마다</b> 위치를 교환해주는 것이 좋습니다.</p>

				    <p><strong>4️⃣ 계절별 관리</strong><br>
				    여름에는 공기압이 자연스럽게 상승하므로 약간 낮게,  
				    겨울에는 기온이 낮아 압력이 떨어지니 약간 높게 유지하세요.  
				    눈길이 많은 지역은 <b>겨울용 타이어</b>나 <b>체인</b> 준비도 필수입니다.</p>

				    <p><strong>요약:</strong>  
				    한 달에 한 번 공기압 확인, 10,000km마다 위치 교환,  
				    마모 1.6mm 이하 시 교체!  
				    꾸준히 관리하면 타이어 수명도 늘고 주행 안전성도 높아집니다 🚗</p>
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