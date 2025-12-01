<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MY CAR 정비소</title>
    
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mainpage.css">
    
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/jquery.bxslider.css">
</head>
<body>
	
	<jsp:include page="/WEB-INF/views/header.jsp" />
   
<figure>
    <div class="pic">
        <ul class="slide_gallery">
			<li><img src="${pageContext.request.contextPath}/img/main1.png"></li>
	        <li><img src="${pageContext.request.contextPath}/img/main2.png"></li>
	        <li><img src="${pageContext.request.contextPath}/img/main3.png"></li>
        </ul>
    </div>
    
    <div class="main-text">
        <h1>최고의 전문가가 당신의 차를 기다립니다</h1>
        <p>
          작은 문제부터 복잡한 수리까지, 완벽한 솔루션을 경험하세요.
        </p>
    </div>
</figure>

<section class="features">
    <div class="inner">
        <h1>MY CAR 정비소</h1>
        <div class="wrap">
            <article>
                <img src="${pageContext.request.contextPath}/img/1.png">
                <h2>내 차를 믿고 맡길 수 있는 곳!</h2>
                <p>표준 공임, 투명한 견적, 정직한 정비로 보답합니다.</p>
            </article>
            <article>
                <img src="${pageContext.request.contextPath}/img/2.png">
                <h2>더 이상 '바가지요금'은 없습니다.</h2>
                <p>MY CAR 정비소는 검증된 업체와 투명한 정비 문화를 만들어갑니다.</p>
            </article>
            <article>
                <img src="${pageContext.request.contextPath}/img/3.png">
                <h2>차는 기술로 고치고, 마음은 신뢰로 고칩니다.</h2>
                <p>언제나 안심하고 방문할 수 있는 여러분의 주치의가 되겠습니다.</p>
            </article>
        </div>
    </div>
</section>

<jsp:include page="/WEB-INF/views/footer.jsp" />

<script src="${pageContext.request.contextPath}/js/jquery.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.bxslider.js"></script>
<script>
    $(document).ready(function(){
        // 'slide_gallery' 라는 클래스를 가진 요소를 슬라이드 쇼로 만듭니다.
        $('.slide_gallery').bxSlider({
            auto: true,     // 자동 슬라이드
            pause: 2000     // 2초마다 넘어감
        });
    });
</script>

</body>
</html>