"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Sparkles, Rocket, ArrowRight, Play, X, ChevronLeft, ChevronRight, Star, Zap, Target, LineChart, Brain, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// Optimized image component
const OptimizedImage = ({ src, alt, className, fallback = null }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return fallback || (
      <div className={`${className} bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center rounded-2xl`}>
        <div className="text-center p-4">
          <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">Hero Image</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      onError={() => setError(true)}
    />
  );
};

// Video Component 1 - Fixed with proper audio handling
const VideoComponent1 = () => {
  const videoRef = useRef(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // Only unmute if user has interacted with the page
      videoRef.current.muted = !hasUserInteracted;
      
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          // If user has interacted, fade in audio
          if (hasUserInteracted) {
            videoRef.current.muted = false;
          }
        })
        .catch(e => {
          console.log("Playback failed:", e);
          // If autoplay fails, keep it muted but still play
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle any user interaction on the page
  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      // If video is currently playing muted, unmute it
      if (videoRef.current && isPlaying) {
        videoRef.current.muted = false;
      }
    }
  };

  // Add click event to video container
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('click', handleUserInteraction);
      return () => videoElement.removeEventListener('click', handleUserInteraction);
    }
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleUserInteraction}
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg border border-slate-200/50 dark:border-slate-600/50 bg-gradient-to-br from-white/10 to-slate-50/20 dark:from-slate-800/20 dark:to-slate-900/20 backdrop-blur-sm h-full"
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        muted={!hasUserInteracted} // Start muted until user interaction
        loop
        playsInline
        preload="metadata"
        poster="/hero2.png"
      />

      {/* Enhanced hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-500 pointer-events-none" />
      
      {/* Subtle play indicator with audio status */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-1.5 border border-white/20 flex items-center gap-1">
          <Play className="w-3 h-3 text-white" fill="white" />
          {!hasUserInteracted && (
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" title="Click to enable audio" />
          )}
        </div>
      </div>
    </div>
  );
};

// Video Component 2 - Same fix
const VideoComponent2 = () => {
  const videoRef = useRef(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = !hasUserInteracted;
      
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          if (hasUserInteracted) {
            videoRef.current.muted = false;
          }
        })
        .catch(e => {
          console.log("Playback failed:", e);
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      if (videoRef.current && isPlaying) {
        videoRef.current.muted = false;
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('click', handleUserInteraction);
      return () => videoElement.removeEventListener('click', handleUserInteraction);
    }
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleUserInteraction}
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg border border-slate-200/50 dark:border-slate-600/50 bg-gradient-to-br from-white/10 to-slate-50/20 dark:from-slate-800/20 dark:to-slate-900/20 backdrop-blur-sm h-full"
    >
      <video
        ref={videoRef}
        src="/Creating_Video_From_Illustrations.mp4"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        muted={!hasUserInteracted}
        loop
        playsInline
        preload="metadata"
        poster="/hero1.png"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-emerald-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-sm rounded-full p-1.5 border border-white/20 flex items-center gap-1">
          <Play className="w-3 h-3 text-white" fill="white" />
          {!hasUserInteracted && (
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" title="Click to enable audio" />
          )}
        </div>
      </div>
    </div>
  );
};

