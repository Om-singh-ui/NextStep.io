// components/header-client.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Rocket,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  Users,
  Zap,
  Target,
  BookOpen,
  Brain,
  Briefcase,
  GraduationCap,
  LogIn,
  UserPlus,
  FileText, Mail, Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function HeaderClient() {
  const { isSignedIn } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isGrowthToolsOpen, setIsGrowthToolsOpen] = useState(false);

  // Timeout references
  const featuresTimeoutRef = useRef(null);
  const resourcesTimeoutRef = useRef(null);
  const growthToolsTimeoutRef = useRef(null);

  const featuresItems = [
    {
      href: "/career-paths",
      label: "Career Paths",
      icon: <Briefcase className="h-4 w-4 text-blue-500" />,
    },
    {
      href: "/skills-development",
      label: "Skills Development",
      icon: <GraduationCap className="h-4 w-4 text-green-500" />,
    },
    {
      href: "/mentorship",
      label: "Mentorship",
      icon: <Users className="h-4 w-4 text-purple-500" />,
    },
  ];

  const resourcesItems = [
    {
      href: "/resume",
      label: "Resume Builder",
      icon: <BookOpen className="h-4 w-4 text-amber-500" />,
    },
    {
      href: "/interview",
      label: "Interview Prep",
      icon: <Target className="h-4 w-4 text-red-400" />,
    },
    {
      href: "/career",
      label: "Career Advice",
      icon: <Brain className="h-4 w-4 text-indigo-500" />,
    },
  ];

  const growthItems = [
    {
      href: "/resume",
      label: "Craft Resume",
      icon: <FileText className="h-4 w-4 text-amber-500" />,
    },
    {
      href: "/ai-cover-letter",
      label: "Cover Letter",
      icon: <Mail className="h-4 w-4 text-red-400" />,
    },
    {
      href: "/interview",
      label: "Interview Prep",
      icon: <Mic className="h-4 w-4 text-indigo-500" />,
    },
  ];

  // Toggle dropdowns on click for mobile
  const toggleFeatures = () => setIsFeaturesOpen(!isFeaturesOpen);
  const toggleResources = () => setIsResourcesOpen(!isResourcesOpen);
  const toggleGrowthTools = () => setIsGrowthToolsOpen(!isGrowthToolsOpen);

  // Clean up timeouts on unmount
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      if (featuresTimeoutRef.current) clearTimeout(featuresTimeoutRef.current);
      if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
      if (growthToolsTimeoutRef.current) clearTimeout(growthToolsTimeoutRef.current);
    };
  }, []);

  // Prevent hydration mismatch by rendering skeleton until mounted
  if (!isMounted) {
    return (
      <div className="w-full fixed top-4 z-50 flex justify-center">
        <div className="w-[95%] max-w-6xl px-6 py-3 rounded-full bg-transparent backdrop-blur-xl border border-blue-300/30">
          <div className="flex items-center justify-between">
            {/* Skeleton logo */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex flex-col space-y-1">
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Skeleton navigation */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-20 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-20 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse md:hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full fixed top-4 z-50 flex justify-center">
      {/* Transparent oval glowing container - NextStep.io style */}
      <div
        className="w-[95%] max-w-6xl px-6 py-3 rounded-full 
        bg-transparent backdrop-blur-xl border border-blue-300/30
        shadow-[0_0_30px_rgba(37,99,235,0.3)] 
        transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]
        relative group"
      >
        {/* Thin colored border on hover */}
        <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-blue-400/50 transition-colors duration-500 pointer-events-none"></div>

        {/* Silver bottom stroke with sharp edges */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[98%] h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

        <header className="flex items-center justify-between bg-transparent">
          {/* Logo - NextStep.io style */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform hover:scale-110"
          >
            <div className="relative">
              <TrendingUp className="h-7 w-7 text-blue-600 animate-pulse" />
              <Rocket className="h-3 w-3 text-orange-500 absolute -top-1 -right-1 animate-ping" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                NextStep.io
              </span>
              <span className="text-xs text-muted-foreground">
                Career Growth Platform
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-2">
              {/* Features Dropdown */}
              <div className="relative">
                <div
                  className="inline-block"
                  onMouseEnter={() => {
                    if (featuresTimeoutRef.current) clearTimeout(featuresTimeoutRef.current);
                    setIsFeaturesOpen(true);
                  }}
                  onMouseLeave={() => {
                    featuresTimeoutRef.current = setTimeout(() => {
                      setIsFeaturesOpen(false);
                    }, 200);
                  }}
                >
                  <Button
                    variant="ghost"
                    className="gap-1 text-muted-foreground hover:text-foreground hover:bg-blue-500/5 transition-all
                      rounded-full border border-transparent hover:border-blue-300/20
                      relative group overflow-hidden px-4 py-2 h-10"
                    onClick={toggleFeatures}
                  >
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Features
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isFeaturesOpen ? "rotate-180" : ""
                        }`}
                    />
                    <span className="absolute inset-0 rounded-full group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-shadow duration-300" />
                  </Button>
                </div>

                {isFeaturesOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-52 
                    bg-background/60 backdrop-blur-xl 
                    border border-blue-300/30 rounded-xl 
                    shadow-[0_0_20px_rgba(37,99,235,0.3)] 
                    hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
                    py-2 z-50 transition-all duration-300"
                    onMouseEnter={() => {
                      if (featuresTimeoutRef.current) clearTimeout(featuresTimeoutRef.current);
                      setIsFeaturesOpen(true);
                    }}
                    onMouseLeave={() => {
                      featuresTimeoutRef.current = setTimeout(() => {
                        setIsFeaturesOpen(false);
                        setIsMenuOpen(false);
                      }, 200);
                    }}
                  >
                    {featuresItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-muted-foreground 
                          hover:text-foreground hover:bg-blue-500/10 transition-colors rounded-lg"
                        onClick={() => setIsFeaturesOpen(false)}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div className="relative">
                <div
                  className="inline-block"
                  onMouseEnter={() => {
                    if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
                    setIsResourcesOpen(true);
                  }}
                  onMouseLeave={() => {
                    resourcesTimeoutRef.current = setTimeout(() => {
                      setIsResourcesOpen(false);
                    }, 200);
                  }}
                >
                  <Button
                    variant="ghost"
                    className="gap-1 text-muted-foreground hover:text-foreground hover:bg-blue-500/5 transition-all
                      rounded-full border border-transparent hover:border-blue-300/20
                      relative group overflow-hidden px-4 py-2 h-10"
                    onClick={toggleResources}
                  >
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    Resources
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${isResourcesOpen ? "rotate-180" : ""
                        }`}
                    />
                    <span className="absolute inset-0 rounded-full group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-shadow duration-300" />
                  </Button>
                </div>

                {isResourcesOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-52 
                    bg-background/60 backdrop-blur-xl 
                    border border-blue-300/30 rounded-xl 
                    shadow-[0_0_20px_rgba(37,99,235,0.3)] 
                    hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
                    py-2 z-50 transition-all duration-300"
                    onMouseEnter={() => {
                      if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
                      setIsResourcesOpen(true);
                    }}
                    onMouseLeave={() => {
                      resourcesTimeoutRef.current = setTimeout(() => {
                        setIsResourcesOpen(false);
                      }, 200);
                    }}
                  >
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-muted-foreground 
                          hover:text-foreground hover:bg-blue-500/10 transition-colors rounded-lg"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Auth / Theme */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {isSignedIn ? (
                <>
                  <Button
                    asChild
                    className="hidden md:flex gap-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white 
                      border border-blue-300/30 rounded-full shadow-lg
                      transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 px-4 py-2 h-10"
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="w-4 h-4" />
                      Industry Insights
                    </Link>
                  </Button>

                  {/* Growth-Tools Dropdown */}
                  <div className="relative hidden md:block">
                    <div
                      className="inline-block"
                      onMouseEnter={() => {
                        if (growthToolsTimeoutRef.current) clearTimeout(growthToolsTimeoutRef.current);
                        setIsGrowthToolsOpen(true);
                      }}
                      onMouseLeave={() => {
                        growthToolsTimeoutRef.current = setTimeout(() => {
                          setIsGrowthToolsOpen(false);
                        }, 200);
                      }}
                    >
                      <Button
                        variant="ghost"
                        className="gap-1 text-muted-foreground hover:text-foreground hover:bg-blue-500/5 transition-all
                          rounded-full border border-transparent hover:border-blue-300/20
                          relative group overflow-hidden px-4 py-2 h-10"
                        onClick={toggleGrowthTools}
                      >
                       <Rocket className="h-4 w-4 text-red-500" />

                        Growth Tools
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${isGrowthToolsOpen ? "rotate-180" : ""
                            }`}
                        />
                        <span className="absolute inset-0 rounded-full group-hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-shadow duration-300" />
                      </Button>
                    </div>

                    {isGrowthToolsOpen && (
                      <div
                        className="absolute top-full left-0 mt-2 w-52 
                        bg-background/60 backdrop-blur-xl 
                        border border-blue-300/30 rounded-xl 
                        shadow-[0_0_20px_rgba(37,99,235,0.3)] 
                        hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]
                        py-2 z-50 transition-all duration-300"
                        onMouseEnter={() => {
                          if (growthToolsTimeoutRef.current) clearTimeout(growthToolsTimeoutRef.current);
                          setIsGrowthToolsOpen(true);
                        }}
                        onMouseLeave={() => {
                          growthToolsTimeoutRef.current = setTimeout(() => {
                            setIsGrowthToolsOpen(false);
                          }, 200);
                        }}
                      >
                        {growthItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-muted-foreground 
                              hover:text-foreground hover:bg-blue-500/10 transition-colors rounded-lg"
                            onClick={() => setIsGrowthToolsOpen(false)}
                          >
                            <span className="mr-2">{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <div className="hidden md:flex gap-2">
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="
                        relative group overflow-hidden
                        px-5 py-2.5 h-10 rounded-full
                        flex items-center gap-2
                        border border-blue-400/30
                        bg-transparent backdrop-blur-sm
                        text-muted-foreground hover:text-foreground
                        transition-all duration-300
                        hover:-translate-y-0.5
                        shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
                      "
                    >
                      {/* Icon */}
                      <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400" />

                      {/* Text */}
                      <span className="relative z-10 font-medium">Sign in</span>

                      {/* Thin hover line (accent underline) */}
                      <span
                        className="
                          absolute bottom-0 left-1/2 transform -translate-x-1/2
                          w-0 h-[2px] rounded-full
                          bg-gradient-to-r from-blue-500 to-cyan-400
                          transition-all duration-300
                          group-hover:w-4/5
                        "
                      />

                      {/* Glowing hover aura */}
                      <span
                        className="
                          absolute inset-0 rounded-full
                          bg-gradient-to-r from-blue-500/20 to-cyan-400/20
                          opacity-0 group-hover:opacity-100
                          blur-lg transition duration-500
                        "
                      />
                    </Button>
                  </SignInButton>


                  <SignUpButton mode="modal">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                        text-white rounded-full shadow-lg 
                        transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 px-4 py-2 h-10
                        relative group overflow-hidden
                        flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="relative z-10">Get Started</span>

                      {/* Shimmer effect */}
                      <span className="
                        absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                        -translate-x-full group-hover:translate-x-full transition-transform duration-700
                      "></span>
                    </Button>
                  </SignUpButton>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full border border-transparent hover:border-blue-300/20
                  relative group overflow-hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </header>
        {/* Mobile Menu Slider */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[calc(var(--header-height)+20px)] left-0 w-full z-40">
            {/* Main Menu Container */}
            <div
              className="w-full max-w-full mt-8 bg-background border border-transparent 
                 rounded-2xl shadow-lg hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)]
                 px-4 py-5 sm:px-3 sm:py-4 flex flex-col space-y-3
                 transition-all duration-500 ease-in-out animate-in slide-in-from-top-2"
            >
              {/* Features Dropdown */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  className="w-full justify-between font-medium text-foreground hover:bg-muted/60
                     transition-all duration-300 ease-in-out rounded-lg px-3 py-2 sm:px-2 sm:py-1.5 text-sm sm:text-xs"
                  onClick={toggleFeatures}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-yellow-500 group-hover:text-yellow-400" />
                    <span className="text-sm sm:text-xs group-hover:text-blue-500">Features</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 sm:h-3.5 sm:w-3.5 transition-transform duration-300 ease-in-out ${isFeaturesOpen ? "rotate-180" : ""
                      }`}
                  />
                </Button>

                {isFeaturesOpen && (
                  <div className="ml-2 sm:ml-1.5 mt-2 sm:mt-1.5 space-y-1 border-l-2 border-blue-500 pl-2
                          transition-all duration-300 ease-in-out">
                    {featuresItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 px-3 py-1.5 sm:px-2 sm:py-1
                           text-sm sm:text-xs text-muted-foreground hover:text-blue-600
                           hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                        onClick={() => {
                          setIsFeaturesOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <span className="h-4 w-4 sm:h-3.5 sm:w-3.5">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  className="w-full justify-between font-medium text-foreground hover:bg-muted/60
                     transition-all duration-300 ease-in-out rounded-lg px-3 py-2 sm:px-2 sm:py-1.5 text-sm sm:text-xs"
                  onClick={toggleResources}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-blue-400 group-hover:text-blue-500" />
                    <span className="text-sm sm:text-xs group-hover:text-blue-500">Resources</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 sm:h-3.5 sm:w-3.5 transition-transform duration-300 ease-in-out ${isResourcesOpen ? "rotate-180" : ""
                      }`}
                  />
                </Button>

                {isResourcesOpen && (
                  <div className="ml-2 sm:ml-1.5 mt-2 sm:mt-1.5 space-y-1 border-l-2 border-blue-500 pl-2
                          transition-all duration-300 ease-in-out">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 px-3 py-1.5 sm:px-2 sm:py-1
                           text-sm sm:text-xs text-muted-foreground hover:text-blue-600
                           hover:bg-blue-50 rounded-lg transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                        onClick={() => {
                          setIsResourcesOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <span className="h-4 w-4 sm:h-3.5 sm:w-3.5">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Growth Tools Dropdown */}
              {isSignedIn && (
                <div className="relative group">
                  <Button
                    variant="ghost"
                    className="w-full justify-between font-medium text-foreground hover:bg-muted/60
                       transition-all duration-300 ease-in-out rounded-lg px-3 py-2 sm:px-2 sm:py-1.5 text-sm sm:text-xs"
                    onClick={toggleGrowthTools}
                  >
                    <div className="flex items-center gap-2">
                       <Rocket className="h-4 w-4 text-red-500" />
                      <span className="text-sm sm:text-xs group-hover:text-purple-600">Growth Tools</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-3.5 sm:w-3.5 transition-transform duration-300 ease-in-out ${isGrowthToolsOpen ? "rotate-180" : ""
                        }`}
                    />
                  </Button>

                  {isGrowthToolsOpen && (
                    <div className="ml-2 sm:ml-1.5 mt-2 sm:mt-1.5 space-y-1 border-l-2 border-purple-500 pl-2
                            transition-all duration-300 ease-in-out">
                      {growthItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-3 py-1.5 sm:px-2 sm:py-1
                             text-sm sm:text-xs text-muted-foreground hover:text-purple-600
                             hover:bg-purple-50 rounded-lg transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                          onClick={() => {
                            setIsGrowthToolsOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          <span className="h-4 w-4 sm:h-3.5 sm:w-3.5">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Auth Buttons */}
              <div className="flex flex-col gap-2 sm:gap-1.5 pt-3 sm:pt-2">
                {!isSignedIn ? (
                  <>
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className="w-full rounded-lg shadow-sm hover:shadow-md px-3 py-2 sm:px-2 sm:py-1.5
                           text-sm sm:text-xs hover:border-blue-500 transition-all duration-300 ease-in-out"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4 sm:h-3.5 sm:w-3.5 mr-2" />
                        Sign in
                      </Button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                      <Button
                        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white
                           shadow-sm hover:shadow-md px-3 py-2 sm:px-2 sm:py-1.5
                           text-sm sm:text-xs hover:brightness-110 transition-all duration-300 ease-in-out"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus className="h-4 w-4 sm:h-3.5 sm:w-3.5 mr-2" />
                        Get Started
                      </Button>
                    </SignUpButton>
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white
                       shadow-md px-3 py-2 sm:px-2 sm:py-1.5 text-sm sm:text-xs hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                      Industry Insight
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}