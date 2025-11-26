// nextstep.io/lib/constants/salary-data.js

/**
 * Comprehensive salary data with location adjustments, industry multipliers,
 * and experience-based calculations for accurate market rate estimation
 */

// Base salary ranges by experience level and role category
export const BASE_SALARY_RANGES = {
  engineering: {
    intern: { min: 60000, max: 85000, confidence: 0.75 },
    junior: { min: 80000, max: 120000, confidence: 0.85 },
    mid: { min: 110000, max: 160000, confidence: 0.90 },
    senior: { min: 140000, max: 220000, confidence: 0.92 },
    staff: { min: 180000, max: 280000, confidence: 0.85 },
    principal: { min: 220000, max: 350000, confidence: 0.80 }
  },
  product: {
    junior: { min: 70000, max: 100000, confidence: 0.80 },
    mid: { min: 95000, max: 140000, confidence: 0.85 },
    senior: { min: 130000, max: 180000, confidence: 0.88 },
    director: { min: 160000, max: 250000, confidence: 0.82 }
  },
  design: {
    junior: { min: 65000, max: 90000, confidence: 0.78 },
    mid: { min: 85000, max: 120000, confidence: 0.83 },
    senior: { min: 110000, max: 160000, confidence: 0.86 },
    lead: { min: 140000, max: 190000, confidence: 0.80 }
  },
  marketing: {
    junior: { min: 50000, max: 70000, confidence: 0.75 },
    mid: { min: 65000, max: 95000, confidence: 0.80 },
    senior: { min: 85000, max: 130000, confidence: 0.83 },
    director: { min: 120000, max: 180000, confidence: 0.78 }
  },
  sales: {
    junior: { min: 45000, max: 65000, base: 60000, confidence: 0.70 },
    mid: { min: 60000, max: 90000, base: 75000, confidence: 0.75 },
    senior: { min: 80000, max: 120000, base: 95000, confidence: 0.78 },
    director: { min: 100000, max: 180000, base: 130000, confidence: 0.75 }
  },
  default: {
    entry: { min: 45000, max: 65000, confidence: 0.70 },
    mid: { min: 60000, max: 90000, confidence: 0.75 },
    senior: { min: 80000, max: 130000, confidence: 0.80 },
    executive: { min: 120000, max: 250000, confidence: 0.70 }
  }
}

// Comprehensive location cost of living adjustments
export const LOCATION_ADJUSTMENTS = {
  // Tier 1 - High Cost of Living
  'san francisco': { multiplier: 1.40, confidence: 0.95, tier: 1, score: 15 },
  'new york': { multiplier: 1.35, confidence: 0.95, tier: 1, score: 15 },
  'san jose': { multiplier: 1.30, confidence: 0.90, tier: 1, score: 14 },
  'boston': { multiplier: 1.25, confidence: 0.90, tier: 1, score: 13 },
  'los angeles': { multiplier: 1.20, confidence: 0.85, tier: 1, score: 12 },
  'seattle': { multiplier: 1.18, confidence: 0.88, tier: 1, score: 12 },
  'washington dc': { multiplier: 1.15, confidence: 0.85, tier: 1, score: 11 },
  'san diego': { multiplier: 1.12, confidence: 0.80, tier: 1, score: 10 },
  
  // Tier 2 - Medium-High Cost of Living
  'denver': { multiplier: 1.05, confidence: 0.82, tier: 2, score: 8 },
  'austin': { multiplier: 1.02, confidence: 0.80, tier: 2, score: 7 },
  'chicago': { multiplier: 1.00, confidence: 0.85, tier: 2, score: 7 },
  'atlanta': { multiplier: 0.98, confidence: 0.78, tier: 2, score: 6 },
  'raleigh': { multiplier: 0.96, confidence: 0.75, tier: 2, score: 5 },
  'dallas': { multiplier: 0.95, confidence: 0.80, tier: 2, score: 5 },
  'phoenix': { multiplier: 0.94, confidence: 0.75, tier: 2, score: 5 },
  'minneapolis': { multiplier: 0.93, confidence: 0.78, tier: 2, score: 5 },
  
  // Tier 3 - Medium Cost of Living
  'salt lake city': { multiplier: 0.90, confidence: 0.72, tier: 3, score: 4 },
  'nashville': { multiplier: 0.88, confidence: 0.70, tier: 3, score: 4 },
  'kansas city': { multiplier: 0.86, confidence: 0.75, tier: 3, score: 3 },
  'indianapolis': { multiplier: 0.85, confidence: 0.73, tier: 3, score: 3 },
  'columbus': { multiplier: 0.84, confidence: 0.70, tier: 3, score: 3 },
  
  // Tier 4 - Lower Cost of Living
  'memphis': { multiplier: 0.80, confidence: 0.68, tier: 4, score: 2 },
  'oklahoma city': { multiplier: 0.78, confidence: 0.65, tier: 4, score: 2 },
  'birmingham': { multiplier: 0.76, confidence: 0.63, tier: 4, score: 2 },
  
  // Remote classifications
  'remote us': { multiplier: 1.00, confidence: 0.70, tier: 2, score: 5 },
  'remote global': { multiplier: 0.85, confidence: 0.60, tier: 3, score: 3 },
  
  // Default for unspecified locations
  'default': { multiplier: 1.00, confidence: 0.50, tier: 2, score: 5 }
}

