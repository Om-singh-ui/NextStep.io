"use client";

import { Trophy, CheckCircle2, XCircle, Clock, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useMemo, memo } from "react";

// Memoized question item to prevent unnecessary re-renders
const QuestionItem = memo(({ question, index }) => (
  <motion.div
    className={`border rounded-xl p-4 space-y-3 transition-all duration-300 ${
      question.isCorrect 
        ? "bg-green-50/50 border-green-200 dark:bg-green-950/10 dark:border-green-800/30" 
        : "bg-red-50/50 border-red-200 dark:bg-red-950/10 dark:border-red-800/30"
    }`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(0.05 * index, 0.8), duration: 0.3 }}
  >
    <div className="flex items-start justify-between gap-2">
      <p className="font-medium text-slate-900 dark:text-slate-100 flex-1 text-sm">
        {question.question}
      </p>
      {question.isCorrect ? (
        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
      )}
    </div>
    
    <div className="text-sm space-y-1">
      <p className="text-slate-700 dark:text-slate-300">
        <span className="font-medium">Your answer:</span> {question.userAnswer}
      </p>
      {!question.isCorrect && (
        <p className="text-slate-700 dark:text-slate-300">
          <span className="font-medium">Correct answer:</span> {question.correctAnswer}
        </p>
      )}
    </div>
    
    {question.explanation && (
      <div className="text-sm bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">
          Explanation:
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          {question.explanation}
        </p>
      </div>
    )}
  </motion.div>
));

QuestionItem.displayName = 'QuestionItem';

function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
  timeSpent = 0
}) {
  if (!result) return null;

  // Memoized data extraction
  const { questions, stats } = useMemo(() => {
    let questions = [];
    let stats = { correctAnswers: 0, totalQuestions: 0 };

    if (result.questions) {
      if (Array.isArray(result.questions.questions)) {
        questions = result.questions.questions;
        stats = result.questions.stats || stats;
      } else if (Array.isArray(result.questions)) {
        questions = result.questions;
        stats.totalQuestions = questions.length;
        stats.correctAnswers = questions.filter(q => q && q.isCorrect === true).length;
      }
    }

    return { questions, stats };
  }, [result]);

  const { correctAnswers, totalQuestions } = stats;

  // Memoized badge
  const scoreBadge = useMemo(() => {
    const score = result.quizScore || 0;
    if (score >= 80) {
      return <Badge className="bg-green-500/20 text-green-600 border-green-200">Excellent! 🎉</Badge>;
    }
    if (score >= 60) {
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-200">Good Job! 👍</Badge>;
    }
    return <Badge className="bg-red-500/20 text-red-600 border-red-200">Keep Practicing! 💪</Badge>;
  }, [result.quizScore]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mx-auto space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quiz Completed!
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          You've completed {totalQuestions} questions
        </p>
      </motion.div>

      <CardContent className="space-y-6 md:space-y-8">
        {/* Score Overview */}
        <motion.div
          className="text-center space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex justify-center items-baseline gap-2">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              {result.quizScore?.toFixed(1) || "0"}%
            </h2>
            <span className="text-lg text-slate-600 dark:text-slate-400">
              Score
            </span>
          </div>
          
          <Progress 
            value={result.quizScore || 0} 
            className="w-full h-3 bg-slate-200 dark:bg-slate-700"
          />
          
          <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>{correctAnswers}/{totalQuestions} Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeSpent)}</span>
            </div>
          </div>
          
          <div className="pt-2">{scoreBadge}</div>
        </motion.div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <motion.div
            className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Improvement Tip
                </p>
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  {result.improvementTip}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Questions Review - Virtual scrolling for large sets */}
        {questions.length > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
              📖 Detailed Review ({questions.length} questions)
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {questions.map((q, index) => (
                <QuestionItem key={`question-${index}`} question={q} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>

      {/* Start New Quiz */}
      {!hideStartNew && (
        <CardFooter>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button
              onClick={onStartNew}
              className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base font-semibold"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5" />
                Start New Quiz
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </CardFooter>
      )}
    </div>
  );
}

export default memo(QuizResult);