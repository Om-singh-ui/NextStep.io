import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

// Add this line to make the page dynamic
export const dynamic = 'force-dynamic'

export default async function ResumePage() {
  let resumeContent = '';
  
  try {
    const resume = await getResume();
    resumeContent = resume?.content || '';
  } catch (error) {
    console.error('Error fetching resume:', error);
    // Fallback to empty content if there's an error
    resumeContent = '';
  }

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resumeContent} />
    </div>
  );
}
