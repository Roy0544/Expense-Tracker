"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authservice from "@/appwrite/auth";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";

export default function UserAuthClientComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const user = async () => {
      try {
        const response = await authservice.getCurrentUser();
        if (response) {
            console.log("response is here", response);
          dispatch(login(response));
          router.push("/home");
          
        }
      } catch (error) {
        console.log("Cannot Get Current User", error);
      }
    };
    user();
  }, []);
  return null; // or render a loader/spinner if needed
}
