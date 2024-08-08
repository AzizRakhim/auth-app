import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@products/types/products.types";
import { productService } from "@products/services/products.services";

export type ProductsSliceType = {
  products: IProduct[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsSliceType = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  IProduct[],
  { page: string; page_size: string }
>("products/fetchProducts", async ({ page, page_size }) => {
  const response = await productService.getProducts({
    query: { page, page_size, limit: 10 },
  });
  return response;
});

export const PaymentInstallmentSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setProducts } = PaymentInstallmentSlice.actions;

export default PaymentInstallmentSlice.reducer;