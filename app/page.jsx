"use client";

import HeroSection from "@/components/hero";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { faqs } from "@/data/faqs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";


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

// Reusable Background Component based on Hero section
const HeroBackground = () => {
  return (
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
  );
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <HeroSection />

      {/* Features Section with Hero Background */}
      <section
        id="features"
        className="relative w-full py-16 sm:py-20 md:py-28 bg-background overflow-hidden"
      >
        <HeroBackground />

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

      <section>
        {/* New Premium Animated Testimonials Section */}
        <motion.div
          className="relative py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          {/* Section heading */}
          <div className="text-center mb-16">
            <motion.h3
              className="
          text-4xl sm:text-5xl md:text-6xl 
          font-extrabold tracking-tight
          bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600
          dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-500
          bg-clip-text text-transparent
        "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Loved by Professionals Worldwide
            </motion.h3>

            <motion.p
              className="
          text-muted-foreground 
          text-xl 
          max-w-2xl 
          mx-auto 
          mt-4 
          leading-relaxed
          font-medium
        "
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Real stories from the leaders and innovators using NextStep.io every day.
            </motion.p>
          </div>

          {/* Animated testimonials integration */}
          <AnimatedTestimonials
            testimonials={[
              {
                quote:
                  "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
                name: "Sarah Chen",
                designation: "Product Manager at TechFlow",
                src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
              },
              {
                quote:
                  "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
                name: "Michael Rodriguez",
                designation: "CTO at InnovateSphere",
                src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
              },
              {
                quote:
                  "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
                name: "Emily Watson",
                designation: "Operations Director at CloudScale",
                src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
              },
              {
                quote:
                  "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
                name: "James Kim",
                designation: "Engineering Lead at DataPro",
                src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop",
              },
              {
                quote:
                  "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
                name: "Lisa Thompson",
                designation: "VP of Technology at FutureNet",
                src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop",
              },
            ]}
          />

          {/* Bottom subtle glow decoration */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-24
                 bg-gradient-to-r from-neutral-300/10 via-neutral-400/10 to-neutral-500/10
                 dark:from-neutral-700/10 dark:via-neutral-600/10 dark:to-neutral-500/10
                 blur-3xl opacity-40"
          ></div>
        </motion.div>
      </section>


      {/* How It Works Section with Hero Background */}
      <section className="relative w-full py-28 bg-background overflow-hidden">
        <HeroBackground />

        {/* SUBTLE BACKGROUND EFFECTS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/5 blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-300/5 blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* REFINED HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            {/* Enhanced Tag – Matching Futuristic Glow Style */}
            <motion.div
              className="
      group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full
      text-xs font-medium select-none cursor-pointer
      border border-blue-500/40
      bg-gradient-to-r from-indigo-500/10 via-blue-400/10 to-cyan-400/10
      backdrop-blur-sm
      transition-all duration-500 ease-out
      hover:border-blue-400
      hover:shadow-[0_0_25px_rgba(59,130,246,0.5),0_0_45px_rgba(96,165,250,0.4),0_0_65px_rgba(147,197,253,0.35)]
    "
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              role="button"
              tabIndex={0}
            >
              {/* Bouncing Dot Icon */}
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-blue-400 group-hover:bg-blue-500 transition-all"
              />

              {/* Text */}
              <span className="text-foreground/90 dark:text-foreground z-10">
                AI-Powered Growth
              </span>

              {/* Trailing Shimmer Dot */}
              <div className="
        w-2 h-2 rounded-full bg-blue-500/70
        group-hover:translate-y-[-3px]
        transition-all duration-300
      "
              />

              {/* Hover Glow Layer */}
              <span
                className="
        absolute inset-0 rounded-full opacity-0
        bg-gradient-to-r from-blue-400/30 via-blue-500/30 to-cyan-400/30
        group-hover:opacity-100 transition-opacity duration-700 blur-md
      "
              />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
              <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
                Accelerate Your Career
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
                With Smarter Guidance
              </span>
            </h2>

            {/* Subtitle */}
            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.55 }}
            >
              Get clear, AI-driven steps to grow faster and unlock your best opportunities.
            </motion.p>
          </motion.div>

          {/* CLEAN GRID LAYOUT */}
          <div className="space-y-16 relative max-w-5xl mx-auto">
            {howItWorks.map((item, index) => {
              // PREMIUM IMAGE CAROUSEL WITH ZOOM BLUR TRANSITION
              const ZoomBlurCarousel = ({ images }) => {
                const [currentImage, setCurrentImage] = useState(0);
                const [isAnimating, setIsAnimating] = useState(false);

                useEffect(() => {
                  if (images.length <= 1) return;
                  const timer = setInterval(() => {
                    handleNext();
                  }, 4000);
                  return () => clearInterval(timer);
                }, [images]);

                const handlePrevious = () => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentImage(prev => (prev - 1 + images.length) % images.length);
                  setTimeout(() => setIsAnimating(false), 700);
                };

                const handleNext = () => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentImage(prev => (prev + 1) % images.length);
                  setTimeout(() => setIsAnimating(false), 700);
                };

                const goToImage = (index) => {
                  if (isAnimating || index === currentImage) return;
                  setIsAnimating(true);
                  setCurrentImage(index);
                  setTimeout(() => setIsAnimating(false), 700);
                };

                // ZOOM BLUR TRANSITION VARIANT
                const zoomBlurVariants = {
                  enter: {
                    scale: 1.3,
                    opacity: 0,
                    filter: "blur(12px)",
                  },
                  center: {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  exit: {
                    scale: 0.7,
                    opacity: 0,
                    filter: "blur(12px)",
                  }
                };

                return (
                  <div className="relative w-full lg:w-[440px] h-[280px] lg:h-[320px] rounded-2xl border border-primary/20 shadow-xl group-hover:border-primary/40 overflow-hidden bg-gray-50 dark:bg-gray-800 transition-all duration-500 group/image-container">
                    {/* IMAGE CONTAINER */}
                    <div className="relative w-full h-full overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImage}
                          src={images[currentImage]}
                          alt={item.title}
                          variants={zoomBlurVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            duration: 0.7,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </AnimatePresence>

                      {/* GRADIENT OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />

                      {/* STEP BADGE */}
                      <motion.div
                        className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Step {item.step}
                      </motion.div>
                    </div>

                    {/* NAVIGATION CONTROLS */}
                    {images.length > 1 && (
                      <>
                        {/* ARROW BUTTONS */}
                        <motion.button
                          onClick={handlePrevious}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-lg text-white rounded-xl p-2 hover:bg-black/70 transition-all duration-300 border border-white/20 shadow-lg group/arrow z-20"
                          whileHover={{ scale: 1.15, x: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            animate={{ x: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ArrowLeft className="w-4 h-4 group-hover/arrow:scale-110 transition-transform" />
                          </motion.div>
                        </motion.button>

                        <motion.button
                          onClick={handleNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-lg text-white rounded-xl p-2 hover:bg-black/70 transition-all duration-300 border border-white/20 shadow-lg group/arrow z-20"
                          whileHover={{ scale: 1.15, x: 3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4 group-hover/arrow:scale-110 transition-transform" />
                          </motion.div>
                        </motion.button>

                        {/* PAGINATION DOTS */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 backdrop-blur-lg bg-black/40 rounded-xl px-3 py-2 border border-white/20 shadow-lg z-20">
                          {images.map((_, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => goToImage(idx)}
                              className={`relative w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImage
                                ? 'bg-white'
                                : 'bg-white/50 hover:bg-white/70'
                                }`}
                              whileHover={{ scale: 1.3 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              {idx === currentImage && (
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-white"
                                  layoutId="activeDot"
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>

                        {/* IMAGE COUNTER */}
                        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 text-xs font-medium border border-white/20 z-20">
                          {currentImage + 1}/{images.length}
                        </div>
                      </>
                    )}

                    {/* ENHANCED COLORED BORDER SHADOW - INTENSIFIED BLUE */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover/image-container:border-blue-400/50 group-hover/image-container:shadow-[0_0_40px_rgba(59,130,246,0.6)] group-hover/image-container:shadow-blue-500/40 transition-all duration-500 pointer-events-none z-10" />

                    {/* ADDITIONAL GLOW EFFECT */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover/image-container:shadow-[0_0_60px_rgba(96,165,250,0.4)] group-hover/image-container:shadow-blue-400/30 transition-all duration-700 pointer-events-none z-5" />
                  </div>
                );
              };

              const images = Array.isArray(item.image) ? item.image : [item.image];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 group rounded-3xl p-8 bg-card/50 backdrop-blur-xl border border-primary/15 shadow-lg hover:border-primary/30 transition-all duration-500 group/main-card"
                >
                  {/* ENHANCED COLORED SHADOW FOR MAIN CARD - INTENSIFIED BLUE */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover/main-card:border-blue-400/40 group-hover/main-card:shadow-[0_0_50px_rgba(59,130,246,0.5)] group-hover/main-card:shadow-blue-500/30 transition-all duration-500 pointer-events-none z-0" />

                  {/* ADDITIONAL OUTER GLOW FOR MAIN CARD */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover/main-card:shadow-[0_0_80px_rgba(96,165,250,0.3)] group-hover/main-card:shadow-blue-400/20 transition-all duration-700 pointer-events-none z-0" />

                  {/* STEP NUMBER */}
                  <motion.div
                    className="absolute -left-4 -top-4 lg:-left-5 lg:-top-5 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-400 text-white text-xl font-bold flex items-center justify-center shadow-lg border-2 border-white/30 z-30"
                    animate={{
                      y: [0, -4, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {item.step}
                  </motion.div>

                  {/* IMAGE CONTAINER */}
                  <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10">
                    <ZoomBlurCarousel images={images} />
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="flex flex-col justify-center w-full lg:w-1/2 space-y-4 relative z-10">
                    <motion.div
                      className="w-fit p-3 rounded-xl bg-background/80 border border-primary/20 shadow-md group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-300 text-primary group/icon"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* ICON GLOW EFFECT */}
                      <div className="relative">
                        {item.icon}
                        <div className="absolute inset-0 rounded-xl border border-transparent group-hover/icon:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover/icon:shadow-blue-500/30 transition-all duration-300 pointer-events-none" />
                      </div>
                    </motion.div>

                    <motion.h3
                      className="text-2xl font-bold tracking-tight text-foreground"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {item.title}
                    </motion.h3>

                    <motion.p
                      className="text-muted-foreground leading-relaxed text-base"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {item.description}
                    </motion.p>

                    <motion.div
                      className="flex items-center gap-2 text-primary text-sm font-medium pt-2 cursor-pointer group/cta relative"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="relative z-10">Learn more</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="relative z-10"
                      >
                        <ArrowRight className="w-4 h-4 group-hover/cta:scale-110 transition-transform" />
                      </motion.div>
                      {/* CTA GLOW EFFECT */}
                      <div className="absolute inset-0 rounded-lg group-hover/cta:bg-blue-500/10 group-hover/cta:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 pointer-events-none" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ section with Hero Background */}
      <section id="faq" className="relative w-full py-12 md:py-24 bg-background/50 overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-4 md:px-6">
          {/* FAQ header with animations */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative inline-block mb-8">
              {/* Background glow updated to CTA color tone */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/60 via-cyan-400/60 to-primary/60
                blur-2xl rounded-full opacity-30"
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Title updated with CTA gradient color */}
              <motion.h2
                className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight
                bg-gradient-to-r from-foreground via-primary to-cyan-400
                bg-clip-text text-transparent whitespace-nowrap
                drop-shadow-[0_0_14px_rgba(56,189,248,0.28)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                Frequently Asked Questions
              </motion.h2>

              {/* CTA-like sheen swipe */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                rounded-full pointer-events-none"
                initial={{ x: "150%", opacity: 0 }}
                whileInView={{ x: "-150%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.45, ease: "easeOut" }}
              />
            </div>

            <motion.p
              className="text-muted-foreground text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Everything you need to know about our{" "}
              <motion.span
                className="bg-gradient-to-r from-primary/90 to-cyan-500/90 
                bg-clip-text text-transparent font-semibold"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  delay: 0.8,
                }}
              >
                AI-powered platform
              </motion.span>
            </motion.p>

            {/* Enhanced Animated Dots Indicator */}
            <motion.div
              className="flex justify-center mt-10 space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[0, 1, 2].map((id) => (
                <motion.div
                  key={id}
                  className={`
          w-3 h-3 rounded-full 
          bg-white/80
          shadow-[0_0_12px_rgba(255,255,255,0.7)]
          backdrop-blur-sm
        `}
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: id * 0.25,
                    ease: "easeInOut",
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
      {/* Call-to-action section - Button Removed */}
      <section className="w-full py-24 md:py-32 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
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
            {/* Notification Badge */}
            <motion.div
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-primary mr-2"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">Ready to get started?</span>
            </motion.div>

            {/* Headings */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <motion.span
                className="block bg-gradient-to-r from-foreground via-primary to-cyan-400 bg-clip-text text-transparent"
                initial={{ backgroundPosition: "200% 0" }}
                whileInView={{ backgroundPosition: "0% 0" }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                style={{ backgroundSize: "200% 100%" }}
              >
                Transform Your Career
              </motion.span>

              <motion.span
                className="block text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                with AI-Powered Guidance
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Join{" "}
              <motion.span
                className="font-semibold text-primary"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
              >
                thousands of professionals
              </motion.span>{" "}
              who have accelerated their careers with our personalized AI mentorship platform.
            </motion.p>

            {/* ⭐ FIXED CARD ALIGNMENT ⭐ */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-14 mt-0">

              {/* Card 1 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[22rem] md:w-[26rem] rounded-xl p-6 border">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    Make things float in air
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-12">
                    <CardItem translateZ={20} as="a" href="#" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                      Try now →
                    </CardItem>

                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              {/* Card 2 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[22rem] md:w-[26rem] rounded-xl p-6 border">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    Make things float in air
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-12">
                    <CardItem translateZ={20} as="a" href="#" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                      Try now →
                    </CardItem>

                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              {/* Card 3 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[22rem] md:w-[26rem] rounded-xl p-6 border">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    Make things float in air
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-12">
                    <CardItem translateZ={20} as="a" href="#" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                      Try now →
                    </CardItem>

                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>

            {/* Footer note */}
            <motion.p
              className="text-sm text-muted-foreground mt-12 inline-block cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ color: "hsl(0, 0%, 100%)" }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              No credit card required.{" "}
              <span className="underline">Start your free trial today.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}