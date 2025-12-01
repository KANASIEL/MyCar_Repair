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
	            <h1>타이어 적정 공기압은 ?</h1>
	            <img src="${pageContext.request.contextPath}/img/gaide-3.png" alt="계절" class="hero-image">
				<div class="article-body">
				    <p>타이어 공기압은 <strong>주행 안정성과 연비, 타이어 수명</strong>을 좌우하는 핵심 요소입니다.  
				    초보 운전자라면 적정 공기압을 알고 꾸준히 관리하는 습관이 필요해요.</p>

				    <p><strong>1️⃣ 적정 공기압 확인법</strong><br>
				    차량마다 권장 공기압이 다르므로 <b>운전석 문 옆 스티커</b>나 <b>사용자 설명서</b>를 확인하세요.  
				    보통 승용차는 <b>32~35psi</b> 정도가 일반적입니다.</p>

				    <p><strong>2️⃣ 공기압이 낮을 때</strong><br>
				    타이어가 도로와 닿는 면적이 넓어져 <b>연비가 나빠지고</b>  
				    <b>타이어 마모</b>가 빨라지며, 고속주행 시 열이 과하게 쌓일 수 있습니다.</p>

				    <p><strong>3️⃣ 공기압이 높을 때</strong><br>
				    도로 충격이 그대로 전달되어 <b>승차감이 나빠지고</b>  
				    제동력이 감소하며, 타이어 중앙부만 빨리 닳는 <b>편마모</b>가 생깁니다.</p>

				    <p><strong>4️⃣ 점검 주기</strong><br>
				    공기압은 <b>한 달에 한 번</b> 또는 장거리 주행 전에는 꼭 점검하세요.  
				    계절에 따라 온도 변화가 크므로,  
				    여름엔 약간 낮게, 겨울엔 약간 높게 유지하는 것이 좋습니다.</p>

				    <p><strong>요약:</strong><br>
				    적정 공기압 32~35psi 기준으로,  
				    한 달에 한 번 점검하고 계절에 따라 약간 조정하세요.  
				    공기압만 잘 관리해도 안전, 연비, 타이어 수명이 모두 좋아집니다 ✅</p>
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