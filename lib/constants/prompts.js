// nextstep.io/lib/utils/prompt-templates.js

export function buildScanPrompt(jobText) {
  return `
CRITICAL JOB AUTHENTICITY ANALYSIS

As an expert job authenticity analyst, your primary goal is to protect job seekers from scams and fraudulent job postings. Conduct a thorough analysis of this job posting and provide a structured assessment.

JOB POSTING TO ANALYZE:
${jobText.substring(0, 15000)}

REQUIRED ANALYSIS FORMAT:

JOB DETAILS:
Job Title: [Extract and specify the job title]
Company: [Extract and specify the company name]
Location: [Extract location - be specific about remote/hybrid/onsite]
Salary: [Extract salary range or note if not specified]
Contact Information: [Note any provided contact details]

RISK FACTORS - RED FLAGS:
[Identify and list specific scam indicators with severity levels]
- High Risk: [Urgent hiring, upfront payments, personal financial requests, vague company details]
- Medium Risk: [Poor grammar, unrealistic promises, generic email domains, missing requirements]
- Low Risk: [Minor inconsistencies, limited company information]

POSITIVE INDICATORS - GREEN FLAGS:
[Identify legitimate business practices and professional standards]
- Professional communication and detailed job description
- Clear company information and verifiable details
- Standard hiring process and reasonable requirements
- Professional contact information and application process

EVIDENCE-BASED ASSESSMENT:
[Provide specific evidence for each finding]
- Cite exact phrases or sections from the job posting
- Note missing information that should be present
- Compare against known legitimate job posting standards

AUTHENTICITY SCORE: [0-100]
Provide a numerical score based on:
- 80-100: Highly likely legitimate
- 60-79: Likely legitimate with minor concerns
- 40-59: Mixed signals, requires verification
- 20-39: High risk, likely scam
- 0-19: Very high risk, avoid

CONFIDENCE LEVEL: [0-100%]
Indicate confidence in the assessment based on available information

CRITICAL RECOMMENDATIONS:
[Prioritized safety and verification steps]
1. [Most critical action required]
2. [Secondary verification steps]
3. [Additional due diligence]

STRATEGY & NEXT STEPS:
[Practical application and safety guidance]
- Safe application approach
- Key questions to ask during interviews
- Warning signs during the hiring process
- When to walk away

VERIFICATION CHECKLIST:
- [ ] Company website verification
- [ ] LinkedIn/Glassdoor research
- [ ] Contact information validation
- [ ] Interview process evaluation
- [ ] Contract review requirements

IMPORTANT: Be objective, evidence-based, and prioritize job seeker safety. Flag any potential data privacy concerns or financial risks.
`
}

export function buildNegotiationPrompt(formData, marketData) {
  return `
PROFESSIONAL SALARY NEGOTIATION STRATEGY

Generate a comprehensive salary negotiation package based on the following context:

POSITION CONTEXT:
Job Title: ${formData.jobTitle || 'Not specified'}
Company: ${formData.company || 'Not specified'}
Current Salary: ${formData.currentSalary || 'Not provided'}
Target Salary: ${formData.expectedSalary || 'Not specified'}
Years of Experience: ${formData.experience || 'Not specified'}
Desired Tone: ${formData.tone || 'professional'}
Market Range: $${marketData?.range?.min || 'Unknown'} - $${marketData?.range?.max || 'Unknown'}

ADDITIONAL CONTEXT:
${formData.additionalContext || 'No additional context provided'}

REQUIRED OUTPUT FORMAT:

MARKET ANALYSIS:
- Industry standard salary range for this position
- Experience-level justification and market value
- Geographic location impact on salary
- Company size and funding stage considerations

NEGOTIATION LEVERAGE POINTS:
- Primary strengths to emphasize
- Unique value propositions
- Competitive market position
- Fallback positions and acceptable ranges

EMAIL DRAFT:
[Write a complete, professional negotiation email]

SUBJECT: [Appropriate subject line for ${formData.tone} tone]

BODY:
- Opening: Express enthusiasm and appreciation
- Value Proposition: Briefly highlight key qualifications
- Salary Discussion: Clearly state expectations with justification
- Market Context: Reference industry standards if appropriate
- Flexibility: Show willingness to discuss total compensation
- Closing: Professional and forward-looking

TONE ADJUSTMENTS:
- ${formData.tone === 'professional' ? 'Formal, data-driven, respectful' : ''}
- ${formData.tone === 'confident' ? 'Assertive, value-focused, direct' : ''}
- ${formData.tone === 'collaborative' ? 'Partnership-focused, open to discussion' : ''}

ALTERNATIVE PHRASING OPTIONS:
Provide 2-3 alternative ways to:
- Open the salary discussion
- Justify the requested salary
- Handle potential objections
- Close the negotiation

COMPENSATION PACKAGE CONSIDERATIONS:
- Base salary negotiation strategies
- Equity/stock options discussion points
- Benefits and perks to consider
- Signing bonus and relocation if applicable

EXPECTED RESPONSES & COUNTER-STRATEGIES:
- Anticipate company counter-offers
- Prepare responses to common objections
- Know when to accept vs. continue negotiating

Ensure the negotiation approach is professional, data-informed, and maintains positive relationship building.
`
}

export function buildQuickScanPrompt(jobText) {
  return `
QUICK JOB AUTHENTICITY SCAN

Provide a concise analysis of this job posting focusing on critical risk factors:

JOB TEXT:
${jobText.substring(0, 5000)}

QUICK ASSESSMENT FORMAT:

CRITICAL RISK FACTORS: [List high-severity red flags only]
POSITIVE INDICATORS: [Key legitimate signals]
IMMEDIATE RECOMMENDATION: [Proceed with caution / Verify / Avoid]
CONFIDENCE: [Low/Medium/High]
`
}

export function buildDetailedAnalysisPrompt(jobText, initialFindings) {
  return `
DEEP DIVE JOB AUTHENTICITY ANALYSIS

Conduct an in-depth analysis building on initial findings:

INITIAL FINDINGS:
${initialFindings}

JOB POSTING FOR DETAILED ANALYSIS:
${jobText.substring(0, 12000)}

DETAILED ANALYSIS REQUIREMENTS:

COMPANY VERIFICATION:
- Website authenticity and professionalism
- Social media presence and activity
- Company reviews and employee feedback
- Business registration and physical address

HIRING PROCESS ANALYSIS:
- Application process professionalism
- Interview structure and communication
- Background check and onboarding procedures
- Contract terms and conditions

FINANCIAL SAFETY:
- Upfront payment requirements
- Equipment purchase requests
- Bank account or personal information requests
- Payment method and schedule

DATA POINTS TO EXTRACT:
- Hiring manager name and title
- Interview process details
- Start date and training information
- Equipment and software provided
- Reporting structure

COMPARATIVE ANALYSIS:
- Compare against industry standards
- Evaluate against known scam patterns
- Assess communication quality

FINAL RECOMMENDATION WITH EVIDENCE:
[Detailed justification for the authenticity assessment]
`
}

// Helper function to estimate token count
export function estimateTokens(text) {
  // Rough estimation: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4)
}

// Helper function to truncate text to token limit
export function truncateToTokens(text, maxTokens = 15000) {
  const maxChars = maxTokens * 4
  return text.length > maxChars ? text.substring(0, maxChars) + '...' : text
}