import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => state.userSlice.user_IsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRouter;