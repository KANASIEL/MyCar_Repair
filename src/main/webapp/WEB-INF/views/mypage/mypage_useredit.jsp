<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원정보 수정</title>

<!-- CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_useredit.css">
</head>
<body>

<jsp:include page="/WEB-INF/views/header.jsp" />

<div class="edit-container">
  <h2>회원정보 수정</h2>

  <!-- ✅ action 경로는 컨트롤러 매핑(/mypage_user/update)에 맞춤 -->
  <form action="${pageContext.request.contextPath}/mypage_user/update" method="post" class="edit-form" onsubmit="return validateForm()">

    <!-- 이름 -->
    <div class="form-group">
      <label for="userName">이름</label>
      <!-- ✅ camelCase로 수정 -->
      <input type="text" id="userName" name="userName" value="${user.userName}" required>
    </div>

    <!-- 이메일 -->
    <div class="form-group">
      <label for="email">이메일</label>
      <input type="email" id="email" name="email" value="${user.email}" required>
    </div>

    <!-- 전화번호 -->
    <div class="form-group">
      <label for="phoneNumber">전화번호</label>
      <input type="tel" id="phoneNumber" name="phoneNumber" value="${user.phoneNumber}" placeholder="010-1234-5678" required>
    </div>

    <hr class="divider">

    <!-- 비밀번호 변경 -->
    <h3>비밀번호 변경</h3>

    <div class="form-group">
      <label for="currentPassword">현재 비밀번호</label>
      <input type="password" id="currentPassword" name="currentPassword" placeholder="현재 비밀번호를 입력하세요">
    </div>

    <div class="form-group">
      <label for="newPassword">새 비밀번호</label>
      <input type="password" id="newPassword" name="newPassword" placeholder="새 비밀번호를 입력하세요">
    </div>

    <div class="form-group">
      <label for="confirmPassword">비밀번호 확인</label>
      <input type="password" id="confirmPassword" name="confirmPassword" placeholder="새 비밀번호를 다시 입력하세요">
    </div>

    <div class="edit-buttons">
      <button type="button" class="btn-normal btn-cancel" onclick="history.back()">취소</button>
      <button type="submit" class="btn-normal btn-save">저장</button>
    </div>
  </form>
</div>

<jsp:include page="/WEB-INF/views/footer.jsp" />

<script>
function validateForm() {
  const newPw = document.getElementById("newPassword").value.trim();
  const confirmPw = document.getElementById("confirmPassword").value.trim();

  if (newPw || confirmPw) {
    if (newPw !== confirmPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (newPw.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return false;
    }
  }
  return true;
}
</script>

</body>
</html>
