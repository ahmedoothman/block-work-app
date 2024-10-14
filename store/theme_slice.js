import { createSlice } from "@reduxjs/toolkit";
const initialState = { mode: "dark" };

const themeSilce = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    changeMode(state, action) {
      state.mode = state.mode == "dark" ? "light" : "dark";
    },
  },
});

export const { changeMode } = themeSilce.actions;
export const themeReducer = themeSilce.reducer;
