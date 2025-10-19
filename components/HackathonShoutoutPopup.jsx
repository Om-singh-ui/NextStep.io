"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Sparkles,
  X,
  Trophy,
  Cloud,
  Rocket,
  Heart,
  ExternalLink,
  Linkedin,
  Code,
  Coffee,
  Users,
  Clock,
  ChevronDown,
  User,
} from "lucide-react";

// Dynamically import Confetti to avoid SSR issues
const Confetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

// Button component without TypeScript syntax
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

const HackathonShoutoutPopup = () => {
  const [show, setShow] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Team members data
  const teamMembers = [
    {
      name: "Om Singh Chouhan",
      linkedin: "https://www.linkedin.com/in/om-singh-chouhan-1a761a323",
    },
    {
      name: "Jeet Chetry",
      linkedin: "https://www.linkedin.com/in/jeet-chetry-240948368/",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Only run in browser environment
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const timer = setTimeout(() => {
      setShow(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isMounted]);

  // Only generate particles after component mounts on client
  const particles = useMemo(() => {
    if (!isMounted) return [];
    
    return Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
      size: Math.random() * 4 + 1,
    }));
  }, [isMounted]);

  // Don't render anything during SSR or if not mounted
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {confetti && typeof window !== "undefined" && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.25}
          colors={["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"]}
          opacity={0.9}
          confettiSource={{
            x: windowSize.width / 2,
            y: windowSize.height / 2,
            w: 0,
            h: 0,
          }}
        />
      )}

      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
          >
            {/* Enhanced backdrop with gradient animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-pink-900/20 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="bg-gradient-to-br from-white via-gray-50 to-indigo-50 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden border border-indigo-200/60 hover:shadow-2xl hover:shadow-indigo-300/40 transition-all duration-500"
              initial={{ scale: 0.7, opacity: 0, y: 50, rotate: 2 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50, rotate: -2 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.6,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced gradient border effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-3xl opacity-20 blur-lg transition-all duration-1000 hover:opacity-30 hover:blur-xl" />

              {/* Enhanced background pattern */}
              <div className="absolute inset-0 opacity-15">
                <motion.div
                  className="absolute top-0 left-0 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2,
                  }}
                />
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {particles.map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                    style={{
                      left: p.left,
                      top: p.top,
                      width: p.size,
                      height: p.size,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay,
                    }}
                  />
                ))}
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-indigo-400 opacity-60" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-purple-400 opacity-60" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-blue-400 opacity-60" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-pink-400 opacity-60" />

              {/* Close button */}
              <motion.button
                onClick={() => setShow(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md z-10 border border-gray-200"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close popup"
              >
                <X className="h-4 w-4 text-gray-600" />
              </motion.button>

              {/* Main content */}
              <div className="relative z-10">
                {/* Trophy Animation */}
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <div className="relative">
                    <Trophy className="h-14 w-14 text-yellow-500 drop-shadow-md" />
                    <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
                    <motion.div
                      className="absolute -inset-3 bg-yellow-200 rounded-full opacity-0"
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  id="popup-title"
                  className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  🎉 Thanks for checking us out!
                </motion.h2>

                {/* Team Name */}
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="text-sm text-gray-500">from</span>
                  <div className="font-mono font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CodeInflux.io
                  </div>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  className="text-gray-600 mb-4 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  We're excited to share our Google Cloud Hackathon project with you
                </motion.p>

                {/* Hackathon Badge */}
                <motion.div
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-indigo-200/60 mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Cloud className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-indigo-700">
                   Hackathon
                  </span>
                  <Rocket className="h-5 w-5 text-orange-500" />
                </motion.div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <motion.div
                    className="bg-white/90 p-2 rounded-lg border border-indigo-100 flex items-center justify-center gap-1 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Clock className="h-3 w-3 text-indigo-500" />
                    <span className="text-xs text-indigo-700">7 Days</span>
                  </motion.div>

                  {/* Team Member Dropdown */}
                  <motion.div
                    className="relative bg-white/90 p-2 rounded-lg border border-indigo-100 flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setIsTeamDropdownOpen(!isTeamDropdownOpen);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isTeamDropdownOpen}
                    aria-haspopup="true"
                  >
                    <Users className="h-3 w-3 text-indigo-500" />
                    <span className="text-xs text-indigo-700">2 Members</span>
                    <ChevronDown className={`h-3 w-3 text-indigo-500 transition-transform ${isTeamDropdownOpen ? 'rotate-180' : ''}`} />

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {isTeamDropdownOpen && (
                        <motion.div
                          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-indigo-100 z-20 overflow-hidden"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          role="menu"
                        >
                          {teamMembers.map((member, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 text-xs text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(member.linkedin, '_blank');
                              }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.stopPropagation();
                                  window.open(member.linkedin, '_blank');
                                }
                              }}
                              tabIndex={0}
                              role="menuitem"
                            >
                              <User className="h-3 w-3" />
                              {member.name}
                              <Linkedin className="h-3 w-3 ml-auto text-blue-500" />
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="bg-white/90 p-2 rounded-lg border border-indigo-100 flex items-center justify-center gap-1 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Code className="h-3 w-3 text-indigo-500" />
                    <span className="text-xs text-indigo-700">Next.js</span>
                  </motion.div>
                  <motion.div
                    className="bg-white/90 p-2 rounded-lg border border-indigo-100 flex items-center justify-center gap-1 shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Coffee className="h-3 w-3 text-indigo-500" />
                    <span className="text-xs text-indigo-700">Lots of Coffee</span>
                  </motion.div>
                </div>

                <motion.p
                  className="text-sm text-gray-600 flex items-center justify-center gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
                  Made with passion and cloud magic
                </motion.p>

                {/* LinkedIn Post Link */}
                <motion.div
                  className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200/60 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <p className="text-sm text-indigo-600 mb-2 flex items-center justify-center gap-1">
                    <Linkedin className="h-4 w-4" />
                    Check out our Hackathon post
                  </p>
                  <motion.a
                    href="https://www.linkedin.com/posts/om-singh-chouhan-1a761a323_generativeai-googlecloud-genai-activity-7368130513515044864-L9t_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition-colors px-3 py-1.5 bg-white rounded-lg border border-indigo-200 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LinkedIn Hackathon Announcement
                    <ExternalLink className="h-3 w-3" />
                  </motion.a>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button
                    onClick={() => setShow(false)}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-300/40 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 rounded-xl px-5 py-2"
                  >
                    <span>Continue Exploring ✨</span>
                  </Button>

                  <Button
                    className="flex items-center gap-2 border border-indigo-300 bg-white text-indigo-600 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transform hover:-translate-y-0.5 hover:scale-105 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl px-5 py-2"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/posts/om-singh-chouhan-1a761a323_generativeai-googlecloud-genai-activity-7368130513515044864-L9t_",
                        "_blank"
                      )
                    }
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>View Post</span>
                  </Button>
                </motion.div>
                <div className="mt-8 flex justify-center">
                  <p className="text-sm text-center text-gray-900 dark:text-gray-600 leading-relaxed">
                    Crafted by{" "}
                    <span className="font-semibold bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Om Singh Chouhan
                    </span>{" "}
                    <span className="inline-block animate-bounce">🚀</span>
                  </p>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HackathonShoutoutPopup;