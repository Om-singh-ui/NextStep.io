// app/(main)/resume/_components/advanced-tabs.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AdvancedTabs({ tabs, value, onValueChange, className, darkMode = false }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // 🧹 Clean up unwanted attributes (e.g., fdprocessedid from extensions)
    if (typeof window !== "undefined") {
      document.querySelectorAll("[fdprocessedid]").forEach((el) => {
        el.removeAttribute("fdprocessedid");
      });
    }
  }, []);

  if (!isMounted) {
    // Optional: show placeholder skeleton while mounting
    return (
      <div
        className={cn(
          "w-full h-10 rounded-xl animate-pulse",
          darkMode ? "bg-gray-700/40" : "bg-gray-200/60"
        )}
      />
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div
          className={cn(
            "flex space-x-1 rounded-2xl p-1 backdrop-blur-sm",
            darkMode ? "bg-gray-700/50" : "bg-gray-100/80"
          )}
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onValueChange(tab.value)}
              className={cn(
                "relative flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                value === tab.value
                  ? "text-white"
                  : darkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {/* Animated background for active tab */}
              {value === tab.value && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">
                {tab.icon && <tab.icon className="h-4 w-4" />}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
