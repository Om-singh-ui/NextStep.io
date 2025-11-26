// nextstep.io/lib/validations/negotiation.js
export function validateNegotiationInput(formData) {
  if (!formData || typeof formData !== 'object') {
    return { success: false, error: 'Invalid form data' }
  }

  const { jobTitle, expectedSalary, company, experience, tone } = formData

  // Required fields
  if (!jobTitle?.trim()) {
    return { success: false, error: 'Job title is required' }
  }

  if (!expectedSalary?.trim()) {
    return { success: false, error: 'Expected salary is required' }
  }

  if (!company?.trim()) {
    return { success: false, error: 'Company name is required' }
  }

  // Field length validation
  if (jobTitle.length > 100) {
    return { success: false, error: 'Job title too long' }
  }

  if (company.length > 100) {
    return { success: false, error: 'Company name too long' }
  }

  if (expectedSalary.length > 50) {
    return { success: false, error: 'Salary format invalid' }
  }

  // Experience validation
  const validExperiences = ['0-2', '3-5', '6-10', '10+']
  if (!validExperiences.includes(experience)) {
    return { success: false, error: 'Invalid experience level' }
  }

  // Tone validation
  const validTones = ['professional', 'confident', 'friendly']
  if (!validTones.includes(tone)) {
    return { success: false, error: 'Invalid tone selection' }
  }

  // Additional context length
  if (formData.additionalContext && formData.additionalContext.length > 1000) {
    return { success: false, error: 'Additional context too long' }
  }

  return { success: true }
}

export function validateSalaryFormat(salary) {
  if (!salary) return false
  
  const patterns = [
    /^\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?$/, // $100,000.00
    /^\d{1,3}(?:,\d{3})*\s*(?:k|K)$/, // 100k
    /^\d{1,6}$/, // 100000
    /^\$\d{1,3}(?:,\d{3})*\s*-\s*\$\d{1,3}(?:,\d{3})*$/, // $80,000 - $120,000
  ]
  
  return patterns.some(pattern => pattern.test(salary.trim()))
}