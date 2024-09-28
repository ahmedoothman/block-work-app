import { createSlice } from '@reduxjs/toolkit';
const initialState = { authLoading: false, };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handelLoading(state, action) {
      state.authLoading = action.payload;
    },
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
