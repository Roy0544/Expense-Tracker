"use client";
import authservice from "@/appwrite/auth";
import budgetservice from "@/appwrite/budget";
import Budgetcards from "@/components/Budgetcards";
import DataTable from "@/components/ExpenseDataTable";
import CategoryAmountPopover from "@/components/Popoverbud";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/store/authSlice";
import { allbudgets } from "@/store/budgetSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import expneseservice from "@/appwrite/expense";
import Selectbudgets from "@/components/Selectbudgets";

function page() {
  const authstate = useSelector((state) => state.auth.status);
  const exp = useSelector((state) => state.expense.filterExpenses);
  const filter = useSelector((state) => state.budget.category);

  const [budgets, setbudgets] = useState([]);
  const [expenses, setexpenses] = useState([]);
  const [searchinput, setsearchinput] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [badd, setbadd] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [userid, setuserid] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const Checkstattus = async () => {
      try {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(login(user));
          setuserid(user.$id);
          await getcategories(user.$id);
          await getexpenses(user.$id);
        }
      } catch (error) {
        console.log("No User Logged In", error);
        throw error;
      } finally {
        setIsCheckingAuth(false);
      }
    };
    const getcategories = async (userId) => {
      const categories = await budgetservice.listbudgets(userId);
      setbudgets(categories.rows);
      console.log(categories);

      if (categories) {
        dispatch(allbudgets(categories));
      }
    };
    const getexpenses = async (userId) => {
      const expense = await expneseservice.listexpenses(userId);
      setexpenses(expense.rows);
    };
    Checkstattus();
  }, [badd]);

  // useEffect(() => {
  //   const getcategories = async () => {
  //     const categories = await budgetservice.listbudgets();
  //     setbudgets(categories.rows);
  //     console.log(categories);

  //     if (categories) {
  //       dispatch(allbudgets(categories));
  //     }
  //   };
  //   const getexpenses = async () => {
  //     const expense = await expneseservice.listexpenses();
  //     setexpenses(expense.rows);
  //   };
  //   getcategories();
  //   getexpenses();
  // }, [badd]);

  useEffect(() => {
    if (authstate === false) {
      setbudgets([]);
      setexpenses([]);
    }
  }, [authstate]);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const layoutTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  };

  // Enhanced loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading your budgets...
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
            className="w-16 h-16 text-blue-500 mx-auto mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Access Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please login to access your budget dashboard
          </p>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSearch = (e) => {
    setsearchinput(e.target.value);
  };

  const filtered = budgets.filter((bud) =>
    bud.CategoryName.toLowerCase().includes(searchinput.toLowerCase())
  );
  const filterandcategory = filtered.filter((f) => {
    if (!filter || filter === "") return true; // Show all if no category filter
    return f.BudgetName.toLowerCase() === filter.toLowerCase();
  });
  console.log("filter is", filterandcategory);

  const amount = exp.reduce(
    (total, item) => total + Number(item.expenseAmount),
    0
  );

  // Calculate summary statistics
  const totalBudgetAmount = budgets.reduce(
    (total, item) => total + Number(item.Amount),
    0
  );
  const averageBudget =
    budgets.length > 0 ? totalBudgetAmount / budgets.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-[90vw] mx-auto bg-gray-50 dark:bg-gray-900 mt-11"
    >
      {/* Hero Section */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-blue-600 via-gray-700 to-green-800 text-white w-full  rounded-2xl"
      >
        <motion.div className="w-full mx-auto py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Title Section */}
            <div className="flex-1  px-4 ">
              <div className="flex items-center gap-4 mb-4">
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 15v-4a2 2 0 012-2h4a2 2 0 012 2v4M8 15h8"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    My Budgets
                  </h1>
                  <p className="text-blue-100 text-lg mt-2">
                    Manage your financial categories and spending limits
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap gap-4 mt-6"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-blue-100 text-sm">Total Categories</p>
                  <p className="text-2xl font-bold">{budgets.length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-blue-100 text-sm">Total Budget</p>
                  <p className="text-2xl font-bold">
                    ₹{totalBudgetAmount.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-blue-100 text-sm">Avg. per Category</p>
                  <p className="text-2xl font-bold">
                    ₹{Math.round(averageBudget).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="w-[90vw] mx-auto py-8">
        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Left Side - Filters and View Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-500 hidden md:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  <Selectbudgets />
                </span>
              </div>

              {/* View Mode Toggle */}
              <motion.div className=" md:flex hidden bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor:
                      viewMode === "grid" ? "#ffffff" : "transparent",
                    color: viewMode === "grid" ? "#1f2937" : "#6b7280",
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor:
                      viewMode === "list" ? "#ffffff" : "transparent",
                    color: viewMode === "list" ? "#1f2937" : "#6b7280",
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Side - Search and Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <CategoryAmountPopover
                badd={badd}
                setbadd={setbadd}
                userid={userid}
              />
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <Input
                  type="search"
                  className="pl-10 w-full sm:w-[280px] h-10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search budget categories..."
                  onChange={handleSearch}
                  value={searchinput}
                />
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchinput && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-sm text-gray-600 dark:text-gray-400">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg..."
                  >
                    <motion.svg
                      initial={{ rotate: -10, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    >
                      {/* SVG content */}
                    </motion.svg>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl font-semibold..."
                    >
                      {searchinput
                        ? "No matching budgets found"
                        : "No budgets created yet"}
                    </motion.h3>
                  </motion.div>
                ) : (
                  <span>
                    Found {filtered.length} budget
                    {filtered.length !== 1 ? "s" : ""} matching "{searchinput}"
                  </span>
                )}
              </h2>
            </div>
          )}
        </div>

        {/* Budget Cards Section */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {searchinput
                  ? "No matching budgets found"
                  : "No budgets created yet"}
              </h3>
              <h2 className="text-gray-500 dark:text-gray-400 mb-6">
                {searchinput
                  ? "Try adjusting your search terms or create a new budget category."
                  : "Get started by creating your first budget category to track your spending."}
              </h2>
              {!searchinput && (
                <CategoryAmountPopover badd={badd} setbadd={setbadd}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                    Create Your First Budget
                  </Button>
                </CategoryAmountPopover>
              )}
            </div>
          ) : (
            <motion.div
              layout
              transition={layoutTransition}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filterandcategory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">
                    No budgets match your filter criteria.
                  </p>
                  <p className="text-sm">
                    Try adjusting your filters or create a new budget.
                  </p>
                </div>
              ) : (
                filterandcategory.map((budget) => {
                  const exp = expenses.filter((e) => budget.$id === e.budgets);
                  const amount = exp.reduce(
                    (total, item) => total + Number(item.expenseAmount),
                    0
                  );

                  return (
                    <motion.div
                      key={budget.$id}
                      layout
                      layoutId={budget.$id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{
                        scale: 1.01,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                      transition={layoutTransition}
                    >
                      <Link
                        key={budget.$id}
                        href={{
                          pathname: "/budgetdetail",
                          query: {
                            id: budget.$id,
                            name: budget.CategoryName,
                            amount: budget.Amount,
                          },
                        }}
                        className="block transition-transform duration-200 hover:scale-[1.02]"
                      >
                        <Budgetcards
                          name={budget.CategoryName}
                          amount={budget.Amount}
                          category={budget.BudgetName}
                          amountexpense={amount}
                        />
                      </Link>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default page;
