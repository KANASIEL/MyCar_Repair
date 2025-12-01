$(document).ready(function () {
    var actionForm = $("#actionForm");
    var searchForm = $("#searchForm"); // 👈 searchForm 변수 정의

// --- 2. 공지 상세 보기 로직 ---
    $(".notice-table .notice-link").on("click", function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        var noticeNo = href.match(/notice_no=(\d+)/)?.[1]; // 숫자만 추출

        if (!noticeNo) {
            alert("잘못된 링크입니다.");
            return;
        }

        // actionForm의 파라미터를 사용해 POST 방식으로 이동합니다.
        actionForm.find("input[name='notice_no']").remove();
        actionForm.append(
            $("<input>").attr({
                type: "hidden",
                name: "notice_no",
                value: noticeNo
            })
        );

        actionForm.attr("action", "/notice/notice_view").submit();
    });

// --- 3. 검색 로직 ---
    $("#searchForm button").on("click", function (e) {
        // 키워드 입력 필드 값이 없는지 확인
        if (searchForm.find("option:selected").val() !== "" && !searchForm.find("input[name='keyword']").val()) {
            e.preventDefault(); // 폼 제출 방지
            alert("키워드를 입력하세요.");
            return false;
        }

        // 검색 실행 시 첫 페이지(pageNum=1)로 이동하도록 설정
        actionForm.find("input[name='pageNum']").val(1);

        // searchForm이 아닌 actionForm에 type과 keyword 값을 복사하여 제출하거나,
        // searchForm 자체를 제출하도록 코드를 수정해야 합니다. (JSP에서 actionForm에 모든 파라미터가 있지만, 검색은 searchForm이 담당하므로)

        // 검색 폼이 GET 방식이고 action이 '/notice/notice_list'이므로 바로 제출하도록 합니다.
        searchForm.attr("action", "/notice/notice_list");
        searchForm.submit();

        // actionForm.submit()을 사용하려면 searchForm의 값을 actionForm에 복사해야 하지만,
        // searchForm 자체가 method="get"이고 action이 지정되어 있지 않아, 여기서는 searchForm을 바로 제출합니다.
    });

// --- 4. 검색 조건 변경 시 키워드 초기화 ---
    $("#searchForm select").on("change", function () {
        // 'searchForm' 변수 사용
        if (searchForm.find("option:selected").val() === "") {
            searchForm.find("input[name='keyword']").val("");
        }
    });
});