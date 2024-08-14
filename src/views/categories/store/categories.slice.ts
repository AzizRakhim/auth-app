import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@products/types/products.types";
import { categoriesService } from "@categories/services/category.services";

export type CategoriesSliceType = {
  categories: string[];
  loading: boolean;
  singleLoading: boolean;
  singleCategories: IProduct[];
};

const initialState: CategoriesSliceType = {
  categories: [],
  loading: false,
  singleCategories: [],
  singleLoading: false,
};

export const fetchCategories = createAsyncThunk<string[]>(
  "categories/fetchCategories",
  async () => {
    const response = await categoriesService.getCategories();
    return response;
  }
);

export const fetchSingleCategories = createAsyncThunk<
  IProduct[],
  { category: string }
>("categories/fetchSingleCategories", async ({ category }) => {
  const response = await categoriesService.getSingleCategory(category);

  return response;
});

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<string[]>) => {
      state.categories = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchSingleCategories.pending, (state) => {
        state.singleLoading = true;
      })
      .addCase(
        fetchSingleCategories.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.singleLoading = false;
          state.singleCategories = action.payload;
        }
      )
      .addCase(fetchSingleCategories.rejected, (state) => {
        state.singleLoading = false;
      });
  },
});

export const { setCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
