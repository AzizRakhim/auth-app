import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@auth/store/auth.slice";
import productsSlice from "@products/store/products.slice";
import categoriesSlice from "@categories/store/categories.slice";

const rootReducer = combineReducers({
  authSlice,
  productsSlice,
  categoriesSlice,
});

export default rootReducer;
