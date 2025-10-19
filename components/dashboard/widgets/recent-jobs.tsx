"use client"

import Link from "next/link"
import { Briefcase, MapPin, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function RecentJobsWidget() {
  const jobs = [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150K - $200K",
      match: 94,
    },
    {
      id: 2,
      title: "Product Lead",
      company: "Microsoft",
      location: "Seattle, WA",
      salary: "$140K - $190K",
      match: 91,
    },
    {
      id: 3,
      title: "Head of Product",
      company: "Stripe",
      location: "San Francisco, CA",
      salary: "$160K - $220K",
      match: 88,
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recently Matched Jobs</h2>
        <Link href="/jobs">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {job.salary}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{job.match}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
