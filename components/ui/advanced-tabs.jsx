// components/ui/advanced-tabs.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AdvancedTabs({ tabs, value, onValueChange, className }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div className="flex space-x-1 rounded-2xl bg-gray-100/80 p-1 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onValueChange(tab.value)}
              className={cn(
                "relative flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                value === tab.value
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
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