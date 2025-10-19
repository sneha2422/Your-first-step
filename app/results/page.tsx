"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Briefcase, ArrowRight, Download, Share2, BookOpen, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const careerPaths = {
  TC: [
    {
      id: "software-developer",
      title: "Software Developer",
      description: "Builds applications and software solutions",
      keySkills: ["Programming languages", "System design", "Algorithms"],
      dailyWork: "Coding, testing, architecture",
      growthPath: "Senior Developer → Technical Lead → CTO",
      salaryRange: "$100K - $180K",
      growthPotential: "Very High",
      learningPaths: [
        "Meta Back-End Developer Professional Certificate",
        "IBM Full Stack Software Developer Professional Certificate",
      ],
    },
    {
      id: "data-analytics",
      title: "Data Analytics",
      description: "Transforms data into business insights",
      keySkills: ["Statistics", "SQL", "Data visualization", "Python/R"],
      dailyWork: "Data cleaning, analysis, reporting, visualization",
      growthPath: "Data Analyst → Data Scientist → Analytics Director",
      salaryRange: "$80K - $150K",
      growthPotential: "Very High",
      learningPaths: ["Google Data Analytics Professional Certificate", "IBM Data Science Professional Certificate"],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      description: "Protects digital assets and systems",
      keySkills: ["Security protocols", "Threat detection", "Risk assessment"],
      dailyWork: "Security monitoring, incident response, compliance",
      growthPath: "Security Analyst → Security Architect → CISO",
      salaryRange: "$90K - $160K",
      growthPotential: "Very High",
      learningPaths: [
        "Google Cybersecurity Professional Certificate",
        "IBM Cybersecurity Analyst Professional Certificate",
      ],
    },
    {
      id: "software-engineer",
      title: "Software Engineering",
      description: "Architects complex software systems and infrastructure",
      keySkills: ["System architecture", "Advanced algorithms", "Scalability"],
      dailyWork: "Technical design, code architecture, system optimization",
      growthPath: "Senior Engineer → Principal Engineer → Engineering Director",
      salaryRange: "$120K - $200K",
      growthPotential: "Very High",
      learningPaths: ["Software Engineering Specialization", "Software Design and Architecture Specialization"],
    },
  ],
  BM: [
    {
      id: "strategy-manager",
      title: "Strategy Manager",
      description: "Develops and executes organizational growth strategies",
      keySkills: ["Market analysis", "Strategic planning", "Financial modeling"],
      dailyWork: "Research, stakeholder management, business planning",
      growthPath: "Strategy Analyst → Strategy Director → COO",
      salaryRange: "$110K - $180K",
      growthPotential: "High",
      learningPaths: ["Business Strategy Specialization", "Strategic Leadership and Management Specialization"],
    },
    {
      id: "project-manager",
      title: "Project Management",
      description: "Leads complex initiatives and teams",
      keySkills: ["Leadership", "Risk management", "Resource planning"],
      dailyWork: "Team coordination, timeline management, deliverables",
      growthPath: "Project Manager → Program Manager → Portfolio Director",
      salaryRange: "$90K - $160K",
      growthPotential: "High",
      learningPaths: [
        "Google Project Management Professional Certificate",
        "Project Management Principles and Practices",
      ],
    },
    {
      id: "operations-manager",
      title: "Operations Manager",
      description: "Optimizes business processes and performance",
      keySkills: ["Process improvement", "Team leadership", "Resource allocation"],
      dailyWork: "Operations oversight, performance tracking, optimization",
      growthPath: "Operations Lead → Operations Director → COO/CEO",
      salaryRange: "$85K - $155K",
      growthPotential: "High",
      learningPaths: ["Operations Management", "Supply Chain Excellence"],
    },
  ],
  HS: [
    {
      id: "clinical-lead",
      title: "Clinical Team Lead",
      description: "Guides clinical teams while developing talent",
      keySkills: ["Medical knowledge", "Leadership", "Quality management"],
      dailyWork: "Staff coaching, care oversight, team development",
      growthPath: "Team Lead → Clinical Director → Chief Medical Officer",
      salaryRange: "$95K - $170K",
      growthPotential: "High",
      learningPaths: ["Healthcare Organization Operations Specialization"],
    },
    {
      id: "healthcare-educator",
      title: "Healthcare Educator",
      description: "Designs and delivers clinical training programs",
      keySkills: ["Clinical expertise", "Instructional design", "Assessment"],
      dailyWork: "Training delivery, curriculum development, skills evaluation",
      growthPath: "Clinical Trainer → Education Director → Chief Learning Officer",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: ["Teaching and Assessing Clinical Skills"],
    },
  ],
  CD: [
    {
      id: "ux-ui-designer",
      title: "UX/UI Design",
      description: "Creates intuitive digital experiences",
      keySkills: ["User research", "Wireframing", "Interaction design"],
      dailyWork: "Interface design, user testing, prototyping",
      growthPath: "UX Designer → Lead Designer → UX Director",
      salaryRange: "$85K - $155K",
      growthPotential: "High",
      learningPaths: ["Google UX Design Certificate", "UI/UX Design Specialization"],
    },
    {
      id: "visual-designer",
      title: "Visual Design",
      description: "Develops brand and product visuals",
      keySkills: ["Typography", "Color theory", "Design software"],
      dailyWork: "Visual design, asset creation, brand guidelines",
      growthPath: "Visual Designer → Art Director → Creative Director",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: ["Graphic Design Specialization", "Visual Elements of User Interface Design"],
    },
  ],
  ED: [
    {
      id: "systems-engineer",
      title: "Systems Engineering",
      description: "Designs and optimizes complex systems",
      keySkills: ["System architecture", "Infrastructure", "Scalability"],
      dailyWork: "System design, optimization, technical planning",
      growthPath: "Systems Engineer → Systems Architect → Engineering Director",
      salaryRange: "$110K - $180K",
      growthPotential: "Very High",
      learningPaths: ["Systems Engineering Specialization"],
    },
    {
      id: "mechanical-engineer",
      title: "Mechanical/Civil Engineering",
      description: "Creates physical infrastructure and systems",
      keySkills: ["CAD", "Structural analysis", "Project management"],
      dailyWork: "Design work, calculations, specifications",
      growthPath: "Project Engineer → Senior Engineer → Engineering Manager",
      salaryRange: "$85K - $160K",
      growthPotential: "High",
      learningPaths: ["Engineering of Structures Specialization"],
    },
  ],
  MC: [
    {
      id: "digital-marketing",
      title: "Digital Marketing Manager",
      description: "Drives digital engagement and growth",
      keySkills: ["Analytics", "Content creation", "Social media management"],
      dailyWork: "Campaign execution, performance tracking, optimization",
      growthPath: "Marketing Manager → Digital Director → CMO",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: [
        "Google Digital Marketing & E-commerce Professional Certificate",
        "Meta Social Media Marketing Certificate",
      ],
    },
    {
      id: "brand-manager",
      title: "Brand Manager",
      description: "Shapes brand identity and market position",
      keySkills: ["Brand strategy", "Market research", "Creative direction"],
      dailyWork: "Brand development, creative oversight, audience engagement",
      growthPath: "Brand Manager → Brand Director → Global Brand Chief",
      salaryRange: "$85K - $160K",
      growthPotential: "High",
      learningPaths: ["Branding Specialization", "Brand Management"],
    },
  ],
}

