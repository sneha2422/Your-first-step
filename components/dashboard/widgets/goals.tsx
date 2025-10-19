"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function GoalsWidget() {
  const goals = [
    { id: 1, title: "Get PM certification", deadline: "3 months", progress: 60 },
    { id: 2, title: "Learn SQL basics", deadline: "2 months", progress: 40 },
    { id: 3, title: "Build portfolio project", deadline: "4 months", progress: 20 },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Career Goals</h2>
        <button className="p-1 hover:bg-muted rounded transition">
          <Plus className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.id} className="p-3 rounded-lg border border-border">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">{goal.title}</h3>
              <span className="text-xs text-muted-foreground">{goal.deadline}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${goal.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4 bg-transparent">
        <Plus className="mr-2 h-4 w-4" />
        Add Goal
      </Button>
    </Card>
  )
}
