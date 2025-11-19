"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIInsights = async (industry) => {
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("❌ Error in generateAIInsights:", error);
    // Return fallback data if AI fails
    return {
      salaryRanges: [],
      growthRate: 0,
      demandLevel: "Medium",
      topSkills: [],
      marketOutlook: "Neutral",
      keyTrends: [],
      recommendedSkills: []
    };
  }
};

export async function getIndustryInsights() {
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    // During build time, return empty insights
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      console.log("🏗️ Build-time detection - returning empty insights");
      return null;
    }
    console.error("❌ Auth failed in getIndustryInsights:", error);
    return null;
  }

  if (!userId) {
    console.log("❌ No user ID in getIndustryInsights");
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        industryInsight: true,
      },
    });

    if (!user) {
      console.log("❌ User not found in getIndustryInsights");
      return null;
    }

    // If no insights exist and user has industry, generate them
    if (!user.industryInsight && user.industry) {
      console.log("🔄 Generating new AI insights for industry:", user.industry);
      const insights = await generateAIInsights(user.industry);

      const industryInsight = await db.industryInsight.create({
        data: {
          industry: user.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return industryInsight;
    }

    return user.industryInsight;
  } catch (error) {
    console.error("❌ Error in getIndustryInsights:", error);
    return null;
  }
}

// Add a static version for public/fallback insights
export async function getPublicIndustryInsights(industry) {
  try {
    // Get generic insights without user authentication
    const insights = await db.industryInsight.findFirst({
      where: { industry },
      orderBy: { updatedAt: 'desc' }
    });

    if (insights) {
      return insights;
    }

    // Return basic fallback data
    return {
      industry: industry,
      salaryRanges: [],
      growthRate: 5,
      demandLevel: "Medium",
      topSkills: ["Communication", "Problem Solving", "Teamwork"],
      marketOutlook: "Neutral",
      keyTrends: ["Digital Transformation", "Remote Work"],
      recommendedSkills: ["AI Literacy", "Data Analysis"],
      nextUpdate: new Date()
    };
  } catch (error) {
    console.error("❌ Error in getPublicIndustryInsights:", error);
    return null;
  }
}