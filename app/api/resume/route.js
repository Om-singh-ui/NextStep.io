// app/api/resume/route.js
import { NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf"; // this works if lib/pdf.js exists

export async function POST(req) {
  try {
    const { content } = await req.json();
    const pdfBuffer = await generatePDF(content);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
