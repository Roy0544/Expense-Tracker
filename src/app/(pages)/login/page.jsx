"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import authservice from "@/appwrite/auth";

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const account = await authservice.login(data);

      if (account) {
        dispatch(login(account));
      }

      router.push("/dashboard");
    } catch (error) {
      console.log("Account Creation Failed at Form Side", error);
      if (error.field) {
        // Field-specific error
        setError(error.field, {
          type: "server",
          message: error.message,
        });
      } else {
        // General error
        setLoginError(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 rounded-2xl">
      <MagicCard
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-2xl"
        gradientColor="#D9D9D955"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="text-red-500">{loginError}</div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-semibold py-3 disabled:opacity-50"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          {/* Social Login */}

          {/* Additional Options */}
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </MagicCard>
    </div>
  );
}

export default LoginPage;
