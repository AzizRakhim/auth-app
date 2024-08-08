import { notification as notify } from "antd";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";
import { setNotification } from "@store/slices/notification.slice";
import { useEffect } from "react";

const ErrorNotification = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(
    (state) => state.notificationSlice.notification
  );
  const [api, contextHolder] = notify.useNotification({
    stack: { threshold: 3 },
  });

  useEffect(() => {
    if (notification) {
      api[notification.type || "success"]({
        message: notification.title,
        duration: 0,
        onClose: () => dispatch(setNotification({ notification: null })),
      });
    }
  }, [notification, api, dispatch]);
  return <>{contextHolder}</>;
};

export default ErrorNotification;
