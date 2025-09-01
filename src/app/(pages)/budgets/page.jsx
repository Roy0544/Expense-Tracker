"use client";
import authservice from "@/appwrite/auth";
import budgetservice from "@/appwrite/budget";
import Budgetcards from "@/components/Budgetcards";
import DataTable from "@/components/ExpenseDataTable";
import CategoryAmountPopover from "@/components/Popoverbud";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/store/authSlice";
import { allbudgets } from "@/store/budgetSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function page() {
  const authstate = useSelector((state) => state.auth.status);
  const [budgets, setbudgets] = useState([]);
  const [searchinput, setsearchinput] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dispatch = useDispatch();
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

  useEffect(() => {
    const getcategories = async () => {
      const categories = await budgetservice.listbudgets();
      setbudgets(categories.rows);
      console.log(categories);

      if (categories) {
        dispatch(allbudgets(categories));
      }
    };
    getcategories();
  }, []);

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
        Please Login To Access Budget
      </div>
    );
  }
  const handleSearch = (e) => {
    setsearchinput(e.target.value);
  };
  const filtered = budgets.filter((bud) =>
    bud.CategoryName.toLowerCase().includes(searchinput.toLowerCase())
  );
  return (
    <div>
      <div className="w-[90vw] mx-auto mt-10 border h-auto p-6 dark:text-slate-100 text-[#374151] bg-slate-100 dark:bg-black rounded-md shadow-2xl ">
        <div className="flex w-full justify-between items-center h-18 ">
          <div className="flex gap-4 items-center">
            <h1 className="   text-4xl font-heading tracking-wide bg-gradient-to-r from-green-700 to-sky-600 bg-clip-text text-transparent h-auto  ">
              My Budgets
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-funnel-plus-icon lucide-funnel-plus"
            >
              <path d="M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348" />
              <path d="M16 6h6" />
              <path d="M19 3v6" />
            </svg>
          </div>
          <div className="flex gap-4 items-centr h-auto ">
            {/* <button className="w-[140px] border bg-green-500 text-white font-bold rounded-md h-10 hover:bg-green-600 transition px-1 ">
              Create Budget
            </button> */}
            <CategoryAmountPopover />
            <Input
              type={"search"}
              className={"w-[220px]"}
              placeholder={"Search By Category Name "}
              onChange={handleSearch}
              value={searchinput}
            />
            <Button className={"bg-white text-black"}>Search</Button>
          </div>
        </div>
        <div id="budgetscards" className=" mt-16 ">
          <div className="grid grid-cols-1 gap-5 w-full  p-6  ">
            {filtered.map((budget) => (
              <Budgetcards
                name={budget.CategoryName}
                amount={budget.Amount}
                key={budget.$id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
