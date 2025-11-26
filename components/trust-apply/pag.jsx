    // nextstep.io/app/(dashboard)/trust-apply/page.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HubCard } from "@/components/trust-apply/hub-card"
import { PageTransition } from "@/components/trust-apply/page-transition"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, MessageSquare, BarChart3, CheckCircle } from "lucide-react"

export default function TrustApplyHub() {
  const features = [
    {
      title: "Job Authenticity Scanner",
      description: "Upload job postings, URLs, or PDFs to detect fake jobs and scams with AI-powered analysis",
      icon: "Shield",
      href: "/trust-apply/scan",
      color: "bg-blue-500",
    },
    {
      title: "Salary Negotiation Agent",
      description: "Generate professional negotiation emails with AI-powered strategies and market insights",
      icon: "MessageSquare",
      href: "/trust-apply/negotiate",
      color: "bg-green-500",
    },
    {
      title: "Salary Insights",
      description: "Get market-appropriate salary ranges for your role, experience, and location",
      icon: "BarChart3",
      href: "#",
      color: "bg-purple-500",
      comingSoon: true,
    },
    {
      title: "Quick Scan",
      description: "Paste job text for instant authenticity check with rapid AI analysis",
      icon: "Zap",
      href: "#",
      color: "bg-orange-500",
      comingSoon: true,
    },
  ]

  const stats = [
    {
      title: "Accuracy",
      value: "99.8%",
      description: "Detection rate across 50K+ job scans"
    },
    {
      title: "Time Saved",
      value: "15K+ hours",
      description: "For job seekers using our tools"
    },
    {
      title: "Success Rate",
      value: "87%",
      description: "Higher salary outcomes with negotiation"
    }
  ]

  return (
    <PageTransition>
      <div className="container mx-auto py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              TrustApply™
            </h1>
            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
              AI-powered tools to verify job authenticity, negotiate better offers, and protect your career journey
            </p>
          </motion.div>
        </div>

        {/* Main Features Grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-center mb-2">Choose Your Tool</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto">
              Select from our suite of AI-powered career tools designed to give you confidence in your job search
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <HubCard 
                key={feature.title} 
                {...feature} 
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Trusted by Job Seekers</h2>
            <p className="text-muted-foreground mt-2">
              Real results from thousands of successful users
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-muted/50 rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">How TrustApply Works</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our AI-powered platform combines multiple verification methods to ensure job safety
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Advanced machine learning detects scam patterns and red flags in job postings
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Market Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Real-time salary data and market trends for informed negotiation
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Expert Strategies</h3>
              <p className="text-sm text-muted-foreground">
                Proven negotiation tactics and application strategies tailored to your situation
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <h3 className="text-xl font-semibold mb-4">Ready to Secure Your Career Journey?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start with our Job Authenticity Scanner or Salary Negotiation Agent to take control of your job search
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/trust-apply/scan">
                <Shield className="h-4 w-4 mr-2" />
                Scan a Job
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/trust-apply/negotiate">
                <MessageSquare className="h-4 w-4 mr-2" />
                Negotiate Offer
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}