// nextstep.io/components/trust-apply/scan/evidence-list.jsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function EvidenceList({ evidence }) {
  const positiveEvidence = evidence?.filter(e => e.type === 'positive') || []
  const riskEvidence = evidence?.filter(e => e.type === 'risk') || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Analysis</CardTitle>
        <CardDescription>
          Evidence and risk factors identified in the job posting
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {riskEvidence.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-red-500" />
              <h4 className="font-semibold text-red-600">Risk Factors</h4>
              <Badge variant="destructive">{riskEvidence.length} found</Badge>
            </div>
            <ul className="space-y-3">
              {riskEvidence.map((evidence, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{evidence.signal}</span>
                    {evidence.context && (
                      <p className="text-muted-foreground mt-1">{evidence.context}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {positiveEvidence.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h4 className="font-semibold text-green-600">Positive Indicators</h4>
              <Badge variant="default">{positiveEvidence.length} found</Badge>
            </div>
            <ul className="space-y-3">
              {positiveEvidence.map((evidence, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{evidence.signal}</span>
                    {evidence.context && (
                      <p className="text-muted-foreground mt-1">{evidence.context}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {evidence?.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>No specific evidence found. Manual review recommended.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}