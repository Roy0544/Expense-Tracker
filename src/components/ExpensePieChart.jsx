"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

// export function ExpensePieChart({ expenseData }) {
//   const { theme } = useTheme();
//   const [chartKey, setChartKey] = useState(0);

//   useEffect(() => {
//     setChartKey((prev) => prev + 1);
//   }, [theme]);

//   const isDark = theme === "dark";

//   const chartData = {
//     labels: expenseData.map((item) => item.category),
//     datasets: [
//       {
//         label: "Expenses",
//         data: expenseData.map((item) => item.amount),
//         backgroundColor: [
//           "#FF6B6B",
//           "#4ECDC4",
//           "#45B7D1",
//           "#96CEB4",
//           "#FFEAA7",
//           "#DDA0DD",
//           "#98D8C8",
//           "#FDA7DF",
//         ],
//         borderColor: [
//           "#FF5252",
//           "#26A69A",
//           "#2196F3",
//           "#66BB6A",
//           "#FFC107",
//           "#BA68C8",
//           "#4DB6AC",
//           "#F06292",
//         ],
//         borderWidth: 2,
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: isDark ? "#ffffff" : "#000000",
//           font: {
//             family: "var(--font-accent)",
//             size: 12,
//           },
//           padding: 20,
//           usePointStyle: true,
//           pointStyle: "circle",
//         },
//       },
//       title: {
//         display: true,
//         text: "Expense Breakdown by Category",
//         color: isDark ? "#ffffff" : "#000000",
//         font: {
//           family: "var(--font-heading)",
//           size: 16,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.label || "";
//             const value = context.parsed || 0;
//             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//             const percentage = ((value / total) * 100).toFixed(1);
//             return `${label}: $${value} (${percentage}%)`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="h-96 w-full">
//       <Pie key={chartKey} data={chartData} options={options} />
//     </div>
//   );
// }

export function ExpenseDoughnutChart({ expenseData }) {
  const { theme } = useTheme();
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [theme]);

  const isDark = theme === "dark";

  const chartData = {
    labels: expenseData.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: expenseData.map((item) => item.amount),
        backgroundColor: [
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FFEAA7",
          "#DDA0DD",
          "#98D8C8",
          "#FDA7DF",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%", // Doughnut center cutout
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDark ? "#ffffff" : "#000000",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div className="h-96 w-full relative">
      <Doughnut key={chartKey} data={chartData} options={options} />
      {/* Center Total Value */}
      <div className="absolute inset-0 flex items-center justify-center font-heading text-xl">
        ${expenseData.reduce((sum, item) => sum + item.amount, 0)}
      </div>
    </div>
  );
}
