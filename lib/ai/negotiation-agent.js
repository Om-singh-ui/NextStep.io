// nextstep.io/lib/ai/negotiation-agent.js
import { aiClient } from './client'

export async function generateNegotiationWithAI(formData, marketSalary) {
  try {
    const prompt = buildNegotiationPrompt(formData, marketSalary)
    
    const draft = await aiClient.generateContent(prompt, {
      provider: 'openai',
      maxTokens: 3000,
      temperature: 0.7
    })

    return parseNegotiationDraft(draft)
  } catch (error) {
    console.error('Negotiation AI generation error:', error)
    return getDefaultNegotiationDraft(formData, marketSalary)
  }
}

function buildNegotiationPrompt(formData, marketSalary) {
  // Ensure all values are defined
  const safeFormData = {
    jobTitle: formData.jobTitle || 'Unknown Position',
    company: formData.company || 'Unknown Company',
    currentSalary: formData.currentSalary || 'Not provided',
    expectedSalary: formData.expectedSalary || 'Market rate',
    experience: formData.experience || 'Not specified',
    tone: formData.tone || 'professional',
    additionalContext: formData.additionalContext || 'None provided'
  }

  const safeMarketSalary = marketSalary || {
    range: { min: 60000, max: 120000 }
  }

  return `Generate a professional salary negotiation email with this context:

POSITION: ${safeFormData.jobTitle}
COMPANY: ${safeFormData.company}
CURRENT: ${safeFormData.currentSalary}
TARGET: ${safeFormData.expectedSalary}
EXPERIENCE: ${safeFormData.experience}
TONE: ${safeFormData.tone}
MARKET RANGE: $${safeMarketSalary.range.min} - $${safeMarketSalary.range.max}

ADDITIONAL CONTEXT:
${safeFormData.additionalContext}

Generate:

SALARY INSIGHTS:
- Market analysis comparing target to range
- Experience-level justification
- Industry standard context

NEGOTIATION STRATEGY:
- Key leverage points
- Value proposition focus
- Expected company response
- Fallback positions

EMAIL DRAFT:
Write a complete, professional email that:
1. Expresses enthusiasm for the role
2. Clearly states salary expectations
3. Justifies with market data and experience
4. Maintains appropriate tone (${safeFormData.tone})
5. Leaves room for discussion
6. Professional closing

ALTERNATIVES:
Provide 3 alternative opening sentences and 2 closing options.

Ensure the email is persuasive, professional, and tailored to the ${safeFormData.tone} tone.`
}

function parseNegotiationDraft(draftText) {
  try {
    if (!draftText || typeof draftText !== 'string') {
      throw new Error('Invalid draft text')
    }

    // Improved parsing with better section detection
    const sections = draftText.split(/(?=SALARY INSIGHTS:|NEGOTIATION STRATEGY:|EMAIL DRAFT:|ALTERNATIVES:)/i)
    
    const result = {
      salaryInsights: extractSectionContent(sections, 'SALARY INSIGHTS:'),
      negotiationStrategy: extractSectionContent(sections, 'NEGOTIATION STRATEGY:'),
      emailDraft: extractSectionContent(sections, 'EMAIL DRAFT:'),
      alternatives: extractAlternatives(sections)
    }

    // Validate required fields
    if (!result.emailDraft) {
      throw new Error('Email draft not found in AI response')
    }

    return result
  } catch (error) {
    console.error('Error parsing negotiation draft:', error)
    throw error
  }
}

function extractSectionContent(sections, sectionName) {
  if (!sections || !Array.isArray(sections)) return ''
  
  const section = sections.find(s => s && s.toLowerCase().startsWith(sectionName.toLowerCase()))
  if (!section) return ''
  
  const content = section.replace(new RegExp(sectionName, 'i'), '').trim()
  
  // Remove any following section headers
  const nextSectionIndex = content.search(/(?=[A-Z ]+:)/)
  return nextSectionIndex > 0 ? content.substring(0, nextSectionIndex).trim() : content
}

function extractAlternatives(sections) {
  const alternativesSection = sections.find(s => s && s.toLowerCase().startsWith('alternatives:'))
  if (!alternativesSection) return null

  const content = alternativesSection.replace(/alternatives:/i, '').trim()
  const lines = content.split('\n').filter(line => line.trim())
  
  const openings = lines
    .filter(line => line.toLowerCase().includes('opening') || line.match(/^\d+\./) || line.startsWith('-'))
    .slice(0, 3)
    .map(line => line.replace(/^(\d+\.|\-|\*)\s*/, '').trim())
  
  const closings = lines
    .filter(line => line.toLowerCase().includes('closing') || line.match(/^\d+\./) || line.startsWith('-'))
    .slice(-2)
    .map(line => line.replace(/^(\d+\.|\-|\*)\s*/, '').trim())

  return {
    openings: openings.length > 0 ? openings : getDefaultOpenings(),
    closings: closings.length > 0 ? closings : getDefaultClosings()
  }
}

function getDefaultNegotiationDraft(formData, marketSalary) {
  return {
    salaryInsights: `Market analysis for ${formData.experience} experience level shows a typical range of $${marketSalary.range.min} - $${marketSalary.range.max}.`,
    negotiationStrategy: "Focus on your value proposition and relevant experience. Be prepared to discuss specific accomplishments.",
    emailDraft: getFallbackEmailDraft(formData, marketSalary),
    alternatives: {
      openings: getDefaultOpenings(),
      closings: getDefaultClosings()
    }
  }
}

function getFallbackEmailDraft(formData, marketSalary) {
  return `Dear Hiring Manager,

Thank you for offering me the ${formData.jobTitle} position at ${formData.company}. I'm very excited about the opportunity to join your team and contribute to your organization.

Based on my ${formData.experience} years of experience and market research for similar roles (typically $${marketSalary.range.min} - $${marketSalary.range.max}), I would like to discuss the compensation package. I was hoping for a salary of ${formData.expectedSalary}.

I'm confident that my skills and experience will bring significant value to ${formData.company}. I'm particularly excited about the opportunity to [mention specific aspect of the role].

Would you be open to discussing this further? I'm flexible and willing to consider the overall compensation package.

Thank you for your consideration.

Best regards,
[Your Name]`
}

function getDefaultOpenings() {
  return [
    "Thank you for the offer and your confidence in my qualifications.",
    "I'm excited about the opportunity to join your team.",
    "I appreciate you extending the offer for the position."
  ]
}

function getDefaultClosings() {
  return [
    "I look forward to discussing this further.",
    "Thank you for your consideration."
  ]
}