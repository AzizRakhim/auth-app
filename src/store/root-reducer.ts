import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@auth/store";
import notificationSlice from "@store/slices/notification.slice";

const rootReducer = combineReducers({
  authSlice,
  notificationSlice,
});

export default rootReducer;
