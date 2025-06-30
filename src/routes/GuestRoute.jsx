import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/useAuthStore";
import WebSkeleton from "../components/auth/WebSkeleton";

const GuestRoute = () => {
  const { user, authChecked } = useAuthStore();

  if (!authChecked) {
    return <WebSkeleton />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
