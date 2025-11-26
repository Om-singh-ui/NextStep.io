// nextstep.io/lib/ai/index.js
import { aiClient } from './client'
import { mockAiClient } from './mock-client'

// Use mock client if no API keys are configured
const hasApiKeys = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY
export const client = hasApiKeys ? aiClient : mockAiClient

// Export status for debugging
export const aiStatus = {
  openai: !!process.env.OPENAI_API_KEY,
  gemini: !!process.env.GEMINI_API_KEY,
  usingMock: !hasApiKeys
}