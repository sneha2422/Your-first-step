"use client"

import { TrendingUp, Zap } from "lucide-react"

interface Career {
  id: number
  title: string
  matchScore: number
  description: string
  salaryRange: string
  growthPotential: string
  skills: string[]
  companies: string[]
}

interface CareerCardProps {
  career: Career
  isSelected: boolean
  onSelect: (career: Career) => void
}

export default function CareerRecommendationCard({ career, isSelected, onSelect }: CareerCardProps) {
  return (
    <button
      onClick={() => onSelect(career)}
      className={`w-full text-left rounded-xl border-2 p-6 transition ${
        isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">{career.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{career.description}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-primary">{career.matchScore}%</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="font-medium text-foreground">{career.salaryRange}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span className="font-medium text-foreground">{career.growthPotential}</span>
        </div>
      </div>
    </button>
  )
}
