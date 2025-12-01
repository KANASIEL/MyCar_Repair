// src/common/Footer.jsx
import React from "react";
import "./mainpage.css";   // 기존 mainpage.css에 푸터 스타일 있음!

const Footer = () => {
    return (
        <footer>
            <div className="inner">
                {/* 왼쪽 로고 */}
                <div className="footer-logo">
                    <a href="/frontend/public">
                        MY CAR 정비소
                    </a>
                </div>

                {/* 오른쪽 정보 */}
                <div className="footer-info">
                    <p>주소: 부산광역시 OO구 OO로 123번길 45 | 대표: 김정비 | 사업자등록번호: 123-45-67890</p>
                    <p>TEL: 051-123-4567 | E-MAIL: kim123@mycar.com</p>
                    <p className="copyright">
                        &copy; 2025 MY CAR REPAIR
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;