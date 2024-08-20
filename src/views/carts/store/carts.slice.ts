import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORT_TYPES } from "@types";
import { ICart } from "@carts/types";
import { cartService } from "@carts/services/cart.services";

export type CartsSliceType = {
  carts: ICart[];
  loading: boolean;
  singleCart: ICart | null;
};

const initialState: CartsSliceType = {
  carts: [],
  loading: false,
  singleCart: null,
};

export const fetchCarts = createAsyncThunk<
  ICart[],
  { sort: SORT_TYPES; startdate?: string; enddate?: string }
>(
  "carts/fetchCarts",
  async ({ sort = SORT_TYPES.ASC, startdate = "", enddate = "" }) => {
    const response = await cartService.getCarts({
      query: { sort, startdate, enddate },
    });

    return response;
  }
);

export const fetchSingleCart = createAsyncThunk<ICart, string>(
  "carts/fetchSingleCart",
  async (id) => {
    const response = await cartService.getCartById(id);

    return response;
  }
);

export const CartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, { payload }: PayloadAction<ICart[]>) => {
      state.carts = payload;
    },
    setSingleCart: (state, { payload }: PayloadAction<ICart | null>) => {
      state.singleCart = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCarts.fulfilled,
        (state, action: PayloadAction<ICart[]>) => {
          state.loading = false;
          state.carts = action.payload;
        }
      )
      .addCase(fetchCarts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchSingleCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSingleCart.fulfilled,
        (state, action: PayloadAction<ICart>) => {
          state.loading = false;
          state.singleCart = action.payload;
        }
      )
      .addCase(fetchSingleCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCarts, setSingleCart } = CartsSlice.actions;

export default CartsSlice.reducer;
