// nextstep.io/lib/constants/rag-knowledge.js

export const RAG_KNOWLEDGE_BASE = {
  // Established legitimate companies with credibility scoring
  legitimateCompanies: {
    // Tech Giants (Highest Credibility)
    'google': { 
      minScore: 90, 
      confidenceBoost: 20, 
      type: 'tech_giant',
      credibility: 0.98,
      domains: ['google.com', 'careers.google.com']
    },
    'microsoft': { 
      minScore: 90, 
      confidenceBoost: 20, 
      type: 'tech_giant',
      credibility: 0.98,
      domains: ['microsoft.com', 'careers.microsoft.com']
    },
    'amazon': { 
      minScore: 88, 
      confidenceBoost: 18, 
      type: 'tech_giant',
      credibility: 0.95,
      domains: ['amazon.com', 'amazon.jobs']
    },
    'apple': { 
      minScore: 90, 
      confidenceBoost: 20, 
      type: 'tech_giant',
      credibility: 0.98,
      domains: ['apple.com', 'jobs.apple.com']
    },
    'meta': { 
      minScore: 88, 
      confidenceBoost: 18, 
      type: 'tech_giant',
      credibility: 0.95,
      domains: ['meta.com', 'facebook.com/careers']
    },

    // Established Tech Companies (High Credibility)
    'netflix': { 
      minScore: 85, 
      confidenceBoost: 15, 
      type: 'established_tech',
      credibility: 0.92,
      domains: ['netflix.com', 'jobs.netflix.com']
    },
    'twitter': { 
      minScore: 82, 
      confidenceBoost: 12, 
      type: 'established_tech',
      credibility: 0.88,
      domains: ['twitter.com', 'careers.twitter.com']
    },
    'ibm': { 
      minScore: 85, 
      confidenceBoost: 15, 
      type: 'established_tech',
      credibility: 0.90,
      domains: ['ibm.com', 'careers.ibm.com']
    },
    'oracle': { 
      minScore: 83, 
      confidenceBoost: 13, 
      type: 'established_tech',
      credibility: 0.88,
      domains: ['oracle.com', 'careers.oracle.com']
    },
    'adobe': { 
      minScore: 85, 
      confidenceBoost: 15, 
      type: 'established_tech',
      credibility: 0.92,
      domains: ['adobe.com', 'careers.adobe.com']
    },
    'salesforce': { 
      minScore: 85, 
      confidenceBoost: 15, 
      type: 'established_tech',
      credibility: 0.92,
      domains: ['salesforce.com', 'salesforce.com/careers']
    },

    // Major Tech Companies (Good Credibility)
    'uber': { 
      minScore: 80, 
      confidenceBoost: 12, 
      type: 'major_tech',
      credibility: 0.85,
      domains: ['uber.com', 'uber.com/careers']
    },
    'airbnb': { 
      minScore: 80, 
      confidenceBoost: 12, 
      type: 'major_tech',
      credibility: 0.85,
      domains: ['airbnb.com', 'careers.airbnb.com']
    },
    'spotify': { 
      minScore: 80, 
      confidenceBoost: 12, 
      type: 'major_tech',
      credibility: 0.85,
      domains: ['spotify.com', 'spotifyjobs.com']
    },
    'slack': { 
      minScore: 80, 
      confidenceBoost: 12, 
      type: 'major_tech',
      credibility: 0.85,
      domains: ['slack.com', 'slack.com/careers']
    },
    'zoom': { 
      minScore: 80, 
      confidenceBoost: 12, 
      type: 'major_tech',
      credibility: 0.85,
      domains: ['zoom.us', 'zoom.us/careers']
    },
    'linkedin': { 
      minScore: 85, 
      confidenceBoost: 15, 
      type: 'major_tech',
      credibility: 0.90,
      domains: ['linkedin.com', 'linkedin.com/company/linkedin/careers']
    },
    'stripe': { 
      minScore: 82, 
      confidenceBoost: 14, 
      type: 'major_tech',
      credibility: 0.87,
      domains: ['stripe.com', 'stripe.com/jobs']
    },
    'square': { 
      minScore: 82, 
      confidenceBoost: 14, 
      type: 'major_tech',
      credibility: 0.87,
      domains: ['squareup.com', 'squareup.com/careers']
    },

    // Fortune 500 Non-Tech (Medium-High Credibility)
    'walmart': { 
      minScore: 78, 
      confidenceBoost: 10, 
      type: 'fortune_500',
      credibility: 0.80,
      domains: ['walmart.com', 'careers.walmart.com']
    },
    'mcdonald\'s': { 
      minScore: 75, 
      confidenceBoost: 8, 
      type: 'fortune_500',
      credibility: 0.78,
      domains: ['mcdonalds.com', 'careers.mcdonalds.com']
    },
    'starbucks': { 
      minScore: 78, 
      confidenceBoost: 10, 
      type: 'fortune_500',
      credibility: 0.82,
      domains: ['starbucks.com', 'starbucks.com/careers']
    },
    'ford': { 
      minScore: 75, 
      confidenceBoost: 8, 
      type: 'fortune_500',
      credibility: 0.78,
      domains: ['ford.com', 'corporate.ford.com/careers']
    },
    'general motors': { 
      minScore: 75, 
      confidenceBoost: 8, 
      type: 'fortune_500',
      credibility: 0.78,
      domains: ['gm.com', 'careers.gm.com']
    }
  },

  // Known scam patterns from real-world data with severity levels
  scamPatterns: {
    // Critical Scam Patterns (Immediate Red Flags)
    'upfront.*payment': { 
      scorePenalty: -60, 
      confidence: 0.98, 
      type: 'financial_scam',
      severity: 'critical',
      description: 'Requests for upfront payments or fees'
    },
    'processing.*fee': { 
      scorePenalty: -55, 
      confidence: 0.96, 
      type: 'financial_scam',
      severity: 'critical',
      description: 'Processing or administrative fees required'
    },
    'gift.*card': { 
      scorePenalty: -50, 
      confidence: 0.95, 
      type: 'payment_scam',
      severity: 'critical',
      description: 'Payment via gift cards requested'
    },
    'cryptocurrency': { 
      scorePenalty: -45, 
      confidence: 0.90, 
      type: 'payment_scam',
      severity: 'critical',
      description: 'Cryptocurrency payments requested'
    },
    'western.*union': { 
      scorePenalty: -50, 
      confidence: 0.95, 
      type: 'payment_scam',
      severity: 'critical',
      description: 'Western Union or MoneyGram payments'
    },
    'moneygram': { 
      scorePenalty: -50, 
      confidence: 0.95, 
      type: 'payment_scam',
      severity: 'critical',
      description: 'MoneyGram payment requests'
    },

    // High Risk Patterns (Strong Red Flags)
    'whatsapp.*interview': { 
      scorePenalty: -35, 
      confidence: 0.88, 
      type: 'communication_scam',
      severity: 'high',
      description: 'Interviews conducted via WhatsApp'
    },
    'telegram.*interview': { 
      scorePenalty: -35, 
      confidence: 0.88, 
      type: 'communication_scam',
      severity: 'high',
      description: 'Interviews conducted via Telegram'
    },
    'signal.*interview': { 
      scorePenalty: -35, 
      confidence: 0.88, 
      type: 'communication_scam',
      severity: 'high',
      description: 'Interviews conducted via Signal'
    },
    'social security.*number': { 
      scorePenalty: -40, 
      confidence: 0.92, 
      type: 'info_scam',
      severity: 'high',
      description: 'Requests for Social Security number early in process'
    },
    'bank account.*information': { 
      scorePenalty: -40, 
      confidence: 0.92, 
      type: 'info_scam',
      severity: 'high',
      description: 'Requests for bank account details before hiring'
    },
    'credit card.*information': { 
      scorePenalty: -45, 
      confidence: 0.94, 
      type: 'info_scam',
      severity: 'high',
      description: 'Requests for credit card information'
    },

    // Medium Risk Patterns (Warning Signs)
    'immediate.*start': { 
      scorePenalty: -20, 
      confidence: 0.80, 
      type: 'urgency_scam',
      severity: 'medium',
      description: 'Extreme urgency to start immediately'
    },
    'start.*today': { 
      scorePenalty: -20, 
      confidence: 0.80, 
      type: 'urgency_scam',
      severity: 'medium',
      description: 'Pressure to start today'
    },
    'no.*experience': { 
      scorePenalty: -25, 
      confidence: 0.82, 
      type: 'quality_scam',
      severity: 'medium',
      description: 'No experience required for high-paying roles'
    },
    'anyone.*can.*apply': { 
      scorePenalty: -25, 
      confidence: 0.82, 
      type: 'quality_scam',
      severity: 'medium',
      description: 'Open to anyone without qualifications'
    },
    'earn.*\\$\\d+.*hour': { 
      scorePenalty: -30, 
      confidence: 0.85, 
      type: 'compensation_scam',
      severity: 'medium',
      description: 'Unrealistically high hourly rates'
    },
    'work.*from.*home.*immediately': { 
      scorePenalty: -15, 
      confidence: 0.75, 
      type: 'wfh_scam',
      severity: 'medium',
      description: 'Immediate work from home with high pay'
    },

    // Low Risk Patterns (Minor Concerns)
    'gmail.*contact': { 
      scorePenalty: -10, 
      confidence: 0.70, 
      type: 'email_concern',
      severity: 'low',
      description: 'Personal email for official contact'
    },
    'yahoo.*contact': { 
      scorePenalty: -10, 
      confidence: 0.70, 
      type: 'email_concern',
      severity: 'low',
      description: 'Personal email for official contact'
    },
    'hotmail.*contact': { 
      scorePenalty: -10, 
      confidence: 0.70, 
      type: 'email_concern',
      severity: 'low',
      description: 'Personal email for official contact'
    },
    'poor.*grammar': { 
      scorePenalty: -8, 
      confidence: 0.65, 
      type: 'professionalism_concern',
      severity: 'low',
      description: 'Poor grammar and spelling throughout'
    },
    'multiple.*spelling.*errors': { 
      scorePenalty: -8, 
      confidence: 0.65, 
      type: 'professionalism_concern',
      severity: 'low',
      description: 'Multiple spelling errors in posting'
    }
  },

  // Professional job characteristics (positive signals)
  professionalPatterns: {
    // Compensation & Benefits (High Value)
    'health.*insurance': { 
      scoreBoost: +12, 
      confidence: 0.85, 
      type: 'professional_benefits',
      importance: 'high',
      description: 'Health insurance benefits mentioned'
    },
    '401k.*match': { 
      scoreBoost: +10, 
      confidence: 0.85, 
      type: 'professional_benefits',
      importance: 'high',
      description: '401k matching program'
    },
    'dental.*vision': { 
      scoreBoost: +8, 
      confidence: 0.80, 
      type: 'professional_benefits',
      importance: 'medium',
      description: 'Dental and vision insurance'
    },
    'equity.*stock': { 
      scoreBoost: +15, 
      confidence: 0.90, 
      type: 'professional_compensation',
      importance: 'high',
      description: 'Equity or stock options'
    },
    'bonus': { 
      scoreBoost: +10, 
      confidence: 0.82, 
      type: 'professional_compensation',
      importance: 'medium',
      description: 'Performance bonuses'
    },
    'competitive.*salary': { 
      scoreBoost: +8, 
      confidence: 0.78, 
      type: 'professional_compensation',
      importance: 'medium',
      description: 'Competitive salary mentioned'
    },

    // Professional Development (Medium Value)
    'professional.*development': { 
      scoreBoost: +8, 
      confidence: 0.80, 
      type: 'professional_growth',
      importance: 'medium',
      description: 'Professional development opportunities'
    },
    'tuition.*reimbursement': { 
      scoreBoost: +7, 
      confidence: 0.78, 
      type: 'professional_growth',
      importance: 'medium',
      description: 'Tuition reimbursement program'
    },
    'training.*program': { 
      scoreBoost: +6, 
      confidence: 0.75, 
      type: 'professional_growth',
      importance: 'medium',
      description: 'Structured training programs'
    },

    // Work Environment (Medium Value)
    'remote.*work': { 
      scoreBoost: +8, 
      confidence: 0.75, 
      type: 'modern_work',
      importance: 'medium',
      description: 'Remote work options'
    },
    'flexible.*hours': { 
      scoreBoost: +7, 
      confidence: 0.75, 
      type: 'modern_work',
      importance: 'medium',
      description: 'Flexible working hours'
    },
    'work.*life.*balance': { 
      scoreBoost: +6, 
      confidence: 0.72, 
      type: 'modern_work',
      importance: 'medium',
      description: 'Work-life balance emphasis'
    },

    // Professional Process (Medium Value)
    'technical.*interview': { 
      scoreBoost: +8, 
      confidence: 0.80, 
      type: 'professional_process',
      importance: 'medium',
      description: 'Technical interview process'
    },
    'multiple.*interview.*rounds': { 
      scoreBoost: +7, 
      confidence: 0.78, 
      type: 'professional_process',
      importance: 'medium',
      description: 'Multiple interview rounds'
    },
    'background.*check': { 
      scoreBoost: +6, 
      confidence: 0.75, 
      type: 'professional_process',
      importance: 'medium',
      description: 'Background check process'
    }
  },

  // Email domain credibility analysis
  emailDomains: {
    // Professional Domains (Positive)
    'company.com': { 
      scoreBoost: +20, 
      context: 'professional_domain',
      credibility: 0.95,
      description: 'Professional company domain'
    },
    'careers.company.com': { 
      scoreBoost: +18, 
      context: 'professional_careers',
      credibility: 0.92,
      description: 'Dedicated careers domain'
    },
    'jobs.company.com': { 
      scoreBoost: +18, 
      context: 'professional_careers',
      credibility: 0.92,
      description: 'Dedicated jobs domain'
    },
    'talent.company.com': { 
      scoreBoost: +15, 
      context: 'professional_careers',
      credibility: 0.90,
      description: 'Talent acquisition domain'
    },

    // Personal Domains (Negative)
    'gmail.com': { 
      scorePenalty: -12, 
      context: 'personal_email',
      credibility: 0.30,
      description: 'Personal Gmail account'
    },
    'yahoo.com': { 
      scorePenalty: -12, 
      context: 'personal_email',
      credibility: 0.30,
      description: 'Personal Yahoo account'
    },
    'hotmail.com': { 
      scorePenalty: -12, 
      context: 'personal_email',
      credibility: 0.30,
      description: 'Personal Hotmail account'
    },
    'outlook.com': { 
      scorePenalty: -8, 
      context: 'personal_email',
      credibility: 0.40,
      description: 'Personal Outlook account'
    },
    'aol.com': { 
      scorePenalty: -10, 
      context: 'personal_email',
      credibility: 0.35,
      description: 'Personal AOL account'
    },

    // Generic/Questionable Domains
    'protonmail.com': { 
      scorePenalty: -15, 
      context: 'anonymous_email',
      credibility: 0.25,
      description: 'Anonymous email service'
    },
    'tutanota.com': { 
      scorePenalty: -15, 
      context: 'anonymous_email',
      credibility: 0.25,
      description: 'Anonymous email service'
    }
  },

  // Industry-specific legitimacy patterns
  industryPatterns: {
    'tech': {
      'software engineer': { 
        legitimacy: 0.90,
        avgSalary: '$120,000',
        commonBenefits: ['equity', 'remote work', 'health insurance']
      },
      'data scientist': { 
        legitimacy: 0.88,
        avgSalary: '$130,000', 
        commonBenefits: ['bonus', 'professional development']
      },
      'product manager': { 
        legitimacy: 0.85,
        avgSalary: '$140,000',
        commonBenefits: ['equity', 'bonus', 'health insurance']
      },
      'devops engineer': { 
        legitimacy: 0.87,
        avgSalary: '$125,000',
        commonBenefits: ['remote work', 'health insurance']
      },
      'ux designer': { 
        legitimacy: 0.83,
        avgSalary: '$110,000',
        commonBenefits: ['professional development', 'flexible hours']
      }
    },
    'finance': {
      'financial analyst': { 
        legitimacy: 0.80,
        avgSalary: '$85,000',
        commonBenefits: ['bonus', '401k match', 'health insurance']
      },
      'investment banker': { 
        legitimacy: 0.75,
        avgSalary: '$150,000',
        commonBenefits: ['bonus', 'health insurance', 'retirement']
      },
      'accountant': { 
        legitimacy: 0.82,
        avgSalary: '$75,000',
        commonBenefits: ['401k', 'health insurance', 'paid time off']
      },
      'financial advisor': { 
        legitimacy: 0.70,
        avgSalary: '$90,000',
        commonBenefits: ['commission', 'bonus', 'health insurance']
      }
    },
    'healthcare': {
      'registered nurse': { 
        legitimacy: 0.88,
        avgSalary: '$80,000',
        commonBenefits: ['health insurance', 'retirement', 'shift differential']
      },
      'physician': { 
        legitimacy: 0.92,
        avgSalary: '$220,000',
        commonBenefits: ['malpractice insurance', 'health insurance', 'retirement']
      },
      'medical assistant': { 
        legitimacy: 0.85,
        avgSalary: '$38,000',
        commonBenefits: ['health insurance', 'paid time off']
      }
    }
  },

  // Geographic legitimacy patterns
  locations: {
    // High Legitimacy Tech Hubs
    'silicon valley': { 
      legitimacy: 0.92,
      scoreBoost: +8,
      commonIndustries: ['tech', 'venture capital', 'startups']
    },
    'san francisco': { 
      legitimacy: 0.90,
      scoreBoost: +7,
      commonIndustries: ['tech', 'finance', 'biotech']
    },
    'seattle': { 
      legitimacy: 0.88,
      scoreBoost: +6,
      commonIndustries: ['tech', 'aerospace', 'healthcare']
    },
    'new york': { 
      legitimacy: 0.87,
      scoreBoost: +6,
      commonIndustries: ['finance', 'media', 'tech']
    },
    'boston': { 
      legitimacy: 0.86,
      scoreBoost: +5,
      commonIndustries: ['education', 'healthcare', 'biotech']
    },
    'austin': { 
      legitimacy: 0.85,
      scoreBoost: +5,
      commonIndustries: ['tech', 'music', 'creative']
    },

    // Medium Legitimacy
    'remote': { 
      legitimacy: 0.75,
      scoreBoost: +3,
      commonIndustries: ['tech', 'customer service', 'creative']
    },
    'chicago': { 
      legitimacy: 0.82,
      scoreBoost: +4,
      commonIndustries: ['finance', 'manufacturing', 'healthcare']
    },
    'los angeles': { 
      legitimacy: 0.80,
      scoreBoost: +4,
      commonIndustries: ['entertainment', 'tech', 'creative']
    },
    'denver': { 
      legitimacy: 0.78,
      scoreBoost: +3,
      commonIndustries: ['tech', 'outdoor', 'renewable energy']
    },

    // Lower Legitimacy (Higher Scam Risk)
    'unknown location': { 
      legitimacy: 0.50,
      scorePenalty: -5,
      commonIndustries: ['varies']
    },
    'multiple locations': { 
      legitimacy: 0.65,
      scoreBoost: 0,
      commonIndustries: ['varies']
    }
  },

  // Job board credibility
  jobBoards: {
    // High Credibility Boards
    'linkedin.com': { 
      credibility: 0.90,
      scoreBoost: +5,
      description: 'Professional network with verified companies'
    },
    'indeed.com': { 
      credibility: 0.85,
      scoreBoost: +4,
      description: 'Major job board with employer verification'
    },
    'glassdoor.com': { 
      credibility: 0.88,
      scoreBoost: +5,
      description: 'Company reviews and verified postings'
    },
    'angel.co': { 
      credibility: 0.82,
      scoreBoost: +3,
      description: 'Startup focused with some verification'
    },

    // Medium Credibility Boards
    'monster.com': { 
      credibility: 0.75,
      scoreBoost: +2,
      description: 'Established board with mixed quality'
    },
    'careerbuilder.com': { 
      credibility: 0.72,
      scoreBoost: +2,
      description: 'Traditional job board'
    },
    'ziprecruiter.com': { 
      credibility: 0.78,
      scoreBoost: +3,
      description: 'Modern platform with some verification'
    },

    // Lower Credibility Boards
    'craigslist.org': { 
      credibility: 0.40,
      scorePenalty: -10,
      description: 'Minimal verification, high scam risk'
    },
    'facebook.com': { 
      credibility: 0.45,
      scorePenalty: -8,
      description: 'Social media with limited job verification'
    }
  },

  // Salary legitimacy ranges by role and location
  salaryRanges: {
    'software engineer': {
      'silicon valley': { min: 120000, max: 250000, legitimate: true },
      'new york': { min: 110000, max: 220000, legitimate: true },
      'remote': { min: 90000, max: 180000, legitimate: true },
      'unrealistic': { min: 50000, max: 500000, legitimate: false }
    },
    'data scientist': {
      'silicon valley': { min: 130000, max: 280000, legitimate: true },
      'new york': { min: 120000, max: 240000, legitimate: true },
      'remote': { min: 100000, max: 200000, legitimate: true }
    },
    'work from home data entry': {
      'any': { min: 15000, max: 45000, legitimate: true },
      'unrealistic': { min: 50000, max: 200000, legitimate: false }
    }
  }
}

