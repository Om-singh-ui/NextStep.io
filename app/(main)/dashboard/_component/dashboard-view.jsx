"use client";

import React, { useState, useEffect, useRef } from "react";
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

  // Get demand level colors that work in both themes
  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-green-400 to-emerald-600 dark:from-green-500 dark:to-emerald-700";
      case "medium":
        return "bg-gradient-to-r from-amber-400 to-orange-600 dark:from-amber-500 dark:to-orange-700";
      case "low":
        return "bg-gradient-to-r from-rose-400 to-red-600 dark:from-rose-500 dark:to-red-700";
      default:
        return "bg-gradient-to-r from-slate-400 to-gray-600 dark:from-slate-500 dark:to-gray-700";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { 
          icon: TrendingUp, 
          color: "text-green-500 dark:text-green-400", 
          bg: "from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700",
          text: "text-green-600 dark:text-green-300"
        };
      case "neutral":
        return { 
          icon: TrendingUp, 
          color: "text-amber-500 dark:text-amber-400", 
          bg: "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700",
          text: "text-amber-600 dark:text-amber-300"
        };
      case "negative":
        return { 
          icon: TrendingDown, 
          color: "text-rose-500 dark:text-rose-400", 
          bg: "from-rose-500 to-red-600 dark:from-rose-600 dark:to-red-700",
          text: "text-rose-600 dark:text-rose-300"
        };
      default:
        return { 
          icon: TrendingUp, 
          color: "text-slate-500 dark:text-slate-400", 
          bg: "from-slate-500 to-gray-600 dark:from-slate-600 dark:to-gray-700",
          text: "text-slate-600 dark:text-slate-300"
        };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;
  const outlookBg = getMarketOutlookInfo(insights.marketOutlook).bg;
  const outlookText = getMarketOutlookInfo(insights.marketOutlook).text;

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
    const doc = document.documentElement;
    const requestFullScreen = doc.requestFullscreen || 
                             doc.webkitRequestFullscreen || 
                             doc.msRequestFullscreen;
    
    if (!document.fullscreenElement && !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
      requestFullScreen.call(doc).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      const exitFullScreen = document.exitFullscreen || 
                            document.webkitExitFullscreen || 
                            document.msExitFullscreen;
      if (exitFullScreen) {
        exitFullScreen.call(document);
        setIsFullScreen(false);
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!(document.fullscreenElement || 
                        document.webkitFullscreenElement || 
                        document.msFullscreenElement));
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

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
          <h1 className="text-3xl font-bold font-plus-jakarta bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
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

      {/* Market Overview Cards */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MotionCard 
          variants={cardVariants}
          whileHover="hover"
          className="overflow-hidden border-0 shadow-lg"
        >
          <CardHeader className={`pb-3 bg-gradient-to-r ${outlookBg} text-white`}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Market Outlook</CardTitle>
              <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
            </div>
            <CardDescription className="text-white/80 capitalize">
              {insights.marketOutlook}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className={`text-3xl font-bold ${outlookText}`}>
              {insights.growthRate.toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Annual Growth Rate
            </p>
          </CardContent>
        </MotionCard>

        <MotionCard 
          variants={cardVariants}
          whileHover="hover"
          custom={1}
          className="overflow-hidden border-0 shadow-lg"
        >
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Demand Level</CardTitle>
              <BriefcaseIcon className="h-5 w-5" />
            </div>
            <CardDescription className="text-white/80 capitalize">
              {insights.demandLevel}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className={`text-3xl font-bold ${getMarketOutlookInfo(insights.demandLevel).text}`}>
              {insights.demandLevel}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Current Market Demand
            </p>
          </CardContent>
        </MotionCard>

        <MotionCard 
          variants={cardVariants}
          whileHover="hover"
          custom={2}
          className="overflow-hidden border-0 shadow-lg"
        >
          <CardHeader className="pb-3 bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Top Skills</CardTitle>
              <Brain className="h-5 w-5" />
            </div>
            <CardDescription className="text-white/80">
              In Highest Demand
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
              {insights.topSkills.length}+
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Skills Tracked
            </p>
          </CardContent>
        </MotionCard>

        <MotionCard 
          variants={cardVariants}
          whileHover="hover"
          custom={3}
          className="overflow-hidden border-0 shadow-lg"
        >
          <CardHeader className="pb-3 bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Next Update</CardTitle>
              <Calendar className="h-5 w-5" />
            </div>
            <CardDescription className="text-white/80">
              Scheduled Refresh
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {nextUpdateDistance}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Data will be updated
            </p>
          </CardContent>
        </MotionCard>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl backdrop-blur-sm">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Skills Analysis
          </TabsTrigger>
          <TabsTrigger value="salaries" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Salary Trends
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Market Trends
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionCard 
              variants={cardVariants}
              whileHover="hover"
              className="border-0 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Growth Trend
                </CardTitle>
                <CardDescription>
                  Monthly performance over the last year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)'
                        }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard 
              variants={cardVariants}
              whileHover="hover"
              className="border-0 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Skill Demand Distribution
                </CardTitle>
                <CardDescription>
                  Most in-demand skills in the current market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </MotionCard>
          </div>

          <MotionCard 
            variants={cardVariants}
            whileHover="hover"
            className="border-0 shadow-lg"
          >
            <CardHeader>
              <CardTitle>Top In-Demand Skills</CardTitle>
              <CardDescription>
                Skills with the highest market demand and growth potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card/50 backdrop-blur-sm"
                  >
                    <div className={`flex-shrink-0 w-3 h-3 rounded-full ${getDemandLevelColor("high")}`}></div>
                    <span className="font-medium">{skill}</span>
                    <Badge variant="secondary" className="ml-auto">
                      +24%
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>

        {/* Skills Analysis Tab */}
        <TabsContent value="skills" className="space-y-6">
          <MotionCard 
            variants={cardVariants}
            whileHover="hover"
            className="border-0 shadow-lg"
          >
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>
                Compare your current skills with market demands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Your Current Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'].map((skill, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Recommended Skills to Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {filteredRecommendedSkills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>

        {/* Salary Trends Tab */}
        <TabsContent value="salaries" className="space-y-6">
          <MotionCard 
            variants={cardVariants}
            whileHover="hover"
            className="border-0 shadow-lg"
          >
            <CardHeader>
              <CardTitle>Salary Ranges by Role (in $K)</CardTitle>
              <CardDescription>
                Annual salary ranges for key positions in the market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salaryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <Bar dataKey="min" fill="#8884d8" name="Minimum Salary" />
                    <Bar dataKey="median" fill="#82ca9d" name="Median Salary" />
                    <Bar dataKey="max" fill="#ffc658" name="Maximum Salary" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>

        {/* Market Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <MotionCard 
            variants={cardVariants}
            whileHover="hover"
            className="border-0 shadow-lg"
          >
            <CardHeader>
              <CardTitle>Emerging Technology Trends</CardTitle>
              <CardDescription>
                Technologies expected to grow in importance over the next 2 years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { name: 'AI/ML', current: 40, future: 85 },
                      { name: 'Cloud Computing', current: 60, future: 90 },
                      { name: 'Cybersecurity', current: 50, future: 88 },
                      { name: 'IoT', current: 30, future: 75 },
                      { name: 'Blockchain', current: 25, future: 65 },
                      { name: 'AR/VR', current: 20, future: 70 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <Line type="monotone" dataKey="current" stroke="#8884d8" name="Current Adoption" strokeWidth={2} />
                    <Line type="monotone" dataKey="future" stroke="#82ca9d" name="Future Projection" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </MotionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardView;