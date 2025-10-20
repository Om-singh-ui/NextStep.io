"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// USE THE IMPORTED SCHEMA NOW:
import { coverLetterSchema } from "@/app/lib/schema";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter, router, reset]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl backdrop-blur-sm bg-card/40 border border-primary/20 shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-plus-jakarta font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            Job Details
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="companyName" className="text-base font-semibold">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  className="rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="jobTitle" className="text-base font-semibold">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  className="rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="jobDescription" className="text-base font-semibold">Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-32 rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="resumeContent" className="text-base font-semibold">Your Resume Content</Label>
              <Textarea
                id="resumeContent"
                placeholder="Paste your resume content here"
                className="h-32 rounded-xl border-border/50 focus:border-blue-500/40 transition-all duration-300"
                {...register("resumeContent")}
              />
              {errors.resumeContent && (
                <p className="text-sm text-red-500">
                  {errors.resumeContent.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={generating}
                className="rounded-xl px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}