"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    console.log("Improving content for user:", userId, "Type:", type);

    const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    console.log("User found:", user.id, "Industry:", user.industry);

    // Use a default industry if not specified
    const userIndustry = user.industry || "technology";
    
    const prompt = `
      As an expert resume writer, improve the following ${type} description for a ${userIndustry} professional.
      Make it more impactful, quantifiable, and aligned with industry standards.
      Current content: "${current}"

      Requirements:
      1. Use action verbs
      2. Include metrics and results where possible
      3. Highlight relevant technical skills
      4. Keep it concise but detailed
      5. Focus on achievements over responsibilities
      6. Use industry-specific keywords
      7. ABSOLUTELY NO MARKDOWN FORMATTING - no #, ##, *, -, or any other markdown symbols
      8. Return plain text only - no formatting, no headers, no bullet points
      9. Do not create section headers or titles
      10. Output should be a single continuous paragraph

      Format the response as a single paragraph without any additional text or explanations.
    `;

    console.log("Sending prompt to AI:", prompt.substring(0, 200) + "...");

    const result = await model.generateContent(prompt);
    const response = result.response;
    let improvedContent = response.text().trim();

    // Enhanced cleanup for any markdown that might still be present
    improvedContent = improvedContent
      .replace(/^#+\s*/gm, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italics
      .replace(/`(.*?)`/g, '$1') // Remove code blocks
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
      .replace(/^- /gm, '') // Remove bullet points
      .replace(/^\s*[-*+]\s*/gm, '') // Remove any remaining bullet points
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .trim();

    console.log("AI response received:", improvedContent.substring(0, 100) + "...");

    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    console.error("Error details:", error.message, error.stack);
    
    // Provide a fallback improvement if AI fails
    const fallbackImprovement = `Enhanced ${type}: ${current} with improved metrics and action-oriented language.`;
    
    // Still throw the error for the client to handle, but with better messaging
    throw new Error(`Failed to improve content: ${error.message}. Using fallback: ${fallbackImprovement}`);
  }
}

