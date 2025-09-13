import { UserPlus, FileEdit, Users, LineChart, ArrowRight } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description: "Share your industry background, skills, and career aspirations for fully personalized guidance tailored to your unique profile",
    icon: <UserPlus className="w-10 h-10 p-2 bg-blue-500/10 rounded-lg text-blue-600" />,
    step: "01",
  },
  {
    title: "Craft Impactful Documents",
    description: "Create ATS-optimized resumes and compelling cover letters that highlight your achievements and stand out to recruiters",
    icon: <FileEdit className="w-10 h-10 p-2 bg-purple-500/10 rounded-lg text-purple-600" />,
    step: "02",
  },
  {
    title: "AI-Powered Interview Prep",
    description: "Practice with intelligent mock interviews that adapt to your responses and provide real-time feedback for your target role",
    icon: <Users className="w-10 h-10 p-2 bg-green-500/10 rounded-lg text-green-600" />,
    step: "03",
  },
  {
    title: "Track & Optimize Progress",
    description: "Monitor your improvements with detailed performance analytics and data-driven recommendations for continuous growth",
    icon: <LineChart className="w-10 h-10 p-2 bg-orange-500/10 rounded-lg text-orange-600" />,
    step: "04",
  },
];