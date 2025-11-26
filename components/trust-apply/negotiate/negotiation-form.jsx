// nextstep.io/components/trust-apply/negotiate/negotiation-form.jsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { SalaryRange } from "./salary-range"
import { ToneSelector } from "./tone-selector"
import { Loader2 } from "lucide-react"

export function NegotiationForm({ onGenerate, isGenerating }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    currentSalary: "",
    expectedSalary: "",
    company: "",
    experience: "",
    tone: "professional",
    additionalContext: ""
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(formData)
  }

  const canSubmit = formData.jobTitle && formData.expectedSalary && formData.company

  return (
    <Card>
      <CardHeader>
        <CardTitle>Negotiation Details</CardTitle>
        <CardDescription>
          Provide information about the job offer to generate a personalized negotiation strategy
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="e.g., TechCorp Inc."
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentSalary">Current Salary (Optional)</Label>
              <Input
                id="currentSalary"
                placeholder="e.g., $95,000"
                value={formData.currentSalary}
                onChange={(e) => handleChange('currentSalary', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary *</Label>
              <Input
                id="expectedSalary"
                placeholder="e.g., $120,000"
                value={formData.expectedSalary}
                onChange={(e) => handleChange('expectedSalary', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years (Entry Level)</SelectItem>
                <SelectItem value="3-5">3-5 years (Mid Level)</SelectItem>
                <SelectItem value="6-10">6-10 years (Senior Level)</SelectItem>
                <SelectItem value="10+">10+ years (Executive/Lead)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ToneSelector
            value={formData.tone}
            onChange={(value) => handleChange('tone', value)}
          />

          <SalaryRange 
            jobTitle={formData.jobTitle}
            experience={formData.experience}
          />

          <div className="space-y-2">
            <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
            <Textarea
              id="additionalContext"
              placeholder="Any additional information about the offer, your qualifications, or negotiation constraints..."
              value={formData.additionalContext}
              onChange={(e) => handleChange('additionalContext', e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={!canSubmit || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Negotiation Strategy...
              </>
            ) : (
              'Generate Negotiation Email'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}