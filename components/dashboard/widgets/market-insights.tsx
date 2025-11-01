"use client"

import { TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function MarketInsightsWidget() {
  const insights = [
    { id: 1, title: "PM demand up 23%", trend: "up" },
    { id: 2, title: "Avg salary: $165K", trend: "up" },
    { id: 3, title: "Remote roles: 45%", trend: "up" },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Market Insights</h2>
        <Button variant="ghost" size="sm">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <TrendingUp className="h-4 w-4 text-primary shrink-0" />
            <p className="text-sm text-foreground">{insight.title}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
