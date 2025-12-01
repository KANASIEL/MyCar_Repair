/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";


import "../../components/common/mypage_common.css";
import "./storeedit.css";

function StoreEdit() {

    const [store, setStore] = useState({
        storeId: "",
        email: "",
        phoneNumber: "",
        openingHours: "",
        address: "",
        latitude: "",
        longitude: "",
        description: "",
        currentPw: "",
        newPw: "",
        confirmPw: ""
    });

    // 기존 업체 정보 로드
    const loadStoreInfo = async () => {
		const res = await axios.get("http://localhost:8484/api/mypage/store/info", {
		            withCredentials: true
		        });
        setStore(prev => ({ ...prev, ...res.data }));
    };

    useEffect(() => {
        loadStoreInfo();
    }, []);

    // 값 변경 핸들러
    const onChange = (e) => {
        const { name, value } = e.target;
        setStore(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
    e.preventDefault();

    try {
        // ======================
        // (1) 비밀번호 변경 처리
        // ======================
        if (store.newPw) {
            if (store.newPw !== store.confirmPw) {
                alert("새 비밀번호가 일치하지 않습니다.");
                return;
            }

            const pwRes = await axios.post(
                "http://localhost:8484/api/mypage/store/updatePassword",
                {
                    currentPw: store.currentPw,
                    newPw: store.newPw
                },
                { withCredentials: true }
            );

            if (!pwRes.data.success) {
                alert("현재 비밀번호가 틀렸습니다.");
                return;
            }
        }

        // ======================
        // (2) 업체 정보 수정
        // ======================
        const { currentPw, newPw, confirmPw, ...storeInfo } = store;

        await axios.post(
            "http://localhost:8484/api/mypage/store/update",
            storeInfo,
            { withCredentials: true }
        );

        alert("수정이 완료되었습니다.");
        window.location.href = "/mypage/store";

        } catch (err) {
            console.error("업체 정보 수정 실패:", err);
            alert("수정 중 오류가 발생했습니다.");
        }
    };


    return (
        <>
            <main className="edit-container">
                <h2>업체 정보 수정</h2>

                <form className="edit-form" onSubmit={onSubmit}>

                    <div className="form-group">
                        <label>아이디</label>
                        <input type="text" name="storeId" value={store.storeId} readOnly />
                    </div>

                    <div className="form-group">
                        <label>현재 비밀번호</label>
                        <input type="password" name="currentPw" value={store.currentPw} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label>새 비밀번호</label>
                        <input type="password" name="newPw" value={store.newPw} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label>비밀번호 확인</label>
                        <input type="password" name="confirmPw" value={store.confirmPw} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label>이메일</label>
                        <input type="email" name="email" value={store.email} onChange={onChange} required />
                    </div>

                    <div className="form-group">
                        <label>전화번호</label>
                        <input type="text" name="phoneNumber" value={store.phoneNumber} onChange={onChange} required />
                    </div>

                    <div className="form-group">
                        <label>영업시간</label>
                        <input type="text" name="openingHours" value={store.openingHours} onChange={onChange} required />
                    </div>

                    <div className="form-group">
                        <label>주소</label>
                        <input type="text" name="address" value={store.address} onChange={onChange} required />
                    </div>

                    <div className="form-inline">
                        <div className="form-group-half">
                            <label>위도</label>
                            <input type="text" name="latitude" value={store.latitude} onChange={onChange} />
                        </div>

                        <div className="form-group-half">
                            <label>경도</label>
                            <input type="text" name="longitude" value={store.longitude} onChange={onChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>업체 소개</label>
                        <textarea
                            name="description"
                            rows="6"
                            value={store.description}
                            onChange={onChange}
                        ></textarea>
                    </div>

                    <div className="edit-buttons">
                        <button type="button" className="btn-normal btn-cancel" onClick={() => history.back()}>
                            취소
                        </button>
                        <button type="submit" className="btn-normal btn-save">
                            저장
                        </button>
                    </div>

                </form>
            </main>
            
        </>
    );
}

export default StoreEdit;
