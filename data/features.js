import { Cpu, BarChart3, Network, Binary } from "lucide-react";

export const features = [
  {
    icon: <Cpu className="w-10 h-10 p-2 bg-blue-500/10 rounded-lg text-blue-600" />,
    title: "Career Path Algorithm",
    description:
      "Proprietary machine learning models analyze your profile against millions of data points to calculate your optimal career trajectory.",
  },
  {
    icon: <Network className="w-10 h-10 p-2 bg-purple-500/10 rounded-lg text-purple-600" />,
    title: "Behavioral Interview Platform",
    description:
      "An adaptive environment to deconstruct your responses and provide a competency matrix score.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 p-2 bg-green-500/10 rounded-lg text-green-600" />,
    title: "Industry Intelligence Engine",
    description:
      "Access predictive analytics on industry shifts, skill valuation, and compensation bands powered by live job market data.",
  },
  {
    icon: <Binary className="w-10 h-10 p-2 bg-orange-500/10 rounded-lg text-orange-600" />,
    title: "ATS Compliance Optimizer",
    description:
      "Our system reverse-engineers applicant tracking systems to architect resumes with maximum parsing efficiency and ranking.",
  },
];