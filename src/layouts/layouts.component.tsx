import { message } from "antd";
import { lazy, Suspense, useMemo } from "react";
import { useAppSelector } from "@store/store-hooks";
import PageLoading from "@components/page-loading/page-loading.component";
import ErrorNotification from "@components/notification/notification.component";
import Views from "@views";

const Layouts = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, contextHolder] = message.useMessage();
  const token = useAppSelector((state) => state.authSlice?.token);

  const AppLayout = useMemo(
    () =>
      token
        ? lazy(() => import("@layouts/main-layout/main-layout.component"))
        : lazy(() => import("@layouts/auth-layout/auth-layout.component")),
    [token]
  );

  return (
    <Suspense fallback={<PageLoading />}>
      <ErrorNotification />
      <AppLayout>
        {contextHolder}
        <Views />
      </AppLayout>
    </Suspense>
  );
};

export default Layouts;
