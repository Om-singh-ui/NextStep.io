// nextstep.io/lib/constants/risk-signals.js

export const RISK_SIGNALS = {
  CRITICAL_RISK: [
    // Financial Requests
    "upfront payment",
    "processing fee",
    "training fee",
    "application fee",
    "background check fee",
    "equipment deposit",
    "wire transfer requested",
    "western union",
    "moneygram",
    "gift cards payment",
    "cryptocurrency payment",
    "bitcoin payment",
    
    // Urgency & Pressure
    "immediate hiring",
    "instant start",
    "limited time offer",
    "apply immediately",
    "hiring today",
    "urgent position",
    
    // Unrealistic Promises
    "earn $1000 weekly",
    "get rich quick",
    "guaranteed income",
    "no experience needed",
    "become millionaire",
    "financial freedom",
    
    // Sensitive Information
    "bank details required",
    "social security number",
    "passport copy needed",
    "credit card information",
    "driver license copy",
    
    // Communication Red Flags
    "whatsapp interview",
    "telegram interview",
    "text message only",
    "no phone call",
    "generic email only"
  ],
  
  HIGH_RISK: [
    // Unprofessional Communication
    "poor grammar",
    "multiple spelling errors",
    "unprofessional language",
    "excessive capitalization",
    "repetitive phrases",
    
    // Vague Details
    "vague job description",
    "no company address",
    "virtual interviews only",
    "company name missing",
    "location not specified",
    
    // Suspicious Contacts
    "generic email domain",
    "@gmail.com contact",
    "@yahoo.com contact",
    "@hotmail.com contact",
    "personal email provided",
    
    // Compensation Issues
    "commission only",
    "unrealistic salary",
    "salary too high",
    "bonus focused",
    "performance-based only"
  ],
  
  MEDIUM_RISK: [
    // Company Verification
    "company website missing",
    "unverified company",
    "new startup",
    "no online presence",
    "recently established",
    
    // Process Concerns
    "complex application",
    "multiple forms required",
    "urgent hiring mentioned",
    "pressure to decide",
    "recruiter pressure",
    
    // Role Specific
    "100% remote unspecified",
    "multiple locations vague",
    "benefits unclear",
    "role responsibilities vague",
    "reporting structure unclear"
  ],
  
  LOW_RISK: [
    // Minor Concerns
    "limited company info",
    "brief job description",
    "standard benefits only",
    "common requirements",
    "industry standard terms"
  ],
  
  POSITIVE_SIGNALS: [
    // Company Verification
    "clear company information",
    "professional email domain",
    "company website provided",
    "linkedin company page",
    "glassdoor reviews mentioned",
    "established company history",
    "industry recognition",
    "physical address provided",
    "phone number provided",
    
    // Job Details Quality
    "detailed job description",
    "specific requirements listed",
    "clear responsibilities",
    "reasonable salary range",
    "comprehensive benefits",
    "performance metrics clear",
    "reporting structure defined",
    
    // Professional Development
    "career growth mentioned",
    "professional development",
    "training provided",
    "skill enhancement",
    "certification support",
    
    // Company Culture
    "company culture description",
    "team structure explained",
    "work environment details",
    "values mentioned",
    "mission statement",
    
    // Hiring Process
    "clear application process",
    "multiple interview stages",
    "professional communication",
    "reasonable timeline",
    "transparent next steps",
    
    // Industry Standards
    "standard industry terms",
    "professional qualifications",
    "reasonable experience level",
    "appropriate education requirements"
  ]
}

// Enhanced scoring weights for different risk levels
export const RISK_WEIGHTS = {
  CRITICAL_RISK: -30,    // Each critical risk signal deducts 30 points
  HIGH_RISK: -15,        // Each high risk signal deducts 15 points
  MEDIUM_RISK: -5,       // Each medium risk signal deducts 5 points
  LOW_RISK: -2,          // Each low risk signal deducts 2 points
  POSITIVE_SIGNALS: +5   // Each positive signal adds 5 points
}

// Signal categories for better analysis
export const SIGNAL_CATEGORIES = {
  FINANCIAL: "financial_risk",
  COMMUNICATION: "communication_quality",
  COMPANY: "company_verification",
  PROCESS: "hiring_process",
  COMPENSATION: "compensation_structure",
  INFORMATION: "information_requests",
  PROFESSIONALISM: "professional_standards"
}

