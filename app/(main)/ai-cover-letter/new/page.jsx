import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";
import { Suspense } from "react";

// Fallback component while CoverLetterGenerator loads
function CoverLetterGeneratorFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading cover letter generator...</p>
      </div>
    </div>
  );
}

export default function NewCoverLetterPage() {
  return (
    <div className="container mx-auto px-4 sm:px-5 md:px-6 py-10 sm:py-12 md:py-20">
      <div className="flex flex-col space-y-6 mb-8">
        <Link href="/ai-cover-letter" legacyBehavior>
          <Button 
            variant="outline" 
            className="
              relative group overflow-hidden
              px-5 py-2.5 h-10 rounded-full
              flex items-center gap-2
              border border-blue-400/30
              bg-transparent backdrop-blur-sm
              text-muted-foreground hover:text-foreground
              transition-all duration-300
              hover:-translate-y-0.5
              shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
              pl-3
            "
          >
            {/* Icon */}
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400" />

            {/* Text */}
            <span className="relative z-10 font-medium">Back to Cover Letters</span>

            {/* Thin hover line (accent underline) */}
            <span
              className="
                absolute bottom-0 left-1/2 transform -translate-x-1/2
                w-0 h-[2px] rounded-full
                bg-gradient-to-r from-blue-500 to-cyan-400
                transition-all duration-300
                group-hover:w-4/5
              "
            />

            {/* Glowing hover aura */}
            <span
              className="
                absolute inset-0 rounded-full
                bg-gradient-to-r from-blue-500/20 to-cyan-400/20
                opacity-0 group-hover:opacity-100
                blur-lg transition duration-500
              "
            />
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-500 mb-4">
            Create Cover Letter
          </h1>
          <p className="text-muted-foreground/80 text-lg max-w-2xl">
            Generate a tailored cover letter for your job application with AI-powered precision
          </p>
        </div>
      </div>
      
      {/* Wrap in Suspense to handle async operations and prevent prerendering issues */}
      <Suspense fallback={<CoverLetterGeneratorFallback />}>
        <CoverLetterGenerator />
      </Suspense>
    </div>
  );
}