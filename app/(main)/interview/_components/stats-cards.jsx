"use client";

import { Brain, Target, Trophy, TrendingUp, TrendingDown, Sparkles, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function StatsCards({ assessments = [] }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Memoize calculations to prevent unnecessary re-renders
  const { averageScore, totalQuestions, latestAssessment, scoreTrend, streak } = useMemo(() => {
    const safeAssessments = assessments || [];
    
    // Calculate average score
    const avgScore = safeAssessments.length 
      ? (safeAssessments.reduce((sum, a) => sum + (a.quizScore || 0), 0) / safeAssessments.length).toFixed(1)
      : 0;
    
    // Calculate total questions
    const totalQ = safeAssessments.reduce((sum, a) => sum + ((a.totalQuestions || a.questions?.length) || 0), 0);
    
    // Get latest assessment
    const latest = safeAssessments[0] || null;
    
    // Calculate score trend
    let trend = 0;
    if (safeAssessments.length >= 2) {
      const [first, second] = safeAssessments.slice(0, 2);
      const trendValue = (first.quizScore || 0) - (second.quizScore || 0);
      trend = trendValue > 0 ? 1 : trendValue < 0 ? -1 : 0;
    }
    
    // Calculate streak
    let streakCount = 0;
    if (safeAssessments.length > 0) {
      const today = new Date().toDateString();
      const dates = [...new Set(safeAssessments.map(a => new Date(a.createdAt).toDateString()))].sort().reverse();
      
      let currentDate = new Date();
      
      for (let i = 0; i < dates.length; i++) {
        const assessmentDate = new Date(dates[i]);
        const diffTime = currentDate.getTime() - assessmentDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === i) {
          streakCount++;
        } else {
          break;
        }
      }
    }
    
    return {
      averageScore: avgScore,
      totalQuestions: totalQ,
      latestAssessment: latest,
      scoreTrend: trend,
      streak: streakCount
    };
  }, [assessments]);

  const cards = useMemo(() => [
    {
      title: "Average Score",
      value: `${averageScore}%`,
      subtitle: "Across all assessments",
      icon: <Trophy className="h-6 w-6" />,
      color: "from-amber-400 to-orange-500",
      progress: averageScore,
      trend: scoreTrend,
    },
    {
      title: "Questions Practiced",
      value: totalQuestions.toLocaleString(),
      subtitle: "Total questions answered",
      icon: <Brain className="h-6 w-6" />,
      color: "from-blue-400 to-indigo-500",
      progress: Math.min(100, (totalQuestions / 500) * 100),
    },
    {
      title: "Current Streak",
      value: `${streak} days`,
      subtitle: "Consecutive practice days",
      icon: <Flame className="h-6 w-6" />,
      color: "from-red-400 to-pink-500",
      progress: Math.min(100, (streak / 7) * 100),
    },
    {
      title: "Latest Score",
      value: `${latestAssessment?.quizScore?.toFixed(1) || 0}%`,
      subtitle: "Most recent assessment",
      icon: <Target className="h-6 w-6" />,
      color: "from-emerald-400 to-green-500",
      progress: latestAssessment?.quizScore || 0,
      trend: scoreTrend,
    },
  ], [averageScore, totalQuestions, latestAssessment, scoreTrend, streak]);

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
                : cardIndex === 2
                ? "linear-gradient(45deg, #ef4444, #ec4899)"
                : "linear-gradient(45deg, #10b981, #059669)",
          }}
        />
      ))}
    </>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 p-4 max-w-7xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative rounded-2xl border border-transparent transition-all duration-300 cursor-pointer overflow-hidden bg-transparent"
          style={{
            boxShadow: hoveredCard === index
              ? "0 0 20px 4px rgba(0, 0, 0, 0.1)"
              : "0 4px 15px rgba(0,0,0,0.08)",
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
                              : index === 2
                              ? "#ef4444"
                              : "#10b981",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300">
                      {Math.round(card.progress)}%
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
                              : index === 2
                              ? "text-red-500"
                              : "text-emerald-500"
                          }
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {card.trend !== undefined && card.trend !== 0 && assessments && assessments.length >= 2 && (
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