<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/mainpage.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/storeLogin.css">
	<script src="${pageContext.request.contextPath}/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/js/login.js"></script>

	<c:if test="${not empty loginFail}">
		<script>
			alert("아이디 또는 비밀번호가 틀렸습니다.");
		</script>
	</c:if>

</head>

<body>			

<header><jsp:include page="/WEB-INF/views/header.jsp" /></header>
<main>
	<form method="post" action="storeLoginYn">

		<table border="1" align="center" class="table1">
			<tr class="tab-links-row">
				<td class="tab-cell">
					<a href="login" class="pw_text">회원 로그인</a>
				</td>
				<td class="tab-cell">
					<a class="id_text">업체 로그인</a>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<input class="mem" type="text" name="storeId" placeholder="아이디를 입력하세요"
						value="${cookie.storeSavedId.value != null ? cookie.storeSavedId.value : ''}">
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<input class="mem" type="password" name="password" placeholder="비밀번호를 입력하세요">
				</td>
			</tr>					
			<tr>
				<td colspan="3">
				    <label class="fake-check">
				        <input type="checkbox" id="ol_check" name="saveId"
				               <c:if test="${not empty cookie.storeSavedId.value}">checked</c:if>>
				        <span class="custom-check checked"></span>
				        <p class="chek_text">아이디 저장</p>
				    </label>
				</td>
			</tr>
			<tr>
				<tr>
					<td colspan="3" class="td1">
						<c:choose>
						<c:when test="${not empty loginFailMsg}">
							<div class="lockTime">${loginFailMsg}</div>
						</c:when>
						<c:otherwise>
							<div class="lockTime">&nbsp;</div>
						</c:otherwise>
						</c:choose>
					</td>
				</tr>
			</tr>
			<tr>
				<td colspan="3" class="login_btn">
					<input type="submit" value="로그인" id="login2">
				</td>
			</tr>				
			<tr>
                    <td class="btn3" colspan="3">
                        <a href="findAccount" class="link">아이디 찾기</a>
                        &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                        <a href="findPW" class="link">비밀번호 찾기</a>
                        &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                        <a href="register" class="link">회원가입</a>
                    </td>
			</tr>

			<caption>
				<h1 class="cap">업체 로그인</h1>
				<p class="p1">MY CAR 정비소의 서비스를 이용하시려면 로그인 하세요.</p>
			</caption>
		</table>
	</form>
</main>


<jsp:include page="/WEB-INF/views/footer.jsp" />

</body>

</html>