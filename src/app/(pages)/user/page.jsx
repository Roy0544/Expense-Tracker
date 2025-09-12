"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, DollarSign, CreditCard, Target } from "lucide-react";
import authservice from "@/appwrite/auth";
import budgetservice from "@/appwrite/budget";
import expneseservice from "@/appwrite/expense";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { login } from "@/store/authSlice";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

const expenseItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export default function ExpenseTrackerUserProfile() {
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state.auth.status);
  const gender = useSelector((state) => state.auth.gender);

  const [user, setuser] = useState({});
  const [budgetdata, setbudgetdata] = useState([]);
  const [expensedata, setexpensedata] = useState([]);
  const [isopen, setisopen] = useState(false);

  const morehandler = () => {
    setisopen(!isopen);
  };
  useEffect(() => {
    const getuser = async () => {
      const user = await authservice.getCurrentUser();
      dispatch(login(user));
      setuser(user);

      await getbudgets(user.$id);
      await getexpenses(user.$id);
    };
    const getbudgets = async (userId) => {
      const budget = await budgetservice.listbudgets(userId);

      setbudgetdata(budget.rows);
    };
    const getexpenses = async (userId) => {
      const expense = await expneseservice.listexpenses(userId);

      setexpensedata(expense.rows);
    };
    getuser();
  }, []);
  useEffect(() => {
    if (authstate === false) {
      setbudgetdata([]);
      setexpensedata([]);
    }
  }, [authstate]);

  const totalbudgetamount = budgetdata.reduce(
    (total, item) => total + Number(item.Amount),
    0
  );

  const totalexpenseamount = expensedata.reduce(
    (total, item) => total + Number(item.expenseAmount),
    0
  );

  const financialStats = [
    {
      label: "Total Budget",
      value: totalbudgetamount ? totalbudgetamount : 0,
      icon: Target,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      change: "+5.2%",
    },
    {
      label: "Total Expenses",
      value: totalexpenseamount,
      icon: CreditCard,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      change: "+12.3%",
    },
    {
      label: "Remaining Budget",
      value: totalbudgetamount - totalexpenseamount,
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      change: "-7.1%",
    },
  ];

  const activity = [...budgetdata, ...expensedata];

  const sortedBudgets = [...activity].sort(
    (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
  );

  const recentactivity = sortedBudgets.map((sort) => {
    return {
      id: sort.$id,
      ename: sort.expenseName ? sort.expenseName : "",
      bname: sort.CategoryName ? sort.CategoryName : "",
      eamount: sort.expenseAmount,
      bamount: sort.Amount,
      icon: "🏷️",
      date: sort.$createdAt,
    };
  });

  const [recentExpenses] = useState([
    {
      id: 1,
      category: "Groceries",
      description: "Weekly grocery shopping",
      amount: 145.5,
      date: "Today",
      status: "completed",
      icon: "🛒",
    },
    {
      id: 2,
      category: "Transportation",
      description: "Monthly metro pass",
      amount: 89.0,
      date: "2 days ago",
      status: "completed",
      icon: "🚇",
    },
    {
      id: 3,
      category: "Utilities",
      description: "Electricity bill",
      amount: 156.75,
      date: "3 days ago",
      status: "pending",
      icon: "⚡",
    },
    {
      id: 4,
      category: "Entertainment",
      description: "Netflix subscription",
      amount: 15.99,
      date: "1 week ago",
      status: "completed",
      icon: "🎬",
    },
  ]);
  const percentage =
    ((totalbudgetamount - totalexpenseamount) / totalbudgetamount) * 100;

  const [budgetGoals] = useState([
    { category: "Food & Dining", spent: 1200, budget: 1500, percentage: 80 },
    { category: "Transportation", spent: 350, budget: 500, percentage: 70 },
    { category: "Entertainment", spent: 280, budget: 300, percentage: 93 },
    { category: "Utilities", spent: 450, budget: 600, percentage: 75 },
  ]);
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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br rounded-md from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6 font-accent"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>

          <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Picture */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.img
                src={gender === "male" ? "/male_avatar.jpg" : "girl_avatar.jpg"}
                alt={user?.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.3,
                }}
              />
            </motion.div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                className="text-4xl font-bold text-gray-900 dark:text-white mb-2 capitalize "
                variants={itemVariants}
              >
                {user.name}
              </motion.h1>
              <br />
              <motion.div
                className="flex flex-col sm:flex-row gap-4 text-gray-500 dark:text-gray-400 mb-6"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Calendar size={16} />
                  <span className="font-mono">
                    {" "}
                    Member since{" "}
                    {new Date(user.$createdAt).toLocaleDateString("en-US", {
                      month: "short", // "Aug"
                      day: "numeric", // "31"
                    })}
                  </span>
                </div>
              </motion.div>

              {/* Quick Stats Summary */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <div
                  className={`${
                    percentage < 80 ? "bg-emerald-100" : "bg-amber-100"
                  }  dark:bg-emerald-900/20 px-4 py-2 rounded-lg`}
                >
                  <span className="text-gray-800 dark:text-gray-400 font-semibold">
                    Budget Health:
                  </span>

                  {percentage < 20 && !isNaN(percentage) ? (
                    <span className="text-amber-700 dark:text-amber-400 font-bold">
                      Critical
                    </span>
                  ) : percentage >= 0 && !isNaN(percentage) ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {"  "}
                      Good {"  "}
                      {parseInt(percentage)}%
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 font-bold">
                      No Data
                    </span>
                  )}
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                  <span className="text-blue-800 dark:text-blue-400 font-semibold">
                    Active Budgets:{" "}
                  </span>
                  <span className="text-blue-600 dark:text-blue-300 font-mono ">
                    {budgetdata.length}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* Financial Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
        >
          {financialStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={statsVariants}
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                className={`${stat.bgColor} rounded-3xl p-6 shadow-lg border border-white/50 dark:border-gray-600/50`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                </div>

                <motion.h3
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-1 font-mono"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  ₹{stat.value.toLocaleString()}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Recent Expenses */}
          <motion.div
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                variants={itemVariants}
              >
                Recent Activity
              </motion.h2>
              <motion.button
                className="text-blue-600  cursor-pointer hover:text-blue-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={morehandler}
              >
                View All
              </motion.button>
            </div>

            <motion.div className="space-y-4 " variants={containerVariants}>
              {(isopen ? recentactivity : recentactivity.slice(0, 8)).map(
                (ac, index) => (
                  <motion.div
                    key={ac.id}
                    variants={expenseItemVariants}
                    whileHover={{
                      x: 10,

                      borderRadius: "16px",
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group border  ${
                      ac.ename
                        ? "bg-red-200 dark:bg-red-900"
                        : "bg-green-200 dark:bg-green-900"
                    } `}
                  >
                    <motion.div
                      className={`text-2xl `}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {ac.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-semibold capitalize">
                            {ac.ename || ac.bname}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-200 ">
                            📅{" "}
                            {new Date(ac.date).toLocaleDateString("en-US", {
                              month: "long", // "Aug"
                              day: "numeric", // "31"
                            })}
                          </p>
                        </div>
                        <div className="text-right font-mono">
                          {ac.ename ? (
                            <p className="text-lg font-bold text-red-600 dark:text-red-300">
                              -₹{ac.eamount}
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-600 dark:text-green-300">
                              +₹{ac.bamount}
                            </p>
                          )}
                          <div className="flex items-center gap-1"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
