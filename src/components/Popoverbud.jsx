"use client";
import budgetservice from "@/appwrite/budget";
import { addBudget } from "@/store/budgetSlice";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const popoverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function CategoryAmountPopover({ badd, setbadd, userid }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Close popover when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data) => {
    const amountnum = Math.trunc(data.amount);

    try {
      const payload = {
        CategoryName: data.categoryName,
        Amount: amountnum,
        BudgetName: data.categorySelect,
        userId: userid,
      };
      const budget = await budgetservice.createBudget(payload);

      // Show success animation
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        reset(); // Clear form
      }, 1800);
      setbadd(!badd);

      // dispatch(addBudget(budget));
    } catch (error) {
      console.log("Budget Creation Failed at Form Side", error);
      throw error;
    }
  };

  return (
    <div className="relative inline-block">
      {/* Animated Trigger Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 md:px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold shadow-lg"
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
          y: -2,
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
        <span className="ml-2">Create Budget</span>
      </motion.button>

      {/* Animated Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            variants={popoverVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-10 mt-3 w-80 p-6 bg-white rounded-xl shadow-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
          >
            {/* Success State */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center z-20"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="text-6xl mb-2"
                    >
                      ✅
                    </motion.div>
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      Budget Created Successfully!
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <motion.div variants={formFieldVariants} className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Create New Budget
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Set up a new budget category with spending limit
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Category Name Field */}
              <motion.div variants={formFieldVariants}>
                <label
                  htmlFor="categoryName"
                  className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                >
                  Category Name
                </label>
                <motion.input
                  id="categoryName"
                  {...register("categoryName", {
                    required: "Category name is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.categoryName
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                  placeholder="e.g., Monthly Groceries"
                  whileFocus={{ scale: 1.02 }}
                />
                <AnimatePresence>
                  {errors.categoryName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.categoryName.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Category Select Field */}
              <motion.div variants={formFieldVariants}>
                <label
                  htmlFor="categorySelect"
                  className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                >
                  Category Type
                </label>
                <motion.select
                  id="categorySelect"
                  {...register("categorySelect", {
                    required: "Please select a category",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.categorySelect
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Select category type</option>
                  <option value="Food">🍕 Food</option>
                  <option value="Transport">🚗 Transport</option>
                  <option value="Entertainment">🎬 Entertainment</option>
                  <option value="Health">🏥 Health</option>
                  <option value="Shopping">🛍️ Shopping</option>
                  <option value="Bills">💡 Bills</option>
                  <option value="Education">📚 Education</option>
                  <option value="Others">📦 Others</option>
                </motion.select>
                <AnimatePresence>
                  {errors.categorySelect && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.categorySelect.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Amount Field */}
              <motion.div variants={formFieldVariants}>
                <label
                  htmlFor="amount"
                  className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
                >
                  Budget Amount ($)
                </label>
                <motion.input
                  id="amount"
                  type="number"
                  step="0.01"
                  {...register("amount", {
                    required: "Amount is required",
                    min: { value: 1, message: "Amount must be at least $1" },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.amount
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  }`}
                  placeholder="500.00"
                  whileFocus={{ scale: 1.02 }}
                />
                <AnimatePresence>
                  {errors.amount && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.amount.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={buttonVariants} className="flex gap-3 pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  }`}
                  whileHover={
                    !isSubmitting
                      ? {
                          scale: 1.02,
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                        }
                      : {}
                  }
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Creating...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="create"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Create Budget
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
