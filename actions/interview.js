"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize AI
const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Temporary storage (replace with Prisma later)
const quizStorage = new Map();

// User field mapping to quiz topics
const FIELD_TOPICS = {
  "Technology": [
    "Software Engineering", "Web Development", "Data Structures", 
    "Algorithms", "System Design", "Databases", "Networking"
  ],
  "Business": [
    "Business Strategy", "Marketing", "Finance", 
    "Management", "Sales", "Entrepreneurship"
  ],
  "Healthcare": [
    "Medical Knowledge", "Patient Care", "Healthcare Systems",
    "Medical Ethics", "Clinical Skills"
  ],
  "Education": [
    "Teaching Methods", "Curriculum Development", "Educational Psychology",
    "Classroom Management", "Assessment Strategies"
  ],
  "default": [
    "Problem Solving", "Communication", "Critical Thinking",
    "Teamwork", "Leadership", "Time Management"
  ]
};

// Question templates for different difficulty levels
const DIFFICULTY_LEVELS = {
  easy: "basic concepts and definitions",
  medium: "practical applications and scenarios", 
  hard: "complex problem-solving and advanced topics"
};

export async function generateQuiz(count = 10) {
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    // During build time, return fallback questions
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      console.log("🏗️ Build-time detection - returning fallback questions");
      return getEnhancedFallbackQuestions("Technology", count);
    }
    console.error("❌ Auth failed in generateQuiz:", error);
    throw new Error("Please sign in to generate a quiz");
  }

  if (!userId) {
    throw new Error("Please sign in to generate a quiz");
  }

  try {
    console.log("🎯 Generating dynamic quiz...");

    // 2. Get or simulate user profile data
    const userProfile = await getUserProfile(userId);
    console.log("✅ User profile:", userProfile);

    // 3. Generate dynamic questions based on user field
    if (!genAI) {
      console.log("🔄 AI not configured, using enhanced fallback questions");
      return getEnhancedFallbackQuestions(userProfile.field, count);
    }

    try {
      const questions = await generateAIDrivenQuestions(userProfile, count);
      console.log(`✅ AI generated ${questions.length} questions for ${userProfile.field}`);
      return questions;
    } catch (aiError) {
      console.warn("AI failed, using enhanced fallback:", aiError.message);
      return getEnhancedFallbackQuestions(userProfile.field, count);
    }

  } catch (error) {
    console.error("Quiz generation error:", error);
    throw new Error("Failed to generate quiz. Please try again.");
  }
}

async function getUserProfile(userId) {
  // TODO: Replace with actual Prisma call
  // For now, simulate different user profiles based on userId hash
  const fields = ["Technology", "Business", "Healthcare", "Education", "Marketing"];
  const experienceLevels = ["entry", "mid", "senior"];
  
  // Create deterministic but varied profile based on userId
  const fieldIndex = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fields.length;
  const expIndex = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % experienceLevels.length;
  
  return {
    field: fields[fieldIndex],
    experienceLevel: experienceLevels[expIndex],
    skills: getSkillsForField(fields[fieldIndex]),
    interests: getInterestsForField(fields[fieldIndex])
  };
}

function getSkillsForField(field) {
  const skillsMap = {
    "Technology": ["Programming", "Problem Solving", "System Design", "Debugging", "Agile Methodology"],
    "Business": ["Strategic Planning", "Financial Analysis", "Market Research", "Negotiation", "Leadership"],
    "Healthcare": ["Patient Care", "Medical Knowledge", "Communication", "Empathy", "Attention to Detail"],
    "Education": ["Curriculum Development", "Classroom Management", "Student Assessment", "Communication", "Adaptability"],
    "Marketing": ["Digital Marketing", "Content Creation", "Data Analysis", "SEO", "Social Media Strategy"]
  };
  return skillsMap[field] || skillsMap["Technology"];
}

