<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta charset="UTF-8">
<title>FAQ 상세 보기</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/faq.css">
</head>

<jsp:include page="/WEB-INF/views/header.jsp" />

<body>
	<main>
	   <div class="faq-detail-container">
	      <h2>FAQ 상세 보기</h2>
	      
	      <%-- [필수] Hidden Inputs는 그대로 둡니다 --%>
	      <input type="hidden" id="faqNo" value="${faq.faqNo}"> 
	      <input type="hidden" id="pageNum" value="${param.pageNum}">
	      <input type="hidden" id="amount" value="${param.amount}">
	      
	      <%-- 1. [제목 영역] --%>
	      <div class="faq-detail-title">
	         <span class="q-icon">Q.</span> ${faq.faqTitle}
	      </div>
	      
	      <%-- 2. [작성일/조회수 영역] - 제목과 답변 사이에 위치 --%>
	      <div class="faq-detail-meta">
	         <span>작성일: ${faq.faqCreated}</span>
	         <span>조회수: ${faq.faqHit}</span>
	      </div>
	      
	      <%-- 3. [답변 영역] --%>
	      <div class="faq-detail-answer">
	         ${faq.faqContent}
	      </div>
	      
	      <%-- 4. [버튼 영역] --%>
	      <div class="button-area">
	         <a href="faq" class="btn-list">목록으로</a>
	      	<button type="button" id="btnModify" class="btn-action">수정</button>
	      	<button type="button" id="btnDelete" class="btn-delete">삭제</button>
	      </div>
		  
		  <form id="actionForm" action="" method="post">
	        <input type="hidden" name="faq_no" id="actionFaqNo">
	        <input type="hidden" name="pageNum" id="actionPageNum">
	        <input type="hidden" name="amount" id="actionAmount">
	    </form>
	   </div>
	</main>
<jsp:include page="/WEB-INF/views/footer.jsp" />
<script src="${pageContext.request.contextPath}/js/jquery.js"></script>
<script>
    var actionForm = $("#actionForm"); // 폼 객체

    // Hidden Form에 데이터를 채우고 전송하는 공통 함수
    function submitDeleteAction() {
        var faqNo = $("#faqNo").val();
        var pageNum = $("#pageNum").val();
        var amount = $("#amount").val();

        // 🚨 [필수] Hidden Form 필드에 값을 채워넣습니다.
        $("#actionFaqNo").val(faqNo);
        $("#actionPageNum").val(pageNum);
        $("#actionAmount").val(amount);
        
        // 폼 전송 준비
        actionForm.attr("action", "faq_delete");
        actionForm.attr("method", "post");
        actionForm.submit();
    }

    // 수정 버튼 (참고용)
    $("#btnModify").on("click", function(e) {
        e.preventDefault();
        var faqNo = $("#faqNo").val();
        var pageNum = $("#pageNum").val();
        var amount = $("#amount").val(); 
        
        // 수정 폼에도 값 채우고 GET 전송
        $("#actionFaqNo").val(faqNo);
        $("#actionPageNum").val(pageNum);
        $("#actionAmount").val(amount);
        actionForm.attr("action", "faq_modify"); 
        actionForm.attr("method", "get"); 
        actionForm.submit();
    });

    // 🚨 삭제 버튼 클릭 이벤트
	$("#btnDelete").on("click", function(e) {
	    e.preventDefault();
	    
	    if (confirm("정말로 삭제하시겠습니까?")) {
	        // 확인 후, 전송 함수 호출
            submitDeleteAction();
	    }
	});
</script>
</html>