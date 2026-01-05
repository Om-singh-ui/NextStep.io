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

export function AISuggestions({ onApplySuggestion }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (suggestion, id) => {
    await navigator.clipboard.writeText(suggestion);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning-foreground border-warning/20";
      default: return "bg-primary/10 text-primary border-primary/20";
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

  return (
    <Card className="border-0 shadow-xl bg-card">
      <CardHeader className="bg-gradient-to-r border-b from-accent to-accent/50 border-border">
        <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
          <Sparkles className="h-5 w-5" />
          AI Suggestions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Smart recommendations to improve your resume
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border backdrop-blur-sm border-border bg-card/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getCategoryIcon(item.category)}
                <h4 className="font-semibold text-card-foreground">{item.title}</h4>
              </div>
              <Badge variant="outline" className={getImpactColor(item.impact)}>
                {item.impact === "high" ? "High Impact" : "Medium Impact"}
              </Badge>
            </div>
            
            <p className="text-sm mb-4 leading-relaxed text-card-foreground/80">
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
        
        <div className="pt-4 border-t border-border">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate More Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}