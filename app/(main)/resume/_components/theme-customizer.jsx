// app/(main)/resume/_components/theme-customizer.jsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Type } from "lucide-react";

const themes = [
  { id: "modern", name: "Modern", description: "Clean and contemporary design" },
  { id: "classic", name: "Classic", description: "Traditional professional layout" },
  { id: "minimal", name: "Minimal", description: "Simple and focused" },
  { id: "executive", name: "Executive", description: "Bold and authoritative" },
];

const fonts = [
  { id: "inter", name: "Inter", description: "Modern sans-serif" },
  { id: "roboto", name: "Roboto", description: "Clean and versatile" },
  { id: "open-sans", name: "Open Sans", description: "Friendly and readable" },
  { id: "georgia", name: "Georgia", description: "Elegant serif" },
];

export function ThemeCustomizer({ onThemeChange, onFontChange, darkMode = false }) {
  const cardClassName = darkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white";

  const headerClassName = darkMode
    ? "from-gray-700 to-blue-900/50 border-gray-700"
    : "from-gray-50 to-blue-50/50 border-gray-200";

  return (
    <Card className={`border-0 shadow-xl ${cardClassName}`}>
      <CardHeader className={`bg-gradient-to-r border-b ${headerClassName}`}>
        <CardTitle className={`flex items-center gap-2 text-lg ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          <Palette className="h-5 w-5" />
          Theme Customizer
        </CardTitle>
        <p className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          Customize the appearance of your resume
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Theme Selection */}
        <div className="space-y-4">
          <h3 className={`font-medium flex items-center gap-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            <Palette className="h-4 w-4" />
            Select Theme
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange?.(theme.id)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  darkMode
                    ? "border-gray-600 hover:border-blue-500 hover:bg-blue-900/20 text-white"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 text-gray-900"
                }`}
              >
                <div className="font-medium text-sm">{theme.name}</div>
                <div className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {theme.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-4">
          <h3 className={`font-medium flex items-center gap-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            <Type className="h-4 w-4" />
            Select Font
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => onFontChange?.(font.id)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  darkMode
                    ? "border-gray-600 hover:border-purple-500 hover:bg-purple-900/20 text-white"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 text-gray-900"
                }`}
              >
                <div className="font-medium text-sm" style={{ fontFamily: font.name }}>
                  {font.name}
                </div>
                <div className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {font.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className={`font-medium mb-3 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Preview
          </h3>
          <div className={`p-4 rounded-lg border ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
          }`}>
            <div className="space-y-2">
              <div className={`h-2 rounded ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}></div>
              <div className={`h-2 rounded w-3/4 ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}></div>
              <div className={`h-2 rounded w-1/2 ${
                darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}