$(document).ready(function() {
    const actionForm = $("form");

    $("#login").on("click", function(e) {
        e.preventDefault();

        const id = $("input[name='accountId']").val().trim();
        const pw = $("input[name='password']").val().trim();

        if (id === "") {
            alert("아이디를 입력하세요.");
            $("input[name='accountId']").focus();
            return;
        }

        if (pw === "") {
            alert("비밀번호를 입력하세요.");
            $("input[name='password']").focus();
            return;
        }

        actionForm.attr("action", "loginYn").submit();
    });
});


$(document).ready(function() {
    const actionForm = $("form");

    $("#login2").on("click", function(e) {
        e.preventDefault();

        const id = $("input[name='storeId']").val().trim();
        const pw = $("input[name='password']").val().trim();

        if (id === "") {
            alert("아이디를 입력하세요.");
            $("input[name='storeId']").focus();
            return;
        }

        if (pw === "") {
            alert("비밀번호를 입력하세요.");
            $("input[name='password']").focus();
            return;
        }

        actionForm.attr("action", "storeLoginYn").submit();
    });
});

