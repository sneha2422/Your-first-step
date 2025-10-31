"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Award, BookOpen, DollarSign, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CareerProjectionPage() {
  const [selectedCareer, setSelectedCareer] = useState("product-manager")

  const careerData: Record<string, any> = {
    "product-manager": {
      title: "Product Manager",
      description: "Lead product strategy and development",
      startSalary: 120000,
      endSalary: 250000,
      growthRate: 8.5,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "Product Fundamentals", level: "Beginner" },
        { year: 2, skill: "Data Analysis", level: "Intermediate" },
        { year: 4, skill: "Strategic Planning", level: "Advanced" },
        { year: 7, skill: "Team Leadership", level: "Expert" },
        { year: 10, skill: "Executive Strategy", level: "Expert" },
        { year: 15, skill: "Board-level Thinking", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Associate PM", salary: 120000 },
        { year: 3, title: "Senior PM", salary: 160000 },
        { year: 7, title: "Lead PM", salary: 200000 },
        { year: 12, title: "Director of Product", salary: 240000 },
        { year: 18, title: "VP of Product", salary: 280000 },
        { year: 25, title: "Chief Product Officer", salary: 350000 },
      ],
      courses: [
        { year: 0, name: "Product Management 101", platform: "Coursera", duration: "4 weeks" },
        { year: 1, name: "Data-Driven Product Strategy", platform: "Udemy", duration: "6 weeks" },
        { year: 3, name: "Advanced Analytics for PMs", platform: "LinkedIn Learning", duration: "8 weeks" },
        { year: 5, name: "Executive Leadership", platform: "Coursera", duration: "12 weeks" },
      ],
    },
  }

  const data = careerData[selectedCareer]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">60-Year Career Projection</h1>
              <p className="text-muted-foreground mt-1">Your personalized career roadmap</p>
            </div>
            <Link href="/results">
              <Button variant="outline" className="bg-transparent">
                Back to Results
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Career Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Starting Salary</p>
                <p className="text-2xl font-bold text-foreground">${(data.startSalary / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Peak Salary (60 years)</p>
                <p className="text-2xl font-bold text-foreground">${(data.endSalary / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Annual Growth</p>
                <p className="text-2xl font-bold text-foreground">{data.growthRate}%</p>
              </div>
              <Award className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">$9.2M</p>
              </div>
              <Target className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </div>

        {/* Career Milestones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Career Milestones</h2>
          <div className="space-y-4">
            {data.milestones.map((milestone: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition"
              >
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">Year {milestone.year}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expected salary: ${(milestone.salary / 1000).toFixed(0)}K
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Skills Development */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Skills Development Timeline</h2>
          <div className="space-y-3">
            {data.skills.map((skill: any, idx: number) => (
              <div key={idx} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">
                      Year {skill.year}: {skill.skill}
                    </p>
                    <p className="text-sm text-muted-foreground">{skill.level}</p>
                  </div>
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${skill.level === "Beginner" ? 33 : skill.level === "Intermediate" ? 66 : 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Learning Path</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.courses.map((course: any, idx: number) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Year {course.year}</p>
                    <h3 className="font-semibold text-foreground mt-1">{course.name}</h3>
                  </div>
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <p>{course.platform}</p>
                    <p>{course.duration}</p>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Enroll
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
