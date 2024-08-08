import { Navigate, Outlet } from "react-router-dom";
import appConfig from "@configs";
import { useAppSelector } from "@store/store-hooks";

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
  const token = useAppSelector((state) => state.authSlice.token);

  if (token) {
    return <Navigate to={authenticatedEntryPath} />;
  }

  return <Outlet />;
};

export default PublicRoute;
