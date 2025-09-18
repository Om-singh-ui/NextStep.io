// pages/api/resume.js
import { generatePDF } from "@/lib/pdf";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content } = req.body;
    const pdfBuffer = await generatePDF(content);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.send(pdfBuffer);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
