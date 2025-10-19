"use client"

interface Step3Props {
  formData: any
  updateFormData: (updates: any) => void
}

const skillOptions = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Data Analysis",
  "Project Management",
  "Technical Skills",
  "Creativity",
  "Teamwork",
  "Strategic Thinking",
  "Customer Service",
]

const interestOptions = [
  "Innovation",
  "Helping Others",
  "Financial Growth",
  "Work-Life Balance",
  "Remote Work",
  "Travel",
  "Learning",
  "Entrepreneurship",
  "Sustainability",
  "Social Impact",
]

export default function OnboardingStep3({ formData, updateFormData }: Step3Props) {
  const toggleSkill = (skill: string) => {
    const updated = formData.skills.includes(skill)
      ? formData.skills.filter((s: string) => s !== skill)
      : [...formData.skills, skill]
    updateFormData({ skills: updated })
  }

  const toggleInterest = (interest: string) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter((i: string) => i !== interest)
      : [...formData.interests, interest]
    updateFormData({ interests: updated })
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-foreground mb-4">Select Your Top Skills</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {skillOptions.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-4 py-2 rounded-lg border transition text-sm font-medium ${
                formData.skills.includes(skill)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-4">What Interests You Most?</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-lg border transition text-sm font-medium ${
                formData.interests.includes(interest)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