// Industry-specific salary multipliers
export const INDUSTRY_MULTIPLIERS = {
  'technology': { multiplier: 1.25, confidence: 0.90, score: 10, trend: 'growing' },
  'finance': { multiplier: 1.30, confidence: 0.92, score: 9, trend: 'stable' },
  'biotech': { multiplier: 1.35, confidence: 0.85, score: 9, trend: 'growing' },
  'healthcare': { multiplier: 1.15, confidence: 0.88, score: 8, trend: 'stable' },
  'consulting': { multiplier: 1.20, confidence: 0.86, score: 8, trend: 'stable' },
  'energy': { multiplier: 1.10, confidence: 0.80, score: 7, trend: 'growing' },
  'manufacturing': { multiplier: 0.95, confidence: 0.82, score: 5, trend: 'stable' },
  'retail': { multiplier: 0.85, confidence: 0.85, score: 4, trend: 'declining' },
  'education': { multiplier: 0.80, confidence: 0.90, score: 3, trend: 'stable' },
  'nonprofit': { multiplier: 0.75, confidence: 0.88, score: 2, trend: 'stable' },
  'government': { multiplier: 0.85, confidence: 0.92, score: 4, trend: 'stable' },
  'default': { multiplier: 1.00, confidence: 0.50, score: 5, trend: 'stable' }
}

// Company size adjustments
export const COMPANY_SIZE_ADJUSTMENTS = {
  'startup': { multiplier: 0.90, confidence: 0.75, equity: 'high', bonus: 'low' },
  'scaleup': { multiplier: 1.05, confidence: 0.80, equity: 'medium', bonus: 'medium' },
  'midsize': { multiplier: 1.10, confidence: 0.85, equity: 'low', bonus: 'high' },
  'enterprise': { multiplier: 1.15, confidence: 0.90, equity: 'very low', bonus: 'high' },
  'faang': { multiplier: 1.35, confidence: 0.95, equity: 'medium', bonus: 'very high' },
  'default': { multiplier: 1.00, confidence: 0.50, equity: 'low', bonus: 'medium' }
}

// Role-specific keywords for automatic categorization
export const ROLE_KEYWORDS = {
  engineering: [
    'engineer', 'developer', 'software', 'backend', 'frontend', 'fullstack',
    'sre', 'devops', 'infrastructure', 'platform', 'mobile', 'ios', 'android',
    'machine learning', 'ml', 'ai', 'data engineer', 'cloud', 'azure', 'aws'
  ],
  product: [
    'product manager', 'product owner', 'pm', 'product', 'strategist',
    'product marketing', 'growth product'
  ],
  design: [
    'designer', 'ux', 'ui', 'user experience', 'product design',
    'interaction design', 'visual design'
  ],
  marketing: [
    'marketing', 'growth', 'demand gen', 'content', 'seo', 'sem',
    'social media', 'brand', 'digital marketing'
  ],
  sales: [
    'sales', 'account executive', 'ae', 'business development', 'bdr',
    'account manager', 'revenue', 'partnerships'
  ],
  data: [
    'data scientist', 'data analyst', 'analytics', 'bi', 'business intelligence',
    'research', 'insights'
  ]
}

// Experience level mappings
export const EXPERIENCE_LEVELS = {
  '0-2': { level: 'entry', multiplier: 0.8, years: 1 },
  '1-3': { level: 'entry', multiplier: 0.85, years: 2 },
  '2-4': { level: 'junior', multiplier: 0.9, years: 3 },
  '3-5': { level: 'mid', multiplier: 1.0, years: 4 },
  '4-6': { level: 'mid', multiplier: 1.1, years: 5 },
  '5-8': { level: 'senior', multiplier: 1.25, years: 6.5 },
  '7-10': { level: 'senior', multiplier: 1.4, years: 8.5 },
  '10+': { level: 'staff', multiplier: 1.6, years: 12 },
  '15+': { level: 'principal', multiplier: 1.8, years: 17 }
}

