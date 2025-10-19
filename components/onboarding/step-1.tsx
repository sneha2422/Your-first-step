"use client"

import { Input } from "@/components/ui/input"

interface Step1Props {
  formData: any
  updateFormData: (updates: any) => void
}

export default function OnboardingStep1({ formData, updateFormData }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
          <Input
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
          <Input
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          <Input
            placeholder="City, Country"
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
          />
        </div>
      </div>

      <div className="rounded-lg bg-muted/50 p-4 border border-border">
        <p className="text-sm text-muted-foreground">
          We use this information to provide location-specific job recommendations and market insights.
        </p>
      </div>
    </div>
  )
}
