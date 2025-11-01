"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const learningPathData: Record<string, { id: number; title: string; progress: number; status: string }[]> = {
  default: [
    { id: 1, title: "Advanced Product Strategy", progress: 75, status: "in-progress" },
    { id: 2, title: "Data-Driven Decision Making", progress: 100, status: "completed" },
    { id: 3, title: "Leadership for Managers", progress: 30, status: "in-progress" },
  ],
  "software-developer": [
    { id: 1, title: "Meta Back-End Developer Professional Certificate", progress: 15, status: "in-progress" },
    { id: 2, title: "IBM Full Stack Software Developer Professional Certificate", progress: 0, status: "not-started" },
  ],
  "data-analytics": [
    { id: 1, title: "Google Data Analytics Professional Certificate", progress: 60, status: "in-progress" },
    { id: 2, title: "IBM Data Science Professional Certificate", progress: 20, status: "in-progress" },
  ],
  "cybersecurity": [
    { id: 1, title: "Google Cybersecurity Professional Certificate", progress: 25, status: "in-progress" },
    { id: 2, title: "IBM Cybersecurity Analyst Professional Certificate", progress: 0, status: "not-started" },
  ],
  "ux-ui-designer": [
    { id: 1, title: "Google UX Design Certificate", progress: 45, status: "completed" },
    { id: 2, title: "UI/UX Design Specialization", progress: 10, status: "in-progress" },
  ],
  "software-engineer": [
    { id: 1, title: "Software Engineering Specialization", progress: 20, status: "in-progress" },
    { id: 2, title: "Software Design and Architecture Specialization", progress: 0, status: "not-started" },
  ],
  "strategy-manager": [
    { id: 1, title: "Business Strategy Specialization", progress: 50, status: "in-progress" },
    { id: 2, title: "Strategic Leadership and Management Specialization", progress: 10, status: "in-progress" },
  ],
  "project-manager": [
    { id: 1, title: "Google Project Management Professional Certificate", progress: 40, status: "in-progress" },
    { id: 2, title: "Project Management Principles and Practices", progress: 100, status: "completed" },
  ],
  "operations-manager": [
    { id: 1, title: "Operations Management", progress: 25, status: "in-progress" },
    { id: 2, title: "Supply Chain Excellence", progress: 0, status: "not-started" },
  ],
  "clinical-lead": [
    { id: 1, title: "Healthcare Organization Operations Specialization", progress: 30, status: "in-progress" },
  ],
  "healthcare-educator": [
    { id: 1, title: "Teaching and Assessing Clinical Skills", progress: 40, status: "in-progress" },
  ],
  "visual-designer": [
    { id: 1, title: "Graphic Design Specialization", progress: 35, status: "in-progress" },
    { id: 2, title: "Visual Elements of User Interface Design", progress: 0, status: "not-started" },
  ],
  "systems-engineer": [
    { id: 1, title: "Systems Engineering Specialization", progress: 15, status: "in-progress" },
  ],
  "mechanical-engineer": [
    { id: 1, title: "Engineering of Structures Specialization", progress: 10, status: "in-progress" },
  ],
  "digital-marketing": [
    { id: 1, title: "Google Digital Marketing & E-commerce Professional Certificate", progress: 45, status: "in-progress" },
    { id: 2, title: "Meta Social Media Marketing Certificate", progress: 0, status: "not-started" },
  ],
  "brand-manager": [
    { id: 1, title: "Branding Specialization", progress: 50, status: "in-progress" },
    { id: 2, title: "Brand Management", progress: 15, status: "in-progress" },
  ],
  "nlp-engineer": [
    { id: 1, title: "Natural Language Processing Specialization", progress: 25, status: "in-progress" },
    { id: 2, title: "TensorFlow Developer Professional Certificate", progress: 0, status: "not-started" },
  ],
  "cv-engineer": [
    { id: 1, title: "Deep Learning for Computer Vision Specialization", progress: 20, status: "in-progress" },
    { id: 2, title: "Advanced Computer Vision with TensorFlow", progress: 0, status: "not-started" },
  ],
  "rl-engineer": [
    { id: 1, title: "Deep Learning and Reinforcement Learning", progress: 15, status: "in-progress" },
    { id: 2, title: "Modern Robotics Specialization", progress: 0, status: "not-started" },
  ],
  "ai-ethics": [
    { id: 1, title: "AI Ethics Specialization", progress: 30, status: "in-progress" },
    { id: 2, title: "Technology Policy", progress: 0, status: "not-started" },
  ],
  "penetration-tester": [
    { id: 1, title: "Offensive Security Certified Professional (OSCP)", progress: 10, status: "in-progress" },
    { id: 2, title: "GIAC Penetration Tester (GPEN)", progress: 0, status: "not-started" },
  ],
  "defensive-security": [
    { id: 1, title: "CompTIA Security+", progress: 35, status: "in-progress" },
    { id: 2, title: "Certified Information Systems Security Professional (CISSP)", progress: 0, status: "not-started" },
  ],
  "incident-response": [
    { id: 1, title: "GIAC Certified Incident Handler (GCIH)", progress: 15, status: "in-progress" },
    { id: 2, title: "Certified Reverse Engineering Analyst (CREA)", progress: 0, status: "not-started" },
  ],
  "governance-compliance": [
    { id: 1, title: "Certified Information Security Manager (CISM)", progress: 10, status: "in-progress" },
    { id: 2, title: "Certified Information Systems Auditor (CISA)", progress: 0, status: "not-started" },
  ],
  "data-analysis": [
    { id: 1, title: "Google Data Analytics Professional Certificate", progress: 20, status: "in-progress" },
    { id: 2, title: "IBM Data Analyst Professional Certificate", progress: 0, status: "not-started" },
  ],
  "machine-learning": [
    { id: 1, title: "Deep Learning Specialization (Coursera/Andrew Ng)", progress: 25, status: "in-progress" },
    { id: 2, title: "AWS ML Specialty Certification Prep", progress: 0, status: "not-started" },
  ],
  "data-engineering": [
    { id: 1, title: "Google Professional Data Engineer", progress: 5, status: "in-progress" },
    { id: 2, title: "AWS Certified Data Analytics - Specialty", progress: 0, status: "not-started" },
  ],
  "business-intelligence": [
    { id: 1, title: "Microsoft Certified: Power BI Data Analyst Associate", progress: 30, status: "in-progress" },
    { id: 2, title: "Tableau Desktop Specialist", progress: 0, status: "not-started" },
  ],
  "brand-design": [
    { id: 1, title: "Foundational Graphic Design courses", progress: 60, status: "in-progress" },
    { id: 2, title: "Brand Strategy certifications", progress: 0, status: "not-started" },
  ],
  "ui-ux-design": [
    { id: 1, title: "Google UX Design Certificate", progress: 45, status: "in-progress" },
    { id: 2, title: "UI/UX Design Specialization", progress: 10, status: "in-progress" },
  ],
  "illustration": [
    { id: 1, title: "Specialized Illustration degrees or courses", progress: 30, status: "in-progress" },
    { id: 2, title: "Focused portfolio development", progress: 0, status: "not-started" },
  ],
  "industrial-design": [
    { id: 1, title: "Bachelor's/Master's Degree in Industrial Design", progress: 15, status: "in-progress" },
    { id: 2, title: "Professional Certification in CAD Software", progress: 0, status: "not-started" },
  ],
  "content-marketing": [
    { id: 1, title: "Hubspot Content Marketing Certification", progress: 70, status: "in-progress" },
    { id: 2, title: "Specialized SEO courses", progress: 0, status: "not-started" },
  ],
  "social-media-marketing": [
    { id: 1, title: "Meta Certified Digital Marketing Associate", progress: 60, status: "in-progress" },
    { id: 2, title: "Specialized courses in platform analytics", progress: 0, status: "not-started" },
  ],
  "paid-advertising": [
    { id: 1, title: "Google Ads Certifications", progress: 55, status: "in-progress" },
    { id: 2, title: "Meta Blueprint Certifications", progress: 0, status: "not-started" },
  ],
  "search-engine-optimization": [
    { id: 1, title: "Google Analytics Certification", progress: 30, status: "in-progress" },
    { id: 2, title: "Moz/SEMrush SEO Certifications", progress: 0, status: "not-started" },
  ],
  "agile-pm": [
    { id: 1, title: "Certified ScrumMaster (CSM)", progress: 40, status: "in-progress" },
    { id: 2, title: "PMI Agile Certified Practitioner (PMI-ACP)", progress: 0, status: "not-started" },
  ],
  "traditional-pm": [
    { id: 1, title: "Project Management Professional (PMP) Certification", progress: 10, status: "in-progress" },
    { id: 2, title: "Certified Associate in Project Management (CAPM)", progress: 0, status: "not-started" },
  ],
  "technical-pm": [
    { id: 1, title: "Software Product Management Specialization", progress: 30, status: "in-progress" },
    { id: 2, title: "API Product Management", progress: 0, status: "not-started" },
  ],
  "growth-pm": [
    { id: 1, title: "Reforge Growth Series", progress: 15, status: "in-progress" },
    { id: 2, title: "CXL Growth Certifications", progress: 0, status: "not-started" },
  ],
  "consumer-pm": [
    { id: 1, title: "Product School Certifications", progress: 35, status: "in-progress" },
    { id: 2, title: "Product Management courses/bootcamps", progress: 0, status: "not-started" },
  ],
  "strategic-pm": [
    { id: 1, title: "Master of Business Administration (MBA)", progress: 20, status: "in-progress" },
    { id: 2, title: "Advanced Product Strategy courses", progress: 0, status: "not-started" },
  ],
  "ux-research": [
    { id: 1, title: "Specialized Human-Computer Interaction (HCI) degrees", progress: 25, status: "in-progress" },
    { id: 2, title: "Research Design courses", progress: 0, status: "not-started" },
  ],
  "interaction-design": [
    { id: 1, title: "Masters in Interaction Design", progress: 30, status: "in-progress" },
    { id: 2, title: "Specialized courses on prototyping tools", progress: 0, status: "not-started" },
  ],
  "ui-design": [
    { id: 1, title: "Graphic Design or Visual Design courses", progress: 20, status: "in-progress" },
    { id: 2, title: "Specialization in UI toolkits", progress: 0, status: "not-started" },
  ],
  "ux-analytics": [
    { id: 1, title: "Google Analytics Certification", progress: 80, status: "in-progress" },
    { id: 2, title: "Specialized courses in Product and UX Analytics", progress: 0, status: "not-started" },
  ],
  "frontend-development": [
    { id: 1, title: "FreeCodeCamp", progress: 25, status: "in-progress" },
    { id: 2, title: "The Odin Project", progress: 0, status: "not-started" },
  ],
  "backend-development": [
    { id: 1, title: "Specialized courses in Python/Node.js backend frameworks", progress: 20, status: "in-progress" },
    { id: 2, title: "Cloud Certifications", progress: 0, status: "not-started" },
  ],
  "full-stack-development": [
    { id: 1, title: "Comprehensive Full Stack bootcamps/programs", progress: 10, status: "in-progress" },
    { id: 2, title: "Architecture training", progress: 0, status: "not-started" },
  ],
  "ui-ux-development": [
    { id: 1, title: "Focused courses on React/Vue component libraries", progress: 50, status: "in-progress" },
    { id: 2, title: "Web Accessibility certifications", progress: 0, status: "not-started" },
  ],
}

