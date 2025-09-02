// pages/dashboard.js or app/dashboard/page.js
import { BudgetExpenseChart } from "@/components/Chart";
import { useSelector } from "react-redux";

export default function Dashboard({ budget, expense }) {
  // Sample data - replace with your actual data from Appwrite
  console.log("budget data in dashboard is :", budget);
  console.log("expnese data in dashboard is :", expense);
  const theme = useSelector((state) => state.auth.theme);
  console.log("theme here is ", theme);

  const budgetData = budget.map((bud) => {
    // Find expenses that match this budget category
    const matchingExpenses = expense.filter((exp) => exp.budgets === bud.$id);

    // Sum up all matching expenses
    const totalSpent = matchingExpenses.reduce(
      (sum, exp) => sum + exp.expenseAmount,
      0
    );

    return {
      category: bud.BudgetName,
      budget: bud.Amount,
      spent: totalSpent,
    };
  });

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 w-full border">
      <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-amber-600 text-white px-4 py-2 rounded-md w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Budget Analytics</h1>
            <p className="text-blue-100 text-lg">
              Track your financial progress
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-center">
              <p className="text-blue-100 text-sm">Total Categories</p>
              <p className="text-3xl font-bold">{budgetData.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-8 -mt-4">
        {/* Main Chart Container - Enhanced */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Budget vs Spending Analysis
              </h2>
            </div>
          </div>
          <div className="p-4">
            <BudgetExpenseChart budgetData={budgetData} theme={theme} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Budget Categories
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Under Budget
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Near Limit
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-rose-500 rounded-full mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Over Budget
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Budget Status Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {budgetData.map((item, index) => {
          const percentage = ((item.spent / item.budget) * 100).toFixed(1);
          const isOverBudget = item.spent > item.budget;
          const isNearLimit = percentage > 80 && !isOverBudget;

          // Determine card styling based on status
          let cardStyles = {
            borderColor: "border-emerald-200 dark:border-emerald-700",
            bgGradient:
              "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
            progressColor: "bg-emerald-500",
            textColor: "text-emerald-700 dark:text-emerald-400",
            iconColor: "text-emerald-600",
          };

          if (isNearLimit) {
            cardStyles = {
              borderColor: "border-amber-200 dark:border-amber-700",
              bgGradient:
                "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
              progressColor: "bg-amber-500",
              textColor: "text-amber-700 dark:text-amber-400",
              iconColor: "text-amber-600",
            };
          }

          if (isOverBudget) {
            cardStyles = {
              borderColor: "border-rose-200 dark:border-rose-700",
              bgGradient:
                "bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20",
              progressColor: "bg-rose-500",
              textColor: "text-rose-700 dark:text-rose-400",
              iconColor: "text-rose-600",
            };
          }

          return (
            <div
              key={index}
              className={`${cardStyles.bgGradient} ${cardStyles.borderColor} border-l-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              {" "}
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">
                    {item.category}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cardStyles.textColor} ${cardStyles.bgGradient}`}
                    >
                      {isOverBudget
                        ? "Over Budget"
                        : isNearLimit
                        ? "Near Limit"
                        : "On Track"}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${cardStyles.bgGradient}`}>
                  <svg
                    className={`w-6 h-6 ${cardStyles.iconColor}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
              {/* Financial Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Spent
                    </p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      ${item.spent.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Budget
                    </p>
                    <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                      ${item.budget.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Progress
                    </span>
                    <span
                      className={`text-sm font-bold ${cardStyles.textColor}`}
                    >
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 ${cardStyles.progressColor} rounded-full transition-all duration-500 ease-out relative`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    >
                      {/* Add shimmer effect for visual interest */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Status Message */}
                <div
                  className={`text-center p-2 rounded-lg ${cardStyles.bgGradient}`}
                >
                  <p className={`text-sm font-medium ${cardStyles.textColor}`}>
                    {isOverBudget
                      ? `$${(
                          item.spent - item.budget
                        ).toLocaleString()} over budget!`
                      : `$${(
                          item.budget - item.spent
                        ).toLocaleString()} remaining`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
