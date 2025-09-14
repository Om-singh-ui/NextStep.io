"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  // Early return if no result
  if (!result) return null;

  // Memoize badge to prevent unnecessary re-renders
  const scoreBadge = useMemo(() => {
    if (result.quizScore >= 80) {
      return <Badge className="bg-green-500/20 text-green-600">Excellent</Badge>;
    }
    if (result.quizScore >= 60) {
      return <Badge className="bg-yellow-500/20 text-yellow-600">Good</Badge>;
    }
    return <Badge className="bg-red-500/20 text-red-600">Needs Work</Badge>;
  }, [result.quizScore]);

  return (
    <div className="mx-auto space-y-6 max-w-4xl">
      {/* Header */}
      <motion.h1
        className="flex items-center gap-2 text-2xl md:text-3xl gradient-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Trophy className="h-6 w-6 md:h-7 md:w-7 text-yellow-500" />
        Quiz Results
      </motion.h1>

      <CardContent className="space-y-6 md:space-y-8">
        {/* Score Overview */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h2>
          <Progress value={result.quizScore} className="w-full" />
          <div className="pt-2">{scoreBadge}</div>
        </motion.div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <motion.div
            className="bg-muted p-4 rounded-lg border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className="font-medium">💡 Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </motion.div>
        )}

        {/* Questions Review */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h3 className="font-medium text-lg">📖 Question Review</h3>
          <div className="space-y-4">
            {result.questions.map((q, index) => (
              <motion.div
                key={`question-${index}`}
                className={`border rounded-lg p-4 space-y-3 transition-colors duration-300 ${
                  q.isCorrect ? "hover:bg-green-50/50" : "hover:bg-red-50/50"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(0.1 * index, 0.8), duration: 0.3 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{q.question}</p>
                  {q.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Your answer:</span> {q.userAnswer}
                  </p>
                  {!q.isCorrect && (
                    <p>
                      <span className="font-medium">Correct answer:</span> {q.answer}
                    </p>
                  )}
                </div>
                <div className="text-sm bg-muted/70 p-3 rounded-lg border">
                  <p className="font-medium">Explanation:</p>
                  <p>{q.explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </CardContent>

      {/* Start New Quiz */}
      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={onStartNew}
            className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="relative z-10">🚀 Start New Quiz</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </CardFooter>
      )}
    </div>
  );
}