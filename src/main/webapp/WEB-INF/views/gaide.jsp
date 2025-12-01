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
	            <h1>초보 운전자를 위한 엔진오일 교환 주기 완벽 가이드</h1>
	            <img src="${pageContext.request.contextPath}/img/gaide.png" alt="엔진오일" class="hero-image">
				<div class="article-body">
				    <p>엔진오일은 자동차의 ‘피’라고 불릴 만큼 중요합니다. 엔진의 마찰을 줄이고, 열을 식히며, 내부를 깨끗하게 유지하는 역할을 하죠.</p>

				    <p><strong>교환 주기</strong>는 일반적으로 <b>5,000~10,000km</b> 또는 <b>6개월마다</b>가 좋습니다. 시내주행이 많다면 기간 기준으로 교체하는 게 안전합니다.</p>

				    <p>오일 종류는 <b>광유(5,000km)</b>, <b>반합성유(7,000km)</b>, <b>합성유(10,000km 이상)</b>로 구분되며, 초보자는 반합성유가 가장 무난합니다.</p>

				    <p>오일색이 <b>검게 변하거나</b> <b>소음·진동이 증가</b>하면 교체 시기예요. 교환 시에는 <b>오일필터도 함께</b> 바꾸는 걸 잊지 마세요.</p>

				    <p><strong>요약:</strong> 6개월 또는 5,000~10,000km마다 엔진오일과 필터를 함께 교환하면 차 수명과 연비가 모두 좋아집니다 🚗</p>
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