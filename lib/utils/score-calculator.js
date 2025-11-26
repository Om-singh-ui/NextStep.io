// nextstep.io/lib/utils/score-calculator.js
import { RISK_SIGNALS } from '@/lib/constants/risk-signals'

/**
 * Calculate authenticity score combining AI analysis and heuristic analysis
 * @param {Object} aiAnalysis - Analysis from AI agent
 * @param {Object} heuristicAnalysis - Analysis from heuristic rules
 * @returns {number} Score from 0-100
 */
export function calculateAuthenticityScore(aiAnalysis, heuristicAnalysis) {
  // Start with neutral score
  let score = 50

  // AI analysis weight: 60%
  if (aiAnalysis.aiScore && !isNaN(aiAnalysis.aiScore)) {
    const aiContribution = (aiAnalysis.aiScore - 50) * 0.6
    score += aiContribution
  }

  // Heuristic analysis weight: 40%
  const heuristicScore = calculateHeuristicScore(heuristicAnalysis)
  const heuristicContribution = (heuristicScore - 50) * 0.4
  score += heuristicContribution

  // Confidence adjustment from AI
  if (aiAnalysis.confidence && !isNaN(aiAnalysis.confidence)) {
    const confidenceFactor = aiAnalysis.confidence / 100
    score = 50 + (score - 50) * confidenceFactor
  }

  // Apply final bounds and rounding
  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Calculate heuristic score based on risk flags and evidence
 * @param {Object} heuristicAnalysis - Heuristic analysis object
 * @returns {number} Score from 0-100
 */
function calculateHeuristicScore(heuristicAnalysis) {
  let score = 50
  const { riskFlags = [], evidence = [] } = heuristicAnalysis

  // High risk flags heavily penalize score
  const highRiskCount = riskFlags.filter(flag => flag.severity === 'high').length
  score -= highRiskCount * 15

  // Medium risk flags moderately penalize score
  const mediumRiskCount = riskFlags.filter(flag => flag.severity === 'medium').length
  score -= mediumRiskCount * 8

  // Low risk flags slightly penalize score
  const lowRiskCount = riskFlags.filter(flag => flag.severity === 'low').length
  score -= lowRiskCount * 3

  // Positive evidence improves score
  const positiveEvidence = evidence.filter(ev => ev.type === 'positive').length
  score += positiveEvidence * 8

  // Negative evidence (risk) from evidence array
  const negativeEvidence = evidence.filter(ev => ev.type === 'risk').length
  score -= negativeEvidence * 6

  // Apply diminishing returns for extreme counts
  score = applyDiminishingReturns(score, highRiskCount, 'penalty')
  score = applyDiminishingReturns(score, positiveEvidence, 'bonus')

  return Math.max(0, Math.min(100, score))
}

/**
 * Apply diminishing returns for multiple flags/evidence
 * @param {number} currentScore - Current score
 * @param {number} count - Number of items
 * @param {string} type - 'bonus' or 'penalty'
 * @returns {number} Adjusted score
 */
function applyDiminishingReturns(currentScore, count, type) {
  if (count <= 3) return currentScore

  const excess = count - 3
  const reductionFactor = Math.min(0.7, excess * 0.1) // Max 30% reduction

  if (type === 'penalty') {
    return currentScore * (1 + reductionFactor) // Reduce penalty impact
  } else {
    return currentScore * (1 - reductionFactor) // Reduce bonus impact
  }
}

/**
 * Analyze text for risk signals and evidence
 * @param {string} text - Job posting text to analyze
 * @returns {Object} Object containing riskFlags and evidence arrays
 */
export function analyzeTextForRiskSignals(text) {
  if (!text || typeof text !== 'string') {
    return { riskFlags: [], evidence: [] }
  }

  const lowerText = text.toLowerCase()
  const riskFlags = []
  const evidence = []

  // Check for high risk signals
  RISK_SIGNALS.HIGH_RISK.forEach(signal => {
    const matches = findSignalMatches(lowerText, signal)
    matches.forEach(match => {
      riskFlags.push({
        signal: match.matchedText,
        severity: 'high',
        context: extractContext(text, match.index, match.matchedText),
        confidence: match.confidence
      })
    })
  })

  // Check for medium risk signals
  RISK_SIGNALS.MEDIUM_RISK.forEach(signal => {
    const matches = findSignalMatches(lowerText, signal)
    matches.forEach(match => {
      riskFlags.push({
        signal: match.matchedText,
        severity: 'medium',
        context: extractContext(text, match.index, match.matchedText),
        confidence: match.confidence
      })
    })
  })

  // Check for positive signals
  RISK_SIGNALS.POSITIVE_SIGNALS.forEach(signal => {
    const matches = findSignalMatches(lowerText, signal)
    matches.forEach(match => {
      evidence.push({
        type: 'positive',
        signal: match.matchedText,
        context: extractContext(text, match.index, match.matchedText),
        confidence: match.confidence
      })
    })
  })

  // Additional heuristic checks
  const additionalFlags = performAdvancedHeuristics(text)
  riskFlags.push(...additionalFlags)

  // Remove duplicates based on signal text
  const uniqueRiskFlags = removeDuplicateFlags(riskFlags)
  const uniqueEvidence = removeDuplicateEvidence(evidence)

  return {
    riskFlags: uniqueRiskFlags,
    evidence: uniqueEvidence,
    summary: generateHeuristicSummary(uniqueRiskFlags, uniqueEvidence)
  }
}

/**
 * Find all matches of a signal in text with confidence scoring
 * @param {string} text - Text to search
 * @param {string} signal - Signal to find
 * @returns {Array} Array of match objects
 */
function findSignalMatches(text, signal) {
  const matches = []
  const signalWords = signal.toLowerCase().split(/\s+/)
  const textWords = text.split(/\s+/)
  
  for (let i = 0; i <= textWords.length - signalWords.length; i++) {
    let matchCount = 0
    for (let j = 0; j < signalWords.length; j++) {
      if (textWords[i + j].includes(signalWords[j])) {
        matchCount++
      }
    }
    
    const confidence = matchCount / signalWords.length
    if (confidence >= 0.7) { // 70% match threshold
      const matchedText = textWords.slice(i, i + signalWords.length).join(' ')
      matches.push({
        matchedText,
        index: i,
        confidence
      })
    }
  }
  
  return matches
}

/**
 * Extract context around a matched signal
 * @param {string} text - Full text
 * @param {number} wordIndex - Index of the match
 * @param {string} matchedText - The matched text
 * @param {number} wordsAround - Number of words to include around match
 * @returns {string} Context string
 */
function extractContext(text, wordIndex, matchedText, wordsAround = 10) {
  const words = text.split(/\s+/)
  const start = Math.max(0, wordIndex - wordsAround)
  const end = Math.min(words.length, wordIndex + matchedText.split(/\s+/).length + wordsAround)
  
  let context = words.slice(start, end).join(' ')
  
  // Highlight the matched text
  context = context.replace(
    new RegExp(matchedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    match => `**${match}**`
  )
  
  return context
}

/**
 * Perform advanced heuristic analysis beyond simple pattern matching
 * @param {string} text - Job posting text
 * @returns {Array} Additional risk flags
 */
function performAdvancedHeuristics(text) {
  const flags = []
  const lowerText = text.toLowerCase()

  // Check for poor grammar and spelling
  const grammarScore = analyzeGrammarQuality(text)
  if (grammarScore < 0.6) {
    flags.push({
      signal: 'Poor grammar and spelling',
      severity: 'medium',
      context: `Grammar quality score: ${Math.round(grammarScore * 100)}%`,
      confidence: 0.8
    })
  }

  // Check for excessive urgency
  const urgencyScore = analyzeUrgencyLanguage(lowerText)
  if (urgencyScore > 0.7) {
    flags.push({
      signal: 'Excessive urgency language',
      severity: 'medium',
      context: 'Uses pressure tactics in hiring language',
      confidence: 0.75
    })
  }

  // Check for vague job description
  const vaguenessScore = analyzeVagueness(text)
  if (vaguenessScore > 0.6) {
    flags.push({
      signal: 'Vague job description',
      severity: 'medium',
      context: 'Lacks specific details about role and requirements',
      confidence: 0.7
    })
  }

  // Check for contact information quality
  const contactQuality = analyzeContactInformation(text)
  if (contactQuality === 'unprofessional') {
    flags.push({
      signal: 'Unprofessional contact information',
      severity: 'high',
      context: 'Uses generic email domains or suspicious contact methods',
      confidence: 0.85
    })
  }

  // Check for salary realism
  const salaryRealism = analyzeSalaryRealism(text)
  if (salaryRealism === 'unrealistic') {
    flags.push({
      signal: 'Unrealistic salary offering',
      severity: 'high',
      context: 'Salary seems too high for position or includes unrealistic promises',
      confidence: 0.8
    })
  }

  return flags
}

/**
 * Analyze grammar quality of the text
 * @param {string} text - Text to analyze
 * @returns {number} Grammar quality score 0-1
 */
function analyzeGrammarQuality(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  if (sentences.length === 0) return 0

  let qualityScore = 0
  const checks = []

  // Check average sentence length (reasonable is 15-25 words)
  const avgSentenceLength = text.split(/\s+/).length / sentences.length
  checks.push(avgSentenceLength >= 10 && avgSentenceLength <= 30 ? 1 : 0.5)

  // Check for common spelling errors (simplified)
  const commonErrors = [
    /recieve/gi,
    /seperate/gi,
    /definately/gi,
    /accomodate/gi,
    /occured/gi
  ]
  const errorCount = commonErrors.filter(pattern => pattern.test(text)).length
  checks.push(Math.max(0, 1 - (errorCount / sentences.length)))

  // Check for proper capitalization in sentences
  const properCapitalization = sentences.filter(s => 
    /^[A-Z]/.test(s.trim())
  ).length / sentences.length
  checks.push(properCapitalization)

  // Calculate overall score
  qualityScore = checks.reduce((sum, check) => sum + check, 0) / checks.length
  return qualityScore
}

/**
 * Analyze urgency language in the text
 * @param {string} text - Lowercase text
 * @returns {number} Urgency score 0-1
 */
function analyzeUrgencyLanguage(text) {
  const urgencyPhrases = [
    'immediate start',
    'start immediately',
    'urgent hiring',
    'apply now',
    'limited time',
    'hiring immediately',
    'quick hiring',
    'asap',
    'right away',
    'don\'t wait'
  ]

  let urgencyCount = 0
  urgencyPhrases.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    const matches = text.match(regex)
    if (matches) urgencyCount += matches.length
  })

  // Normalize by text length (words)
  const wordCount = text.split(/\s+/).length
  return Math.min(1, urgencyCount / (wordCount / 100)) // Count per 100 words
}

