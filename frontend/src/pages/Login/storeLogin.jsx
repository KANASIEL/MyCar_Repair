import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../components/common/mainpage.css";
import "./storeLogin.css";

function StoreLogin() {
    const [storeId, setStoreId] = useState("");
    const [password, setPassword] = useState("");
    const [saveId, setSaveId] = useState(false);
    const [loginFailMsg, setLoginFailMsg] = useState("");

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
        const saved = getCookie("storeSavedId");
        if (saved) {
            setStoreId(saved);
            setSaveId(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (storeId.trim() === "") {
            alert("아이디를 입력하세요.");
            return;
        }
        if (password.trim() === "") {
            alert("비밀번호를 입력하세요.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8484/api/storeLogin",
                { storeId, password, saveId },
                { withCredentials: true }
            );

            if (res.data.success) {
				
				sessionStorage.setItem("ROLE", "STORE");
				sessionStorage.setItem("ACCOUNT_ID", storeId)
				
                if (saveId) setCookie("storeSavedId", storeId, 7);
                else deleteCookie("storeSavedId");

                window.location.href = "/";
            } else {
                setLoginFailMsg(res.data.msg || "로그인 실패");
            }
        } catch (err) {
            setLoginFailMsg("서버 오류가 발생했습니다.");
        }
    };

    return (
        <>

            <main className="store-login-main">
                <form onSubmit={handleSubmit} className="store-login-form">

                    <table className="store-login-table">
                        <caption className="store-login-caption">
                            <h1 className="store-login-title">업체 로그인</h1>
                            <p className="store-login-subtitle">정비소 업체 계정으로 로그인 하세요.</p>
                        </caption>

                        <tbody>
                            <tr>
                                <td className="store-login-tab">
                                    <a href="/login" className="store-login-tab-off">회원 로그인</a>
                                </td>
                                <td className="store-login-tab">
                                    <a className="store-login-tab-on">업체 로그인</a>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3">
                                    <input
                                        className="store-login-input"
                                        type="text"
                                        placeholder="아이디를 입력하세요"
                                        value={storeId}
                                        onChange={(e) => setStoreId(e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3">
                                    <input
                                        className="store-login-input"
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3">
                                    <label className="store-login-saveid">
                                        <input
                                            type="checkbox"
                                            id="store-login-saveid-check"
                                            checked={saveId}
                                            onChange={(e) => setSaveId(e.target.checked)}
                                        />
                                        <span className="store-login-custom-check"></span>
                                        <p className="store-login-saveid-text">아이디 저장</p>
                                    </label>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3">
                                    <div className="store-login-error">
                                        {loginFailMsg ? loginFailMsg : <>&nbsp;</>}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3" className="store-login-btn-area">
                                    <input type="submit" value="로그인" className="store-login-btn" />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3" className="store-login-links">
                                    <a href="/findAccount" className="store-login-link">아이디 찾기</a>
                                    &nbsp;&nbsp;/&nbsp;&nbsp;
                                    <a href="/findPW" className="store-login-link">비밀번호 찾기</a>
                                    &nbsp;&nbsp;/&nbsp;&nbsp;
                                    <a href="/register" className="store-login-link">회원가입</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>
            </main>

        </>
    );
}

export default StoreLogin;
