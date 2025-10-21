// app/(main)/resume/_components/enhanced-resume-builder.jsx
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Save,
  Sparkles,
  LayoutTemplate,
  Palette,
  GripVertical,
  Eye,
  Loader2,
  Edit,
  Smartphone,
  Monitor
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { AdvancedTabs } from "./advanced-tabs";
import { ThemeCustomizer } from "./theme-customizer";
import { SectionManager } from "./section-manager";
import { AISuggestions } from "./ai-suggestions";
import { PreviewPanel } from "./preview-panel";
import { EntryForm } from "./entry-form";

import { generateResumePDF } from "@/components/pdf-resume";
import { resumeSchema } from "@/app/lib/schema";
import { resumeTemplates } from "@/data/resume-templates";
import { useUser } from "@clerk/nextjs";
import useFetch from "@/hooks/use-fetch";
import { saveResume, improveWithAI } from "@/actions/resume";
import { useTheme } from "@/components/theme-provider"; // Import theme provider

const builderTabs = [
  { value: "content", label: "Content", icon: Edit },
  { value: "design", label: "Design", icon: Palette },
  { value: "sections", label: "Sections", icon: GripVertical },
  { value: "ai", label: "AI Enhance", icon: Sparkles },
];

export default function EnhancedResumeBuilder({ initialContent }) {
  const [activeBuilderTab, setActiveBuilderTab] = useState("content");
  const [previewContent, setPreviewContent] = useState(initialContent || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentFont, setCurrentFont] = useState(null);
  const [enabledSections, setEnabledSections] = useState([]);
  const [resumeScore, setResumeScore] = useState(65);
  const [activeView, setActiveView] = useState("form");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();

  // Use theme from theme provider
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        name: "",
        title: "",
        email: "",
        mobile: "",
        linkedin: "",
        twitter: "",
        location: "",
      },
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const { loading: isSaving, fn: saveResumeFn } = useFetch(saveResume);
  const { loading: isImproving, fn: improveWithAIFn } = useFetch(improveWithAI);

  // Define getCombinedContent function before any useEffect that uses it
  const getCombinedContent = () => {
    const { personalInfo, summary, skills, experience, education, projects } = watch();
    
    const sections = [];

    // Header with contact info
    if (personalInfo?.name) {
      sections.push(`# ${personalInfo.name}`);
      if (personalInfo.title) {
        sections.push(`### ${personalInfo.title}`);
      }
    }

    // Contact information
    const contactInfo = [];
    if (personalInfo?.email) contactInfo.push(`**Email:** ${personalInfo.email}`);
    if (personalInfo?.mobile) contactInfo.push(`**Phone:** ${personalInfo.mobile}`);
    if (personalInfo?.location) contactInfo.push(`**Location:** ${personalInfo.location}`);
    if (personalInfo?.linkedin) contactInfo.push(`**LinkedIn:** ${personalInfo.linkedin}`);
    
    if (contactInfo.length > 0) {
      sections.push(contactInfo.join(" | "));
    }

    // Professional Summary
    if (summary && summary.trim()) {
      sections.push(`## Professional Summary\n\n${summary.trim()}`);
    }

    // Skills
    if (skills && skills.trim()) {
      sections.push(`## Skills\n\n${skills.trim()}`);
    }

    // Work Experience
    if (experience && experience.length > 0) {
      sections.push(`## Work Experience`);
      experience.forEach(exp => {
        sections.push(`### ${exp.title}`);
        if (exp.organization) {
          sections.push(`**${exp.organization}** | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
        }
        if (exp.description) {
          const bulletPoints = exp.description.split('\n').filter(line => line.trim());
          bulletPoints.forEach(point => {
            sections.push(`- ${point.trim()}`);
          });
        }
        sections.push('---');
      });
    }

    // Education
    if (education && education.length > 0) {
      sections.push(`## Education`);
      education.forEach(edu => {
        sections.push(`### ${edu.title}`);
        if (edu.organization) {
          sections.push(`**${edu.organization}** | ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`);
        }
        if (edu.description) {
          const bulletPoints = edu.description.split('\n').filter(line => line.trim());
          bulletPoints.forEach(point => {
            sections.push(`- ${point.trim()}`);
          });
        }
        sections.push('---');
      });
    }

    // Projects
    if (projects && projects.length > 0) {
      sections.push(`## Projects`);
      projects.forEach(proj => {
        sections.push(`### ${proj.title}`);
        if (proj.organization) {
          sections.push(`**${proj.organization}** | ${proj.startDate} - ${proj.current ? 'Present' : proj.endDate}`);
        }
        if (proj.description) {
          const bulletPoints = proj.description.split('\n').filter(line => line.trim());
          bulletPoints.forEach(point => {
            sections.push(`- ${point.trim()}`);
          });
        }
        sections.push('---');
      });
    }

    return sections.join('\n\n');
  };

  // Clean up extension-added attributes and set mounted state
  useEffect(() => {
    setIsMounted(true);
    
    // Clean up any extension-added attributes
    if (typeof window !== 'undefined') {
      const cleanupExtensionAttributes = () => {
        document.querySelectorAll('[fdprocessedid]').forEach(el => {
          el.removeAttribute('fdprocessedid');
        });
        document.querySelectorAll('[gramm]').forEach(el => {
          el.removeAttribute('gramm');
        });
        document.querySelectorAll('[data-gramm]').forEach(el => {
          el.removeAttribute('data-gramm');
        });
      };
      
      // Run immediately
      cleanupExtensionAttributes();
      
      // Run after a short delay to catch any dynamically added attributes
      setTimeout(cleanupExtensionAttributes, 100);
      
      // Set up a mutation observer to catch future additions
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const target = mutation.target;
            if (target.hasAttribute('fdprocessedid') || 
                target.hasAttribute('gramm') || 
                target.hasAttribute('data-gramm')) {
              cleanupExtensionAttributes();
            }
          }
        });
      });
      
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['fdprocessedid', 'gramm', 'data-gramm']
      });
      
      return () => observer.disconnect();
    }
  }, []);

  // Calculate resume score based on content
  useEffect(() => {
    const values = watch();
    let score = 0;
    
    if (values.personalInfo?.name) score += 10;
    if (values.personalInfo?.title) score += 10;
    if (values.personalInfo?.email) score += 5;
    if (values.personalInfo?.mobile) score += 5;
    if (values.summary?.length > 50) score += 15;
    if (values.skills?.length > 20) score += 10;
    if (values.experience?.length > 0) score += 20;
    if (values.education?.length > 0) score += 15;
    if (values.projects?.length > 0) score += 10;
    
    setResumeScore(Math.min(100, score));
  }, [watch()]);

  // Update preview content when form changes
  useEffect(() => {
    if (activeBuilderTab === "content") {
      const content = getCombinedContent();
      setPreviewContent(content);
    }
  }, [watch(), activeBuilderTab, getCombinedContent]);

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateResumePDF(
        previewContent,
        profileImage,
        watch("personalInfo"),
        currentTheme,
        currentFont
      );
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(watch("personalInfo")?.name || 'resume').replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveResume = async (data) => {
    try {
      await saveResumeFn(previewContent);
      toast.success("Resume saved successfully!");
    } catch (error) {
      toast.error("Failed to save resume");
    }
  };

  const handleTemplateSelect = (template) => {
    reset({
      personalInfo: {
        ...template.structure.personalInfo,
        name: user?.fullName || template.structure.personalInfo.name || "",
      },
      summary: template.structure.summary || "",
      skills: template.structure.skills || "",
      experience: template.structure.experience || [],
      education: template.structure.education || [],
      projects: template.structure.projects || [],
    });
    
    toast.success(`"${template.name}" template loaded!`);
  };

  const handleAISuggestion = async (suggestion) => {
    switch (suggestion.type) {
      case "summary":
        const currentSummary = watch("summary");
        if (currentSummary) {
          const improved = await improveWithAIFn({
            current: currentSummary,
            type: "summary"
          });
          setValue("summary", improved);
        }
        break;
      case "skills":
        // Handle skills optimization
        break;
      default:
        break;
    }
    toast.success("AI suggestion applied!");
  };

  const handleImproveWithAI = async (field, currentValue) => {
    if (!currentValue) {
      toast.error("Please enter some content first");
      return;
    }

    try {
      const improved = await improveWithAIFn({
        current: currentValue,
        type: field
      });
      return improved;
    } catch (error) {
      toast.error("Failed to improve with AI");
      return currentValue;
    }
  };

  const renderFormContent = () => (
    <div className={`rounded-2xl shadow-xl border overflow-hidden ${
      darkMode 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white border-gray-100"
    }`}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Resume Content</h2>
            <p className="text-blue-100 text-sm">Fill in your professional details</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setActiveView("preview")}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>
      <div className={`p-6 space-y-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <form onSubmit={handleSubmit(handleSaveResume)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "name", label: "Full Name *", placeholder: "John Doe" },
                { key: "title", label: "Professional Title *", placeholder: "Senior Software Engineer" },
                { key: "email", label: "Email *", placeholder: "your@email.com", type: "email" },
                { key: "mobile", label: "Mobile *", placeholder: "+1 234 567 8900" },
                { key: "location", label: "Location", placeholder: "City, Country" },
                { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourprofile" }
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}>{field.label}</label>
                  <Input
                    {...register(`personalInfo.${field.key}`)}
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                    className={`w-full ${
                      darkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                        : "bg-white border-gray-300"
                    }`}
                  />
                  {errors.personalInfo?.[field.key] && (
                    <p className="text-sm text-red-500">{errors.personalInfo[field.key].message}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>Profile Photo</h3>
            <Controller
              name="profile"
              control={control}
              render={({ field }) => (
                <EntryForm
                  type="Profile"
                  entries={[]}
                  onChange={() => {}}
                  onImageChange={setProfileImage}
                  profileImage={profileImage}
                  darkMode={darkMode}
                />
              )}
            />
          </div>

          {/* Summary with AI Improvement */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>Professional Summary</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={async () => {
                  const currentSummary = watch("summary");
                  if (currentSummary) {
                    const improved = await handleImproveWithAI("summary", currentSummary);
                    setValue("summary", improved);
                  }
                }}
                disabled={isImproving}
                className={darkMode ? "bg-gray-700 text-white border-gray-600" : ""}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isImproving ? "Improving..." : "AI Enhance"}
              </Button>
            </div>
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
                  className={`min-h-32 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                      : "bg-white border-gray-300"
                  }`}
                />
              )}
            />
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>Skills</h3>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="List your key skills (comma separated or one per line)..."
                  className={`min-h-32 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                      : "bg-white border-gray-300"
                  }`}
                />
              )}
            />
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>Work Experience</h3>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <EntryForm
                  type="Experience"
                  entries={field.value}
                  onChange={field.onChange}
                  darkMode={darkMode}
                  onImproveWithAI={handleImproveWithAI}
                />
              )}
            />
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>Education</h3>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <EntryForm
                  type="Education"
                  entries={field.value}
                  onChange={field.onChange}
                  darkMode={darkMode}
                  onImproveWithAI={handleImproveWithAI}
                />
              )}
            />
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>Projects</h3>
            <Controller
              name="projects"
              control={control}
              render={({ field }) => (
                <EntryForm
                  type="Project"
                  entries={field.value}
                  onChange={field.onChange}
                  darkMode={darkMode}
                  onImproveWithAI={handleImproveWithAI}
                />
              )}
            />
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Resume
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveView("preview")}
              className={darkMode ? "bg-gray-700 text-white border-gray-600" : ""}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Resume
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderPreviewContent = () => (
    <PreviewPanel
      content={previewContent}
      onDownload={handleGeneratePDF}
      isGenerating={isGenerating}
      darkMode={darkMode}
      previewDevice={previewDevice}
      onPreviewDeviceChange={setPreviewDevice}
      onEdit={() => setActiveView("form")}
    />
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-blue-900/30 to-indigo-900/30" 
        : "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30"
    }`}>
      {/* Enhanced Header */}
      <div className={`backdrop-blur-sm border-b sticky top-0 z-40 transition-colors duration-300 ${
        darkMode 
          ? "bg-gray-800/80 border-gray-700/50" 
          : "bg-white/80 border-slate-200/50"
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-left">
              <h1 className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-2 ${
                darkMode ? "text-white" : ""
              }`}>
                Resume Craft
              </h1>
              <p className={darkMode ? "text-gray-300" : "text-slate-600"}>
                Build a professional resume that gets you hired
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              {/* Resume Score */}
              <div className={`flex items-center gap-3 rounded-2xl px-4 py-2 border shadow-sm transition-colors ${
                darkMode 
                  ? "bg-gray-800/80 border-gray-700" 
                  : "bg-white/80 border-slate-200"
              }`}>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      darkMode ? "bg-gray-700" : "bg-slate-100"
                    }`}>
                      <div 
                        className="absolute inset-1 rounded-full"
                        style={{
                          background: `conic-gradient(#10b981 ${resumeScore * 3.6}deg, ${
                            darkMode ? '#374151' : '#e5e7eb'
                          } 0deg)`
                        }}
                      />
                      <span className={`relative text-sm font-bold ${
                        darkMode ? "text-white" : "text-slate-700"
                      }`}>
                        {resumeScore}
                      </span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-medium ${
                      darkMode ? "text-gray-400" : "text-slate-500"
                    }`}>Resume Score</p>
                    <p className={`text-sm font-semibold ${
                      darkMode ? "text-white" : "text-slate-700"
                    }`}>
                      {resumeScore >= 80 ? "Excellent" : resumeScore >= 60 ? "Good" : "Needs Work"}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Sidebar - Builder Controls */}
          <div className="xl:col-span-1 space-y-6">
            <AdvancedTabs
              tabs={builderTabs}
              value={activeBuilderTab}
              onValueChange={setActiveBuilderTab}
              darkMode={darkMode}
            />

            <AnimatePresence mode="wait">
              {activeBuilderTab === "design" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={`border-0 shadow-xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                    <CardHeader className={`bg-gradient-to-r border-b ${
                      darkMode 
                        ? "from-gray-700 to-blue-900/50 border-gray-700" 
                        : "from-gray-50 to-blue-50/50 border-gray-200"
                    }`}>
                      <CardTitle className={`flex items-center gap-2 text-lg ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        <Palette className="h-5 w-5" />
                        Theme Customizer
                      </CardTitle>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Customize your resume's appearance
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Palette className="h-8 w-8 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Theme Customizer
                      </h3>
                      <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        Theme customization features coming soon!
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeBuilderTab === "sections" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <SectionManager 
                    onSectionsChange={setEnabledSections}
                    darkMode={darkMode}
                  />
                </motion.div>
              )}

              {activeBuilderTab === "ai" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <AISuggestions 
                    onApplySuggestion={handleAISuggestion}
                    darkMode={darkMode}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Template Quick Select */}
            <Card className={`border-0 shadow-xl transition-colors ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            }`}>
              <CardHeader className={`bg-gradient-to-r border-b ${
                darkMode 
                  ? "from-gray-700 to-orange-900/50 border-gray-700" 
                  : "from-gray-50 to-orange-50/50 border-gray-200"
              }`}>
                <CardTitle className={`flex items-center gap-2 text-lg ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <LayoutTemplate className="h-5 w-5" />
                  Quick Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {resumeTemplates.slice(0, 3).map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                      darkMode
                        ? "border-gray-600 hover:border-orange-500 hover:bg-orange-900/20 text-white"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 text-gray-900"
                    }`}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className={`text-sm mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>{template.description}</div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-3">
            <AnimatePresence mode="wait">
              {activeBuilderTab === "content" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeView === "form" ? renderFormContent() : renderPreviewContent()}
                </motion.div>
              )}

              {activeBuilderTab !== "content" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl shadow-xl border p-8 ${
                    darkMode 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {activeBuilderTab === "design" && <Palette className="h-8 w-8 text-white" />}
                      {activeBuilderTab === "sections" && <GripVertical className="h-8 w-8 text-white" />}
                      {activeBuilderTab === "ai" && <Sparkles className="h-8 w-8 text-white" />}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {activeBuilderTab === "design" && "Customize Design"}
                      {activeBuilderTab === "sections" && "Manage Sections"}
                      {activeBuilderTab === "ai" && "AI Enhancements"}
                    </h3>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      {activeBuilderTab === "design" && "Use the left panel to customize your resume's appearance with themes and fonts."}
                      {activeBuilderTab === "sections" && "Drag and drop to reorder sections, toggle visibility to create the perfect layout."}
                      {activeBuilderTab === "ai" && "Get smart suggestions to improve your resume content and increase your chances."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25"
        >
          <Download className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}