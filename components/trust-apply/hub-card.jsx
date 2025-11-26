"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  MessageSquare,
  BarChart3,
  Zap,
  Lock,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  Shield,
  MessageSquare,
  BarChart3,
  Zap,
  Lock,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Clock,
  Users,
};

export function HubCard({
  title,
  description,
  icon,
  href,
  color,
  comingSoon,
  className,
  onClick,
  delay = 0,
}) {
  const IconComponent = iconMap[icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className={`
          relative overflow-hidden rounded-3xl backdrop-blur-xl
          border border-white/20 shadow-2xl
          hover:shadow-3xl hover:border-white/30
          transition-all duration-500 cursor-pointer group
          bg-gradient-to-br from-gray-900/80 to-black/80
          h-full
          ${comingSoon ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"}
          ${className || ""}
        `}
        onClick={onClick}
      >
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

        {/* Animated Orbs */}
        <div className="absolute -right-10 -top-10 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -left-5 -bottom-5 w-16 h-16 bg-white/5 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700 delay-100" />

        <CardHeader className="relative z-10 p-8 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Icon with gradient background */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-7 h-7 text-white" />
              </div>

              <CardTitle className="text-2xl font-bold text-white mb-3 leading-tight">
                {title}
              </CardTitle>
              <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 p-8 pt-4">
          <div className="flex items-center justify-between">
            {comingSoon ? (
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-2xl text-sm font-semibold text-yellow-300 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Coming Soon
              </div>
            ) : (
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-2xl text-sm font-semibold text-green-300 backdrop-blur-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Available Now
              </div>
            )}

            {!comingSoon && (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            )}
          </div>
        </CardContent>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </Card>
    </motion.div>
  );
}

export default function TrustApplyHub() {
  const router = useRouter();

  const features = [
    {
      title: "Job Authenticity Scanner",
      description: "Upload job postings, URLs, or PDFs to detect fake jobs and scams with advanced AI analysis",
      icon: "Shield",
      href: "/trust-apply/scan",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      title: "Salary Negotiation Agent",
      description: "Generate professional negotiation emails with AI-powered strategies tailored to your offer",
      icon: "MessageSquare",
      href: "/trust-apply/negotiate",
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      title: "Salary Insights",
      description: "Get market-appropriate salary ranges for your role, experience, and location",
      icon: "BarChart3",
      href: "#",
      color: "from-purple-500 to-pink-500",
      comingSoon: true,
      delay: 0.3,
    },
    {
      title: "Quick Scan",
      description: "Paste job text for instant authenticity check with real-time AI analysis",
      icon: "Zap",
      href: "#",
      color: "from-orange-500 to-red-500",
      comingSoon: true,
      delay: 0.4,
    },
  ];

  const stats = [
    {
      title: "Accuracy",
      value: "99.8%",
      desc: "Detection rate across 50K+ job scans",
      icon: "CheckCircle",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Time Saved",
      value: "15K+ hours",
      desc: "For job seekers using our AI tools",
      icon: "Clock",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Success Rate",
      value: "87%",
      desc: "Higher salary outcomes with negotiation",
      icon: "TrendingUp",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const handleClick = (feature) => {
    if (!feature.comingSoon && feature.href) {
      router.push(feature.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 py-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/10"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Job Security
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            TrustApply
            <span className="text-blue-400">™</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced AI tools to verify job authenticity, negotiate better offers,
            and protect your career journey with confidence
          </p>
        </motion.div>

        {/* Enhanced Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <HubCard
              key={feature.title}
              {...feature}
              onClick={() => handleClick(feature)}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="rounded-3xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>

                    <p className="text-sm text-gray-400">{stat.desc}</p>
                  </CardContent>

                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-800/60"
        >
          <p className="text-gray-500 text-sm">
            Trusted by thousands of job seekers worldwide • Powered by advanced AI technology
          </p>
        </motion.div>
      </div>
    </div>
  );
}