// Enhanced signal mapping with categories
export const CATEGORIZED_SIGNALS = {
  CRITICAL_RISK: [
    { signal: "upfront payment", category: SIGNAL_CATEGORIES.FINANCIAL },
    { signal: "processing fee", category: SIGNAL_CATEGORIES.FINANCIAL },
    { signal: "training fee", category: SIGNAL_CATEGORIES.FINANCIAL },
    { signal: "wire transfer requested", category: SIGNAL_CATEGORIES.FINANCIAL },
    { signal: "gift cards payment", category: SIGNAL_CATEGORIES.FINANCIAL },
    { signal: "bank details required", category: SIGNAL_CATEGORIES.INFORMATION },
    { signal: "social security number", category: SIGNAL_CATEGORIES.INFORMATION },
    { signal: "passport copy needed", category: SIGNAL_CATEGORIES.INFORMATION },
    { signal: "whatsapp interview", category: SIGNAL_CATEGORIES.PROCESS },
    { signal: "telegram interview", category: SIGNAL_CATEGORIES.PROCESS },
    { signal: "immediate hiring", category: SIGNAL_CATEGORIES.PROCESS }
  ],
  
  POSITIVE_SIGNALS: [
    { signal: "professional email domain", category: SIGNAL_CATEGORIES.COMMUNICATION },
    { signal: "company website provided", category: SIGNAL_CATEGORIES.COMPANY },
    { signal: "physical address provided", category: SIGNAL_CATEGORIES.COMPANY },
    { signal: "detailed job description", category: SIGNAL_CATEGORIES.PROFESSIONALISM },
    { signal: "clear application process", category: SIGNAL_CATEGORIES.PROCESS },
    { signal: "reasonable salary range", category: SIGNAL_CATEGORIES.COMPENSATION },
    { signal: "career growth mentioned", category: SIGNAL_CATEGORIES.PROFESSIONALISM }
  ]
}

// Confidence factors for signal detection
export const CONFIDENCE_FACTORS = {
  EXACT_MATCH: 1.0,      // Exact phrase match
  PARTIAL_MATCH: 0.7,    // Partial phrase match
  CONTEXT_MATCH: 0.5,    // Contextual match
  WEAK_MATCH: 0.3        // Weak association
}

// Thresholds for risk scoring
export const RISK_THRESHOLDS = {
  SAFE: 80,              // 80-100: Safe to proceed
  CAUTION: 60,           // 60-79: Proceed with caution
  WARNING: 40,           // 40-59: High risk, verify thoroughly
  DANGER: 0              // 0-39: Very high risk, avoid
}

// Helper functions for signal detection
export const SignalUtils = {
  // Normalize text for better matching
  normalizeText(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  },
  
  // Calculate match confidence
  calculateMatchConfidence(signal, text, category = null) {
    const normalizedText = this.normalizeText(text)
    const normalizedSignal = this.normalizeText(signal)
    
    if (normalizedText.includes(normalizedSignal)) {
      return CONFIDENCE_FACTORS.EXACT_MATCH
    }
    
    // Check for partial matches
    const signalWords = normalizedSignal.split(' ')
    const matchingWords = signalWords.filter(word => 
      normalizedText.includes(word) && word.length > 3
    )
    
    if (matchingWords.length >= signalWords.length * 0.7) {
      return CONFIDENCE_FACTORS.PARTIAL_MATCH
    }
    
    return CONFIDENCE_FACTORS.WEAK_MATCH
  },
  
  // Get risk level description
  getRiskLevelDescription(score) {
    if (score >= RISK_THRESHOLDS.SAFE) return "Low Risk - Appears Legitimate"
    if (score >= RISK_THRESHOLDS.CAUTION) return "Medium Risk - Verify Details"
    if (score >= RISK_THRESHOLDS.WARNING) return "High Risk - Exercise Caution"
    return "Critical Risk - Avoid"
  },
  
  // Calculate final risk score
  calculateRiskScore(detectedSignals) {
    let score = 100 // Start with perfect score
    
    detectedSignals.forEach(signal => {
      const weight = RISK_WEIGHTS[signal.level] || 0
      score += weight * signal.confidence
    })
    
    return Math.max(0, Math.min(100, Math.round(score)))
  }
}