// Market trends and insights
export const MARKET_TRENDS = {
  technology: {
    growth: 'high',
    demand: 'very high',
    remote_adoption: 'widespread',
    salary_growth: '5-7% annually',
    in_demand_skills: ['AI/ML', 'Cloud', 'Cybersecurity', 'DevOps']
  },
  finance: {
    growth: 'medium',
    demand: 'high',
    remote_adoption: 'moderate',
    salary_growth: '3-5% annually',
    in_demand_skills: ['FinTech', 'Blockchain', 'Quantitative Analysis']
  },
  healthcare: {
    growth: 'high',
    demand: 'very high',
    remote_adoption: 'growing',
    salary_growth: '4-6% annually',
    in_demand_skills: ['Telemedicine', 'Health Informatics', 'Medical AI']
  },
  default: {
    growth: 'medium',
    demand: 'medium',
    remote_adoption: 'increasing',
    salary_growth: '2-4% annually',
    in_demand_skills: ['Digital Transformation', 'Data Analysis']
  }
}

// Utility functions for salary calculations
export const SalaryCalculator = {
  /**
   * Calculate adjusted salary range based on multiple factors
   */
  calculateAdjustedRange(jobTitle, experience, location, industry, companySize = 'default') {
    const roleCategory = this.categorizeRole(jobTitle)
    const expLevel = this.getExperienceLevel(experience)
    const baseRange = this.getBaseRange(roleCategory, expLevel)
    
    const locationAdj = this.getLocationAdjustment(location)
    const industryAdj = this.getIndustryAdjustment(industry)
    const companyAdj = this.getCompanySizeAdjustment(companySize)
    
    // Calculate adjusted range
    const totalMultiplier = locationAdj.multiplier * industryAdj.multiplier * companyAdj.multiplier
    const adjustedMin = Math.round(baseRange.min * totalMultiplier)
    const adjustedMax = Math.round(baseRange.max * totalMultiplier)
    
    // Calculate combined confidence
    const confidence = (baseRange.confidence + locationAdj.confidence + 
                       industryAdj.confidence + companyAdj.confidence) / 4
    
    return {
      range: { min: adjustedMin, max: adjustedMax },
      confidence: Math.round(confidence * 100),
      adjustments: {
        location: locationAdj,
        industry: industryAdj,
        company: companyAdj,
        base: baseRange
      },
      metadata: {
        roleCategory,
        experienceLevel: expLevel,
        locationTier: locationAdj.tier,
        industryTrend: industryAdj.trend
      }
    }
  },

  /**
   * Categorize role into predefined categories
   */
  categorizeRole(jobTitle) {
    if (!jobTitle) return 'default'
    
    const title = jobTitle.toLowerCase()
    
    for (const [category, keywords] of Object.entries(ROLE_KEYWORDS)) {
      if (keywords.some(keyword => title.includes(keyword))) {
        return category
      }
    }
    
    return 'default'
  },

  /**
   * Get experience level from experience string
   */
  getExperienceLevel(experience) {
    if (!experience) return 'mid'
    
    const expKey = Object.keys(EXPERIENCE_LEVELS).find(key => 
      experience.toLowerCase().includes(key) || key === experience
    )
    
    return expKey ? EXPERIENCE_LEVELS[expKey].level : 'mid'
  },

  /**
   * Get base salary range for role category and experience level
   */
  getBaseRange(roleCategory, experienceLevel) {
    const categoryData = BASE_SALARY_RANGES[roleCategory] || BASE_SALARY_RANGES.default
    
    // Find the closest experience level match
    const levelKey = Object.keys(categoryData).find(key => 
      key === experienceLevel || 
      (experienceLevel === 'entry' && key === 'junior') ||
      (experienceLevel === 'staff' && key === 'senior')
    ) || 'mid'
    
    return categoryData[levelKey] || categoryData.mid || BASE_SALARY_RANGES.default.mid
  },

  /**
   * Get location adjustment data
   */
  getLocationAdjustment(location) {
    if (!location) return LOCATION_ADJUSTMENTS.default
    
    const normalizedLocation = location.toLowerCase().trim()
    
    // Exact match
    if (LOCATION_ADJUSTMENTS[normalizedLocation]) {
      return LOCATION_ADJUSTMENTS[normalizedLocation]
    }
    
    // Partial match
    for (const [key, value] of Object.entries(LOCATION_ADJUSTMENTS)) {
      if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
        return value
      }
    }
    
    // Remote detection
    if (normalizedLocation.includes('remote')) {
      return normalizedLocation.includes('global') ? 
        LOCATION_ADJUSTMENTS['remote global'] : 
        LOCATION_ADJUSTMENTS['remote us']
    }
    
    return LOCATION_ADJUSTMENTS.default
  },

  /**
   * Get industry adjustment data
   */
  getIndustryAdjustment(industry) {
    if (!industry) return INDUSTRY_MULTIPLIERS.default
    
    const normalizedIndustry = industry.toLowerCase().trim()
    
    // Exact match
    if (INDUSTRY_MULTIPLIERS[normalizedIndustry]) {
      return INDUSTRY_MULTIPLIERS[normalizedIndustry]
    }
    
    // Partial match
    for (const [key, value] of Object.entries(INDUSTRY_MULTIPLIERS)) {
      if (normalizedIndustry.includes(key) || key.includes(normalizedIndustry)) {
        return value
      }
    }
    
    return INDUSTRY_MULTIPLIERS.default
  },

  /**
   * Get company size adjustment
   */
  getCompanySizeAdjustment(companySize) {
    if (!companySize) return COMPANY_SIZE_ADJUSTMENTS.default
    
    const normalizedSize = companySize.toLowerCase().trim()
    return COMPANY_SIZE_ADJUSTMENTS[normalizedSize] || COMPANY_SIZE_ADJUSTMENTS.default
  },

  /**
   * Calculate salary percentile position
   */
  calculatePercentile(expectedSalary, marketRange) {
    if (!expectedSalary || !marketRange) return 50
    
    const salary = this.parseSalary(expectedSalary)
    const rangeWidth = marketRange.max - marketRange.min
    
    if (rangeWidth <= 0) return 50
    
    const position = ((salary - marketRange.min) / rangeWidth) * 100
    return Math.max(0, Math.min(100, Math.round(position)))
  },

  /**
   * Parse salary string to number
   */
  parseSalary(salaryString) {
    if (!salaryString) return 0
    if (typeof salaryString === 'number') return salaryString
    
    // Handle various formats: "$120,000", "120k", "120000", etc.
    const numeric = salaryString.toString().replace(/[^0-9.]/g, '')
    let amount = parseFloat(numeric) || 0
    
    // Handle k notation (e.g., 120k -> 120000)
    if (salaryString.toLowerCase().includes('k') && amount < 1000) {
      amount *= 1000
    }
    
    return amount
  },

  /**
   * Get market insights for negotiation
   */
  getMarketInsights(industry, location, roleCategory) {
    const industryTrends = MARKET_TRENDS[industry] || MARKET_TRENDS.default
    const locationData = this.getLocationAdjustment(location)
    
    return {
      industry: industryTrends,
      location: {
        tier: locationData.tier,
        costOfLiving: this.getCostOfLivingDescription(locationData.tier),
        demand: this.getLocationDemand(locationData.tier)
      },
      role: {
        category: roleCategory,
        demand: this.getRoleDemand(roleCategory)
      }
    }
  },

  /**
   * Get cost of living description
   */
  getCostOfLivingDescription(tier) {
    const descriptions = {
      1: 'Very High - Major metropolitan center',
      2: 'High - Growing tech hub',
      3: 'Moderate - Balanced cost of living',
      4: 'Low - Affordable metropolitan area'
    }
    return descriptions[tier] || 'Moderate - Balanced cost of living'
  },

  /**
   * Estimate location demand level
   */
  getLocationDemand(tier) {
    // Higher tiers generally have more competition but also more opportunities
    return tier <= 2 ? 'very high' : tier === 3 ? 'high' : 'moderate'
  },

  /**
   * Estimate role demand level
   */
  getRoleDemand(roleCategory) {
    const highDemand = ['engineering', 'product', 'data']
    return highDemand.includes(roleCategory) ? 'very high' : 'high'
  }
}

// Legacy export for backward compatibility
export const SALARY_DATA = {
  senior_engineer: BASE_SALARY_RANGES.engineering.senior,
  mid_level: BASE_SALARY_RANGES.engineering.mid,
  junior_engineer: BASE_SALARY_RANGES.engineering.junior,
  management: BASE_SALARY_RANGES.default.executive,
  intern: BASE_SALARY_RANGES.engineering.intern,
  default: BASE_SALARY_RANGES.default.mid
}
