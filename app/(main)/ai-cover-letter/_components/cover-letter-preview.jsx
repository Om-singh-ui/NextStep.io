// cover-letter-preview.jsx
"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="py-6 rounded-2xl backdrop-blur-sm bg-card/40 border border-primary/20 p-6 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
      <MDEditor 
        value={content} 
        preview="preview" 
        height={700}
        style={{
          borderRadius: '1rem',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default CoverLetterPreview;