function LearningPathContent() {
  const [courses, setCourses] = useState<{ id: number; title: string; progress: number; status: string }[]>([])
  const [isUpdateCourseOpen, setUpdateCourseOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<{ id: number; title: string; progress: number; status: string } | null>(null)
  const [updatedProgress, setUpdatedProgress] = useState(0)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")

  useEffect(() => {
    const initialCourses = (courseId && learningPathData[courseId]) || learningPathData.default
    setCourses(initialCourses)
  }, [courseId])

  const handleUpdateProgress = () => {
    if (selectedCourse) {
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id
            ? {
                ...c,
                progress: updatedProgress,
                status: updatedProgress === 100 ? "completed" : "in-progress",
              }
            : c,
        ),
      )
      setUpdateCourseOpen(false)
      setSelectedCourse(null)
    }
  }

  const openUpdateDialog = (course: { id: number; title: string; progress: number; status: string }) => {
    setSelectedCourse(course)
    setUpdatedProgress(course.progress)
    setUpdateCourseOpen(true)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Your Learning Path</h2>
        <Link href="/learning">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => openUpdateDialog(course)}
            className="w-full p-4 rounded-lg border border-border text-left hover:border-primary/50 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  {course.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {course.progress === 100 ? "Completed" : course.progress > 0 ? "In Progress" : "Not Started"}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{course.progress}% complete</p>
          </button>
        ))}
      </div>

      <Dialog open={isUpdateCourseOpen} onOpenChange={setUpdateCourseOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Course Progress</DialogTitle>
            <DialogDescription>{selectedCourse?.title}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="progress">Progress: {updatedProgress}%</Label>
            <Input
              id="progress"
              type="range"
              min="0"
              max="100"
              value={updatedProgress}
              onChange={(e) => setUpdatedProgress(Number(e.target.value))}
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateProgress}>
              Update Progress
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default function LearningPathWidget() {
  return (
    <Suspense fallback={<Card className="p-6">Loading learning path...</Card>}>
      <LearningPathContent />
    </Suspense>
  )
}
