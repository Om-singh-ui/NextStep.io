"use client";

import HeroSection from "@/components/hero";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Sun, Moon, Sparkles, ArrowRight, ArrowLeft, Box, Lock, Search, Settings, Target, TrendingUp, Users, Zap } from "lucide-react";
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
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useState, useEffect } from "react";

// Particle component for background animations
const ClientParticle = ({ index }) => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [duration, setDuration] = useState(2);

  useEffect(() => {
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

// Glowing Features Grid Component
const GlowingFeaturesGrid = () => {
  const features = [
    {
      id: 1,
      icon: <Target className="h-5 w-5 text-black dark:text-neutral-300" />,
      title: "Personalized Career Path",
      description: "AI-powered roadmap tailored to your skills, goals, and industry trends for maximum growth.",
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    },
    {
      id: 2,
      icon: <Zap className="h-5 w-5 text-black dark:text-neutral-300" />,
      title: "AI-Powered Resume Builder",
      description: "Generate ATS-optimized resumes and cover letters with real-time feedback and scoring.",
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
    },
    {
      id: 3,
      icon: <TrendingUp className="h-5 w-5 text-black dark:text-neutral-300" />,
      title: "Smart Job Matching",
      description: "Get matched with ideal opportunities using advanced algorithms and market analysis.",
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
    },
    {
      id: 4,
      icon: <Users className="h-5 w-5 text-black dark:text-neutral-300" />,
      title: "Expert Mentorship Network",
      description: "Connect with industry leaders and career coaches for personalized guidance and support.",
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
    },
    {
      id: 5,
      icon: <Sparkles className="h-5 w-5 text-black dark:text-neutral-300" />,
      title: "Real-time Skill Analytics",
      description: "Track your progress with detailed insights and recommendations for skill improvement.",
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
    }
  ];

  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[38rem] xl:grid-rows-2 relative z-20">
      {features.map((feature) => (
        <GridItem
          key={feature.id}
          area={feature.area}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </ul>
  );
};

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[16rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-primary/20 p-2 md:rounded-3xl md:p-3 group hover:border-primary/40 transition-all duration-500">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          variant="default"
          movementDuration={2}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-gradient-to-br from-white/70 to-white/30 dark:from-gray-900/60 dark:to-gray-800/40 p-6 md:p-6 backdrop-blur-sm dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-4">
            <div className="w-fit rounded-lg border border-primary/20 bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 p-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-xl font-semibold text-balance text-black md:text-2xl dark:text-white">
                {title}
              </h3>
              <p className="font-sans text-sm text-black md:text-base dark:text-neutral-300 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <HeroSection />

      {/* Features Section with Glowing Effect */}
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
            <motion.div
              className="relative inline-block mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Minimal badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 dark:bg-neutral-400" />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 tracking-wide">
                  AI-POWERED PLATFORM
                </span>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Main heading with subtle gradient */}
              <motion.span
                className="block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 
        dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100
        bg-clip-text text-transparent">
                  Advanced Features
                </span>
              </motion.span>

              {/* Subtle separator */}
              <motion.div
                className="mt-4 mb-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-neutral-400 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />

              {/* Subheading */}
              <motion.span
                className="block text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Transform Your{" "}
                <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 
        dark:from-neutral-200 dark:to-neutral-400
        bg-clip-text text-transparent">
                  Professional Journey
                </span>
              </motion.span>
            </motion.h2>

            {/* Section description */}
            <motion.div
              className="mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
                Leverage{" "}
                <span className="font-medium text-neutral-900 dark:text-neutral-200">
                  intelligent AI
                </span>{" "}
                to navigate your career path. Our platform delivers{" "}
                <span className="font-medium text-neutral-900 dark:text-neutral-200">
                  data-driven insights
                </span>{" "}
                and personalized strategies for professional growth.
              </p>

              {/* Minimal dots */}
              <motion.div
                className="flex justify-center gap-2 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Glowing Features Grid */}
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

            <GlowingFeaturesGrid />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
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

      {/* How It Works Section */}
      <section className="relative w-full py-28 bg-background overflow-hidden">
        <HeroBackground />

        {/* SUBTLE BACKGROUND EFFECTS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/5 blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-300/5 blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* ENHANCED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-24 px-4"
          >
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm shadow-sm mb-10 transition-all"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.55 }}
              whileHover={{
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                borderColor: "rgb(180 180 180)"
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2 h-2 rounded-full bg-neutral-600 dark:bg-neutral-400 shadow-[0_0_6px_rgba(0,0,0,0.25)]"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 tracking-[0.22em] uppercase opacity-90">
                  Methodology
                </span>
              </div>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span
                className="block bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
              >
                How It Works
              </span>
            </motion.h2>

            {/* Soft Glow Divider */}
            <motion.div
              className="w-14 h-[2px] bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-300 dark:from-neutral-600 dark:via-neutral-500 dark:to-neutral-600 mx-auto mb-10 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.15)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 mb-6 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Streamlined steps for
              <span className="font-semibold text-neutral-900 dark:text-white ml-2">career advancement</span>
            </motion.p>

            {/* Minimal Description */}
            <motion.p
              className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto opacity-90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              A clear, systematic approach to professional growth with intelligent guidance at each step.
            </motion.p>
          </motion.div>

          {/* CLEAN GRID LAYOUT */}
          <div className="space-y-16 relative max-w-5xl mx-auto">
            {howItWorks.map((item, index) => {
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

                    {/* ENHANCED COLORED BORDER SHADOW */}
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
                  {/* ENHANCED COLORED SHADOW FOR MAIN CARD */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover/main-card:border-blue-400/40 group-hover/main-card:shadow-[0_0_50px_rgba(59,130,246,0.5)] group-hover/main-card:shadow-blue-500/30 transition-all duration-500 pointer-events-none z-0" />

                  {/* ADDITIONAL OUTER GLOW */}
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

      {/* FAQ section */}
      <section id="faq" className="relative w-full py-12 md:py-24 bg-background/50 overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative inline-block mb-8">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/60 via-cyan-400/60 to-primary/60
                blur-2xl rounded-full opacity-30"
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />

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

            {/* Animated Dots Indicator */}
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

      {/* Call-to-action section */}
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

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-14 mt-0">
              {/* Card 1 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[22rem] md:w-[26rem] rounded-xl p-6 border min-h-[27rem]">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    Unlock features that truly amaze 💥😳
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Experience AI assistance, personalized career paths, real-time progress tracking, and mentorship designed to make you ahead of the curve.
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:500/https://cdn.gamma.app/l6oj4gy8sqszge5/generated-images/paEcz2ZVSFBRTPW0_ljIN.png"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-12">
                    <CardItem translateZ={20} as="a" href="/career-paths" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
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
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[22rem] md:w-[26rem] rounded-xl p-6 border min-h-[27rem]">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    Growth tools that will blow your mind 🤯🔥
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Get AI-powered insights, ATS-optimized resumes, tailored cover letters, job-match scoring, and everything you need to stand out instantly.
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:500/https://cdn.gamma.app/l6oj4gy8sqszge5/generated-images/K7H9qR3XU8kbd3w7Wz-qQ.png"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-12">
                    <CardItem translateZ={20} as="a" href="/resume" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
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
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[22rem] md:w-[26rem] rounded-xl p-6 border min-h-[27rem]">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                    Make your contributions in chasing excellence 🚀
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Be part of something bigger contribute, collaborate, and build the future with a passionate community of innovators.
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src="https://imgproxy.gamma.app/resize/quality:80/resizing_type:fit/width:500/https://cdn.gamma.app/l6oj4gy8sqszge5/generated-images/QpXA8SSMWe-3z8SURUVqo.png"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-12">
                    <CardItem translateZ={20} as="a" href="#" className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                      Try now →
                    </CardItem>

                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => window.open("https://github.com/Om-singh-ui/NextStep.io", "_blank")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
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