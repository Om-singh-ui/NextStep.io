// nextstep.io/components/trust-apply/negotiate/draft-display.jsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Edit } from "lucide-react"
import { useState } from "react"

export function DraftDisplay({ draft }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(draft.emailDraft)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const downloadDraft = () => {
    const blob = new Blob([draft.emailDraft], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `negotiation-draft-${draft.draftId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getToneBadgeVariant = (tone) => {
    switch (tone) {
      case 'professional': return 'default'
      case 'confident': return 'secondary'
      case 'friendly': return 'outline'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Negotiation Email Draft</CardTitle>
              <CardDescription>
                AI-generated email tailored for {draft.jobTitle} at {draft.company}
              </CardDescription>
            </div>
            <Badge variant={getToneBadgeVariant(draft.tone)}>
              {draft.tone} tone
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Salary Insights</h4>
              <Badge variant="outline">
                Market Range: ${draft.salaryRange?.min?.toLocaleString()} - ${draft.salaryRange?.max?.toLocaleString()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {draft.salaryInsights}
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="font-semibold mb-2">Negotiation Strategy</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {draft.negotiationStrategy}
            </p>
          </div>

          <div className="rounded-lg border p-4 bg-background">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Email Draft</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadDraft}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm font-sans bg-muted/30 p-4 rounded-lg">
                {draft.emailDraft}
              </pre>
            </div>
          </div>

          {draft.alternatives && (
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-3">Alternative Phrases</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <strong className="text-sm">Opening alternatives:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {draft.alternatives.openings?.map((opening, index) => (
                      <li key={index} className="text-muted-foreground pl-2">{opening}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-sm">Closing alternatives:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {draft.alternatives.closings?.map((closing, index) => (
                      <li key={index} className="text-muted-foreground pl-2">{closing}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950/20">
            <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
              Next Steps
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
              <li>Customize the email with your specific accomplishments</li>
              <li>Replace placeholder text with relevant details</li>
              <li>Review the email for tone and clarity</li>
              <li>Send the email and be prepared for follow-up discussions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}