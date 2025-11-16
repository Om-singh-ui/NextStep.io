"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Sparkles, Rocket, ArrowRight, Play, X, ChevronLeft, ChevronRight, Star, Zap, Target, LineChart, Brain, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Placeholder image component to handle empty src
const FeatureImage = ({ src, alt, className }) => {
  if (!src) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center`}>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-400 text-sm">Feature Image</p>
          <p className="text-gray-500 text-xs mt-1">Add your image URL</p>
        </div>
      </div>
    );
  }

  const handleError = (e) => {
    e.target.style.display = 'none';
    // Create fallback element
    const fallback = document.createElement('div');
    fallback.className = `${className} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center`;
    fallback.innerHTML = `
      <div class="text-center p-4">
        <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p class="text-gray-400 text-sm">Image not found</p>
        <p class="text-gray-500 text-xs mt-1">Check image path</p>
      </div>
    `;
    e.target.parentNode.appendChild(fallback);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
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

  // Fixed image paths - use absolute paths from public folder
  const features = useMemo(() => [
    {
      icon: Brain,
      title: "AI Career Pathing",
      description: "Intelligent career recommendations powered by machine learning",
      color: "from-purple-500 to-pink-500",
      image: "/path.png"
    },
    {
      icon: Target,
      title: "Skill Assessment",
      description: "Comprehensive analysis of your strengths and growth areas",
      color: "from-cyan-500 to-blue-500",
      image: "/skill.png"
    },
    {
      icon: LineChart,
      title: "Personalized Roadmaps",
      description: "Custom learning paths tailored to your career goals",
      color: "from-emerald-500 to-green-500",
      image: "/roadmap.png"
    },
    {
      icon: Users,
      title: "Job Matching",
      description: "Smart connections with your ideal career opportunities",
      color: "from-orange-500 to-red-500",
      image: "/job.png"
    },
    {
      icon: Zap,
      title: "Progress Tracking",
      description: "Real-time monitoring of your career development journey",
      color: "from-yellow-500 to-amber-500",
      image: "/progress.png"
    }
  ], []);

  // Use the actual features array with your images
  const activeFeatures = features;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced video popup management
  useEffect(() => {
    if (showVideo) {
      // Prevent background scroll when popup is open
      document.body.style.overflow = 'hidden';
      
      // Start carousel
      carouselIntervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentImageIndex(prev => (prev + 1) % activeFeatures.length);
      }, 4000);
    } else {
      // Restore scroll
      document.body.style.overflow = 'unset';
      
      // Clear interval
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
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
    })
  }), []);

  const buttonText = useMemo(() =>
    isSignedIn ? "Go to Dashboard" : "Get Started",
    [isSignedIn]
  );

  return (
    <section className="relative min-h-[90vh] mt-16 sm:mt-20 flex flex-col items-center justify-center py-8 sm:py-12 px-4 overflow-hidden">
      {/* Background Effects - UNCHANGED */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-3xl top-0 -left-40 sm:-left-60 bg-gradient-to-r from-indigo-500/40 to-purple-600/20 animate-pulse"
          aria-hidden="true"
        />
        <div
          className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-3xl bottom-0 right-0 bg-gradient-to-r from-cyan-400/40 to-emerald-400/20 animate-pulse delay-700"
          aria-hidden="true"
        />

        <div className="absolute inset-0 opacity-25" aria-hidden="true">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_90%,transparent_100%)]"
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" aria-hidden="true" />
      </div>

      {/* Hero Content - UNCHANGED */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative space-y-6 sm:space-y-8 text-center max-w-6xl mx-auto"
      >
        {/* Tagline - UNCHANGED */}
        <motion.div
          className="relative inline-flex items-center gap-2 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium border border-blue-500/40 bg-gradient-to-r from-indigo-500/10 via-blue-400/10 to-cyan-400/10 backdrop-blur-sm transition-all duration-500 ease-out hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5),0_0_45px_rgba(96,165,250,0.4),0_0_65px_rgba(147,197,253,0.35)] cursor-pointer group select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Waves className="w-4 h-4 text-blue-400" aria-hidden="true" />
          </motion.div>

          <span className="text-foreground/90 dark:text-foreground relative z-10">
            Unlock Your Career Potential
          </span>

          <Rocket className="w-4 h-4 text-blue-500 group-hover:translate-y-[-3px] transition-all" aria-hidden="true" />

          <span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"
            aria-hidden="true"
          />
        </motion.div>

        {/* Main Heading - UNCHANGED */}
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
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
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
              <span className="bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(139,92,246,0.7)] sm:drop-shadow-[0_0_10px_rgba(139,92,246,0.8)] transition-transform duration-300 hover:scale-105">
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
                  <Sparkles className="inline w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-yellow-400" aria-hidden="true" />
                </motion.span>
              </motion.span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle - UNCHANGED */}
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

        {/* CTA Buttons - UNCHANGED */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
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
            className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-3 border-2 relative overflow-hidden bg-transparent text-primary border-transparent before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-primary/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 after:absolute after:inset-0 after:z-0 after:bg-gradient-to-r after:from-primary after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-100 hover :text-black hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10">Watch Demo</span>
            <Play className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" aria-hidden="true" />
          </Button>
        </motion.div>
      </motion.div>

      {/* ENHANCED & OPTIMIZED VIDEO POPUP */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseVideo}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
            >
              {/* Enhanced Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-600/20 dark:to-blue-600/20 backdrop-blur-xl border-b border-gray-200 dark:border-white/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 shadow-lg">
                    <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 id="popup-title" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Product Demo
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1">
                      Experience the future of career development
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseVideo}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-pink-500/50 transition-all duration-300 hover:scale-110"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 hover:text-white transition-colors" />
                </button>
              </div>

              {/* Enhanced Responsive Layout */}
              <div className="flex flex-col lg:flex-row">
                {/* Video Section - Enhanced for Mobile */}
                <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="relative bg-black rounded-lg sm:rounded-xl overflow-hidden aspect-video border border-white/20">
                    <iframe
                      src="https://www.youtube.com/embed/PDk4G1Ck6A0?autoplay=1&mute=0"
                      title="NextStep.io Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>

                  {/* Enhanced Thank You Note */}
                  <motion.div
                    className="p-4 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-xl border border-purple-500/30 backdrop-blur-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex-shrink-0">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base sm:text-lg mb-2">
                          Ready to Transform Your Career?
                        </h4>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          Join thousands of professionals who've accelerated their growth with AI-powered career guidance.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced Features Carousel */}
                <div className="flex-1 p-4 sm:p-6 bg-gradient-to-b from-purple-900/10 to-blue-900/10 border-t lg:border-t-0 lg:border-l border-white/20">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 sm:gap-3">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                      Core Features
                    </h3>
                    <div className="flex gap-1 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
                      {activeFeatures.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${index === currentImageIndex
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-110"
                            : "bg-white/5 hover:bg-white/10"
                            }`}
                          aria-label={`View feature ${index + 1}`}
                        >
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/40"
                            }`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Card Shuffle Container */}
                  <div className="relative h-40 sm:h-52 mb-4 sm:mb-6 rounded-xl overflow-hidden">
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
                          stiffness: 400,
                          damping: 30,
                          duration: 0.6
                        }}
                        className="relative w-full h-full rounded-xl overflow-hidden border border-white/20"
                      >
                        <FeatureImage
                          src={activeFeatures[currentImageIndex].image}
                          alt={activeFeatures[currentImageIndex].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${activeFeatures[currentImageIndex].color}`}>
                              {React.createElement(activeFeatures[currentImageIndex].icon, {
                                className: "w-3 h-3 sm:w-4 sm:h-4 text-white"
                              })}
                            </div>
                            <h4 className="text-white font-bold text-sm sm:text-lg">
                              {activeFeatures[currentImageIndex].title}
                            </h4>
                          </div>
                          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                            {activeFeatures[currentImageIndex].description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Enhanced Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-lg sm:rounded-xl p-2 backdrop-blur-lg transition-all duration-300 hover:scale-110"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-lg sm:rounded-xl p-2 backdrop-blur-lg transition-all duration-300 hover:scale-110"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Enhanced Feature Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {activeFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      const isActive = index === currentImageIndex;

                      return (
                        <button
                          key={feature.title}
                          onClick={() => goToImage(index)}
                          className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl border backdrop-blur-lg transition-all duration-300 text-left overflow-hidden group ${isActive
                            ? `border-transparent bg-gradient-to-r ${feature.color}/20 scale-105 shadow-lg`
                            : "border-white/10 bg-white/5 hover:border-white/20"
                            }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform`}>
                              <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <span className={`font-semibold text-xs sm:text-sm ${isActive ? 'text-white' : 'text-gray-300'
                              }`}>
                              {feature.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Enhanced CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={handleGetStarted}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg border-0"
                    >
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                      Begin Your Journey
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(Hero);