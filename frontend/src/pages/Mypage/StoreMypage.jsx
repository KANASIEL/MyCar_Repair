/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

import "../../components/common/mainpage.css";
import "../../components/common/mypage_common.css";
import "./store.css";

function StoreMypage() {
    const [store, setStore] = useState({});

    const loadStoreData = async () => {
		const res = await axios.get("http://localhost:8484/api/mypage/store/info", {
		            withCredentials: true,
		        });
        setStore(res.data);
    };

    useEffect(() => {
        loadStoreData();
    }, []);

    return (
        <>

            <main className="mypage-body">
                <div className="mypage-title">
                    <h2>정비업소 마이페이지</h2>
                    <p>업체 정보를 확인하고 관리할 수 있습니다.</p>
                </div>

                <section className="mypage-section">
                    <h3>업체 정보</h3>

                    <table className="info-table">
                        <tbody>
                            <tr><th>아이디</th><td>{store.storeId}</td></tr>
                            <tr><th>이메일</th><td>{store.email}</td></tr>
                            <tr><th>전화번호</th><td>{store.phoneNumber}</td></tr>
                            <tr><th>주소</th><td>{store.address}</td></tr>
                            <tr><th>위도</th><td>{store.latitude}</td></tr>
                            <tr><th>경도</th><td>{store.longitude}</td></tr>
                            <tr><th>영업시간</th><td>{store.openingHours}</td></tr>
                            <tr><th>소개글</th><td>{store.description}</td></tr>
                            <tr><th>등록일</th><td>{store.regDate}</td></tr>
                        </tbody>
                    </table>

                    <button
                        className="btn-normal"
                        onClick={() => window.location.href="/mypage/store/edit"}
                    >
                        정보 수정
                    </button>
                </section>
            </main>

        </>
    );
}

export default StoreMypage;
