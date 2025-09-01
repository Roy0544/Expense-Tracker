"use client";
import DataTable from "@/components/ExpenseDataTable";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const authstate = useSelector((state) => state.auth.status);

  if (authstate === false) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Please Login To Access expense
      </div>
    );
  }
  return (
    <div>
      <div className="w-[90vw] mx-auto mt-10 border h-auto p-6 dark:text-slate-100 text-[#374151] bg-slate-100 dark:bg-black rounded-md shadow-2xl ">
        <h1 className="text-4xl font-mons font-bold">All Expenses</h1>
        <div className="border shadow-2xl rounded-2xl mt-7 bg-red-100 dark:bg-gray-950">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default page;
