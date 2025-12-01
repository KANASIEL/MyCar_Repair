import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../components/common/mainpage.css";
import "./login.css"; // login 전용 CSS

function Login() {
    const [accountId, setAccountId] = useState("");
    const [password, setPassword] = useState("");
    const [saveId, setSaveId] = useState(false);
    const [loginFailMsg, setLoginFailMsg] = useState("");

    // 쿠키 읽기
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const setCookie = (name, value, days) => {
        const d = new Date();
        d.setDate(d.getDate() + days);
        document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
    };

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1999 00:00:10 GMT; path=/`;
    };

    useEffect(() => {
        const saved = getCookie("savedId");
        if (saved) {
            setAccountId(saved);
            setSaveId(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (accountId.trim() === "") {
            alert("아이디를 입력하세요.");
            return;
        }
        if (password.trim() === "") {
            alert("비밀번호를 입력하세요.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8484/api/login",
                { accountId, password },
                { withCredentials: true }
            );

            if (res.data.success) {
				
				sessionStorage.setItem("role", res.data.role);
			    sessionStorage.setItem("accountId", accountId)
				
                if (saveId) setCookie("savedId", accountId, 7);
                else deleteCookie("savedId");
				
				sessionStorage.setItem("ROLE", res.data.role);
				sessionStorage.setItem("ACCOUNT_ID", accountId);

                window.location.href = "/";
            } else {
                setLoginFailMsg(res.data.message || "로그인 실패");
            }
        } catch (err) {
            setLoginFailMsg("서버 오류가 발생했습니다.");
        }
    };

    return (
        <>

            <main className="login-main">
                <form onSubmit={handleSubmit}>
                    <table border="1" align="center" className="login-table">
                        <caption>
                            <h1 className="login-title">일반 회원 로그인</h1>
                            <p className="login-subtext">
                                MY CAR 정비소의 서비스를 이용하시려면 로그인 하세요.
                            </p>
                        </caption>

                        <tbody>

                            {/* 탭 영역 */}
                            <tr className="login-tab-row">
                                <td className="login-tab">
                                    <a className="login-tab-active">회원 로그인</a>
                                </td>
                                <td className="login-tab">
                                    <a href="/storeLogin" className="login-tab-other">
                                        업체 로그인
                                    </a>
                                </td>
                            </tr>

                            {/* 아이디 입력 */}
                            <tr>
                                <td colSpan="3">
                                    <input
                                        className="login-input"
                                        type="text"
                                        name="accountId"
                                        placeholder="아이디를 입력하세요"
                                        value={accountId}
                                        onChange={(e) => setAccountId(e.target.value)}
                                    />
                                </td>
                            </tr>

                            {/* 비밀번호 */}
                            <tr>
                                <td colSpan="3">
                                    <input
                                        className="login-input"
                                        type="password"
                                        name="password"
                                        placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>

                            {/* 아이디 저장 체크박스 */}
                            <tr>
                                <td colSpan="3">
                                    <label className="login-check-wrapper">
                                        <input
                                            type="checkbox"
                                            id="login-save-id"
                                            checked={saveId}
                                            onChange={(e) => setSaveId(e.target.checked)}
                                        />
                                        <span className="login-check-custom"></span>
                                        <p className="login-check-text">아이디 저장</p>
                                    </label>
                                </td>
                            </tr>

                            {/* 에러 메시지 */}
                            <tr>
                                <td colSpan="3" className="login-error-row">
                                    <div className="login-error-msg">
                                        {loginFailMsg ? loginFailMsg : <>&nbsp;</>}
                                    </div>
                                </td>
                            </tr>

                            {/* 로그인 버튼 */}
                            <tr>
                                <td colSpan="3" className="login-btn-row">
                                    <input type="submit" value="로그인" className="login-btn" />
                                </td>
                            </tr>

                            {/* 하단 링크 */}
                            <tr>
                                <td className="login-links" colSpan="3">
                                    <a href="/findAccount" className="login-link">아이디 찾기</a>
                                    &nbsp;&nbsp;/&nbsp;&nbsp;
                                    <a href="/findPW" className="login-link">비밀번호 찾기</a>
                                    &nbsp;&nbsp;/&nbsp;&nbsp;
                                    <a href="/register" className="login-link">회원가입</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </form>
            </main>

        </>
    );
}

export default Login;
