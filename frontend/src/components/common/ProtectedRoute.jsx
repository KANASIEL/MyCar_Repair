import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // 유저/업체 모두 ACCOUNT_ID로 저장하므로 이것만 체크하면 됨
  const isLoggedIn = sessionStorage.getItem("ACCOUNT_ID");

  if (!isLoggedIn) {
    alert("보안 정책에 의해 보호된 페이지입니다.\n로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
