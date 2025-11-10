"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Eye, Trash2, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  const handleView = (id) => {
    router.push(`/ai-cover-letter/${id}`);
  };

  if (!coverLetters?.length) {
    return (
      <Card className="rounded-2xl backdrop-blur-sm bg-card/40 border border-primary/20 text-center py-16">
        <CardContent className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-plus-jakarta font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            No Cover Letters Yet
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 max-w-md mx-auto">
            Create your first AI-powered cover letter to kickstart your job application journey
          </CardDescription>
          <Button 
            onClick={() => router.push("/ai-cover-letter/new")}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold mt-4"
          >
            Create Your First Cover Letter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-plus-jakarta font-bold">
          Your Cover Letters ({coverLetters.length})
        </h2>
        <Badge variant="secondary" className="rounded-lg">
          <Calendar className="h-3 w-3 mr-1" />
          {format(new Date(), "MMM d, yyyy")}
        </Badge>
      </div>

      <div className="grid gap-4">
        {coverLetters.map((letter) => (
          <Card 
            key={letter.id} 
            className="group relative rounded-2xl backdrop-blur-sm bg-card/40 border border-primary/20 hover:scale-[1.01] hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 space-y-2">
                  <CardTitle className="text-xl font-plus-jakarta font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 line-clamp-1">
                    {letter.jobTitle} at {letter.companyName}
                  </CardTitle>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(letter.createdAt), "MMM d, yyyy")}
                    </div>
                    <Badge variant="outline" className="rounded-md text-xs">
                      {letter.status || "completed"}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleView(letter.id)}
                    className="rounded-xl border-border/50 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300 h-9 w-9"
                    title="View cover letter"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-xl border-border/50 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 h-9 w-9"
                        title="Delete cover letter"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl backdrop-blur-sm bg-background/80 border border-primary/20">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-plus-jakarta font-bold">
                          Delete Cover Letter?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground/80">
                          This action cannot be undone. This will permanently delete your cover letter for{" "}
                          <strong>{letter.jobTitle}</strong> at <strong>{letter.companyName}</strong>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl border-border/50 hover:border-border transition-all duration-300">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(letter.id)}
                          className="rounded-xl bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white font-semibold transition-all duration-300"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-0">
              <div className="text-muted-foreground/80 text-sm line-clamp-2 leading-relaxed">
                {letter.jobDescription}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}