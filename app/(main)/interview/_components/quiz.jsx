"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) setAnswers(new Array(quizData.length).fill(null));
  }, [quizData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else finishQuiz();
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) correct++;
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("🎉 Quiz completed!");
      setCelebrate(true);
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setCelebrate(false);
    generateQuizFn();
    setResultData(null);
  };

  if (generatingQuiz)
    return <div className="mt-4"><ClipLoader size={28} color="#2563EB" /></div>;

  if (resultData)
    return <QuizResult result={resultData} onStartNew={startNewQuiz} />;

  if (!quizData)
    return (
      <Card className="mx-2 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-950/20 border border-blue-200/50 dark:border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground text-lg leading-relaxed">
            This quiz contains <span className="font-semibold text-blue-600 dark:text-blue-400">10 questions</span> specific to your industry and skills.
            Take your time and choose the best answer for each question.
          </p>
        </CardContent>

        <CardFooter>
          <Button
            onClick={generateQuizFn}
            className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="relative z-10">🚀 Start Quiz</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </CardFooter>
      </Card>

    );

  const question = quizData[currentQuestion];

  return (
    <motion.div className="relative">
      {/* Celebration Sparkles */}
      {celebrate && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-yellow-400"
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{ x: Math.random() * 200 - 100, y: -150 - Math.random() * 100, scale: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop", delay: i * 0.2 }}
            />
          ))}
          <Sparkles size={48} className="text-yellow-400" />
        </motion.div>
      )}

      <Card className="mx-2 shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Progress bar */}
        <div className="px-6 pt-4">
          <Progress
            value={((currentQuestion + 1) / quizData.length) * 100}
            className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
          >
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </Progress>
        </div>

        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-medium mb-4">{question.question}</p>

              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[currentQuestion]}
                className="space-y-3"
              >
                {question.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === option;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03, boxShadow: "0 0 12px rgba(59,130,246,0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${isSelected
                          ? "border-blue-500 bg-blue-100 dark:bg-blue-900/20 shadow-lg"
                          : "border-muted hover:bg-muted/20"
                        }`}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </motion.div>
                  );
                })}
              </RadioGroup>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border flex gap-2"
                >
                  <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Explanation:</p>
                    <p className="text-muted-foreground">{question.explanation}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          {!showExplanation && (
            <Button
              onClick={() => setShowExplanation(true)}
              variant="outline"
              disabled={!answers[currentQuestion]}
            >
              Show Explanation
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || savingResult}
            className="ml-auto"
          >
            {savingResult ? (
              <ClipLoader size={18} color="white" />
            ) : currentQuestion < quizData.length - 1 ? (
              "Next Question"
            ) : (
              "Finish Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
