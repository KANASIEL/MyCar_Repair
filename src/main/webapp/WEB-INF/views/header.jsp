<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<div class="floating-icons">
    <a href="https://www.instagram.com/khieiorkr/" target="_blank" class="icon-instagram">
        <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="인스타그램"/>
    </a>
    <a href="https://www.youtube.com/@KH_academy" target="_blank" class="icon-youtube">
        <img src="https://img.icons8.com/color/48/youtube-play.png" alt="유튜브"/>
    </a>
</div>

<c:if test="${not empty msg}">
    <script>
        alert('${msg}');
    </script>
</c:if>

<header>
    <div class="inner">
        <h1>
            <a href="<c:url value='/main' />">
                MY CAR 정비소
            </a>
        </h1>

        <!-- ======================
             상단 네비게이션
        ====================== -->
        <ul id="gnb">
            <li><a href="<c:url value='/gaide' />">꿀팁 가이드</a></li>
            <li><a href="<c:url value='/recommend' />">주변 정비소</a></li>

            <li class="dropdown-parent">
                <a href="#">고객센터</a>
                <ul class="submenu">
                    <li>
                        <c:choose>
                            <c:when test="${sessionScope.ROLE == 'USER' || sessionScope.ROLE == 'STORE'}">
                                <a href="<c:url value='/inquiry/inquiry_history'/>">1:1 문의</a>
                            </c:when>
                            <c:when test="${sessionScope.ROLE == 'ADMIN'}">
                                <a href="<c:url value='/inquiry/inquiry_manage'/>">문의 관리</a>
                            </c:when>
                        </c:choose>
                    </li>
                    <li><a href="<c:url value='/notice/notice_list'/>">공지사항</a></li>
                    <li><a href="<c:url value='/faq'/>">FAQ</a></li>
                </ul>
            </li>
        </ul>

        <!-- ======================
             로그인/회원/관리자 메뉴
        ====================== -->
        <ul class="util">
            <c:choose>

                <%-- 일반 회원 --%>
                <c:when test="${sessionScope.ROLE eq 'USER'}">
                    <li><a href="<c:url value='/mypage_user'/>">마이페이지</a></li>
                    <li><a href="<c:url value='/logout'/>">로그아웃</a></li>
                    <li class="admin-enter">
                        <a href="<c:url value='/promote_admin'/>">관리자 전환</a>
                    </li>
                </c:when>

                <%-- 업체 계정 --%>
                <c:when test="${sessionScope.ROLE eq 'STORE'}">
                    <li><a href="<c:url value='/mypage_store'/>">업체 마이페이지</a></li>
                    <li><a href="<c:url value='/logout'/>">로그아웃</a></li>
                </c:when>

                <%-- 관리자 계정 --%>
                <c:when test="${sessionScope.ROLE eq 'ADMIN'}">
                    <li><a href="<c:url value='/mypage_admin'/>">관리자 페이지</a></li>
                    <li class="admin-enter"><a href="<c:url value='/admin/exit'/>">관리자 모드 해제</a></li>
                </c:when>

                <%-- 비로그인 상태 --%>
                <c:otherwise>
                    <li><a href="<c:url value='/login'/>">로그인</a></li>
                    <li><a href="<c:url value='/register'/>">회원가입</a></li>
                </c:otherwise>

            </c:choose>
        </ul>
    </div>
</header>

</html>
