"use client";
import authservice from "@/appwrite/auth";
import budgetservice from "@/appwrite/budget";
import Addexpense from "@/components/Addexpense";
import Budgetcards from "@/components/Budgetcards";
import EditBudgetForm from "@/components/EditBudgetForm";
import DataTable from "@/components/ExpenseDataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/store/authSlice";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"; // ✅ ADDED
import Alert from "@/components/Alert";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// ✅ ADDED: Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

function BudgetDetailClient() {
  const authstate = useSelector((state) => state.auth.status);
  const toast = useRef(null);
  const searchParams = useSearchParams();
  const budgetName = searchParams.get("name");
  const budgetAmount = searchParams.get("amount");
  const budgetId = searchParams.get("id");
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [eadd, seteadd] = useState(false);
  const [userid, setuserid] = useState("");

  const [currentBudget, setCurrentBudget] = useState({
    $id: budgetId,
    CategoryName: budgetName,
    Amount: budgetAmount,
    BudgetName: budgetName,
  });

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    const Checkstattus = async () => {
      try {
        const user = await authservice.getCurrentUser();
        if (user) {
          setuserid(user.$id);
          dispatch(login(user));
        }
      } catch (error) {
        console.log("No User Logged In", error);
        throw error;
      } finally {
        setIsCheckingAuth(false);
      }
    };
    Checkstattus();
  }, []);

  const exp = useSelector((state) => state.expense.filterExpenses);

  const amount = exp.reduce(
    (total, item) => total + Number(item.expenseAmount),
    0
  );

  if (isCheckingAuth) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex justify-center items-center text-3xl font-bold"
      >
        Loading...
      </motion.div>
    );
  }

  if (authstate === false) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex justify-center items-center text-3xl font-bold"
      >
        Please Login To Access expense
      </motion.div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedBudget) => {
    setCurrentBudget(updatedBudget);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await budgetservice.deleteBudget(budgetId);

      // ✅ Show success toast
      if (toast.current) {
        toast.current.show({
          // Remove 'await' - show() is not async
          severity: "success",
          summary: "Updated",
          detail: "Budget deleted successfully!",
          life: 3000,
        });
      } else {
        console.warn("Toast ref is null, using fallback");
        alert("Budget Deleted successfully!");
      }

      // Redirect after a short delay to show the toast
      setTimeout(() => {
        window.location.href = "/budgets";
      }, 1500);
    } catch (error) {
      console.error("Error deleting budget:", error);

      // ✅ Show error toast
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to delete budget",
        life: 3000,
      });
    }
  };
  if (isEditing) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-[90vw] mx-auto mt-10 p-6"
        >
          <EditBudgetForm
            budget={currentBudget}
            onUpdate={handleUpdate}
            onCancel={handleCancelEdit}
            ID={budgetId}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <Toast ref={toast} />
      {/* ✅ ADDED: motion.div wrapper with animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-[90vw] mx-auto mt-10 border h-auto p-6 dark:text-slate-100 text-[#374151] bg-slate-100 dark:bg-black rounded-md shadow-2xl"
      >
        {/* ✅ ADDED: Animated header */}
        <motion.div
          variants={headerVariants}
          id="top"
          className=" flex-col md:flex-row flex h-auto w-full justify-between items-center p-1.5 bg-gradient-to-r from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 px-8 rounded-xl shadow-lg relative overflow-hidden  gap-4"
        >
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          />

          {/* Enhanced Title */}

          <motion.div
            className="flex items-center gap-4 "
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">💰</span>
            </motion.div>

            <div className="flex flex-col gap-0.5">
              <motion.h1
                className=" capitalize text-2xl md:text-4xl  font-bold  bg-gradient-to-r from-gray-800 via-blue-600 to-purple-700 dark:from-gray-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent select-none font-mono"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {budgetName}
              </motion.h1>
              <motion.p
                className="text-sm text-gray-500 dark:text-gray-400 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Budget Management Dashboard
              </motion.p>
            </div>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <div className="flex gap-4 ">
            {/* Edit Button */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0  group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Button
                onClick={handleEdit}
                className="relative bg-gradient-to-r cursor-pointer from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-3 md:px-6 py-2 rounded-lg shadow-lg border-0 transition-all duration-200"
              >
                <motion.span
                  className="flex items-center gap-2"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  ✏️ Edit
                </motion.span>
              </Button>
            </motion.div>

            {/* Delete Button */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              {/* ✅ FIXED: Pass handleDelete to Alert */}
              <Alert onDelete={handleDelete} />
            </motion.div>
          </div>

          {/* Animated Bottom Border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-b-xl"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="h-full w-16 bg-white/30 blur-sm"
            />
          </motion.div>
        </motion.div>

        {/* ✅ ADDED: Animated content section */}
        <motion.div
          variants={contentVariants}
          id="content"
          className="w-full flex flex-col md:flex-row gap-3 justify-between mt-11"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border w-full md:w-[45%] "
          >
            <Budgetcards
              name={budgetName}
              amount={budgetAmount}
              amountexpense={amount}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border w-full md:w-[55%]"
          >
            <Addexpense
              Id={budgetId}
              eadd={eadd}
              seteadd={seteadd}
              userid={userid}
            />
          </motion.div>
        </motion.div>

        {/* ✅ ADDED: Animated data table section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-3 md:p-6 rounded-lg shadow-lg mt-10 dark:border border-gray-400 dark:bg-black"
        >
          <h1 className="text-3xl">Latest Expenses</h1>
          <div className="w-full overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="min-w-full">
                <DataTable Id={budgetId} eadd={eadd} userid={userid} />
              </div>
            </div>

            {/* Scroll indicator for mobile */}
            <div className="block sm:hidden text-center mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ← Swipe to see more columns →
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default BudgetDetailClient;
