import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
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