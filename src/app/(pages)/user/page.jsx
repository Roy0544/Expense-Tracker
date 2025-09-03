"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
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
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "March 2023",
    profileImage: "/api/placeholder/150/150",
    membershipTier: "Premium",
  });

  const [financialStats] = useState([
    {
      label: "Total Budget",
      value: 15000,
      icon: Target,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      change: "+5.2%",
    },
    {
      label: "Total Expenses",
      value: 9800,
      icon: CreditCard,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      change: "+12.3%",
    },
    {
      label: "Remaining Budget",
      value: 5200,
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      change: "-7.1%",
    },
    {
      label: "Monthly Savings",
      value: 2400,
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      change: "+18.5%",
    },
  ]);

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

  const [budgetGoals] = useState([
    { category: "Food & Dining", spent: 1200, budget: 1500, percentage: 80 },
    { category: "Transportation", spent: 350, budget: 500, percentage: 70 },
    { category: "Entertainment", spent: 280, budget: 300, percentage: 93 },
    { category: "Utilities", spent: 450, budget: 600, percentage: 75 },
  ]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6"
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
                src={user.profileImage}
                alt={user.name}
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
              <motion.div
                className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold"
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
              >
                {user.membershipTier}
              </motion.div>
            </motion.div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                variants={itemVariants}
              >
                {user.name}
              </motion.h1>
              <motion.p
                className="text-xl text-blue-600 dark:text-blue-400 mb-4 font-medium"
                variants={itemVariants}
              >
                Expense Tracker User
              </motion.p>

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
                  <span>Member since {user.joinDate}</span>
                </div>
              </motion.div>

              {/* Quick Stats Summary */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <div className="bg-emerald-100 dark:bg-emerald-900/20 px-4 py-2 rounded-lg">
                  <span className="text-emerald-800 dark:text-emerald-400 font-semibold">
                    Budget Health:{" "}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-300">
                    Good
                  </span>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                  <span className="text-blue-800 dark:text-blue-400 font-semibold">
                    Active Budgets:{" "}
                  </span>
                  <span className="text-blue-600 dark:text-blue-300">8</span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div className="flex gap-4" variants={itemVariants}>
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Edit3 size={18} />
                Edit Profile
              </motion.button>

              <motion.button
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Settings size={18} />
                Settings
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        {/* Financial Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
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
                  <div className="text-right">
                    <div
                      className={`text-sm font-semibold ${
                        stat.change.startsWith("+")
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </div>
                    <div className="text-xs text-gray-500">vs last month</div>
                  </div>
                </div>

                <motion.h3
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-1"
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Expenses */}
          <motion.div
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h2
                className="text-2xl font-bold text-gray-900 dark:text-white"
                variants={itemVariants}
              >
                Recent Expenses
              </motion.h2>
              <motion.button
                className="text-blue-600 hover:text-blue-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All
              </motion.button>
            </div>

            <motion.div className="space-y-4" variants={containerVariants}>
              {recentExpenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  variants={expenseItemVariants}
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(59, 130, 246, 0.05)",
                    borderRadius: "16px",
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                >
                  <motion.div
                    className="text-2xl"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {expense.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-semibold">
                          {expense.description}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {expense.category} • {expense.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">
                          -${expense.amount}
                        </p>
                        <div className="flex items-center gap-1">
                          {expense.status === "completed" ? (
                            <CheckCircle
                              size={12}
                              className="text-emerald-500"
                            />
                          ) : (
                            <Clock size={12} className="text-orange-500" />
                          )}
                          <span
                            className={`text-xs capitalize ${
                              expense.status === "completed"
                                ? "text-emerald-500"
                                : "text-orange-500"
                            }`}
                          >
                            {expense.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Budget Goals & Quick Actions */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Budget Goals */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <motion.h3
                className="text-xl font-bold text-gray-900 dark:text-white mb-6"
                variants={itemVariants}
              >
                Budget Goals
              </motion.h3>

              <motion.div className="space-y-4" variants={containerVariants}>
                {budgetGoals.map((goal, index) => (
                  <motion.div
                    key={goal.category}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {goal.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        ${goal.spent}/${goal.budget}
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          goal.percentage > 90
                            ? "bg-red-500"
                            : goal.percentage > 75
                            ? "bg-yellow-500"
                            : "bg-emerald-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.percentage}%` }}
                        transition={{
                          delay: 1 + index * 0.1,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-medium ${
                          goal.percentage > 90
                            ? "text-red-500"
                            : goal.percentage > 75
                            ? "text-yellow-500"
                            : "text-emerald-500"
                        }`}
                      >
                        {goal.percentage}% used
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <motion.h3
                className="text-xl font-bold text-gray-900 dark:text-white mb-6"
                variants={itemVariants}
              >
                Quick Actions
              </motion.h3>

              <motion.div className="space-y-3" variants={containerVariants}>
                {[
                  {
                    icon: Plus,
                    label: "Add New Expense",
                    color: "bg-blue-500 hover:bg-blue-600",
                    link: "/add-expense",
                  },
                  {
                    icon: Target,
                    label: "Create Budget",
                    color: "bg-emerald-500 hover:bg-emerald-600",
                    link: "/create-budget",
                  },
                  {
                    icon: PieChart,
                    label: "View Reports",
                    color: "bg-purple-500 hover:bg-purple-600",
                    link: "/reports",
                  },
                  {
                    icon: Settings,
                    label: "Account Settings",
                    color: "bg-gray-500 hover:bg-gray-600",
                    link: "/settings",
                  },
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl text-white font-medium transition-all duration-200 ${action.color}`}
                  >
                    <action.icon size={20} />
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>{" "}
        {/* closes grid */}
      </div>{" "}
      {/* closes max-w-7xl wrapper */}
    </motion.div>
  );
}
