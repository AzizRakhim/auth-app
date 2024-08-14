import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORT_TYPES } from "@types";
import { IUser } from "@users/types";
import { userService } from "@users/services/user.services";

export type UsersSliceType = {
  users: IUser[];
  loading: boolean;
};

const initialState: UsersSliceType = {
  users: [],
  loading: false,
};

export const fetchUsers = createAsyncThunk<IUser[], { sort: SORT_TYPES }>(
  "users/fetchUsers",
  async ({ sort }) => {
    const response = await userService.getUsers({ query: { sort } });

    return response;
  }
);

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUsers } = UsersSlice.actions;

export default UsersSlice.reducer;
