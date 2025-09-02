"use client";
import React from "react";
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

function Addexpense({ Id }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const expenese = {
        expenseName: data.name,
        expenseAmount: Number(data.amount),
        budgetId: Id,
      };
      const expense = await expneseservice.createExpense(expenese);
      console.log("Expense Created Successfully", expense);
      dispatch(addExpense(expense));
    } catch (error) {
      console.log("Expense Creation Failed at Form Side", error);
      throw error;
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Expense Name: </label>
            <Input
              {...register("name", { required: "Expense name is required" })}
              type={"text"}
              placeholder="Enter Your Expense Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
            <label htmlFor="amount">Amount: </label>
            <Input
              {...register("amount", { required: "Amount is required" })}
              type={"text"}
              placeholder="Enter Amount"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Adding..." : "Add Expense"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Addexpense;
