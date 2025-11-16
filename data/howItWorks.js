import { UserPlus, FileText, Code, LineChart } from "lucide-react";

export const howItWorks = [
  {
    step: "01",
    title: "Professional Onboarding",
    description:
      "Start your journey by sharing your background, skills, and career goals. Receive personalized guidance from day one.",
    icon: (
      <UserPlus className="w-10 h-10 p-2 bg-blue-500/10 rounded-lg text-blue-600" />
    ),
    image: "/po1.png",
  },
  {
    step: "02",
    title: "Industry Insights",
    description:
      "Get real-time insights into your industry trends, high-demand skills, and career opportunities to stay ahead.",
    icon: (
      <FileText className="w-10 h-10 p-2 bg-purple-500/10 rounded-lg text-purple-600" />
    ),
    image: "/II.png",
  },
  {
    step: "03",
    title: "DevTools Suite",
    description:
      "Build your professional toolkit with AI-powered resume builder, cover letter generator, and interview prep tools.",
    icon: (
      <Code className="w-10 h-10 p-2 bg-green-500/10 rounded-lg text-green-600" />
    ),
    image: ["/dts1.png", "/dts2.png", "/dts3.png"],
  },
  {
    step: "04",
    title: "Personalized Roadmaps",
    description:
      "Receive a tailored roadmap highlighting key milestones, skill growth, and actionable steps to reach your career goals.",
    icon: (
      <LineChart className="w-10 h-10 p-2 bg-orange-500/10 rounded-lg text-orange-600" />
    ),
    image: "/pr.png",
  },
];
