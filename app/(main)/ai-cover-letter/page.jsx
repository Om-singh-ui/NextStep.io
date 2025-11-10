import { getCoverLetters } from "@/actions/cover-letter";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CoverLetterList from "./_components/cover-letter-list";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CoverLettersPage() {
  let coverLetters = [];
  
  try {
    coverLetters = await getCoverLetters();
  } catch (error) {
    console.error("Failed to load cover letters:", error);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-plus-jakarta font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            My Cover Letters
          </h1>
          <p className="text-muted-foreground/80 text-lg">
            Manage and review your AI-generated cover letters
          </p>
        </div>
        
        <Link href="/ai-cover-letter/new">
          <Button 
            className="
              rounded-xl px-6 py-3 
              bg-gradient-to-r from-blue-500 to-cyan-500 
              hover:from-blue-600 hover:to-cyan-600 
              text-white font-semibold 
              hover:scale-105 transition-all duration-300 
              shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
              flex items-center gap-2
            "
          >
            <Plus className="h-5 w-5" />
            New Cover Letter
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}