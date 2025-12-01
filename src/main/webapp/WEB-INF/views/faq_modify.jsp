<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta charset="UTF-8">
<title>FAQ 수정</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/faq.css">
</head>

<jsp:include page="/WEB-INF/views/header.jsp" />

<body>
<main>
   <div class="faq-container form-page">
      <h2>FAQ 수정</h2>
      
      <form action="faq_modify_action" method="post" id="modifyForm">
          <input type="hidden" name="faqNo" value="${faq.faqNo}">
          
          <div class="form-group">
              <label for="title">제목</label>
              <input type="text" id="title" name="faqTitle" value="${faq.faqTitle}" required>
          </div>
          
          <div class="form-group">
              <label for="content">내용</label>
              <textarea id="content" name="faqContent" rows="10" required>${faq.faqContent}</textarea>
          </div>
          
          <div class="button-area submit-group">
              <button type="button" id="btnSubmit">수정 완료</button>
              <a href="faq" class="btn-list">목록으로</a>
          </div>
      </form>
   </div>
</main>
<jsp:include page="/WEB-INF/views/footer.jsp" />
<script src="${pageContext.request.contextPath}/js/jquery.js"></script>
<script>
    $("#btnSubmit").on("click", function() {
        if ($("#title").val() === "" || $("#content").val() === "") {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }
        $("#modifyForm").submit();
    });
</script>
</html>