// nextstep.io/components/trust-apply/negotiate/salary-range.jsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { calculateMarketSalary } from "@/lib/utils/salary-calculator"

export function SalaryRange({ jobTitle, experience }) {
  const [salaryData, setSalaryData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (jobTitle && experience) {
      setLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        const data = calculateMarketSalary(jobTitle, experience)
        setSalaryData(data)
        setLoading(false)
      }, 500)
    }
  }, [jobTitle, experience])

  if (!jobTitle || !experience) {
    return null
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Market Salary Range</CardTitle>
          <CardDescription>Calculating...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!salaryData) {
    return null
  }

  const { range, percentile, confidence, location } = salaryData

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Market Salary Range</CardTitle>
        <CardDescription>
          Based on {experience} experience in {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Range</span>
            <span className="text-lg font-bold text-green-600">
              ${range.min.toLocaleString()} - ${range.max.toLocaleString()}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${percentile}%`,
                background: percentile > 80 ? '#22c55e' : percentile > 60 ? '#eab308' : '#ef4444'
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>25th percentile</span>
            <span>Market Average</span>
            <span>75th percentile</span>
          </div>

          <div className="flex justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Confidence: </span>
              <span className={confidence > 80 ? 'text-green-600' : 'text-yellow-600'}>
                {confidence}%
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Data Source: </span>
              <span>Market Aggregated</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}