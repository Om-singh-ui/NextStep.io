"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Twitter,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Compass,
  Home,
  Star,
  Info,
  MessageCircle,
  Sun,
  Moon,
  Rocket,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useTheme } from "@/components/theme-provider"; // <- use shared theme

// Simple GitHub Star Component (Client-Side Only) - Compact version
function GithubStarCount() {
  const [count, setCount] = useState(1); // Start with 1 as fallback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        setError(null);

        // Direct GitHub API call - no API route needed
        const response = await fetch(
          "https://api.github.com/repos/Om-singh-ui/NextStep.io",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          // If rate limited or other error, just use the fallback count
          console.log("GitHub API not available, using fallback");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCount(data.stargazers_count || 1);
        setLoading(false);
      } catch (err) {
        console.log("GitHub fetch failed, using fallback:", err.message);
        setError(err.message);
        setLoading(false);
        // Keep the current count (1 or previously fetched value)
      }
    };

    fetchStars();
    const interval = setInterval(fetchStars, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md font-semibold text-gray-800 dark:text-gray-200 min-w-[32px] text-center"
          >
            ...
          </motion.span>
        ) : (
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-[10px] bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900 dark:to-cyan-900 px-1.5 py-0.5 rounded-md font-semibold text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
          >
            ⭐ {Intl.NumberFormat().format(count)}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isHovered, setIsHovered] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Use the shared theme context
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const checkIsMobile = () => {
      if (typeof window !== "undefined") setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    if (typeof window !== "undefined")
      window.addEventListener("resize", checkIsMobile);

    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleEmailClick = () => {
    if (typeof window !== "undefined")
      window.location.href = "mailto:omchouhan227@gmail.com";
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <footer className="relative bg-transparent py-8 px-4 sm:py-12 sm:px-6">
      {/* Oval shaped container */}
      <div className="relative container mx-auto rounded-[2rem] sm:rounded-[3rem] border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.25)] sm:shadow-[0_0_25px_rgba(59,130,246,0.35)] bg-white/70 dark:bg-black/60 backdrop-blur-md overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] sm:hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] hover:border-blue-400/50">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-400/10 dark:bg-emerald-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-cyan-400/10 dark:bg-cyan-500/20 rounded-full blur-xl sm:blur-2xl animate-pulse delay-500" />
        </div>

        {/* Main content */}
        <div className="relative px-4 py-8 sm:px-10 sm:py-14 grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 text-base">

          {/* Enhanced Brand Section */}
          <div className="space-y-6 select-none">
            <div className="flex items-center gap-3 group">

              {/* Minimal Monochrome Logo Container */}
              <div className="relative w-9 h-9 flex items-center justify-center group">

                {/* Soft Neutral Border Glow */}
                <div
                  className="
          absolute inset-0 rounded-xl 
          bg-gradient-to-br from-gray-300 to-gray-500
          opacity-60
          group-hover:opacity-90
          transition-all duration-500
        "
                />

                {/* Inner Container */}
                <div
                  className="
          absolute inset-[2px] rounded-lg 
          bg-white dark:bg-gray-900
          group-hover:bg-gray-100 dark:group-hover:bg-gray-800
          transition-colors duration-500
        "
                />

                {/* Logo Image */}
                <img
                  src="/logo.png"
                  alt="NextStep.io Logo"
                  className="
          relative z-10 w-5 h-5 object-contain
          transition-all duration-500 
          group-hover:scale-110 group-hover:rotate-12
          drop-shadow-[0_0_8px_rgba(0,0,0,0.35)]
          filter brightness-110
        "
                />
              </div>

              {/* Brand Title – Minimal Black/White Gradient */}
              <div className="flex flex-col gap-0.5">
                <span
                  className="
    text-2xl font-black 
    bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500
    dark:from-emerald-300 dark:via-cyan-300 dark:to-purple-300
    bg-clip-text text-transparent 
    flex items-center gap-2
    transition-all duration-500
    group-hover:scale-[1.02]
    tracking-tight
  "
                >
                  NextStep.io

                  <Rocket
                    className="
      w-6 h-6
      transition-all duration-500
      group-hover:translate-x-1 
      group-hover:scale-110 
      group-hover:rotate-45
      text-emerald-500 dark:text-emerald-300
    "
                    style={{
                      color: "url(#rocketGradient)"
                    }}
                  />
                </span>

                <svg width="0" height="0">
                  <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop stopColor="#10b981" offset="0%" />
                    <stop stopColor="#22d3ee" offset="50%" />
                    <stop stopColor="#a855f7" offset="100%" />
                  </linearGradient>
                </svg>

                {/* Subline */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
                    Us chasing Excellence
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="relative group/desc pl-1">
              <p className="
      text-gray-700 dark:text-muted-foreground/80
      leading-relaxed text-sm
      transition-all duration-500
      group-hover/desc:text-gray-900 dark:group-hover/desc:text-gray-200
      font-medium relative
    "
              >

                {/* Gradient Title Text */}
                <span
                  className="
        font-semibold 
        bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400
        dark:from-emerald-300 dark:via-cyan-300 dark:to-purple-300
        bg-clip-text text-transparent
        transition-all duration-500
        group-hover/desc:brightness-110
      "
                >
                  Building the future of career growth
                </span>

                {/* Body Text */}
                <span
                  className="
        inline-block transition-all duration-500
        group-hover/desc:translate-x-[1px]
      "
                >
                  powered by intelligent AI systems, thoughtful design frameworks,
                  and enterprise-ready solutions that elevate professional development.

                  {/* Gradient Rocket */}
                  <span
                    className="
          inline-block ml-1 transition-transform duration-500 
          group-hover/desc:translate-y-[-2px] group-hover/desc:rotate-3"
                  >
                    🚀
                  </span>
                </span>
              </p>

              {/* Soft Glow on Hover */}
              <div
                className="
      absolute inset-0 rounded-md
      opacity-0 group-hover/desc:opacity-100
      transition-opacity duration-700 pointer-events-none
      bg-gradient-to-r from-emerald-100/10 to-transparent
      dark:from-emerald-900/10 dark:to-transparent
    "
              />
            </div>

            {/* Contact Button – Neutral & Clean */}
            <button
              onClick={handleEmailClick}
              onMouseEnter={() => setIsHovered('email')}
              onMouseLeave={() => setIsHovered(null)}
              className="
      relative inline-flex items-center gap-3 
      text-gray-800 dark:text-gray-300
      text-sm font-semibold
      hover:text-black dark:hover:text-white
      transition-all duration-500
      group p-3 rounded-xl
      bg-gradient-to-r from-gray-50 to-gray-100
      dark:from-gray-900 dark:to-gray-800
      hover:from-gray-100 hover:to-gray-200
      dark:hover:from-gray-800 dark:hover:to-gray-700
      border border-gray-300/50 dark:border-gray-700/50
      hover:border-gray-400 dark:hover:border-gray-600
      hover:shadow-lg hover:shadow-black/10
      transform hover:-translate-y-0.5
      overflow-hidden
    "
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300/0 via-gray-400/10 to-gray-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Button Content */}
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <Mail className="w-5 h-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                </div>

                <span
                  className="
          bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400
          bg-clip-text text-transparent
          transition-all duration-500
          font-bold
        "
                >
                  Contact Us
                </span>

                <ArrowRight
                  className={`
          w-4 h-4 transition-all duration-500
          ${isHovered === "email"
                      ? "translate-x-2 opacity-100 scale-110 text-black dark:text-white"
                      : "opacity-0 -translate-x-1 text-gray-600 dark:text-gray-400"
                    }
        `}
                />
              </div>
            </button>
          </div>

          {isMobile ? (
            <>
              {/* Quick Links Accordion */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleAccordion(0)}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-gray-200 text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Quick Links
                  {activeAccordion === 0 ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeAccordion === 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <ul className="space-y-3 text-gray-700 dark:text-gray-400 pt-3">
                    <li>
                      <Link href="/" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1">
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1">
                        <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>About</span>
                      </button>
                    </li>
                    <li>
                      <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1">
                        <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Features</span>
                      </button>
                    </li>
                    <li>
                      <button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1">
                        <MessageCircleQuestion className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>FAQ</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Resources Accordion */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleAccordion(1)}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-gray-200 text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Resources
                  {activeAccordion === 1 ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeAccordion === 1 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <ul className="space-y-3 text-gray-700 dark:text-gray-400 pt-3">
                    <li>
                      <Link target="_blank" href="https://drive.google.com/drive/search?q=parent%3A1oqmFSf48p4sppJ9TECES8uyqCCJxuIiT" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1">
                        <Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Docs</span>
                      </Link>
                    </li>
                    <li>
                      <Link target="_blank" href="https://medium.com/@omchouhan227" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1">
                        <Compass className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Blog</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/support" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1">
                        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Support</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Connect Section - FIXED: Arrow appears on container hover */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-lg group hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Connect</h4>
                <div className="flex gap-5 text-gray-600 dark:text-gray-400">
                  <Link href="https://twitter.com" target="_blank" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 transform relative group">
                    <Twitter className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Follow us</span>
                  </Link>
                  <Link href="https://github.com/Om-singh-ui" target="_blank" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 transform relative group">
                    <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Star us</span>
                  </Link>
                  <Link href="https://www.linkedin.com/in/om-singh-chouhan-1a761a323/" target="_blank" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 transform relative group">
                    <Linkedin className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Connect</span>
                  </Link>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-lg group hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Open Source</h4>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    {/* FIXED: Arrow appears when hovering the entire GitHub container */}
                    <div className="group/gh relative">
                      <Link
                        href="https://github.com/Om-singh-ui/NextStep.io"
                        target="_blank"
                        className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1.5 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:shadow-md"
                      >
                        <Github className="w-4 h-4" />
                        <GithubStarCount />
                        {/* Arrow appears on parent container hover */}
                        <div className="opacity-0 -translate-x-2 group-hover/gh:opacity-100 group-hover/gh:translate-x-0 transition-all duration-300 ease-out flex items-center">
                          <svg className="w-3 h-3 text-blue-500 animate-bounce" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (

            /* Desktop layout */
            <>
              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-lg group hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Quick Links</h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                  <li><Link href="/" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1"><Home className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>Home</span></Link></li>
                  <li><button onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1"><Info className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>About</span></button></li>
                  <li><button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1"><Star className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>Features</span></button></li>
                  <li><button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1"><MessageCircleQuestion className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>FAQ</span></button></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-lg group hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Resources</h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                  <li><Link target="_blank" href="https://drive.google.com/drive/search?q=parent%3A1oqmFSf48p4sppJ9TECES8uyqCCJxuIiT" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1"><Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>Docs</span></Link></li>
                  <li><Link target="_blank" href="https://medium.com/@omchouhan227" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1"><Compass className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>Blog</span></Link></li>
                  <li><Link href="/support" className="flex items-center gap-2 hover:text-blue-500 transition-all duration-300 group py-1"><MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /><span>Support</span></Link></li>
                </ul>
              </div>

              {/* Social & GitHub Stats */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-lg group hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Connect</h4>
                  <div className="flex gap-5 text-gray-600 dark:text-gray-400">
                    <Link href="https://twitter.com" target="_blank" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 transform relative group">
                      <Twitter className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Follow us</span>
                    </Link>
                    <Link href="https://github.com/Om-singh-ui" target="_blank" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 transform relative group">
                      <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Star us</span>
                    </Link>
                    <Link href="https://www.linkedin.com/in/om-singh-chouhan-1a761a323/" target="_blank" className="hover:text-blue-500 transition-all duration-300 hover:scale-110 transform relative group">
                      <Linkedin className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Connect</span>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-lg group hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Open Source</h4>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    {/* GitHub Star Count with Enhanced Tooltip */}
                    <div className="relative flex-0.5">
                      <Link
                        href="https://github.com/Om-singh-ui/NextStep.io"
                        target="_blank"
                        className="peer flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1.5 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:shadow-md bg-gradient-to-r from-gray-50/80 to-gray-100/60 dark:from-gray-800/80 dark:to-gray-900/60 hover:from-blue-50/80 hover:to-purple-50/60 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 backdrop-blur-sm group"
                      >
                        <Github className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        <GithubStarCount />
                        {/* Animated pointing arrow */}
                        <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center">
                          <svg className="w-3 h-3 text-blue-500 animate-bounce" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                          </svg>
                        </div>
                      </Link>

                      {/* Enhanced Tooltip popup with delayed close */}
                      <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 opacity-0 scale-95 peer-hover:opacity-100 peer-hover:scale-100 transition-all duration-300 ease-out z-20 pointer-events-none peer-hover:pointer-events-auto group/popup">
                        <div className="relative bg-gradient-to-br from-white/90 to-blue-50/80 dark:from-gray-800/90 dark:to-blue-900/20 backdrop-blur-xl text-gray-800 dark:text-gray-200 text-sm rounded-2xl border border-blue-200/60 dark:border-blue-500/30 p-4 shadow-2xl shadow-blue-500/20 dark:shadow-blue-700/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-600/40 hover:border-blue-300/80 dark:hover:border-blue-400/50">
                          {/* Animated border glow */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 peer-hover:opacity-100 transition-opacity duration-700 blur-sm -z-10"></div>

                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400/60 rounded-tl-2xl"></div>
                          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400/60 rounded-tr-2xl"></div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400/60 rounded-bl-2xl"></div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400/60 rounded-br-2xl"></div>

                          {/* Content */}
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                              <p className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Open Source Project
                              </p>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                              NextStep.io is open source — explore, contribute, or star us on GitHub! Your support helps us grow. 🌟
                            </p>

                            {/* Interactive hint with click functionality */}
                            <button
                              onClick={() => window.open('https://github.com/Om-singh-ui/NextStep.io', '_blank')}
                              className="flex items-center gap-1 mt-3 text-xs text-blue-600 dark:text-blue-400 opacity-80 hover:opacity-100 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 cursor-pointer group/button"
                            >
                              <span className="animate-bounce group-hover/button:scale-110 transition-transform">👉</span>
                              <span className="group-hover/button:underline group-hover/button:font-medium transition-all">
                                Click to visit repository
                              </span>
                            </button>
                          </div>

                          {/* Auto-close delay indicator */}
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gray-300/50 dark:bg-gray-600/50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500/60 dark:bg-blue-400/60 rounded-full transition-all duration-1000 ease-linear peer-hover:w-full group-hover/popup:w-0 group-hover/popup:transition-none"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-gray-200 dark:border-white/10 py-4 sm:py-6">
          <div className="px-4 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="px-4 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3 group cursor-default">
                {/* Copyright Text */}
                <div className="text-sm text-gray-600 dark:text-muted-foreground/70 flex items-center gap-2">
                  <span>© {currentYear} Crafted with precision</span>
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse group-hover:rotate-180 group-hover:scale-110 transition-all duration-500" />
                </div>

                {/* Status Section */}
                <div className="hidden sm:flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 group hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors duration-300">
                    <div className="text-gray-400 dark:text-gray-500 font-mono">
                      v2.1.0
                    </div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* THEME BUTTON — now uses provider's toggleTheme */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r from-blue-500 to-emerald-500 hover:text-white transition-all duration-300 shadow-md hover:scale-110 group relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center">
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
