"use client";

import HeroSection from "@/components/hero";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Sparkles, ArrowRight } from "lucide-react";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { faqs } from "@/data/faqs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

// Particle component for background animations
const ClientParticle = ({ index }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [duration, setDuration] = useState(2);

  useEffect(() => {
    // Generate random positions and durations on client side only
    setPosition({
      top: `${Math.random() * 40 + 30}%`,
      left: `${Math.random() * 40 + 30}%`,
    });
    setDuration(2 + Math.random() * 2);
  }, []);

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-primary/50"
      style={position}
      animate={{
        y: [0, -15, 0],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: index * 0.5,
      }}
    />
  );
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <HeroSection />

      {/* Features Section with animated background and grid layout */}
      <section
        id="features"
        className="relative w-full py-16 sm:py-20 md:py-28 bg-background overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.04] dark:bg-grid-white/[0.08] bg-[size:40px_40px]" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-5 md:px-6">
          {/* Section header with animated title */}
          <div className="text-center mb-14 md:mb-20 relative z-10">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-snug sm:leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 sm:gap-3 justify-center text-2xl sm:text-4xl md:text-6xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-2xl sm:text-3xl">🚀</span>
                <span
                  className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 
              bg-clip-text text-transparent font-extrabold 
              text-2xl sm:text-4xl md:text-5xl flex items-center gap-2
              animate-gradient-x"
                  style={{
                    backgroundSize: "200% 200%",
                    textShadow: `
                0 0 15px rgba(6,182,212,0.6),
                0 0 25px rgba(45,212,191,0.5),
                0 0 40px rgba(59,130,246,0.4)
              `,
                  }}
                >
                  Advanced Features
                  <span className="ml-3 animate-pulse text-white flex items-center gap-1">
                    Start Exploring
                  </span>
                </span>
              </motion.span>

              <motion.span
                className="block mt-3 sm:mt-5 text-foreground 
            text-base sm:text-lg md:text-2xl font-semibold"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Transform Your Professional Trajectory
              </motion.span>
            </motion.h2>

            {/* Section description */}
            <motion.p
              className="mt-6 text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto 
          text-sm sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Leverage{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 bg-clip-text text-transparent font-semibold">
                cutting-edge AI
              </span>{" "}
              to navigate your career path with precision. Our platform delivers{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                data-driven insights
              </span>{" "}
              and personalized strategies to accelerate your growth and unlock
              new opportunities.
            </motion.p>
          </div>

          {/* Features grid with animated cards */}
          <div className="relative max-w-6xl mx-auto">
            {/* Background dot pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="w-full h-full opacity-20 dark:opacity-30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="dotPattern"
                    x="0"
                    y="0"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1.5" cy="1.5" r="1.3" fill="rgba(59,130,246,0.4)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotPattern)" />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative border border-blue-400/30 dark:border-blue-500/30
              bg-gradient-to-br from-white/70 to-white/30 dark:from-gray-900/60 dark:to-gray-800/40
              backdrop-blur-md rounded-2xl overflow-hidden
              hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.55)]
              hover:scale-[1.04] active:scale-[0.98]
              transition-all duration-500 ease-out"
                  whileHover={{ y: -5 }}
                >
                  <CardContent className="relative z-10 p-6 flex flex-col items-center text-center h-full">
                    {/* Feature icon */}
                    <div
                      className="p-4 rounded-xl bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 
                mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out"
                    >
                      {feature.icon}
                    </div>

                    {/* Feature title */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>

                    {/* Feature description */}
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 blur-2xl" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats section with metrics and testimonials */}
      <section
        id="stats"
        className="w-full py-16 sm:py-20 md:py-28 bg-gradient-to-b from-background to-muted/20"
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Section header */}
          <div className="text-center mb-20">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 
                      bg-clip-text text-transparent"
              >
                Trusted by Professionals
              </span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Our platform delivers measurable results through advanced AI
              technology and data-driven insights
            </motion.p>
          </div>

          {/* Stats cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24">
            {[
              {
                value: "50+",
                label: "Industries Covered",
                icon: "🌐",
                color: "from-blue-500 to-cyan-500",
                description: "Comprehensive industry knowledge",
              },
              {
                value: "1000+",
                label: "Interview Questions",
                icon: "💼",
                color: "from-purple-500 to-fuchsia-500",
                description: "Curated question database",
              },
              {
                value: "95%",
                label: "Success Rate",
                icon: "📈",
                color: "from-green-500 to-emerald-500",
                description: "Of users achieve their goals",
              },
              {
                value: "24/7",
                label: "AI Support",
                icon: "🤖",
                color: "from-orange-500 to-amber-500",
                description: "Always available assistance",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="relative group flex flex-col items-center justify-center 
                     p-8 rounded-3xl bg-gradient-to-br from-card to-card/80
                     border border-border/50
                     hover:shadow-2xl hover:border-primary/20
                     transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Hover gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 
                        group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}
                ></div>

                {/* Animated icon container */}
                <div className="relative mb-6">
                  <div
                    className={`absolute -inset-3 bg-gradient-to-br ${stat.color} 
                          rounded-full opacity-0 group-hover:opacity-20 
                          blur-xl transition-all duration-700`}
                  ></div>
                  <div
                    className={`relative text-4xl bg-gradient-to-br from-background to-muted/50 
                          p-4 rounded-2xl shadow-sm group-hover:shadow-md 
                          transition-all duration-500`}
                  >
                    {stat.icon}
                  </div>
                </div>

                {/* Stat value with gradient text */}
                <h3
                  className={`text-4xl font-bold mb-3 bg-gradient-to-r ${stat.color} 
                       bg-clip-text text-transparent`}
                >
                  {stat.value}
                </h3>

                {/* Stat label */}
                <p className="text-foreground font-semibold text-center mb-2 text-lg">
                  {stat.label}
                </p>

                {/* Stat description */}
                <p className="text-muted-foreground text-sm text-center">
                  {stat.description}
                </p>

                {/* Animated underline */}
                <div
                  className={`absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r ${stat.color} 
                        group-hover:w-4/5 transition-all duration-700 transform -translate-x-1/2 
                        rounded-full`}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* Team testimonials section */}
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="mb-14 text-center">
              <motion.div
                className="inline-block relative group cursor-pointer mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {/* Main heading with glow effect */}
                <motion.h3
                  className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 
                bg-clip-text text-transparent bg-size-200 bg-pos-0
                transition-all duration-500 group-hover:bg-pos-100
                group-hover:drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]
                group-hover:scale-105"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  Trusted by Visionaries
                </motion.h3>

                {/* Animated gradient shadow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-purple-600/40 
                  blur-xl rounded-lg opacity-0 group-hover:opacity-60 
                  transition-opacity duration-500 -z-10 scale-110" />
              </motion.div>

              <motion.p
                className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed
              group hover:text-foreground/80 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Join industry pioneers who are shaping the future of finance
                with our platform
              </motion.p>
            </div>

            {/* Team member grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-16">
              {[
                {
                  name: "Om Singh Chouhan",
                  logo: "O",
                  role: "FinTech Innovator",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  name: "Jeet Chetry",
                  logo: "J",
                  role: "Blockchain Expert",
                  color: "from-purple-500 to-fuchsia-500",
                },
                {
                  name: "Madhur Virli",
                  logo: "M",
                  role: "Crypto Analyst",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  name: "Abhishek Upmanyu",
                  logo: "A",
                  role: "Investment Strategist",
                  color: "from-orange-500 to-amber-500",
                },
                {
                  name: "Maheep Singh",
                  logo: "M",
                  role: "Digital Assets Advisor",
                  color: "from-red-500 to-rose-500",
                },
                {
                  name: "Onkar yadav",
                  logo: "",
                  role: "Web3 Developer",
                  color: "from-indigo-500 to-blue-500",
                },
              ].map((person, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <div
                    className={`w-18 h-18 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 
                        border border-primary/20 flex items-center justify-center 
                        group-hover:shadow-lg group-hover:border-primary/40
                        transition-all duration-300 mb-4 relative overflow-hidden`}
                  >
                    {/* Hover gradient effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${person.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Background glow */}
                    <div
                      className={`absolute -inset-2 bg-gradient-to-br ${person.color} rounded-full opacity-0 group-hover:opacity-5 blur-md transition-opacity duration-500`}
                    ></div>

                    <span
                      className={`text-2xl font-bold bg-gradient-to-br ${person.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 z-10`}
                    >
                      {person.logo}
                    </span>
                  </div>
                  <span
                    className="text-sm font-medium text-foreground group-hover:text-primary 
                        transition-colors duration-300 text-center leading-tight"
                  >
                    {person.name}
                  </span>
                  <span
                    className="text-xs text-muted-foreground group-hover:text-foreground/80 
                        transition-colors duration-300 mt-1 text-center"
                  >
                    {person.role}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Enhanced testimonial quote */}
            <motion.div
              className="mt-14 max-w-4xl mx-auto p-10 bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl border border-border/50 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.span
                      key={star}
                      className="text-amber-500 text-xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.7 + star * 0.1, type: "spring", stiffness: 200 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              </div>
              <motion.p
                className="text-foreground/80 italic text-center text-lg md:text-xl leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.7 }}
              >
                "NextStep.io has completely transformed how we approach career
                development. The AI-powered insights and personalized guidance
                have helped our team members accelerate their growth and achieve
                their professional goals faster than ever before."
              </motion.p>
              <motion.div
                className="flex items-center justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                <span className="text-sm text-muted-foreground">
                  Based on 250+ reviews from industry professionals
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works process section */}
      <section className="w-full py-10 sm:py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 justify-center text-2xl sm:text-3xl md:text-5xl 
                 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 
                 bg-clip-text text-transparent font-extrabold drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                How It Works?
                <motion.span
                  className="inline-block ml-2"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-400 drop-shadow-md inline" />
                </motion.span>
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm sm:text-base md:text-lg mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Four simple steps to accelerate your career growth with AI-driven{" "}
              <span
                className="font-semibold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 
                   bg-clip-text text-transparent"
              >
                NextStep.io
              </span>
            </motion.p>
          </div>

          {/* Process steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 
                     p-6 rounded-2xl border border-blue-400/40 bg-card/40 backdrop-blur-sm
                     hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] 
                     hover:scale-[1.03] active:scale-[0.98] 
                     transition-all duration-500 ease-out"
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center
                       text-primary text-2xl sm:text-3xl 
                       group-hover:scale-110 transition-transform duration-500"
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section with accordion */}
      <section id="faq" className="w-full py-12 md:py-24 bg-background/50">
        <div className="container mx-auto px-4 md:px-6">
          {/* FAQ header with animations */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative inline-block mb-6">
              {/* Background glow effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-emerald-400
               blur-xl rounded-full opacity-40"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              ></motion.div>

              {/* Main title */}
              <h2
                className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold
               bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 
               bg-clip-text text-transparent drop-shadow-md whitespace-nowrap"
              >
                Frequently Asked Questions?
              </h2>
            </div>
            <motion.p
              className="text-muted-foreground text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Everything you need to know about our{" "}
              <span className="bg-gradient-to-r from-emerald-400/80 to-cyan-500/80 bg-clip-text text-transparent font-semibold">
                AI-powered platform
              </span>
            </motion.p>

            {/* Animated dots indicator */}
            <motion.div
              className="flex justify-center mt-8 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {[
                { id: 0, gradient: "from-red-500 to-red-700" },
                { id: 1, gradient: "from-green-500 to-green-700" },
                { id: 2, gradient: "from-blue-500 to-blue-700" },
              ].map((dot) => (
                <motion.div
                  key={dot.id}
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${dot.gradient}`}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: dot.id * 0.3,
                  }}
                ></motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* FAQ accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/30 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <AccordionTrigger
                    className="flex justify-between items-center px-5 py-4 text-left text-foreground font-medium text-base sm:text-lg cursor-pointer
                         bg-card/30 hover:bg-gradient-to-r hover:from-emerald-200/10 hover:to-cyan-300/10 transition-all duration-300"
                  >
                    {faq.question}
                    <motion.span
                      className="ml-2"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: faq.isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-5 py-4 text-muted-foreground text-sm sm:text-base leading-relaxed
                         border-t border-border/20 bg-card/10 overflow-hidden transition-all duration-300"
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call-to-action section with complex animations */}
      <section className="w-full py-24 md:py-32 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Animated notification badge */}
            <motion.div
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(16, 185, 129, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-primary mr-2"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.span>
              <span className="text-sm font-medium text-primary">
                Ready to get started?
              </span>
            </motion.div>

            {/* Main CTA heading */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <motion.span
                className="block bg-gradient-to-r from-foreground via-primary to-cyan-400 bg-clip-text text-transparent"
                initial={{ backgroundPosition: "200% 0" }}
                whileInView={{ backgroundPosition: "0% 0" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                style={{ backgroundSize: "200% 100%" }}
              >
                Transform Your Career
              </motion.span>
              <motion.span
                className="block text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                with AI-Powered Guidance
              </motion.span>
            </motion.h2>

            {/* Description text */}
            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Join{" "}
              <motion.span
                className="font-semibold text-primary"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
              >
                thousands of professionals
              </motion.span>{" "}
              who have accelerated their careers with our personalized AI
              mentorship platform.
            </motion.p>

            {/* Stats indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              {[
                { value: "95%", label: "Success Rate", icon: "📈" },
                { value: "24/7", label: "AI Support", icon: "🤖" },
                { value: "1000+", label: "Happy Users", icon: "😊" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center px-6 py-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                >
                  <span className="text-2xl mb-2">{stat.icon}</span>
                  <span className="text-2xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Main CTA button with animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="relative"
            >
              <motion.button
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white font-semibold text-lg overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Button shine animation */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </motion.div>

                {/* Button text content */}
                <span className="relative flex items-center justify-center">
                  Begin Your Journey
                  <motion.svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>

                {/* Button pulse effect */}
                <motion.div
                  className="absolute -inset-2 bg-primary/30 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </motion.button>

              {/* Background particles */}
              {[0, 1, 2, 3].map((i) => (
                <ClientParticle key={i} index={i} />
              ))}
            </motion.div>

            {/* Footer note */}
            <motion.p
              className="text-sm text-muted-foreground mt-6 inline-block cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ color: "hsl(0, 0%, 100%)" }}
            >
              No credit card required.{" "}
              <span className="underline">Start your free trial today.</span>
            </motion.p>

            {/* Decorative floating elements */}
            <motion.div
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>

            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            ></motion.div>

            {/* Animated border circles */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/20"
                style={{
                  width: `${i * 60}px`,
                  height: `${i * 60}px`,
                  top: `${20 + i * 10}%`,
                  right: `${5 + i * 5}%`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                  rotate: i % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}