import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  expenses: [],
  filterExpenses: [],
};
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    allexpenses(state, action) {
      state.expenses = action.payload;
    },
    expensebyfilter(state, action) {
      state.filterExpenses = action.payload;
    },
    resetexpenses: () => initialState,
  },
});

export const { addExpense, allexpenses, expensebyfilter, resetexpenses } =
  expenseSlice.actions;
export default expenseSlice.reducer;
