/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AutoSearch from "../../pages/AutoSearch/autoSearch.jsx";
import "./mainpage.css";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [role, setRole] = useState(sessionStorage.getItem("ROLE") || "");

    useEffect(() => {
        setRole(sessionStorage.getItem("ROLE") || "");
    }, [location]);

    // ⭐️ 역할에 따른 예약 조회/관리 경로를 결정하는 함수
    const getReservationHistoryPath = () => {
        switch (role) {
            case "USER":
                return "/mypage/user/reservations"; // 사용자 예약 목록/조회
            case "STORE":
                return "/mypage/store/reservations"; // 업체 예약 관리
            case "ADMIN":
                return "/admin/reservation/manage"; // 관리자 예약 관리
            default:
                return "/login"; // 비로그인 시 로그인 페이지
        }
    };

    // [로그아웃 처리]
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:8484/api/logout", { withCredentials: true });
            if (res.data.success) {
                sessionStorage.clear();
                setRole("");
                alert("로그아웃 되었습니다.");
                window.location.href = "/";
            }
        } catch (err) {
            console.error("로그아웃 오류:", err);
        }
    };

    // [관리자 모드 해제 처리]
    const handleExitAdmin = async (e) => {
        e.preventDefault();
        if (!window.confirm("관리자 모드를 해제하시겠습니까?")) return;

        try {
            const res = await axios.get("http://localhost:8484/api/admin/exit", { withCredentials: true });
            if (res.data.success) {
                alert("관리자 모드가 해제되었습니다.");
                sessionStorage.setItem("ROLE", "USER");
                setRole("USER");
                window.location.href = "/";
            } else {
                alert(res.data.message || "해제 실패");
            }
        } catch (err) {
            console.error("관리자 해제 오류:", err);
            sessionStorage.setItem("ROLE", "USER");
            setRole("USER");
            window.location.href = "/";
        }
    };

    return (
        <>
            {/* 플로팅 아이콘 및 Header 기본 구조 생략 */}
            <div className="floating-icons">{/* ... */}</div>

            <header>
                <div className="inner">

                    {/* 로고 및 검색창 생략 */}
                    <h1><Link to="/">MY CAR 정비소</Link></h1>
                    <div><AutoSearch placeholder="검색어 입력하세요" /></div>
                    
                    <ul id="gnb">
                        <li><Link to="/guide">꿀팁 가이드</Link></li>
                        <li><Link to="/recommend">주변 정비소</Link></li>
                        
                        {/* ⭐️ 예약 메뉴 조건부 렌더링 시작 */}
                        {role === "USER" || !role ? (
                            // 1. 일반 유저 (USER) 또는 비로그인 상태일 때: 서브 메뉴 드롭다운 표시
                            <li className="dropdown-parent">
                                <Link to="#">예약</Link>
                                <ul className="submenu">
                                    <li>
                                        {/* 예약 신청: 로그인 시 /Reservation, 비로그인 시 /login */}
                                        <Link to={role ? "/Reservation" : "/login"}>신청</Link>
                                    </li>
                                    <li>
                                        {/* 예약 조회: 로그인 시 마이페이지, 비로그인 시 /login */}
                                        <Link to={role ? "/reservation/history" : "/login"}>조회</Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            // 2. 업체 (STORE) 또는 관리자 (ADMIN)일 때: 바로 예약 조회/관리 페이지로 이동
                            <li>
                                <Link to={getReservationHistoryPath()}>예약 관리</Link> 
                            </li>
                        )}
                        {/* ⭐️ 예약 메뉴 조건부 렌더링 끝 */}
                        
                        <li className="dropdown-parent">
                            <Link to="#">고객센터</Link>
                            <ul className="submenu">
                                <li>
                                    {/* ... 고객센터 서브메뉴 로직 유지 ... */}
                                    {role === "USER" || role === "STORE" ? (
                                        <Link to="/inquiry/history">1:1 문의</Link>
                                    ) : role === "ADMIN" ? (
                                        <Link to="/inquiry/manage">문의 관리</Link>
                                    ) : (
                                        <Link to="/login">1:1 문의</Link>
                                    )}
                                </li>
                                <li><Link to="/notice/list">공지사항</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="util">
                        {/* ... 유틸 메뉴 로직 유지 (USER, STORE, ADMIN, 비로그인) ... */}
                        {role === "USER" && (
                            <>
                                <li><Link to="/mypage/user">마이페이지</Link></li>
                                <li><a href="#" onClick={handleLogout}>로그아웃</a></li>
                                <li className="admin-enter"><Link to="/admin/promote">관리자 전환</Link></li>
                            </>
                        )}
                        {role === "STORE" && (
                            <>
                                <li><Link to="/mypage/store">업체 마이페이지</Link></li>
                                <li><a href="#" onClick={handleLogout}>로그아웃</a></li>
                            </>
                        )}
                        {role === "ADMIN" && (
                            <>
                                <li><Link to="/mypage/admin">관리자 페이지</Link></li>
                                <li><a href="#" onClick={handleLogout}>로그아웃</a></li>
                                <li className="admin-enter">
                                    <a href="#" onClick={handleExitAdmin} style={{color:'#dc3545', fontWeight:'bold'}}>
                                        관리자 해제
                                    </a>
                                </li>
                            </>
                        )}
                        {!role && (
                            <>
                                <li><Link to="/login">로그인</Link></li>
                                <li><Link to="/register">회원가입</Link></li>
                            </>
                        )}
                    </ul>

                </div>
            </header>
        </>
    );
};

export default Header;