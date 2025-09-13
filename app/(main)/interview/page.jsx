import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center mb-16 mt-16 px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse">
          Interview Preparation
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl">
          Master your skills with structured practice, real-world assessments, and expert tips.
        </p>
      </div>


      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
