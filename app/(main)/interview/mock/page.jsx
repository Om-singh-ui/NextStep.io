"use client";

import Link from "next/link";
import { ArrowLeft, Target, Clock, Star, ChevronRight, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <Link href="/interview">
              <span className="inline-flex">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 pl-0 transition-all duration-300 group-hover:gap-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm hover:shadow-md border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-105"
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
          </motion.div>

          {/* Main Title Section */}
          <div className="relative">
            {/* Animated background elements */}
            <div className="absolute -left-6 -top-6 w-28 h-28 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute left-1/2 top-1/2 w-16 h-16 bg-indigo-500/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>

            <Card className="bg-gradient-to-r from-white/95 to-blue-50/70 dark:from-slate-900/95 dark:to-blue-950/30 border-blue-200/60 dark:border-slate-700/60 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30 rounded-2xl shadow-inner">
                        <Target className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      >
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-800 to-purple-700 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                          Mock Interview
                        </h1>
                        <motion.p
                          className="text-slate-600 dark:text-slate-300 max-w-2xl text-base md:text-lg mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                        >
                          Test your technical knowledge with personalized questions and get immediate AI-powered feedback
                        </motion.p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Info Badges */}
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
                    <motion.div
                      className="flex items-center gap-2 bg-blue-50/80 dark:bg-blue-900/30 px-4 py-3 rounded-xl border border-blue-200/50 dark:border-blue-700/30 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        10 Questions
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 bg-amber-50/80 dark:bg-amber-900/30 px-4 py-3 rounded-xl border border-amber-200/50 dark:border-amber-700/30 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                        AI Scored
                      </span>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quiz Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative"
        >
          {/* Floating background elements */}
          <div className="absolute -left-10 top-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -right-10 bottom-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute left-1/3 top-1/4 w-12 h-12 bg-indigo-500/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>

          <Card className="border-blue-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardContent className="p-0">
              <Quiz />
            </CardContent>
          </Card>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="fixed bottom-10 left-10 w-4 h-4 bg-blue-400/30 rounded-full blur-sm animate-bounce"></div>
        <div className="fixed top-20 right-20 w-6 h-6 bg-purple-400/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: "1s" }}></div>
        <div className="fixed top-1/2 left-1/4 w-3 h-3 bg-indigo-400/25 rounded-full blur-sm animate-ping"></div>
      </div>
    </div>
  );
}