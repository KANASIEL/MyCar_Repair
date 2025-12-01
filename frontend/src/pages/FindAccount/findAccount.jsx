import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../components/common/mainpage.css";
import "./findAccount.css";

function FindAccount() {
	
	const navigate = useNavigate();
	
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

		if (email.trim() === "") {
		            alert("이메일을 입력하세요.");
		            return;
        }
        if (phone.trim() === "") {
            alert("전화번호를 입력하세요.");
            return;
        }
		
        try {
            const response = await axios.post("http://localhost:8484/api/findAccount", {
                email: email,
                phone: phone,
            });

            if (response.data.success) {
				
				navigate("/findOK");
				
            } else {
                alert("계정 정보를 찾지 못했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
    };

	
    return (
        <>
            <main>
                <form onSubmit={handleSubmit}>
                    <table className="table1">
					<tbody>
                        <tr className="tr-center">
                            <td className="trh1" colSpan="3">
                                <p>아이디 찾기</p>
                            </td>
                        </tr>

                        <tr className="tr-center">
                            <td colSpan="3" className="td1">
                                <p>아래 정보를 입력하시면 아이디를 메일로 발송해 드립니다.</p>
                            </td>
                        </tr>

                        <tr className="tr-center">
                            <td colSpan="3">
                                <input
                                    className="email"
                                    type="text"
                                    placeholder="이메일"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr className="tr-center">
                            <td colSpan="3">
                                <input
                                    className="phone"
                                    type="text"
                                    placeholder="전화번호"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr className="tr-center">
                            <td colSpan="3">
                                <input className="find2" type="submit" value="확인" />
                            </td>
                        </tr>

                        <tr className="tr-center">
                            <td colSpan="3">
                                <input
                                    className="btn2"
                                    type="button"
                                    value="로그인 페이지 이동"
                                    onClick={() => (window.location.href = "/login")}
                                />
                            </td>
                        </tr>

                        <tr className="tr-center">
                            <td className="btn3">
                                <a href="/findAccount" className="link">아이디 찾기</a>
                                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                                <a href="/findPW" className="link">비밀번호 찾기</a>
                                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                                <a href="/register" className="link">회원가입</a>
                            </td>
                        </tr>
						</tbody>
                    </table>
                </form>
            </main>

        </>
    );
}

export default FindAccount;
