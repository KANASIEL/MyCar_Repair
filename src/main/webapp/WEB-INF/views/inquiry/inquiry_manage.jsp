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

<jsp:include page="/WEB-INF/views/header.jsp"/>

<main id="inquiry-history-container" class="inquiry-history-container">

    <form method="get" id="actionForm">
        <input type="hidden" name="pageNum" value="<c:out value='${pageMaker.cri.pageNum}'/>">
        <input type="hidden" name="amount" value="<c:out value='${pageMaker.cri.amount}'/>">
        <input type="hidden" name="type" value="<c:out value='${pageMaker.cri.type}'/>"> <input type="hidden" name="keyword" value="<c:out value='${pageMaker.cri.keyword}'/>"> </form>

    <div class="floating-wrapper">
        <div class="floating-menu">
            <a href="<c:url value='/inquiry/inquiry_manage'/>">문의 관리</a>
        </div>
    </div>

    <div class="content">
        <section class="inquiry-header">
            <h1 class="inquiry-title">문의 내역</h1>
            <hr class="inquiry-divider">
        </section>

        <form method="get" id="searchForm">
            <select name="type">
                <option value="" <c:out value="${pageMaker.cri.type == null?'selected':''}"/>>--</option>
                <option value="W" <c:out value="${pageMaker.cri.type eq 'W'?'selected':''}"/>>답변대기</option>
                <option value="C" <c:out value="${pageMaker.cri.type eq 'C'?'selected':''}"/>>답변완료</option>
            </select>
            <button>Search</button>
        </form>

        <section class="inquiry-table-wrapper">
            <table class="inquiry-table">
                <thead>
                <tr>
                    <th class="col-no">번호</th>
                    <th class="col-title">제목</th>
                    <th class="col-date">작성일</th>
                    <th class="col-status">처리 상태</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="manage" items="${ManageList}">
                    <tr class="inquiry-row">
                        <td><c:out value="${manage.inquiry_no}"/></td>
                        <td>
                            <a class="inquiry-link"
                               href="<c:url value='/inquiry/inquiry_view?inquiry_no=${manage.inquiry_no}'/>">
                                <c:out value="${manage.inquiry_title}"/>
                            </a>
                        </td>
                        <td><c:out value="${manage.inquiry_created}"/></td>
                        <td class="status-cell <c:out value='${manage.inquiry_status}'/>">
                            <c:out value="${manage.inquiry_status}"/>
                        </td>
                    </tr>
                </c:forEach>
                <c:if test="${empty ManageList}">
                    <tr>
                        <td colspan="4" class="no-inquiry">문의 내역이 없습니다.</td>
                    </tr>
                </c:if>
                </tbody>
            </table>
        </section>
    </div>

    <nav class="pagination-container">
        <ul class="pagination-list">
            <c:if test="${pageMaker.prev}">
                <li class="pagination-item prev paginate_button">
                    <a class="pagination-link"
                       href="inquiry_manage?pageNum=${pageMaker.startPage - 1}&amount=<c:out value='${pageMaker.cri.amount}'/>&type=<c:out value='${pageMaker.cri.type}'/>&keyword=<c:out value='${pageMaker.cri.keyword}'/>">[이전]</a> <%-- 👈 수정: 경로 명시 및 파라미터 추가 --%>
                </li>
            </c:if>

            <c:forEach var="num" begin="${pageMaker.startPage}" end="${pageMaker.endPage}">
                <li class="pagination-item page-num paginate_button
                <c:out value='${pageMaker.cri.pageNum == num ? "active" : ""}'/>">
                    <a class="pagination-link"
                       href="inquiry_manage?pageNum=<c:out value='${num}'/>&amount=<c:out value='${pageMaker.cri.amount}'/>&type=<c:out value='${pageMaker.cri.type}'/>&keyword=<c:out value='${pageMaker.cri.keyword}'/>">[${num}]</a> <%-- 👈 수정: 경로 명시 및 파라미터 추가 --%>
                </li>
            </c:forEach>

            <c:if test="${pageMaker.next}">
                <li class="pagination-item next paginate_button">
                    <a class="pagination-link"
                       href="inquiry_manage?pageNum=${pageMaker.endPage + 1}&amount=<c:out value='${pageMaker.cri.amount}'/>&type=<c:out value='${pageMaker.cri.type}'/>&keyword=<c:out value='${pageMaker.cri.keyword}'/>">[다음]</a> <%-- 👈 수정: 경로 명시 및 파라미터 추가 --%>
                </li>
            </c:if>
        </ul>
    </nav>

</main>

<jsp:include page="/WEB-INF/views/footer.jsp"/>

</body>
</html>