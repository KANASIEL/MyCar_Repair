<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/register.css'/>">
</head>
<body>
	<jsp:include page="/WEB-INF/views/header.jsp" />
	
    <section class="register-container"> <%-- div를 section으로 변경 (시맨틱) --%>
        <form action="/registerProc" method="post" class="register-form">
            
            <%-- [★수정됨★] 탭 메뉴 추가 --%>
            <div class="register-tabs">
                <a href="<c:url value='/register'/>" class="active">일반 회원가입</a>
                <a href="<c:url value='/registerstore'/>">업체 회원가입</a>
            </div>
            
            <h1>일반 회원가입</h1> <%-- h2를 h1로 변경하고 텍스트 수정 --%>
            
            <%-- 서버에서 전달된 메시지 표시 --%>
            <c:if test="${not empty error_msg}">
                <p class="message error">${error_msg}</p>
            </c:if>
            <c:if test="${not empty success_msg}">
                <p class="message success">${success_msg}</p>
            </c:if>
            
            <div class="form-group">
                <label for="userName">이름</label>
                <input type="text" id="userName" name="userName" required>
            </div>
            
            <div class="form-group">
                <label for="accountId">아이디</label>
                <input type="text" id="accountId" name="accountId" required>
            </div>
            
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <div class="form-group">
                <label for="email">이메일</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="phoneNumber">휴대폰 번호</label>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="010-1234-5678" required>
            </div>
            
            <button type="submit" class="submit-button">가입하기</button>
            <p class="login-link">이미 계정이 있으신가요? <a href="/login">로그인</a></p>
        </form>
    </section>

	<jsp:include page="/WEB-INF/views/footer.jsp" />
	
</body>
</html>