export async function generatePDF(content) {
  let browser;
  
  try {
    // Configure Puppeteer for production with chromium
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // Production configuration
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // Development configuration
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    
    const page = await browser.newPage();
    
    // Enhanced content cleanup for markdown issues
    const cleanedContent = content
      // Remove markdown headers
      .replace(/^#+\s*(.*?)\s*$/gm, '<h1>$1</h1>')
      .replace(/^##\s*(.*?)\s*$/gm, '<h2>$1</h2>')
      .replace(/^###\s*(.*?)\s*$/gm, '<h3>$1</h3>')
      // Fix LinkedIn and email formatting
      .replace(/\[LinkedIn\]\s*\n\s*omchouhan227@gmail.com/g, '<p><a href="https://www.linkedin.com/in/om-singh-chouhan">LinkedIn</a> | omchouhan227@gmail.com</p>')
      .replace(/\(https:\/\/www\.linkedin\.com\/in\/ajeet-gupta-970478273\/\)/g, '')
      .replace(/@/g, 'at ')
      // Convert markdown lists to HTML
      .replace(/^\s*[-*+]\s+(.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Convert markdown bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Professional Resume @NextStep.io</title>
          <style>
            /* Professional Resume Styling */
            body {
              font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.5;
              color: #2d3748;
              max-width: 800px;
              margin: 0 auto;
              padding: 30px;
              background-color: #ffffff;
            }
            
            /* Header Section */
            .resume-header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #2c5282;
            }
            
            .resume-header h1 {
              font-size: 32px;
              font-weight: 700;
              color: #2c5282;
              margin: 0 0 8px 0;
              text-transform: uppercase;
              letter-spacing: 1.5px;
            }
            
            .resume-header .contact-info {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 20px;
              margin: 15px 0;
              font-size: 15px;
            }
            
            .resume-header .contact-info a {
              color: #3182ce;
              text-decoration: none;
              display: flex;
              align-items: center;
            }
            
            .resume-header .contact-info a:hover {
              text-decoration: underline;
            }
            
            /* Section Styling */
            .resume-section {
              margin-bottom: 25px;
            }
            
            .resume-section h2 {
              font-size: 20px;
              font-weight: 600;
              color: #2c5282;
              text-transform: uppercase;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 8px;
              margin: 0 0 20px 0;
            }
            
            /* Experience/Education Items */
            .experience-item, .education-item, .project-item {
              margin-bottom: 25px;
              position: relative;
            }
            
            .item-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 8px;
            }
            
            .item-title {
              font-weight: 600;
              font-size: 18px;
              color: #2d3748;
            }
            
            .item-organization {
              font-weight: 500;
              color: #4a5568;
              margin-bottom: 5px;
            }
            
            .item-date {
              font-style: italic;
              color: #718096;
              font-size: 15px;
              white-space: nowrap;
              margin-left: 15px;
            }
            
            .item-location {
              font-style: italic;
              color: #718096;
              font-size: 15px;
            }
            
            .item-description {
              margin: 0;
              font-size: 15px;
              line-height: 1.6;
            }
            
            .item-description ul {
              margin: 8px 0;
              padding-left: 20px;
            }
            
            .item-description li {
              margin-bottom: 6px;
            }
            
            /* Skills Section */
            .skills-container {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              margin: 15px 0;
              padding-left: 0;
              list-style: none;
            }
            
            .skill-pill {
              background-color: #edf2f7;
              padding: 6px 14px;
              border-radius: 16px;
              font-size: 14px;
              color: #2d3748;
              font-weight: 500;
            }
            
            /* List Styling */
            ul {
              padding-left: 20px;
              margin: 12px 0;
            }
            
            li {
              margin-bottom: 6px;
              font-size: 15px;
            }
            
            /* Link Styling */
            a {
              color: #3182ce;
              text-decoration: none;
            }
            
            a:hover {
              text-decoration: underline;
            }
            
            /* Markdown Content Styling */
            #content h1 {
              font-size: 24px;
              color: #2c5282;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 8px;
              margin: 30px 0 20px 0;
            }
            
            #content h2 {
              font-size: 20px;
              color: #2c5282;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 6px;
              margin: 25px 0 15px 0;
            }
            
            #content h3 {
              font-size: 18px;
              color: #4a5568;
              margin: 20px 0 10px 0;
            }
            
            #content p {
              margin: 0 0 15px 0;
              font-size: 15px;
              line-height: 1.6;
            }
            
            #content strong {
              color: #4a5568;
              font-weight: 600;
            }
            
            /* Two-column layout for contact info */
            .contact-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              margin: 15px 0;
            }
            
            .contact-item {
              display: flex;
              align-items: center;
            }
            
            /* Print optimization */
            @media print {
              body {
                padding: 0;
                font-size: 14px;
              }
              
              .resume-header {
                padding-bottom: 15px;
                margin-bottom: 20px;
              }
              
              .resume-section {
                margin-bottom: 20px;
              }
              
              a {
                color: #2d3748;
                text-decoration: none;
              }
              
              .item-date {
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
          <div id="content">${cleanedContent}</div>
          
          <script>
            // Enhance the markdown content with professional resume structure
            document.addEventListener('DOMContentLoaded', function() {
              const contentDiv = document.getElementById('content');
              
              // Convert any remaining markdown headers to proper HTML
              contentDiv.innerHTML = contentDiv.innerHTML
                .replace(/<h1>(.*?)<\/h1>/g, '<div class="resume-header"><h1>$1</h1></div>')
                .replace(/<h2>(.*?)<\/h2>/g, '<div class="resume-section"><h2>$1</h2>')
                .replace(/<h3>(.*?)<\/h3>/g, '<h3 class="item-title">$1</h3>');
              
              // Format experience items
              const paragraphs = contentDiv.querySelectorAll('p');
              paragraphs.forEach(p => {
                const text = p.textContent;
                
                // Format experience items
                if (text.includes('web devloper intern') || text.includes('b tech cse ai,ml') || text.includes('NextStep.io')) {
                  const parts = text.split(' @ ');
                  if (parts.length === 2) {
                    const [titlePart, rest] = parts;
                    const [orgPart, datePart] = rest.split(' Aug ') || rest.split(' Oct ') || rest.split(' Jun ');
                    
                    if (orgPart && datePart) {
                      p.innerHTML = \`
                        <div class="item-header">
                          <div>
                            <div class="item-title">\${titlePart.replace('@', 'at')}</div>
                            <div class="item-organization">\${orgPart}</div>
                          </div>
                          <div class="item-date">\${datePart}</div>
                        </div>
                      \`;
                      p.classList.add('experience-item');
                    }
                  }
                }
                
                // Format skills
                if (text.includes('react is next is node is and type script')) {
                  const skills = ['React', 'Next.js', 'Node.js', 'TypeScript'];
                  p.innerHTML = \`
                    <div class="skills-container">
                      \${skills.map(skill => \`<div class="skill-pill">\${skill}</div>\`).join('')}
                    </div>
                  \`;
                }
              });
              
              // Add missing section headers if needed
              if (!contentDiv.querySelector('h2')) {
                const summaryHeader = document.createElement('h2');
                summaryHeader.textContent = 'Professional Summary';
                contentDiv.prepend(summaryHeader);
                
                const skillsHeader = document.createElement('h2');
                skillsHeader.textContent = 'Skills';
                summaryHeader.insertAdjacentElement('afterend', skillsHeader);
                
                const experienceHeader = document.createElement('h2');
                experienceHeader.textContent = 'Work Experience';
                skillsHeader.insertAdjacentElement('afterend', experienceHeader);
                
                const educationHeader = document.createElement('h2');
                educationHeader.textContent = 'Education';
                experienceHeader.insertAdjacentElement('afterend', educationHeader);
                
                const projectsHeader = document.createElement('h2');
                projectsHeader.textContent = 'Projects';
                educationHeader.insertAdjacentElement('afterend', projectsHeader);
              }
            });
          </script>
        </body>
      </html>
    `;
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF with better margins
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm'
      },
      preferCSSPageSize: true
    });
    
    // FIX: Use Buffer.from() for proper base64 conversion
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
    
    return {
      success: true,
      pdfData: pdfBase64,
      filename: 'resume.pdf'
    };
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    // FIX: Return error object instead of throwing for better client handling
    return {
      success: false,
      error: 'Failed to generate PDF: ' + error.message
    };
  } finally {
    if (browser) {
      await browser.close().catch(console.error);
    }
  }
}