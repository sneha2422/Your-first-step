"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Briefcase, Award, ArrowRight, Download, Share2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CareerRecommendationCard from "@/components/results/career-card"
import SkillsRadar from "@/components/results/skills-radar"

const careerRecommendations = [
  {
    id: 1,
    title: "Product Manager",
    matchScore: 92,
    description: "Lead product strategy and development with your strong analytical and leadership skills.",
    salaryRange: "$120K - $180K",
    growthPotential: "High",
    skills: ["Leadership", "Strategic Thinking", "Communication"],
    companies: ["Google", "Microsoft", "Apple"],
  },
  {
    id: 2,
    title: "Management Consultant",
    matchScore: 88,
    description: "Help organizations solve complex problems with your problem-solving abilities.",
    salaryRange: "$110K - $170K",
    growthPotential: "High",
    skills: ["Problem Solving", "Analysis", "Communication"],
    companies: ["McKinsey", "BCG", "Bain"],
  },
  {
    id: 3,
    title: "Data Scientist",
    matchScore: 85,
    description: "Transform data into actionable insights with your analytical mindset.",
    salaryRange: "$100K - $160K",
    growthPotential: "Very High",
    skills: ["Data Analysis", "Problem Solving", "Technical Skills"],
    companies: ["Amazon", "Meta", "Netflix"],
  },
  {
    id: 4,
    title: "UX/Product Designer",
    matchScore: 82,
    description: "Create intuitive user experiences combining creativity with user research.",
    salaryRange: "$90K - $150K",
    growthPotential: "High",
    skills: ["Creativity", "Communication", "Detail Orientation"],
    companies: ["Figma", "Adobe", "Airbnb"],
  },
]

const skillsData = {
  Leadership: 92,
  Communication: 88,
  "Problem Solving": 85,
  Creativity: 78,
  "Technical Skills": 72,
  Teamwork: 90,
}

export default function ResultsPage() {
  const [selectedCareer, setSelectedCareer] = useState(careerRecommendations[0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Career Assessment Results</h1>
              <p className="text-muted-foreground mt-1">Personalized recommendations based on your profile</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Overall Match Score</p>
                <p className="text-4xl font-bold text-foreground">89%</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">Excellent match with recommended careers</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Top Career Path</p>
                <p className="text-2xl font-bold text-foreground">Product Manager</p>
              </div>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">92% match with your profile</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Salary Potential</p>
                <p className="text-2xl font-bold text-foreground">$120K - $180K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">Based on market data</p>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {/* Left: Career Recommendations */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Top Career Recommendations</h2>
              <p className="text-muted-foreground">Ranked by match score with your profile</p>
            </div>

            <div className="space-y-4">
              {careerRecommendations.map((career) => (
                <CareerRecommendationCard
                  key={career.id}
                  career={career}
                  isSelected={selectedCareer.id === career.id}
                  onSelect={setSelectedCareer}
                />
              ))}
            </div>
          </div>

          {/* Right: Skills Radar */}
          <div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-6">Your Strengths</h3>
              <SkillsRadar data={skillsData} />
              <div className="mt-6 space-y-3">
                {Object.entries(skillsData).map(([skill, score]) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{skill}</span>
                      <span className="text-sm text-muted-foreground">{score}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Career Details */}
        <div className="rounded-xl border border-border bg-card p-8 mb-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{selectedCareer.title}</h3>
              <p className="text-muted-foreground mb-6">{selectedCareer.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                  <p className="text-lg font-semibold text-foreground">{selectedCareer.salaryRange}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Growth Potential</p>
                  <p className="text-lg font-semibold text-foreground">{selectedCareer.growthPotential}</p>
                </div>
              </div>

              <Link href="/dashboard">
                <Button className="w-full">
                  Explore This Career Path
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div>
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Key Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Top Companies Hiring</h4>
                <div className="space-y-2">
                  {selectedCareer.companies.map((company) => (
                    <div key={company} className="flex items-center gap-2 p-3 rounded-lg border border-border">
                      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{company[0]}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Next Steps</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Explore Learning Paths",
                description: "Develop skills needed for your target career",
              },
              {
                icon: Briefcase,
                title: "Browse Job Opportunities",
                description: "Find positions matching your profile",
              },
              {
                icon: TrendingUp,
                title: "Track Market Trends",
                description: "Stay updated on industry insights",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
