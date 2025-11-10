"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cache the model initialization
let genAI;
let model;
let modelInitializationPromise = null;

async function initializeModel() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try the most common models in order of preference
    const modelCandidates = [
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro-latest", 
      "gemini-pro",
      "gemini-1.0-pro"
    ];

    for (const modelName of modelCandidates) {
      try {
        const testModel = genAI.getGenerativeModel({ model: modelName });
        const result = await testModel.generateContent("Test connection");
        
        if (result?.response?.text()) {
          console.log(`✅ Using model: ${modelName}`);
          return testModel;
        }
      } catch (error) {
        console.log(`❌ Model ${modelName} failed: ${error.message}`);
        continue;
      }
    }
    
    throw new Error("No working Gemini model found");
  } catch (error) {
    console.error("Model initialization failed:", error);
    return null;
  }
}

function getModel() {
  if (!modelInitializationPromise) {
    modelInitializationPromise = initializeModel().then(initializedModel => {
      model = initializedModel;
      return model;
    });
  }
  return modelInitializationPromise;
}

// Enhanced prompt template
const COVER_LETTER_PROMPT = `
Write a professional, tailored cover letter for a {jobTitle} position at {companyName}.

**Candidate Profile:**
- Industry: {industry}
- Experience: {experience}
- Key Skills: {skills}
- Professional Background: {bio}
- Additional Qualifications: {resumeContent}

**Job Requirements:**
{jobDescription}

**Instructions:**
1. Use formal business letter format with proper salutation and closing
2. Highlight specific skills and experiences that match the job requirements
3. Show genuine enthusiasm for the company and role
4. Keep length between 300-400 words
5. Include measurable achievements where possible
6. Use persuasive, professional language
7. Format with clear paragraphs and professional structure
8. Tailor to the company's values and the specific role

Generate a compelling, personalized cover letter that stands out to hiring managers.
`;

export async function generateCoverLetter(data) {
  try {
    console.log("🔄 Starting cover letter generation...");

    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized - Please sign in");
    }

    // Validate input data
    if (!data?.jobTitle?.trim() || !data?.companyName?.trim() || !data?.jobDescription?.trim()) {
      throw new Error("Missing required fields: jobTitle, companyName, and jobDescription are required");
    }

    // Get user data
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        id: true,
        industry: true,
        experience: true,
        skills: true,
        bio: true,
      },
    });

    if (!user) {
      throw new Error("User profile not found - Please complete your profile");
    }

    // Get or initialize model
    const currentModel = await getModel();
    
    if (!currentModel) {
      // Use fallback if AI is unavailable
      console.log("🔄 Using fallback cover letter generation");
      return await generateFallbackCoverLetter(data, user);
    }

    // Build prompt with template
    const prompt = COVER_LETTER_PROMPT
      .replace('{jobTitle}', data.jobTitle.trim())
      .replace('{companyName}', data.companyName.trim())
      .replace('{industry}', user.industry || "Not specified")
      .replace('{experience}', user.experience || "Not specified")
      .replace('{skills}', user.skills?.join(", ") || "Not specified")
      .replace('{bio}', user.bio || "Not specified")
      .replace('{resumeContent}', data.resumeContent || "Not provided")
      .replace('{jobDescription}', data.jobDescription.trim());

    console.log("🤖 Calling Gemini AI...");

    // Generate content with timeout
    const result = await Promise.race([
      currentModel.generateContent(prompt),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("AI request timeout")), 45000)
      )
    ]);
    
    if (!result?.response) {
      throw new Error("No response from AI service");
    }
    
    const content = result.response.text().trim();

    if (!content) {
      throw new Error("AI generated empty content");
    }

    // Save to database
    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    console.log("✅ Cover letter generated successfully");
    return coverLetter;

  } catch (error) {
    console.error("❌ Error in generateCoverLetter:", error);
    
    // Enhanced error handling with fallback
    if (error.message.includes("Unauthorized")) {
      throw new Error("Please sign in to generate cover letters");
    } else if (error.message.includes("User profile not found")) {
      throw new Error("Please complete your profile before generating cover letters");
    } else if (error.message.includes("Missing required fields")) {
      throw new Error("Please fill in all required fields: Job Title, Company Name, and Job Description");
    } else if (error.message.includes("rate limit") || error.message.includes("quota")) {
      throw new Error("AI service rate limit exceeded. Please try again in a few minutes.");
    } else if (error.message.includes("timeout")) {
      throw new Error("AI service took too long to respond. Please try again.");
    } else {
      // For AI-related errors, try fallback
      try {
        const { userId } = await auth();
        const user = await db.user.findUnique({
          where: { clerkUserId: userId },
          select: { id: true, industry: true, experience: true, skills: true, bio: true },
        });
        
        if (user) {
          console.log("🔄 Falling back to template generation");
          return await generateFallbackCoverLetter(data, user);
        }
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
      }
      
      throw new Error("AI service is temporarily unavailable. Please try again later.");
    }
  }
}

async function generateFallbackCoverLetter(data, user) {
  const fallbackContent = `
# Cover Letter Application

**Position:** ${data.jobTitle}  
**Company:** ${data.companyName}  
**Date:** ${new Date().toLocaleDateString()}

Dear Hiring Manager,

I am writing to express my strong interest in the ${data.jobTitle} position at ${data.companyName}. With my background in ${user.industry || "this field"} and ${user.experience || "relevant"} years of professional experience, I am confident in my ability to make significant contributions to your team.

${user.skills?.length ? `My expertise in ${user.skills.slice(0, 4).join(", ")} aligns closely with the requirements for this role.` : 'My professional background has equipped me with the skills necessary to excel in this position.'}

${data.resumeContent ? `As highlighted in my resume, I bring: ${data.resumeContent.substring(0, 150)}...` : 'I have a proven track record of delivering results and am excited about the opportunity to apply my experience to your organization.'}

I am particularly impressed by ${data.companyName}'s reputation and am enthusiastic about the possibility of contributing to your team's success. I am eager to bring my dedication and skills to this role and help achieve your company's objectives.

Thank you for considering my application. I look forward to the opportunity to discuss how my experience and qualifications can benefit your organization.

Sincerely,  
[Your Name]  
[Your Contact Information]
  `.trim();

  const coverLetter = await db.coverLetter.create({
    data: {
      content: fallbackContent,
      jobDescription: data.jobDescription,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      status: "completed",
      userId: user.id,
    },
  });

  return coverLetter;
}

export async function getCoverLetters() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        jobTitle: true,
        companyName: true,
        jobDescription: true,
        createdAt: true,
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error in getCoverLetters:", error);
    throw new Error("Failed to fetch cover letters");
  }
}

export async function getCoverLetter(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) throw new Error("User not found");

    return await db.coverLetter.findUnique({
      where: { id, userId: user.id },
      select: {
        id: true,
        content: true,
        jobTitle: true,
        companyName: true,
        jobDescription: true,
        createdAt: true,
        status: true,
      },
    });
  } catch (error) {
    console.error("Error in getCoverLetter:", error);
    throw new Error("Failed to fetch cover letter");
  }
}

export async function deleteCoverLetter(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) throw new Error("User not found");

    await db.coverLetter.delete({
      where: { id, userId: user.id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error in deleteCoverLetter:", error);
    throw new Error("Failed to delete cover letter");
  }
}