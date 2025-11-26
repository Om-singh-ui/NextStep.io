// nextstep.io/components/trust-apply/scan/scan-result.jsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export function ScanResult({ result }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreVariant = (score) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Authenticity Assessment
          <Badge variant={getScoreVariant(result.authenticityScore)}>
            Score: {result.authenticityScore}/100
          </Badge>
        </CardTitle>
        <CardDescription>
          Detailed analysis of the job posting's authenticity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className={`text-6xl font-bold ${getScoreColor(result.authenticityScore)} mb-2`}>
            {result.authenticityScore}
          </div>
          <div className="text-lg font-medium text-muted-foreground">
            Authenticity Score
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-semibold">Job Details</h4>
            {result.jobDetails && (
              <div className="text-sm space-y-1">
                <div><strong>Title:</strong> {result.jobDetails.title}</div>
                <div><strong>Company:</strong> {result.jobDetails.company}</div>
                <div><strong>Location:</strong> {result.jobDetails.location}</div>
                <div><strong>Salary:</strong> {result.jobDetails.salary}</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Risk Assessment</h4>
            <div className="text-sm">
              <div><strong>Level:</strong> {result.riskLevel}</div>
              <div><strong>Confidence:</strong> {result.confidence}%</div>
              <div><strong>Flags Detected:</strong> {result.riskFlags?.length || 0}</div>
            </div>
          </div>
        </div>

        {result.summary && (
          <div>
            <h4 className="font-semibold mb-2">Summary</h4>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}