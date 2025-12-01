<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/faq.css">
   <style>
      #btn_logout{
         text-align: right;
      }
      .div_page ul{
         display: flex;
         list-style: none;
      }
   </style>
</head>

<jsp:include page="/WEB-INF/views/header.jsp" />

<body>
<main>
	<div class="faq-container">
	   
	      <%-- 2. "FAQ" 제목 추가 --%>
	      <h2>FAQ</h2>
	      <p>자주 묻는 질문을 확인하세요.</p>
		  
   <table class="faq-table">
      <tr>
         <td>번호</td>
         <td>자주 묻는 질문</td>
         <td>답변</td>
         <td>작성일</td>
         <td>조회수</td>
      </tr>
      <c:forEach var="dto" items="${list}">
         <tr>
            <td>${dto.faqNo}</td>
            <td>
			   <a href="faq_view?faq_no=${dto.faqNo}">${dto.faqTitle}</a>
            </td>
            <td>${dto.faqContent}</td>
            <td>${dto.faqCreated}</td>
            <td>${dto.faqHit}</td>
         </tr>
      </c:forEach>
   
   </table>
   <div class="faq-controls-group">
           
           <form action="faq" method="get" id="searchForm"> 
               <select name="type">
                  <option value=""  <c:out value="${pageMaker.cri.type == null?'selected':' '}"/>>--</option>
                  <option value="T"  <c:out value="${pageMaker.cri.type eq 'T'?'selected':''}"/>>자주 묻는 질문</option>
                  <option value="C"  <c:out value="${pageMaker.cri.type eq 'C'?'selected':''}"/>>답변</option>
                  <option value="TC"  <c:out value="${pageMaker.cri.type eq 'TC'?'selected':''}"/>>자주 묻는 질문 or 답변</option>
               </select>
               <input type="text" name="keyword" value='<c:out value="${pageMaker.cri.keyword}"/>'>
               
       	    <button type="button" id="searchBtn">검색</button>
			<c:choose>
               <c:when test="${sessionScope.ROLE == 'ADMIN'}">
 	               <button type="button" id="writeBtn" class="btn-write">글쓰기</button>
               </c:when>
           </c:choose>
           </form>
           
      </div>
   
   <div class="div_page">
         <ul>
            <c:if test="${pageMaker.prev}">
               <li class="paginate_button">
                  <a href="${pageMaker.startPage - 1}">[Previous]</a>
               </li>
            </c:if>
			<c:set var="currentPageNum" value="${pageMaker.cri.pageNum + 0}" />
            <c:forEach var="num" begin="${pageMaker.startPage}" end="${pageMaker.endPage}">
			<li class="paginate_button ${currentPageNum == num ? 'active' : ''}">
                  <a href="${num}">[${num}]</a>
               </li>
            </c:forEach>
            
            <c:if test="${pageMaker.next}">
               <li class="paginate_button">
                  <a href="${pageMaker.endPage + 1}">[Next]</a>
               </li>
            </c:if>
         </ul>
      </div>

   <form method="get" id="actionForm">
      <input type="hidden" name="pageNum" value="${pageMaker.cri.pageNum}">
      <input type="hidden" name="amount" value="${pageMaker.cri.amount}">
      <input type="hidden" name="type" value="${pageMaker.cri.type}">
      <input type="hidden" name="keyword" value="${pageMaker.cri.keyword}">
   </form>
   </div>
   </main>
   <jsp:include page="/WEB-INF/views/footer.jsp" />
</body>
</html>
<script src="${pageContext.request.contextPath}/js/jquery.js"></script>
<script>
   var actionForm = $("#actionForm"); // 페이지 이동용 숨겨진 폼
   var searchForm = $("#searchForm"); // 검색용 폼
   
   // 1. 페이지번호 처리 (변경 없음)
   $(".paginate_button a").on("click", function (e) {
      e.preventDefault();
      actionForm.find("input[name='pageNum']").val($(this).attr('href'));
      actionForm.attr("action","faq").submit();
   });

   // 2. Search 버튼 처리 (HTML에서 #searchBtn ID를 부여했다고 가정)
   $("#searchBtn").on("click", function (e){
        e.preventDefault(); // 기본 폼 전송 막기
        
        var type = searchForm.find("option:selected").val();
        var keyword = searchForm.find("input[name='keyword']").val();
        
		if(type != "" && keyword == "" ){
			alert("키워드를 입력하세요.");
			return false;
		}
	
		searchForm.submit(); // searchForm을 action="faq"로 전송
   });
   
   // 3. 글쓰기 버튼 처리 (HTML에서 #writeBtn ID를 부여했다고 가정)
   $("#writeBtn").on("click", function(e){
      e.preventDefault();
      // 'faq_write' 컨트롤러 주소로 이동
      location.href = "faq_write"; 
   });
   
   // 4. Select 박스 변경
   $("#searchForm select").on("change", function (){
		if(searchForm.find("option:selected").val() == ""){
			searchForm.find("input[name='keyword']").val("");
		}
   });
</script>