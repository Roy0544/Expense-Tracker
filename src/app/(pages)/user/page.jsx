"use client";
import React, { useEffect, useState } from "react";
import { motion, percent } from "framer-motion";
import {
  Mail,
  MapPin,
  Calendar,
  Edit3,
  Settings,
  Plus,
  DollarSign,
  CreditCard,
  TrendingUp,
  PieChart,
  Target,
  CheckCircle,
  Clock,
} from "lucide-react";
import authservice from "@/appwrite/auth";
import budgetservice from "@/appwrite/budget";
import expneseservice from "@/appwrite/expense";

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
      setuser(user);
      console.log(user);
    };
    const getbudgets = async () => {
      const budget = await budgetservice.listbudgets();
      console.log(budget.rows);

      setbudgetdata(budget.rows);
    };
    const getexpenses = async () => {
      const expense = await expneseservice.listexpenses();
      console.log(expense.rows);

      setexpensedata(expense.rows);
    };
    getuser();
    getbudgets();
    getexpenses();
  }, []);

  // const [user] = useState({
  //   name: "Alex Johnson",
  //   email: "alex.johnson@email.com",
  //   phone: "+1 (555) 123-4567",
  //   location: "New York, NY",
  //   joinDate: "March 2023",
  //   profileImage: "/api/placeholder/150/150",
  //   membershipTier: "Premium",
  // });
  const totalbudgetamount = budgetdata.reduce(
    (total, item) => total + Number(item.Amount),
    0
  );

  const totalexpenseamount = expensedata.reduce(
    (total, item) => total + Number(item.expenseAmount),
    0
  );
  // console.log("expense data", totalbudgetamount, totalexpenseamount);

  const financialStats = [
    {
      label: "Total Budget",
      value: totalbudgetamount ? totalbudgetamount : 1,
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
  // console.log(sortedBudgets);

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
  console.log(recentactivity);

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
  console.log(percentage);

  const [budgetGoals] = useState([
    { category: "Food & Dining", spent: 1200, budget: 1500, percentage: 80 },
    { category: "Transportation", spent: 350, budget: 500, percentage: 70 },
    { category: "Entertainment", spent: 280, budget: 300, percentage: 93 },
    { category: "Utilities", spent: 450, budget: 600, percentage: 75 },
  ]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6 font-accent"
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
                src="/girl_avatar.jpg"
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
                  <MapPin size={16} />
                  <span>{user.location}</span>
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

                  {percentage < 80 ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      {"  "}
                      Good {"  "}
                      {parseInt(percentage)}%
                    </span>
                  ) : (
                    <span className="text-amber-700 dark:text-amber-400 font-bold">
                      Critical
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
                  ${stat.value.toLocaleString()}
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
                className="text-blue-600 hover:text-blue-700 font-medium"
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
                              -${ac.eamount}
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-600 dark:text-green-300">
                              +${ac.bamount}
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

          {/* Budget Goals & Quick Actions */}
        </div>{" "}
        {/* closes grid */}
      </div>{" "}
      {/* closes max-w-7xl wrapper */}
    </motion.div>
  );
}
