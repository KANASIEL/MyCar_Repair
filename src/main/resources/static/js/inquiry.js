$(document).ready(function () {
    var actionForm = $("#actionForm");

    // --- 2. 문의 상세 보기 로직 ---
    $(".inquiry-table .inquiry-link").on("click", function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        var inquiryNo = href.match(/inquiry_no=(\d+)/)?.[1]; // 숫자만 추출

        if (!inquiryNo) {
            alert("잘못된 링크입니다.");
            return;
        }

        // inquiry_no 파라미터가 중복되는 것을 막기 위해 기존에 추가된 것은 삭제
        actionForm.find("input[name='inquiry_no']").remove();
        actionForm.append(
            $("<input>").attr({
                type: "hidden",
                name: "inquiry_no",
                value: inquiryNo
            })
        );

        actionForm.attr("action", "/inquiry/inquiry_view").submit();
    });

    // --- 3. 검색 로직 (유효성 검사 및 조건 초기화) ---
    // 검색 버튼 클릭 시 유효성 검사 및 검색 요청
    $("#searchForm button").on("click", function () {
        // 이 부분에 검색 유효성 검사 로직을 추가할 수 있습니다.
    });

    // 검색 조건 변경 시 키워드 초기화
    $("#searchForm select").on("change", function () {
        // 검색 유형이 "--" (value="")일 때 키워드를 초기화합니다.
        if ($(this).val() === "") {
            $("#searchForm input[name='keyword']").val("");
        }
    });

    // --- 4. 문의 삭제 토글 로직 ---
    // 삭제 모드 상태를 추적하는 변수
    let isDeleteMode = false;

    // '문의 삭제' 버튼 (ID: toggleDelete) 클릭 이벤트
    $('#toggleDelete').on('click', function() {
        if (!isDeleteMode) {
            // 삭제 모드 활성화
            $('#header-no').hide();
            $('#selectAll').show();
            $('.inquiry-no-text').hide();
            $('.inquiry-checkbox').show();
            $('#toggleDelete').hide();
            $('#confirmDelete').show();
            $('#cancelDelete').show();
            isDeleteMode = true;
        } else {
            $('#cancelDelete').click();
        }
    });

    // '취소' 버튼 (ID: cancelDelete) 클릭 이벤트
    $('#cancelDelete').on('click', function() {
        // 삭제 모드 비활성화
        $('#header-no').show();
        $('#selectAll').hide();
        $('.inquiry-no-text').show();
        $('.inquiry-checkbox').hide();
        $('.inquiry-checkbox').prop('checked', false);
        $('#selectAll').prop('checked', false);
        $('#toggleDelete').show();
        $('#confirmDelete').hide();
        $('#cancelDelete').hide();
        isDeleteMode = false;
    });

    // '전체 선택' 체크박스 기능
    $('#selectAll').on('change', function() {
        let isChecked = $(this).is(':checked');
        $('.inquiry-checkbox').prop('checked', isChecked);
    });

    // --- 5. 삭제 처리 로직 ---
    $('#deleteForm').on('submit', function(e) {
        let selectedIds = [];

        // 체크된 모든 체크박스의 value (inquiry_no)를 수집
        $('.inquiry-checkbox:checked').each(function() {
            selectedIds.push($(this).val());
        });

        // 선택된 항목이 없으면 제출을 막고 알림
        if (selectedIds.length === 0) {
            e.preventDefault(); // 폼 제출 방지
            alert("삭제할 문의를 선택해주세요.");
            return false;
        }

        // 기존의 deleteIds hidden input 제거 (중복 방지)
        $('#deleteForm input[name="deleteIds"]').remove();

        // 선택된 ID들을 hidden input으로 추가
        selectedIds.forEach(function(id) {
            $('<input>').attr({
                type: 'hidden',
                name: 'deleteIds', // 컨트롤러의 파라미터 이름과 일치
                value: id
            }).appendTo('#deleteForm');
        });

        // 폼 제출
        return true;
    });
});