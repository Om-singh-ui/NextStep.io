// nextstep.io/lib/utils/salary-calculator.js
import { SALARY_DATA } from '@/lib/constants/salary-data'

export function calculateMarketSalary(jobTitle, experienceLevel, location, industry) {
  try {
    // Normalize inputs for lookup
    const normalizedTitle = normalizeJobTitle(jobTitle)
    const normalizedLocation = normalizeLocation(location)
    const normalizedIndustry = normalizeIndustry(industry)
    
    // Get base salary data with fallback
    const baseData = SALARY_DATA[normalizedTitle] || SALARY_DATA.default
    
    if (!baseData || !baseData.range) {
      throw new Error('Invalid salary data structure')
    }

    // Apply experience multiplier
    const experienceMultiplier = getExperienceMultiplier(experienceLevel)
    let adjustedRange = {
      min: Math.round(baseData.range.min * experienceMultiplier),
      max: Math.round(baseData.range.max * experienceMultiplier)
    }
    
    // Apply location adjustment if provided
    if (normalizedLocation && baseData.location_adjustments) {
      const locationMultiplier = baseData.location_adjustments[normalizedLocation] || 1.0
      adjustedRange = {
        min: Math.round(adjustedRange.min * locationMultiplier),
        max: Math.round(adjustedRange.max * locationMultiplier)
      }
    }
    
    // Apply industry adjustment if provided
    if (normalizedIndustry && baseData.industry_adjustments) {
      const industryMultiplier = baseData.industry_adjustments[normalizedIndustry] || 1.0
      adjustedRange = {
        min: Math.round(adjustedRange.min * industryMultiplier),
        max: Math.round(adjustedRange.max * industryMultiplier)
      }
    }
    
    // Calculate percentile based on experience
    const percentile = calculatePercentile(experienceLevel)
    
    // Calculate confidence score based on available data
    const confidence = calculateConfidenceScore(normalizedTitle, normalizedLocation, normalizedIndustry)
    
    return {
      range: adjustedRange,
      percentile,
      confidence,
      location: normalizedLocation || baseData.location || 'US National Average',
      experienceLevel: experienceLevel || 'Not specified',
      industry: normalizedIndustry || baseData.industry || 'General',
      dataPoints: baseData.dataPoints || 100,
      sources: baseData.sources || ['industry_average'],
      lastUpdated: baseData.lastUpdated || new Date().toISOString()
    }
  } catch (error) {
    console.error('Salary calculation error:', error)
    // Return safe default values
    return getDefaultSalaryData(experienceLevel, location, industry)
  }
}

function normalizeJobTitle(title) {
  if (!title || typeof title !== 'string') return 'default'
  
  const lowerTitle = title.toLowerCase()
  
  // Engineering roles
  if (lowerTitle.includes('software') || lowerTitle.includes('developer') || lowerTitle.includes('engineer')) {
    if (lowerTitle.includes('senior') || lowerTitle.includes('sr') || lowerTitle.includes('lead') || lowerTitle.includes('iii')) {
      return 'senior_engineer'
    } else if (lowerTitle.includes('junior') || lowerTitle.includes('jr') || lowerTitle.includes('entry') || lowerTitle.includes('i')) {
      return 'junior_engineer'
    } else if (lowerTitle.includes('principal') || lowerTitle.includes('architect')) {
      return 'principal_engineer'
    } else {
      return 'mid_engineer'
    }
  }
  
  // Management roles
  if (lowerTitle.includes('manager') || lowerTitle.includes('director') || lowerTitle.includes('head of')) {
    if (lowerTitle.includes('senior') || lowerTitle.includes('sr')) {
      return 'senior_manager'
    } else if (lowerTitle.includes('vp') || lowerTitle.includes('vice president') || lowerTitle.includes('executive')) {
      return 'executive'
    } else {
      return 'manager'
    }
  }
  
  // Product roles
  if (lowerTitle.includes('product')) {
    if (lowerTitle.includes('manager')) {
      return 'product_manager'
    } else if (lowerTitle.includes('owner')) {
      return 'product_owner'
    }
  }
  
  // Design roles
  if (lowerTitle.includes('designer')) {
    return 'designer'
  }
  
  // Data roles
  if (lowerTitle.includes('data') || lowerTitle.includes('analyst')) {
    if (lowerTitle.includes('scientist')) {
      return 'data_scientist'
    } else if (lowerTitle.includes('engineer')) {
      return 'data_engineer'
    } else {
      return 'data_analyst'
    }
  }
  
  // Intern/Entry level
  if (lowerTitle.includes('intern') || lowerTitle.includes('student')) {
    return 'intern'
  }
  
  return 'mid_level'
}

