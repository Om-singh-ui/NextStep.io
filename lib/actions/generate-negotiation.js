// nextstep.io/lib/actions/generate-negotiation.js
"use server"

import { validateNegotiationInput } from "@/lib/validations/negotiation"
import { generateNegotiationWithAI } from "@/lib/ai/negotiation-agent"
import { calculateMarketSalary } from "@/lib/utils/salary-calculator"

export async function generateNegotiation(formData) {
  try {
    // Validate input
    const validation = validateNegotiationInput(formData)
    if (!validation.success) {
      throw new Error(validation.error)
    }

    // Get market salary data with error handling
    let marketSalary
    try {
      marketSalary = calculateMarketSalary(formData.jobTitle, formData.experience)
    } catch (salaryError) {
      console.warn('Salary calculation failed, using defaults:', salaryError)
      marketSalary = {
        range: { min: 60000, max: 120000 },
        percentile: 50,
        confidence: 50,
        location: 'US National Average',
        experienceLevel: formData.experience,
        industry: 'General'
      }
    }

    // Generate with AI
    const aiDraft = await generateNegotiationWithAI(formData, marketSalary)
    
    // Generate draft ID
    const draftId = `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      draftId,
      jobTitle: formData.jobTitle,
      company: formData.company,
      currentSalary: formData.currentSalary,
      expectedSalary: formData.expectedSalary,
      experience: formData.experience,
      tone: formData.tone,
      salaryRange: marketSalary.range,
      salaryInsights: aiDraft.salaryInsights || "Market analysis based on your experience level.",
      negotiationStrategy: aiDraft.negotiationStrategy || "Standard negotiation approach recommended.",
      emailDraft: aiDraft.emailDraft || getFallbackEmailDraft(formData),
      alternatives: aiDraft.alternatives || getDefaultAlternatives(),
      timestamp: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('Negotiation generation error:', error)
    throw new Error(`Failed to generate negotiation: ${error.message}`)
  }
}

function getFallbackEmailDraft(formData) {
  return `Dear Hiring Manager,

Thank you for offering me the ${formData.jobTitle} position at ${formData.company}. I'm very excited about the opportunity to join your team.

Based on my ${formData.experience} years of experience and market research, I would like to discuss the compensation package. I was hoping for a salary in the range of ${formData.expectedSalary}.

I'm confident that my skills and experience will bring significant value to your organization.

Looking forward to your response.

Best regards,
[Your Name]`
}

function getDefaultAlternatives() {
  return {
    openings: [
      "Thank you for the offer and your confidence in my qualifications.",
      "I'm excited about the opportunity to join your team.",
      "I appreciate you extending the offer for the position."
    ],
    closings: [
      "I look forward to discussing this further.",
      "Thank you for your consideration."
    ]
  }
}