/**
 * Analyze vagueness of job description
 * @param {string} text - Job description text
 * @returns {number} Vagueness score 0-1
 */
function analyzeVagueness(text) {
  const vaguePhrases = [
    'great opportunity',
    'amazing chance',
    'work with great team',
    'exciting role',
    'dynamic environment',
    'fast-paced',
    'other duties as assigned',
    'various tasks',
    'multiple responsibilities'
  ]

  let vagueCount = 0
  const lowerText = text.toLowerCase()
  
  vaguePhrases.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    const matches = lowerText.match(regex)
    if (matches) vagueCount += matches.length
  })

  // Check for lack of specific requirements
  const specificIndicators = [
    'years of experience',
    'degree in',
    'proficiency in',
    'knowledge of',
    'experience with',
    'skills in',
    'certification in'
  ]

  let specificCount = 0
  specificIndicators.forEach(indicator => {
    const regex = new RegExp(indicator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    const matches = lowerText.match(regex)
    if (matches) specificCount += matches.length
  })

  const wordCount = text.split(/\s+/).length
  const vagueDensity = vagueCount / (wordCount / 100)
  const specificDensity = specificCount / (wordCount / 100)

  // Higher score means more vague
  return Math.min(1, vagueDensity / (specificDensity + 1))
}

/**
 * Analyze contact information quality
 * @param {string} text - Job posting text
 * @returns {string} Quality rating: 'professional', 'mixed', 'unprofessional'
 */
