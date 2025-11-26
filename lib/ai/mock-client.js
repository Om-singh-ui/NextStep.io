// nextstep.io/lib/ai/mock-client.js
class MockAIClient {
  constructor() {
    this.config = {
      maxTokens: 4000,
      temperature: 0.3,
      maxRetries: 3
    }
  }

  async generateContent(prompt, options = {}) {
    const { provider = 'auto' } = options
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    if (provider === 'openai' || provider === 'auto') {
      return this.generateMockOpenAIResponse(prompt)
    } else {
      return this.generateMockGeminiResponse(prompt)
    }
  }

  generateMockOpenAIResponse(prompt) {
    const responses = {
      scan: `JOB DETAILS:
Job Title: Senior Software Engineer
Company: TechCorp Inc.
Location: San Francisco, CA (Remote)
Salary: $120,000 - $150,000

AUTHENTICITY ASSESSMENT:
Authenticity Score: 85
Confidence: 92%

EVIDENCE:
- Professional company email domain (@techcorp.com)
- Detailed job requirements and qualifications
- Clear company information and website
- Standard hiring process described
- Realistic salary range for position and location

RECOMMENDATIONS:
- Verify company website and LinkedIn presence
- Research company reviews on Glassdoor
- Confirm hiring manager identity

STRATEGY TIPS:
- Tailor application to specific requirements mentioned
- Highlight relevant experience from job description
- Prepare for technical interview based on listed skills

SUMMARY: This job posting appears legitimate with professional presentation and realistic details.`,

      negotiation: `SALARY INSIGHTS:
Based on market data for Senior Software Engineer with 6-10 years experience in San Francisco, the typical salary range is $130,000 - $160,000. Your expected salary of $140,000 falls within the market range.

NEGOTIATION STRATEGY:
Focus on your specific technical skills and experience with the technologies mentioned. Emphasize your track record of successful project delivery.

EMAIL DRAFT:
Dear Hiring Manager,

Thank you for offering me the Senior Software Engineer position at TechCorp Inc. I'm very excited about the opportunity to join your team and contribute to your innovative projects.

Based on my 8 years of experience in full-stack development and my expertise in the technologies mentioned in the job description, I would like to discuss the starting salary. Market research for similar roles in San Francisco shows a range of $130,000 - $160,000 for candidates with my qualifications.

I'm confident that my experience in [specific skills] will bring immediate value to your development team. I'm particularly excited about [specific project/technology mentioned].

Would you consider a starting salary of $140,000? I believe this reflects both market standards and the value I can bring to TechCorp.

Thank you for your consideration. I look forward to discussing this further.

Best regards,
[Your Name]

ALTERNATIVES:
Opening alternatives:
1. I'm writing to express my enthusiasm for the Senior Software Engineer role and to discuss the compensation package.
2. Thank you for the offer - I'm very excited about the possibility of joining TechCorp Inc.
3. I appreciate you extending the offer for the Senior Software Engineer position.

Closing alternatives:
1. I'm available to discuss this at your convenience.
2. Thank you for your flexibility and consideration.`
    }

    if (prompt.includes('analyze') || prompt.includes('scan') || prompt.includes('authenticity')) {
      return responses.scan
    } else if (prompt.includes('negotiation') || prompt.includes('salary') || prompt.includes('email')) {
      return responses.negotiation
    } else {
      return `Mock AI Response for: ${prompt.substring(0, 100)}...`
    }
  }

  generateMockGeminiResponse(prompt) {
    // Similar mock responses for Gemini
    return this.generateMockOpenAIResponse(prompt)
  }

  getProviderStatus() {
    return {
      openai: true,
      gemini: true
    }
  }
}

