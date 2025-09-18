// lib/pdf.js
import { jsPDF } from "jspdf";

// Simple PDF generator
export async function generatePDF(content) {
  const doc = new jsPDF();

  // Add text (basic, can be improved later)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(content || "Empty Resume Content", 20, 30);

  // Return as Node.js Buffer
  return Buffer.from(doc.output("arraybuffer"));
}
