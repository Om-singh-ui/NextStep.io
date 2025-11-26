// nextstep.io/components/trust-apply/scan/scan-progress.jsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, FileText, Search, CheckCircle2, AlertTriangle } from "lucide-react"

const steps = [
  { 
    text: "Processing input...", 
    icon: FileText,
    description: "Reading and preparing your job posting for analysis"
  },
  { 
    text: "Extracting text content...", 
    icon: Search,
    description: "Converting your input into analyzable text format"
  },
  { 
    text: "Analyzing risk factors...", 
    icon: AlertTriangle,
    description: "Scanning for common scam patterns and red flags"
  },
  { 
    text: "Checking company credibility...", 
    icon: Shield,
    description: "Verifying company information and online presence"
  },
  { 
    text: "Generating final assessment...", 
    icon: CheckCircle2,
    description: "Compiling results and generating recommendations"
  },
]

export function ScanProgress() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(progressTimer)
          return 100
        }
        const diff = Math.random() * 8 + 2 // 2-10% increments
        return Math.min(oldProgress + diff, 100)
      })
    }, 600)

    const stepTimer = setInterval(() => {
      setCurrentStep((oldStep) => {
        if (oldStep === steps.length - 1) {
          clearInterval(stepTimer)
          return oldStep
        }
        return oldStep + 1
      })
    }, 2000)

    return () => {
      clearInterval(progressTimer)
      clearInterval(stepTimer)
    }
  }, [])

  const CurrentIcon = steps[currentStep]?.icon || Shield

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-2xl">Analyzing Job Posting</CardTitle>
            <CardDescription>
              We're carefully examining the job posting for authenticity indicators and potential risks
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>

            {/* Current Step */}
            <div className="text-center space-y-4">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3"
              >
                <CurrentIcon className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-sm">{steps[currentStep]?.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {steps[currentStep]?.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Loading Animation */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="h-2 w-2 rounded-full bg-blue-600"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
              <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
                💡 <strong>Tip:</strong> While we analyze, research the company on LinkedIn and Glassdoor for additional verification
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}