function getInterestsForField(field) {
  const interestsMap = {
    "Technology": ["AI/ML", "Web Development", "Mobile Apps", "Cloud Computing", "Cybersecurity"],
    "Business": ["Startups", "Investment", "Market Analysis", "Business Development", "Strategy"],
    "Healthcare": ["Medical Research", "Patient Care", "Healthcare Technology", "Public Health", "Medical Innovation"],
    "Education": ["EdTech", "Curriculum Design", "Student Engagement", "Educational Research", "Teaching Methods"],
    "Marketing": ["Digital Strategy", "Brand Management", "Consumer Behavior", "Content Marketing", "Analytics"]
  };
  return interestsMap[field] || interestsMap["Technology"];
}

async function generateAIDrivenQuestions(userProfile, count) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
Generate ${count} unique interview questions for a ${userProfile.experienceLevel}-level professional in the ${userProfile.field} field.
The candidate has skills in: ${userProfile.skills.join(', ')}
Their interests include: ${userProfile.interests.join(', ')}

Requirements:
- Create a mix of ${DIFFICULTY_LEVELS.easy}, ${DIFFICULTY_LEVELS.medium}, and ${DIFFICULTY_LEVELS.hard}
- Include scenario-based questions and technical concepts
- Each question must have 4 plausible options, one correct answer, and a clear explanation
- Focus on practical, real-world applications

Return ONLY valid JSON in this exact format:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string",
      "difficulty": "easy|medium|hard"
    }
  ]
}

Ensure the questions are relevant to ${userProfile.field} and test both knowledge and practical application.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse and validate response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const parsed = JSON.parse(jsonMatch[0]);
    if (parsed.questions && Array.isArray(parsed.questions)) {
      // Validate each question has required fields
      const validQuestions = parsed.questions.filter(q => 
        q.question && 
        q.options && 
        q.options.length === 4 && 
        q.correctAnswer && 
        q.explanation
      );
      
      if (validQuestions.length >= count * 0.8) { // Accept if we get at least 80% valid questions
        return validQuestions.slice(0, count);
      }
    }
  }
  
  throw new Error("AI response format invalid");
}

