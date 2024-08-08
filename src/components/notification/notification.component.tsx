import { useEffect } from "react";
import { notification as notify } from "antd";
import { NotificationViewType } from "@types";
import { setNotification } from "@store/slices/notification.slice";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const Notification = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(
    (state) => state.notificationSlice.notification
  );
  const [api, contextHolder] = notify.useNotification({
    stack: { threshold: 3 },
  });

  useEffect(() => {
    if (notification) {
      api[notification.type as NotificationViewType]({
        message: notification.title,
        duration: 0,
        onClose: () => dispatch(setNotification({ notification: null })),
      });
    }
  }, [notification, api, dispatch]);
  return contextHolder;
};

export default Notification;
