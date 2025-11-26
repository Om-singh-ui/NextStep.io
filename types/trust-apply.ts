// nextstep.io/types/trust-apply.ts
export interface ScanInput {
  type: 'url' | 'text' | 'file'
  url?: string
  text?: string
  file?: File
}

export interface ScanResult {
  scanId: string
  authenticityScore: number
  riskLevel: 'Low' | 'Medium' | 'High' | 'Very High'
  jobDetails: {
    title: string
    company: string
    location: string
    salary: string
  }
  evidence: Array<{
    type: 'positive' | 'risk'
    signal: string
    context?: string
    severity?: 'low' | 'medium' | 'high'
  }>
  recommendations: string[]
  strategyTips: string[]
  confidence: number
  riskFlags: Array<{
    signal: string
    severity: 'low' | 'medium' | 'high'
    context: string
  }>
  summary: string
  timestamp: string
}

export interface NegotiationFormData {
  jobTitle: string
  currentSalary: string
  expectedSalary: string
  company: string
  experience: '0-2' | '3-5' | '6-10' | '10+'
  tone: 'professional' | 'confident' | 'friendly'
  additionalContext: string
}

export interface NegotiationDraft {
  draftId: string
  jobTitle: string
  company: string
  currentSalary: string
  expectedSalary: string
  experience: string
  tone: string
  salaryRange: {
    min: number
    max: number
  }
  salaryInsights: string
  negotiationStrategy: string
  emailDraft: string
  alternatives?: {
    openings: string[]
    closings: string[]
  }
  timestamp: string
}

export interface SalaryData {
  range: {
    min: number
    max: number
  }
  percentile: number
  confidence: number
  location: string
  experienceLevel: string
  industry: string
}

export interface RiskSignal {
  signal: string
  severity: 'low' | 'medium' | 'high'
  context: string
}

export interface Evidence {
  type: 'positive' | 'risk'
  signal: string
  context?: string
}

export interface AIClientConfig {
  provider: 'openai' | 'gemini' | 'auto'
  maxTokens: number
  temperature: number
}

export interface LocalStorageHistory {
  id: string
  timestamp: string
  type: 'scan' | 'negotiation'
  data: any
}