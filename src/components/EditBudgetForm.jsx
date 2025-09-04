"use client";
import React from "react";
import { useForm } from "react-hook-form";
import budgetService from "@/appwrite/budget";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function EditBudgetForm({ budget, onUpdate, onCancel, ID }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      CategoryName: budget.CategoryName,
      Amount: Number(budget.Amount),
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedBudget = await budgetService.updateBudget(ID, {
        CategoryName: data.CategoryName,
        Amount: Number(parseFloat(data.Amount)),
        BudgetName: data.BudgetName,
      });

      onUpdate(updatedBudget); // Callback to parent component
      console.log("Budget updated successfully");
    } catch (error) {
      console.error("Error updating budget:", error);
      alert("Failed to update budget");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="CategoryName">Category Name:</label>
            <Input
              {...register("CategoryName", {
                required: "Category name is required",
              })}
              type="text"
              placeholder="Enter category name"
            />
            {errors.CategoryName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.CategoryName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="Amount">Budget Amount:</label>
            <Input
              {...register("Amount", { required: "Amount is required" })}
              type="number"
              step="0.01"
              placeholder="Enter budget amount"
            />
            {errors.Amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Amount.message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Updating..." : "Update Budget"}
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EditBudgetForm;
