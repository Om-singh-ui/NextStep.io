import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  let coverLetter = null;
  
  try {
    coverLetter = await getCoverLetter(id);
  } catch (error) {
    console.error("Failed to load cover letter:", error);
  }

  if (!coverLetter) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Cover Letter Not Found</h1>
        <Link href="/ai-cover-letter">
          <Button className="mt-4">Back to Cover Letters</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <Link href="/ai-cover-letter">
          <Button 
            variant="outline" 
            className="rounded-full flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-plus-jakarta font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>
      
      <CoverLetterPreview 
        content={coverLetter?.content} 
        jobTitle={coverLetter?.jobTitle}
        companyName={coverLetter?.companyName}
      />
    </div>
  );
}