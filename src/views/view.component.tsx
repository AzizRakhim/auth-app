import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "@components/routes/public-route";
import ProtectedRoute from "@components/routes/protected-route";
import appConfig from "@configs";
import routesConfig from "@configs/routes.config";

const { privateRoutes, publicRoutes } = routesConfig;
const { authenticatedEntryPath, unAuthenticatedEntryPath } = appConfig;

const Views = () => {
  return (
    <Routes>
      {/* Private Routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {privateRoutes.map(({ path, component: Component }, index) => (
          <Route path={path} element={<Component />} key={index} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<PublicRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={unAuthenticatedEntryPath} />}
        />
        {publicRoutes.map(({ path, component: Component }, index) => (
          <Route path={path} element={<Component />} key={index} />
        ))}
      </Route>
    </Routes>
  );
};

export default Views;
