"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HubCard } from "@/components/trust-apply/hub-card"

export default function TrustApplyHub() {
  const router = useRouter()

  const features = [
    {
      title: "Job Authenticity Scanner",
      description: "Upload job postings, URLs, or PDFs to detect fake jobs and scams",
      icon: "Shield",
      href: "/trust-apply/scan",
      color: "bg-blue-500",
    },
    {
      title: "Salary Negotiation Agent",
      description: "Generate professional negotiation emails with AI-powered strategies",
      icon: "MessageSquare",
      href: "/trust-apply/negotiate",
      color: "bg-green-500",
    },
    {
      title: "Salary Insights",
      description: "Get market-appropriate salary ranges for your role and experience",
      icon: "BarChart3",
      href: "#",
      color: "bg-purple-500",
      comingSoon: true,
    },
    {
      title: "Quick Scan",
      description: "Paste job text for instant authenticity check",
      icon: "Zap",
      href: "#",
      color: "bg-orange-500",
      comingSoon: true,
    },
  ]

  const handleClick = (feature) => {
    if (!feature.comingSoon) {
      router.push(feature.href)
    }
  }

  return (
    <div className="container mx-auto py-8 mt-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">TrustApply™</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          AI-powered tools to verify job authenticity and negotiate better offers
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <div key={feature.title} onClick={() => handleClick(feature)} className="cursor-pointer">
            <HubCard {...feature} delay={index * 0.1} />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">Detection rate across 50K+ job scans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15K+ hours</div>
            <p className="text-xs text-muted-foreground">For job seekers using our tools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Higher salary outcomes with negotiation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
