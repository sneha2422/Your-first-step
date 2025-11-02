"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { TrendingUp, ArrowRight, DollarSign, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const insightsData: Record<string, { id: number; title: string; icon: React.ElementType }[]> = {
  default: [
    { id: 1, title: "PM demand up 23%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $165K", icon: DollarSign },
    { id: 3, title: "Remote roles: 45%", icon: Briefcase },
  ],
  "software-developer": [
    { id: 1, title: "Developer demand up 18%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $125K", icon: DollarSign },
    { id: 3, title: "Remote roles: 55%", icon: Briefcase },
  ],
  "data-analytics": [
    { id: 1, title: "Data Analyst demand up 25%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $95K", icon: DollarSign },
    { id: 3, title: "Hybrid roles growing", icon: Briefcase },
  ],
  cybersecurity: [
    { id: 1, title: "Cybersecurity demand up 30%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $115K", icon: DollarSign },
    { id: 3, title: "Top skill: Cloud Security", icon: Briefcase },
  ],
  "software-engineer": [
    { id: 1, title: "Senior Engineer demand up 22%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $155K", icon: DollarSign },
    { id: 3, title: "Top skill: System Design", icon: Briefcase },
  ],
  "strategy-manager": [
    { id: 1, title: "Strategy roles demand up 15%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $145K", icon: DollarSign },
    { id: 3, title: "Key skill: Market Analysis", icon: Briefcase },
  ],
  "project-manager": [
    { id: 1, title: "PM demand up 12%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $110K", icon: DollarSign },
    { id: 3, title: "Top cert: PMP & Agile", icon: Briefcase },
  ],
  "operations-manager": [
    { id: 1, title: "Operations demand stable", icon: TrendingUp },
    { id: 2, title: "Avg salary: $98K", icon: DollarSign },
    { id: 3, title: "Key skill: Process Improvement", icon: Briefcase },
  ],
  "clinical-lead": [
    { id: 1, title: "Healthcare leadership demand up 18%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $120K", icon: DollarSign },
    { id: 3, title: "Top skill: Quality Management", icon: Briefcase },
  ],
  "healthcare-educator": [
    { id: 1, title: "Clinical education demand up 14%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $90K", icon: DollarSign },
    { id: 3, title: "Key skill: Instructional Design", icon: Briefcase },
  ],
  "ui-ux-design": [
    { id: 1, title: "UX/UI demand up 20%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $105K", icon: DollarSign },
    { id: 3, title: "Top tool: Figma", icon: Briefcase },
  ],
  "visual-designer": [
    { id: 1, title: "Visual Design demand stable", icon: TrendingUp },
    { id: 2, title: "Avg salary: $85K", icon: DollarSign },
    { id: 3, title: "Key skill: Brand Identity", icon: Briefcase },
  ],
  "systems-engineer": [
    { id: 1, title: "Systems Engineer demand up 19%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $130K", icon: DollarSign },
    { id: 3, title: "Top skill: Cloud Architecture", icon: Briefcase },
  ],
  "mechanical-engineer": [
    { id: 1, title: "Mech/Civil demand stable", icon: TrendingUp },
    { id: 2, title: "Avg salary: $92K", icon: DollarSign },
    { id: 3, title: "Top skill: CAD Software", icon: Briefcase },
  ],
  "digital-marketing": [
    { id: 1, title: "Digital Marketing demand up 21%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $95K", icon: DollarSign },
    { id: 3, title: "Top skill: SEO/SEM", icon: Briefcase },
  ],
  "brand-manager": [
    { id: 1, title: "Brand Manager demand up 16%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $115K", icon: DollarSign },
    { id: 3, title: "Key skill: Brand Strategy", icon: Briefcase },
  ],
  "nlp-engineer": [
    { id: 1, title: "NLP Engineer demand up 28%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $145K", icon: DollarSign },
    { id: 3, title: "Top skill: Transformers", icon: Briefcase },
  ],
  "cv-engineer": [
    { id: 1, title: "CV Engineer demand up 26%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $150K", icon: DollarSign },
    { id: 3, title: "Top skill: PyTorch", icon: Briefcase },
  ],
  "rl-engineer": [
    { id: 1, title: "RL Engineer demand up 32%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $160K", icon: DollarSign },
    { id: 3, title: "Key skill: Robotics", icon: Briefcase },
  ],
  "ai-ethics": [
    { id: 1, title: "AI Ethics roles growing", icon: TrendingUp },
    { id: 2, title: "Avg salary: $125K", icon: DollarSign },
    { id: 3, title: "Top skill: Policy Analysis", icon: Briefcase },
  ],
  "penetration-tester": [
    { id: 1, title: "Pen Tester demand up 24%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $118K", icon: DollarSign },
    { id: 3, title: "Top cert: OSCP", icon: Briefcase },
  ],
  "defensive-security": [
    { id: 1, title: "SOC Analyst demand up 22%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $105K", icon: DollarSign },
    { id: 3, title: "Top skill: SIEM Tools", icon: Briefcase },
  ],
  "incident-response": [
    { id: 1, title: "IR demand up 26%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $125K", icon: DollarSign },
    { id: 3, title: "Top skill: Digital Forensics", icon: Briefcase },
  ],
  "governance-compliance": [
    { id: 1, title: "GRC Analyst demand up 18%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $100K", icon: DollarSign },
    { id: 3, title: "Top cert: CISA/CISM", icon: Briefcase },
  ],
  "data-analysis": [
    { id: 1, title: "Data Analyst demand up 25%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $95K", icon: DollarSign },
    { id: 3, title: "Top skill: SQL & Tableau", icon: Briefcase },
  ],
  "machine-learning": [
    { id: 1, title: "ML Engineer demand up 35%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $160K", icon: DollarSign },
    { id: 3, title: "Top skill: MLOps", icon: Briefcase },
  ],
  "data-engineering": [
    { id: 1, title: "Data Engineer demand up 33%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $150K", icon: DollarSign },
    { id: 3, title: "Top skill: Apache Spark", icon: Briefcase },
  ],
  "business-intelligence": [
    { id: 1, title: "BI Developer demand up 19%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $105K", icon: DollarSign },
    { id: 3, title: "Top tool: Power BI", icon: Briefcase },
  ],
  "brand-design": [
    { id: 1, title: "Brand Designer demand stable", icon: TrendingUp },
    { id: 2, title: "Avg salary: $88K", icon: DollarSign },
    { id: 3, title: "Key skill: Brand Strategy", icon: Briefcase },
  ],
  illustration: [
    { id: 1, title: "Illustrator roles competitive", icon: TrendingUp },
    { id: 2, title: "Avg salary (salaried): $75K", icon: DollarSign },
    { id: 3, title: "Top skill: Digital Painting", icon: Briefcase },
  ],
  "industrial-design": [
    { id: 1, title: "Industrial Design demand stable", icon: TrendingUp },
    { id: 2, title: "Avg salary: $95K", icon: DollarSign },
    { id: 3, title: "Top skill: 3D CAD Software", icon: Briefcase },
  ],
  "content-marketing": [
    { id: 1, title: "Content roles demand up 18%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $80K", icon: DollarSign },
    { id: 3, title: "Top skill: SEO Copywriting", icon: Briefcase },
  ],
  "social-media-marketing": [
    { id: 1, title: "SMM demand up 22%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $75K", icon: DollarSign },
    { id: 3, title: "Top skill: Community Management", icon: Briefcase },
  ],
  "paid-advertising": [
    { id: 1, title: "PPC Specialist demand up 20%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $85K", icon: DollarSign },
    { id: 3, title: "Top skill: Google Ads", icon: Briefcase },
  ],
  "seo-specialist": [
    { id: 1, title: "SEO Specialist demand up 25%", icon: TrendingUp },
    { id: 2, "title": "Avg salary: $80K", icon: DollarSign },
    { id: 3, title: "Top skill: Technical SEO", icon: Briefcase },
  ],
  "traditional-pm": [
    { id: 1, title: "Project Manager demand stable", icon: TrendingUp },
    { id: 2, title: "Avg salary: $105K", icon: DollarSign },
    { id: 3, title: "Top cert: PMP", icon: Briefcase },
  ],
  "consumer-pm": [
    { id: 1, title: "Consumer PM demand up 22%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $155K", icon: DollarSign },
    { id: 3, title: "Top skill: A/B Testing", icon: Briefcase },
  ],
  "ux-research": [
    { id: 1, title: "UX Researcher demand up 24%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $120K", icon: DollarSign },
    { id: 3, title: "Top skill: User Interviews", icon: Briefcase },
  ],
  "ui-design": [
    { id: 1, title: "UI Designer demand up 19%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $98K", icon: DollarSign },
    { id: 3, title: "Top tool: Figma", icon: Briefcase },
  ],
  "ux-analytics": [
    { id: 1, title: "UX Analyst demand growing", icon: TrendingUp },
    { id: 2, title: "Avg salary: $110K", icon: DollarSign },
    { id: 3, title: "Top tool: Mixpanel/Amplitude", icon: Briefcase },
  ],
  "frontend-development": [
    { id: 1, title: "Frontend demand up 21%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $120K", icon: DollarSign },
    { id: 3, title: "Top skill: React/Next.js", icon: Briefcase },
  ],
  "backend-development": [
    { id: 1, title: "Backend demand up 20%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $135K", icon: DollarSign },
    { id: 3, title: "Top skill: API Design", icon: Briefcase },
  ],
  "full-stack-development": [
    { id: 1, title: "Full Stack demand up 25%", icon: TrendingUp },
    { id: 2, title: "Avg salary: $140K", icon: DollarSign },
    { id: 3, title: "Top skill: DevOps", icon: Briefcase },
  ],
  "ui-ux-development": [
    { id: 1, title: "UI/UX Dev demand growing", icon: TrendingUp },
    { id: 2, title: "Avg salary: $115K", icon: DollarSign },
    { id: 3, title: "Top skill: Design Systems", icon: Briefcase },
  ],
}

function MarketInsightsContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")
  const [insights, setInsights] = useState(insightsData.default)

  useEffect(() => {
    const newInsights = (courseId && insightsData[courseId]) || insightsData.default
    setInsights(newInsights)
  }, [courseId])
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Market Insights</h2>
        <Link href="/jobs">
          <Button variant="ghost" size="sm">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <insight.icon className="h-4 w-4 text-primary shrink-0" />
            <p className="text-sm text-foreground">{insight.title}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function MarketInsightsWidget() {
  return (
    // Wrap the component in Suspense because it uses useSearchParams
    <Suspense fallback={<Card className="p-6">Loading insights...</Card>}>
      <MarketInsightsContent />
    </Suspense>
  )
}
