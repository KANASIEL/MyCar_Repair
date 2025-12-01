<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mainpage.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/findPW.css">
    <script src="${pageContext.request.contextPath}/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/js/findPW.js"></script>

    <script>
        const findFail = "${findFail}";
        if (findFail === "true") {
            alert("계정 정보를 찾지 못했습니다.");
            history.replaceState(null, null, location.href);
        }
    </script>

</head>
<body>

    <header><jsp:include page="/WEB-INF/views/header.jsp" /></header>
    
    <main>

        <form method="post" action="findPwYn">
            <table class="table1">
                <tr>
                    <td class="trh1" colspan="3">
                        <p>비밀번호 찾기</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" class="td1">
                        <p>아래 정보를 입력하시면 임시 비밀번호를 메일로 발송해 드립니다.</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="3"><input class="accountId" type="text" name="accountId" placeholder="아이디"></td>                 
                </tr>
                <tr>
                    <td colspan="3"><input class="phone" type="text" name="phone" placeholder="전화번호"></td>                 
                </tr>
                <tr>
                    <td colspan="3"><input class="email" type="text" name="email" placeholder="이메일"></td>                  
                </tr>
                <tr>
                    <td colspan="3">
                        <input class="find1" type="submit" value="확인">  
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <input class="btn2" type="button" onclick="location.href='login'" value="로그인 페이지 이동">  
                    </td>
                </tr>
                <tr class="lastTr">
                    <td class="btn3">
                        <a href="findAccount" class="link">아이디 찾기</a>
                        &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                        <a href="findPW" class="link">비밀번호 찾기</a>
                        &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                        <a href="register" class="link">회원가입</a>
                    </td>
                </tr>
            </table>
        </form>

    </main>

    <jsp:include page="/WEB-INF/views/footer.jsp" />
</body>
</html>