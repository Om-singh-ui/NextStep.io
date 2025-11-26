// nextstep.io/app/(dashboard)/trust-apply/negotiate/page.jsx
"use client"

import { useState } from "react"
import { NegotiationForm } from "@/components/trust-apply/negotiate/negotiation-form"
import { PageTransition } from "@/components/trust-apply/page-transition"
import { generateNegotiation } from "@/lib/actions/generate-negotiation"
import { motion } from "framer-motion"

export default function NegotiatePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [draft, setDraft] = useState(null)

  const handleGenerate = async (formData) => {
    setIsGenerating(true)
    try {
      const result = await generateNegotiation(formData)
      setDraft(result)
      
      // Store in local history
      const history = JSON.parse(localStorage.getItem('trust-apply-negotiation-history') || '[]')
      history.unshift({
        id: result.draftId,
        timestamp: new Date().toISOString(),
        jobTitle: formData.jobTitle,
        company: formData.company,
        expectedSalary: formData.expectedSalary
      })
      localStorage.setItem('trust-apply-negotiation-history', JSON.stringify(history.slice(0, 50)))
      
    } catch (error) {
      console.error('Negotiation generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (draft) {
    window.location.href = `/trust-apply/negotiate/result/${draft.draftId}`
    return null
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-8 mt-20">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight">Salary Negotiation Agent</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Generate professional negotiation emails with AI-powered strategies
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NegotiationForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating}
            />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}