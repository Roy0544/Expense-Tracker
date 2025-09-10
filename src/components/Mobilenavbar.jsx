// app/components/MobileNav.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Logout from "./Logout";

const tabs = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="8" height="8" rx="1.2" />
        <rect x="13" y="3" width="8" height="8" rx="1.2" />
        <rect x="3" y="13" width="8" height="8" rx="1.2" />
        <rect x="13" y="13" width="8" height="8" rx="1.2" />
      </svg>
    ),
  },
  {
    to: "/budgets",
    label: "Budgets",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v9l6 3" />
      </svg>
    ),
  },
  {
    to: "/expense",
    label: "Expenses",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 3h12v18l-3-2-3 2-3-2-3 2V3z" />
        <line x1="8" y1="7" x2="14" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="8" y1="15" x2="11" y2="15" />
      </svg>
    ),
  },
  {
    to: "/user",
    label: "User",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </svg>
    ),
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex flex-col w-[90vw] mx-auto  md:hidden">
      <ul className="flex w-full items-center justify-around rounded-lg bg-white px-2 py-1 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] dark:bg-slate-950">
        {tabs.map(({ to, label, icon }) => {
          const isActive = pathname === to;
          return (
            <li key={label}>
              <Link
                href={to}
                aria-current={isActive ? "page" : undefined}
                className={clsx(
                  "flex flex-col items-center px-3 py-2 text-xs transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                <span
                  className={clsx(
                    "text-lg",
                    isActive
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {icon}
                </span>
              </Link>
            </li>
          );
        })}

        {/* Logout button sits inside the nav for consistent spacing */}
        <Logout />
      </ul>
    </nav>
  );
}
