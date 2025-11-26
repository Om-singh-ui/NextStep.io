// nextstep.io/app/(dashboard)/trust-apply/scan/result/[scanId]/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ScanResult } from "@/components/trust-apply/scan/scan-result"
import { EvidenceList } from "@/components/trust-apply/scan/evidence-list"
import { RiskIndicator } from "@/components/trust-apply/scan/risk-indicator"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function ScanResultPage() {
  const params = useParams()
  const scanId = params.scanId
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get from local storage
    const history = JSON.parse(localStorage.getItem('trust-apply-scan-history') || '[]')
    const scanData = history.find(item => item.id === scanId)
    
    if (scanData) {
      // In a real app, you'd fetch the full result from your storage
      // For now, we'll simulate the data structure
      setResult({
        scanId,
        authenticityScore: scanData.score,
        riskLevel: scanData.riskLevel,
        jobDetails: { title: scanData.title },
        evidence: [],
        recommendations: [],
        strategyTips: []
      })
    }
    setLoading(false)
  }, [scanId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!result) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold">Scan not found</h2>
        <Button asChild className="mt-4">
          <Link href="/trust-apply/scan">Start New Scan</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 mt-20">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/trust-apply/scan">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Scan Results</h1>
          <p className="text-muted-foreground">Job: {result.jobDetails?.title}</p>
        </div>
        
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <ScanResult result={result} />
          <EvidenceList evidence={result.evidence} />
        </div>
        
        <div className="space-y-6">
          <RiskIndicator score={result.authenticityScore} riskLevel={result.riskLevel} />
          
          {/* Recommendations and strategy tips would go here */}
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <ul className="text-sm space-y-1">
              {result.recommendations?.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}