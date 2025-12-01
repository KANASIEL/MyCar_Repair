<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>업체 회원가입</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/register.css'/>">
</head>
<body>
	<jsp:include page="/WEB-INF/views/header.jsp" />
	
    <section class="register-container">
        <%-- [★수정됨★] 폼 action을 /registerstoreProc 로 변경 --%>
        <form action="/registerstoreProc" method="post" class="register-form">
            
            <div class="register-tabs">
                <a href="<c:url value='/register'/>">일반 회원가입</a>
                <%-- [★수정됨★] 링크 경로 변경 --%>
                <a href="<c:url value='/registerstore'/>" class="active">업체 회원가입</a>
            </div>
            
            <h1>업체 회원가입</h1>
            
            <c:if test="${not empty error_msg}">
                <p class="message error">${error_msg}</p>
            </c:if>
            
            <%-- (이하 폼 내용은 동일) --%>
            <div class="form-group">
                <label for="storeId">업체 아이디</label>
                <input type="text" id="storeId" name="storeId" required>
            </div>
            
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" required>
            </div>

            <div class="form-group">
                <label for="email">업체 이메일</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="phoneNumber">업체 전화번호</label>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="010-1234-5678" required>
            </div>

            <div class="form-group">
                <label for="address">업체 주소</label>
                <input type="text" id="address" name="address" required>
            </div>

			<div class="form-group">
			    <label>영업 시간</label>
			    <div class="form-time-group">
			        <select id="dayType" name="dayType" class="form-control time-select">
			            <option value="평일">평일</option>
			            <option value="주말">주말</option>
			            <option value="연중무휴">연중무휴</option>
			        </select>
			        
			        <%-- [★수정됨★] type="number"로 변경, min/max 추가 --%>
			        <input type="number" id="startTime" name="startTime" class="form-control time-input" min="0" max="23" placeholder="09" required>
			        <span class="time-unit">시 부터</span> <%-- "시" 단위 표시 --%>
			        
			        <input type="number" id="endTime" name="endTime" class="form-control time-input" min="0" max="23" placeholder="18" required>
			        <span class="time-unit">시 까지</span> <%-- "시" 단위 표시 --%>
			    </div>
			</div>

            <div class="form-group">
                <label for="description">업체 상세 소개</label>
                <textarea id="description" name="description" placeholder="정비소에 대한 상세한 소개를 적어주세요..."></textarea>
            </div>
            
            <button type="submit" class="submit-button">업체 가입하기</button>
        </form>
    </section>

	<jsp:include page="/WEB-INF/views/footer.jsp" />
	
</body>
</html>