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
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function page() {
  const searchParams = useSearchParams();
  const budgetName = searchParams.get("name");
  const budgetAmount = searchParams.get("amount");
  const budgetId = searchParams.get("id");
  const dispatch = useDispatch();
  const [expenseamount, setexpenseamount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
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
  const authstate = useSelector((state) => state.auth.status);
  const exp = useSelector((state) => state.expense.filterExpenses);
  console.log("expense amoount is ", exp);

  const amount = exp.reduce(
    (total, item) => total + Number(item.expenseAmount),
    0
  );
  console.log("total amount is ", amount);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }
  if (authstate === false) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Please Login To Access expense
      </div>
    );
  }
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleUpdate = (updatedBudget) => {
    setCurrentBudget(updatedBudget);
    setIsEditing(false);
    alert("Budget updated successfully!");
    // You might want to update URL params here or redirect
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this budget? This will also delete all associated expenses."
    );
    if (!confirmed) return;

    try {
      await budgetservice.deleteBudget(budgetId);
      alert("Budget deleted successfully!");
      // Redirect to budget list page
      window.location.href = "/budgets";
    } catch (error) {
      console.error("Error deleting budget:", error);
      alert("Failed to delete budget");
    }
  };
  if (isEditing) {
    return (
      <div className="w-[90vw] mx-auto mt-10 p-6">
        <EditBudgetForm
          budget={currentBudget}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
          ID={budgetId}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="w-[90vw] mx-auto mt-10 border h-auto p-6 dark:text-slate-100 text-[#374151] bg-slate-100 dark:bg-black rounded-md shadow-2xl ">
        <div
          id="top"
          className="flex w-full justify-between items-center h-14 border px-3 "
        >
          <h1 className="text-4xl font-bold font-accent">{budgetName}</h1>
          <div className="flex gap-7">
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
        <div id="content" className="w-full flex justify-between ">
          <div className="border w-[45%]">
            <Budgetcards
              name={budgetName}
              amount={budgetAmount}
              amountexpense={amount}
            />
          </div>

          <div className="border w-[55%]">
            <Addexpense Id={budgetId} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10 dark:bg-hsl(224 71% 4%) dark:bg-black ">
          <h1 className="text-3xl">Latest Expenses</h1>
          <DataTable Id={budgetId} />
        </div>
      </div>
    </div>
  );
}

export default page;
