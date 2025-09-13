"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  BriefcaseIcon,
  TrendingUp,
  TrendingDown,
  Brain,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Maximize,
  Minimize
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const MotionCard = motion(Card);

const DashboardView = ({ insights, dashboardConfig }) => {
  const [isUISuppressed, setIsUISuppressed] = useState(dashboardConfig?.dashboard?.suppressUI || false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("30d");
  const [isDataRefreshing, setIsDataRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Salary data transform
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  // Generate trend data for the line chart
  const trendData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 49 },
    { month: 'Apr', value: 58 },
    { month: 'May', value: 65 },
    { month: 'Jun', value: 72 },
    { month: 'Jul', value: 68 },
    { month: 'Aug', value: 74 },
    { month: 'Sep', value: 78 },
    { month: 'Oct', value: 82 },
    { month: 'Nov', value: 79 },
    { month: 'Dec', value: 85 },
  ];

  // Skill demand data for pie chart
  const skillData = [
    { name: 'React', value: 35 },
    { name: 'Node.js', value: 25 },
    { name: 'Python', value: 20 },
    { name: 'AWS', value: 15 },
    { name: 'UI/UX', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-green-400 to-emerald-600";
      case "medium":
        return "bg-gradient-to-r from-amber-400 to-orange-600";
      case "low":
        return "bg-gradient-to-r from-rose-400 to-red-600";
      default:
        return "bg-gradient-to-r from-slate-400 to-gray-600";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-400", bg: "from-green-500 to-emerald-600" };
      case "neutral":
        return { icon: TrendingUp, color: "text-amber-400", bg: "from-amber-500 to-orange-600" };
      case "negative":
        return { icon: TrendingDown, color: "text-rose-400", bg: "from-rose-500 to-red-600" };
      default:
        return { icon: TrendingUp, color: "text-slate-400", bg: "from-slate-500 to-gray-600" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;
  const outlookBg = getMarketOutlookInfo(insights.marketOutlook).bg;

  // Dates
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  // Motion animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.02, 
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
  };

  // Stagger animation for list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  // Handle data refresh
  const handleRefresh = () => {
    setIsDataRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsDataRefreshing(false);
    }, 1500);
  };

  // Toggle full screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Filter data based on search query
  const filteredSkills = insights.topSkills.filter(skill => 
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecommendedSkills = insights.recommendedSkills.filter(skill => 
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If UI is completely suppressed, return minimal text-only version
  if (isUISuppressed && dashboardConfig?.fallbackMode === "minimal-text-only") {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Market Insights Dashboard</h1>
        <div>
          <h2 className="font-semibold">Market Outlook: {insights.marketOutlook}</h2>
          <p>Growth Rate: {insights.growthRate.toFixed(1)}%</p>
          <p>Demand Level: {insights.demandLevel}</p>
          <p>Last Updated: {lastUpdatedDate}</p>
        </div>
        <div>
          <h3 className="font-semibold">Top Skills:</h3>
          <ul className="list-disc pl-5">
            {insights.topSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Salary Ranges:</h3>
          <ul className="list-disc pl-5">
            {insights.salaryRanges.map((range, index) => (
              <li key={index}>
                {range.role}: ${range.min/1000}K-${range.max/1000}K (Median: ${range.median/1000}K)
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 p-4 md:p-6 ${isFullScreen ? 'h-screen overflow-auto' : ''}`}>
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            Market Insights Dashboard
          </h1>
          <Badge
            variant="outline"
            className="backdrop-blur-sm bg-muted/30 border-border/60 px-3 py-1 rounded-full font-plus-jakarta font-semibold flex items-center gap-2"
          >
            <Calendar className="h-3.5 w-3.5" />
            Updated: {lastUpdatedDate}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isDataRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isDataRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleFullScreen}
            className="flex items-center gap-2"
          >
            {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsUISuppressed(!isUISuppressed)}
            className="flex items-center gap-2"
          >
            {isUISuppressed ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {isUISuppressed ? 'Show UI' : 'Hide UI'}
          </Button>
        </div>
      </motion.div>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-muted/30 rounded-xl p-4 border border-border/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time-range">Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="search">Search Skills</Label>
                <Input
                  id="search"
                  placeholder="Type to search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/30 p-1 rounded-xl backdrop-blur-sm border border-border/50">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Skills Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Market Trends
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Market Outlook */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`rounded-2xl backdrop-blur-xl bg-card/50 border border-primary/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden relative group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${outlookBg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
                <CardTitle className="text-sm font-medium font-plus-jakarta">
                  Market Outlook
                </CardTitle>
                <div className="p-1.5 rounded-lg bg-muted/30">
                  <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500"
                >
                  {insights.marketOutlook}
                </motion.div>
                <p className="text-xs text-muted-foreground/80 mt-2">
                  Next update {nextUpdateDistance}
                </p>
              </CardContent>
            </MotionCard>

            {/* Industry Growth */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: 0.1 }}
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-green-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
                <CardTitle className="text-sm font-medium font-plus-jakarta">
                  Industry Growth
                </CardTitle>
                <div className="p-1.5 rounded-lg bg-muted/30">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500">
                  {insights.growthRate.toFixed(1)}%
                </div>
                <motion.div
                  whileHover={{ scaleX: 1.05 }}
                  className="mt-3 h-2 w-full rounded-full bg-muted/20 overflow-hidden"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700 ease-out"
                    style={{ width: `${Math.min(insights.growthRate, 100)}%` }}
                  />
                </motion.div>
              </CardContent>
            </MotionCard>

            {/* Demand Level */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: 0.2 }}
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-violet-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
                <CardTitle className="text-sm font-medium font-plus-jakarta">
                  Demand Level
                </CardTitle>
                <div className="p-1.5 rounded-lg bg-muted/30">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                  {insights.demandLevel}
                </div>
                <motion.div 
                  whileHover={{ scaleX: 1.05 }}
                  className={`h-2 w-full rounded-full mt-3 overflow-hidden transition-all duration-500 ${getDemandLevelColor(insights.demandLevel)}`}
                />
              </CardContent>
            </MotionCard>

            {/* Top Skills */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: 0.3 }}
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-cyan-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
                <CardTitle className="text-sm font-medium font-plus-jakarta">
                  Top Skills
                </CardTitle>
                <div className="p-1.5 rounded-lg bg-muted/30">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2">
                  {filteredSkills.slice(0, 3).map((skill, index) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      key={skill}
                      className="cursor-pointer"
                    >
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-foreground/80 border border-cyan-400/40 backdrop-blur-sm font-plus-jakarta font-semibold hover:from-blue-500/30 hover:to-cyan-500/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-all duration-300"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                  {filteredSkills.length > 3 && (
                    <Badge variant="outline" className="rounded-full">
                      +{filteredSkills.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </MotionCard>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Salary Ranges */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-violet-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-plus-jakarta font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    Salary Ranges by Role
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    Displaying minimum, median, and maximum salaries (in thousands)
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-3 shadow-lg">
                                <p className="font-medium font-plus-jakarta text-foreground">
                                  {label}
                                </p>
                                {payload.map((item) => (
                                  <p
                                    key={item.name}
                                    className="text-sm text-foreground/80 font-plus-jakarta"
                                  >
                                    {item.name}: ${item.value}K
                                  </p>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="min"
                        fill="url(#minGradient)"
                        name="Min Salary (K)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="median"
                        fill="url(#medianGradient)"
                        name="Median Salary (K)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="max"
                        fill="url(#maxGradient)"
                        name="Max Salary (K)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c7d2fe" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                        <linearGradient id="medianGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                        <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#4f46e5" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>

            {/* Market Trends */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-blue-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-plus-jakarta font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                    Market Trends
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">
                    Industry growth over the past year
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="url(#trendGradient)"
                        fill="url(#trendFill)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>
          </div>

          {/* Industry Trends & Recommended Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trends */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-cyan-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                  Key Industry Trends
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">
                  Current trends shaping the industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {insights.keyTrends.map((trend, index) => (
                    <motion.li
                      key={index}
                      custom={index}
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="flex items-start space-x-3 group"
                    >
                      <div className="h-2 w-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0" />
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors duration-300 font-plus-jakarta">
                        {trend}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </MotionCard>

            {/* Recommended Skills */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-violet-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                  Recommended Skills
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">
                  Skills to consider developing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {filteredRecommendedSkills.map((skill, index) => (
                    <motion.div 
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                    >
                      <Badge
                        variant="outline"
                        className="rounded-xl px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-foreground/80 border border-violet-400/40 backdrop-blur-sm hover:from-violet-500/30 hover:to-fuchsia-500/30 hover:shadow-[0_0_12px_rgba(139,92,246,0.35)] transition-all duration-300 font-plus-jakarta font-semibold"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </MotionCard>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-violet-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl">
                  Salary Distribution
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of salary ranges across roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#9ca3af" 
                        fontSize={12} 
                        width={100}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      />
                      <Bar dataKey="min" fill="url(#minGradient)" name="Min Salary (K)" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="median" fill="url(#medianGradient)" name="Median Salary (K)" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="max" fill="url(#maxGradient)" name="Max Salary (K)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-blue-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl">
                  Skill Demand Distribution
                </CardTitle>
                <CardDescription>
                  Current market demand for key skills
                </CardDescription>
              </CardHeader>
                           <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>
          </div>

          {/* Detailed Trend Analysis */}
          <MotionCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="rounded-2xl backdrop-blur-xl bg-card/50 border border-green-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <CardHeader>
              <CardTitle className="font-plus-jakarta font-bold text-xl">
                Detailed Trend Analysis
              </CardTitle>
              <CardDescription>
                Monthly performance metrics with trend lines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9ca3af" 
                      fontSize={12}
                      fontFamily="Plus Jakarta Sans"
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      fontSize={12}
                      fontFamily="Plus Jakarta Sans"
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        backdropFilter: "blur(12px)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
                        fontFamily: "Plus Jakarta Sans",
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="url(#lineGradient)" 
                      strokeWidth={3} 
                      dot={{ r: 5, fill: "#22c55e" }}
                      activeDot={{ r: 8, stroke: "#22c55e", strokeWidth: 2, fill: "#fff" }}
                    />
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#84cc16" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>

        {/* Skills Analysis Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Skills Detailed */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-cyan-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl">
                  Top Skills Analysis
                </CardTitle>
                <CardDescription>
                  Most in-demand skills in the current market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSkills.map((skill, index) => (
                    <motion.div 
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium font-plus-jakarta">{skill}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-foreground/80 border border-cyan-400/40"
                      >
                        {85 - (index * 10)}% demand
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </MotionCard>

            {/* Skill Growth Potential */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-violet-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl">
                  Skill Growth Potential
                </CardTitle>
                <CardDescription>
                  Skills with the highest projected growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'AI/ML', value: 95 },
                        { name: 'Cloud Computing', value: 85 },
                        { name: 'Cybersecurity', value: 90 },
                        { name: 'Data Science', value: 88 },
                        { name: 'DevOps', value: 82 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis 
                        type="number" 
                        stroke="#9ca3af" 
                        fontSize={12}
                        domain={[0, 100]}
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#9ca3af" 
                        fontSize={12}
                        width={100}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        formatter={(value) => [`${value}%`, "Growth Potential"]}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="url(#growthGradient)"
                        radius={[0, 4, 4, 0]}
                      >
                        {[
                          { name: 'AI/ML', value: 95 },
                          { name: 'Cloud Computing', value: 85 },
                          { name: 'Cybersecurity', value: 90 },
                          { name: 'Data Science', value: 88 },
                          { name: 'DevOps', value: 82 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                      <defs>
                        <linearGradient id="growthGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>
          </div>

          {/* Skill Combinations */}
          <MotionCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="rounded-2xl backdrop-blur-xl bg-card/50 border border-amber-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <CardHeader>
              <CardTitle className="font-plus-jakarta font-bold text-xl">
                High-Value Skill Combinations
              </CardTitle>
              <CardDescription>
                Pairing these skills increases market value significantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { combo: "React + Node.js", value: "+35% salary premium" },
                  { combo: "Python + AWS", value: "+42% salary premium" },
                  { combo: "UI/UX + Frontend", value: "+28% salary premium" },
                  { combo: "Data Science + Cloud", value: "+45% salary premium" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/30 backdrop-blur-sm"
                  >
                    <h4 className="font-semibold font-plus-jakarta text-foreground/90 mb-1">
                      {item.combo}
                    </h4>
                    <p className="text-sm text-amber-500/80 font-plus-jakarta font-medium">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>

        {/* Market Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Analysis */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-blue-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl">
                  Regional Demand Analysis
                </CardTitle>
                <CardDescription>
                  Demand distribution across different regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { region: 'North America', demand: 85 },
                        { region: 'Europe', demand: 75 },
                        { region: 'Asia Pacific', demand: 90 },
                        { region: 'Middle East', demand: 65 },
                        { region: 'Africa', demand: 60 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis 
                        dataKey="region" 
                        stroke="#9ca3af" 
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                      />
                      <YAxis 
                        stroke="#9ca3af" 
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        formatter={(value) => [`${value}%`, "Demand Level"]}
                      />
                      <Bar 
                        dataKey="demand" 
                        fill="url(#regionGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="regionGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>

            {/* Future Projections */}
            <MotionCard
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="rounded-2xl backdrop-blur-xl bg-card/50 border border-green-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="font-plus-jakarta font-bold text-xl">
                  Future Market Projections
                </CardTitle>
                <CardDescription>
                  Expected growth over the next 3 years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { year: '2024', value: 75 },
                        { year: '2025', value: 82 },
                        { year: '2026', value: 88 },
                        { year: '2027', value: 92 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#9ca3af" 
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                      />
                      <YAxis 
                        stroke="#9ca3af" 
                        fontSize={12}
                        fontFamily="Plus Jakarta Sans"
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          backdropFilter: "blur(12px)",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                        formatter={(value) => [`${value}%`, "Market Growth"]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="url(#projectionStroke)" 
                        fill="url(#projectionFill)" 
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="projectionStroke" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                        <linearGradient id="projectionFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#16a34a" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>
          </div>

          {/* Emerging Technologies */}
          <MotionCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="rounded-2xl backdrop-blur-xl bg-card/50 border border-purple-400/30 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <CardHeader>
              <CardTitle className="font-plus-jakarta font-bold text-xl">
                Emerging Technologies Watchlist
              </CardTitle>
              <CardDescription>
                Technologies expected to impact the market significantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { tech: "Generative AI", impact: "High", growth: "87%" },
                  { tech: "Quantum Computing", impact: "Medium", growth: "63%" },
                  { tech: "Web3 & Blockchain", impact: "Medium", growth: "71%" },
                  { tech: "Edge Computing", impact: "High", growth: "79%" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-400/30 backdrop-blur-sm text-center"
                  >
                    <h4 className="font-bold font-plus-jakarta text-foreground/90 mb-2">
                      {item.tech}
                    </h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">Impact:</span>
                      <Badge 
                        variant="outline" 
                        className={
                          item.impact === "High" 
                            ? "bg-red-500/20 text-red-500 border-red-500/30" 
                            : "bg-amber-500/20 text-amber-500 border-amber-500/30"
                        }
                      >
                        {item.impact}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Growth:</span>
                      <span className="text-sm font-semibold text-purple-500/90">
                        {item.growth}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground/70 pt-4 border-t border-border/30"
      >
        <p className="font-plus-jakarta">
          Data sourced from multiple industry reports and market analysis. Last updated: {lastUpdatedDate}
        </p>
        <p className="mt-1 font-plus-jakarta">
          Next automatic update: {nextUpdateDistance}
        </p>
      </motion.div>
    </div>
  );
};

export default DashboardView;