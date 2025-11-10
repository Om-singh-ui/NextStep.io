import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    console.log("Testing Gemini API with key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to list available models first
    try {
      const models = await genAI.listModels();
      console.log("Available models:", models.data?.map(m => m.name));
    } catch (listError) {
      console.log("Cannot list models:", listError.message);
    }

    // Try different model names
    const modelNames = [
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro-latest",
      "gemini-pro",
      "gemini-1.0-pro"
    ];

    let workingModel = null;
    let testResult = null;

    for (const modelName of modelNames) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say 'Hello World' in a short response");
        const response = await result.response;
        const text = response.text();
        
        workingModel = modelName;
        testResult = text;
        console.log(`Model ${modelName} works!`);
        break;
      } catch (modelError) {
        console.log(`Model ${modelName} failed:`, modelError.message);
      }
    }

    if (workingModel) {
      return NextResponse.json({ 
        success: true, 
        message: testResult,
        model: workingModel,
        status: "Working correctly"
      });
    } else {
      return NextResponse.json(
        { 
          error: "No working Gemini model found",
          available_models: "Check Google AI Studio for available models",
          suggestion: "Try gemini-1.5-flash-latest or gemini-1.5-pro-latest"
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Gemini test error:", error);
    return NextResponse.json(
      { 
        error: error.message,
        details: "Check your API key and ensure it's valid",
        suggestion: "Visit https://aistudio.google.com to check your API key status"
      },
      { status: 500 }
    );
  }
}