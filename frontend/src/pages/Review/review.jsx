import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import "./review.css";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const { storeId, rsvNo } = useParams();

  // 테스트 로그인
  useEffect(() => {
    async function testLogin() {
      try {
        await axios.post(
          "http://localhost:8484/api/storeLogin",
          {
            storeId: "yyy",
            password: "1234",
          },
          { withCredentials: true }
        );
        console.log("⭐ 테스트 로그인 성공");
      } catch (err) {
        console.error("테스트 로그인 실패", err);
      }
    }

    testLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8484/api/review/add",
        {
          rsvNo: Number(rsvNo),
          storeId,
          rating: Number(rating),
          content,
        },
        { withCredentials: true }
      );

      alert("리뷰 등록 완료!");
      setRating(0);
      setContent("");
      setOpen(false);

    } catch (err) {
      console.error("리뷰 등록 실패:", err);

      if (err.response) {
        const msg = err.response.data?.message || err.response.data;

        // 🎯 서버 메시지 기반 분기 처리
        if (msg.includes("작성자가 아닙니다")) {
          alert("예약을 한 사용자만 리뷰를 작성할 수 있습니다.");
        } 
        else if (msg.includes("이용 완료된 예약만")) {
          alert("이용 완료 상태인 예약만 리뷰 작성이 가능합니다.");
        } 
        else if (msg.includes("이미 리뷰가 존재합니다")) {
          alert("이미 이 예약에 대한 리뷰가 작성되어 있습니다.");
        } 
        else {
          alert("리뷰 등록 중 알 수 없는 오류가 발생했습니다.");
        }

      } else {
        alert("서버 연결 오류: 리뷰 등록에 실패했습니다.");
      }
    }
  };

  return (
    <div className="review-container">
      {/* 작성 열기/닫기 */}
      <div className="review-toggle" onClick={() => setOpen(!open)}>
        <span>리뷰 작성하기</span>
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {/* 리뷰 입력 폼 */}
      <div className={`review-dropdown ${open ? "open" : ""}`}>
        <form onSubmit={handleSubmit} className="review-form">
          <label className="review-label">별점</label>
          <StarRating value={rating} onChange={setRating} />

          <label className="review-label">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="review-textarea"
          />

          <button type="submit" className="review-button">
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
