"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Rocket, Github, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const funnyMessages = [
  "Looks like this page took a wrong turn at Albuquerque 🗺️",
  "You've reached the invisible frontier of NextStep.io 🚀",
  "This page doesn't exist... yet. AI's still building it 🤖",
  "Even our AI assistant couldn't find this page 👀",
  "404: The only number that means both 'missing' and 'mystery'.",
  "The internet gremlins hid this page too well! 🧌",
];

// Particle component that doesn't use window on initial render
const FloatingParticle = ({ index, isDark }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Set positions only after component mounts (client-side)
    setPosition({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
    });
  }, []);

  return (
    <motion.div
      className={`absolute w-1 h-1 rounded-full ${
        isDark ? "bg-cyan-400/30" : "bg-emerald-400/40"
      }`}
      initial={{
        x: position.x,
        y: position.y,
        opacity: 0
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    />
  );
};

export default function NotFound() {
  const { theme } = useTheme();
  const [quote, setQuote] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuote(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  const isDark = theme === "dark";

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}>
        <div className="text-center">
          <Rocket className={`w-12 h-12 mx-auto mb-4 ${
            isDark ? "text-cyan-400" : "text-emerald-500"
          }`} />
          <p className={isDark ? "text-white" : "text-gray-900"}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle key={i} index={i} isDark={isDark} />
        ))}
      </div>

      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isDark
            ? [
                "radial-gradient(circle at 20% 20%, rgba(0,255,200,0.15), transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(0,200,255,0.1), transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(100,100,255,0.1), transparent 50%)",
              ]
            : [
                "radial-gradient(circle at 20% 20%, rgba(0,200,255,0.25), transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15), transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(100,255,200,0.2), transparent 50%)",
              ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* Interactive cursor glow */}
      <motion.div
        className={`absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none ${
          isDark ? "bg-cyan-400" : "bg-emerald-400"
        }`}
        animate={{
          x: mouse.x - 200,
          y: mouse.y - 200,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl px-6 py-12">
       

        {/* Animated 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="relative mb-6"
        >
          <motion.h1
            className="text-8xl sm:text-9xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            404
          </motion.h1>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-500/20 rounded-2xl blur-xl -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Dynamic quote */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl text-muted-foreground mb-8 font-medium"
        >
          {quote}
        </motion.p>

        {/* Enhanced tip box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`mb-10 p-6 rounded-2xl border backdrop-blur-sm ${
            isDark
              ? "bg-white/10 border-white/20 shadow-2xl"
              : "bg-white/80 border-gray-200 shadow-xl"
          }`}
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-cyan-500/20" : "bg-emerald-500/20"
              }`}
            >
              <Sparkles
                className={`w-5 h-5 ${
                  isDark ? "text-cyan-400" : "text-emerald-500"
                }`}
              />
            </div>
            <div className="text-left">
              <p className="text-base sm:text-lg font-semibold mb-2">
                <span
                  className={
                    isDark ? "text-cyan-400" : "text-emerald-600"
                  }
                >
                  Pro Tip:
                </span>{" "}
                Try heading back home before the AI decides you're lost forever 😅
              </p>
              <p className="text-sm text-muted-foreground">
                Our AI is constantly learning from these moments to improve navigation!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-xl px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Home className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Go Home
              </Button>
            </motion.div>
          </Link>

          <Link 
            href="https://github.com/Om-singh-ui/NextStep.io/issues" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isDark ? "secondary" : "outline"}
                size="lg"
                className="w-full sm:w-auto rounded-xl px-8 py-3 font-semibold hover:bg-emerald-50 dark:hover:bg-white/10 transition-all duration-300 group border-2"
              >
                <Github className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Report Issue
                <ArrowLeft className="ml-2 w-4 h-4 transform rotate-180" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Additional help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-muted-foreground max-w-md mx-auto"
        >
          Clicking "Report Issue" will take you to our GitHub issues page where you can help us improve NextStep.io
        </motion.p>
      </div>

      {/* Enhanced footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-center"
      >
        <div
          className={`px-6 py-3 rounded-full backdrop-blur-sm border ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white/60 border-gray-200"
          }`}
        >
          <p className="text-sm font-medium">
            NextStep.io helping lost users find purpose since 2024{" "}
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 10 }}
              className="inline-block"
            >
              ✨
            </motion.span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}