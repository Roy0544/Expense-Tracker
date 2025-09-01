import Addexpense from "@/components/Addexpense";
import Budgetcards from "@/components/Budgetcards";
import DataTable from "@/components/ExpenseDataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function page() {
  return (
    <div>
      <div className="w-[90vw] mx-auto mt-10 border h-auto p-6 dark:text-slate-100 text-[#374151] bg-slate-100 dark:bg-black rounded-md shadow-2xl ">
        <div
          id="top"
          className="flex w-full justify-between items-center h-14 border px-3 "
        >
          <h1 className="text-4xl font-bold font-accent">Category Name</h1>
          <div className="flex gap-7">
            <Button className={""}>Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
        <div id="content" className="w-full flex justify-between ">
          <div className="border w-[45%]">
            <Budgetcards />
          </div>

          <div className="border w-[55%]">
            <Addexpense />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10 dark:bg-hsl(224 71% 4%) dark:bg-black ">
          <h1 className="text-3xl">Latest Expenses</h1>
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default page;
