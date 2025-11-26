// nextstep.io/app/(dashboard)/trust-apply/negotiate/result/[draftId]/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DraftDisplay } from "@/components/trust-apply/negotiate/draft-display"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/trust-apply/page-transition"

export default function DraftResultPage() {
  const params = useParams()
  const draftId = params.draftId
  const [draft, setDraft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get from local storage
    const history = JSON.parse(localStorage.getItem('trust-apply-negotiation-history') || '[]')
    const draftData = history.find(item => item.id === draftId)
    
    if (draftData) {
      // In a real app, you'd fetch the full draft from your storage
      // For now, we'll create mock draft data based on stored info
      const mockDraft = createMockDraft(draftData, draftId)
      setDraft(mockDraft)
    } else {
      setError("Draft not found")
    }
    setLoading(false)
  }, [draftId])

  const createMockDraft = (draftData, draftId) => {
    return {
      draftId,
      jobTitle: draftData.jobTitle || "Software Engineer",
      company: draftData.company || "Tech Company",
      currentSalary: draftData.currentSalary || "Not provided",
      expectedSalary: draftData.expectedSalary || "$120,000",
      experience: "5-7 years",
      tone: "professional",
      salaryRange: {
        min: 100000,
        max: 150000
      },
      salaryInsights: `Based on market data for ${draftData.jobTitle || "Software Engineer"} with ${draftData.experience || "5-7 years"} experience, the typical salary range is $100,000 - $150,000. Your expected salary of ${draftData.expectedSalary || "$120,000"} falls within this range and is competitive for your experience level.`,
      negotiationStrategy: `Focus on your specific technical skills and the value you can bring to ${draftData.company || "the company"}. Emphasize your track record of successful project delivery and your expertise in relevant technologies. Be prepared to discuss specific accomplishments that demonstrate your impact.`,
      emailDraft: `Dear Hiring Manager,

Thank you for offering me the ${draftData.jobTitle || "Software Engineer"} position at ${draftData.company || "your company"}. I'm very excited about the opportunity to join your team and contribute to your innovative projects.

Based on my ${draftData.experience || "5-7 years"} of experience in software development and market research for similar roles, I would like to discuss the compensation package. The market range for this position is typically $100,000 - $150,000, and I was hoping for a starting salary of ${draftData.expectedSalary || "$120,000"}.

I'm confident that my skills in [specific technologies mentioned in job description] and my experience with [relevant projects] will bring immediate value to your team. I'm particularly excited about [specific aspect of the role or company that interests you].

Would you be open to discussing a starting salary of ${draftData.expectedSalary || "$120,000"}? I believe this reflects both market standards and the value I can bring to your organization.

Thank you for your consideration. I look forward to discussing this further.

Best regards,
[Your Name]`,
      alternatives: {
        openings: [
          "Thank you for the offer and your confidence in my qualifications for the position.",
          "I'm writing to express my enthusiasm for the opportunity and to discuss the compensation package.",
          "I appreciate you extending the offer and am very excited about the possibility of joining your team."
        ],
        closings: [
          "I'm available to discuss this further at your convenience.",
          "Thank you for your flexibility and consideration of my request."
        ]
      },
      timestamp: draftData.timestamp || new Date().toISOString()
    }
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto py-8">
          <div className="text-center">Loading negotiation draft...</div>
        </div>
      </PageTransition>
    )
  }

  if (error) {
    return (
      <PageTransition>
        <div className="container mx-auto py-8 text-center">
          <div className="max-w-2xl mx-auto">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Draft Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The negotiation draft you're looking for doesn't exist or may have been deleted.
            </p>
            <Button asChild>
              <Link href="/trust-apply/negotiate">Create New Negotiation</Link>
            </Button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-8 mt-20">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/trust-apply/negotiate">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Negotiation Draft</h1>
            <p className="text-muted-foreground">
              {draft.jobTitle} at {draft.company}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <DraftDisplay draft={draft} />
          
          <div className="mt-6 flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/trust-apply/negotiate">
                Create Another Draft
              </Link>
            </Button>
            <Button asChild>
              <Link href="/trust-apply">
                Back to TrustApply Hub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}