function getEnhancedFallbackQuestions(field, count) {
  const fieldQuestions = {
    "Technology": [
      {
        question: "In agile development, what is the main purpose of a sprint retrospective?",
        options: [
          "To plan the next sprint's tasks",
          "To review and improve the team's process",
          "To demonstrate completed work to stakeholders",
          "To estimate story points for backlog items"
        ],
        correctAnswer: "To review and improve the team's process",
        explanation: "The sprint retrospective is a meeting where the team reflects on the past sprint and identifies improvements for future sprints.",
        difficulty: "medium"
      },
      {
        question: "What is the time complexity of binary search on a sorted array?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)",
        explanation: "Binary search divides the search space in half each time, resulting in logarithmic time complexity.",
        difficulty: "medium"
      },
      {
        question: "Which HTTP status code indicates a successful POST request that created a new resource?",
        options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
        correctAnswer: "201 Created",
        explanation: "HTTP 201 Created indicates successful resource creation, typically in response to POST requests.",
        difficulty: "easy"
      },
      {
        question: "What is the primary advantage of using React hooks over class components?",
        options: [
          "Better performance",
          "Simpler state management and lifecycle handling",
          "Automatic CSS generation",
          "Built-in routing capabilities"
        ],
        correctAnswer: "Simpler state management and lifecycle handling",
        explanation: "Hooks provide a more direct API to React concepts without introducing new syntax or concepts.",
        difficulty: "medium"
      },
      {
        question: "In database design, what is the purpose of normalization?",
        options: [
          "To make queries run faster",
          "To reduce data redundancy and improve integrity",
          "To increase storage efficiency only",
          "To allow for more flexible data types"
        ],
        correctAnswer: "To reduce data redundancy and improve integrity",
        explanation: "Normalization organizes data to minimize redundancy and dependency through table relationships.",
        difficulty: "hard"
      }
    ],
    "Business": [
      {
        question: "What is the primary goal of a SWOT analysis in business strategy?",
        options: [
          "To analyze financial statements",
          "To identify internal strengths/weaknesses and external opportunities/threats",
          "To evaluate employee performance",
          "To calculate market share"
        ],
        correctAnswer: "To identify internal strengths/weaknesses and external opportunities/threats",
        explanation: "SWOT analysis helps organizations develop a full awareness of all factors involved in business decisions.",
        difficulty: "medium"
      },
      {
        question: "In marketing, what does 'conversion rate' typically measure?",
        options: [
          "The speed of website loading",
          "The percentage of visitors who complete a desired action",
          "The rate of customer retention",
          "The cost of acquiring new customers"
        ],
        correctAnswer: "The percentage of visitors who complete a desired action",
        explanation: "Conversion rate measures the percentage of users who take a desired action, such as making a purchase or signing up.",
        difficulty: "easy"
      }
    ],
    "Healthcare": [
      {
        question: "What is the primary purpose of HIPAA in healthcare?",
        options: [
          "To regulate medical device manufacturing",
          "To protect patient health information privacy",
          "To standardize medical billing codes",
          "To certify healthcare professionals"
        ],
        correctAnswer: "To protect patient health information privacy",
        explanation: "HIPAA establishes national standards to protect sensitive patient health information.",
        difficulty: "medium"
      }
    ],
    "Education": [
      {
        question: "What is the main principle behind differentiated instruction?",
        options: [
          "Teaching the same content to all students",
          "Tailoring instruction to meet individual needs",
          "Using only standardized tests for assessment",
          "Focusing exclusively on gifted students"
        ],
        correctAnswer: "Tailoring instruction to meet individual needs",
        explanation: "Differentiated instruction involves adapting teaching methods to accommodate different learning styles and abilities.",
        difficulty: "medium"
      }
    ]
  };

  // Get questions for the specific field or default to Technology
  const fieldSpecificQuestions = fieldQuestions[field] || fieldQuestions["Technology"];
  
  // If we need more questions than available, duplicate and modify some
  if (fieldSpecificQuestions.length < count) {
    const additionalQuestions = generateDynamicQuestions(field, count - fieldSpecificQuestions.length);
    return [...fieldSpecificQuestions, ...additionalQuestions].slice(0, count);
  }
  
  return fieldSpecificQuestions.slice(0, count);
}

function generateDynamicQuestions(field, count) {
  // Generate additional questions dynamically based on field
  const templates = {
    "Technology": [
      {
        template: "What is the main advantage of using {technology} in {context}?",
        technologies: ["microservices", "containerization", "cloud computing", "CI/CD pipelines"],
        contexts: ["modern web applications", "enterprise systems", "scalable architectures", "distributed systems"]
      }
    ],
    "Business": [
      {
        template: "How does {concept} impact {aspect} in business?",
        concepts: ["digital transformation", "market disruption", "customer centricity", "data-driven decision making"],
        aspects: ["competitive advantage", "operational efficiency", "customer satisfaction", "revenue growth"]
      }
    ]
  };

  const fieldTemplates = templates[field] || templates["Technology"];
  const questions = [];

  for (let i = 0; i < count; i++) {
    const template = fieldTemplates[i % fieldTemplates.length];
    const tech = template.technologies[i % template.technologies.length];
    const context = template.contexts[i % template.contexts.length];
    
    const question = template.template
      .replace("{technology}", tech)
      .replace("{context}", context);

    questions.push({
      question: question,
      options: [
        "Improves scalability and maintainability",
        "Reduces development costs significantly",
        "Eliminates the need for testing",
        "Automatically fixes security vulnerabilities"
      ],
      correctAnswer: "Improves scalability and maintainability",
      explanation: `This approach enhances system architecture by providing better separation of concerns and independent deployment capabilities.`,
      difficulty: i % 3 === 0 ? "easy" : i % 3 === 1 ? "medium" : "hard"
    });
  }

  return questions;
}

