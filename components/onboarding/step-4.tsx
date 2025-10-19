"use client"

interface Step4Props {
  formData: any
  updateFormData: (updates: any) => void
}

export default function OnboardingStep4({ formData, updateFormData }: Step4Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Salary Expectation (Annual)</label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          value={formData.salaryExpectation}
          onChange={(e) => updateFormData({ salaryExpectation: e.target.value })}
        >
          <option value="">Select...</option>
          <option value="0-50k">$0 - $50K</option>
          <option value="50-75k">$50K - $75K</option>
          <option value="75-100k">$75K - $100K</option>
          <option value="100-150k">$100K - $150K</option>
          <option value="150k+">$150K+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Preferred Work Style</label>
        <div className="space-y-2">
          {["Remote", "Hybrid", "On-site"].map((style) => (
            <label key={style} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="workStyle"
                value={style}
                checked={formData.workStyle === style}
                onChange={(e) => updateFormData({ workStyle: e.target.value })}
                className="h-4 w-4"
              />
              <span className="text-sm text-foreground">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Primary Career Goal</label>
        <select
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
          value={formData.careerGoal}
          onChange={(e) => updateFormData({ careerGoal: e.target.value })}
        >
          <option value="">Select...</option>
          <option value="advancement">Career Advancement</option>
          <option value="transition">Career Transition</option>
          <option value="specialization">Specialization</option>
          <option value="entrepreneurship">Entrepreneurship</option>
          <option value="work-life-balance">Work-Life Balance</option>
        </select>
      </div>

      <div className="rounded-lg bg-muted/50 p-4 border border-border">
        <p className="text-sm text-muted-foreground">
          These preferences help us tailor job recommendations and career paths specifically for you.
        </p>
      </div>
    </div>
  )
}
