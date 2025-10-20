// actions/resume.js
'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function improveWithAI({ current, type }) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Improve the following ${type} description for a professional resume. 
      Make it more impactful, professional, and achievement-oriented.
      Keep it concise and use bullet points if appropriate.
      Return only the improved text without any additional explanations.

      Current ${type} description:
      "${current}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedText = response.text().trim();

    return improvedText;
  } catch (error) {
    console.error('AI improvement error:', error);
    throw new Error('Failed to improve description with AI');
  }
}