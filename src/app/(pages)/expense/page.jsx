"use client";
import authservice from "@/appwrite/auth";
import DataTable from "@/components/ExpenseDataTable";
import Example from "@/components/PieChart";
import { login } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import expneseservice from "@/appwrite/expense";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";



function page() {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [viewMode, setViewMode] = useState("chart"); // chart, table, or both
  const [dateFilter, setDateFilter] = useState("all"); // all, month, week
  const [expenses, setexpenses] = useState([]);
  console.log(expenses);

  useEffect(() => {
    const Checkstattus = async () => {
      try {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(login(user));
        }
      } catch (error) {
        console.log("No User Logged In", error);
        throw error;
      } finally {
        setIsCheckingAuth(false);
      }
    };
    const getexpensedata = async () => {
      try {
        const exp = await expneseservice.listexpenses();
        // console.log("expens ehere is ", exp);
        setexpenses(exp.rows);
      } catch (error) {
        console.log("Failed to Fetch Expense Data", error);
        throw error;
      }
    };
    Checkstattus();
    getexpensedata();
  }, []);

  const authstate = useSelector((state) => state.auth.status);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        damping: 20,
      },
    },
  };

  // Enhanced loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-600 mb-4"></div>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading your expenses...
        </p>
      </div>
    );
  }

  // Enhanced auth check
  if (authstate === false) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center max-w-md">
          <svg
            className="w-16 h-16 text-rose-500 mx-auto mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Access Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please login to view your expense tracking dashboard
          </p>
          <Link href="/login">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate expense statistics
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + (expense.expenseAmount || 0),
    0
  );
  const expenseCount = expenses.length;
  const averageExpense = expenseCount > 0 ? totalExpenses / expenseCount : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-[90vw] mx-auto bg-gray-50 dark:bg-gray-900 mt-11"
    >
      {/* Hero Section */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-red-800 via-pink-800 to-red-600 text-white rounded-2xl"
      >
        <div className="w-full   mx-auto py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Title Section */}
            <div className="flex-1 px-4">
              <motion.div
                variants={heroItemVariants}
                className="flex items-center gap-4 mb-4"
              >
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    All Expenses
                  </h1>
                  <p className="text-pink-100 text-lg mt-2">
                    Comprehensive view of your spending patterns
                  </p>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-pink-100 text-sm">Total Expenses</p>
                  <p className="text-2xl font-bold">{expenseCount}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-pink-100 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold">
                    ${totalExpenses.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-pink-100 text-sm">Avg. per Expense</p>
                  <p className="text-2xl font-bold">
                    ${Math.round(averageExpense).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Action Button */}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-[90vw] mx-auto py-8">
        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Left Side - View Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-500"
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
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  View Options
                </span>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("chart")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    viewMode === "chart"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  Chart View
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode("both")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    viewMode === "both"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  Both
                </button>
              </div>
            </div>

            {/* Right Side - Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="today">Today</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Based on View Mode */}
        <div className="space-y-8">
          {/* Chart Section */}
          <AnimatePresence mode="wait">
            {(viewMode === "chart" || viewMode === "both") && (
              <motion.div
                key="chart-section"
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                      <svg
                        className="w-6 h-6 mr-3 text-rose-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        />
                      </svg>
                      Expense Distribution
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Visual breakdown by category
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="p-8"
                >
                  <div className="w-full h-96 flex items-center justify-center">
                    <Example expense={expenses} filter={dateFilter} />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Table Section */}
            {(viewMode === "table" || viewMode === "both") && (
              <motion.div
                key="table-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                      <svg
                        className="w-6 h-6 mr-3 text-rose-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17h6l3 3v-3h2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h2z"
                        />
                      </svg>
                      Detailed Expense Records
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {expenseCount} total entries
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-rose-600 border-rose-200 hover:bg-rose-50"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                          />
                        </svg>
                        Export Data
                      </Button>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="overflow-hidden"
                >
                  <DataTable />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {expenseCount === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                damping: 20,
              }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center"
            >
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                />
              </svg>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-semibold..."
              >
                No expenses recorded yet
              </motion.h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start tracking your expenses to see detailed analytics and
                insights.
              </p>
            </motion.div>
          )}
        </div>

        {/* Summary Footer */}
        {expenseCount > 0 && (
          <div className="mt-8 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  Expense Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your complete expense tracking overview
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">This Month</p>
                  <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                    ${totalExpenses.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">Avg. Daily</p>
                  <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
                    ${Math.round(totalExpenses / 30).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400">Categories</p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {new Set(expenses.map((e) => e.category)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default page;
