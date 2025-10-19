"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import OnboardingStep1 from "@/components/onboarding/step-1"
import OnboardingStep2 from "@/components/onboarding/step-2"
import OnboardingStep3 from "@/components/onboarding/step-3"
import OnboardingStep4 from "@/components/onboarding/step-4"

const steps = [
  { id: 1, title: "Personal Info", description: "Tell us about yourself" },
  { id: 2, title: "Experience", description: "Your professional background" },
  { id: 3, title: "Skills & Interests", description: "What you're good at" },
  { id: 4, title: "Preferences", description: "Your career goals" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    location: "",
    // Step 2
    currentRole: "",
    yearsExperience: "",
    industry: "",
    // Step 3
    skills: [] as string[],
    interests: [] as string[],
    // Step 4
    salaryExpectation: "",
    workStyle: "",
    careerGoal: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      window.location.href = "/assessment"
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 formData={formData} updateFormData={updateFormData} />
      case 2:
        return <OnboardingStep2 formData={formData} updateFormData={updateFormData} />
      case 3:
        return <OnboardingStep3 formData={formData} updateFormData={updateFormData} />
      case 4:
        return <OnboardingStep4 formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Complete Your Profile</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{Math.round((currentStep / steps.length) * 100)}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Step Indicators */}
          <div className="hidden lg:flex flex-col gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-start gap-3 cursor-pointer transition ${
                  step.id <= currentStep ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
                    step.id < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">{steps[currentStep - 1].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
              </div>

              {/* Step Content */}
              <div className="mb-8">{renderStep()}</div>

              {/* Navigation */}
              <div className="flex gap-4 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="bg-transparent"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} className="ml-auto">
                  {currentStep === steps.length ? "Complete" : "Next"}
                  {currentStep < steps.length && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Auto-save indicator */}
            <div className="mt-4 text-center text-xs text-muted-foreground">Your progress is automatically saved</div>
          </div>
        </div>
      </div>
    </div>
  )
}
