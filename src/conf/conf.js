const conf={
    appwriteUrl:String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    projectId:String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    databaseId:String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    expensesTableId:String(process.env.NEXT_PUBLIC_APPWRITE_EXPENSES_TABLE_ID),
    budgetsTableId:String(process.env.NEXT_PUBLIC_APPWRITE_BUDGETS_TABLE_ID)
}

export default conf