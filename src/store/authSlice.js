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
      // Save to localStorage using same key as AnimatedThemeToggler
      if (typeof window !== "undefined") {
        localStorage.setItem("prefers-theme", state.theme ? "dark" : "light");
      }
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});
export const { login, logout, theme, setTheme } = authSlice.actions;
export default authSlice.reducer;
