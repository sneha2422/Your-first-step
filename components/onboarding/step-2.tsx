"use client"

import { Input } from "@/components/ui/input"

interface Step2Props {
  formData: any
  updateFormData: (updates: any) => void
}

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Other",
]

export default function OnboardingStep2({ formData, updateFormData }: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Current Role</label>
        <Input
          placeholder="e.g., Software Engineer, Product Manager"
          value={formData.currentRole}
          onChange={(e) => updateFormData({ currentRole: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            value={formData.yearsExperience}
            onChange={(e) => updateFormData({ yearsExperience: e.target.value })}
          >
            <option value="">Select...</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            value={formData.industry}
            onChange={(e) => updateFormData({ industry: e.target.value })}
          >
            <option value="">Select...</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-muted/50 p-4 border border-border">
        <p className="text-sm text-muted-foreground">
          This helps us understand your career trajectory and suggest relevant opportunities.
        </p>
      </div>
    </div>
  )
}
