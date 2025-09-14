"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

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

  const handleAnswer = useCallback((answer) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  }, [currentQuestion]);

  const calculateScore = useCallback(() => {
    if (!quizData) return 0;
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) correct++;
    });
    return (correct / quizData.length) * 100;
  }, [quizData, answers]);

  const finishQuiz = useCallback(async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("🎉 Quiz completed!");
      setCelebrate(true);
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  }, [quizData, answers, calculateScore, saveQuizResultFn]);

  const handleNext = useCallback(() => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  }, [currentQuestion, quizData, finishQuiz]);

  const startNewQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setCelebrate(false);
    generateQuizFn();
    setResultData(null);
  }, [generateQuizFn, setResultData]);

  // Early return for loading state
  if (generatingQuiz) {
    return (
      <div className="flex justify-center items-center mt-8">
        <ClipLoader size={32} color="#3b82f6" />
        <span className="ml-3 text-muted-foreground">Generating your quiz...</span>
      </div>
    );
  }

  // Show results if available
  if (resultData) {
    return <QuizResult result={resultData} onStartNew={startNewQuiz} />;
  }

  // Show initial state if no quiz data
  if (!quizData) {
    return (
      <Card className="mx-auto max-w-md shadow-lg rounded-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-950/20 border border-blue-200/50 dark:border-slate-700/50 overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Ready to test your knowledge?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            This quiz contains 10 questions specific to your industry and skills.
            Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateQuizFn}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl"
            disabled={generatingQuiz}
          >
            {generatingQuiz ? (
              <>
                <ClipLoader size={16} color="white" className="mr-2" />
                Preparing Quiz...
              </>
            ) : (
              "🚀 Start Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  const progressValue = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Celebration Animation */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-yellow-400"
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.random() * 400 - 200,
                  y: -150 - Math.random() * 100,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
            <Sparkles size={48} className="text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="shadow-lg rounded-xl">
        {/* Progress bar */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progressValue)}%</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        <CardHeader>
          <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-medium mb-6">{question.question}</p>

              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[currentQuestion] || ""}
                className="space-y-3"
              >
                {question.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === option;
                  const isCorrect = option === question.correctAnswer;
                  const showCorrectness = showExplanation && isCorrect;
                  
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-muted hover:bg-muted/20"
                      } ${
                        showCorrectness ? "border-green-500 bg-green-50 dark:bg-green-900/20" : ""
                      }`}
                      onClick={() => !showExplanation && handleAnswer(option)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option} 
                          id={`option-${index}`} 
                          disabled={showExplanation}
                        />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                          {option}
                        </Label>
                        {showExplanation && showCorrectness && (
                          <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none">
                              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </RadioGroup>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border flex gap-3"
                >
                  <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300">Explanation:</p>
                    <p className="text-muted-foreground mt-1">{question.explanation}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between gap-3 flex-wrap">
          {!showExplanation ? (
            <Button
              onClick={() => setShowExplanation(true)}
              variant="outline"
              disabled={!answers[currentQuestion]}
              className="flex-1"
            >
              Show Explanation
            </Button>
          ) : (
            <div className="flex-1" /> // Spacer for layout
          )}
          
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || savingResult}
            className="min-w-[120px]"
          >
            {savingResult ? (
              <>
                <ClipLoader size={16} color="white" className="mr-2" />
                Saving...
              </>
            ) : currentQuestion < quizData.length - 1 ? (
              "Next Question"
            ) : (
              "Finish Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}