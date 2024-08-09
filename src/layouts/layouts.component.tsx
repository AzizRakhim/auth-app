import { lazy, Suspense, useMemo } from "react";
import { useAppSelector } from "@store/store-hooks";
import Views from "@views";
import PageLoading from "@components/page-loading/page-loading.component";

const Layouts = () => {
  const token = useAppSelector((state) => state.authSlice.token);

  const AppLayout = useMemo(
    () =>
      token
        ? lazy(() => import("@layouts/main-layout/main-layout.component"))
        : lazy(() => import("@layouts/auth-layout/auth-layout.component")),
    [token]
  );

  return (
    <Suspense fallback={<PageLoading />}>
      <AppLayout>
        <Views />
      </AppLayout>
    </Suspense>
  );
};

export default Layouts;
