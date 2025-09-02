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
  },
});

export const { addExpense, allexpenses, expensebyfilter } =
  expenseSlice.actions;
export default expenseSlice.reducer;
