// nextstep.io/lib/ai/guards.js
export class TokenGuard {
  constructor() {
    this.usage = new Map()
    this.resetInterval = setInterval(() => this.resetUsage(), 60 * 60 * 1000) // Reset hourly
  }

  checkLimit(userId, tokens) {
    const userUsage = this.usage.get(userId) || { tokens: 0, count: 0, lastReset: Date.now() }
    const now = Date.now()
    
    // Reset if more than 1 hour has passed
    if (now - userUsage.lastReset > 60 * 60 * 1000) {
      this.usage.set(userId, { tokens: 0, count: 0, lastReset: now })
      return true
    }

    const newTokens = userUsage.tokens + tokens
    const newCount = userUsage.count + 1

    // Limits: 10K tokens per hour, 100 requests per hour
    if (newTokens > 10000 || newCount > 100) {
      return false
    }
    
    this.usage.set(userId, {
      tokens: newTokens,
      count: newCount,
      lastReset: userUsage.lastReset
    })
    
    return true
  }

  getUserUsage(userId) {
    return this.usage.get(userId) || { tokens: 0, count: 0, lastReset: Date.now() }
  }

  resetUsage() {
    const now = Date.now()
    for (let [userId, usage] of this.usage) {
      if (now - usage.lastReset > 60 * 60 * 1000) {
        this.usage.set(userId, { tokens: 0, count: 0, lastReset: now })
      }
    }
  }

  cleanup() {
    clearInterval(this.resetInterval)
  }
}

export class SafetyGuard {
  static sanitizeInput(text) {
    if (typeof text !== 'string') return ''
    
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/on\w+='[^']*'/g, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '')
      .substring(0, 10000) // Limit input length
      .trim()
  }

  static containsSensitiveInfo(text) {
    const patterns = [
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN
      /\b\d{16}\b/, // Credit card
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email
      /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/, // IP address
    ]

    return patterns.some(pattern => pattern.test(text))
  }

  static validateOutput(text) {
    if (typeof text !== 'string') return false
    
    const blockedPatterns = [
      /\[REDACTED\]/i,
      /\[REMOVED\]/i,
      /\[INAPPROPRIATE\]/i,
      /offensive content/i,
    ]

    return !blockedPatterns.some(pattern => pattern.test(text))
  }
}