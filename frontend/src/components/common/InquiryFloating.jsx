import React from "react";
import { Link } from "react-router-dom";
import "./InquiryFloating.css";

export default function InquiryFloating() {
    const role = sessionStorage.getItem("ROLE") || "";

    return (
        <div className="floating-wrapper">
            <div className="floating-menu">
                {(role === "USER" || role === "STORE") && (
                    <>
                        <Link to="/inquiry/write">문의 작성하기</Link>
                        <Link to="/inquiry/history">내 문의 내역</Link>
                    </>
                )}
                {role === "ADMIN" && (
                    <Link to="/inquiry/manage">문의 관리</Link>
                )}
            </div>
        </div>
    );
}