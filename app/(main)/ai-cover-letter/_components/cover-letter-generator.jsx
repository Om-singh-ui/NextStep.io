"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Rocket, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import { useRouter } from "next/navigation";
// FIXED: Updated import path to match your file structure
import { coverLetterSchema } from "@/app/lib/schema";

export default function CoverLetterGenerator() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    mode: "onChange",
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobDescription: "",
      resumeContent: "",
    }
  });

  // Watch fields for character count
  const jobDescriptionValue = watch("jobDescription");
  const resumeContentValue = watch("resumeContent");

  const handleBackToCoverLetters = () => {
    router.push("/ai-cover-letter");
  };

  const onSubmit = async (formData) => {
    if (!isValid) return;
    
    setIsGenerating(true);
    
    try {
      const result = await generateCoverLetter(formData);
      
      if (result?.id) {
        toast.success("🎉 Cover letter generated successfully!");
        router.push(`/ai-cover-letter/${result.id}`);
      } else {
        throw new Error("No cover letter generated");
      }
    } catch (error) {
      console.error("Cover letter generation error:", error);
      toast.error(error.message || "Failed to generate cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const fillTestData = () => {
    setValue("companyName", "TechInnovate Inc");
    setValue("jobTitle", "Senior Frontend Developer");
    setValue("jobDescription", `We are seeking an experienced Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features, optimizing web performance, and collaborating with cross-functional teams.

Key Responsibilities:
- Develop responsive web applications using React and Next.js
- Implement modern UI/UX designs with Tailwind CSS
- Optimize applications for maximum speed and scalability
- Collaborate with backend developers and designers
- Write clean, maintainable, and tested code

Requirements:
- 3+ years of experience with React and TypeScript
- Proficiency in modern JavaScript (ES6+)
- Experience with state management (Redux, Zustand)
- Knowledge of RESTful APIs and GraphQL
- Familiarity with testing frameworks (Jest, React Testing Library)

Nice to Have:
- Experience with Next.js and server-side rendering
- Knowledge of web performance optimization
- Experience with CI/CD pipelines`);

    setValue("resumeContent", `PROFESSIONAL SUMMARY
Frontend Developer with 4+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern frontend architectures.

TECHNICAL SKILLS
- Frontend: React, Next.js, TypeScript, JavaScript (ES6+)
- Styling: Tailwallwind CSS, Styled Components, CSS3
- State Management: Redux Toolkit, Zustand, Context API
- Testing: Jest, React Testing Library, Cypress
- Tools: Git, Webpack, Vite, npm/yarn

PROFESSIONAL EXPERIENCE
Senior Frontend Developer | TechSolutions Inc | 2022 - Present
- Led development of customer dashboard serving 50k+ users
- Improved application performance by 40% through code splitting
- Implemented TypeScript across codebase, reducing bugs by 60%

Frontend Developer | WebCraft Studios | 2020 - 2022
- Developed responsive web applications for various clients
- Collaborated with UX designers to implement pixel-perfect designs
- Mentored 2 junior developers on React best practices

EDUCATION
Bachelor of Computer Science | University of Technology | 2016 - 2020`);

    toast.info("📝 Test data filled! Review and click Generate.");
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl backdrop-blur-sm bg-card/50 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500">
        <CardHeader className="pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-plus-jakarta font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                AI Cover Letter Generator
              </CardTitle>
              <CardDescription className="text-muted-foreground/80 mt-2">
                Create professional, tailored cover letters in seconds
              </CardDescription>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleBackToCoverLetters}
              className="rounded-xl border-border/50 hover:border-blue-500/40 transition-all duration-300 flex items-center gap-2"
              disabled={isGenerating}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cover Letters
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Company & Job Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="companyName" className="text-base font-semibold flex items-center gap-2">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  placeholder="e.g., Google, Microsoft, Amazon"
                  className="rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300 h-12"
                  {...register("companyName")}
                  disabled={isGenerating}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="jobTitle" className="text-base font-semibold flex items-center gap-2">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Frontend Developer, Product Manager"
                  className="rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300 h-12"
                  {...register("jobTitle")}
                  disabled={isGenerating}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-3">
              <Label htmlFor="jobDescription" className="text-base font-semibold flex items-center gap-2">
                Job Description <span className="text-red-500">*</span>
                <span className="text-xs text-muted-foreground font-normal ml-auto">
                  {jobDescriptionValue?.length || 0} characters
                </span>
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the full job description here. Include key responsibilities, requirements, and qualifications..."
                className="min-h-32 rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300 resize-vertical"
                {...register("jobDescription")}
                disabled={isGenerating}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            {/* Resume Content */}
            <div className="space-y-3">
              <Label htmlFor="resumeContent" className="text-base font-semibold flex items-center gap-2">
                Your Resume Content
                <span className="text-xs text-muted-foreground font-normal ml-auto">
                  {resumeContentValue?.length || 0} characters
                </span>
              </Label>
              <Textarea
                id="resumeContent"
                placeholder="Optional: Paste your resume content for better personalization. Include skills, experience, and achievements..."
                className="min-h-32 rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300 resize-vertical"
                {...register("resumeContent")}
                disabled={isGenerating}
              />
              {errors.resumeContent && (
                <p className="text-sm text-red-500">
                  {errors.resumeContent.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                💡 Providing resume content helps generate more personalized and relevant cover letters.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border/20">
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={fillTestData}
                  className="rounded-xl border-border/50 hover:border-blue-500/40 transition-all duration-300"
                  disabled={isGenerating}
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  Fill Test Data
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBackToCoverLetters}
                  className="rounded-xl border-border/50 hover:border-blue-500/40 transition-all duration-300 sm:hidden"
                  disabled={isGenerating}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              
              <Button 
                type="submit" 
                disabled={isGenerating || !isValid}
                className="rounded-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}  