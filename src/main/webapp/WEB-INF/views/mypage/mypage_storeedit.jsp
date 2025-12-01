<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>업체 정보 수정</title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_storeedit.css">
</head>
<body>

<jsp:include page="/WEB-INF/views/header.jsp" />

<div class="edit-container">
  <h2>업체 정보 수정</h2>

  <form action="${pageContext.request.contextPath}/mypage_store/update" method="post" class="edit-form">

    <div class="form-group">
      <label for="storeId">아이디</label>
      <input type="text" id="storeId" name="storeId" value="${store.storeId}" readonly>
    </div>

    <!-- 비밀번호 변경 영역 -->
    <div class="form-group">
      <label for="currentPw">현재 비밀번호</label>
      <input type="password" id="currentPw" name="currentPw" placeholder="현재 비밀번호를 입력하세요">
    </div>

    <div class="form-group">
      <label for="newPw">새 비밀번호</label>
      <input type="password" id="newPw" name="newPw" placeholder="변경할 비밀번호를 입력하세요">
    </div>

    <div class="form-group">
      <label for="confirmPw">비밀번호 확인</label>
      <input type="password" id="confirmPw" name="confirmPw" placeholder="새 비밀번호를 한 번 더 입력하세요">
    </div>

    <!-- 일반 정보 -->
    <div class="form-group">
      <label for="email">이메일</label>
      <input type="email" id="email" name="email" value="${store.email}" required>
    </div>

    <div class="form-group">
      <label for="phoneNumber">전화번호</label>
      <input type="tel" id="phoneNumber" name="phoneNumber" value="${store.phoneNumber}" placeholder="010-1234-5678" required>
    </div>

    <div class="form-group">
      <label for="openingHours">영업시간</label>
      <input type="text" id="openingHours" name="openingHours" value="${store.openingHours}" placeholder="예: 09:00~18:00" required>
    </div>

    <div class="form-group">
      <label for="address">주소</label>
      <input type="text" id="address" name="address" value="${store.address}" required>
    </div>

    <div class="form-inline">
      <div class="form-group-half">
        <label for="latitude">위도</label>
        <input type="text" id="latitude" name="latitude" value="${store.latitude}" placeholder="예: 35.1796">
      </div>

      <div class="form-group-half">
        <label for="longitude">경도</label>
        <input type="text" id="longitude" name="longitude" value="${store.longitude}" placeholder="예: 129.0756">
      </div>
    </div>

    <div class="form-group">
      <label for="description">업체 소개</label>
      <textarea id="description" name="description" rows="6" placeholder="업체의 서비스, 특징 등을 입력하세요.">${store.description}</textarea>
    </div>

    <div class="edit-buttons">
      <button type="button" class="btn-normal btn-cancel" onclick="history.back()">취소</button>
      <button type="submit" class="btn-normal btn-save">저장</button>
    </div>
  </form>
</div>

<jsp:include page="/WEB-INF/views/footer.jsp" />
</body>
</html>