function normalizeLocation(location) {
  if (!location || typeof location !== 'string') return null
  
  const lowerLocation = location.toLowerCase()
  
  const locationMap = {
    'san francisco': 'san_francisco',
    'sf': 'san_francisco',
    'new york': 'new_york',
    'nyc': 'new_york',
    'boston': 'boston',
    'seattle': 'seattle',
    'los angeles': 'los_angeles',
    'la': 'los_angeles',
    'austin': 'austin',
    'chicago': 'chicago',
    'denver': 'denver',
    'atlanta': 'atlanta',
    'miami': 'miami',
    'remote': 'remote',
    'us': 'us_national'
  }
  
  return locationMap[lowerLocation] || null
}

function normalizeIndustry(industry) {
  if (!industry || typeof industry !== 'string') return null
  
  const lowerIndustry = industry.toLowerCase()
  
  const industryMap = {
    'technology': 'technology',
    'tech': 'technology',
    'finance': 'finance',
    'financial': 'finance',
    'banking': 'finance',
    'healthcare': 'healthcare',
    'medical': 'healthcare',
    'biotech': 'biotech',
    'pharmaceutical': 'biotech',
    'consulting': 'consulting',
    'manufacturing': 'manufacturing',
    'retail': 'retail',
    'education': 'education',
    'nonprofit': 'nonprofit',
    'government': 'government'
  }
  
  return industryMap[lowerIndustry] || null
}

function getExperienceMultiplier(experienceLevel) {
  const multipliers = {
    '0-2': 0.7,   // Entry level
    '3-5': 1.0,   // Mid level
    '6-10': 1.4,  // Senior level
    '10+': 1.8    // Executive/Lead
  }
  return multipliers[experienceLevel] || 1.0
}

function calculatePercentile(experienceLevel) {
  const percentiles = {
    '0-2': 40,   // Lower percentile for entry level
    '3-5': 60,   // Middle percentile for mid level
    '6-10': 75,  // Higher percentile for senior
    '10+': 90    // Top percentile for executive
  }
  return percentiles[experienceLevel] || 50
}

function calculateConfidenceScore(jobTitle, location, industry) {
  let confidence = 70 // Base confidence
  
  // Increase confidence for common job titles
  const commonTitles = ['senior_engineer', 'mid_engineer', 'junior_engineer', 'manager']
  if (commonTitles.includes(jobTitle)) {
    confidence += 10
  }
  
  // Increase confidence for major locations
  const majorLocations = ['san_francisco', 'new_york', 'boston', 'seattle']
  if (majorLocations.includes(location)) {
    confidence += 10
  }
  
  // Increase confidence for major industries
  const majorIndustries = ['technology', 'finance', 'healthcare']
  if (majorIndustries.includes(industry)) {
    confidence += 10
  }
  
  return Math.min(95, confidence)
}

function getDefaultSalaryData(experienceLevel, location, industry) {
  const baseRanges = {
    '0-2': { min: 50000, max: 80000 },
    '3-5': { min: 70000, max: 110000 },
    '6-10': { min: 90000, max: 150000 },
    '10+': { min: 120000, max: 200000 }
  }
  
  const range = baseRanges[experienceLevel] || { min: 60000, max: 100000 }
  
  // Apply basic location adjustments
  let adjustedRange = { ...range }
  if (location) {
    const locationMultiplier = getLocationMultiplier(location)
    adjustedRange = {
      min: Math.round(adjustedRange.min * locationMultiplier),
      max: Math.round(adjustedRange.max * locationMultiplier)
    }
  }
  
  return {
    range: adjustedRange,
    percentile: 50,
    confidence: 50,
    location: location || 'US National Average',
    experienceLevel: experienceLevel || 'Not specified',
    industry: industry || 'General',
    dataPoints: 50,
    sources: ['fallback_estimates'],
    lastUpdated: new Date().toISOString()
  }
}

