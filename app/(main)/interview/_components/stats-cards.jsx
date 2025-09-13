"use client";

import { Brain, Target, Trophy, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

export default function StatsCards({ assessments }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce((sum, a) => sum + a.quizScore, 0);
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => assessments?.[0] || null;

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce((sum, a) => sum + a.questions.length, 0);
  };

  const getScoreTrend = () => {
    if (!assessments?.length || assessments.length < 2) return 0;
    const [latest, previous] = assessments.slice(0, 2);
    const trend = latest.quizScore - previous.quizScore;
    return trend > 0 ? 1 : trend < 0 ? -1 : 0;
  };

  const cards = [
    {
      title: "Average Score",
      value: `${getAverageScore()}%`,
      subtitle: "Across all assessments",
      icon: <Trophy className="h-6 w-6" />,
      color: "from-amber-400 to-orange-500",
      progress: getAverageScore(),
      trend: getScoreTrend(),
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions().toLocaleString(),
      subtitle: "Total questions answered",
      icon: <Brain className="h-6 w-6" />,
      color: "from-blue-400 to-indigo-500",
      progress: Math.min(100, (getTotalQuestions() / 500) * 100),
    },
    {
      title: "Latest Score",
      value: `${getLatestAssessment()?.quizScore.toFixed(1) || 0}%`,
      subtitle: "Most recent assessment",
      icon: <Target className="h-6 w-6" />,
      color: "from-emerald-400 to-green-500",
      progress: getLatestAssessment()?.quizScore || 0,
      trend: getScoreTrend(),
    },
  ];

  const FloatingParticles = ({ cardIndex, isHovered }) => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            y: [0, -10, 0],
            x: [0, i % 2 === 0 ? 6 : -6, 0],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + i * 10}%`,
            background:
              cardIndex === 0
                ? "linear-gradient(45deg, #f59e0b, #f97316)"
                : cardIndex === 1
                ? "linear-gradient(45deg, #3b82f6, #6366f1)"
                : "linear-gradient(45deg, #10b981, #059669)",
          }}
        />
      ))}
    </>
  );

  return (
    <div className="grid gap-6 md:grid-cols-3 p-4 max-w-6xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          whileHover={{ scale: 1.05, rotateX: 3, rotateY: -3 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`relative rounded-2xl border border-transparent transition-all duration-300 cursor-pointer overflow-hidden bg-transparent`}
          style={{
            boxShadow:
              hoveredCard === index
                ? `0 0 20px 4px var(--tw-gradient-stops)`
                : "0 4px 15px rgba(0,0,0,0.08)",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.color}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredCard === index ? 0.6 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <FloatingParticles cardIndex={index} isHovered={hoveredCard === index} />

          <div className="relative p-6 z-10">
            <Card className="shadow-none border-0 bg-transparent">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <motion.div
                  className={`p-3 rounded-full bg-gradient-to-br ${card.color} text-white shadow-lg relative overflow-hidden`}
                  whileHover={{ rotate: 8, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {card.icon}
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%", y: "-100%" }}
                    whileHover={{ x: "200%", y: "200%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {card.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <motion.div
                      className="text-3xl font-bold text-gray-800 dark:text-white"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {card.value}
                    </motion.div>
                    <p className="text-sm text-muted-foreground mt-2">{card.subtitle}</p>
                  </div>

                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        className="fill-none stroke-gray-200 dark:stroke-gray-700"
                        strokeWidth="2"
                      />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        className="fill-none stroke-current"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: card.progress / 100 }}
                        transition={{ duration: 1.2, delay: 0.3 + index * 0.2 }}
                        style={{
                          color:
                            index === 0
                              ? "#f59e0b"
                              : index === 1
                              ? "#3b82f6"
                              : "#10b981",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
                      {card.progress}%
                    </div>

                    {card.progress > 80 && (
                      <motion.div
                        className="absolute -top-1 -right-1"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                      >
                        <Sparkles
                          size={14}
                          className={
                            index === 0
                              ? "text-amber-500"
                              : index === 1
                              ? "text-blue-500"
                              : "text-emerald-500"
                          }
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {card.trend !== undefined && card.trend !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                    className={`flex items-center mt-4 text-sm font-medium ${
                      card.trend > 0 ? "text-green-600" : "text-rose-600"
                    }`}
                  >
                    {card.trend > 0 ? (
                      <>
                        <TrendingUp size={16} className="mr-1" />
                        <span>
                          +{Math.abs(assessments[0].quizScore - assessments[1].quizScore).toFixed(1)}%
                          from last
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown size={16} className="mr-1" />
                        <span>
                          {Math.abs(assessments[0].quizScore - assessments[1].quizScore).toFixed(1)}%
                          from last
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
