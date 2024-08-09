import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct, SORT_TYPES } from "@products/types/products.types";
import { productService } from "@products/services/products.services";

export type ProductsSliceType = {
  products: IProduct[];
  singleProduct: IProduct | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsSliceType = {
  products: [],
  singleProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<IProduct[], { sort: SORT_TYPES }>(
  "products/fetchProducts",
  async ({ sort }) => {
    const response = await productService.getProducts({ query: { sort } });
    return response;
  }
);

export const fetchSingleProduct = createAsyncThunk<IProduct, string>(
  "products/fetchSingleProduct",
  async (id) => {
    const response = await productService.getProductById(id);
    return response;
  }
);

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.products = payload;
    },
    setSingleProduct: (state, { payload }: PayloadAction<IProduct | null>) => {
      state.singleProduct = payload;
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
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.loading = false;
          state.singleProduct = action.payload;
        }
      )
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the product";
      });
  },
});

export const { setProducts, setSingleProduct } = ProductsSlice.actions;

export default ProductsSlice.reducer;
