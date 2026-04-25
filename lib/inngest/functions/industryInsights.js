import { db } from "@/lib/prisma";
import { inngest } from "../client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
  {
    id: "generate-industry-insights",
    triggers: [{ cron: "0 0 * * 0" }],
  },
  async ({ step }) => {
    const industries = await step.run("fetch-industries", async () => {
      return db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
        Analyze the ${industry} industry and return ONLY valid JSON:
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
      `;

      const aiResponse = await step.run(`generate-${industry}`, async () => {
        return model.generateContent(prompt);
      });

      const text =
        aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();

      let insights;

      try {
        insights = JSON.parse(cleaned);
      } catch (error) {
        console.error(`JSON parse failed for ${industry}`, cleaned);
        continue;
      }

      if (!insights || typeof insights !== "object") {
        console.warn(`Invalid insights format for ${industry}`);
        continue;
      }

      await step.run(`update-${industry}`, async () => {
        return db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);