// Helper functions for RAG knowledge base
export const RAGHelpers = {
  // Check if a company is in the legitimate companies database
  isLegitimateCompany(companyName) {
    const normalized = companyName.toLowerCase()
    return RAG_KNOWLEDGE_BASE.legitimateCompanies[normalized] || null
  },

  // Get all known scam patterns
  getScamPatterns() {
    return Object.keys(RAG_KNOWLEDGE_BASE.scamPatterns)
  },

  // Check if text contains known scam patterns
  detectScamPatterns(text) {
    const normalized = text.toLowerCase()
    const detected = []
    
    Object.entries(RAG_KNOWLEDGE_BASE.scamPatterns).forEach(([pattern, data]) => {
      const regex = new RegExp(pattern, 'gi')
      if (normalized.match(regex)) {
        detected.push({
          pattern,
          ...data,
          occurrences: normalized.match(regex).length
        })
      }
    })
    
    return detected
  },

  // Analyze email domain credibility
  analyzeEmailDomain(email) {
    const domain = email.toLowerCase().split('@')[1]
    return RAG_KNOWLEDGE_BASE.emailDomains[domain] || { 
      credibility: 0.50, 
      context: 'unknown_domain',
      description: 'Unknown email domain'
    }
  },

  // Get industry legitimacy for a job title
  getIndustryLegitimacy(industry, jobTitle) {
    const normalizedIndustry = industry.toLowerCase()
    const normalizedTitle = jobTitle.toLowerCase()
    
    if (RAG_KNOWLEDGE_BASE.industryPatterns[normalizedIndustry]) {
      return RAG_KNOWLEDGE_BASE.industryPatterns[normalizedIndustry][normalizedTitle] || null
    }
    return null
  },

  // Check salary legitimacy for role and location
  isSalaryLegitimate(role, location, salary) {
    const normalizedRole = role.toLowerCase()
    const normalizedLocation = location.toLowerCase()
    
    if (RAG_KNOWLEDGE_BASE.salaryRanges[normalizedRole]) {
      const range = RAG_KNOWLEDGE_BASE.salaryRanges[normalizedRole][normalizedLocation] ||
                   RAG_KNOWLEDGE_BASE.salaryRanges[normalizedRole]['unrealistic']
      
      if (range) {
        const salaryNum = parseInt(salary.replace(/[^\d]/g, ''))
        return salaryNum >= range.min && salaryNum <= range.max
      }
    }
    return true // Default to true if no data
  },

  // Calculate overall credibility score from multiple factors
  calculateCredibilityScore(factors) {
    let score = 50 // Base score
    
    factors.forEach(factor => {
      if (factor.type === 'company' && factor.credibility) {
        score += (factor.credibility - 0.5) * 40
      }
      if (factor.type === 'scam' && factor.severity === 'critical') {
        score -= 30
      }
      if (factor.type === 'professional' && factor.importance === 'high') {
        score += 8
      }
    })
    
    return Math.max(0, Math.min(100, score))
  }
}

const getRAGKnowledgeBase = async () => {
  return RAG_KNOWLEDGE_BASE
}

export default getRAGKnowledgeBase    