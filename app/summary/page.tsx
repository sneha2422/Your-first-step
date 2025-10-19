"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, TrendingUp, Award, BookOpen, DollarSign, Target, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SummaryPage() {
  const careerChoice = "Product Manager"
  const yearsToGoal = 5

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Career Summary</h1>
              <p className="text-muted-foreground mt-1">Complete roadmap for {careerChoice}</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Career Choice */}
        <div className="mb-12">
          <Card className="p-8 border-2 border-primary/50 bg-primary/5">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Your Chosen Career Path</h2>
                <p className="text-muted-foreground">Based on your assessment results and preferences</p>
              </div>
              <Award className="h-12 w-12 text-primary" />
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Career Title</p>
                <p className="text-2xl font-bold text-foreground">{careerChoice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Match Score</p>
                <p className="text-2xl font-bold text-primary">94%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time to Senior Role</p>
                <p className="text-2xl font-bold text-foreground">{yearsToGoal} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Salary Growth</p>
                <p className="text-2xl font-bold text-foreground">+108%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Next Steps</h2>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Complete Onboarding",
                description: "Finish your profile setup and preferences",
                status: "completed",
                icon: CheckCircle2,
              },
              {
                step: 2,
                title: "Take Psychometric Assessment",
                description: "Complete the 15-minute career assessment",
                status: "completed",
                icon: CheckCircle2,
              },
              {
                step: 3,
                title: "Review Career Projection",
                description: "Explore your 60-year career roadmap",
                status: "in-progress",
                icon: TrendingUp,
              },
              {
                step: 4,
                title: "Start Learning Path",
                description: "Begin with Product Management 101 course",
                status: "pending",
                icon: BookOpen,
              },
              {
                step: 5,
                title: "Apply to Jobs",
                description: "Start applying to matching job opportunities",
                status: "pending",
                icon: Target,
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`flex items-start gap-4 p-6 rounded-lg border-2 transition ${
                  item.status === "completed"
                    ? "border-primary/50 bg-primary/5"
                    : item.status === "in-progress"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background"
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full ${
                      item.status === "completed"
                        ? "bg-primary text-primary-foreground"
                        : item.status === "in-progress"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {item.status === "pending" && (
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Start
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Career Metrics</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Starting Salary</p>
                  <p className="text-3xl font-bold text-foreground">$120K</p>
                </div>
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Average for entry-level PM</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Peak Salary (60 years)</p>
                  <p className="text-3xl font-bold text-foreground">$350K</p>
                </div>
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">CPO level compensation</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Lifetime Earnings</p>
                  <p className="text-3xl font-bold text-foreground">$9.2M</p>
                </div>
                <Award className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Over 60-year career</p>
            </Card>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Actions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "View Career Projection",
                description: "See your detailed 60-year roadmap with salary milestones",
                href: "/career-projection",
                icon: Calendar,
              },
              {
                title: "Start Learning Path",
                description: "Begin your personalized Product Manager learning journey",
                href: "/learning",
                icon: BookOpen,
              },
              {
                title: "Browse Job Opportunities",
                description: "Explore 24+ matching job opportunities",
                href: "/jobs",
                icon: Target,
              },
              {
                title: "View Market Trends",
                description: "Stay updated with industry insights and salary trends",
                href: "/trends",
                icon: TrendingUp,
              },
            ].map((action) => (
              <Link key={action.href} href={action.href}>
                <Card className="p-6 hover:border-primary/50 transition cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-3">
                    <action.icon className="h-6 w-6 text-primary" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">External Resources</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { name: "LinkedIn", url: "https://www.linkedin.com", icon: "💼" },
              { name: "Naukri", url: "https://www.naukri.com", icon: "🔍" },
              { name: "Coursera", url: "https://www.coursera.org", icon: "📚" },
              { name: "Udemy", url: "https://www.udemy.com", icon: "🎓" },
            ].map((resource) => (
              <a key={resource.name} href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="p-6 hover:border-primary/50 transition text-center cursor-pointer">
                  <div className="text-4xl mb-3">{resource.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{resource.name}</h3>
                  <p className="text-xs text-muted-foreground">Visit Platform</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
