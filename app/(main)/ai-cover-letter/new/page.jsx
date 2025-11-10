import CoverLetterGenerator from "../_components/cover-letter-generator";
import { Suspense } from "react";
import ErrorBoundary from "@/components/error-boundary";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Preparing Cover Letter Generator</p>
          <p className="text-muted-foreground max-w-md">
            Loading AI-powered tools to create your perfect cover letter...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NewCoverLetterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/5 to-purple-50/5">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-6 mb-8">
          {/* Main Title Section */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-600 leading-tight">
                Create Cover Letter
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-xl text-muted-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Generate professional, tailored cover letters in seconds with our AI-powered platform. 
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <ErrorBoundary fallback={
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Something went wrong</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're having trouble loading the cover letter generator.
              </p>
            </div>
          }>
            <Suspense fallback={<LoadingFallback />}>
              <CoverLetterGenerator />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}