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
} from "lucide-react";

const iconMap = {
  Shield,
  MessageSquare,
  BarChart3,
  Zap,
  Lock,
  TrendingUp,
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
}) {
  const IconComponent = iconMap[icon] || Shield;

  return (
    <Card
      className={`
        relative overflow-hidden rounded-2xl backdrop-blur-xl
        border border-white/10 shadow-xl
        hover:shadow-2xl hover:scale-[1.02]
        transition-all duration-300 cursor-pointer
        ${color}
        ${comingSoon ? "opacity-60 cursor-not-allowed" : "hover:brightness-105"}
        ${className || ""}
      `}
      onClick={onClick}
    >
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-white mb-2">
              {title}
            </CardTitle>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
          <IconComponent className="w-8 h-8 text-white/80 ml-4 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        {comingSoon && (
          <div className="inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-xs font-semibold text-yellow-300">
            Coming Soon
          </div>
        )}
      </CardContent>

      {/* Background gradient orb */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/20 rounded-full blur-xl" />
      </div>
    </Card>
  );
}

export default function TrustApplyHub() {
  const router = useRouter();

  const features = [
    {
      title: "Job Authenticity Scanner",
      description: "Upload job postings, URLs, or PDFs to detect fake jobs and scams",
      icon: "Shield",
      href: "/trust-apply/scan",
      color: "from-blue-500/50 to-indigo-500/50",
    },
    {
      title: "Salary Negotiation Agent",
      description:
        "Generate professional negotiation emails with AI-powered strategies",
      icon: "MessageSquare",
      href: "/trust-apply/negotiate",
      color: "from-green-500/50 to-emerald-500/50",
    },
    {
      title: "Salary Insights",
      description: "Get market-appropriate salary ranges instantly",
      icon: "BarChart3",
      href: "#",
      color: "from-purple-500/50 to-pink-500/50",
      comingSoon: true,
    },
    {
      title: "Quick Scan",
      description: "Paste job text for instant scam detection",
      icon: "Zap",
      href: "#",
      color: "from-orange-500/50 to-yellow-500/50",
      comingSoon: true,
    },
  ];

  const handleClick = (feature) => {
    if (!feature.comingSoon && feature.href) {
      router.push(feature.href);
    }
  };

  return (
    <div className="container mx-auto py-12 mt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
          TrustApply™
        </h1>
        <p className="text-muted-foreground mt-3 text-xl max-w-2xl">
          AI-powered tools to verify job authenticity and negotiate better
          salaries with confidence.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleClick(feature)}
          >
            <HubCard {...feature} />
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 grid gap-8 md:grid-cols-3"
      >
        {[
          {
            title: "Accuracy",
            value: "99.8%",
            desc: "Detection rate across 50K+ job scans",
          },
          {
            title: "Time Saved",
            value: "15K+ hours",
            desc: "Saved for job seekers using our tools",
          },
          {
            title: "Success Rate",
            value: "87%",
            desc: "Higher salary outcomes with negotiation",
          },
        ].map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <Card className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">{stat.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}