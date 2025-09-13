import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="container mx-auto px-4 sm:px-5 md:px-6 py-10 sm:py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button className="
            relative group overflow-hidden
            px-6 py-4 h-12 rounded-xl
            flex items-center gap-2
            bg-gradient-to-r from-blue-500 to-cyan-500
            text-white font-semibold
            transition-all duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
            hover:scale-105
          ">
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="relative z-10">Create New</span>
            
            {/* Glowing hover aura */}
            <span
              className="
                absolute inset-0 rounded-xl
                bg-gradient-to-r from-blue-500/20 to-cyan-400/20
                opacity-0 group-hover:opacity-100
                blur-lg transition duration-500
              "
            />
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}