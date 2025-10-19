"use client"

import { Heart, MapPin, DollarSign, Briefcase, Share2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  remote: string
  match: number
  description: string
  skills: string[]
  posted: string
}

interface JobCardProps {
  job: Job
  isSaved: boolean
  onSave: () => void
}

export default function JobCard({ job, isSaved, onSave }: JobCardProps) {
  return (
    <Card className="p-6 hover:border-primary/50 transition">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
        </div>

        {/* Match Score */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 flex-shrink-0">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-primary">{job.match}%</span>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {job.location}
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          {job.salary}
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          {job.type}
        </div>
        <div className="px-2 py-1 rounded-full bg-muted text-xs font-medium">{job.remote}</div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <span key={skill} className="px-2 py-1 rounded-full bg-muted text-xs text-foreground">
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className={isSaved ? "text-primary" : "text-muted-foreground"}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="sm">Apply Now</Button>
        </div>
      </div>
    </Card>
  )
}
