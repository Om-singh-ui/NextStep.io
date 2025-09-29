"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with error handling
let genAI;
let model;

try {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Use a supported model - try these alternatives
  const modelName = 
    process.env.GEMINI_MODEL || 
    "gemini-1.5-flash-latest" || 
    "gemini-1.5-pro-latest" || 
    "gemini-pro";
  
  model = genAI.getGenerativeModel({ 
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  });
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
}

export async function generateQuiz() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
        skills: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.industry) {
      throw new Error("User industry is required");
    }

    const prompt = `
      You are a technical interview expert. Generate exactly 10 multiple choice technical interview questions for a ${user.industry} professional${
      user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
      
      Requirements:
      - Each question must be multiple choice with exactly 4 options (A, B, C, D)
      - Questions should be practical and relevant to real-world scenarios
      - Include one correct answer and three plausible distractors
      - Provide a brief explanation for the correct answer
      - Focus on technical skills, problem-solving, and best practices
      
      Return ONLY valid JSON in this exact format, no other text:
      {
        "questions": [
          {
            "question": "What is...?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option B",
            "explanation": "Brief explanation why this is correct"
          }
        ]
      }
    `;

    if (!model) {
      // Fallback to default questions if AI fails
      console.warn("AI model not available, using fallback questions");
      return getFallbackQuestions(user.industry, user.skills);
    }

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response from AI model");
    }

    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    
    let quiz;
    try {
      quiz = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse AI response. Raw text:", cleanedText);
      throw new Error("AI returned invalid format. Please try again.");
    }

    // Validate quiz structure
    if (!quiz.questions || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      throw new Error("No questions generated");
    }

    // Validate each question
    quiz.questions.forEach((q, index) => {
      if (!q.question || typeof q.question !== 'string') {
        throw new Error(`Question ${index + 1} missing question text`);
      }
      if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Question ${index + 1} must have exactly 4 options`);
      }
      if (!q.correctAnswer || typeof q.correctAnswer !== 'string') {
        throw new Error(`Question ${index + 1} missing correct answer`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        throw new Error(`Question ${index + 1} correct answer must match one of the options`);
      }
      if (!q.explanation || typeof q.explanation !== 'string') {
        throw new Error(`Question ${index + 1} missing explanation`);
      }
    });

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    
    // Provide fallback questions on AI failure
    if (error.message.includes("404") || error.message.includes("model") || error.message.includes("AI")) {
      console.log("Using fallback questions due to AI error");
      const { userId } = await auth();
      const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        select: { industry: true, skills: true }
      });
      return getFallbackQuestions(user?.industry || "Technology", user?.skills || []);
    }
    
    if (error.message.includes("Unauthorized")) {
      throw new Error("Please sign in to generate quiz questions");
    } else if (error.message.includes("User not found")) {
      throw new Error("User profile not found. Please complete your profile.");
    } else if (error.message.includes("industry is required")) {
      throw new Error("Please set your industry in your profile to generate questions");
    } else {
      throw new Error("Failed to generate quiz questions. Please try again.");
    }
  }
}

// Fallback questions when AI fails
function getFallbackQuestions(industry, skills) {
  const baseQuestions = [
    {
      question: `In ${industry}, what is the most important factor for successful project delivery?`,
      options: [
        "Having the latest technology stack",
        "Clear requirements and communication",
        "Large development team",
        "Extensive documentation"
      ],
      correctAnswer: "Clear requirements and communication",
      explanation: "Clear requirements and effective communication are crucial for project success as they ensure everyone understands goals and reduces rework."
    },
    {
      question: "What does API stand for in software development?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Instruction",
        "Application Process Integration",
        "Automated Programming Interface"
      ],
      correctAnswer: "Application Programming Interface",
      explanation: "API stands for Application Programming Interface, which defines how different software components should interact."
    },
    {
      question: "Which principle suggests that a class should have only one reason to change?",
      options: [
        "Don't Repeat Yourself (DRY)",
        "Single Responsibility Principle",
        "Open/Closed Principle",
        "Interface Segregation Principle"
      ],
      correctAnswer: "Single Responsibility Principle",
      explanation: "The Single Responsibility Principle states that a class should have only one reason to change, making code more maintainable."
    },
    {
      question: "What is the purpose of version control systems like Git?",
      options: [
        "To automatically fix code bugs",
        "To track changes and collaborate on code",
        "To compile code faster",
        "To design user interfaces"
      ],
      correctAnswer: "To track changes and collaborate on code",
      explanation: "Version control systems help track changes, enable collaboration, and maintain history of code modifications."
    },
    {
      question: "In agile methodology, what is a 'sprint'?",
      options: [
        "A coding competition",
        "A short, time-boxed period for work",
        "A bug fixing session",
        "A team meeting"
      ],
      correctAnswer: "A short, time-boxed period for work",
      explanation: "A sprint is a short, time-boxed period (usually 1-4 weeks) where a team works to complete specific tasks in agile development."
    }
  ];

  // Add skill-specific questions if available
  if (skills && skills.length > 0) {
    skills.forEach(skill => {
      baseQuestions.push({
        question: `What is a key consideration when working with ${skill}?`,
        options: [
          "Always use the newest version",
          "Focus on performance optimization first",
          "Understand security implications",
          "Avoid using third-party libraries"
        ],
        correctAnswer: "Understand security implications",
        explanation: `When working with ${skill}, understanding security implications is crucial to prevent vulnerabilities and protect data.`
      });
    });
  }

  // Ensure we return exactly 10 questions
  while (baseQuestions.length < 10) {
    baseQuestions.push({
      question: `What is an important soft skill for ${industry} professionals?`,
      options: [
        "Problem-solving ability",
        "Memorizing code syntax",
        "Working in isolation",
        "Avoiding documentation"
      ],
      correctAnswer: "Problem-solving ability",
      explanation: "Problem-solving ability is crucial for troubleshooting issues and developing effective solutions in any technical role."
    });
  }

  return baseQuestions.slice(0, 10);
}

export async function saveQuizResult(questions, answers, score) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid questions data");
    }
    
    if (!answers || !Array.isArray(answers) || answers.length !== questions.length) {
      throw new Error("Invalid answers data");
    }
    
    if (typeof score !== "number" || score < 0 || score > questions.length) {
      throw new Error("Invalid score");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const questionResults = questions.map((q, index) => {
      if (!q.question || !q.correctAnswer) {
        throw new Error(`Invalid question data at index ${index}`);
      }
      
      return {
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index] || "No answer provided",
        isCorrect: q.correctAnswer === answers[index],
        explanation: q.explanation || "No explanation available",
      };
    });

    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
    let improvementTip = null;

    if (wrongAnswers.length > 0) {
      // Simple improvement tip without AI to avoid dependencies
      improvementTip = `Focus on reviewing ${wrongAnswers.length} areas where you had difficulties. Practice these concepts to improve your technical interview performance.`;
    }

    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        totalQuestions: questions.length,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result. Please try again.");
  }
}

export async function getAssessments() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}
