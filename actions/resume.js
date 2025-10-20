// actions/resume.js
'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Exported server action to save resumes
export async function saveResume(formData) {
  try {
    // Persist formData (DB / storage) as needed here
    console.log('Saving resume:', formData);

    // Revalidate the resume page so updated content shows up
    revalidatePath('/resume');

    return { success: true };
  } catch (error) {
    console.error('saveResume error:', error);
    return { success: false, error: error.message };
  }
}

// Exported AI improvement helper (keeps existing behavior)
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