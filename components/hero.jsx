"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Waves, Sparkles, Rocket, ArrowRight, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import HackathonShoutoutPopup from "./HackathonShoutoutPopup";


const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = useCallback(() => {
    if (isSignedIn) {
      router.push("/");
    } else {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  const handleWatchDemo = useCallback(() => {
    console.log("Watch demo clicked");
  }, []);

  return (
    <section className="relative min-h-[90vh] mt-16 sm:mt-20 flex flex-col items-center justify-center py-8 sm:py-12 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-3xl top-0 -left-40 sm:-left-60 bg-gradient-to-r from-indigo-500/40 to-purple-600/20 animate-pulse" />
        <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-3xl bottom-0 right-0 bg-gradient-to-r from-cyan-400/40 to-emerald-400/20 animate-pulse delay-700" />

        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_90%,transparent_100%)]"></div>
        </div>

        <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative space-y-6 sm:space-y-8 text-center"
      >
        {/* Tagline */}
        <motion.div
          className="relative inline-flex items-center gap-2 rounded-full 
             px-4 sm:px-6 py-1.5 sm:py-2 
             text-xs sm:text-sm font-medium
             border border-blue-500/40 
             bg-gradient-to-r from-indigo-500/10 via-blue-400/10 to-cyan-400/10 
             backdrop-blur-sm
             transition-all duration-500 ease-out
             hover:border-blue-400 
             hover:shadow-[0_0_25px_rgba(59,130,246,0.5),0_0_45px_rgba(96,165,250,0.4),0_0_65px_rgba(147,197,253,0.35)]
             cursor-pointer group select-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92, rotate: "-2deg" }}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Waves className="w-4 h-4 text-blue-400 drop-shadow-sm" />
          </motion.div>

          <span className="text-foreground/90 dark:text-foreground relative z-10">
            Unlock Your Career Potential
          </span>

          <motion.div
            className="origin-bottom"
            whileHover={{ y: -28, rotate: -20, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <Rocket className="w-4 h-4 text-blue-500 drop-shadow-md" />
          </motion.div>

          <span
            className="absolute inset-0 rounded-full 
               bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-cyan-400/30 
               opacity-0 group-hover:opacity-100 
               transition-opacity duration-700 blur-md"
          />
        </motion.div>

        {/* Main Heading */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-plus-jakarta tracking-tight leading-tight px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <motion.span
              className="inline-block font-extrabold text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
                textShadow: `
                  0 0 10px rgba(16, 185, 129, 0.6),
                  0 0 20px rgba(45, 212, 191, 0.5),
                  0 0 30px rgba(6, 182, 212, 0.4),
                  0 0 40px rgba(59, 130, 246, 0.3)
                `,
              }}
            >
              NextStep.io
            </motion.span>

            <br />
            <motion.span
              className="inline-block mt-2 sm:mt-3 md:mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Your{" "}
              <span className="bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent
                     drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]
                     sm:drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]
                     transition-transform duration-300 hover:scale-105">
                AI Career Coach
              </span>
              <motion.span
                className="text-primary ml-1.5 sm:ml-2 md:ml-3"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                redefined
                <motion.span
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
                  className="inline-block ml-1 sm:ml-2"
                >
                  <Sparkles className="inline w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-yellow-400 drop-shadow-lg" />
                </motion.span>
              </motion.span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="max-w-[95%] sm:max-w-[700px] mx-auto text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide font-medium px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Step confidently into your future. With personalized career guidance,
          AI-powered insights, and actionable roadmaps,{" "}
          <span className="text-primary font-semibold">NextStep.io</span>{" "}
          transforms ambition into achievement. Your next big move starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* Get Started Button */}
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 
              text-base sm:text-lg rounded-xl sm:rounded-2xl font-semibold 
              flex items-center justify-center gap-3 border-2 
              relative overflow-hidden
              bg-transparent text-primary
              border-transparent
              before:absolute before:inset-0 before:z-0
              before:bg-gradient-to-r before:from-primary/20
              before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-100
              after:absolute after:inset-0 after:z-0 
              after:bg-gradient-to-r after:from-primary
              after:opacity-0 after:transition-all after:duration-300
              hover:after:opacity-100
              hover:text-black
              hover:shadow-[0_0_30px_rgba(139,92,246,0.7)]
              transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Watch Demo Button */}
          <Button
            onClick={handleWatchDemo}
            size="lg"
            className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 
              text-base sm:text-lg rounded-xl sm:rounded-2xl font-semibold 
              flex items-center justify-center gap-3 border-2 
              relative overflow-hidden
              bg-transparent text-primary
              border-transparent
              before:absolute before:inset-0 before:z-0
              before:bg-gradient-to-r before:from-primary/20
              before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-100
              after:absolute after:inset-0 after:z-0
              after:bg-gradient-to-r after:from-primary
              after:opacity-0 after:transition-all after:duration-300
              hover:after:opacity-100
              hover:text-black
              hover:shadow-[0_0_30px_rgba(139,92,246,0.7)]
              transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10">Watch Demo</span>
            <Play className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
