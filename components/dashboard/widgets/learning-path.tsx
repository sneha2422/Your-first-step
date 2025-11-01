"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const learningPathData: Record<string, { id: number; title: string; progress: number; status: string }[]> = {
  default: [
    { id: 1, title: "Advanced Product Strategy", progress: 75, status: "in-progress" },
    { id: 2, title: "Data-Driven Decision Making", progress: 100, status: "completed" },
    { id: 3, title: "Leadership for Managers", progress: 30, status: "in-progress" },
  ],
  "software-developer": [
    { id: 1, title: "Meta Back-End Developer Certificate", progress: 15, status: "in-progress" },
    { id: 2, title: "IBM Full Stack Developer Certificate", progress: 0, status: "not-started" },
    { id: 3, title: "Algorithms Specialization", progress: 50, status: "in-progress" },
  ],
  "data-analytics": [
    { id: 1, title: "Google Data Analytics Certificate", progress: 60, status: "in-progress" },
    { id: 2, title: "IBM Data Science Certificate", progress: 100, status: "completed" },
    { id: 3, title: "Tableau Business Intelligence", progress: 0, status: "not-started" },
  ],
  "cybersecurity": [
    { id: 1, title: "Google Cybersecurity Certificate", progress: 25, status: "in-progress" },
    { id: 2, title: "CompTIA Security+ Prep Course", progress: 40, status: "in-progress" },
    { id: 3, "title": "Ethical Hacking Essentials", progress: 0, status: "not-started" },
  ],
  "penetration-tester": [
    { id: 1, title: "Offensive Security Certified Professional (OSCP)", progress: 10, status: "in-progress" },
    { id: 2, title: "GIAC Penetration Tester (GPEN)", progress: 0, status: "not-started" },
    { id: 3, title: "Advanced Penetration Testing", progress: 0, status: "not-started" },
  ],
  "data-analysis": [
    { id: 1, title: "Google Data Analytics Professional Certificate", progress: 20, status: "in-progress" },
    { id: 2, title: "IBM Data Analyst Professional Certificate", progress: 0, status: "not-started" },
    { id: 3, title: "SQL for Data Science", progress: 50, status: "in-progress" },
  ],
}

function LearningPathContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")

  const courses = (courseId && learningPathData[courseId]) || learningPathData.default

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Your Learning Path</h2>
        <Link href={`/learning${courseId ? `?course=${courseId}` : ""}`}>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="p-4 rounded-lg border border-border">
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
                    {course.status === "completed" ? "Completed" : "In Progress"}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{course.progress}% complete</p>
          </div>
        ))}
      </div>
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
