"use client";
import budgetservice from "@/appwrite/budget";
import { addBudget } from "@/store/budgetSlice";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function CategoryAmountPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
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
    console.log(data);
    try {
      const payload = {
        CategoryName: data.categoryName,
        Amount: Number(data.amount),
        BudgetName: data.categorySelect,
      };
      const budget = await budgetservice.createBudget(payload);
      // dispatch(addBudget(budget));
      console.log("Budget Created Succesfully", budget);
    } catch (error) {
      console.log("Budget Creation Failed at Form Side", error);
      throw error;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Create Budget
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10 mt-2 w-72 p-4 bg-white rounded shadow-lg border border-gray-300"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="CategoryName"
                className="block mb-1 font-semibold text-gray-700"
              >
                Category Name
              </label>
              <input
                id="categoryName"
                {...register("categoryName", { required: true })}
                className={`w-full px-3 py-2 border rounded ${
                  errors.categoryName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter category"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="categorySelect"
                className="block mb-1 font-semibold text-gray-700"
              >
                Category
              </label>
              <select
                id="categorySelect"
                {...register("categorySelect", { required: true })}
                className={`w-full px-3 py-2 border rounded ${
                  errors.categorySelect ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Others">Others</option>
              </select>
              {errors.categorySelect && (
                <p className="text-red-500 text-sm mt-1">
                  Category is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block mb-1 font-semibold text-gray-700"
              >
                Amount
              </label>
              <input
                id="amount"
                {...register("amount", { required: true })}
                className={`w-full px-3 py-2 border rounded ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter amount"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Creating Budget..." : "Create Budget"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
