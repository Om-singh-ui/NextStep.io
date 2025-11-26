"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HubCard } from "@/components/trust-apply/hub-card"
import { motion } from "framer-motion"
import { Sparkles, Shield, MessageSquare, BarChart3, Zap, TrendingUp, Clock, CheckCircle } from "lucide-react"

export default function TrustApplyHub() {
  const router = useRouter()

  const features = [
    {
      title: "Job Authenticity Scanner",
      description: "Upload job postings, URLs, or PDFs to detect fake jobs and scams with advanced AI analysis",
      icon: Shield,
      href: "/trust-apply/scan",
      // light gradient kept, dark uses neutral tones to avoid blue hues
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
      darkGradient: "dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800",
    },
    {
      title: "Salary Negotiation Agent",
      description: "Generate professional negotiation emails with AI-powered strategies tailored to your offer",
      icon: MessageSquare,
      href: "/trust-apply/negotiate",
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
      darkGradient: "dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800",
    },
    {
      title: "Salary Insights",
      description: "Get market-appropriate salary ranges for your role, experience, and location",
      icon: BarChart3,
      href: "#",
      color: "from-purple-500 to-violet-500",
      gradient: "bg-gradient-to-br from-purple-500 to-violet-500",
      darkGradient: "dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800",
      comingSoon: true,
    },
    {
      title: "Quick Scan",
      description: "Paste job text for instant authenticity check with real-time results",
      icon: Zap,
      href: "#",
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500 to-red-500",
      darkGradient: "dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800",
      comingSoon: true,
    },
  ]

  const stats = [
    {
      value: "99.8%",
      label: "Accuracy",
      description: "Detection rate across 50K+ job scans",
      icon: CheckCircle,
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      value: "15K+ hours",
      label: "Time Saved",
      description: "For job seekers using our tools",
      icon: Clock,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      value: "87%",
      label: "Success Rate",
      description: "Higher salary outcomes with negotiation",
      icon: TrendingUp,
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const handleClick = (feature) => {
    if (!feature.comingSoon) {
      router.push(feature.href)
    }
  }

  return (
    // top-level background removed so external theme provider controls it
    <div className="min-h-screen py-8 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:bg-neutral-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Job Security
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4">
            TrustApply
            <span className="text-blue-600 dark:text-blue-400">™</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced AI tools to verify job authenticity, negotiate better offers, and protect your career journey
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleClick(feature)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:shadow-2xl group-hover:ring-gray-300/60 dark:group-hover:ring-gray-600/60 h-full">
                {/* Gradient Border Effect (uses feature.color for light mode only) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.gradient} ${feature.darkGradient} shadow-lg mb-6`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    {feature.comingSoon ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Available Now
                      </span>
                    )}
                    <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-6 md:grid-cols-3"
        > 
          {stats.map((stat, index) => (
            <Card key={stat.label} className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 dark:border-gray-700">

              {/* Background Gradient on Hover removed (neutral) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="pb-3 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-gray-200/60 dark:border-gray-700/60"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Trusted by thousands of job seekers worldwide • Backed by advanced AI technology
          </p>
        </motion.div>
      </div>
    </div>
  )
}    