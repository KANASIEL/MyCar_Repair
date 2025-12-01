<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>관리자 마이페이지</title>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/mypage_admin.css">
</head>
<body>

<jsp:include page="/WEB-INF/views/header.jsp"/>

<div class="mypage-body admin">

    <div class="mypage-title">
        <h2>관리자 대시보드</h2>
        <p>사이트 현황과 회원 및 정비업체를 관리하세요.</p>
    </div>

    <section class="mypage-section">
        <h3>회원 관리</h3>
        <table class="data-table">
            <thead>
            <tr>
                <th>회원명</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>가입일</th>
                <th>상태</th>
                <th>관리</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="u" items="${userList}">
                <tr>
                    <td>${u.userName}</td>
                    <td>${u.email}</td>
                    <td>${u.phoneNumber}</td>
                    <td>${u.regDate}</td>
                    <td class="${u.account_status eq 'ACTIVE' ? 'active' : 'inactive'}">
                            ${u.account_status}
                    </td>
                    <td>
                        <c:choose>
                            <%-- 정지된 회원일 경우 복구 버튼 --%>
                            <c:when test="${u.account_status eq 'SUSPENDED'}">
                                <form action="${pageContext.request.contextPath}/mypage/user/updateStatus"
                                      method="post" style="display:inline;">
                                    <input type="hidden" name="accountId" value="${u.accountId}">
                                    <input type="hidden" name="status" value="ACTIVE">
                                    <button type="submit" class="btn-sub approve">복구</button>
                                </form>
                            </c:when>

                            <%-- 정상 회원일 경우 정지 버튼 --%>
                            <c:otherwise>
                                <form action="${pageContext.request.contextPath}/mypage/user/updateStatus"
                                      method="post" style="display:inline;">
                                    <input type="hidden" name="accountId" value="${u.accountId}">
                                    <input type="hidden" name="status" value="SUSPENDED">
                                    <button type="submit" class="btn-sub reject">정지</button>
                                </form>
                            </c:otherwise>
                        </c:choose>

                            <%-- 공통: 삭제 버튼 --%>
                        <form action="${pageContext.request.contextPath}/mypage/user/updateStatus"
                              method="post" style="display:inline;">
                            <input type="hidden" name="accountId" value="${u.accountId}">
                            <input type="hidden" name="status" value="DELETED">
                            <button type="submit" class="btn-sub">삭제</button>
                        </form>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>

        <nav class="pagination-container">
            <ul class="pagination-list">
                <%-- 이전 페이지 --%>
                <c:if test="${userPageMaker.prev}">
                    <li class="pagination-item prev paginate_button">
                        <a class="pagination-link"
                           href="mypage_admin?userPageNum=${userPageMaker.startPage - 1}&userAmount=<c:out value='${userPageMaker.cri.amount}'/>">[이전]</a>
                    </li>
                </c:if>

                <%-- 페이지 번호 --%>
                <c:forEach var="num" begin="${userPageMaker.startPage}" end="${userPageMaker.endPage}">
                    <li class="pagination-item page-num paginate_button
                <c:out value='${userPageMaker.cri.pageNum == num ? "active" : ""}'/>">
                        <a class="pagination-link"
                           href="mypage_admin?userPageNum=<c:out value='${num}'/>&userAmount=<c:out value='${userPageMaker.cri.amount}'/>">[${num}]</a>
                    </li>
                </c:forEach>

                <%-- 다음 페이지 --%>
                <c:if test="${userPageMaker.next}">
                    <li class="pagination-item next paginate_button">
                        <a class="pagination-link"
                           href="mypage_admin?userPageNum=${userPageMaker.endPage + 1}&userAmount=<c:out value='${userPageMaker.cri.amount}'/>">[다음]</a>
                    </li>
                </c:if>
            </ul>
        </nav>
    </section>

    <section class="mypage-section">
        <h3>정비업체 승인 요청</h3>
        <c:choose>
            <c:when test="${not empty pendingStores}">
                <table class="data-table">
                    <thead>
                    <tr>
                        <th>업체명</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>신청일</th>
                        <th>승인</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="s" items="${pendingStores}">
                        <tr>
                            <td>${s.storeId}</td>
                            <td>${s.email}</td>
                            <td>${s.phoneNumber}</td>
                            <td>${s.regDate}</td>
                            <td>
                                <form action="${pageContext.request.contextPath}/mypage/store/updateStatus"
                                      method="post" style="display:inline;">
                                    <input type="hidden" name="storeId" value="${s.storeId}">
                                    <input type="hidden" name="status" value="APPROVED">
                                    <button type="submit" class="btn-sub approve">승인</button>
                                </form>

                                <form action="${pageContext.request.contextPath}/mypage/store/updateStatus"
                                      method="post" style="display:inline;">
                                    <input type="hidden" name="storeId" value="${s.storeId}">
                                    <input type="hidden" name="status" value="REJECTED">
                                    <button type="submit" class="btn-sub reject">거절</button>
                                </form>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>

                <nav class="pagination-container">
                    <ul class="pagination-list">
                            <%-- 이전 페이지 --%>
                        <c:if test="${storePageMaker.prev}">
                            <li class="pagination-item prev paginate_button">
                                <a class="pagination-link"
                                   href="mypage_admin?storePageNum=${storePageMaker.startPage - 1}&storeAmount=<c:out value='${storePageMaker.cri.amount}'/>">[이전]</a>
                            </li>
                        </c:if>

                            <%-- 페이지 번호 --%>
                        <c:forEach var="num" begin="${storePageMaker.startPage}" end="${storePageMaker.endPage}">
                            <li class="pagination-item page-num paginate_button
                        <c:out value='${storePageMaker.cri.pageNum == num ? "active" : ""}'/>">
                                <a class="pagination-link"
                                   href="mypage_admin?storePageNum=<c:out value='${num}'/>&storeAmount=<c:out value='${storePageMaker.cri.amount}'/>">[${num}]</a>
                            </li>
                        </c:forEach>

                            <%-- 다음 페이지 --%>
                        <c:if test="${storePageMaker.next}">
                            <li class="pagination-item next paginate_button">
                                <a class="pagination-link"
                                   href="mypage_admin?storePageNum=${storePageMaker.endPage + 1}&storeAmount=<c:out value='${storePageMaker.cri.amount}'/>">[다음]</a>
                            </li>
                        </c:if>
                    </ul>
                </nav>

            </c:when>
            <c:otherwise>
                <p>대기 중인 승인 요청이 없습니다.</p>
            </c:otherwise>
        </c:choose>
    </section>

</div>

<jsp:include page="/WEB-INF/views/footer.jsp"/>

</body>
</html>