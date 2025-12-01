import React, { useEffect } from 'react';
// Header와 Footer는 App.jsx에서 관리하거나 필요시 주석 해제하여 사용하세요.
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer'; 
import '../../components/common/mainpage.css'; 

// 이미지 Import (Vite/React 방식)
import main1 from '../../assets/images/main1.png'; 
import main2 from '../../assets/images/main2.png';
import main3 from '../../assets/images/main3.png';
import icon1 from '../../assets/images/1.png';
import icon2 from '../../assets/images/2.png';
import icon3 from '../../assets/images/3.png';

// Swiper 관련 컴포넌트 및 CSS import
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // 기본 CSS (필수)
import 'swiper/css/pagination'; // 페이지네이션 점 스타일 (옵션)
// import 'swiper/css/navigation'; // 네비게이션 화살표 스타일 (옵션)

// 필요한 모듈 import (자동 재생, 페이지네이션)
import { Autoplay, Pagination } from 'swiper/modules'; 

const MainPage = () => {

    return (
        <>
            
            <figure>
                <div className="pic">
                {/* ⭐️ Swiper 컴포넌트: bxSlider 대체 */}
                <Swiper
                    // Autoplay와 Pagination 모듈 등록
                    modules={[Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    // bxSlider의 auto: true, pause: 2000 대응
                    autoplay={{ delay: 2000, disableOnInteraction: false }} 
                    pagination={{ clickable: true }} // 페이지네이션 점 활성화
                    loop={true} // 무한 루프 활성화
                >
                    <SwiperSlide>
                        {/* <li> 태그가 SwiperSlide로 대체됩니다. */}
                        <img src={main1} alt="최고의 전문가가 당신의 차를 기다립니다." />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={main2} alt="작은 문제부터 완벽한 솔루션을 경험하세요." />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={main3} alt="My Car 정비소 슬라이드 이미지" />
                    </SwiperSlide>
                </Swiper>
            </div>
            
            {/* 메인 텍스트 영역 (슬라이더 위에 CSS로 띄워야 합니다) */}
            <div className="main-text">
                <h1>최고의 전문가가 당신의 차를 기다립니다</h1>
                <p>
                    작은 문제부터 복잡한 수리까지, 완벽한 솔루션을 경험하세요.
                </p>
            </div>
            </figure>

            <section className="features">
                <div className="inner">
                    <h1>MY CAR 정비소</h1>
                    <div className="wrap">
                        <article>
                            <img src={icon1} alt="내 차를 믿고 맡길 수 있는 곳! 아이콘" /> 
                            <h2>내 차를 믿고 맡길 수 있는 곳!</h2>
                            <p>표준 공임, 투명한 견적, 정직한 정비로 보답합니다.</p>
                        </article>
                        <article>
                            <img src={icon2} alt="바가지 요금 없는 투명한 정비 아이콘" />
                            <h2>더 이상 '바가지요금'은 없습니다.</h2>
                            <p>MY CAR 정비소는 검증된 업체와 투명한 정비 문화를 만들어갑니다.</p>
                        </article>
                        <article>
                            <img src={icon3} alt="차는 기술로 마음은 신뢰로 아이콘" />
                            <h2>차는 기술로 고치고, 마음은 신뢰로 고칩니다.</h2>
                            <p>언제나 안심하고 방문할 수 있는 여러분의 주치의가 되겠습니다.</p>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MainPage;