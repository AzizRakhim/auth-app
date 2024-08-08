import { Navigate, Outlet } from "react-router-dom";
import appConfig from "@configs";
import { useAppSelector } from "@store/store-hooks";

const { unAuthenticatedEntryPath } = appConfig;

const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.authSlice.token);

  if (!token) {
    return <Navigate to={unAuthenticatedEntryPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
