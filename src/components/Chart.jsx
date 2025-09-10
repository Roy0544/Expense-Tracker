// components/BudgetExpenseChart.js
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BudgetExpenseChart({ budgetData, theme }) {
  const { resolvedTheme } = useTheme();
  const [chartKey, setChartKey] = useState(0); // Force re-render

  useEffect(() => {
    // Change key when theme changes to force chart re-render
    if (resolvedTheme) {
      setChartKey((prev) => prev + 1);
    }
  }, [resolvedTheme]);
  const isDark = resolvedTheme === true;
  console.log(isDark);

  const chartData = {
    labels: budgetData.map((item) => item.category), // ['Food', 'Transport', 'Entertainment', 'Bills']
    datasets: [
      {
        label: "Spent",
        data: budgetData.map((item) => item.spent), // [450, 180, 120, 280]
        backgroundColor: theme ? "#FF6B6B" : "#FF5252",
        borderColor: theme ? "#FF5252" : "#FF1744",
        borderWidth: 1,
        stack: "budget-stack",
      },
      {
        label: "Remaining Budget",
        data: budgetData.map((item) => Math.max(0, item.budget - item.spent)), // [50, 70, 130, 20]
        backgroundColor: theme ? "#4ECDC4" : "#00ACC1",
        borderColor: theme ? "#26A69A" : "#00838F",
        borderWidth: 1,
        stack: "budget-stack",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    barThickness: 30,
    layout: {
      padding: {
        bottom: 20, // ✅ ADDED: Extra padding for labels
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme ? "#ffffff" : "#000000",
          font: {
            family: "var(--font-accent)", // Your Montserrat font
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Budget vs Expenses ",
        color: theme ? "#ffffff" : "#000000",
        font: {
          family: "var(--font-heading)", // Your Anton font
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          footer: function (tooltipItems) {
            const dataIndex = tooltipItems[0].dataIndex;
            const budget = budgetData[dataIndex].budget;
            const spent = budgetData[dataIndex].spent;
            const percentage = ((spent / budget) * 100).toFixed(1);
            return `Budget: $${budget} | Used: ${percentage}%`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: theme ? "#ffffff" : "#000000",
          font: {
            size: 6, // ✅ REDUCED from default - makes labels smaller
            family: "var(--font-accent)", // ✅ ADDED: Use consistent font
          },
          maxRotation: 0, // Keep labels horizontal
          minRotation: 0,
          autoSkip: false,
        },
        grid: {
          color: theme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: theme ? "#ffffff" : "#000000",
          callback: function (value) {
            return "$" + value;
          },
        },
        grid: {
          color: theme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="h-80 w-full border ">
      <Bar data={chartData} options={options} key={chartKey} />
    </div>
  );
}