function getLocationMultiplier(location) {
  const multipliers = {
    'san_francisco': 1.4,
    'new_york': 1.35,
    'boston': 1.25,
    'seattle': 1.2,
    'los_angeles': 1.15,
    'austin': 1.1,
    'chicago': 1.05,
    'denver': 1.0,
    'atlanta': 0.95,
    'miami': 0.9,
    'remote': 0.95,
    'us_national': 1.0
  }
  return multipliers[location] || 1.0
}

export function isSalaryReasonable(offer, expected, marketRange) {
  if (!offer || !marketRange) {
    return { 
      reasonable: true, 
      reason: 'Insufficient data for comparison',
      confidence: 0 
    }
  }
  
  const offerAmount = parseSalary(offer)
  const expectedAmount = parseSalary(expected)
  const marketMin = marketRange.min
  const marketMax = marketRange.max
  
  if (offerAmount < marketMin * 0.8) {
    return {
      reasonable: false,
      reason: 'Offer is significantly below market range',
      difference: marketMin - offerAmount,
      percentage: Math.round(((marketMin - offerAmount) / marketMin) * 100),
      confidence: 80
    }
  }
  
  if (offerAmount > marketMax * 1.2) {
    return {
      reasonable: false,
      reason: 'Offer is unusually high for market range',
      difference: offerAmount - marketMax,
      percentage: Math.round(((offerAmount - marketMax) / marketMax) * 100),
      confidence: 75
    }
  }
  
  // Check if expected salary is reasonable
  if (expectedAmount && expectedAmount > marketMax * 1.3) {
    return {
      reasonable: true, // Offer is reasonable
      expectedUnreasonable: true,
      reason: 'Offer is reasonable but your expected salary is above typical market range',
      confidence: 70
    }
  }
  
  return {
    reasonable: true,
    reason: 'Offer is within reasonable market range',
    confidence: 85
  }
}

export function parseSalary(salaryString) {
  if (!salaryString) return 0
  if (typeof salaryString === 'number') return salaryString
  
  // Handle various salary formats: "$100,000", "100k", "100000", etc.
  const match = salaryString.toString().match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(k|K)?/)
  if (!match) return 0
  
  let amount = parseFloat(match[1].replace(/,/g, ''))
  if (match[2]) {
    amount *= 1000 // Handle "k" suffix
  }
  
  return amount
}

export function formatSalary(amount) {
  if (typeof amount === 'string') {
    return amount // Already formatted
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount || 0)
}

export function calculateSalaryIncrease(current, expected) {
  const currentAmount = parseSalary(current)
  const expectedAmount = parseSalary(expected)
  
  if (!currentAmount || !expectedAmount || currentAmount === 0) {
    return null
  }
  
  const increase = expectedAmount - currentAmount
  const percentage = (increase / currentAmount) * 100
  
  return {
    amount: increase,
    percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal
    isIncrease: increase > 0,
    isDecrease: increase < 0
  }
}

export function getSalaryRecommendation(current, marketRange, experience) {
  const currentAmount = parseSalary(current)
  const marketMid = (marketRange.min + marketRange.max) / 2
  
  if (!currentAmount) {
    return {
      recommendation: 'aim_mid',
      target: Math.round(marketMid),
      reason: 'Based on market average for your experience level'
    }
  }
  
  if (currentAmount < marketRange.min * 0.9) {
    return {
      recommendation: 'significant_increase',
      target: Math.round(marketMid),
      reason: 'Your current salary is below market range',
      increase: Math.round(marketMid - currentAmount),
      percentage: Math.round(((marketMid - currentAmount) / currentAmount) * 100)
    }
  }
  
  if (currentAmount < marketMid) {
    return {
      recommendation: 'moderate_increase',
      target: Math.round(marketMid * 1.1),
      reason: 'Aim for above market average based on your qualifications',
      increase: Math.round(marketMid * 1.1 - currentAmount),
      percentage: Math.round(((marketMid * 1.1 - currentAmount) / currentAmount) * 100)
    }
  }
  
  return {
    recommendation: 'maintain_or_negotiate',
    target: Math.round(marketRange.max),
    reason: 'You are already at or above market average',
    increase: Math.round(marketRange.max - currentAmount),
    percentage: Math.round(((marketRange.max - currentAmount) / currentAmount) * 100)
  }
}

// Named export object to avoid ESLint error
const SalaryCalculator = {
  calculateMarketSalary,
  isSalaryReasonable,
  parseSalary,
  formatSalary,
  calculateSalaryIncrease,
  getSalaryRecommendation
}

export default SalaryCalculator