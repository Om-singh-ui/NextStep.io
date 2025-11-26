// nextstep.io/lib/actions/scan-job.js
"use server"

import { validateScanInput } from "@/lib/validations/scan"
import { extractTextFromInput } from "@/lib/utils/text-extractor"
import { scanJobWithAI } from "@/lib/ai/scan-agent"
import { calculateAuthenticityScore } from "@/lib/utils/score-calculator"
import { analyzeRiskFactors } from "@/lib/utils/scan-heuristics"

// Cache for company recognition to avoid repeated processing
const companyCache = new Map()
const SCAN_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function scanJob(inputData) {
  const startTime = Date.now()
  const scanId = `scan_${startTime}_${Math.random().toString(36).substr(2, 9)}`
  
  try {
    console.log(`🔍 [${scanId}] Starting scan job with input type:`, inputData?.type)
    
    if (!inputData) {
      throw new Error('No input data provided')
    }

    // Check cache for identical input
    const cacheKey = generateCacheKey(inputData)
    const cachedResult = await getCachedResult(cacheKey)
    if (cachedResult) {
      console.log(`⚡ [${scanId}] Returning cached result`)
      return { ...cachedResult, cached: true, scanId }
    }

    // Validate input with enhanced validation
    const validation = await validateScanInput(inputData)
    if (!validation.success) {
      throw new Error(validation.error || 'Input validation failed')
    }

    console.log(`✅ [${scanId}] Input validation passed`)
    
    // Extract text with improved error handling
    const extractedText = await extractTextFromInput(inputData)
    
    if (!extractedText || extractedText.trim().length < 15) {
      throw new Error('Unable to extract sufficient text from the provided input')
    }

    console.log(`📝 [${scanId}] Text extraction completed, length:`, extractedText.length)
    
    // Parallel processing for better performance
    console.log(`🚀 [${scanId}] Starting parallel analysis...`)
    const [aiAnalysis, heuristicAnalysis] = await Promise.allSettled([
      scanJobWithAI(extractedText),
      analyzeRiskFactors(extractedText)
    ])

    // Handle analysis results with enhanced fallbacks
    const aiResult = aiAnalysis.status === 'fulfilled' ? aiAnalysis.value : await handleAIFailure(extractedText)
    const heuristicResult = heuristicAnalysis.status === 'fulfilled' ? heuristicAnalysis.value : await handleHeuristicFailure(extractedText)

    // Calculate final score with enhanced weighting
    console.log(`🎯 [${scanId}] Calculating final score...`)
    const finalScore = calculateAuthenticityScore(aiResult, heuristicResult)
    
    // Generate comprehensive result
    const result = await buildScanResult({
      scanId,
      finalScore,
      aiAnalysis: aiResult,
      heuristicAnalysis: heuristicResult,
      extractedText
    })

    // Cache successful result
    await cacheResult(cacheKey, result)

    const duration = Date.now() - startTime
    console.log(`✅ [${scanId}] Scan completed in ${duration}ms:`, { 
      score: finalScore, 
      riskLevel: result.riskLevel,
      confidence: result.confidence
    })
    
    return result
    
  } catch (error) {
    console.error(`❌ [${scanId}] Scan job error:`, error)
    
    // Return error result with scanId for tracking
    return {
      scanId,
      error: true,
      message: `Scan failed: ${error.message}`,
      authenticityScore: 0,
      riskLevel: 'Very High',
      recommendations: ['Please try again with different input', 'Verify the job posting manually'],
      timestamp: new Date().toISOString()
    }
  }
}

