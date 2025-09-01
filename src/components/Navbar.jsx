"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";
import { useSelector } from "react-redux";
import Logout from "./Logout";

function Navbar() {
  const authstate = useSelector((state) => state.auth.status);
  return (
    <div className=" sticky top-1 z-50 bg-white dark:bg-slate-950  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] w-[90vw] h-14 mx-auto flex justify-between items-center rounded-md px-4 ">
      <div id="left">
        <p className="text-2xl font-sans font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
          TrackFlow
        </p>
      </div>
      <div id="right" className="font-sans font-bold">
        <div className="flex gap-4 text-[18px]">
          <AnimatedThemeToggler />
          {!authstate ? (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className={
                    "bg-amber-500 text-white font-bold text-[18px] font-sans dark:bg-amber-500"
                  }
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant={"outline"}
                  className={
                    "bg-blue-400 text-white font-bold text-[16px] font-sans dark:bg-blue-400"
                  }
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/home">
                <Button
                  variant={"outline"}
                  className={
                    "bg-blue-400 text-white font-bold text-[16px] font-sans dark:bg-blue-400"
                  }
                >
                  Home
                </Button>
              </Link>
              <Link href="/budgets">
                <Button
                  variant={"outline"}
                  className={
                    "bg-blue-400 text-white font-bold text-[16px] font-sans dark:bg-blue-400"
                  }
                >
                  Budget
                </Button>
              </Link>
              <Link href="/expense">
                <Button
                  variant={"outline"}
                  className={
                    "bg-blue-400 text-white font-bold text-[16px] font-sans dark:bg-blue-400"
                  }
                >
                  Expense
                </Button>
              </Link>
              <Logout />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
