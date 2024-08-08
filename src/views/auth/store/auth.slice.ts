import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  token: string | null;
} = {
  token: null,
};

export const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
    },
  },
});

export const { setToken } = authSlice.actions;
const persistConfig = {
  key: "auth",
  storage,
};

const persistedRootReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedRootReducer;
