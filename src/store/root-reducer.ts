import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@auth/store/auth.slice";
import usersSlice from "@users/store/users.slice";
import productsSlice from "@products/store/products.slice";
import categoriesSlice from "@categories/store/categories.slice";

const rootReducer = combineReducers({
  authSlice,
  usersSlice,
  productsSlice,
  categoriesSlice,
});

export default rootReducer;
