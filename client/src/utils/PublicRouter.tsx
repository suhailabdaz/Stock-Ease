import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Navigate, Outlet } from "react-router-dom";


const PublicRouter =()=>{
  const isAuthenticated = useSelector((state: RootState) => state.userSlice.user_IsAuthenticated);
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
}

export default PublicRouter



