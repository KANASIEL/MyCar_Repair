<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>공지사항 등록</title>
    <script src="${pageContext.request.contextPath}/js/jquery.js"></script>
    <script src="${pageContext.request.contextPath}/js/notice.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/notice.css">
</head>
<body>
<jsp:include page="/WEB-INF/views/header.jsp"/>

<main id="notice-modify-container" class="notice-modify-container">
    <form method="post" action="modifyProcess" id="notice-modify-form" class="notice-modify-form">

        <!-- 작성 테이블 -->
        <table id="notice-write-table" class="notice-write-table">
            <tr>
                <th class="modify-label">제목</th>
            </tr>
            <tr>
                <td class="modify-input">
                    <input type="text" name="notice_title" class="input-title" id="notice-title" value="<c:out value='${modify.notice_title}'/>">
                </td>
            </tr>
            <tr>
                <th class="write-label">내용</th>
            </tr>
            <tr>
                <td class="write-input">
                    <textarea name="notice_content" class="textarea-content" id="notice-content"><c:out value="${modify.notice_content}"/></textarea>
                </td>
            </tr>
        </table>

        <input type="hidden" name="notice_no" value="${modify.notice_no}">
        <input type="hidden" name="pageNum" value="${pageMaker.cri.pageNum}">
        <input type="hidden" name="amount" value="${pageMaker.cri.amount}">
        <!-- 버튼 영역 -->
        <div id="modify-button-group" class="modify-button-group">
            <input type="submit" value="수정" class="btn btn-submit" id="btn-submit">
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