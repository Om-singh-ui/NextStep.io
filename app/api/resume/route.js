// In your API route
const pdfBuffer = await generatePDF(content);
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
res.send(pdfBuffer);