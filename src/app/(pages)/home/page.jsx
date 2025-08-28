import Budgetcards from "@/components/Budgetcards";
import Dashboard from "@/components/ChartShow";
import Dashboardpie from "@/components/PieChart";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ComicText } from "@/components/magicui/comic-text";
import React from "react";

function page() {
  return (
    <div>
      <div className="w-[90vw] mx-auto mt-10 border h-auto p-6 dark:text-slate-100 text-[#374151] bg-slate-100 dark:bg-black rounded-md shadow-2xl ">
        <div className="">
          <ComicText fontSize={3} className={"tracking-widest font-extrabold"}>
            My DashBoard
          </ComicText>
        </div>

        <p className="text-[18px] mt-5 text-center w-full">
          Get All Your Budgets In One Place , Have a Track At Your Expense
        </p>
        <div
          id="amounts"
          className="flex gap-5 mt-10 justify-between p-2 font-bold "
        >
          <div
            id="budget"
            className=" relative w-[230px] h-20 border p-4 flex justify-between items-center rounded-xl shadow-md hover:shadow-lg transition bg-green-100 dark:bg-black"
          >
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <p>
              Total Budget <br />{" "}
              <span className="text-green-500 font-mono"> $1500</span>
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
            className=" relative w-[230px] h-20 border p-4 flex justify-between items-center rounded-xl shadow-md hover:shadow-lg transition bg-red-100 dark:bg-black"
          >
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <p>
              Total Expense <br />{" "}
              <span className="text-red-500 font-mono"> $850 </span>
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
            className=" relative w-[230px] h-20 border p-4 flex justify-between items-center rounded-xl shadow-md hover:shadow-lg transition bg-amber-100 dark:bg-black "
          >
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <p>
              No of Budgets <br />{" "}
              <span className="text-amber-500 font-mono">11</span>
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

        <div className="flex justify-between mt-10">
          <div
            id="chart"
            className="w-[60%] h-auto border rounded-2xl shadow-md p-4 bg-white dark:bg-black"
          >
            <Dashboard />
          </div>
          <div
            id="group"
            className="w-[30%] h-auto rounded-xl bg-white dark:bg-black border shadow-md  flex flex-col relative p-3 "
          >
            <h1 className="text-2xl font-sans mb-4 font-bold">
              {" "}
              Latest Budgets
            </h1>
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100  h-[800px] flex flex-col divide-y-4 divide-gray-200 ">
              <Budgetcards />
              <Budgetcards />
              <Budgetcards />
              <Budgetcards />
              <Budgetcards />
              <ProgressiveBlur
                height="25%"
                position="bottom"
                className={"absolute"}
              />
            </div>
          </div>
        </div>

        <div
          id="piechart"
          className="w-full border  flex justify-center items-center mt-10 text-center"
        >
          <Dashboardpie />
        </div>
      </div>
    </div>
  );
}

export default page;
