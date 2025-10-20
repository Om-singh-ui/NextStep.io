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

// ADD THESE MISSING SCHEMAS:
export const onboardingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().optional(),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]).optional(),
  careerGoals: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export const coverLetterSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  resumeContent: z.string().min(1, "Resume content is required"),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  tone: z.enum(["professional", "enthusiastic", "formal", "casual"]).default("professional"),
  customInstructions: z.string().optional(),
});