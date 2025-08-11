import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: [],
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
      state.users.error = true;
    },
    updateUserStart: (state) => {
      state.users.isFetching = true;
    },
    updateUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
    },
    updateUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
    updateAdminStart: (state) => {
      state.users.isFetching = true;
    },
    updateAdminSuccess: (state, action) => {
      state.users.isFetching = false;
      state.msg = action.payload;
    },
    updateAdminFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
  },
});
export const {
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  updateUserStart,
  updateUserFailed,
  updateUserSuccess,
  updateAdminFailed,
  updateAdminStart,
  updateAdminSuccess,
} = userSlice.actions;
export default userSlice.reducer;
