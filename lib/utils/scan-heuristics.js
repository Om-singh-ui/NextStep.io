// nextstep.io/lib/utils/scan-heuristics.js
import { RISK_SIGNALS } from '@/lib/constants/risk-signals'
import { analyzeTextForRiskSignals } from './score-calculator'

export function analyzeRiskFactors(text) {
  console.log('Analyzing risk factors for text length:', text?.length)
  
  if (!text || typeof text !== 'string') {
    return {
      riskFlags: [],
      evidence: [],
      heuristicScore: 50
    }
  }

  const { riskFlags, evidence } = analyzeTextForRiskSignals(text)
  
  // Additional heuristic analysis
  const additionalFlags = analyzeAdditionalHeuristics(text)
  const additionalEvidence = analyzePositiveIndicators(text)
  
  const result = {
    riskFlags: [...riskFlags, ...additionalFlags],
    evidence: [...evidence, ...additionalEvidence],
    heuristicScore: calculateHeuristicScore([...riskFlags, ...additionalFlags], [...evidence, ...additionalEvidence])
  }

  console.log('Heuristic analysis completed:', {
    riskFlags: result.riskFlags.length,
    evidence: result.evidence.length,
    score: result.heuristicScore
  })
  
  return result
}

function analyzeAdditionalHeuristics(text) {
  const flags = []
  const lowerText = text.toLowerCase()
  
  // Company information analysis
  if (!hasCompanyInformation(text)) {
    flags.push({
      signal: 'Missing company information',
      severity: 'medium',
      context: 'No clear company name, address, or website provided'
    })
  }
  
  // Contact information analysis
  if (!hasProfessionalContact(text)) {
    flags.push({
      signal: 'Unprofessional contact information',
      severity: 'medium',
      context: 'Uses generic email domains or lacks professional contact details'
    })
  }
  
  // Salary analysis
  if (hasUnrealisticSalary(text)) {
    flags.push({
      signal: 'Unrealistic salary offering',
      severity: 'high',
      context: 'Salary seems too high for the position or experience level'
    })
  }
  
  // Urgency analysis
  if (hasUrgencyLanguage(text)) {
    flags.push({
      signal: 'Urgent hiring language',
      severity: 'medium',
      context: 'Uses pressure tactics like "immediate hiring" or "limited time"'
    })
  }
  
  return flags
}

function analyzePositiveIndicators(text) {
  const evidence = []
  
  if (hasDetailedJobDescription(text)) {
    evidence.push({
      type: 'positive',
      signal: 'Detailed job description',
      context: 'Comprehensive requirements and responsibilities listed'
    })
  }
  
  if (hasProfessionalBenefits(text)) {
    evidence.push({
      type: 'positive',
      signal: 'Professional benefits package',
      context: 'Includes standard corporate benefits and perks'
    })
  }
  
  if (hasClearApplicationProcess(text)) {
    evidence.push({
      type: 'positive',
      signal: 'Clear application process',
      context: 'Structured and professional application instructions'
    })
  }
  
  return evidence
}

function hasCompanyInformation(text) {
  const companyIndicators = [
    /incorporated|inc\.?/i,
    /corporation|corp\.?/i,
    /llc|limited liability company/i,
    /established in/i,
    /headquarters/i,
    /corporate office/i
  ]
  return companyIndicators.some(indicator => indicator.test(text))
}

function hasProfessionalContact(text) {
  const professionalDomains = [
    /@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\.com/i,
    /careers@/i,
    /hr@/i,
    /jobs@/i,
    /recruiting@/i
  ]
  return professionalDomains.some(domain => domain.test(text))
}

function hasUnrealisticSalary(text) {
  const salaryPattern = /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:-|\sto\s)\s*\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/gi
  const matches = [...text.matchAll(salaryPattern)]
  
  for (const match of matches) {
    const minSalary = parseInt(match[1].replace(/[$,]/g, ''))
    const maxSalary = parseInt(match[2].replace(/[$,]/g, ''))
    
    // Check if salary seems unrealistic for typical jobs
    if (minSalary > 200000 || maxSalary > 500000) {
      return true
    }
  }
  
  return false
}

function hasUrgencyLanguage(text) {
  const urgencyWords = [
    'immediate',
    'urgent',
    'asap',
    'right away',
    'limited time',
    'apply now',
    'immediate start',
    'quick hiring'
  ]
  return urgencyWords.some(word => text.toLowerCase().includes(word))
}

function hasDetailedJobDescription(text) {
  const sections = ['requirements', 'responsibilities', 'qualifications', 'experience needed']
  return sections.some(section => text.toLowerCase().includes(section))
}

function hasProfessionalBenefits(text) {
  const benefits = [
    'health insurance',
    'dental insurance',
    'vision insurance',
    '401k',
    'retirement plan',
    'paid time off',
    'vacation days',
    'professional development'
  ]
  return benefits.some(benefit => text.toLowerCase().includes(benefit))
}

function hasClearApplicationProcess(text) {
  const processIndicators = [
    'submit resume',
    'apply online',
    'cover letter',
    'portfolio',
    'references',
    'interview process'
  ]
  return processIndicators.some(indicator => text.toLowerCase().includes(indicator))
}

function calculateHeuristicScore(riskFlags, positiveEvidence) {
  let score = 50
  
  // Deduct points for risk flags
  riskFlags.forEach(flag => {
    if (flag.severity === 'high') score -= 15
    else if (flag.severity === 'medium') score -= 8
    else if (flag.severity === 'low') score -= 3
  })
  
  // Add points for positive evidence
  positiveEvidence.forEach(evidence => {
    if (evidence.type === 'positive') {
      score += 10
    }
  })
  
  return Math.max(0, Math.min(100, score))
}