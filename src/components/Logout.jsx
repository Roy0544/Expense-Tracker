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
          " bg-transparent text-black border-none cursor-pointer hover:bg-red-500 hover:text-white font-bold text-[16px] font-sans dark:text-white"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="nav-icon"
          aria-hidden="true"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </Button>
    </div>
  );
}

export default Logout;
