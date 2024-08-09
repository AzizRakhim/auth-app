import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@auth/store/auth.slice";
import productsSlice from "@products/store/products.slice";

const rootReducer = combineReducers({
  authSlice,
  productsSlice,
});

export default rootReducer;
