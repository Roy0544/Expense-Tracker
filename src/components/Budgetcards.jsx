import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Link from "next/link";

export default function Budgetcards({ name, amount, amountexpense, category }) {
  const percentage = amountexpense
    ? ((amountexpense / amount) * 100).toFixed(1)
    : 0;
  const remaining = amount - (amountexpense || 0);
  const isOverBudget = amountexpense > amount;
  const isNearLimit = percentage > 80 && !isOverBudget;
  // console.log(category);

  // Dynamic styling based on budget status
  const getCardStyles = () => {
    if (isOverBudget) {
      return {
        cardClass:
          "border-l-4 border-rose-400 hover:border-rose-500 bg-gradient-to-br from-rose-50/50 to-white dark:from-rose-900/10 dark:to-gray-800",
        progressColor: "bg-rose-500",
        textColor: "text-rose-600 dark:text-rose-400",
        statusBg: "bg-rose-100 dark:bg-rose-900/20",
        iconColor: "text-rose-500",
      };
    } else if (isNearLimit) {
      return {
        cardClass:
          "border-l-4 border-amber-400 hover:border-amber-500 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-900/10 dark:to-gray-800",
        progressColor: "bg-amber-500",
        textColor: "text-amber-600 dark:text-amber-400",
        statusBg: "bg-amber-100 dark:bg-amber-900/20",
        iconColor: "text-amber-500",
      };
    } else {
      return {
        cardClass:
          "border-l-4 border-emerald-400 hover:border-emerald-500 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-800",
        progressColor: "bg-emerald-500",
        textColor: "text-emerald-600 dark:text-emerald-400",
        statusBg: "bg-emerald-100 dark:bg-emerald-900/20",
        iconColor: "text-emerald-500",
      };
    }
  };

  const styles = getCardStyles();

  // Category icons mapping (you can expand this)
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      food: "🍽️",
      transport: "🚗",
      entertainment: "🎬",
      shopping: "🛍️",
      utilities: "⚡",
      health: "🏥",
      education: "📚",
      savings: "💰",
      bills: "🧾",
      others: "📦",
    };

    const key = categoryName?.toLowerCase();
    return iconMap[key] || "📊"; // Default icon
  };

  return (
    <div className="w-full  ">
      <Card
        className={`w-[95%] mx-auto h-auto min-h-[420px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:text-slate-100 text-gray-700 ${styles.cardClass}`}
      >
        {/* Header Section */}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200">{name}</p>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {category}
                  </CardDescription>
                </div>
              </div>
            </CardTitle>

            {/* Status Badge */}
            <div className={`px-2 py-1 rounded-full ${styles.statusBg}`}>
              <span className={`text-xs font-medium ${styles.textColor}`}>
                {isOverBudget
                  ? "Over"
                  : isNearLimit
                  ? "Near Limit"
                  : "On Track"}
              </span>
            </div>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="py-4">
          <div className="space-y-4">
            {/* Budget Amount */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Budget
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  ₹<NumberTicker value={amount} />
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isOverBudget ? "Overspent" : "Remaining"}
                </p>
                <p
                  className={`text-lg font-semibold ${
                    isOverBudget ? "text-rose-600" : "text-gray-600"
                  } dark:${isOverBudget ? "text-rose-400" : "text-gray-300"}`}
                >
                  ₹
                  {isOverBudget
                    ? Math.abs(remaining).toLocaleString()
                    : remaining.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Spent Amount */}
            {amountexpense > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Amount Spent
                  </span>
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    ₹<NumberTicker value={amountexpense} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer with Progress */}
        <CardFooter className="flex flex-col space-y-3 pt-2">
          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Usage
              </span>
              <span className={`text-sm font-bold ${styles.textColor}`}>
                {percentage}%
              </span>
            </div>

            <div className="relative">
              <Progress value={Math.min(percentage, 100)} className="h-2" />
              {/* You might need to customize the Progress component to accept dynamic colors */}
            </div>
          </div>

          {/* Action Button or Status Message */}
          <div className="w-full pt-2">
            {isOverBudget ? (
              <div className="text-center p-2 bg-rose-50 dark:bg-rose-900/20 rounded-md">
                <p className="text-sm font-medium text-rose-700 dark:text-rose-400">
                  ⚠️ Budget exceeded by ₹{Math.abs(remaining).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className={`text-center p-2 ${styles.statusBg} rounded-md`}>
                <p className={`text-sm font-medium ${styles.textColor}`}>
                  {isNearLimit
                    ? "🔔 Approaching budget limit"
                    : "✅ Budget is healthy"}
                </p>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