// Enhanced helper functions
async function buildScanResult({ scanId, finalScore, aiAnalysis, heuristicAnalysis, extractedText }) {
  const riskLevel = await getEnhancedRiskLevel(finalScore, aiAnalysis, heuristicAnalysis)
  const confidence = calculateEnhancedConfidence(aiAnalysis, heuristicAnalysis)
  
  const result = {
    scanId,
    authenticityScore: finalScore,
    riskLevel,
    jobDetails: await extractEnhancedJobDetails(extractedText, aiAnalysis, heuristicAnalysis),
    evidence: [
      ...(aiAnalysis.evidence || []), 
      ...(heuristicAnalysis.evidence || [])
    ],
    recommendations: getContextualRecommendations(finalScore, aiAnalysis, heuristicAnalysis),
    strategyTips: getContextualStrategyTips(finalScore, aiAnalysis, heuristicAnalysis),
    confidence,
    riskFlags: [...(aiAnalysis.riskFlags || []), ...(heuristicAnalysis.riskFlags || [])],
    summary: generateEnhancedSummary(finalScore, aiAnalysis, heuristicAnalysis),
    analysisMetadata: {
      aiConfidence: aiAnalysis.confidence,
      heuristicScore: heuristicAnalysis.heuristicScore,
      ragContext: aiAnalysis.ragContext,
      processingTime: Date.now() - parseInt(scanId.split('_')[1])
    },
    timestamp: new Date().toISOString()
  }

  // Add RAG context if available with safe property access
  if (aiAnalysis.ragContext) {
    result.ragInsights = {
      detectedCompanies: aiAnalysis.ragContext.companies || aiAnalysis.ragContext.detectedCompanies || [],
      scamPatterns: aiAnalysis.ragContext.scams || aiAnalysis.ragContext.detectedScams || [],
      professionalSignals: aiAnalysis.ragContext.professionalSignals || []
    }
  }

  return result
}

async function getEnhancedRiskLevel(score, aiAnalysis, heuristicAnalysis) {
  // Consider RAG context for risk assessment with safe property access
  const ragContext = aiAnalysis.ragContext || {}
  const companies = ragContext.companies || ragContext.detectedCompanies || []
  const scams = ragContext.scams || ragContext.detectedScams || []

  if (companies.some(c => c.type === 'tech_giant')) {
    return 'Very Low'
  }

  if (scams.some(s => (s.scorePenalty || s.riskScore || 0) <= -30)) {
    return 'Very High'
  }

  // Enhanced scoring with confidence consideration
  const confidence = calculateEnhancedConfidence(aiAnalysis, heuristicAnalysis)
  const adjustedScore = confidence >= 80 ? score : score - (100 - confidence) / 10

  if (adjustedScore >= 85) return 'Very Low'
  if (adjustedScore >= 70) return 'Low'
  if (adjustedScore >= 55) return 'Medium'
  if (adjustedScore >= 40) return 'High'
  return 'Very High'
}

async function extractEnhancedJobDetails(text, aiAnalysis, heuristicAnalysis) {
  // Prefer AI-extracted details, fallback to enhanced heuristic extraction
  if (aiAnalysis.jobDetails && Object.values(aiAnalysis.jobDetails).some(v => v && v !== 'Unknown')) {
    return aiAnalysis.jobDetails
  }

  return {
    title: extractJobTitle(text),
    company: extractCompany(text),
    location: extractLocation(text),
    salary: extractSalary(text),
    employmentType: extractEmploymentType(text),
    experienceLevel: extractExperienceLevel(text)
  }
}

function extractEmploymentType(text) {
  const patterns = {
    'Full-time': /full.?time|ft|permanent/gi,
    'Part-time': /part.?time|pt/gi,
    'Contract': /contract|freelance|consultant/gi,
    'Internship': /internship|intern/gi
  }

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) return type
  }

  return 'Not specified'
}

function extractExperienceLevel(text) {
  const patterns = {
    'Entry-level': /entry.?(level|position)|junior|graduate/gi,
    'Mid-level': /mid.?(level|seniority)|experienced/gi,
    'Senior': /senior|lead|principal|staff/gi,
    'Executive': /executive|director|vp|vice.president|head.of/gi
  }

  for (const [level, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) return level
  }

  return 'Not specified'
}