// Fixed Particle Component - Client-side only to avoid hydration mismatch
const FloatingParticles = ({ count = 3 }) => {
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsClient(true);
    // Generate random positions only on client
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: 3 + i
      }))
    );
  }, [count]);

  if (!isClient || particles.length === 0) {
    // Render invisible placeholders during SSR
    return (
      <div className="absolute -z-10 inset-0">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full opacity-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute -z-10 inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{ x: particle.initialX, y: particle.initialY }}
          animate={{
            x: [particle.initialX, particle.initialX + 50],
            y: [particle.initialY, particle.initialY + 50],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const carouselIntervalRef = useRef(null);

  // Optimized text content
  const heroDescription = "With our expert career solutions, track your progress, develop skills, and accelerate career growth with AI-powered insights.";

  // Optimized features array
  const features = useMemo(() => [
    {
      icon: Brain,
      title: "AI Career Pathing",
      description: "Intelligent career recommendations powered by machine learning",
      color: "from-blue-500 to-purple-600",
      image: "/path.png"
    },
    {
      icon: Target,
      title: "Skill Assessment",
      description: "Comprehensive analysis of your strengths and growth areas",
      color: "from-emerald-500 to-cyan-600",
      image: "/skill.png"
    },
    {
      icon: LineChart,
      title: "Personalized Roadmaps",
      description: "Custom learning paths tailored to your career goals",
      color: "from-orange-500 to-red-600",
      image: "/roadmap.png"
    }
  ], []);

  const activeFeatures = features;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optimized video popup management
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = 'hidden';
      carouselIntervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentImageIndex(prev => (prev + 1) % activeFeatures.length);
      }, 4000);
    } else {
      document.body.style.overflow = 'unset';
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    }

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
      document.body.style.overflow = 'unset';
    };
  }, [showVideo, activeFeatures.length]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showVideo) {
        handleCloseVideo();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showVideo]);

  const handleGetStarted = useCallback(() => {
    const route = isSignedIn ? "/dashboard" : "/sign-in";
    router.push(route);
  }, [isSignedIn, router]);

  const handleWatchDemo = useCallback(() => {
    setShowVideo(true);
    setCurrentImageIndex(0);
    setDirection(0);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setShowVideo(false);
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
  }, []);

  const navigateImage = useCallback((newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setCurrentImageIndex(prev => (prev + 1) % activeFeatures.length);
    } else {
      setCurrentImageIndex(prev => (prev - 1 + activeFeatures.length) % activeFeatures.length);
    }
  }, [activeFeatures.length]);

  const nextImage = useCallback(() => navigateImage(1), [navigateImage]);
  const prevImage = useCallback(() => navigateImage(-1), [navigateImage]);

  const goToImage = useCallback((index) => {
    const newDirection = index > currentImageIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentImageIndex(index);
  }, [currentImageIndex]);

  const cardVariants = useMemo(() => ({
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    })
  }), []);

  const buttonText = useMemo(() =>
    isSignedIn ? "Go to Dashboard" : "Get Started",
    [isSignedIn]
  );

  return (
    <section className="relative min-h-[80vh] mt-12 sm:mt-16 flex flex-col items-center justify-center py-6 sm:py-8 px-4 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full blur-3xl top-10 -left-20 sm:-left-32 bg-gradient-to-r from-blue-500/10 to-purple-600/5 animate-pulse"
          aria-hidden="true"
        />
        <div
          className="absolute w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full blur-3xl bottom-10 right-10 bg-gradient-to-r from-emerald-400/10 to-cyan-500/5 animate-pulse delay-1000"
          aria-hidden="true"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" aria-hidden="true" />
      </div>

      {/* Optimized Hero Content */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5 sm:space-y-6 text-left"
          >
            {/* Enhanced Tagline */}
            <motion.div
              className="relative inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium border border-slate-300/50 dark:border-slate-600/50 bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm transition-all duration-300 ease-out hover:border-slate-400/70 hover:shadow-sm cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ y: [0, -1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Waves className="w-3 h-3 text-slate-600 dark:text-slate-400" />
              </motion.div>
              <span className="text-slate-700 dark:text-slate-300 relative z-10">
                Unlock Your Career Potential
              </span>
              <Rocket className="w-3 h-3 text-slate-600 dark:text-slate-400 group-hover:translate-y-[-1px] transition-transform" />
            </motion.div>

            {/* Enhanced Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-plus-jakarta tracking-tight leading-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <motion.span
                  className="inline-block font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Make your career
                </motion.span>

                <br />
                <motion.span
                  className="inline-block mt-1 sm:mt-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    10x more optimized
                  </span>
                  <motion.span
                    className="text-blue-500 ml-1"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    .
                  </motion.span>
                </motion.span>
              </motion.h1>
            </div>

            {/* Enhanced Subtitle */}
            <motion.div
              className="max-w-[100%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <TextGenerateEffect
                words={heroDescription}
                className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed tracking-wide font-medium text-left"
              />
            </motion.div>

            {/* Enhanced Trusted By Section */}
            <motion.div
              className="flex items-center gap-3 py-3 border-y border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 border border-background -ml-1 first:ml-0 shadow-sm"
                  />
                ))}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Trusted by 27,000+ professionals</span>
              </div>
            </motion.div>

            {/* CTA Buttons - ORIGINAL UI KEPT INTACT */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-3 border-2 relative overflow-hidden bg-transparent text-primary border-transparent before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-primary/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 after:absolute after:inset-0 after:z-0 after:bg-gradient-to-r after:from-primary after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100 hover:text-black hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-500 hover:scale-105"
              >
                <span className="relative z-10">{buttonText}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>

              <Button
                onClick={handleWatchDemo}
                size="lg"
                className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-3 border-2 relative overflow-hidden bg-transparent text-primary border-transparent before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-primary/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 after:absolute after:inset-0 after:z-0 after:bg-gradient-to-r after:from-primary after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100 hover:text-black hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-500 hover:scale-105"
              >
                <span className="relative z-10">Book a demo</span>
                <Play className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" aria-hidden="true" />
              </Button>
            </motion.div>

            {/* Enhanced Features List */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[
                "Real-time progress tracking",
                "AI-powered recommendations",
                "Personalized roadmaps",
                "Skill assessment tools"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Video Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end lg:ml-20 xl:ml-24"
          >
            {/* Main container with enhanced glow */}
            <div className="relative w-full max-w-[820px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_60px_140px_rgba(0,0,0,0.45)] bg-gradient-to-br from-white/10 to-slate-50/20 dark:from-slate-900/40 dark:to-slate-800/30 backdrop-blur-md border border-slate-200/40 dark:border-slate-700/40">
              {/* Videos Container - Minimal spacing */}
              <div className="flex flex-col h-full p-0.5 gap-0.5">
                {/* Video 2 (Top) - Reduced spacing */}
                <div className="flex-1 min-h-0 relative">
                  <VideoComponent2 />
                </div>

                {/* Video 1 (Bottom) - Reduced spacing */}
                <div className="flex-1 min-h-0 relative">
                  <VideoComponent1 />
                </div>
              </div>

              {/* Container inner glow effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-white/5 dark:to-slate-900/10" />
            </div>

            {/* Enhanced ambient glow */}
            <div className="absolute -z-10 inset-0 blur-[120px] opacity-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-indigo-500/25 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/20 via-cyan-500/15 to-blue-500/20 animate-pulse delay-1000" />
            </div>

            {/* Fixed Floating particles effect - Now client-side only */}
            <FloatingParticles count={3} />
          </motion.div>
        </div>
      </div>

      {/* Optimized Video Popup */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseVideo}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-lg sm:rounded-xl shadow-xl border border-slate-200 dark:border-slate-700"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, type: "spring", damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
            >
              {/* Optimized Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-sm">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h3 id="popup-title" className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Product Demo
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                      See how we transform careers
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseVideo}
                  className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-red-500/50 transition-all duration-200 hover:scale-110"
                  aria-label="Close dialog"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 hover:text-white transition-colors" />
                </button>
              </div>

              {/* Optimized Content Layout */}
              <div className="flex flex-col lg:flex-row">
                {/* Video Section */}
                <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-video border border-white/20">
                    <iframe
                      src="https://www.youtube.com/embed/PDk4G1Ck6A0?autoplay=1&mute=0"
                      title="CareerFlow Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  {/* Thank You Note */}
                  <motion.div
                    className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-md flex-shrink-0">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm sm:text-base mb-1">
                          Ready to Transform Your Career?
                        </h4>
                        <p className="text-slate-200 text-xs leading-relaxed">
                          Join professionals accelerating growth with AI-powered guidance.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Features Carousel */}
                <div className="flex-1 p-3 sm:p-4 bg-gradient-to-b from-blue-900/5 to-purple-900/5 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                      Key Features
                    </h3>
                    <div className="flex gap-1 bg-white/10 rounded-lg p-0.5 backdrop-blur-sm">
                      {activeFeatures.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`p-1 rounded-md transition-all duration-200 ${index === currentImageIndex
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-110"
                            : "bg-white/5 hover:bg-white/10"
                            }`}
                          aria-label={`View feature ${index + 1}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/40"
                            }`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Carousel Container */}
                  <div className="relative h-32 sm:h-40 mb-3 sm:mb-4 rounded-lg overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentImageIndex}
                        custom={direction}
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          duration: 0.4
                        }}
                        className="relative w-full h-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600"
                      >
                        <OptimizedImage
                          src={activeFeatures[currentImageIndex].image}
                          alt={activeFeatures[currentImageIndex].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                            <div className={`p-1 rounded-md bg-gradient-to-r ${activeFeatures[currentImageIndex].color}`}>
                              {React.createElement(activeFeatures[currentImageIndex].icon, {
                                className: "w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                              })}
                            </div>
                            <h4 className="text-white font-semibold text-xs sm:text-sm">
                              {activeFeatures[currentImageIndex].title}
                            </h4>
                          </div>
                          <p className="text-slate-200 text-xs leading-tight">
                            {activeFeatures[currentImageIndex].description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-md p-1 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-md p-1 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {activeFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      const isActive = index === currentImageIndex;

                      return (
                        <button
                          key={feature.title}
                          onClick={() => goToImage(index)}
                          className={`relative p-1.5 sm:p-2 rounded-lg border backdrop-blur-sm transition-all duration-200 text-left overflow-hidden group ${isActive
                            ? `border-transparent bg-gradient-to-r ${feature.color}/20 scale-105 shadow-sm`
                            : "border-slate-200 dark:border-slate-600 bg-white/5 hover:border-slate-300 dark:hover:border-slate-500"
                            }`}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className={`p-1 rounded-md bg-gradient-to-r ${feature.color} group-hover:scale-105 transition-transform`}>
                              <IconComponent className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            </div>
                            <span className={`font-medium text-xs sm:text-sm ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'
                              }`}>
                              {feature.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={handleGetStarted}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 hover:scale-105 shadow-sm border-0"
                    >
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Begin Your Journey
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="mt-8 sm:mt-12">
        <MacbookScroll />
      </section>
    </section>
  );
};

export default React.memo(Hero);