"use client";

import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import QuizResult from "./quiz-result";
import { Trophy, Clock, BarChart3, ChevronRight, Sparkles, Zap } from "lucide-react";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const getScoreBadge = (score) => {
    if (score >= 80)
      return (
        <Badge className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white border-0 px-3 py-1 shadow-md animate-pulse">
          Excellent
        </Badge>
      );
    if (score >= 60)
      return (
        <Badge className="bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 text-white border-0 px-3 py-1 shadow-md animate-pulse">
          Good
        </Badge>
      );
    return (
      <Badge className="bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600 text-white border-0 px-3 py-1 shadow-md animate-pulse">
        Needs Improvement
      </Badge>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-400/15 via-emerald-500/15 to-green-600/15";
    if (score >= 60) return "from-amber-400/15 via-orange-500/15 to-orange-600/15";
    return "from-rose-400/15 via-pink-500/15 to-fuchsia-600/15";
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return "bg-gradient-to-b from-green-400 to-emerald-600";
    if (score >= 60) return "bg-gradient-to-b from-amber-400 to-orange-600";
    return "bg-gradient-to-b from-rose-400 to-pink-600";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Floating sparkles */}
        <motion.div
          className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full blur-sm"
          animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2 right-10 w-2 h-2 bg-indigo-400 rounded-full blur-sm"
          animate={{ y: [0, 5, 0], x: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-900/40">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 blur-3xl rounded-full -translate-y-16 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-2xl rounded-full -translate-x-12 translate-y-14"></div>

          <CardHeader className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="relative text-3xl md:text-4xl font-extrabold tracking-tight">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Recent Quizzes
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-fuchsia-600/10 blur-xl rounded-lg -z-0"></span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-purple-600/10 to-fuchsia-600/0 opacity-70 -z-0"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                  />
                </CardTitle>
                <CardDescription className="text-base mt-2 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <BarChart3 size={18} />
                  Review your quiz history & track progress in real-time
                </CardDescription>
              </div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push("/interview/mock")}
                  className="relative overflow-hidden px-8 py-3 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    <Zap size={18} className="group-hover:animate-pulse" />
                    Start New Quiz
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            {assessments?.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-full mb-4 shadow-inner">
                  <Trophy className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No quizzes yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Take your first quiz and see results instantly!
                </p>
                <Button
                  onClick={() => router.push("/interview/mock")}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Start Your First Quiz
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {assessments?.map((assessment, i) => (
                    <motion.div
                      key={assessment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                      whileHover={{ y: -8, rotateX: 2, rotateY: 2, scale: 1.02 }}
                      style={{ perspective: 800 }}
                      onHoverStart={() => setHoveredCard(assessment.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      <Card
                        className={`cursor-pointer border-0 shadow-md hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${getScoreColor(
                          assessment.quizScore
                        )} relative overflow-hidden group backdrop-blur-sm`}
                        onClick={() => setSelectedQuiz(assessment)}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl"
                          animate={{ x: hoveredCard === assessment.id ? "0%" : "-100%" }}
                          transition={{ duration: 0.5 }}
                        />

                        <div className="absolute left-0 top-0 bottom-0 w-1.5">
                          <motion.div
                            className={`w-full ${getScoreGradient(assessment.quizScore)}`}
                            initial={{ height: "0%" }}
                            animate={{ height: `${assessment.quizScore}%` }}
                            transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                          />
                        </div>

                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm"
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                  {i + 1}
                                </span>
                              </motion.div>
                              <CardTitle className="text-xl bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent font-semibold">
                                Quiz {i + 1}
                              </CardTitle>
                            </div>
                            {getScoreBadge(assessment.quizScore)}
                          </div>
                          <CardDescription className="flex flex-col md:flex-row md:justify-between w-full text-sm mt-3 gap-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${assessment.quizScore >= 80
                                  ? "bg-green-500"
                                  : assessment.quizScore >= 60
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                                  }`}
                              ></div>
                              <span className="font-medium">
                                Score:{" "}
                                <span
                                  className={`font-bold ${assessment.quizScore >= 80
                                    ? "text-green-600"
                                    : assessment.quizScore >= 60
                                      ? "text-amber-600"
                                      : "text-rose-600"
                                    }`}
                                >
                                  {assessment.quizScore.toFixed(1)}%
                                </span>
                              </span>
                            </div>
                            <div className="flex flex-col md:items-end text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>
                                  {format(new Date(assessment.createdAt), "MMMM dd, yyyy")}
                                </span>
                              </div>
                              <span className="text-xs">
                                {formatDistanceToNow(new Date(assessment.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                          </CardDescription>
                        </CardHeader>

                        {assessment.improvementTip && (
                          <CardContent className="pt-0">
                            <motion.div
                              className="flex items-start gap-2 p-3 rounded-lg bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm shadow-inner"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              whileHover={{ y: -2, scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 200, delay: i * 0.1 + 0.5 }}
                            >
                              <Sparkles size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium text-amber-600 dark:text-amber-400">
                                  Tip:{" "}
                                </span>
                                {assessment.improvementTip}
                              </p>
                            </motion.div>
                          </CardContent>
                        )}

                        <motion.div
                          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ x: hoveredCard === assessment.id ? 0 : 10 }}
                        >
                          <ChevronRight className="text-indigo-500" />
                        </motion.div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quiz Detail Dialog */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-0 shadow-xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Quiz Details
            </DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
