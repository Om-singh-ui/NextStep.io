// actions/generatePdf.js
'use server';

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function generateRoadmapPdf(htmlContent, filename = 'career-roadmap.pdf') {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    
    // Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close();

    // Convert to base64 for easy handling
    const pdfBase64 = pdf.toString('base64');
    
    return {
      success: true,
      pdf: pdfBase64,
      filename
    };
  } catch (error) {
    console.error('PDF generation error:', error);
    return {
      success: false,
      error: 'Failed to generate PDF'
    };
  }
}