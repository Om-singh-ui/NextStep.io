"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Home, Github, Cpu, Satellite } from "lucide-react";
import { useEffect, useState } from "react";

const professionalMessages = [
  "The requested resource cannot be located",
  "This endpoint is currently unavailable",
  "Digital destination not found in our network",
  "The path you've requested returns no data",
  "Resource allocation failed - endpoint missing",
];

const BinaryMatrix = ({ isDark }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 30);
    const newColumns = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      speed: 0.5 + Math.random() * 1.5,
      chars: Array.from({ length: 20 }, () =>
        Math.random() > 0.5 ? "1" : "0"
      ),
    }));
    setColumns(newColumns);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {columns.map((column) => (
        <motion.div
          key={column.id}
          className="absolute top-0 text-xs font-mono"
          style={{ left: `${column.id * 30}px` }}
          initial={{ y: -1000 }}
          animate={{ y: 1000 }}
          transition={{
            duration: 10 / column.speed,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          {column.chars.map((char, index) => (
            <div
              key={index}
              className={`${isDark ? "text-green-400" : "text-blue-600"}`}
              style={{ opacity: 1 - index * 0.05 }}
            >
              {char}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const HexGrid = ({ isDark }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, ${isDark ? "#ffffff" : "#000000"
          } 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, ${isDark ? "#ffffff" : "#000000"
          } 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  </div>
);

const FloatingGeometry = ({ isDark }) => {
  const shapes = ["cube", "pyramid", "sphere", "cylinder"];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape === "cube"
              ? "w-14 h-14"
              : shape === "pyramid"
                ? "w-10 h-10"
                : shape === "sphere"
                  ? "w-16 h-16 rounded-full"
                  : "w-12 h-16"
            } border ${isDark ? "border-cyan-400/20" : "border-blue-600/20"
            }`}
          style={{
            left: `${15 + index * 22}%`,
            top: `${25 + index * 10}%`,
          }}
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function NotFound() {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setMessage(
      professionalMessages[
      Math.floor(Math.random() * professionalMessages.length)
      ]
    );

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isDark = theme === "dark";

  const gradientStyles = {
    backgroundImage: isDark
      ? "linear-gradient(135deg, #ffffff 0%, #8899a6 100%)"
      : "linear-gradient(135deg, #000000 0%, #4b5563 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  };

  if (!mounted) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black" : "bg-white"
          }`}
      >
        <div className="text-center">
          <div
            className={`w-12 h-12 border-4 border-transparent animate-spin mx-auto mb-4 rounded-full ${isDark
                ? "border-t-cyan-400 border-r-cyan-400/30"
                : "border-t-blue-600 border-r-blue-600/30"
              }`}
          />
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-between min-h-screen overflow-hidden transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
    >
      {/* Backgrounds */}
      <BinaryMatrix isDark={isDark} />
      <HexGrid isDark={isDark} />
      <FloatingGeometry isDark={isDark} />

      {/* Mouse Glow */}
      <motion.div
        className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${isDark ? "bg-cyan-400" : "bg-blue-400"
          }`}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      {/* Main Section */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-6 pt-8 pb-6">
        {/* Logo + Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-25"
        >
          <div className="flex items-center justify-center gap-4">
            <div
              className={`p-3 rounded-2xl border ${isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-gray-50 border-gray-200"
                }`}
            >
              <Cpu
                className={`w-7 h-7 ${isDark ? "text-cyan-400" : "text-blue-600"
                  }`}
              />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">NextStep.io</h1>
              <p
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                Enterprise Platform
              </p>
            </div>
          </div>
        </motion.div>

        {/* 404 Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="mb-4"
        >
          <motion.h1
            className="text-8xl sm:text-9xl font-black mb-4 tracking-tighter"
            style={gradientStyles}
            whileHover={{ scale: 1.02 }}
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`inline-flex items-center gap-3 px-6 py-2 rounded-full border ${isDark
                ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm"
                : "bg-white/50 border-gray-300 backdrop-blur-sm"
              }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full animate-pulse ${isDark ? "bg-red-400" : "bg-red-500"
                  }`}
              />
              <span
                className={`font-mono text-sm ${isDark ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                HTTP 404 - NOT FOUND
              </span>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=om.singh.5715@gmail.com&su=Feedback%20on%20NextStep.io%20Platform&body=Hello%20Om Singh,%0D%0A%0D%0AI%20hope%20you're%20doing%20well.%20I%20wanted%20to%20report%20an%20issue%20or%20share%20feedback%20regarding%20the%20NextStep.io%20platform.%20Please%20find%20the%20details%20below:%0D%0A%0D%0AName%3A%20%0D%0AIssue%20or%20Bug%3A%20%0D%0ASteps%20to%20Reproduce%3A%20%0D%0AImprovement%20or%20Optimization%20Suggestions%3A%20%0D%0AAdditional%20Comments%3A%20%0D%0A%0D%0AI%20appreciate%20the%20effort%20your%20team%20has%20put%20into%20building%20NextStep.io.%20Please%20let%20me%20know%20if%20any%20further%20information%20is%20required.%0D%0A%0D%0AThank%20you%20for%20your%20time%20and%20dedication.%0D%0A%0D%0ABest%20regards,%0D%0A%5BYour%20Name%5D`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`ml-3 inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-medium transition-all duration-300 ${isDark
                      ? "bg-transparent border-gray-700 hover:bg-gray-800/60 text-cyan-400"
                      : "bg-transparent border-gray-300 hover:bg-gray-100 text-blue-600"
                    }`}
                >
                  Reach Maintainer
                </motion.span>
              </a>

            </div>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 max-w-2xl mx-auto leading-tight">
            {message}
          </h2>
          <p
            className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"
              } max-w-xl mx-auto leading-relaxed`}
          >
            The system cannot locate the specified resource. This may be due to
            an incorrect URL, removed content, or temporary unavailability.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 mb-8 relative z-10">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium group cursor-pointer transition-all duration-300 ${isDark
                  ? "bg-transparent border-gray-700 hover:bg-gray-800/60"
                  : "bg-transparent border-gray-300 hover:bg-gray-100"
                }`}
            >
              <Home
                className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-blue-600"
                  } group-hover:scale-110 transition-transform`}
              />
              <span
                className={`${isDark ? "text-gray-300" : "text-gray-700"
                  } group-hover:text-cyan-400 transition-colors`}
              >
                Home
              </span>
            </motion.div>
          </Link>

          <Link
            href="https://github.com/Om-singh-ui/NextStep.io/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium group cursor-pointer transition-all duration-300 ${isDark
                  ? "bg-transparent border-gray-700 hover:bg-gray-800/60"
                  : "bg-transparent border-gray-300 hover:bg-gray-100"
                }`}
            >
              <Github
                className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-blue-600"
                  } group-hover:scale-110 transition-transform`}
              />
              <span
                className={`${isDark ? "text-gray-300" : "text-gray-700"
                  } group-hover:text-cyan-400 transition-colors`}
              >
                Report Issue / Bug
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Technical Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"
            } font-mono`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <span>Timestamp: {new Date().toISOString()}</span>
            <span className="hidden sm:inline">•</span>
            <span>Status: Resource Not Found</span>
            <span className="hidden sm:inline">•</span>
            <span>System: Operational</span>
          </div>
        </motion.div>
      </main>

      {/* Footer fixed at bottom */}
      <footer className="relative z-10 w-full pb-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center px-6"
        >
          <div
            className={`inline-flex px-6 py-2 rounded-full border backdrop-blur-sm max-w-md mx-auto ${isDark
                ? "bg-gray-900/30 border-gray-800 text-gray-400"
                : "bg-white/30 border-gray-300 text-gray-600"
              }`}
          >
            <div className="flex items-center gap-2 text-sm flex-wrap justify-center">
              <Satellite className="w-4 h-4" />
              <span>NextStep.io Infrastructure • Secure Connection</span>
              <div
                className={`w-2 h-2 rounded-full ${isDark ? "bg-green-400" : "bg-green-500"
                  } animate-pulse`}
              />
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
