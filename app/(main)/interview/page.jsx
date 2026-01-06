"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import Quiz from "./_components/quiz";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Target, BarChart3 } from "lucide-react";

const ProgressContext = createContext(null);

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

export default function InterviewPrepPage() {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const loadAssessments = async () => {
    try {
      setIsLoading(true);
      const data = await getAssessments();
      setAssessments(data || []);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
      setAssessments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addAssessment = (newAssessment) => {
    setAssessments(prev => [newAssessment, ...prev]);
    setLastUpdated(new Date().toISOString());
  };

  const refreshData = () => {
    loadAssessments();
  };

  const stats = {
    totalQuizzes: assessments.length,
    totalQuestions: assessments.reduce((sum, a) => sum + (a.totalQuestions || 0), 0),
    averageScore: assessments.length > 0
      ? (assessments.reduce((sum, a) => sum + a.quizScore, 0) / assessments.length).toFixed(1)
      : 0,
    bestScore: assessments.length > 0 ? Math.max(...assessments.map(a => a.quizScore)) : 0,
    progressTrend: assessments.length >= 2
      ? assessments[0].quizScore - assessments[1].quizScore
      : 0,
    streak: calculateStreak(assessments)
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const progressContextValue = {
    assessments,
    isLoading,
    lastUpdated,
    stats,
    refreshData,
    addAssessment
  };

  return (
    <ProgressContext.Provider value={progressContextValue}>
      <div className="px-4 max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex flex-col items-center justify-center text-center mb-8 mt-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight
bg-gradient-to-r from-gray-800 via-gray-900 to-black
dark:from-gray-200 dark:via-gray-100 dark:to-white
bg-clip-text text-transparent">
            Career Path Explorer
          </h1>


          <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Master your skills with structured practice, real-world assessments, and expert tips.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "dashboard"
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
              >
                <BarChart3 className="h-5 w-5" />
                📊 Dashboard
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === "quiz"
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
              >
                <Target className="h-5 w-5" />
                🎯 Take Quiz
              </button>
            </div>

            <Link href="/interview/mock">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Mock Interview
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Last Updated Indicator */}
        {lastUpdated && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              <button
                onClick={refreshData}
                className="ml-2 text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                🔄 Refresh
              </button>
            </p>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === "dashboard" ? (
          <div className="space-y-8 pb-12">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <>
                <StatsCards assessments={assessments} />
                <PerformanceChart assessments={assessments} />
                <QuizList assessments={assessments} />
              </>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto pb-12">
            <Quiz onQuizComplete={addAssessment} />
          </div>
        )}
      </div>
    </ProgressContext.Provider>
  );
}

function calculateStreak(assessments) {
  if (assessments.length === 0) return 0;

  const today = new Date().toDateString();
  const dates = [...new Set(assessments.map(a => new Date(a.createdAt).toDateString()))].sort().reverse();

  let streak = 0;
  let currentDate = new Date();

  for (let i = 0; i < dates.length; i++) {
    const assessmentDate = new Date(dates[i]);
    const diffTime = currentDate.getTime() - assessmentDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === i) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}