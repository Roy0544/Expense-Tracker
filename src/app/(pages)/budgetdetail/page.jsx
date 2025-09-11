// app/budgetdetail/page.js (Server Component - no "use client")
import { Suspense } from "react";
import BudgetDetailClient from "./BudgetDetailClient";

export default function BudgetDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-600"></div>
          <p className="ml-4 text-xl font-semibold">
            Loading budget details...
          </p>
        </div>
      }
    >
      <BudgetDetailClient />
    </Suspense>
  );
}
