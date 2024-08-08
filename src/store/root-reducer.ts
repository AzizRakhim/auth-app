import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@auth/store/auth.slice";
import productsSlice from "@products/store/products.slice";
import notificationSlice from "@store/slices/notification.slice";

const rootReducer = combineReducers({
  authSlice,
  notificationSlice,
  productsSlice,
});

export default rootReducer;
