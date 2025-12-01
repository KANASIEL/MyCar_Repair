<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자 권한 승급</title>
<%-- 새로운 CSS 파일을 링크합니다 --%>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/admin_promote.css'/>">
</head>
<body>
	<%-- 헤더 포함 --%>
	<jsp:include page="/WEB-INF/views/header.jsp" />

    <section class="promote-container">
        <form action="/promoteAdminProc" method="post" class="promote-form">

            <h1>관리자 권한 승급</h1>

            <%-- 에러/성공 메시지 표시 --%>
            <c:if test="${not empty error_msg}">
                <p class="message error">${error_msg}</p>
            </c:if>
            <c:if test="${not empty success_msg}">
                <p class="message success">${success_msg}</p>
            </c:if>

            <p class="guide-text">
                관리자 키를 입력하시면 현재 로그인된 계정(<strong class="user-id">${sessionScope.loginId}</strong>)이
                관리자(ADMIN) 권한으로 즉시 승급됩니다.
            </p>

            <div class="form-group">
                <label for="adminKey">관리자 키</label>
                <input type="password" id="adminKey" name="adminKey" required>
            </div>

            <button type="submit" class="submit-button">권한 승급하기</button>
        </form>
    </section>

	<%-- 푸터 포함 --%>
	<jsp:include page="/WEB-INF/views/footer.jsp" />

</body>
</html>