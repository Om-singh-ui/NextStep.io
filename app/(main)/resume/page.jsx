// app/(main)/resume/page.jsx
import EnhancedResumeBuilder from "./_components/resume-builder";

// Add this line to make the page dynamic
export const dynamic = 'force-dynamic'

export default async function ResumePage() {
  let resumeContent = '';

  return (
    <div className="min-h-screen">
      <EnhancedResumeBuilder initialContent={resumeContent} />
    </div>
  );
}