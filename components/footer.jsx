"use client";

import React, { useState, useEffect, useRef } from "react";
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
        const response = await fetch('https://api.github.com/repos/Om-singh-ui/NextStep.io', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // Optional: Add your token here if you have one
            // 'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
          },
        });

        if (!response.ok) {
          // If rate limited or other error, just use the fallback count
          console.log('GitHub API not available, using fallback');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCount(data.stargazers_count || 1);
        setLoading(false);
        
      } catch (err) {
        console.log('GitHub fetch failed, using fallback:', err.message);
        setError(err.message);
        setLoading(false);
        // Keep the current count (1 or previously fetched value)
      }
    };

    fetchStars();

    // Optional: Refresh every 5 minutes
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
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHovered, setIsHovered] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const systemPrefersDark = typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

    if (savedTheme === "light" || (!savedTheme && !systemPrefersDark)) {
      setIsDarkMode(false);
      if (typeof document !== "undefined") document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      if (typeof document !== "undefined") document.documentElement.classList.add("dark");
    }

    const checkIsMobile = () => {
      if (typeof window !== "undefined") setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    if (typeof window !== "undefined") window.addEventListener('resize', checkIsMobile);

    return () => {
      if (typeof window !== "undefined") window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      if (typeof document !== "undefined") document.documentElement.classList.remove("dark");
      if (typeof window !== "undefined") localStorage.setItem("theme", "light");
    } else {
      if (typeof document !== "undefined") document.documentElement.classList.add("dark");
      if (typeof window !== "undefined") localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleEmailClick = () => {
    if (typeof window !== "undefined") window.location.href = "mailto:omchouhan227@gmail.com";
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
          {/* Brand - Always visible */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-ping absolute group-hover:animate-none group-hover:scale-125 transition-transform" />
                <div className="w-4 h-4 bg-emerald-500 rounded-full relative z-10 group-hover:bg-emerald-400 transition-colors" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform flex items-center gap-1">
                NextStep.io
                <Rocket className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
            <p className="text-gray-700 dark:text-muted-foreground/80 leading-relaxed text-[14px] group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
              Building the future of digital experiences with AI, clean design,
              and scalable systems 🚀
            </p>
            <button
              onClick={handleEmailClick}
              onMouseEnter={() => setIsHovered("email")}
              onMouseLeave={() => setIsHovered(null)}
              className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm hover:text-blue-500 transition-all duration-300 group relative"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">Contact Us</span>
              <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isHovered === "email" ? "translate-x-1 opacity-100" : "opacity-0 -translate-x-1"}`} />
            </button>
          </div>

          {/* Accordion sections for mobile */}
          {isMobile ? (
            <>
              {/* Quick Links Accordion */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleAccordion(0)}
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-gray-200 text-lg hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Quick Links
                  {activeAccordion === 0 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
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
                  {activeAccordion === 1 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === 1 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
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

              {/* Connect Section */}
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
                
                {/* GitHub Stats */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200 text-lg group hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Open Source</h4>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Link href="https://github.com/Om-singh-ui/NextStep.io" target="_blank" className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1.5 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:shadow-md flex-1">
                      <Github className="w-4 h-4" />
                      <GithubStarCount />
                    </Link>
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
                    <Link href="https://github.com/Om-singh-ui/NextStep.io" target="_blank" className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1.5 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:shadow-md flex-1">
                      <Github className="w-4 h-4" />
                      <GithubStarCount />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-gray-200 dark:border-white/10 py-4 sm:py-6">
          <div className="px-4 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-muted-foreground/70 flex items-center gap-1 group">
              © {currentYear} NextStep.io — Crafted with precision
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <button onClick={toggleTheme} className="p-2 sm:p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r from-blue-500 to-emerald-500 hover:text-white transition-all duration-300 shadow-md hover:scale-110 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center">
                {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}