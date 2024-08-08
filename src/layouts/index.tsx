import { message } from "antd";
import { lazy, Suspense, useMemo } from "react";
import Views from "@views";
import PageLoading from "@components/page-loading";
import { useAppSelector } from "@store/store-hooks";
import ErrorNotification from "@components/notification";

const Layouts = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, contextHolder] = message.useMessage();
  const token = useAppSelector((state) => state.authSlice.token);

  const AppLayout = useMemo(
    () =>
      token
        ? lazy(() => import("@layouts/main-layout"))
        : lazy(() => import("@layouts/auth-layout")),
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
