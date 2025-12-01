<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>문의 내역</title>
    <script src="<c:out value='${pageContext.request.contextPath}/js/jquery.js'/>"></script>
    <script src="<c:out value='${pageContext.request.contextPath}/js/inquiry.js'/>"></script>
    <link rel="stylesheet" href="<c:out value='${pageContext.request.contextPath}/css/mainpage.css'/>">
    <link rel="stylesheet" href="<c:out value='${pageContext.request.contextPath}/css/inquiry.css'/>">
</head>
<body>
<!-- 공통 헤더 -->
<jsp:include page="/WEB-INF/views/header.jsp"/>

<main id="inquiry-view-container" class="inquiry-view-container">

    <!-- 페이징용 폼 -->
    <form method="get" id="actionForm">
        <input type="hidden" name="pageNum" value="<c:out value='${pageMaker.cri.pageNum}'/>">
        <input type="hidden" name="amount" value="<c:out value='${pageMaker.cri.amount}'/>">
    </form>

    <!-- 왼쪽 플로팅 메뉴 -->
    <div class="floating-wrapper">
        <div class="floating-menu">
            <!-- USER 또는 STORE일 경우 -->
            <c:if test="${role.equals('USER') || role.equals('STORE') }">
                <a href="<c:url value='/inquiry/inquiry_write'/>">1:1 문의</a>
                <a href="<c:url value='/inquiry/inquiry_history'/>">내 문의 내역</a>
            </c:if>

            <!-- ADMIN일 경우 -->
            <c:if test="${role.equals('ADMIN')}">
                <a href="<c:url value='/inquiry/inquiry_manage'/>">문의 관리</a>
            </c:if>
        </div>
    </div>
    <!-- 제목 영역 -->
    <section id="inquiry-header" class="inquiry-header">
        <h2 id="inquiry-title" class="inquiry-title"><c:out value="${inquiryView.inquiry_title}"/></h2>
        <hr id="inquiry-divider" class="inquiry-divider">
    </section>

    <!-- 본문 영역 -->
    <article id="inquiry-body" class="inquiry-body">
        <div id="inquiry-content" class="inquiry-content">
            ${inquiryView.inquiry_content}
        </div>
        <div id="inquiry-meta" class="inquiry-meta">
            <span id="inquiry-date" class="inquiry-date"><c:out value="${inquiryView.inquiry_created}"/></span>
        </div>
    </article>

    <c:choose>
        <%-- 관리자일 경우 --%>
        <c:when test="${role.equals('ADMIN')}">
            <form>
                <section id="inquiry-reply" class="inquiry-reply">
                    <h3 class="reply-title">관리자 답변</h3>
                    <div class="reply-content">
                        <c:out value="${inquiryView.reply_content}"/>
                    </div>

                        <%-- 답변 상태에 따라 버튼 변경 --%>
                    <div class="reply-button">
                        <c:choose>
                            <c:when test="${not empty inquiryView.reply_content}">
                                <a href="<c:url value='/inquiry/reply_write?inquiry_no=${inquiryView.inquiry_no}'/>"
                                   class="btn btn-primary">
                                    답변 수정
                                </a>
                            </c:when>
                            <c:otherwise>
                                <a href="<c:url value='/inquiry/reply_write?inquiry_no=${inquiryView.inquiry_no}'/>"
                                   class="btn btn-primary">
                                    답변 작성
                                </a>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </section>
            </form>
        </c:when>

        <%-- 일반 사용자일 경우 --%>
        <c:when test="${not empty inquiryView.reply_content}">
            <section id="inquiry-reply" class="inquiry-reply">
                <h3 class="reply-title">관리자 답변</h3>
                <div class="reply-content">
                        ${inquiryView.reply_content}
                </div>
            </section>
        </c:when>
    </c:choose>


</main>

<!-- 공통 푸터 -->
<jsp:include page="/WEB-INF/views/footer.jsp"/>
</body>
</html>