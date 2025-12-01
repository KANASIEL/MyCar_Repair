import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/common/mypage_common.css";
import "./useredit.css";

function UserEdit() {

  const [user, setUser] = useState({});

  // 기존 정보 로드
  useEffect(() => {
    axios.get("/api/mypage/user/info")
      .then(res => setUser(res.data.user));
  }, []);

  // 저장
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userName: e.target.userName.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      currentPassword: e.target.currentPassword.value,
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    const res = await axios.post("/api/mypage/user/update", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.data === "SUCCESS") {
      alert("수정 완료되었습니다.");
      window.location.href = "/mypage/user";
    } else if (res.data === "INVALID_PASSWORD") {
      alert("현재 비밀번호가 틀렸습니다.");
    }
  };


  return (
    <div className="edit-container">

      <h2>회원정보 수정</h2>

      <form className="edit-form" onSubmit={onSubmit}>

        <div className="form-group">
          <label>이름</label>
          <input name="userName" defaultValue={user.userName} required />
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input name="email" defaultValue={user.email} required />
        </div>

        <div className="form-group">
          <label>전화번호</label>
          <input name="phoneNumber" defaultValue={user.phoneNumber} required />
        </div>

        <hr className="divider" />

        <h3>비밀번호 변경</h3>

        <div className="form-group">
          <label>현재 비밀번호</label>
          <input type="password" name="currentPassword" />
        </div>

        <div className="form-group">
          <label>새 비밀번호</label>
          <input type="password" name="newPassword" />
        </div>

        <div className="form-group">
          <label>비밀번호 확인</label>
          <input type="password" name="confirmPassword" />
        </div>

        <div className="edit-buttons">
          <button type="button" className="btn-normal btn-cancel" onClick={() => window.history.back()}>
            취소
          </button>
          <button type="submit" className="btn-normal btn-save">
            저장
          </button>
        </div>

      </form>
    </div>
  );
}

export default UserEdit;
