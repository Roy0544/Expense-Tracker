"use client";
import Budgetcards from "@/components/Budgetcards";
import Dashboard from "@/components/ChartShow";
import Dashboardpie from "@/components/PieChart";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ComicText } from "@/components/magicui/comic-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import budgetservice from "@/appwrite/budget";
import authservice from "@/appwrite/auth";
import { login } from "@/store/authSlice";
import expneseservice from "@/appwrite/expense";
import { allbudgets } from "@/store/budgetSlice";
import { allexpenses } from "@/store/expenseSlice";
import Link from "next/link";

function page() {
  const dispatch = useDispatch();
  const [budgetdata, setbudgetdata] = useState([]);
  const [expensedata, setexpensedata] = useState([]);
  useEffect(() => {
    const getallbudgets = async () => {
      const bud = await budgetservice.listbudgets();
      setbudgetdata(bud.rows);
      // dispatch(allbudgets(bud.rows))
      console.log(bud.rows);
    };
    const getcurrentuser = async () => {
      const user = await authservice.getCurrentUser();
      if (user) {
        dispatch(login(user));
      }
    };
    const getallexpense = async () => {
      const exp = await expneseservice.listexpenses();
      setexpensedata(exp.rows);
      // dispatch(allexpenses(exp.rows))
      console.log(exp);
    };
    getallbudgets();
    getcurrentuser();
    getallexpense();
  }, []);
  const amount = budgetdata.reduce(
    (total, item) => total + Number(item.Amount),
    0
  );
  const expenseamount = expensedata.reduce(
    (total, item) => total + Number(item.expenseAmount),
    0
  );

  const authstate = useSelector((state) => state.auth.status);

  if (authstate === false) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Please Login To Access Dashboard
      </div>
    );
  }
  console.log(budgetdata);

  return (
    <div>
      <div className="w-[90vw] mx-auto mt-10 border h-auto p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-md shadow-2xl ring-1 ring-gray-900/5">
        <div className="mb-4">
          <ComicText fontSize={3} className={"tracking-widest font-extrabold "}>
            My DashBoard
          </ComicText>
        </div>

        <p className="text-[18px] mt-5 text-center w-full">
          Track your budgets and expenses with elegant insights
        </p>
        <div
          id="amounts"
          className="flex gap-5 mt-10 justify-between p-2 font-bold "
        >
          <div
            id="budget"
            className=" relative w-[230px] h-20  p-4 flex justify-between items-center rounded-xl shadow-md hover:ring-2 hover:ring-blue-500/20 hover:ring-offset-2 transition-all duration-200 bg-green-100 dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700"
          >
            <ShineBorder shineColor={["#4CAF50", "#81C784", "#A5D6A7"]} />
            <p className="font-light">
              Total Budget <br />{" "}
              <span className="text-green-600 font-mono">
                ${" "}
                <NumberTicker
                  value={amount}
                  className={"text-green-500 dark:text-green-400"}
                />{" "}
              </span>
            </p>
            <svg
              className="stroke-blue-600 h-10 w-10"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
              <path d="M16 10h.01" />
              <path d="M2 8v1a2 2 0 0 0 2 2h1" />
            </svg>
          </div>

          <div
            id="expense"
            className=" relative w-[230px] h-20  p-4 flex justify-between items-center rounded-xl shadow-md hover:ring-2 hover:ring-blue-500/20 hover:ring-offset-2 transition-all duration-200 bg-red-100 dark:bg-gray-800 border border-rose-200 dark:border-rose-700"
          >
            <ShineBorder shineColor={["#FF0000", "#B22222", "#8B0000"]} />
            <p className="font-light">
              Total Expense <br />{" "}
              <span className="text-red-500 font-mono  ">
                ${" "}
                <NumberTicker
                  value={expenseamount}
                  className={"text-red-500 dark:text-red-400"}
                />{" "}
              </span>
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-blue-500 h-10 w-10"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
              <path d="m16 19 3 3 3-3" />
              <path d="M18 12h.01" />
              <path d="M19 16v6" />
              <path d="M6 12h.01" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>

          <div
            id="budgetCount"
            className=" relative w-[230px] h-20  p-4 flex justify-between items-center rounded-xl shadow-md hover:ring-2 hover:ring-blue-500/20 hover:ring-offset-2 transition-all duration-200 bg-amber-100  dark:bg-gray-800 border border-blue-200 dark:border-blue-700 "
          >
            <ShineBorder shineColor={["#FFC107", "#FFB300", "#FF8F00"]} />
            <p className="font-light">
              No of Budgets <br />{" "}
              <span className="text-amber-500 font-mono">
                {" "}
                <NumberTicker
                  value={budgetdata.length}
                  className={"text-amber-500 dark:text-amber-400"}
                />{" "}
              </span>
            </p>
            <svg
              className="stroke-blue-500 h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            </svg>
          </div>
        </div>

        <div className="flex justify-between mt-10 h-fit">
          <div
            id="chart"
            className="w-[60%] h-auto bg-white   dark:bg-gray-800 border-l-4 border-blue-500 rounded-xl shadow-2xl p-0.5"
          >
            <Dashboard budget={budgetdata} expense={expensedata} />
          </div>
          <div
            id="group"
            className="w-[30%] h-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-4 relative overflow-hidden "
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-amber-500"></div>
            <h1 className="text-2xl font-sans mb-4 font-bold">
              {" "}
              Latest Budgets
            </h1>

            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100  h-[1400px] flex flex-col divide-y-4 divide-gray-200 ">
              {budgetdata.map((budget) => (
                <Link
                  key={budget.$id}
                  href={{
                    pathname: "/budgetdetail", // or whatever your detail page route is
                    query: {
                      id: budget.$id,
                      name: budget.CategoryName,
                      amount: budget.Amount,
                    },
                  }}
                >
                  <Budgetcards
                    name={budget.CategoryName}
                    amount={budget.Amount}
                    category={budget.BudgetName}
                    // amountexpense={amount}
                  />
                </Link>
              ))}

              <ProgressiveBlur
                height="20%"
                position="bottom"
                className={"absolute"}
              />
            </div>
          </div>
        </div>

        {/* <div
          id="piechart"
          className="w-full border  flex justify-center items-center mt-10 text-center"
        >
         
        </div> */}
      </div>
    </div>
  );
}

export default page;
