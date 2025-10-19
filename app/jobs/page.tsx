"use client"

import { useState } from "react"
import { Search, Filter, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import JobFilters from "@/components/jobs/filters"
import JobCard from "@/components/jobs/job-card"

const mockJobs = [
  {
    id: 1,
    title: "Senior Product Manager",
    company: "Google",
    location: "Mountain View, CA",
    salary: "$150K - $200K",
    type: "Full-time",
    remote: "Hybrid",
    match: 94,
    description: "Lead product strategy and development for our core platform.",
    skills: ["Product Strategy", "Leadership", "Data Analysis"],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Product Lead",
    company: "Microsoft",
    location: "Seattle, WA",
    salary: "$140K - $190K",
    type: "Full-time",
    remote: "Hybrid",
    match: 91,
    description: "Drive product vision and execution for enterprise solutions.",
    skills: ["Product Management", "Communication", "Strategic Thinking"],
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "Head of Product",
    company: "Stripe",
    location: "San Francisco, CA",
    salary: "$160K - $220K",
    type: "Full-time",
    remote: "Remote",
    match: 88,
    description: "Build and lead the product organization for payments platform.",
    skills: ["Leadership", "Product Strategy", "Team Management"],
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Product Manager - AI",
    company: "OpenAI",
    location: "San Francisco, CA",
    salary: "$130K - $180K",
    type: "Full-time",
    remote: "On-site",
    match: 85,
    description: "Shape the future of AI products and user experiences.",
    skills: ["AI/ML", "Product Strategy", "Technical Skills"],
    posted: "1 week ago",
  },
  {
    id: 5,
    title: "Associate Product Manager",
    company: "Meta",
    location: "Menlo Park, CA",
    salary: "$120K - $160K",
    type: "Full-time",
    remote: "Hybrid",
    match: 82,
    description: "Launch and iterate on products impacting billions of users.",
    skills: ["Product Management", "Analytics", "Communication"],
    posted: "4 days ago",
  },
  {
    id: 6,
    title: "Product Manager - Growth",
    company: "Airbnb",
    location: "San Francisco, CA",
    salary: "$140K - $190K",
    type: "Full-time",
    remote: "Hybrid",
    match: 79,
    description: "Drive growth initiatives and user acquisition strategies.",
    skills: ["Growth", "Analytics", "Experimentation"],
    posted: "5 days ago",
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    salary: [0, 250],
    remote: [] as string[],
    type: [] as string[],
    location: "",
  })
  const [sortBy, setSortBy] = useState("match")
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const filteredJobs = mockJobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())

      const salaryMin = Number.parseInt(job.salary.split("-")[0].replace(/\D/g, ""))
      const matchesSalary = salaryMin >= filters.salary[0] && salaryMin <= filters.salary[1]

      const matchesRemote = filters.remote.length === 0 || filters.remote.includes(job.remote)
      const matchesType = filters.type.length === 0 || filters.type.includes(job.type)
      const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())

      return matchesSearch && matchesSalary && matchesRemote && matchesType && matchesLocation
    })
    .sort((a, b) => {
      if (sortBy === "match") return b.match - a.match
      if (sortBy === "salary") return Number.parseInt(b.salary.split("-")[1]) - Number.parseInt(a.salary.split("-")[1])
      return 0
    })

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Job Opportunities</h1>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredJobs.length} of {mockJobs.length} jobs
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 rounded-lg border border-border bg-background text-foreground text-sm"
                >
                  <option value="match">Best Match</option>
                  <option value="salary">Highest Salary</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.includes(job.id)}
                    onSave={() => toggleSaveJob(job.id)}
                  />
                ))
              ) : (
                <Card className="p-12 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </Card>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" className="bg-transparent">
                  Previous
                </Button>
                <Button variant="outline" className="bg-transparent">
                  1
                </Button>
                <Button>2</Button>
                <Button variant="outline" className="bg-transparent">
                  3
                </Button>
                <Button variant="outline" className="bg-transparent">
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
