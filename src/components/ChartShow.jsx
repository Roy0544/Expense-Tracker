// pages/dashboard.js or app/dashboard/page.js
import { BudgetExpenseChart } from "@/components/Chart";

export default function Dashboard() {
  // Sample data - replace with your actual data from Appwrite
  const budgetData = [
    { category: "Food", budget: 1500, spent: 450 },
    { category: "Transport", budget: 1000, spent: 650 },
    { category: "Entertainment", budget: 1000, spent: 450 }, // Over budget
    { category: "Bills", budget: 4000, spent: 2500 },
    { category: "Shopping", budget: 6000, spent: 5100 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-heading">Budgets Overview</h1>

      <div className="bg-card dark:bg-card p-6 rounded-lg shadow-lg">
        <BudgetExpenseChart budgetData={budgetData} />
      </div>

      {/* Budget Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {budgetData.map((item, index) => {
          const percentage = ((item.spent / item.budget) * 100).toFixed(1);
          const isOverBudget = item.spent > item.budget;

          return (
            <div key={index} className="bg-card p-4 rounded-lg mt-11">
              <h3 className="font-accent text-lg">{item.category}</h3>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>Spent: ${item.spent}</span>
                  <span>Budget: ${item.budget}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      isOverBudget ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <p
                  className={`text-sm mt-1 ${
                    isOverBudget ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {percentage}% used {isOverBudget && "(Over Budget!)"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
