// nextstep.io/components/trust-apply/negotiate/tone-selector.jsx
"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"

const toneOptions = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal, respectful, corporate-appropriate language",
    icon: "💼"
  },
  {
    value: "confident",
    label: "Confident",
    description: "Assertive, value-focused, direct communication",
    icon: "🚀"
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Collaborative, relationship-building, warm tone",
    icon: "🤝"
  }
]

export function ToneSelector({ value, onChange }) {
  return (
    <div className="space-y-4">
      <Label>Email Tone</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid gap-4 md:grid-cols-3">
        {toneOptions.map((tone) => (
          <Card 
            key={tone.value}
            className={`cursor-pointer transition-all ${
              value === tone.value 
                ? 'border-primary bg-primary/5' 
                : 'hover:border-muted-foreground/25'
            }`}
            onClick={() => onChange(tone.value)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={tone.value} id={tone.value} />
                <Label 
                  htmlFor={tone.value} 
                  className="flex items-center gap-2 cursor-pointer font-normal"
                >
                  <span className="text-lg">{tone.icon}</span>
                  {tone.label}
                </Label>
              </div>
              <p className="text-xs text-muted-foreground mt-2 ml-6">
                {tone.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  )
}