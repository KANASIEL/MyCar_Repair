<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>공지사항 상세보기</title>
    <script src="${pageContext.request.contextPath}/js/jquery.js"></script>
    <script src="${pageContext.request.contextPath}/js/notice.js"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/notice.css">
</head>
<body>
<jsp:include page="/WEB-INF/views/header.jsp"/>
<main id="notice-view-container" class="notice-view-container">

    <!-- 제목 영역 -->
    <section class="notice-header">
        <h2 class="notice-title">${view.notice_title}</h2>
        <hr class="notice-divider">
    </section>

    <!-- 본문 영역 -->
    <article class="notice-body">
        <div class="notice-content">
            ${view.notice_content}
        </div>
        <div class="notice-meta">
            <span class="notice-date">${view.notice_created}</span>
            <span class="notice-views">조회수: ${view.notice_views}</span>
        </div>
    </article>

    <hr>

    <!-- 버튼 그룹 -->
    <section class="notice-button-group">
        <form method="get" id="notice-action-form" class="notice-action-form">
            <input type="hidden" name="notice_no" value="${view.notice_no}">
            <input type="hidden" name="pageNum" value="${pageMaker.cri.pageNum}">
            <input type="hidden" name="amount" value="${pageMaker.cri.amount}">

            <div class="button-group">
                <c:if test="${role.equals('ADMIN')}">
                    <input type="submit" value="수정" formaction="/notice/notice_modify" class="btn btn-modify">
                    <input type="submit" value="삭제" formaction="/notice/deleteProcess" class="btn btn-delete">
                </c:if>
                <input type="submit" value="목록" formaction="notice_list" class="btn btn-list">
            </div>
        </form>
    </section>



</main>
<jsp:include page="/WEB-INF/views/footer.jsp"/>

</body>
</html>