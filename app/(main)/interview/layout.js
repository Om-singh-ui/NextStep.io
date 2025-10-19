import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-900/20">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <BarLoader width={200} color="#3b82f6" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}