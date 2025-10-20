// actions/resume.js
'use server';

import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function createResume(formData) {
  try {
    console.log('Creating resume:', formData);
    // Persist/create logic here (DB, API, etc.)
    await new Promise((resolve) => setTimeout(resolve, 500));
    revalidatePath('/resume');
    return {
      success: true,
      message: 'Resume created successfully',
      data: formData,
    };
  } catch (error) {
    console.error('Error creating resume:', error);
    return { success: false, error: error.message };
  }
}

export async function saveResume(formData) {
  try {
    console.log('Saving resume:', formData);
    // Persist/save logic here (DB, API, etc.)
    await new Promise((resolve) => setTimeout(resolve, 500));
    revalidatePath('/resume');
    return {
      success: true,
      message: 'Resume saved successfully',
      data: formData,
    };
  } catch (error) {
    console.error('Error saving resume:', error);
    return { success: false, error: error.message };
  }
}

export async function updateResume(id, formData) {
  try {
    console.log('Updating resume:', id, formData);
    // Update logic here
    await new Promise((resolve) => setTimeout(resolve, 500));
    revalidatePath(`/resume/${id}`);
    return {
      success: true,
      message: 'Resume updated successfully',
      data: formData,
    };
  } catch (error) {
    console.error('Error updating resume:', error);
    return { success: false, error: error.message };
  }
}

export async function getResume(id) {
  try {
    console.log('Getting resume:', id);
    // Fetch logic here
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true, data: null };
  } catch (error) {
    console.error('Error getting resume:', error);
    return { success: false, error: error.message };
  }
}

// Keep AI improvement helper used by client components
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