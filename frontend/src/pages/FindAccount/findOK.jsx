import React from "react";
import { useNavigate } from "react-router-dom";
import "./findOK.css";
import "../../components/common/mainpage.css";

function FindOK() {
    const navigate = useNavigate();

    return (
        <>

            <main>
                <table className="findok-table">
                    <tbody>
                        <tr>
                            <td className="text">
                                <p>회원님의 계정 정보를 입력하신 이메일로 전송해 드렸습니다.</p>
                            </td>
                        </tr>

                        <tr>
                            <td className="backlogin">
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={() => navigate("/login")}
                                >
                                    로그인 페이지로 돌아가기
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td className="link_wrap">
                                <a href="/findAccount" className="link">아이디 찾기</a>
                                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                                <a href="/findPW" className="link">비밀번호 찾기</a>
                                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                                <a href="/register" className="link">회원가입</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>

        </>
    );
}

export default FindOK;