function analyzeContactInformation(text) {
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
  const emails = text.match(emailPattern) || []

  if (emails.length === 0) return 'unprofessional'

  const professionalDomains = emails.filter(email => 
    !email.toLowerCase().includes('gmail.com') &&
    !email.toLowerCase().includes('yahoo.com') &&
    !email.toLowerCase().includes('hotmail.com') &&
    !email.toLowerCase().includes('outlook.com')
  )

  const professionalRatio = professionalDomains.length / emails.length

  if (professionalRatio >= 0.8) return 'professional'
  if (professionalRatio >= 0.5) return 'mixed'
  return 'unprofessional'
}

/**
 * Analyze salary realism
 * @param {string} text - Job posting text
 * @returns {string} Realism rating: 'realistic', 'questionable', 'unrealistic'
 */
function analyzeSalaryRealism(text) {
  const salaryPatterns = [
    /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:-|\sto\s)\s*\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/gi,
    /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:per\syear|annually|yearly)/gi,
    /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:k|K)\s*(?:per\syear|annually)/gi
  ]

  let maxSalary = 0
  let hasUnrealisticPromises = false

  // Check for unrealistic earnings promises
  const unrealisticPhrases = [
    'earn up to',
    'make \$1000 daily',
    'unlimited earning potential',
    'get rich quick',
    'financial freedom',
    'passive income'
  ]

  unrealisticPhrases.forEach(phrase => {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      hasUnrealisticPromises = true
    }
  })

  // Extract salary numbers
  salaryPatterns.forEach(pattern => {
    const matches = [...text.matchAll(pattern)]
    matches.forEach(match => {
      const numbers = match.slice(1).filter(Boolean).map(num => {
        let cleanNum = num.replace(/[$,]/g, '')
        if (cleanNum.toLowerCase().includes('k')) {
          cleanNum = cleanNum.replace(/k/gi, '')
          return parseFloat(cleanNum) * 1000
        }
        return parseFloat(cleanNum)
      }).filter(num => !isNaN(num))

      const currentMax = Math.max(...numbers, 0)
      maxSalary = Math.max(maxSalary, currentMax)
    })
  })

  if (hasUnrealisticPromises) return 'unrealistic'
  if (maxSalary > 300000) return 'questionable' // Very high salaries
  if (maxSalary > 500000) return 'unrealistic' // Extremely high salaries
  
  return 'realistic'
}

