// app/(main)/resume/_components/preview-panel.jsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Smartphone, Monitor, Download, Edit } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

export function PreviewPanel({ content, onDownload, isGenerating, darkMode = false, previewDevice, onPreviewDeviceChange, onEdit }) {
  return (
    <Card className={`border-0 shadow-xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Live Preview</h2>
              <p className="text-green-100 text-sm">See how your resume will look</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={previewDevice === "mobile" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onPreviewDeviceChange("mobile")}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                variant={previewDevice === "desktop" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onPreviewDeviceChange("desktop")}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className={`border-2 rounded-xl overflow-hidden shadow-inner ${
            previewDevice === "mobile" ? "max-w-sm mx-auto" : "w-full"
          } ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
            <div className={darkMode ? "bg-gray-900" : "bg-white"}>
              <MDEditor
                value={content}
                height={previewDevice === "mobile" ? 600 : 800}
                preview="preview"
                hideToolbar
                data-color-mode={darkMode ? "dark" : "light"}
                className="resume-preview"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={onDownload}
              disabled={isGenerating}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating PDF..." : "Download Resume"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}