function getContextualRecommendations(score, aiAnalysis, heuristicAnalysis) {
  const recommendations = []
  const ragContext = aiAnalysis.ragContext || {}
  const companies = ragContext.companies || ragContext.detectedCompanies || []
  const scams = ragContext.scams || ragContext.detectedScams || []

  // RAG-based recommendations
  if (companies.length > 0) {
    recommendations.push(`Verified company: ${companies[0].name || 'Recognized company'} - proceed with confidence`)
  }

  if (scams.length > 0) {
    scams.forEach(scam => {
      const penalty = scam.scorePenalty || scam.riskScore || 0
      if (penalty <= -30) {
        recommendations.push(`CRITICAL: Known scam pattern detected - ${scam.type || 'suspicious pattern'}`)
      }
    })
  }

  // Score-based recommendations
  if (score >= 80) {
    recommendations.push(
      'This job appears legitimate - proceed with standard application process',
      'Verify company website and social media presence',
      'Research company reviews on professional platforms'
    )
  } else if (score >= 60) {
    recommendations.push(
      'Exercise caution and verify details independently',
      'Contact the company directly through official channels',
      'Research the hiring manager on professional networks'
    )
  } else {
    recommendations.push(
      'Verify this job through multiple independent channels',
      'Avoid sharing sensitive personal information',
      'Contact the company using official contact information from their website'
    )
  }

  // Add any AI-specific recommendations
  if (aiAnalysis.recommendations) {
    recommendations.push(...aiAnalysis.recommendations)
  }

  return [...new Set(recommendations)] // Remove duplicates
}

function getContextualStrategyTips(score, aiAnalysis, heuristicAnalysis) {
  const tips = []
  const ragContext = aiAnalysis.ragContext || {}
  const companies = ragContext.companies || ragContext.detectedCompanies || []
  const scams = ragContext.scams || ragContext.detectedScams || []

  // RAG-based strategy tips
  if (scams.some(s => (s.scorePenalty || s.riskScore || 0) <= -30)) {
    tips.push(
      'EXTREME CAUTION: Multiple scam patterns detected',
      'Do not share personal or financial information',
      'Verify all communication through official channels only',
      'Consider reporting to relevant authorities if suspicious'
    )
  } else if (companies.length > 0) {
    tips.push(
      'Prepare for structured corporate interview process',
      'Research the specific team and department',
      'Highlight relevant corporate experience',
      'Be prepared for multiple interview rounds'
    )
  } else if (score >= 80) {
    tips.push(
      'Tailor your application to the specific requirements mentioned',
      'Prepare for a professional interview process',
      'Highlight relevant experience and skills'
    )
  } else if (score >= 60) {
    tips.push(
      'Ask detailed questions about the role and company during interviews',
      'Verify all contact information independently',
      'Be cautious of any requests for payment or sensitive information'
    )
  } else {
    tips.push(
      'Proceed with extreme caution',
      'Do not share bank details or pay any fees',
      'Consider reporting suspicious postings to relevant authorities'
    )
  }

  return tips
}

function calculateEnhancedConfidence(aiAnalysis, heuristicAnalysis) {
  let confidence = 70 // Base confidence

  // RAG context boosts confidence with safe property access
  const ragContext = aiAnalysis.ragContext || {}
  const companies = ragContext.companies || ragContext.detectedCompanies || []
  const scams = ragContext.scams || ragContext.detectedScams || []
  const professionalSignals = ragContext.professionalSignals || []

  if (companies.length > 0) confidence += 15
  if (scams.length > 0) confidence += 10
  if (professionalSignals.length > 0) confidence += 5

  // Data quality factors
  if (aiAnalysis.evidence && aiAnalysis.evidence.length > 3) confidence += 10
  if (heuristicAnalysis.evidence && heuristicAnalysis.evidence.length > 3) confidence += 10
  
  // Analysis consistency
  const aiScore = aiAnalysis.aiScore || 50
  const heuristicScore = heuristicAnalysis.heuristicScore || 50
  const scoreDifference = Math.abs(aiScore - heuristicScore)
  
  if (scoreDifference > 30) confidence -= 20
  else if (scoreDifference < 10) confidence += 15
  
  return Math.max(30, Math.min(95, confidence))
}

