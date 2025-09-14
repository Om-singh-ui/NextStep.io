"use client";

import Link from "next/link";
import { ArrowLeft, Target, Clock, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-6">
          {/* Back Button */}
          <div className="group">
            <Link href="/interview">
              <span className="inline-flex">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 pl-0 transition-all duration-300 group-hover:gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="relative">
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    <ChevronRight className="h-4 w-4 absolute top-0 -right-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent font-medium">
                    Back to Interview Preparation
                  </span>
                  <div className="h-4 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </span>
            </Link>
          </div>

          {/* Main Title Section */}
          <div className="relative">
            {/* Decorative blobs */}
            <div className="absolute -left-6 -top-6 w-28 h-28 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>

            <Card className="bg-gradient-to-r from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-950/20 border-blue-200/50 dark:border-slate-700/50 backdrop-blur-sm overflow-hidden shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Target className="h-6 w-6 md:h-7 md:w-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <motion.h1
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        Mock Interview
                      </motion.h1>
                    </div>
                    <motion.p
                      className="text-slate-600 dark:text-slate-300 max-w-2xl text-base md:text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      Test your knowledge with industry-specific questions and get immediate feedback
                    </motion.p>
                  </div>

                  {/* Info Badges */}
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
                    <motion.div
                      className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Time-based
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                        Scored
                      </span>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quiz Component */}
        <div className="relative">
          <div className="absolute -left-10 top-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -right-10 bottom-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl"></div>

          <Card className="border-blue-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <Quiz />
            </CardContent>
          </Card>
        </div>

        {/* Floating decorative elements */}
        <div className="fixed bottom-10 left-10 w-4 h-4 bg-blue-400/30 rounded-full blur-sm animate-pulse"></div>
        <div className="fixed top-20 right-20 w-6 h-6 bg-purple-400/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
}