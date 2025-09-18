// app/(main)/career-paths/_actions/career-path-actions.js
'use server';

import { currentUser } from '@clerk/nextjs';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getCareerPathData(userId) {
  // In a real implementation, you would fetch this from your database
  // For now, we'll return mock data
  return {
    currentRole: 'Software Engineer',
    targetRole: 'Senior Software Engineer',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git'],
    careerPath: null
  };
}

export async function updateUserSkills(userId, skills) {
  // In a real implementation, you would save this to your database
  console.log(`Updating skills for user ${userId}:`, skills);
  return { success: true };
}

export async function getAICareerSuggestions(currentRole, userSkills) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Based on a current role of ${currentRole} and skills including ${userSkills.join(', ')}, 
      suggest 3 alternative career paths this person could consider. 
      For each suggestion, provide a brief reason why it would be a good fit.
      Format your response as a JSON array of objects with "role" and "reason" properties.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse the JSON response
    try {
      // Extract JSON from the response (Gemini might add some text around the JSON)
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback to default suggestions
      return getDefaultSuggestions(currentRole);
    }
  } catch (error) {
    console.error('Error getting AI career suggestions:', error);
    return getDefaultSuggestions(currentRole);
  }
}

export async function generateAIRoadmap(currentRole, targetRole, userSkills) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Create a detailed career roadmap for transitioning from ${currentRole} to ${targetRole}.
      The person has these skills: ${userSkills.join(', ')}.
      
      Provide a JSON response with this structure:
      {
        "steps": [
          {
            "title": "Step title",
            "description": "Step description",
            "duration": "Estimated duration",
            "dependencies": ["Previous step titles if any"],
            "priority": "High/Medium/Low"
          }
        ],
        "skillsToLearn": ["Skill 1", "Skill 2", ...],
        "milestones": ["Milestone 1", "Milestone 2", ...],
        "timeline": "Overall timeline estimate",
        "estimatedSuccessRate": "Success probability percentage"
      }
      
      Make the roadmap personalized based on the current skills and realistic for this career transition.
      Include at least 5 steps with clear dependencies.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse the JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing AI roadmap response:', parseError);
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error generating AI roadmap:', error);
    throw new Error('AI service temporarily unavailable');
  }
}

function getDefaultSuggestions(currentRole) {
  // Default suggestions based on current role
  const suggestionsMap = {
    'Software Engineer': [
      { role: 'Product Manager', reason: 'Your technical skills would be valuable in product management' },
      { role: 'DevOps Engineer', reason: 'Your development experience could transition well to DevOps' },
      { role: 'Solutions Architect', reason: 'Your broad skill set aligns with solutions architecture' },
    ],
    'Data Analyst': [
      { role: 'Data Scientist', reason: 'Your analytical skills provide a strong foundation for data science' },
      { role: 'Business Intelligence Analyst', reason: 'You could specialize in BI tools and dashboard creation' },
      { role: 'Product Analyst', reason: 'Your skills would be valuable for product-focused data analysis' },
    ],
    'UX Designer': [
      { role: 'Product Designer', reason: 'Your UX skills could expand to encompass broader product design' },
      { role: 'UX Researcher', reason: 'Your design background provides context for user research' },
      { role: 'Product Manager', reason: 'Your user-centered approach would benefit product management' },
    ],
  };
  
  return suggestionsMap[currentRole] || [
    { role: 'Product Manager', reason: 'Your skills could transfer well to product management' },
    { role: 'Technical Writer', reason: 'Your domain knowledge could be valuable for documentation' },
    { role: 'Solutions Architect', reason: 'Your experience could be applied to solution design' },
  ];
}