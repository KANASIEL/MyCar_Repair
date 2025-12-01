<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>1대1문의 작성</title>
    <script src="${pageContext.request.contextPath}/js/jquery.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mainpage.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/inquiry.css">
</head>
<body>

<!-- 공통 헤더 -->
<jsp:include page="/WEB-INF/views/header.jsp"/>

<!-- 왼쪽 플로팅 메뉴 -->
<div class="floating-wrapper">
    <div class="floating-menu">
        <!-- USER 또는 STORE일 경우 -->
        <c:if test="${role.equals('USER') || role.equals('STORE') }">
            <a href="<c:url value='/inquiry/inquiry_write'/>">1:1 문의</a>
            <a href="<c:url value='/inquiry/inquiry_history'/>">내 문의 내역</a>
        </c:if>

        <!-- ADMIN일 경우 -->
        <c:if test="${role.equals('ADMIN')}">
            <a href="<c:url value='/inquiry/inquiry_manage'/>">문의 관리</a>
        </c:if>
    </div>
</div>

<!-- 문의 등록 폼 -->
<main class="content">
    <form method="post" action="writeProcess" id="inquiry-form">
        <h2 class="form-title">문의 등록</h2>

        <div class="form-group">
            <label for="customer_name">이름</label>
            <input type="text" id="customer_name" name="customer_name"/>
        </div>

        <div class="form-group">
            <label for="customer_phone">연락처</label>
            <input type="tel" id="customer_phone" name="customer_phone" />
        </div>

        <div class="form-group">
            <label for="customer_email">이메일</label>
            <input type="email" id="customer_email" name="customer_email" />
        </div>

        <div class="form-group">
            <label for="inquiry_title">제목</label>
            <input type="text" id="inquiry_title" name="inquiry_title" />
        </div>

        <div class="form-group">
            <label for="inquiry_content">문의내용</label>
            <textarea id="inquiry_content" name="inquiry_content"></textarea>
        </div>

        <div class="form-actions">
            <input type="submit" value="등록" class="submit-button" />
        </div>
    </form>
</main>

<!-- 공통 푸터 -->
<jsp:include page="/WEB-INF/views/footer.jsp"/>

</body>
</html>