function generateEnhancedSummary(score, aiAnalysis, heuristicAnalysis) {
  const ragContext = aiAnalysis.ragContext || {}
  const companies = ragContext.companies || ragContext.detectedCompanies || []
  const scams = ragContext.scams || ragContext.detectedScams || []
  
  const riskFlags = [...(aiAnalysis.riskFlags || []), ...(heuristicAnalysis.riskFlags || [])]
  const highRiskCount = riskFlags.filter(flag => flag.severity === 'high' || flag.severity === 'critical').length
  const mediumRiskCount = riskFlags.filter(flag => flag.severity === 'medium').length

  // RAG-based summaries
  if (companies.length > 0) {
    const company = companies[0]
    return `Verified ${company.type || 'recognized'} company (${company.name || 'professional'}). Professional posting with high legitimacy confidence. ${highRiskCount > 0 ? 'Minor concerns noted but overall appears safe.' : 'No significant risk factors detected.'}`
  }

  if (scams.some(s => (s.scorePenalty || s.riskScore || 0) <= -30)) {
    return `CRITICAL: Multiple known scam patterns detected. ${highRiskCount} high-risk factors identified. Avoid this opportunity and consider reporting.`
  }

  // Score-based summaries
  if (score >= 80) {
    return `This job posting appears legitimate with strong positive indicators. ${highRiskCount > 0 ? 'Minor concerns noted but overall appears safe.' : 'No significant risk factors detected.'}`
  } else if (score >= 60) {
    return `Mixed signals detected. ${mediumRiskCount} moderate concerns identified. Additional verification recommended before proceeding.`
  } else if (score >= 40) {
    return `Significant concerns identified with ${highRiskCount} high-risk factors. Exercise extreme caution and conduct thorough independent verification.`
  } else {
    return `Very high risk detected with ${highRiskCount} critical issues. Strongly consider avoiding this opportunity and report if suspicious.`
  }
}

// Enhanced extraction functions with better patterns
function extractJobTitle(text) {
  const titlePatterns = [
    /(?:position|role|job|title)[:\s-]*([^\n,.!?]+)/i,
    /(?:looking for|seeking|hiring)\s+(?:a|an)?\s*([^\n,.!?]+?(?:engineer|developer|manager|specialist|analyst))/i,
    /(?:job title|position title)[:\s-]*([^\n]+)/i,
    /^([^,\n]{5,40}?(?:engineer|developer|manager|specialist|analyst))/im
  ]
  
  for (const pattern of titlePatterns) {
    const match = text.match(pattern)
    if (match && match[1] && match[1].trim().length > 3) {
      const title = match[1].trim()
      // Validate it looks like a real job title
      if (title.length < 50 && !title.match(/http|www|@/)) {
        return title
      }
    }
  }
  
  return 'Professional Position'
}

function extractCompany(text) {
  const companyPatterns = [
    /(?:company|organization|firm|corp|inc)[:\s-]*([^\n,.!?]+)/i,
    /at\s+([^\n,.!?]+)/i,
    /(?:about|join|work at)\s+([^\n,.!?]+)/i,
    /(?:©|copyright)\s+([^\n,.!?]+)/i
  ]
  
  for (const pattern of companyPatterns) {
    const match = text.match(pattern)
    if (match && match[1] && match[1].trim().length > 2) {
      const company = match[1].trim()
      // Clean common prefixes/suffixes
      const cleanCompany = company.replace(/^[:\s-]+|[:\s-.]+$/g, '')
      if (cleanCompany.length > 1 && cleanCompany.length < 100) {
        return cleanCompany
      }
    }
  }
  
  return 'Technology Company'
}

