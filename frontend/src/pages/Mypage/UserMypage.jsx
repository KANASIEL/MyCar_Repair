/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

import "./user.css";

function UserMypage() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [carList, setCarList] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);
  const [pageMaker, setPageMaker] = useState(null);

  /** 🔹 유저/차량/문의 내역 로드 */
  const loadUserData = async (pageNum = 1) => {
    try {
      const res = await axios.get("/api/mypage/user/info", {
        params: { pageNum },
        withCredentials: true
        });

      setUser(res.data.user);
      setCarList(res.data.carList || []);
      setInquiryList(res.data.inquiryList || []);
      setPageMaker(res.data.pageMaker);

    } catch (err) {
      console.error("❌ 마이페이지 데이터 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 첫 로딩 */
  useEffect(() => {
    loadUserData();
  }, []);

  /** 🔹 차량 등록 */
  const addCar = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = {
      car_number: form.get("car_number"),
      car_model: form.get("car_model"),
      car_type: form.get("car_type"),
      model_year: form.get("model_year"),
      car_mileage: form.get("car_mileage"),
    };

    try {
      await axios.post("/api/mypage/user/addCar", data, {
        withCredentials: true,
      });
      loadUserData();
    } catch (err) {
      console.error("❌ 차량 등록 실패:", err);
    }
  };

  /** 🔹 차량 삭제 */
  const deleteCar = async (car_number) => {
    if (!window.confirm(`${car_number} 차량을 삭제하시겠습니까?`)) return;

    try {
      await axios.delete(`/api/mypage/user/deleteCar/${car_number}`, {
        withCredentials: true,
      });
      loadUserData();
    } catch (err) {
      console.error("❌ 차량 삭제 실패:", err);
    }
  };

  /** 🔹 페이지 이동 */
  const changePage = (num) => {
    loadUserData(num);
  };

  // ▣ 로딩 화면
  if (loading) {
    return (
      <div className="mypage-body">
        <h3>로딩 중…</h3>
      </div>
    );
  }

  // ▣ 유저정보 없음 (401 등)
  if (!user) {
    return (
      <div className="mypage-body">
        <h3>로그인이 필요합니다.</h3>
      </div>
    );
  }

  // ▣ 정상 화면 렌더링
  return (
    <div className="mypage-body">

      {/* 타이틀 */}
      <div className="mypage-title">
        <h2>마이페이지</h2>
        <p>회원님의 차량, 문의 내역, 계정 정보를 확인하세요.</p>
      </div>

      {/* ===== 내 정보 ===== */}
      <section className="mypage-section">
        <h3>내 정보</h3>
        <table className="info-table">
          <tbody>
            <tr><th>이름</th><td>{user.userName}</td></tr>
            <tr><th>이메일</th><td>{user.email}</td></tr>
            <tr><th>전화번호</th><td>{user.phoneNumber}</td></tr>
            <tr><th>가입일</th><td>{user.regDate}</td></tr>
          </tbody>
        </table>

        <button
          className="btn-normal"
          onClick={() => (window.location.href = "/mypage/user/edit")}
        >
          정보 수정
        </button>
      </section>

      {/* ===== 차량 등록 ===== */}
      <section className="mypage-section">
        <h3>내 차량 관리</h3>

        <form onSubmit={addCar} className="car-form">
  <table className="info-table">
    <tbody>
      <tr>
        <th>차량번호</th>
        <td><input type="text" name="car_number" required /></td>
      </tr>

      <tr>
        <th>차량모델</th>
        <td><input type="text" name="car_model" required /></td>
      </tr>

      <tr>
        <th>차량종류</th>
        <td>
          <select name="car_type" required>
            <option value="">선택</option>
            <option value="국산">국산</option>
            <option value="해외">해외</option>
          </select>
        </td>
      </tr>

      <tr>
        <th>연식</th>
        <td><input type="text" name="model_year" placeholder="예: 2020" required /></td>
      </tr>

      <tr>
        <th>주행거리</th>
        <td><input type="number" name="car_mileage" min="0" required /></td>
      </tr>

    </tbody>
  </table>

  <button type="submit" className="btn-normal">차량 등록</button>
</form>


        {/* 차량 리스트 */}
        {carList.length > 0 ? (
          <table className="data-table" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>차량번호</th>
                <th>차량모델</th>
                <th>차량종류</th>
                <th>연식</th>
               <th>주행거리 (km)</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
            {carList.map((car) => (
              <tr key={car.car_number}>
                <td>{car.car_number}</td>
                <td>{car.car_model}</td>
                <td>{car.car_type}</td>
                <td>{car.model_year}</td>   
                <td>{car.car_mileage}</td>  
                <td>
                  <button className="btn-sub" onClick={() => deleteCar(car.car_number)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        ) : (
          <p>등록된 차량이 없습니다.</p>
        )}
		{/* 정비 이력 확인 버튼 */}
		<div style={{ marginTop: "20px", textAlign: "right" }}>
		  <button
		    className="btn-normal"
		    onClick={() => (window.location.href = "/maintenance")}
		  >
		    정비 이력 확인
		  </button>
		</div>
      </section>

      {/* ===== 문의 내역 ===== */}
      <section className="mypage-section">
        <h3>1:1 문의 내역</h3>

        {inquiryList.length > 0 ? (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>상태</th>
                  <th>보기</th>
                </tr>
              </thead>
              <tbody>
                {inquiryList.map((q) => (
                  <tr key={q.inquiry_no}>
                    <td>{q.inquiry_no}</td>
                    <td>{q.inquiry_title}</td>
                    <td>{q.inquiry_created}</td>
                    <td>{q.inquiry_status}</td>
                    <td>
                      <a className="btn-sub" href={`/inquiry/${q.inquiry_no}`}>상세보기</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 페이지네이션 */}
            <nav className="pagination-container">
              <ul className="pagination-list">
                {pageMaker?.prev && (
                  <li><button onClick={() => changePage(pageMaker.startPage - 1)}>이전</button></li>
                )}

                {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => {
                  const num = pageMaker.startPage + i;
                  return (
                    <li key={num} className={(pageMaker?.cri?.pageNum === num) ? "active" : ""}>
                      <button onClick={() => changePage(num)}>{num}</button>
                    </li>
                  );
                })}

                {pageMaker?.next && (
                  <li><button onClick={() => changePage(pageMaker.endPage + 1)}>다음</button></li>
                )}
              </ul>
            </nav>
          </>
        ) : (
          <p>등록된 문의 내역이 없습니다.</p>
        )}
      </section>
    </div>
  );
}

export default UserMypage;
