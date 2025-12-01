<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mainpage.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/findOK.css">
</head>
<body>
    <header><jsp:include page="/WEB-INF/views/header.jsp" /></header>
    
    <main>
        <table>
            <tr>
                <td class="text">
                    <p>회원님의 계정 정보를 입력하신 이메일로 전송해 드렸습니다.</p>
                </td>
            </tr>
            <tr>
                <td class="backlogin">
                    <button class="btn" type="button" onclick="location.href='login'">로그인 페이지로 돌아가기</button>
                </td>
            </tr>
            <tr>
                <td class="link_wrap" colspan="3">
                    <a href="findAccount" class="link">아이디 찾기</a>
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <a href="findPW" class="link">비밀번호 찾기</a>
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <a href="register" class="link">회원가입</a>
                </td>
			</tr>
        </table>
    </main>

    <jsp:include page="/WEB-INF/views/footer.jsp" />
</body>
</html>