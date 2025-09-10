import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  budgets: [],
  category: "",
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addBudget(state, action) {
      state.budgets = state.budgets.push(action.payload);
    },
    allbudgets(state, action) {
      state.budgets = action.payload;
    },
    getbudgetcategory(state, action) {
      if (action.payload === "All") {
        state.category = "";
      } else {
        state.category = action.payload; // ✅ Only run when not "All"
      }
    },
    resetBudgets: () => initialState,
  },
});
export const { addBudget, allbudgets, getbudgetcategory, resetBudgets } =
  budgetSlice.actions;
export default budgetSlice.reducer;
