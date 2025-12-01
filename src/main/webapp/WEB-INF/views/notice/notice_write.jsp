<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>공지사항 작성</title>
    <script src="${pageContext.request.contextPath}/js/jquery.js"></script>
    <script src="${pageContext.request.contextPath}/js/notice.js"></script>
    <script src="${pageContext.request.contextPath}/js/"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/notice.css">
</head>
<body>
<jsp:include page="/WEB-INF/views/header.jsp"/>
<main id="notice-write-container" class="notice-write-container">
    <form method="post" action="writeProcess" id="notice-write-form" class="notice-write-form">
        <table id="notice-write-table" class="notice-write-table">
            <tr>
                <th class="write-label">제목</th>
            </tr>
            <tr>
                <td class="write-input">
                    <input type="text" name="notice_title" class="input-title" id="notice-title">
                </td>
            </tr>
            <tr>
                <th class="write-label">내용</th>
            </tr>
            <tr>
                <td class="write-input">
                    <textarea name="notice_content" class="textarea-content" id="notice-content"></textarea>
                </td>
            </tr>
        </table>

        <!-- 버튼 영역 -->
        <div id="write-button-group" class="write-button-group">
            <input type="submit" value="작성" class="btn btn-submit" id="btn-submit">
            <input type="button" value="취소" class="btn btn-cancel" id="btn-cancel"
                   onclick="location.href='notice_list'">
        </div>
    </form>

    <!-- 결과 메시지 -->
    <div id="result-message" class="result-message"></div>
</main>
<jsp:include page="/WEB-INF/views/footer.jsp"/>
</body>
</html>