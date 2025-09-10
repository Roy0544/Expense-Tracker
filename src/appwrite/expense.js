import conf from "@/conf/conf";
import { Client, ID, Query, TablesDB } from "appwrite";

export class ExpenseService {
  client = new Client();
  tabledb;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.projectId);
    this.tabledb = new TablesDB(this.client); // Your project ID
  }
  async createExpense({ expenseAmount, expenseName, budgetId, userId }) {
    try {
      console.log("trying user id eith ", userId);

      return await this.tabledb.createRow(
        conf.databaseId,
        conf.expensesTableId,
        ID.unique(),
        {
          expenseAmount,
          expenseName,
          budgets: budgetId,
          userId,
        }
      );
    } catch (error) {
      console.log("Expense Creation Failed", error);
      throw error;
    }
  }
  async listexpenses(userId) {
    try {
      return await this.tabledb.listRows(
        conf.databaseId,
        conf.expensesTableId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Failed to list expenses", error);
      throw error;
    }
  }
  // Update your ExpenseService
  async listexpensesbybudget(budgetId, userId) {
    try {
      return await this.tabledb.listRows(
        conf.databaseId,
        conf.expensesTableId,
        [Query.equal("budgets", budgetId), Query.equal("userId", userId)] // Query by budget ID, not name
      );
    } catch (error) {
      console.log("Failed to list expenses by budget ID", error);
      throw error;
    }
  }
  async deleteExpense(expenseId) {
    try {
      return await this.tabledb.deleteRow(
        conf.databaseId,
        conf.expensesTableId,
        expenseId
      );
    } catch (error) {
      console.log("Failed to delete expense", error);
      throw error;
    }
  }
}
const expneseservice = new ExpenseService();
export default expneseservice;
