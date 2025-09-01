import conf from "@/conf/conf";
import { Client, ID, TablesDB } from "appwrite";

export class BudgetService {
  client = new Client();
  tabledb;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.projectId); 
      this.tabledb=new TablesDB(this.client)// Your project ID       
  }
  async createBudget({CategoryName,Amount,BudgetName}){
    try {
        return await this.tabledb.createRow(
            conf.databaseId,
            conf.budgetsTableId,
            ID.unique(),
            {
                CategoryName,
                Amount,
                BudgetName,   
                
            }
        )
        
    } catch (error) {
        console.log("Budget Creation Failed",error);
        throw error
        
    }
}
    async listbudgets() {
        try {
            return await this.tabledb.listRows(
                conf.databaseId,
                conf.budgetsTableId
            );
          
            
        } catch (error) {
            console.log("Failed to list budgets", error);
            throw error;
        }
    }

}
 const budgetservice= new BudgetService();
 export default budgetservice;
