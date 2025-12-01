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
	            <h1>초보 운전자를 위한 계절별 자동차 관리</h1>
	            <img src="${pageContext.request.contextPath}/img/gaide-2.png" alt="계절" class="hero-image">
				<div class="article-body">
				    <p>자동차는 계절에 따라 관리 포인트가 달라집니다.  
				    초보 운전자라면 <strong>계절별 점검만 잘해도 차량 수명과 안전</strong>을 지킬 수 있어요.</p>

				    <p><strong>🌸 봄 — 황사와 미세먼지 대비</strong><br>
				    겨울철에 쌓인 먼지와 염분을 깨끗이 세차로 제거하세요.  
				    <b>에어컨 필터</b>와 <b>와이퍼 블레이드</b>도 교체해주면 좋습니다.  
				    타이어 공기압도 온도 변화로 달라지니 점검 필수!</p>

				    <p><strong>☀️ 여름 — 과열 및 냉방 관리</strong><br>
				    여름에는 엔진이 쉽게 열받으므로 <b>냉각수(부동액)</b> 양을 확인하세요.  
				    <b>에어컨 가스</b>가 부족하면 냉방이 약해지고 연비도 떨어집니다.  
				    세차 시에는 타르나 벌레 자국을 바로 제거해 도장 손상을 방지하세요.</p>

				    <p><strong>🍁 가을 — 겨울 대비 점검 시기</strong><br>
				    낮과 밤의 온도 차가 커지는 시기에는 <b>배터리 상태</b>와 <b>타이어 마모</b>를 점검하세요.  
				    <b>워셔액</b>도 겨울용으로 교체해 두면 좋습니다.</p>

				    <p><strong>❄️ 겨울 — 시동과 미끄럼 주의</strong><br>
				    추운 날씨에는 배터리 방전이 잦으므로 <b>예비 점프선</b>을 챙겨두세요.  
				    <b>부동액 농도</b>를 확인하고, 눈길 운전 시 <b>겨울용 타이어나 체인</b>을 사용하세요.  
				    세차 후에는 문틀에 물기가 얼지 않도록 문틀 실리콘에 윤활제를 발라주는 것도 좋습니다.</p>

				    <p><strong>요약:</strong><br>
				    봄엔 세차·필터 교체, 여름엔 냉각수·에어컨 점검,  
				    가을엔 배터리·타이어 확인, 겨울엔 부동액·체인 준비!  
				    계절별 점검 습관이 안전운전의 첫걸음입니다 🚗</p>
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