"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import AnimatedThemeToggler from "../components/magicui/animated-theme-toggler";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import MobileNav from "./Mobilenavbar";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const menuVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function Navbar() {
  const authstate = useSelector((state) => state.auth.status);
  const theme = useSelector((state) => state.auth.theme);

  const pathname = usePathname();

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="  sticky top-1 z-50 bg-white dark:bg-slate-950  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] w-[90vw] h-14 mx-auto flex justify-between items-center rounded-md px-4 "
      >
        <div className="w-full flex justify-between items-center ">
          <motion.div variants={logoVariants} id="left">
            <motion.p
              className="text-2xl font-sans font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
              whileHover={{
                scale: 1.05,
                textShadow: "0px 0px 8px rgba(255, 165, 0, 0.3)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                },
                hover: { duration: 0.2 },
              }}
            >
              TrackFlow
            </motion.p>
          </motion.div>
          <motion.div
            id="right"
            variants={logoVariants}
            className="font-sans font-bold hidden md:block"
          >
            <motion.div
              variants={menuVariants}
              className="flex gap-4 text-[18px]"
            >
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
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className={`text-gray-700 dark:text-gray-300 hover:text-blue-600    dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-medium px-4 py-2 rounded-lg transition-all duration-200 
                  ${
                    pathname === "/dashboard"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                  }`}
                    >
                      DashBoard
                    </Button>
                  </Link>
                  <Link href="/budgets">
                    <Button
                      variant="ghost"
                      className={`text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                        pathname === "/budgets"
                          ? "bg-green-600 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-950/30"
                      }`}
                    >
                      Budget
                    </Button>
                  </Link>
                  <Link href="/expense">
                    <Button
                      variant="ghost"
                      className={`text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                        pathname === "/expense"
                          ? "bg-red-600 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                      }`}
                    >
                      Expense
                    </Button>
                  </Link>
                  <Link href="/user">
                    <Button
                      variant="ghost"
                      className={`text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                        pathname === "/user"
                          ? "bg-purple-600 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                      }`}
                    >
                      Profile
                    </Button>
                  </Link>
                  <Logout />
                </>
              )}
            </motion.div>
          </motion.div>
          <div
            id="mobile"
            className="flex md:hidden items-center justify-center gap-1.5 font-accent "
          >
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
              ""
            )}
          </div>
        </div>
      </motion.div>
      <div id="mobilenav">{authstate ? <MobileNav /> : ""}</div>
    </>
  );
}

export default Navbar;
