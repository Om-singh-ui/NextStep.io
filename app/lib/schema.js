// app/lib/schema.js
import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  mobile: z.string().optional(),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal('')),
  twitter: z.string().url("Invalid URL").optional().or(z.literal('')),
});

export const entrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  current: z.boolean().default(false),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().optional(),
  skills: z.string().optional(),
  experience: z.array(entrySchema).default([]),
  education: z.array(entrySchema).default([]),
  projects: z.array(entrySchema).default([]),
});

export const onboardingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().optional(),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]).optional(),
  careerGoals: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

// FIXED: Updated coverLetterSchema to match component requirements
export const coverLetterSchema = z.object({
  companyName: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .trim(),
  
  jobTitle: z.string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be less than 100 characters")
    .trim(),
  
  jobDescription: z.string()
    .min(50, "Job description must be at least 50 characters")
    .max(5000, "Job description must be less than 5000 characters")
    .trim(),
  
  resumeContent: z.string()
    .max(10000, "Resume content must be less than 10000 characters")
    .optional()
    .or(z.literal('')),
});

