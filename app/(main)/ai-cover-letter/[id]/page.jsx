import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="container mx-auto px-4 sm:px-5 md:px-6 py-10 sm:py-12 md:py-20">
      <div className="flex flex-col space-y-4 mb-8">
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

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-2">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>
      <CoverLetterPreview content={coverLetter?.content} />
    </div>
  );
}