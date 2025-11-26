// nextstep.io/app/(dashboard)/trust-apply/negotiate/page.jsx
"use client"

import { useState } from "react"
import { NegotiationForm } from "@/components/trust-apply/negotiate/negotiation-form"
import { PageTransition } from "@/components/trust-apply/page-transition"
import { generateNegotiation } from "@/lib/actions/generate-negotiation"
import { motion } from "framer-motion"
import { Sparkles, Target, Zap, Shield, TrendingUp, Users, Clock, ArrowRight, CheckCircle, Star, Rocket, MessageSquare, ChevronRight } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function NegotiatePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [draft, setDraft] = useState(null)
  const { theme } = useTheme()

  const handleGenerate = async (formData) => {
    setIsGenerating(true)
    try {
      const result = await generateNegotiation(formData)
      setDraft(result)

      const history = JSON.parse(localStorage.getItem('trust-apply-negotiation-history') || '[]')
      history.unshift({
        id: result.draftId,
        timestamp: new Date().toISOString(),
        jobTitle: formData.jobTitle,
        company: formData.company,
        expectedSalary: formData.expectedSalary
      })
      localStorage.setItem('trust-apply-negotiation-history', JSON.stringify(history.slice(0, 50)))

    } catch (error) {
      console.error('Negotiation generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (draft) {
    window.location.href = `/trust-apply/negotiate/result/${draft.draftId}`
    return null
  }

  // Enhanced theme-aware styles
  const cardBackground = theme === 'dark' 
    ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-gray-700/60"
    : "bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm border-gray-200/60"

  const textColor = theme === 'dark' ? "text-gray-100" : "text-gray-900"
  const mutedTextColor = theme === 'dark' ? "text-gray-400" : "text-gray-600"
  const lightTextColor = theme === 'dark' ? "text-gray-300" : "text-gray-700"

  const badgeBackground = theme === 'dark' 
    ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 border-green-700/30"
    : "bg-gradient-to-r from-green-500/15 to-emerald-500/15 text-green-700 border-green-300"

  const formHeaderBackground = theme === 'dark'
    ? "bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/50"
    : "bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50"

  // Enhanced stats with better gradients
  const stats = [
    { 
      icon: TrendingUp, 
      value: "15-25%", 
      label: "Average Salary Increase",
      description: "Higher compensation outcomes",
      color: "text-green-500",
      bgGradient: "bg-gradient-to-br from-green-500/10 via-green-400/5 to-emerald-500/10",
      borderColor: "border-green-200/50 dark:border-green-800/30",
      iconGradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: Users, 
      value: "10K+", 
      label: "Successful Negotiations",
      description: "Professionals empowered",
      color: "text-blue-500",
      bgGradient: "bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10",
      borderColor: "border-blue-200/50 dark:border-blue-800/30",
      iconGradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Clock, 
      value: "< 2min", 
      label: "Quick Generation",
      description: "Professional emails ready",
      color: "text-purple-500",
      bgGradient: "bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-violet-500/10",
      borderColor: "border-purple-200/50 dark:border-purple-800/30",
      iconGradient: "from-purple-500 to-violet-500"
    },
    { 
      icon: Star, 
      value: "4.9/5", 
      label: "User Rating",
      description: "Satisfaction score",
      color: "text-amber-500",
      bgGradient: "bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-orange-500/10",
      borderColor: "border-amber-200/50 dark:border-amber-800/30",
      iconGradient: "from-amber-500 to-orange-500"
    }
  ]

  // Enhanced features with improved gradients
  const features = [
    {
      icon: Target,
      title: "Strategic Approach",
      description: "AI-powered negotiation strategies tailored to your specific situation and industry standards",
      gradient: "from-blue-500 to-cyan-500",
      darkGradient: "from-blue-600 to-cyan-600",
      lightGradient: "from-blue-400 to-cyan-400",
      benefits: ["Market research", "Industry benchmarks", "Custom strategies"],
      iconBg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Zap,
      title: "Professional Tone",
      description: "Maintain perfect professionalism while confidently maximizing your value and worth",
      gradient: "from-green-500 to-emerald-500",
      darkGradient: "from-green-600 to-emerald-600",
      lightGradient: "from-green-400 to-emerald-400",
      benefits: ["Polished language", "Confident phrasing", "Professional format"],
      iconBg: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Shield,
      title: "Confidence Boost",
      description: "Evidence-based arguments and data-driven insights to powerfully support your request",
      gradient: "from-purple-500 to-violet-500",
      darkGradient: "from-purple-600 to-violet-600",
      lightGradient: "from-purple-400 to-violet-400",
      benefits: ["Data backing", "Success stories", "Proven templates"],
      iconBg: "bg-gradient-to-br from-purple-500/20 to-violet-500/20"
    }
  ]

  // Enhanced testimonials
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Product Manager",
      content: "The negotiation agent helped me secure a 22% higher offer. The email was perfectly professional and effective!",
      avatar: "SC",
      rating: 5,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead",
      content: "I was nervous about negotiating, but the AI-generated email gave me the confidence to ask for what I deserved.",
      avatar: "MR",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500"
    }
  ]

  // Enhanced process steps with better design
  const processSteps = [
    {
      step: "01",
      title: "Enter Details",
      description: "Provide your job offer details and preferences",
      icon: MessageSquare,
      gradient: "from-green-500 to-emerald-500",
      accentColor: "text-green-600 dark:text-green-400"
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our AI analyzes market data and creates strategies",
      icon: Rocket,
      gradient: "from-blue-500 to-cyan-500",
      accentColor: "text-blue-600 dark:text-blue-400"
    },
    {
      step: "03",
      title: "Generate Email",
      description: "Get your professionally crafted negotiation email",
      icon: Sparkles,
      gradient: "from-purple-500 to-violet-500",
      accentColor: "text-purple-600 dark:text-purple-400"
    }
  ]

  return (
    <PageTransition>
      <div className="min-h-screen py-8 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Enhanced Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm text-base font-semibold mb-8 ${badgeBackground}`}
              >
                <Sparkles className="w-5 h-5" />
                AI-Powered Salary Negotiation
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 dark:from-amber-200 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent"
              >
                Negotiate Your
                <span className="block">Worth Confidently</span>
              </motion.h1>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-8 mt-12"
              >
                {["No Credit Card Required", "3 Email Templates", "Instant Results", "100% Confidential"].map((item, index) => (
                  <motion.div 
                    key={item} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.2 } 
                  }}
                  className={`relative rounded-3xl p-8 border backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${stat.bgGradient} ${stat.borderColor}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.iconGradient}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-20"
            >
              <h2 className={`text-4xl font-bold text-center mb-16 ${textColor}`}>
                How It Works
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative"
                  >
                    <div className={`relative rounded-3xl p-8 backdrop-blur-sm border-2 transition-all duration-500 group-hover:shadow-2xl h-full ${cardBackground} border-gray-200/50 dark:border-gray-700/50 group-hover:border-green-300/30 dark:group-hover:border-green-600/30`}>
                      
                      {/* Step Number with Gradient */}
                      <div className="relative mb-8">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg`}>
                          {step.step}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className={`text-2xl font-bold mb-4 ${step.accentColor}`}>
                        {step.title}
                      </h3>
                      <p className={`text-lg leading-relaxed ${lightTextColor} mb-6`}>
                        {step.description}
                      </p>

                      {/* Progress Line (except last item) */}
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700 group-hover:from-green-400 group-hover:to-emerald-400 transition-all duration-500" />
                          <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 -mt-3 ml-6 group-hover:text-green-500 transition-colors duration-500" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="grid gap-8 lg:grid-cols-3 mb-20"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-pointer"
                >
                  <div className={`relative overflow-hidden rounded-3xl border-2 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl h-full ${cardBackground} border-gray-200/50 dark:border-gray-700/50 group-hover:border-green-300/30 dark:group-hover:border-green-600/30`}>
                    
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className="relative p-8 h-full flex flex-col">
                      {/* Enhanced Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors ${textColor}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-lg leading-relaxed mb-6 ${lightTextColor}`}>
                          {feature.description}
                        </p>
                        
                        {/* Benefits list */}
                        <div className="space-y-3">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <motion.div 
                              key={benefit} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.9 + index * 0.1 + benefitIndex * 0.1 }}
                              className="flex items-center gap-3 text-sm"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                              <span className={lightTextColor}>{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Learn more
                        </span>
                        <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Testimonials Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mb-20"
            >
              <h2 className={`text-4xl font-bold text-center mb-16 ${textColor}`}>
                Success Stories
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`relative rounded-3xl p-8 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-2xl ${cardBackground} border-gray-200/50 dark:border-gray-700/50`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold text-lg shadow-lg`}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg ${textColor}`}>{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className={`text-lg italic mb-6 leading-relaxed ${lightTextColor}`}>"{testimonial.content}"</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className={`rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-3xl ${cardBackground} border-2 border-gray-200/50 dark:border-gray-700/50`}
            >
              <div className={`p-12 ${formHeaderBackground}`}>
                <h2 className={`text-4xl font-bold text-center mb-4 ${textColor}`}>
                  Start Your Negotiation
                </h2>
                <p className={`text-xl text-center ${mutedTextColor}`}>
                  Fill in the details below to generate your personalized negotiation email
                </p>
              </div>
              
              <div className="p-12">
                <NegotiationForm 
                  onGenerate={handleGenerate} 
                  isGenerating={isGenerating}
                />
              </div>
            </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="text-center mt-20 pt-16 border-t border-gray-200/60 dark:border-gray-700/60"
            >
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                {["🔒 Bank-Level Security", "⚡ Instant Generation", "🎯 Professional Results", "💼 Industry Proven"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="flex items-center gap-2 text-base font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
              <p className={`text-lg ${mutedTextColor}`}>
                Trusted by professionals worldwide • No data stored on servers • 100% confidential
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}