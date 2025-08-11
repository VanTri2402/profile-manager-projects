import { createSlice } from "@reduxjs/toolkit";

const dataCNALSlice = createSlice({
  name: "dataCNAL",
  initialState: {
    data: {
      checkStreakDay: 0,
    },
    isFetching: false,
    error: false,
    msg: "",
  },
  reducers: {
    updateStreakStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateStreakSuccess: (state, action) => {
      state.isFetching = false;
      state.data.checkStreakDay = action.payload;
      state.error = false;
    },
    updateStreakFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.msg = action.payload;
    },
  },
});
export const { updateStreakFailed, updateStreakStart, updateStreakSuccess } =
  dataCNALSlice.actions;
export default dataCNALSlice.reducer;
