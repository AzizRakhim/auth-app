import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SORT_TYPES } from "@types";
import { IUser } from "@users/types";
import { userService } from "@users/services/user.services";

export type UsersSliceType = {
  users: IUser[];
  loading: boolean;
  singleUser: IUser | null;
};

const initialState: UsersSliceType = {
  users: [],
  loading: false,
  singleUser: null,
};

export const fetchUsers = createAsyncThunk<IUser[], { sort: SORT_TYPES }>(
  "users/fetchUsers",
  async ({ sort }) => {
    const response = await userService.getUsers({ query: { sort } });

    return response;
  }
);

export const fetchSingleUser = createAsyncThunk<IUser, string>(
  "users/fetchSingleUser",
  async (id) => {
    const response = await userService.getUserById(id);

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
    setSingleUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.singleUser = payload;
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
      })
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSingleUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false;
          state.singleUser = action.payload;
        }
      )
      .addCase(fetchSingleUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUsers, setSingleUser } = UsersSlice.actions;

export default UsersSlice.reducer;
