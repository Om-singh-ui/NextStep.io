"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function Quiz({ onQuizComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const router = useRouter();

  const startQuiz = async () => {
    setLoading(true);
    try {
      // Generate 10 questions
      const questions = await generateQuiz(10);
      setQuizData(questions);
      setAnswers(new Array(questions.length).fill(null));
      setStartTime(Date.now());
    } catch (error) {
      toast.error(error.message || "Failed to generate quiz");
    }
    setLoading(false);
  };

  const handleAnswer = useCallback((answer) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  }, [currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  }, [currentQuestion, quizData]);

  const finishQuiz = async () => {
    if (!quizData || !startTime) return;
    
    setSaving(true);
    try {
      const endTime = Date.now();
      const totalTime = Math.round((endTime - startTime) / 1000);
      setTimeSpent(totalTime);

      const correctAnswers = answers.filter((answer, index) => 
        answer === quizData[index].correctAnswer
      ).length;
      
      const score = Math.round((correctAnswers / quizData.length) * 100);
      
      const result = await saveQuizResult({
        questions: quizData,
        answers,
        score,
        timeSpent: totalTime,
        totalQuestions: quizData.length,
        correctAnswers
      });
      
      const completeResult = { ...result, timeSpent: totalTime };
      setResult(completeResult);
      
      // Notify parent component about the new assessment
      if (onQuizComplete) {
        onQuizComplete(completeResult);
      }
      
      toast.success("Quiz completed! Your progress has been updated.");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz result");
    }
    setSaving(false);
  };

  const navigateQuestion = useCallback((direction) => {
    if (direction === 'next') {
      nextQuestion();
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  }, [nextQuestion, currentQuestion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!quizData) return;
      
      if (e.key === 'ArrowRight' && answers[currentQuestion]) {
        navigateQuestion('next');
      } else if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        navigateQuestion('prev');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [quizData, currentQuestion, answers, navigateQuestion]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BarLoader width={200} color="#3b82f6" />
          <p className="mt-4">Generating your 10-question quiz...</p>
        </CardContent>
      </Card>
    );
  }

  if (!quizData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Take this 10-question technical quiz to assess your skills.</p>
          <ul className="mt-2 text-sm text-muted-foreground space-y-1">
            <li>• 10 carefully selected questions</li>
            <li>• Instant feedback and scoring</li>
            <li>• Performance tracking</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button onClick={startQuiz} className="w-full" size="lg">
            Start 10-Question Quiz
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/interview')}
            className="w-full"
          >
            Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{result.quizScore}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {result.correctAnswers}/{quizData.length}
              </div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
          </div>
          {result.improvementTip && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                💡 {result.improvementTip}
              </p>
            </div>
          )}
          <div className="text-center text-sm text-muted-foreground">
            Time spent: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            onClick={() => {
              setQuizData(null);
              setResult(null);
              setCurrentQuestion(0);
              setAnswers([]);
              setTimeSpent(0);
            }} 
            className="w-full"
          >
            Start New Quiz
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push('/interview')}
            className="w-full"
          >
            View Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            Question {currentQuestion + 1} of {quizData.length}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 font-medium text-base">{question.question}</p>
        <RadioGroup 
          onValueChange={handleAnswer} 
          value={answers[currentQuestion] || ""}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer text-sm"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentQuestion === 0}
          onClick={() => navigateQuestion('prev')}
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={() => navigateQuestion('next')}
          disabled={!answers[currentQuestion] || saving}
          size="sm"
        >
          {saving ? "Saving..." : currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
        </Button>
      </CardFooter>
    </Card>
  );
}