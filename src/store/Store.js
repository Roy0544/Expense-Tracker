import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authSlice";
import budgetreducer from "./budgetSlice";
import expensereducer from "./expenseSlice";
const Store = configureStore({
  reducer: {
    auth: authreducer,
    budget: budgetreducer,
    expense: expensereducer,
  },
});
export default Store;
