// nextstep.io/components/trust-apply/scan/risk-indicator.jsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export function RiskIndicator({ score, riskLevel }) {
  const getRiskColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRiskIcon = (score) => {
    if (score >= 80) return CheckCircle
    if (score >= 60) return Shield
    return AlertTriangle
  }

  const getRiskMessage = (score) => {
    if (score >= 80) return 'This job appears legitimate and safe'
    if (score >= 60) return 'Proceed with caution and verify details'
    if (score >= 40) return 'Significant concerns detected'
    return 'High risk - consider avoiding this opportunity'
  }

  const RiskIcon = getRiskIcon(score)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <RiskIcon className={`h-4 w-4 ${getRiskColor(score)}`} />
          Risk Assessment
        </CardTitle>
        <CardDescription>Overall authenticity evaluation</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getRiskColor(score)} mb-2`}>
            {score}/100
          </div>
          <Badge 
            variant={
              score >= 80 ? 'default' : 
              score >= 60 ? 'secondary' : 
              'destructive'
            }
          >
            {riskLevel} Risk
          </Badge>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {getRiskMessage(score)}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>High Risk</span>
            <span>Low Risk</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${score}%`,
                background: 
                  score >= 80 ? '#22c55e' :
                  score >= 60 ? '#eab308' :
                  score >= 40 ? '#f97316' : '#ef4444'
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 text-xs text-center">
          <div className={`px-1 py-2 rounded ${score < 40 ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' : 'text-muted-foreground'}`}>
            Very High
          </div>
          <div className={`px-1 py-2 rounded ${score >= 40 && score < 60 ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300' : 'text-muted-foreground'}`}>
            High
          </div>
          <div className={`px-1 py-2 rounded ${score >= 60 && score < 80 ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' : 'text-muted-foreground'}`}>
            Medium
          </div>
          <div className={`px-1 py-2 rounded ${score >= 80 ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'text-muted-foreground'}`}>
            Low
          </div>
        </div>
      </CardContent>
    </Card>
  )
}