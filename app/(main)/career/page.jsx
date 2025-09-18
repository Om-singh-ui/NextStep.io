"use client";

import React, { useState, useEffect } from "react";

const ComingSoonPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [bellActive, setBellActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Ensure hydration safety on Vercel (avoid window undefined)
  useEffect(() => {
    setMounted(true);
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  const handleExploreClick = () => {
    window.location.href = "/";
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:via-black dark:to-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center px-6 transition-colors duration-500">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-wide">
            NextStep.io
          </h1>

          <div className="flex items-center gap-4">
            {/* 🔔 Notification Bell */}
            <div className="relative group">
              <button
                onClick={() => {
                  setBellActive(true);
                  window.open(
                    "https://www.linkedin.com/in/om-singh-chouhan-1a761a323/",
                    "_blank"
                  );
                }}
                className={`relative p-3 rounded-full transition-all duration-300 
                ${
                  bellActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
                }`}
                aria-label="Get Notified"
              >
                {/* Bell Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405M19.595 
                      15.595A7.963 7.963 0 0020 12a8 8 0 
                      10-8 8 7.963 7.963 0 003.595-.405L17 
                      22l-2-2"
                  />
                </svg>

                {/* Ping effect when active */}
                {bellActive && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping"></span>
                )}
              </button>

              {/* Tooltip */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gray-900 text-white text-xs rounded-md px-2 py-1 shadow-lg">
                Get Notified
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-10 mb-12 transition-all duration-300 hover:shadow-purple-500/20 hover:scale-[1.01]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 text-indigo-400 mb-8 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 
                     1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 
                     9.9a5 5 0 117.072 0l-.548.547A3.374 
                     3.374 0 0014 18.469V19a2 2 0 
                     11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold mb-4">
              🚧 Feature Coming Soon
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We’re building something amazing! This feature is currently in
              development and will be released in upcoming versions of{" "}
              <span className="text-indigo-500 font-medium">NextStep.io</span>.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <span>Development in progress</span>
              <span>65%</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 relative"
                style={{ width: "65%" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-indigo-500 dark:text-indigo-300">
              What to Expect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "🚀",
                  title: "Enhanced Experience",
                  desc: "A beautifully redesigned interface and smoother workflows.",
                },
                {
                  icon: "⚡",
                  title: "Better Performance",
                  desc: "Faster, more responsive, and optimized for all users.",
                },
                {
                  icon: "🔒",
                  title: "Increased Security",
                  desc: "Enterprise-grade protection and advanced safety.",
                },
                {
                  icon: "📱",
                  title: "Mobile Optimization",
                  desc: "A flawless experience across all devices.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-6 rounded-xl hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Stay tuned for updates and announcements!
            </p>
            <button
              onClick={handleExploreClick}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-purple-500/30"
            >
              Explore Home Page
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 pb-6">
          <p>Our team is working diligently to bring you this feature soon.</p>
          <p className="mt-2 text-sm">Thank you for your patience and support!</p>
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} @NextStep.ui — Om Singh
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoonPage;
