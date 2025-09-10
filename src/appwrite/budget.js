import conf from "@/conf/conf";
import { Client, ID, TablesDB, Query } from "appwrite";

export class BudgetService {
  client = new Client();
  tabledb;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.projectId);
    this.tabledb = new TablesDB(this.client); // Your project ID
  }
  async createBudget({ CategoryName, Amount, BudgetName, userId }) {
    try {
      return await this.tabledb.createRow(
        conf.databaseId,
        conf.budgetsTableId,
        ID.unique(),
        {
          CategoryName,
          Amount,
          BudgetName,
          userId,
        }
      );
    } catch (error) {
      console.log("Budget Creation Failed", error);
      throw error;
    }
  }
  async listbudgets(userId) {
    try {
      return await this.tabledb.listRows(conf.databaseId, conf.budgetsTableId, [
        Query.equal("userId", userId),
      ]);
    } catch (error) {
      console.log("Failed to list budgets", error);
      throw error;
    }
  }
  async updateBudget(budgetId, { CategoryName, Amount, BudgetName, userId }) {
    try {
      return await this.tabledb.updateRow(
        conf.databaseId,
        conf.budgetsTableId,
        budgetId, // The row ID to update
        {
          CategoryName,
          Amount,
          BudgetName,
          userId,
        }
      );
    } catch (error) {
      console.log("Budget Update Failed", error);
      throw error;
    }
  }
  async deleteBudget(budgetId) {
    try {
      return await this.tabledb.deleteRow(
        conf.databaseId,
        conf.budgetsTableId,
        budgetId // The row ID to delete
      );
    } catch (error) {
      console.log("Budget Deletion Failed", error);
      throw error;
    }
  }
}
const budgetservice = new BudgetService();
export default budgetservice;