function extractLocation(text) {
  const locationPatterns = [
    /(?:location|based in|work from)[:\s-]*([^\n,.!?]+)/i,
    /(?:remote|hybrid|onsite|in.office)/i,
    /(?:from anywhere|any location)/i
  ]
  
  for (const pattern of locationPatterns) {
    const match = text.match(pattern)
    if (match) {
      if (match[1]) {
        const location = match[1].trim()
        if (location && !location.match(/http|www|@/)) {
          return location
        }
      } else {
        // Direct match for remote/hybrid etc.
        return match[0].charAt(0).toUpperCase() + match[0].slice(1)
      }
    }
  }
  
  return 'Location not specified'
}

function extractSalary(text) {
  const salaryPatterns = [
    /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:-|\sto\s)\s*\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i,
    /(?:salary|compensation|pay)[:\s-]*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:-|\sto\s)\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i,
    /\$(\d+(?:k|K))\s*(?:-|\sto\s)\s*\$(\d+(?:k|K))/i
  ]
  
  for (const pattern of salaryPatterns) {
    const match = text.match(pattern)
    if (match) {
      if (match[1] && match[2]) {
        return `$${match[1]} - $${match[2]}`
      } else if (match[1]) {
        return `$${match[1]}`
      }
    }
  }
  
  // Look for annual salary mentions
  const annualMatch = text.match(/(\$\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:per year|annually|annual)/i)
  if (annualMatch) {
    return `${annualMatch[1]} per year`
  }
  
  return 'Competitive salary'
}

// Cache management functions
function generateCacheKey(inputData) {
  if (inputData.text) {
    return `text_${Buffer.from(inputData.text).toString('base64').substring(0, 50)}`
  }
  if (inputData.url) {
    return `url_${inputData.url}`
  }
  if (inputData.file) {
    return `file_${inputData.file.name}_${inputData.file.size}`
  }
  return `generic_${JSON.stringify(inputData).substring(0, 100)}`
}

async function getCachedResult(key) {
  try {
    const cached = companyCache.get(key)
    if (cached && Date.now() - cached.timestamp < SCAN_CACHE_TTL) {
      return cached.result
    }
    companyCache.delete(key) // Remove expired cache
    return null
  } catch (error) {
    console.warn('Cache read error:', error)
    return null
  }
}

async function cacheResult(key, result) {
  try {
    companyCache.set(key, {
      result,
      timestamp: Date.now()
    })

    // Simple cache cleanup (in production, use more sophisticated cleanup)
    if (companyCache.size > 100) {
      const oldestKey = companyCache.keys().next().value
      companyCache.delete(oldestKey)
    }
  } catch (error) {
    console.warn('Cache write error:', error)
  }
}

// Enhanced fallback handlers
async function handleAIFailure(extractedText) {
  console.warn('AI analysis failed, using enhanced heuristic fallback')
  
  try {
    // Import heuristic analysis directly
    const { analyzeWithRAGHeuristics, performRAGAnalysis } = await import('@/lib/ai/scan-agent')
    const ragContext = await performRAGAnalysis(extractedText)
    return await analyzeWithRAGHeuristics(extractedText, ragContext)
  } catch (error) {
    console.error('Enhanced AI fallback also failed:', error)
    return {
      aiScore: 50,
      evidence: [
        {
          type: 'warning',
          signal: 'AI analysis unavailable',
          severity: 'medium',
          confidence: 0.3
        }
      ],
      riskFlags: [],
      ragContext: { companies: [], scams: [], professionalSignals: [] }
    }
  }
}

async function handleHeuristicFailure(extractedText) {
  console.warn('Heuristic analysis failed, using basic fallback')
  
  return {
    heuristicScore: 50,
    evidence: [
      {
        type: 'warning',
        signal: 'Heuristic analysis unavailable',
        severity: 'low',
        confidence: 0.5
      }
    ],
    riskFlags: []
  }
}

// Export test function
export async function testScanJob() {
  return {
    message: "Test function for development",
    status: "active"
  }
}