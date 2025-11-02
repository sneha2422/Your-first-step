"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, Briefcase, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type JobPlatform = "LinkedIn" | "Naukri" | "Wellfound"

const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

const jobTitlesByCareer: Record<string, string[]> = {
  default: ["Product Manager", "Senior Product Manager", "Product Lead"],
  "software-developer": ["Software Developer", "Backend Developer", "Full Stack Developer"],
  "data-analytics": ["Data Analyst", "Business Intelligence Analyst", "Senior Data Analyst"],
  cybersecurity: ["Cybersecurity Analyst", "Security Engineer", "Incident Responder"],
  "software-engineer": ["Software Engineer", "Senior Software Engineer", "Staff Engineer"],
  "clinical-lead": ["Clinical Team Lead", "Clinical Manager", "Nurse Manager"],
  "healthcare-educator": ["Healthcare Educator", "Clinical Educator", "Nurse Educator"],
  "visual-designer": ["Visual Designer", "Graphic Designer", "Communication Designer"],
  "systems-engineer": ["Systems Engineer", "Infrastructure Engineer", "Cloud Engineer"],
  "mechanical-engineer": ["Mechanical Engineer", "Civil Engineer", "Structural Engineer"],
  "digital-marketing": ["Digital Marketing Manager", "Marketing Manager", "Social Media Manager"],
  "brand-manager": ["Brand Manager", "Product Marketing Manager", "Brand Strategist"],
  "nlp-engineer": ["NLP Engineer", "Machine Learning Engineer, NLP", "Conversational AI Developer"],
  "cv-engineer": ["Computer Vision Engineer", "Machine Learning Engineer, Computer Vision", "Perception Engineer"],
  "rl-engineer": ["Reinforcement Learning Engineer", "RL Research Scientist", "Robotics Engineer"],
  "ai-ethics": ["AI Ethics Specialist", "Responsible AI Lead", "AI Policy Advisor"],
  "penetration-tester": ["Penetration Tester", "Offensive Security Engineer", "Red Team Operator"],
  "defensive-security": ["Security Analyst (SOC)", "Defensive Security Engineer", "Threat Hunter"],
  "incident-response": ["Incident Responder", "Digital Forensics Analyst", "Malware Analyst"],
  "governance-compliance": ["GRC Analyst", "IT Auditor", "Compliance Manager"],
  "data-analysis": ["Data Analyst", "Business Analyst", "SQL Analyst"],
  "machine-learning": ["Machine Learning Engineer", "Data Scientist, Machine Learning", "AI Engineer"],
  "data-engineering": ["Data Engineer", "ETL Developer", "Big Data Engineer"],
  "business-intelligence": ["BI Developer", "Business Intelligence Analyst", "Tableau Developer"],
  "brand-design": ["Brand Designer", "Visual Designer", "Brand Strategist"],
  illustration: ["Illustrator", "Concept Artist", "Graphic Artist"],
  "industrial-design": ["Industrial Designer", "Product Designer", "3D Modeler"],
  "content-marketing": ["Content Marketing Manager", "Content Strategist", "Copywriter"],
  "social-media-marketing": ["Social Media Manager", "Community Manager", "Social Media Strategist"],
  "paid-advertising": ["PPC Specialist", "Paid Media Manager", "Performance Marketing Manager"],
  "seo-specialist": ["SEO Specialist", "SEO Manager", "SEO Strategist"],
  "traditional-pm": ["Project Manager", "Program Manager", "Project Coordinator"],
  "consumer-pm": ["Product Manager, Consumer", "Associate Product Manager", "Group Product Manager"],
  "ux-research": ["UX Researcher", "User Researcher", "Research Manager"],
  "ux-analytics": ["UX Analyst", "Product Analyst", "Data Analyst, UX"],
  "frontend-development": ["Frontend Developer", "React Developer", "Frontend Engineer"],
  "backend-development": ["Backend Developer", "Backend Engineer", "Node.js Developer"],
  "full-stack-development": ["Full Stack Developer", "Full Stack Engineer", "MERN Stack Developer"],
  "ui-ux-development": ["UI/UX Developer", "Design Technologist", "Creative Technologist"],
}

const platformConfig: Record<
  JobPlatform,
  { logo: string; generateUrl: (query: string) => string; description: string }
> = {
  LinkedIn: {
    logo: "/linkdin.jpg",
    generateUrl: (query) =>
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&f_TPR=r86400&sortBy=DD`,
    description: "Best for corporate roles and professional networking.",
  },
  Naukri: {
    logo: "/naukri.jpg",
    generateUrl: (query) => `https://www.naukri.com/jobs-in-india?k=${encodeURIComponent(query)}&freshness=1`,
    description: "A leading job portal for opportunities in India.",
  },
  Wellfound: {
    logo: "/wellfound.jpg",
    generateUrl: (query) => `https://wellfound.com/jobs?q=${encodeURIComponent(query)}`,
    description: "The leading platform for jobs at startups and tech companies.",
  },
}

function JobsPageContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentJobTitles, setCurrentJobTitles] = useState<string[]>([])

  useEffect(() => {
    const titles = (courseId && jobTitlesByCareer[courseId]) || jobTitlesByCareer.default
    setCurrentJobTitles(titles)
  }, [courseId])

  const filteredTitles = currentJobTitles.filter((title) => title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Live Job Opportunities</h1>
              <p className="text-muted-foreground">
                Explore real-time job openings from top platforms, updated continuously.
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter job titles (e.g., Senior, Backend)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(platformConfig) as JobPlatform[]).map((platform) => (
            <Card key={platform} className="p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-8 w-8">
                  <Image
                    src={platformConfig[platform].logo}
                    alt={`${platform} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{platform}</h3>
                  <p className="text-xs text-muted-foreground">{platformConfig[platform].description}</p>
                </div>
              </div>

              <div className="flex-1 space-y-2 mb-6">
                <p className="text-sm font-medium text-foreground">Example Job Titles:</p>
                {filteredTitles.slice(0, 3).map((title) => (
                  <div key={title} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5 shrink-0" />
                    <span>{title}</span>
                  </div>
                ))}
                {filteredTitles.length === 0 && (
                  <p className="text-sm text-muted-foreground">No matching titles for your filter.</p>
                )}
              </div>

              <Button asChild className="mt-auto w-full">
                <a
                  href={platformConfig[platform].generateUrl(searchQuery
                      ? `${(courseId && jobTitlesByCareer[courseId]?.[0]) || jobTitlesByCareer.default[0]} ${searchQuery}`
                      : (courseId && jobTitlesByCareer[courseId]?.[0]) || jobTitlesByCareer.default[0]
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  View Live Jobs on {platform}
                </a>
              </Button>
            </Card>
          ))}
        </div>

        {filteredTitles.length === 0 && searchQuery && (
          <div className="mt-8">
            <Card className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No job titles found</h3>
              <p className="text-muted-foreground">Try adjusting your search query.</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default function JobsPage() {
  return (
    // Wrap the component in Suspense because it uses useSearchParams
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 animate-pulse" />
            <p className="text-lg font-medium text-muted-foreground">Loading Live Job Opportunities...</p>
          </div>
        </div>
      }
    >
      <JobsPageContent />
    </Suspense>
  )
}
