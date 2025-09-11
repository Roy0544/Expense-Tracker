"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, SunDim } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setTheme, theme } from "@/store/authSlice";

const STORAGE_KEY = "prefers-theme"; // light | dark

export default function AnimatedThemeToggler({ className }) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false); // gate for SSR
  const [isDark, setIsDark] = useState(false);
  const btnRef = useRef(null); // ⭐ needed for animation

  /* run only in the browser, once */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    let dark;
    if (saved === "dark") dark = true;
    else if (saved === "light") dark = false;
    else dark = false; // default = LIGHT

    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
    dispatch(setTheme(dark));
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid hydration mismatch

  /* toggle + persist + ✨ radial animation */
  const toggle = async () => {
    if (!btnRef.current) return;

    await document.startViewTransition(() => {
      const dark = document.documentElement.classList.toggle("dark");
      setIsDark(dark);
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
      dispatch(theme());
    }).ready;

    // ⭐ original radial reveal
    const { top, left, width, height } = btnRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      className={cn(className)}
      aria-label="Toggle theme"
    >
      {isDark ? <SunDim /> : <Moon />}
    </button>
  );
}
