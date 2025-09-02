import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  budgets: [],
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
  },
});
export const { addBudget, allbudgets } = budgetSlice.actions;
export default budgetSlice.reducer;
