"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import authservice from "@/appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { resetBudgets } from "@/store/budgetSlice";
import { resetexpenses } from "@/store/expenseSlice";
function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    try {
      await authservice.logout();
      dispatch(logout());
      dispatch(resetBudgets()); // Add this
      dispatch(resetexpenses());
      router.push("/");
    } catch (error) {
      console.log("Logout Failed at Form Side", error);
    }
  };
  return (
    <div>
      <Button
        onClick={handlelogout}
        variant={"outline"}
        className={
          " bg-transparent text-black border-none hover:bg-red-500 hover:text-white font-bold text-[16px] font-sans dark:text-white"
        }
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
