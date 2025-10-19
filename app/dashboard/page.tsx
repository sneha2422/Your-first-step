"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Briefcase, TrendingUp, BookOpen, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard/header"
import DashboardSidebar from "@/components/dashboard/sidebar"
import RecentJobsWidget from "@/components/dashboard/widgets/recent-jobs"
import LearningPathWidget from "@/components/dashboard/widgets/learning-path"
import MarketInsightsWidget from "@/components/dashboard/widgets/market-insights"
import GoalsWidget from "@/components/dashboard/widgets/goals"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState("Sneha V")

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg transition">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader />

          {/* Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userName}</h1>
                <p className="text-muted-foreground">Here's your personalized career dashboard</p>
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-4 mb-8">
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Profile Strength</p>
                      <p className="text-2xl font-bold text-foreground">85%</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Matching Jobs</p>
                      <p className="text-2xl font-bold text-foreground">24</p>
                    </div>
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Learning Progress</p>
                      <p className="text-2xl font-bold text-foreground">45%</p>
                    </div>
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Market Insights</p>
                      <p className="text-2xl font-bold text-foreground">12</p>
                    </div>
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </Card>
              </div>

              {/* Main Grid */}
              <div className="grid gap-8 lg:grid-cols-3 mb-8">
                {/* Left Column - Larger Widgets */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Recent Jobs */}
                  <RecentJobsWidget />

                  {/* Learning Path */}
                  <LearningPathWidget />
                </div>

                {/* Right Column - Sidebar Widgets */}
                <div className="space-y-8">
                  {/* Goals */}
                  <GoalsWidget />

                  {/* Market Insights */}
                  <MarketInsightsWidget />
                </div>
              </div>

              {/* Recommendations Section */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Personalized Recommendations</h2>
                  <Link href="/jobs">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Senior Product Manager",
                      company: "Google",
                      match: 94,
                      salary: "$150K - $200K",
                    },
                    {
                      title: "Product Lead",
                      company: "Microsoft",
                      match: 91,
                      salary: "$140K - $190K",
                    },
                    {
                      title: "Head of Product",
                      company: "Stripe",
                      match: 88,
                      salary: "$160K - $220K",
                    },
                  ].map((job, idx) => (
                    <div key={idx} className="rounded-lg border border-border p-4 hover:border-primary/50 transition">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {job.match}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{job.salary}</p>
                      <Button size="sm" className="w-full">
                        View Job
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
