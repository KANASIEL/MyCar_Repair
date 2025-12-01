<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지 - 정비업소</title>

<!-- CSS 연결 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_store.css">

<style>
.info-table td {
  white-space: pre-line;
}
</style>
</head>
<body>

<jsp:include page="/WEB-INF/views/header.jsp" />

<div class="mypage-body">
  <div class="mypage-title">
    <h2>정비업소 마이페이지</h2>
    <p>업체 정보를 확인하고 관리할 수 있습니다.</p>
  </div>

  <!-- flash 메시지 출력 -->
  <c:if test="${not empty msg}">
    <div class="alert-msg" style="color:green; text-align:center; margin-bottom:20px;">
      ${msg}
    </div>
  </c:if>

  <section class="mypage-section">
    <h3>업체 정보</h3>
    <table class="info-table">
      <tr><th>아이디</th><td>${store.storeId}</td></tr>
      <tr><th>이메일</th><td>${store.email}</td></tr>
      <tr><th>전화번호</th><td>${store.phoneNumber}</td></tr>
      <tr><th>주소</th><td>${store.address}</td></tr>
      <tr><th>위도</th><td>${store.latitude}</td></tr>
      <tr><th>경도</th><td>${store.longitude}</td></tr>
      <tr><th>영업시간</th><td>${store.openingHours}</td></tr>
      <tr><th>소개글</th><td>${store.description}</td></tr>
      <tr><th>등록일</th><td>${store.regDate}</td></tr>
    </table>

    <!-- 수정 페이지로 이동 -->
    <button class="btn-normal"
            onclick="location.href='${pageContext.request.contextPath}/mypage_store/mypage_storeedit'">
      정보 수정
    </button>
  </section>
</div>

<jsp:include page="/WEB-INF/views/footer.jsp" />

</body>
</html>
