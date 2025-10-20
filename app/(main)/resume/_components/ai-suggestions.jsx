// app/(main)/resume/_components/ai-suggestions.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, TrendingUp, Copy, CheckCircle } from "lucide-react";

const suggestions = [
  {
    id: 1,
    type: "summary",
    title: "Professional Summary",
    suggestion: "Results-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable solutions and leading cross-functional teams.",
    impact: "high",
    category: "content"
  },
  {
    id: 2,
    type: "skills",
    title: "Skills Optimization",
    suggestion: "Group skills by category: Frontend (React, Vue, TypeScript), Backend (Node.js, Python, AWS), Tools (Git, Docker, Jenkins)",
    impact: "medium",
    category: "organization"
  },
  {
    id: 3,
    type: "achievements",
    title: "Achievement Statements",
    suggestion: "Use action verbs and quantify results: 'Increased performance by 40%', 'Reduced costs by $50K', 'Led team of 5 developers'",
    impact: "high",
    category: "writing"
  },
  {
    id: 4,
    type: "keywords",
    title: "ATS Keywords",
    suggestion: "Include keywords: Agile Methodology, CI/CD, Microservices, REST APIs, Cloud Computing, DevOps",
    impact: "medium",
    category: "optimization"
  }
];

export function AISuggestions({ onApplySuggestion, darkMode = false }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (suggestion, id) => {
    await navigator.clipboard.writeText(suggestion);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "content": return <Sparkles className="h-4 w-4" />;
      case "organization": return <Target className="h-4 w-4" />;
      case "writing": return <TrendingUp className="h-4 w-4" />;
      case "optimization": return <Zap className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const cardClassName = darkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white";

  const headerClassName = darkMode
    ? "from-gray-700 to-green-900/50 border-gray-700"
    : "from-gray-50 to-green-50/50 border-gray-200";

  const suggestionCardClassName = darkMode
    ? "border-gray-600 bg-gray-700/50"
    : "border-gray-200 bg-white/50";

  return (
    <Card className={`border-0 shadow-xl ${cardClassName}`}>
      <CardHeader className={`bg-gradient-to-r border-b ${headerClassName}`}>
        <CardTitle className={`flex items-center gap-2 text-lg ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          <Sparkles className="h-5 w-5" />
          AI Suggestions
        </CardTitle>
        <p className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          Smart recommendations to improve your resume
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border backdrop-blur-sm ${suggestionCardClassName}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getCategoryIcon(item.category)}
                <h4 className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>{item.title}</h4>
              </div>
              <Badge variant="outline" className={getImpactColor(item.impact)}>
                {item.impact === "high" ? "High Impact" : "Medium Impact"}
              </Badge>
            </div>
            
            <p className={`text-sm mb-4 leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              {item.suggestion}
            </p>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onApplySuggestion(item)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Apply Suggestion
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(item.suggestion, item.id)}
                className={darkMode ? "bg-gray-600 border-gray-500 text-white" : ""}
              >
                {copiedId === item.id ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copiedId === item.id ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            size="sm"
            className={`w-full ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate More Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}