// app/api/resume/route.js
import { NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf";

export async function POST(req) {
  const { content } = await req.json();
  const pdfBuffer = await generatePDF(content);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="resume.pdf"',
    },
  });
}
