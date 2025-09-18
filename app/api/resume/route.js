import { NextResponse } from "next/server";
import { generatePDF } from "@/lib/pdf"; // your function

export async function POST(req) {
  try {
    const body = await req.json();
    const pdfBuffer = await generatePDF(body.content);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
