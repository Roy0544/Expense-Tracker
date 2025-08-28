// pages/dashboard.js or app/dashboard/page.js
import { ExpenseDoughnutChart } from "./ExpensePieChart";

export default function Dashboardpie() {
  // Sample data - replace with your actual data from Appwrite
  const expenseData = [
    { category: "Food", amount: 450 },
    { category: "Transport", amount: 180 },
    { category: "Entertainment", amount: 250 },
    { category: "Bills", amount: 280 },
    { category: "Shopping", amount: 120 },
    { category: "Health", amount: 80 },
  ];

  return (
    <div className="p-2 space-y-4    ">
      <h1 className="text-3xl font-heading">Expense Analytics</h1>

      <div className=" ">
        {/* Regular Pie Chart */}
        {/* <div className="bg-card dark:bg-card p-6 rounded-lg shadow-lg">
          <ExpensePieChart expenseData={expenseData} />
        </div> */}

        {/* Doughnut Chart with Center Total */}
        <div className="bg-card dark:bg-card p-6 rounded-lg shadow-lg">
          <ExpenseDoughnutChart expenseData={expenseData} />
        </div>
      </div>

      {/* Expense Summary Cards */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {expenseData.map((item, index) => {
          const total = expenseData.reduce(
            (sum, expense) => sum + expense.amount,
            0
          );
          const percentage = ((item.amount / total) * 100).toFixed(1);

          return (
            <div key={index} className="bg-card p-4 rounded-lg text-center">
              <h3 className="font-accent text-sm text-muted-foreground">
                {item.category}
              </h3>
              <p className="font-heading text-2xl">${item.amount}</p>
              <p className="text-xs text-muted-foreground">{percentage}%</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
