import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userdata: null,
  theme: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.status = true;
      state.userdata = action.payload;
    },
    logout(state) {
      state.status = false;
      state.userdata = null;
    },
    theme(state) {
      state.theme = !state.theme;
    },
  },
});
export const { login, logout, theme } = authSlice.actions;
export default authSlice.reducer;
