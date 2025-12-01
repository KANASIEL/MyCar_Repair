import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./axiosGlobal";

// 공통
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ChatWidget from "./components/common/ChatWidget";
import ProtectedRoute from "./components/common/ProtectedRoute";

// 메인/지도
import MainPage from "./pages/main/mainpage";
import RecommendMap from "./pages/Map/RecommendMap";

// 공지사항
import NoticeList from "./pages/Notice/notice_list";
import NoticeView from "./pages/Notice/notice_view";
import NoticeWrite from "./pages/Notice/notice_write";
import NoticeModify from "./pages/Notice/notice_modify";

// FAQ
import FaqList from "./pages/faq/faq_list";
import FaqView from "./pages/faq/faq_view";
import FaqWrite from "./pages/faq/faq_write";
import FaqModify from "./pages/faq/faq_modify";

// 문의
import InquiryWrite from "./pages/inquiry/inquiry_write";
import InquiryHistory from "./pages/inquiry/Inquiry_history";
import InquiryView from "./pages/inquiry/inquiry_view";
import InquiryManage from "./pages/inquiry/inquiry_manage";
import ReplyWrite from "./pages/Inquiry/reply_write";

// 로그인/회원가입
import Login from "./pages/Login/login";
import StoreLogin from "./pages/Login/storeLogin";
import Register from "./pages/Register/Register";
import RegisterStore from "./pages/Register/RegisterStore";

// 계정찾기
import FindAccount from "./pages/FindAccount/findAccount";
import FindPW from "./pages/FindAccount/findPW";
import FindOK from "./pages/FindAccount/findOK";

// 마이페이지
import UserMypage from "./pages/Mypage/UserMypage";
import UserEdit from "./pages/Mypage/UserEdit";
import StoreMypage from "./pages/Mypage/StoreMypage";
import StoreEdit from "./pages/Mypage/StoreEdit";
import AdminMypage from "./pages/Mypage/AdminMypage";

import Maintenance from "./pages/Maintenance/Maintenance";

// 관리자
import AdminPromote from "./pages/promote_admin/AdminPromote";

// 검색
import AutoSearch from "./pages/AutoSearch/autoSearch";

// 예약/정비
import Reservation from "./pages/Reservation/Reservation";
import ReservationHistory from "./pages/Reservation/ReservationHistory";
import ReservationDetail from "./pages/Reservation/ReservationDetail";
import ReservationModify from "./pages/Reservation/ReservationModify";

// 리뷰
import ReviewPage from "./pages/Review/reviewPage";
import Review from "./pages/Review/review";
import StarRating from "./pages/Review/starRating";
import ReviewList from "./pages/Review/reviewList";

// 가이드
import Guide from "./pages/Gaide/Gaide";
import Guide1 from "./pages/Gaide/Gaide-1";
import Guide2 from "./pages/Gaide/Gaide-2";
import Guide3 from "./pages/Gaide/Gaide-3";
import Guide4 from "./pages/Gaide/Gaide-4";

//16. [업체 예약 관리 페이지]
import StoreReservation from './pages/Reservation/StoreReservation';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        <Header />

        <main className="flex-grow">
          <Routes>

            {/* 🔓 공개 페이지 */}
            <Route path="/" element={<MainPage />} />
            <Route path="/recommend" element={<RecommendMap />} />

            {/* 공지사항 */}
            <Route path="/notice/list" element={<NoticeList />} />
            <Route path="/notice/view/:notice_no" element={<NoticeView />} />

            {/* FAQ */}
            <Route path="/faq" element={<FaqList />} />
            <Route path="/faq/view/:faqNo" element={<FaqView />} />

            {/* 리뷰 */}
			<Route path="/review/:storeId/:rsvNo" element={<ReviewPage />} />
            <Route path="/review/:storeId/:rsvNo" element={<Review />} />
            <Route path="/starRating" element={<StarRating />} />
            <Route path="/reviewList/:storeId" element={<ReviewList />} />

            {/* 로그인/회원가입 */}
            <Route path="/login" element={<Login />} />
            <Route path="/storeLogin" element={<StoreLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerstore" element={<RegisterStore />} />

            {/* 계정찾기 */}
            <Route path="/findAccount" element={<FindAccount />} />
            <Route path="/findPW" element={<FindPW />} />
            <Route path="/findOK" element={<FindOK />} />

            {/* 가이드 */}
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide-1" element={<Guide1 />} />
            <Route path="/guide-2" element={<Guide2 />} />
            <Route path="/guide-3" element={<Guide3 />} />
            <Route path="/guide-4" element={<Guide4 />} />

            {/* 검색 */}
            <Route path="/autoSearch" element={<AutoSearch />} />


            {/* 🔐 보호된 페이지 */}
            <Route element={<ProtectedRoute />}>

              {/* 공지사항 관리 */}
              <Route path="/notice/write" element={<NoticeWrite />} />
              <Route path="/notice/modify/:notice_no" element={<NoticeModify />} />

              {/* FAQ 관리 */}
              <Route path="/faq/write" element={<FaqWrite />} />
              <Route path="/faq/modify/:faqNo" element={<FaqModify />} />

              {/* 문의 */}
              <Route path="/inquiry/write" element={<InquiryWrite />} />
              <Route path="/inquiry/history" element={<InquiryHistory />} />
              <Route path="/inquiry/view/:inquiry_no" element={<InquiryView />} />
              <Route path="/inquiry/manage" element={<InquiryManage />} />
              <Route path="/inquiry/reply_write/:inquiry_no" element={<ReplyWrite />} />

              {/* 마이페이지 */}
              <Route path="/mypage/user" element={<UserMypage />} />
              <Route path="/mypage/user/edit" element={<UserEdit />} />

              {/* 업체 */}
              <Route path="/mypage/store" element={<StoreMypage />} />
              <Route path="/mypage/store/edit" element={<StoreEdit />} />

              {/* 관리자 */}
              <Route path="/mypage/admin" element={<AdminMypage />} />
              <Route path="/admin/promote" element={<AdminPromote />} />

              {/* 예약 */}
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/reservation/history" element={<ReservationHistory />} />
              <Route path="/reservation/details/:rsvNo" element={<ReservationDetail />} />
              <Route path="/reservation/modify/:rsvNo" element={<ReservationModify />} />

              <Route path="/maintenance" element={<Maintenance />} />
              
              {/* 업체 예약 내역 관리 페이지 */}
              {/* 1. 지금 스크린샷 주소 (로그인 세션으로 들어갈 때) */}
              <Route path="/mypage/store/reservations" element={<StoreReservation />} />

              <Route path="/mypage/store/reservations/:storeId" element={<StoreReservation />} />
            </Route>

          </Routes>
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
