"use client";

import Link from "next/link";
import { ArrowLeft, Target, Clock, Star, ChevronRight, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MockInterviewPage() {
  return (
    <div className="min-h-screen py-8 px-4">
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
                  className="flex items-center gap-2 pl-0 transition-all duration-300 group-hover:gap-3 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm hover:shadow-md border hover:scale-105"
                >
                  <div className="relative">
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    <ChevronRight className="h-4 w-4 absolute top-0 -right-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1" />
                  </div>
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-medium">
                    Back to Interview Preparation
                  </span>
                  <div className="h-4 w-1 bg-gradient-to-b from-primary/60 to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </span>
            </Link>
          </motion.div>

          {/* Main Title Section */}
          <div className="relative">
            {/* Animated background elements */}
            <div className="absolute -left-6 -top-6 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute left-1/2 top-1/2 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>

            <Card className="bg-gradient-to-r from-background/95 to-accent/30 border-border/60 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-accent to-accent/80 rounded-2xl shadow-inner">
                        <Target className="h-7 w-7 text-primary" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      >
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                          Mock Interview
                        </h1>
                        <motion.p
                          className="text-muted-foreground max-w-2xl text-base md:text-lg mt-2"
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
                      className="flex items-center gap-2 bg-accent/50 px-4 py-3 rounded-xl border border-border/50 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        10 Questions
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2 bg-accent/50 px-4 py-3 rounded-xl border border-border/50 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
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
          <div className="absolute -left-10 top-1/3 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -right-10 bottom-1/4 w-16 h-16 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute left-1/3 top-1/4 w-12 h-12 bg-primary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>

          <Card className="border-border/60 bg-background/90 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardContent className="p-0">
              <Quiz />
            </CardContent>
          </Card>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="fixed bottom-10 left-10 w-4 h-4 bg-primary/30 rounded-full blur-sm animate-bounce"></div>
        <div className="fixed top-20 right-20 w-6 h-6 bg-primary/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: "1s" }}></div>
        <div className="fixed top-1/2 left-1/4 w-3 h-3 bg-primary/25 rounded-full blur-sm animate-ping"></div>
      </div>
    </div>
  );
}