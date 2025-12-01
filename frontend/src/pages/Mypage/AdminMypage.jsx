/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/common/mypage_common.css";
import "./admin.css";

function AdminMypage() {

    const [userList, setUserList] = useState([]);
    const [pendingStores, setPendingStores] = useState([]);
    const [loading, setLoading] = useState(true);

    // 데이터 로드
	const loadData = async () => {
	    setLoading(true);
	    try {
	        const res = await axios.get("http://localhost:8484/api/mypage/admin/dashboard");

	        setUserList(res.data.userList);
	        setPendingStores(res.data.pendingStores);

	    } catch (err) {
	        console.error("관리자 데이터 로드 실패:", err);
	    }
	    setLoading(false);
	};

    // 첫 로딩 시 호출
    useEffect(() => {
        loadData();
    }, []);

    // 회원 상태 변경
	const updateUserStatus = async (accountId, status) => {
	    await axios.post("http://localhost:8484/api/mypage/admin/user/updateStatus", {
	        accountId, status
	    });
	    loadData();
	};

    // 업체 승인/거절
	const updateStoreStatus = async (storeId, status) => {
	    await axios.post("http://localhost:8484/api/mypage/admin/store/updateStatus", {
	        storeId, status
	    });
	    loadData();
	};

    return (
        <>

            <main className="mypage-body admin">

                <section className="mypage-title">
                    <h2>관리자 대시보드</h2>
                    <p>사이트 현황과 회원 및 정비업체를 관리하세요.</p>
                </section>

                {/* 로딩 중 */}
                {loading && (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        데이터를 불러오는 중입니다...
                    </div>
                )}

                {/* ===== 회원 관리 ===== */}
                {!loading && (
                    <section className="mypage-section">
                        <h3>회원 관리</h3>

                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>회원명</th>
                                    <th>이메일</th>
                                    <th>전화번호</th>
                                    <th>가입일</th>
                                    <th>상태</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((u) => (
                                    <tr key={u.accountId}>
                                        <td>{u.userName}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phoneNumber}</td>
                                        <td>{u.regDate}</td>
                                        <td className={u.account_status === "ACTIVE" ? "active" : "inactive"}>
                                            {u.account_status}
                                        </td>
                                        <td>

                                            {u.account_status === "SUSPENDED" ? (
                                                <button
                                                    className="btn-sub approve"
                                                    onClick={() => updateUserStatus(u.accountId, "ACTIVE")}
                                                >
                                                    복구
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn-sub reject"
                                                    onClick={() => updateUserStatus(u.accountId, "SUSPENDED")}
                                                >
                                                    정지
                                                </button>
                                            )}

                                            <button
                                                className="btn-sub delete"
                                                onClick={() => updateUserStatus(u.accountId, "DELETED")}
                                            >
                                                삭제
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {/* ===== 업체 승인 요청 ===== */}
                {!loading && (
                    <section className="mypage-section">
                        <h3>정비업체 승인 요청</h3>

                        {pendingStores.length === 0 ? (
                            <p>대기 중인 승인 요청이 없습니다.</p>
                        ) : (
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>업체명</th>
                                        <th>이메일</th>
                                        <th>전화번호</th>
                                        <th>신청일</th>
                                        <th>승인</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingStores.map((s) => (
                                        <tr key={s.storeId}>
                                            <td>{s.storeId}</td>
                                            <td>{s.email}</td>
                                            <td>{s.phoneNumber}</td>
                                            <td>{s.regDate}</td>
                                            <td>
                                                <button
                                                    className="btn-sub approve"
                                                    onClick={() => updateStoreStatus(s.storeId, "APPROVED")}
                                                >
                                                    승인
                                                </button>

                                                <button
                                                    className="btn-sub reject"
                                                    onClick={() => updateStoreStatus(s.storeId, "REJECTED")}
                                                >
                                                    거절
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </section>
                )}

            </main>
        </>
    );
}

export default AdminMypage;
