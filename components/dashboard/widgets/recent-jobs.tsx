"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Briefcase, MapPin, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const jobSearches: Record<string, { id: number; title: string }[]> = {
  default: [
    { id: 1, title: "Product Manager" },
    { id: 2, title: "Senior Product Manager" },
    { id: 3, title: "Product Lead" },
  ],
  "software-developer": [
    { id: 101, title: "Software Developer" },
    { id: 102, title: "Backend Developer" },
    { id: 103, title: "Full Stack Developer" },
  ],
  "data-analytics": [
    { id: 201, title: "Data Analyst" },
    { id: 202, title: "Business Intelligence Analyst" },
    { id: 203, title: "Senior Data Analyst" },
  ],
  cybersecurity: [
    { id: 301, title: "Cybersecurity Analyst" },
    { id: 302, title: "Security Engineer" },
    { id: 303, title: "Incident Responder" },
  ],
  "software-engineer": [
    { id: 401, title: "Software Engineer" },
    { id: 402, title: "Senior Software Engineer" },
    { id: 403, title: "Staff Engineer" },
  ],
  "clinical-lead": [
    { id: 501, title: "Clinical Team Lead" },
    { id: 502, title: "Clinical Manager" },
    { id: 503, title: "Nurse Manager" },
  ],
  "healthcare-educator": [
    { id: 601, title: "Healthcare Educator" },
    { id: 602, title: "Clinical Educator" },
    { id: 603, title: "Nurse Educator" },
  ],
  "ui-ux-design": [
    { id: 701, title: "UX/UI Designer" },
    { id: 702, title: "Product Designer" },
    { id: 703, title: "UX Designer" },
  ],
  "visual-designer": [
    { id: 801, title: "Visual Designer" },
    { id: 802, title: "Graphic Designer" },
    { id: 803, title: "Communication Designer" },
  ],
  "systems-engineer": [
    { id: 901, title: "Systems Engineer" },
    { id: 902, title: "Infrastructure Engineer" },
    { id: 903, title: "Cloud Engineer" },
  ],
  "mechanical-engineer": [
    { id: 1001, title: "Mechanical Engineer" },
    { id: 1002, title: "Civil Engineer" },
    { id: 1003, title: "Structural Engineer" },
  ],
  "digital-marketing": [
    { id: 1101, title: "Digital Marketing Manager" },
    { id: 1102, title: "Marketing Manager" },
    { id: 1103, title: "Social Media Manager" },
  ],
  "brand-manager": [{ id: 1201, title: "Brand Manager" }, { id: 1202, title: "Product Marketing Manager" }, { id: 1203, title: "Brand Strategist" }],
  "nlp-engineer": [
    { id: 1301, title: "NLP Engineer" },
    { id: 1302, title: "Machine Learning Engineer, NLP" },
    { id: 1303, title: "Conversational AI Developer" },
  ],
  "cv-engineer": [
    { id: 1401, title: "Computer Vision Engineer" },
    { id: 1402, title: "Machine Learning Engineer, Computer Vision" },
    { id: 1403, title: "Perception Engineer" },
  ],
  "rl-engineer": [
    { id: 1501, title: "Reinforcement Learning Engineer" },
    { id: 1502, title: "RL Research Scientist" },
    { id: 1503, title: "Robotics Engineer" },
  ],
  "ai-ethics": [
    { id: 1601, title: "AI Ethics Specialist" },
    { id: 1602, title: "Responsible AI Lead" },
    { id: 1603, title: "AI Policy Advisor" },
  ],
  "penetration-tester": [
    { id: 1701, title: "Penetration Tester" },
    { id: 1702, title: "Offensive Security Engineer" },
    { id: 1703, title: "Red Team Operator" },
  ],
  "defensive-security": [
    { id: 1801, title: "Security Analyst (SOC)" },
    { id: 1802, title: "Defensive Security Engineer" },
    { id: 1803, title: "Threat Hunter" },
  ],
  "incident-response": [
    { id: 1901, title: "Incident Responder" },
    { id: 1902, title: "Digital Forensics Analyst" },
    { id: 1903, title: "Malware Analyst" },
  ],
  "governance-compliance": [
    { id: 2001, title: "GRC Analyst" },
    { id: 2002, title: "IT Auditor" },
    { id: 2003, title: "Compliance Manager" },
  ],
  "data-analysis": [
    { id: 2101, title: "Data Analyst" },
    { id: 2102, title: "Business Analyst" },
    { id: 2103, title: "SQL Analyst" },
  ],
  "machine-learning": [
    { id: 2201, title: "Machine Learning Engineer" },
    { id: 2202, title: "Data Scientist, Machine Learning" },
    { id: 2203, title: "AI Engineer" },
  ],
  "data-engineering": [
    { id: 2301, title: "Data Engineer" },
    { id: 2302, title: "ETL Developer" },
    { id: 2303, title: "Big Data Engineer" },
  ],
  "business-intelligence": [
    { id: 2401, title: "BI Developer" },
    { id: 2402, title: "Business Intelligence Analyst" },
    { id: 2403, title: "Tableau Developer" },
  ],
  "brand-design": [
    { id: 2501, title: "Brand Designer" },
    { id: 2502, title: "Visual Designer" },
    { id: 2503, title: "Brand Strategist" },
  ],
  illustration: [
    { id: 2601, title: "Illustrator" },
    { id: 2602, title: "Concept Artist" },
    { id: 2603, title: "Graphic Artist" },
  ],
  "industrial-design": [
    { id: 2701, title: "Industrial Designer" },
    { id: 2702, title: "Product Designer" },
    { id: 2703, title: "3D Modeler" },
  ],
  "content-marketing": [
    { id: 2801, title: "Content Marketing Manager" },
    { id: 2802, title: "Content Strategist" },
    { id: 2803, title: "Copywriter" },
  ],
  "social-media-marketing": [
    { id: 2901, title: "Social Media Manager" },
    { id: 2902, title: "Community Manager" },
    { id: 2903, title: "Social Media Strategist" },
  ],
  "paid-advertising": [
    { id: 3001, title: "PPC Specialist" },
    { id: 3002, title: "Paid Media Manager" },
    { id: 3003, title: "Performance Marketing Manager" },
  ],
  "seo-specialist": [
    { id: 3101, title: "SEO Specialist" },
    { id: 3102, title: "SEO Manager" },
    { id: 3103, title: "SEO Strategist" },
  ],
  "traditional-pm": [
    { id: 3201, title: "Project Manager" },
    { id: 3202, title: "Program Manager" },
    { id: 3203, title: "Project Coordinator" },
  ],
  "consumer-pm": [
    { id: 3301, title: "Product Manager, Consumer" },
    { id: 3302, title: "Associate Product Manager" },
    { id: 3303, title: "Group Product Manager" },
  ],
  "ux-research": [
    { id: 3401, title: "UX Researcher" },
    { id: 3402, title: "User Researcher" },
    { id: 3403, title: "Research Manager" },
  ],
  "ux-analytics": [
    { id: 3601, title: "UX Analyst" },
    { id: 3602, title: "Product Analyst" },
    { id: 3603, title: "Data Analyst, UX" },
  ],
  "frontend-development": [
    { id: 3701, title: "Frontend Developer" },
    { id: 3702, title: "React Developer" },
    { id: 3703, title: "Frontend Engineer" },
  ],
  "backend-development": [
    { id: 3801, title: "Backend Developer" },
    { id: 3802, title: "Backend Engineer" },
    { id: 3803, title: "Node.js Developer" },
  ],
  "full-stack-development": [
    { id: 3901, title: "Full Stack Developer" },
    { id: 3902, title: "Full Stack Engineer" },
    { id: 3903, title: "MERN Stack Developer" },
  ],
  "ui-ux-development": [
    { id: 4001, title: "UI/UX Developer" },
    { id: 4002, title: "Design Technologist" },
    { id: 4003, title: "Creative Technologist" },
  ],
}

function RecentJobsContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")
  const [searches, setSearches] = useState(jobSearches.default)

  useEffect(() => {
    const newSearches = (courseId && jobSearches[courseId]) || jobSearches.default
    setSearches(newSearches)
  }, [courseId])

  if (searches.length === 0) {
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
        <div className="text-center text-muted-foreground p-4">
          <Briefcase className="mx-auto h-8 w-8 mb-2" />
          <p className="font-medium">No jobs found for this path yet.</p>
          <p className="text-sm">Check back later for new opportunities.</p>
        </div>
      </Card>
    )
  }
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recently Matched Jobs</h2>
        <Link href={`/jobs${courseId ? `?course=${courseId}` : ""}`}>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {searches.map((search) => (
          <a
            key={search.id}
            href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
              search.title,
            )}&f_TPR=r86400&sortBy=DD`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{search.title}</h3>
              <p className="text-sm text-muted-foreground">Find on LinkedIn (Last 24 hours)</p>
            </div>
            <div className="shrink-0">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </a>
        ))}
      </div>
    </Card>
  )
}

export default function RecentJobsWidget() {
  return (
    // Wrap the component in Suspense because it uses useSearchParams
    <Suspense fallback={<Card className="p-6">Loading jobs...</Card>}>
      <RecentJobsContent />
    </Suspense>
  )
}