const domainNames: Record<string, string> = {
  TC: "Technical",
  BM: "Business",
  HS: "Healthcare",
  CD: "Creative",
  ED: "Engineering",
  MC: "Marketing",
}

export default function ResultsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("TC")
  const [selectedCareer, setSelectedCareer] = useState<any>(careerPaths.TC[0])

  const careers = careerPaths[selectedDomain as keyof typeof careerPaths] || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Career Recommendations</h1>
              <p className="text-muted-foreground mt-1">Explore career paths across different domains</p>
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
        {/* Domain Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Select a Domain</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {Object.entries(domainNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedDomain(key)
                  setSelectedCareer(careerPaths[key as keyof typeof careerPaths][0])
                }}
                className={`p-4 rounded-lg border-2 transition-all font-medium ${
                  selectedDomain === key
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Career Selection and Details */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {/* Left: Career List */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-foreground mb-4">Career Paths</h3>
            <div className="space-y-2">
              {careers.map((career: any) => (
                <button
                  key={career.id}
                  onClick={() => setSelectedCareer(career)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCareer.id === career.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <h4 className="font-semibold text-foreground text-sm">{career.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{career.salaryRange}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Career Details */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">{selectedCareer.title}</h2>
              <p className="text-muted-foreground mb-6">{selectedCareer.description}</p>

              {/* Key Info */}
              <div className="grid gap-6 md:grid-cols-2 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                  <p className="text-xl font-bold text-foreground">{selectedCareer.salaryRange}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Growth Potential</p>
                  <p className="text-xl font-bold text-foreground">{selectedCareer.growthPotential}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Growth Path</p>
                  <p className="text-lg font-semibold text-foreground">{selectedCareer.growthPath}</p>
                </div>
              </div>

              {/* Daily Work */}
              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Daily Work</h4>
                <p className="text-muted-foreground">{selectedCareer.dailyWork}</p>
              </div>

              {/* Key Skills */}
              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Key Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.keySkills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Paths */}
              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Recommended Learning Paths</h4>
                <div className="space-y-2">
                  {selectedCareer.learningPaths.map((path: string) => (
                    <div key={path} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{path}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/dashboard">
                <Button className="w-full">
                  Explore Learning Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Your Next Steps</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Learn New Skills</h4>
              <p className="text-sm text-muted-foreground">Explore recommended courses and certifications</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Find Job Opportunities</h4>
              <p className="text-sm text-muted-foreground">Browse positions matching your career path</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Track Your Progress</h4>
              <p className="text-sm text-muted-foreground">Monitor your career development journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
