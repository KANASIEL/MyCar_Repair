import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./review";
import ReviewList from "./reviewList";

export default function ReviewPage() {
  const { storeId, rsvNo } = useParams(); // URL에서 값 받기

  return (
    <div style={{ padding: "20px" }}>

      {/* 리뷰 작성 */}
      <ReviewForm storeId={storeId} rsvNo={rsvNo} />


      {/* 리뷰 리스트 */}
      <ReviewList storeId={storeId} />
    </div>
  );
}
