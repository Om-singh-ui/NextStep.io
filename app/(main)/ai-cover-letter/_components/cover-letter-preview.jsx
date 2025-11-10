"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Copy, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CoverLetterPreview = ({ content, jobTitle, companyName }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Cover letter copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter - ${jobTitle} at ${companyName}</title>
          <style>
            body { 
              font-family: 'Georgia', serif; 
              line-height: 1.6; 
              margin: 40px; 
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
            }
            h1 { color: #2c5aa0; margin-bottom: 10px; }
            .meta { color: #666; margin-bottom: 30px; font-size: 14px; }
            .content { margin-top: 20px; }
            @media print {
              body { margin: 0; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="content">${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${companyName}-${jobTitle}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="rounded-xl border-border/50 hover:border-blue-500/40 transition-all duration-300"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="rounded-xl border-border/50 hover:border-green-500/40 transition-all duration-300"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="rounded-xl border-border/50 hover:border-purple-500/40 transition-all duration-300"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Preview */}
      <div className="rounded-2xl backdrop-blur-sm bg-card/40 border border-primary/20 p-6 shadow-lg">
        <MDEditor 
          value={content} 
          preview="preview" 
          height={600}
          style={{
            borderRadius: '1rem',
            overflow: 'hidden',
            border: 'none'
          }}
          data-color-mode="light"
        />
      </div>
    </div>
  );
};

export default CoverLetterPreview;