/**
 * Remove duplicate risk flags based on signal text
 * @param {Array} flags - Risk flags array
 * @returns {Array} Unique risk flags
 */
function removeDuplicateFlags(flags) {
  const seen = new Set()
  return flags.filter(flag => {
    const key = `${flag.signal}-${flag.severity}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

/**
 * Remove duplicate evidence based on signal text
 * @param {Array} evidence - Evidence array
 * @returns {Array} Unique evidence
 */
function removeDuplicateEvidence(evidence) {
  const seen = new Set()
  return evidence.filter(ev => {
    const key = `${ev.signal}-${ev.type}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

/**
 * Generate heuristic analysis summary
 * @param {Array} riskFlags - Risk flags array
 * @param {Array} evidence - Evidence array
 * @returns {string} Summary text
 */
function generateHeuristicSummary(riskFlags, evidence) {
  const highRiskCount = riskFlags.filter(f => f.severity === 'high').length
  const mediumRiskCount = riskFlags.filter(f => f.severity === 'medium').length
  const positiveCount = evidence.filter(e => e.type === 'positive').length

  if (highRiskCount > 0) {
    return `High risk detected with ${highRiskCount} critical issues. Exercise extreme caution.`
  } else if (mediumRiskCount > 2) {
    return `Multiple concerns identified (${mediumRiskCount} medium risk factors). Verify carefully.`
  } else if (positiveCount > mediumRiskCount) {
    return `Generally positive indicators with ${positiveCount} legitimate signals.`
  } else if (riskFlags.length === 0 && evidence.length === 0) {
    return 'Limited signals detected. Manual review recommended.'
  } else {
    return 'Mixed signals detected. Further verification advised.'
  }
}

/**
 * Get risk level based on score
 * @param {number} score - Authenticity score 0-100
 * @returns {string} Risk level
 */
export function getRiskLevel(score) {
  if (score >= 80) return 'Low'
  if (score >= 60) return 'Medium'
  if (score >= 40) return 'High'
  return 'Very High'
}

/**
 * Get confidence level based on analysis consistency
 * @param {Object} aiAnalysis - AI analysis
 * @param {Object} heuristicAnalysis - Heuristic analysis
 * @returns {number} Confidence percentage
 */
export function calculateConfidenceLevel(aiAnalysis, heuristicAnalysis) {
  let confidence = 80 // Base confidence

  // Increase confidence if analyses agree
  const aiScore = aiAnalysis.aiScore || 50
  const heuristicScore = calculateHeuristicScore(heuristicAnalysis)
  const scoreDifference = Math.abs(aiScore - heuristicScore)

  if (scoreDifference < 20) {
    confidence += 10 // Strong agreement
  } else if (scoreDifference > 40) {
    confidence -= 15 // Significant disagreement
  }

  // Adjust based on evidence quantity
  const totalEvidence = heuristicAnalysis.evidence.length + heuristicAnalysis.riskFlags.length
  if (totalEvidence > 10) {
    confidence += 5 // Lots of data points
  } else if (totalEvidence < 3) {
    confidence -= 10 // Limited data
  }

  return Math.max(30, Math.min(95, confidence))
}

const scoreCalculator = {
  calculateAuthenticityScore,
  analyzeTextForRiskSignals,
  getRiskLevel,
  calculateConfidenceLevel,
}

export default scoreCalculator