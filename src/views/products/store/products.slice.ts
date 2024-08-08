import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@products/types";

export type ProductsSliceType = {
  products: IProduct[];
};

const initialState: ProductsSliceType = {
  products: [],
};

export const PaymentInstallmentSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const { addCheck, _resetState, deleteCheck } =
  PaymentInstallmentSlice.actions;

export default PaymentInstallmentSlice.reducer;
