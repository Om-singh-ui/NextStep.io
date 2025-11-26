// nextstep.io/lib/utils/env-validation.js
export function validateAIEnvironment() {
  const errors = []
  
  if (!process.env.OPENAI_API_KEY) {
    errors.push('OPENAI_API_KEY is not set in environment variables')
  }
  
  if (!process.env.GEMINI_API_KEY) {
    errors.push('GEMINI_API_KEY is not set in environment variables')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    openaiConfigured: !!process.env.OPENAI_API_KEY,
    geminiConfigured: !!process.env.GEMINI_API_KEY
  }
}

export function getAIConfig() {
  return {
    openai: {
      configured: !!process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'
    },
    gemini: {
      configured: !!process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || 'gemini-1.5-pro'
    },
    limits: {
      maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 4000,
      temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.3,
      maxRetries: parseInt(process.env.AI_MAX_RETRIES) || 3
    }
  }
}