"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine,
  Label
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Target, Activity, Info, BarChart3 } from "lucide-react";

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="rounded-lg border-2 bg-background/95 backdrop-blur-md px-4 py-3 shadow-xl border-primary/20"
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        <p className="text-sm font-semibold text-foreground">
          Score: <span className="text-primary font-bold">{payload[0].value}%</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {label}
        </p>
        <div className="flex items-center mt-2 pt-2 border-t border-border/50">
          {payload[0].value >= 80 ? (
            <TrendingUp size={14} className="text-green-500 mr-1" />
          ) : payload[0].value >= 60 ? (
            <Activity size={14} className="text-amber-500 mr-1" />
          ) : (
            <Zap size={14} className="text-rose-500 mr-1" />
          )}
          <span className={`text-xs font-medium ${payload[0].value >= 80 ? 'text-green-500' : payload[0].value >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>
            {payload[0].value >= 80 ? 'Excellent' : payload[0].value >= 60 ? 'Good' : 'Needs improvement'}
          </span>
        </div>
      </motion.div>
    );
  }
  return null;
};

// Custom Animated Dot
const AnimatedDot = ({ cx, cy, index }) => {
  return (
    <motion.circle
      key={`dot-${index}`}
      cx={cx}
      cy={cy}
      r={5}
      fill="hsl(var(--primary))"
      stroke="white"
      strokeWidth={2}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [averageScore, setAverageScore] = useState(0);
  const [trend, setTrend] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const chartRef = useRef(null);

  // Memoized data processing
  const processedData = useMemo(() => {
    if (!assessments?.length) return [];
    
    return assessments.map((assessment, index) => ({
      date: format(new Date(assessment.createdAt), "MMM dd"),
      fullDate: format(new Date(assessment.createdAt), "MMM dd, yyyy"),
      score: assessment.quizScore,
      index: index,
    }));
  }, [assessments]);

  useEffect(() => {
    if (processedData.length) {
      setChartData(processedData);
      
      const total = processedData.reduce((sum, data) => sum + data.score, 0);
      const avg = total / processedData.length;
      setAverageScore(avg);
      
      if (processedData.length > 1) {
        const firstScore = processedData[0].score;
        const lastScore = processedData[processedData.length - 1].score;
        setTrend(lastScore > firstScore ? 1 : lastScore < firstScore ? -1 : 0);
      }
    }
  }, [processedData]);

  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        return document.documentElement.classList.contains('dark');
      }
      return false;
    };
    
    setIsDarkMode(checkDarkMode());
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(checkDarkMode());
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const getTrendText = useCallback(() => {
    if (chartData.length < 2) return "Not enough data";
    
    const firstScore = chartData[0].score;
    const lastScore = chartData[chartData.length - 1].score;
    const difference = lastScore - firstScore;
    const percentage = Math.abs(difference / firstScore * 100).toFixed(1);
    
    if (difference > 0) {
      return `+${percentage}% improvement`;
    } else if (difference < 0) {
      return `-${percentage}% decline`;
    } else {
      return "No change in performance";
    }
  }, [chartData]);

  const gridColor = isDarkMode ? "hsl(215, 28%, 17%)" : "hsl(220, 13%, 91%)";
  const textColor = isDarkMode ? "hsl(215, 20%, 65%)" : "hsl(215, 16%, 47%)";
  const primaryColor = "hsl(var(--primary))";
  const mutedColor = isDarkMode ? "hsl(215, 20%, 65%)" : "hsl(215, 16%, 47%)";

  // Memoized chart insights
  const chartInsights = useMemo(() => {
    if (chartData.length <= 2) return null;
    
    const insights = [];
    if (averageScore > 75) {
      insights.push({
        color: "green",
        text: "You're consistently scoring above average - great job!"
      });
    }
    if (trend > 0) {
      insights.push({
        color: "green",
        text: "Your scores are improving - keep up the good work!"
      });
    }
    if (chartData.some(d => d.score >= 90)) {
      insights.push({
        color: "amber",
        text: "You've achieved mastery in some topics"
      });
    }
    if (Math.max(...chartData.map(d => d.score)) - Math.min(...chartData.map(d => d.score)) > 30) {
      insights.push({
        color: "rose",
        text: "Your performance varies significantly across topics"
      });
    }
    
    return insights;
  }, [chartData, averageScore, trend]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card 
        className="relative shadow-2xl border border-border/40 backdrop-blur-xl bg-background/80 overflow-hidden"
        style={{
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 2px hsl(var(--primary)/0.1)" 
            : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: "all 0.3s ease",
          background: isDarkMode 
            ? "linear-gradient(145deg, hsl(224, 71%, 8%) 0%, hsl(224, 71%, 4%) 100%)" 
            : "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          border: isHovered ? "1px solid hsl(var(--primary)/0.3)" : "1px solid hsl(var(--border)/0.4)"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovered ? 0.3 : 0,
            background: "radial-gradient(50% 50% at 50% 50%, hsl(var(--primary)) 0%, transparent 100%)"
          }}
        />
        
        <CardHeader className="pb-3 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
                <motion.div
                  animate={{ rotate: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Target size={24} className="text-primary" />
                </motion.div>
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Performance Analytics
                </span>
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1 flex items-center gap-1">
                <BarChart3 size={14} />
                Track your learning progress over time
              </CardDescription>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-muted/50 cursor-help"
            >
              <Info size={16} className="text-muted-foreground" />
            </motion.div>
          </div>
          
          {/* Stats summary */}
          {chartData.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 mt-4 flex-wrap"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-primary/80"></div>
                <span className="text-sm text-muted-foreground">Average:</span>
                <span className="text-sm font-semibold">{averageScore.toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-sm text-muted-foreground">Best:</span>
                <span className="text-sm font-semibold">
                  {Math.max(...chartData.map(d => d.score))}%
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <span className="text-sm text-muted-foreground">Trend:</span>
                <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-500' : trend < 0 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {getTrendText()}
                </span>
              </div>
            </motion.div>
          )}
        </CardHeader>
        
        <CardContent className="pt-0 relative z-10">
          {chartData.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center text-muted-foreground text-sm">
              <Target size={48} className="opacity-30 mb-3" />
              <p>No performance data available yet</p>
              <p className="text-xs mt-1">Complete quizzes to see your progress</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="h-[300px] relative"
              ref={chartRef}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  onMouseMove={(e) => {
                    if (e.activePayload) {
                      setHoveredPoint(e.activePayload[0].payload);
                    }
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={primaryColor} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={primaryColor} stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={primaryColor} stopOpacity={isDarkMode ? 0.25 : 0.3} />
                      <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={gridColor}
                    opacity={0.5}
                    vertical={false}
                  />
                  
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: textColor }}
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 10, right: 10 }}
                  />
                  
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: textColor }}
                    axisLine={false}
                    tickLine={false}
                    tickCount={6}
                  />
                  
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Average reference line */}
                  <ReferenceLine 
                    y={averageScore} 
                    stroke={mutedColor}
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    opacity={0.7}
                  >
                    <Label 
                      value={`Avg: ${averageScore.toFixed(1)}%`} 
                      position="right" 
                      fontSize={11}
                      fill={textColor}
                    />
                  </ReferenceLine>
                  
                  {/* Area under the line for visual emphasis */}
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="transparent"
                    fill="url(#areaGradient)"
                    activeDot={false}
                  />
                  
                  {/* Main line */}
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={(props) => {
                      const { key, ...dotProps } = props;
                      return <AnimatedDot key={key} {...dotProps} />;
                    }}
                    activeDot={{
                      r: 8,
                      fill: primaryColor,
                      stroke: isDarkMode ? "hsl(224, 71%, 4%)" : "white",
                      strokeWidth: 2,
                      style: { 
                        filter: "drop-shadow(0px 0px 6px hsl(var(--primary)))",
                        transition: "all 0.2s ease"
                      }
                    }}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
              
              {/* Hover indicator line */}
              {hoveredPoint && (
                <motion.div 
                  className="absolute top-0 bottom-0 w-1 bg-primary/80 transform -translate-x-1/2 rounded-full" 
                  style={{ left: `${(hoveredPoint.index / (chartData.length - 1)) * 100}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              
              {/* Hover data point highlight */}
              {hoveredPoint && (
                <motion.div 
                  className="absolute px-3 py-2 rounded-md bg-background border border-border shadow-sm text-xs"
                  style={{ 
                    left: `${(hoveredPoint.index / (chartData.length - 1)) * 100}%`,
                    top: `${100 - hoveredPoint.score}%`,
                    transform: 'translate(-50%, -100%)',
                    marginTop: '-10px'
                  }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="font-semibold text-primary">{hoveredPoint.score}%</div>
                  <div className="text-muted-foreground">{hoveredPoint.fullDate}</div>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {/* Insights section */}
          {chartInsights && chartInsights.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Zap size={16} className="text-primary" />
                <span>Performance Insights</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1.5">
                {chartInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <span className={`text-${insight.color}-500 mr-2`}>•</span>
                    {insight.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}