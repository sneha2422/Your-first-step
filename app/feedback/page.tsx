"use client"

import type React from "react"

import { useState } from "react"
import { Send, MessageSquare, Star, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [rating, setRating] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ title: "", description: "", email: "" })
      setRating(0)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Feedback & Suggestions</h1>
              <p className="text-muted-foreground mt-1">Help us improve CareerPath</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Feedback Type</label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { id: "suggestion", label: "Suggestion", icon: MessageSquare },
                      { id: "bug", label: "Bug Report", icon: AlertCircle },
                      { id: "feature", label: "Feature Request", icon: Star },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFeedbackType(type.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition ${
                          feedbackType === type.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                {feedbackType === "suggestion" && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">How satisfied are you?</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setRating(star)} className="transition">
                          <Star
                            className={`h-8 w-8 ${
                              star <= rating ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                  <Input
                    placeholder="Brief title of your feedback"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    placeholder="Tell us more about your feedback..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={6}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email (Optional)</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">We'll use this to follow up if needed</p>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={submitted}>
                  <Send className="mr-2 h-4 w-4" />
                  {submitted ? "Thank you for your feedback!" : "Submit Feedback"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar - Recent Updates */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Recent Updates</h3>
              <div className="space-y-4">
                {[
                  { date: "Today", update: "Live LinkedIn job integration" },
                  { date: "Yesterday", update: "Dark theme support added" },
                  { date: "2 days ago", update: "Coursera course sync enabled" },
                  { date: "3 days ago", update: "Naukri portal integration" },
                ].map((item, idx) => (
                  <div key={idx} className="pb-4 border-b border-border last:border-0">
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <p className="text-sm text-foreground font-medium">{item.update}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold text-foreground mb-2">Your Impact</h3>
              <p className="text-sm text-muted-foreground">
                Your feedback helps us build a better platform for everyone. Thank you for being part of our community!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
