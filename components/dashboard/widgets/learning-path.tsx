"use client"

import Link from "next/link"
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LearningPathWidget() {
  const courses = [
    { id: 1, title: "Advanced Product Strategy", progress: 75, status: "in-progress" },
    { id: 2, title: "Data-Driven Decision Making", progress: 100, status: "completed" },
    { id: 3, title: "Leadership for Managers", progress: 30, status: "in-progress" },
  ]

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
          <div key={course.id} className="p-4 rounded-lg border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
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