export async function saveQuizResult(quizData) {
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    console.error("❌ Auth failed in saveQuizResult:", error);
    throw new Error("Please sign in to save results");
  }

  if (!userId) {
    throw new Error("Please sign in to save results");
  }

  try {
    console.log("💾 Saving quiz results...");

    // 2. Validate data
    if (!quizData || !quizData.questions || !quizData.answers) {
      throw new Error("Invalid quiz data");
    }

    const { questions, answers, score, timeSpent, totalQuestions, correctAnswers } = quizData;

    // 3. Calculate results if not provided
    const calculatedCorrectAnswers = questions.filter((q, index) => 
      q.correctAnswer === answers[index]
    ).length;
    
    const finalCorrectAnswers = correctAnswers || calculatedCorrectAnswers;
    const finalTotalQuestions = totalQuestions || questions.length;
    const finalScore = score || Math.round((finalCorrectAnswers / finalTotalQuestions) * 100);

    // 4. Generate improvement tip based on wrong answers
    let improvementTip = await generateImprovementTip(questions, answers, userId);

    // 5. Store results
    const assessment = {
      id: `quiz-${userId}-${Date.now()}`,
      userId: userId,
      quizScore: finalScore,
      correctAnswers: finalCorrectAnswers,
      totalQuestions: finalTotalQuestions,
      questions: {
        questions: questions.map((q, index) => ({
          ...q,
          userAnswer: answers[index] || "Not answered",
          isCorrect: q.correctAnswer === answers[index]
        })),
        stats: {
          correctAnswers: finalCorrectAnswers,
          totalQuestions: finalTotalQuestions
        }
      },
      category: "Technical",
      improvementTip: improvementTip,
      timeSpent: timeSpent || 0,
      createdAt: new Date().toISOString()
    };

    // Store in memory
    quizStorage.set(assessment.id, assessment);
    console.log("✅ Results saved with ID:", assessment.id);

    return assessment;

  } catch (error) {
    console.error("Save error:", error);
    throw new Error("Failed to save results: " + error.message);
  }
}

async function generateImprovementTip(questions, answers, userId) {
  const wrongAnswers = questions
    .map((q, index) => ({ question: q, userAnswer: answers[index] }))
    .filter(item => item.question.correctAnswer !== item.userAnswer);

  if (wrongAnswers.length === 0) {
    return "Excellent performance! Continue challenging yourself with advanced topics.";
  }

  // Analyze wrong answers to find patterns
  const difficultTopics = [...new Set(wrongAnswers.map(item => 
    item.question.difficulty || "unknown"
  ))];
  
  const mostCommonDifficulty = difficultTopics.sort((a, b) => 
    difficultTopics.filter(d => d === b).length - difficultTopics.filter(d => d === a).length
  )[0];

  const defaultTips = {
    "hard": "Focus on mastering complex problem-solving techniques and advanced concepts.",
    "medium": "Practice applying theoretical knowledge to practical scenarios and case studies.",
    "easy": "Review fundamental concepts and ensure strong understanding of basics.",
    "unknown": "Continue practicing across different difficulty levels to identify areas for improvement."
  };

  let improvementTip = defaultTips[mostCommonDifficulty] || defaultTips.unknown;

  // Use AI for more personalized tips if available
  if (genAI && wrongAnswers.length > 0) {
    try {
      const wrongTopics = wrongAnswers
        .slice(0, 3)
        .map(item => item.question.question.split('?')[0])
        .join(', ');

      const prompt = `User struggled with these topics: ${wrongTopics}. 
      The questions were ${mostCommonDifficulty} difficulty. 
      Provide one concise, actionable improvement tip (max 15 words).`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      improvementTip = response.text().trim();
    } catch (tipError) {
      console.warn("AI tip generation failed, using default");
    }
  }

  return improvementTip;
}

export async function getAssessments() {
  let userId;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    // During build time, return empty array
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      console.log("🏗️ Build-time detection - returning empty assessments");
      return [];
    }
    console.error("❌ Auth failed in getAssessments:", error);
    return [];
  }

  if (!userId) {
    return [];
  }

  try {
    // Return temporary assessments for this user
    const userAssessments = Array.from(quizStorage.values())
      .filter(assessment => assessment.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10); // Increased to show more history

    return userAssessments;
  } catch (error) {
    console.error("Get assessments error:", error);
    return [];
  }
}