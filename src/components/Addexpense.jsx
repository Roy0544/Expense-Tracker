"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addExpense, expensebyfilter } from "@/store/expenseSlice";
import expneseservice from "@/appwrite/expense";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const buttonVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 25px rgba(239, 68, 68, 0.5)",
    y: -2,
  },
  tap: {
    scale: 0.98,
    y: 0,
  },
};

function Addexpense({ Id, seteadd, eadd, userid }) {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false); // ✅ Success message state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const expenese = {
        expenseName: data.name,
        expenseAmount: Number(data.amount),
        budgetId: Id,
        userId: userid,
      };
      const expense = await expneseservice.createExpense(expenese);

      dispatch(addExpense(expense));

      // ✅ Show success message and clear form
      setIsSuccess(true);
      reset();
      seteadd(!eadd);

      // ✅ Auto-hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.log("Expense Creation Failed at Form Side", error);
      throw error;
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="relative overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Animated background */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-2xl"
        />

        {/* ✅ SUCCESS OVERLAY - Covers entire card content */}
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
                <p className="text-green-600 dark:text-green-400 font-semibold text-xl">
                  Expense Added Successfully!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <CardHeader>
          <motion.div variants={cardVariants}>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💳
              </motion.span>
              Add Expense
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Expense Name Field */}
            <motion.div variants={inputVariants}>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Expense Name:
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  {...register("name", {
                    required: "Expense name is required",
                  })}
                  type="text"
                  placeholder="Enter Your Expense Name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                />
              </motion.div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Amount Field */}
            <motion.div variants={inputVariants}>
              <label
                htmlFor="amount"
                className="block text-sm font-medium mb-1"
              >
                Amount:
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  {...register("amount", { required: "Amount is required" })}
                  type="text"
                  placeholder="Enter Amount"
                  className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
                />
              </motion.div>
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
          </form>
        </CardContent>

        <CardFooter>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="w-full"
          >
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r cursor-pointer from-red-500 via-red-700 to-amber-800 hover:from-red-700 hover:via-red-700 hover:to-red-800 text-white font-semibold py-3 transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              <motion.span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Adding...
                  </>
                ) : (
                  <>
                    <motion.span
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    ></motion.span>
                    Add Expense
                  </>
                )}
              </motion.span>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default Addexpense;
