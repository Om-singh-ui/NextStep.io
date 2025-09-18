// lib/pdf.js
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePDF(content) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { height } = page.getSize();

  page.drawText(content, {
    x: 50,
    y: height - 100,
    size: 14,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes); // works with Vercel API response
}
