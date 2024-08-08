import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NotificationViewType } from "@types";

export type NotificationType = {
  notification: { type: NotificationViewType; title: string } | null;
};

const initialState: NotificationType = {
  notification: null,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, { payload }: PayloadAction<NotificationType>) => {
      state.notification = payload.notification;
    },
  },
});

export const { setNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
