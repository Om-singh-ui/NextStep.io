// nextstep.io/lib/ai/client.js
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

class AIClient {
  constructor() {
    // Initialize OpenAI client
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }) : null

    // Initialize Gemini client
    this.genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null
    
    this.config = {
      maxTokens: parseInt(process.env.AI_MAX_TOKENS) || 4000,
      temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.3,
      maxRetries: 3
    }
    
    this.tokenGuard = new TokenGuard()
  }

  async generateContent(prompt, options = {}) {
    const { 
      provider = 'auto', 
      maxTokens = this.config.maxTokens, 
      temperature = this.config.temperature 
    } = options
    
    // Sanitize input
    const sanitizedPrompt = this.sanitizeInput(prompt)
    
    // Choose provider
    const selectedProvider = provider === 'auto' 
      ? await this.selectProvider(sanitizedPrompt)
      : provider

    try {
      let result
      
      if (selectedProvider === 'openai' && this.openai) {
        result = await this.generateWithOpenAI(sanitizedPrompt, maxTokens, temperature)
      } else if (selectedProvider === 'gemini' && this.genAI) {
        result = await this.generateWithGemini(sanitizedPrompt, maxTokens, temperature)
      } else {
        // Fallback to available provider
        if (this.openai) {
          result = await this.generateWithOpenAI(sanitizedPrompt, maxTokens, temperature)
        } else if (this.genAI) {
          result = await this.generateWithGemini(sanitizedPrompt, maxTokens, temperature)
        } else {
          throw new Error('No AI providers available. Please check API keys.')
        }
      }

      return this.sanitizeOutput(result)
    } catch (error) {
      console.error('AI generation error:', error)
      
      // Retry with fallback provider
      if (provider === 'auto') {
        const fallbackProvider = selectedProvider === 'openai' ? 'gemini' : 'openai'
        try {
          return await this.retryWithProvider(fallbackProvider, sanitizedPrompt, maxTokens, temperature)
        } catch (retryError) {
          console.error('Fallback provider also failed:', retryError)
        }
      }
      
      // Return a default response if all providers fail
      return this.getFallbackResponse(sanitizedPrompt)
    }
  }

  async generateWithOpenAI(prompt, maxTokens, temperature) {
    if (!this.openai) {
      throw new Error('OpenAI client not configured')
    }

    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: maxTokens,
      temperature: temperature
    })

    return completion.choices[0]?.message?.content || ''
  }

  async generateWithGemini(prompt, maxTokens, temperature) {
    if (!this.genAI) {
      throw new Error('Gemini client not configured')
    }

    const model = this.genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || 'gemini-1.5-pro' 
    })

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: temperature
      }
    })

    const response = await result.response
    return response.text()
  }

  async selectProvider(prompt) {
    try {
      // Use Gemini for complex analytical tasks, OpenAI for creative writing
      const complexity = await this.estimateComplexity(prompt)
      return complexity > 0.7 ? 'gemini' : 'openai'
    } catch (error) {
      // Default to OpenAI if complexity estimation fails
      return 'openai'
    }
  }

  async estimateComplexity(prompt) {
    try {
      // Simple heuristic for complexity estimation
      const wordCount = prompt.split(/\s+/).length
      const hasAnalyticalKeywords = /analyze|assess|evaluate|compare|contrast|risk|authenticity|scam|fraud/i.test(prompt)
      const requiresReasoning = /why|how|what if|explain|justify|recommend/i.test(prompt)
      
      let complexity = 0
      if (wordCount > 500) complexity += 0.3
      if (hasAnalyticalKeywords) complexity += 0.4
      if (requiresReasoning) complexity += 0.3
      
      return Math.min(complexity, 1)
    } catch (error) {
      console.error('Complexity estimation error:', error)
      return 0.5 // Default medium complexity
    }
  }

  sanitizeInput(text) {
    if (typeof text !== 'string') return ''
    
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '')
      .substring(0, 30000) // Limit input length
      .trim()
  }

  sanitizeOutput(text) {
    if (typeof text !== 'string') return ''
    return text.trim()
  }

  async retryWithProvider(provider, prompt, maxTokens, temperature) {
    try {
      if (provider === 'openai' && this.openai) {
        return await this.generateWithOpenAI(prompt, maxTokens, temperature)
      } else if (provider === 'gemini' && this.genAI) {
        return await this.generateWithGemini(prompt, maxTokens, temperature)
      } else {
        throw new Error(`Provider ${provider} not available for retry`)
      }
    } catch (retryError) {
      throw new Error(`AI service unavailable: ${retryError.message}`)
    }
  }

  getFallbackResponse(prompt) {
    // Return a structured fallback response when AI services are down
    console.log('Using fallback AI response')
    
    return `
JOB DETAILS:
Job Title: Unknown Position
Company: Unknown Company  
Location: Not specified
Salary: Not specified

EVIDENCE:
- Unable to perform AI analysis at this time
- Manual verification recommended
- Check company website and reviews independently

RECOMMENDATIONS:
- Verify this job posting through multiple channels
- Contact the company directly using official information
- Research the company on professional networks like LinkedIn

STRATEGY TIPS:
- Proceed with caution until verification is complete
- Avoid sharing sensitive personal information
- Ask detailed questions about the role and company

SUMMARY:
AI analysis service is temporarily unavailable. Please conduct thorough manual verification of this job posting.

Confidence: 50%
Authenticity Score: 50
`
  }

  // Check if providers are available
  getProviderStatus() {
    return {
      openai: !!this.openai,
      gemini: !!this.genAI,
      configured: !!(this.openai || this.genAI)
    }
  }

  // Health check method
  async healthCheck() {
    const status = this.getProviderStatus()
    
    if (!status.configured) {
      return { healthy: false, error: 'No AI providers configured' }
    }

    try {
      // Test with a simple prompt
      const testPrompt = 'Respond with "OK"'
      const response = await this.generateContent(testPrompt, { maxTokens: 10 })
      
      return { 
        healthy: true, 
        providers: status,
        testResponse: response 
      }
    } catch (error) {
      return { 
        healthy: false, 
        providers: status,
        error: error.message 
      }
    }
  }
}

class TokenGuard {
  constructor() {
    this.usage = new Map()
    this.resetInterval = setInterval(() => this.resetUsage(), 60 * 60 * 1000) // Reset hourly
    
    // Clean up on process exit
    if (typeof process !== 'undefined') {
      process.on('exit', () => this.cleanup())
    }
  }

  checkLimit(userId, tokens) {
    try {
      const userUsage = this.usage.get(userId) || { tokens: 0, count: 0 }
      const newUsage = userUsage.tokens + tokens
      
      // Limits: 10K tokens per hour, 100 requests per hour
      if (newUsage > 10000 || userUsage.count >= 100) {
        throw new Error('Rate limit exceeded')
      }
      
      this.usage.set(userId, {
        tokens: newUsage,
        count: userUsage.count + 1
      })
      
      return true
    } catch (error) {
      console.error('Token guard error:', error)
      return false
    }
  }

  resetUsage() {
    this.usage.clear()
  }

  cleanup() {
    if (this.resetInterval) {
      clearInterval(this.resetInterval)
    }
  }
}
