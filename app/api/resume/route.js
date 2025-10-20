// app/api/resume/route.js
import { NextResponse } from "next/server";

// Use dynamic import for heavy PDF library
const generatePDF = async (content) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text(content || 'Resume content', 10, 10);
  return doc.output('arraybuffer');
};

export const runtime = 'nodejs';
export const maxDuration = 30; // Reduce from 60 to 30
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ 
      ok: true, 
      message: "Resume API running",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("GET /api/resume error:", error);
    return NextResponse.json({ error: "Failed to handle GET" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { content } = await req.json();
    
    // Validate input
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: "Invalid content provided" }, 
        { status: 400 }
      );
    }
    
    // Limit content size for serverless
    if (content.length > 10000) {
      return NextResponse.json(
        { error: "Content too large. Maximum 10,000 characters." }, 
        { status: 400 }
      );
    }
    
    const pdfBuffer = await generatePDF(content);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
        "Cache-Control": "no-cache", // Prevent caching issues
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" }, 
      { status: 500 }
    );
  }
}