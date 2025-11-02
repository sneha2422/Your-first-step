"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Menu, X, Briefcase, TrendingUp, BookOpen, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard/header"
import DashboardSidebar from "@/components/dashboard/sidebar"
import RecentJobsWidget from "@/components/dashboard/widgets/recent-jobs"
import LearningPathWidget from "@/components/dashboard/widgets/learning-path"
import MarketInsightsWidget from "@/components/dashboard/widgets/market-insights"
import GoalsWidget from "@/components/dashboard/widgets/goals"

const recommendationsData: Record<string, { title: string; company: string; match: number; salary: string }[]> = {
  default: [
    { title: "Senior Product Manager", company: "Google", match: 94, salary: "$150K - $200K" },
    { title: "Product Lead", company: "Microsoft", match: 91, salary: "$140K - $190K" },
    { title: "Head of Product", company: "Stripe", match: 88, salary: "$160K - $220K" },
  ],
  "software-developer": [
    { title: "Backend Developer", company: "Netflix", match: 95, salary: "$130K - $190K" },
    { title: "Full Stack Developer", company: "Amazon", match: 92, salary: "$120K - $180K" },
    { title: "Junior Software Developer", company: "Salesforce", match: 89, salary: "$90K - $120K" },
  ],
  "data-analytics": [
    { title: "Data Analyst", company: "Spotify", match: 96, salary: "$95K - $140K" },
    { title: "Business Intelligence Analyst", company: "Meta", match: 93, salary: "$110K - $160K" },
    { title: "Senior Data Analyst", company: "Uber", match: 90, salary: "$120K - $170K" },
  ],
  cybersecurity: [
    { title: "Cybersecurity Analyst", company: "Palo Alto Networks", match: 97, salary: "$100K - $150K" },
    { title: "Security Engineer", company: "CrowdStrike", match: 94, salary: "$115K - $170K" },
    { title: "Incident Responder", company: "Mandiant (Google)", match: 91, salary: "$110K - $165K" },
  ],
  "software-engineer": [
    { title: "Senior Software Engineer", company: "Apple", match: 98, salary: "$160K - $230K" },
    { title: "Staff Engineer, Distributed Systems", company: "LinkedIn", match: 95, salary: "$180K - $250K+" },
    { title: "Software Engineer, Infrastructure", company: "Cloudflare", match: 92, salary: "$140K - $200K" },
  ],
  "strategy-manager": [
    { title: "Strategy Manager", company: "McKinsey & Company", match: 96, salary: "$140K - $190K" },
    { title: "Corporate Strategist", company: "Deloitte", match: 93, salary: "$130K - $180K" },
    { title: "Business Strategy Analyst", company: "Bain & Company", match: 90, salary: "$110K - $160K" },
  ],
  "project-manager": [
    { title: "Technical Project Manager", company: "Google", match: 95, salary: "$120K - $170K" },
    { title: "Agile Project Manager", company: "Atlassian", match: 92, salary: "$110K - $160K" },
    { title: "Project Manager", company: "IBM", match: 89, salary: "$100K - $150K" },
  ],
  "operations-manager": [
    { title: "Operations Manager", company: "Amazon", match: 94, salary: "$100K - $150K" },
    { title: "Supply Chain Manager", company: "Tesla", match: 91, salary: "$110K - $160K" },
    { title: "Logistics Manager", company: "FedEx", match: 88, salary: "$90K - $140K" },
  ],
  "clinical-lead": [
    { title: "Clinical Team Lead", company: "Pfizer", match: 96, salary: "$110K - $160K" },
    { title: "Nurse Manager", company: "HCA Healthcare", match: 92, salary: "$95K - $140K" },
    { title: "Clinical Research Manager", company: "Johnson & Johnson", match: 90, salary: "$120K - $170K" },
  ],
  "healthcare-educator": [
    { title: "Clinical Educator", company: "Mayo Clinic", match: 95, salary: "$85K - $120K" },
    { title: "Nurse Educator", company: "Cleveland Clinic", match: 91, salary: "$80K - $115K" },
    { title: "Patient Educator", company: "Kaiser Permanente", match: 88, salary: "$75K - $110K" },
  ],
  "visual-designer": [
    { title: "Visual Designer", company: "Canva", match: 96, salary: "$90K - $140K" },
    { title: "Communication Designer", company: "Mailchimp", match: 92, salary: "$85K - $130K" },
    { title: "Graphic Designer", company: "Pentagram", match: 89, salary: "$80K - $120K" },
  ],
  "systems-engineer": [
    { title: "Systems Engineer", company: "Lockheed Martin", match: 95, salary: "$110K - $160K" },
    { title: "Cloud Infrastructure Engineer", company: "AWS", match: 93, salary: "$130K - $180K" },
    { title: "Site Reliability Engineer (SRE)", company: "Google", match: 91, salary: "$140K - $200K" },
  ],
  "mechanical-engineer": [
    { title: "Mechanical Engineer", company: "Boston Dynamics", match: 94, salary: "$95K - $140K" },
    { title: "Civil Engineer", company: "AECOM", match: 90, salary: "$85K - $130K" },
    { title: "Structural Engineer", company: "Arup", match: 88, salary: "$90K - $135K" },
  ],
  "digital-marketing": [
    { title: "Digital Marketing Manager", company: "HubSpot", match: 96, salary: "$90K - $140K" },
    { title: "SEO Manager", company: "Shopify", match: 93, salary: "$100K - $150K" },
    { title: "Social Media Manager", company: "Buffer", match: 90, salary: "$80K - $120K" },
  ],
  "brand-manager": [
    { title: "Brand Manager", company: "Procter & Gamble", match: 95, salary: "$110K - $160K" },
    { title: "Product Marketing Manager", company: "Salesforce", match: 92, salary: "$120K - $170K" },
    { title: "Brand Strategist", company: "Interbrand", match: 89, salary: "$100K - $150K" },
  ],
  "nlp-engineer": [
    { title: "NLP Research Scientist", company: "Google AI", match: 97, salary: "$150K - $220K" },
    { title: "Machine Learning Engineer, NLP", company: "Apple", match: 94, salary: "$140K - $200K" },
    { title: "Conversational AI Developer", company: "Amazon Alexa", match: 91, salary: "$130K - $180K" },
  ],
  "cv-engineer": [
    { title: "Computer Vision Engineer", company: "Tesla", match: 98, salary: "$160K - $230K" },
    { title: "Perception Engineer", company: "Waymo", match: 95, salary: "$150K - $210K" },
    { title: "AR/VR Software Engineer", company: "Meta Reality Labs", match: 92, salary: "$140K - $200K" },
  ],
  "rl-engineer": [
    { title: "Reinforcement Learning Engineer", company: "DeepMind", match: 98, salary: "$170K - $250K" },
    { title: "RL Research Scientist", company: "NVIDIA", match: 96, salary: "$160K - $240K" },
    { title: "Robotics Engineer (AI)", company: "Boston Dynamics", match: 93, salary: "$140K - $200K" },
  ],
  "ai-ethics": [
    { title: "AI Ethics Specialist", company: "OpenAI", match: 97, salary: "$130K - $190K" },
    { title: "Responsible AI Lead", company: "Microsoft", match: 94, salary: "$140K - $200K" },
    { title: "AI Policy Advisor", company: "The White House OSTP", match: 90, salary: "$110K - $170K" },
  ],
  "penetration-tester": [
    { title: "Penetration Tester", company: "Bishop Fox", match: 97, salary: "$120K - $180K" },
    { title: "Offensive Security Engineer", company: "CrowdStrike", match: 95, salary: "$130K - $190K" },
    { title: "Red Team Operator", company: "Mandiant", match: 92, salary: "$125K - $185K" },
  ],
  "defensive-security": [
    { title: "Security Analyst (SOC)", company: "Palo Alto Networks", match: 96, salary: "$100K - $150K" },
    { title: "Threat Hunter", company: "Dragos", match: 93, salary: "$115K - $170K" },
    { title: "Defensive Security Engineer", company: "Cloudflare", match: 91, salary: "$120K - $175K" },
  ],
  "incident-response": [
    { title: "Incident Responder", company: "Mandiant (Google)", match: 97, salary: "$120K - $180K" },
    { title: "Digital Forensics Analyst", company: "Kroll", match: 94, salary: "$110K - $170K" },
    { title: "Malware Analyst", company: "CrowdStrike", match: 91, salary: "$130K - $190K" },
  ],
  "governance-compliance": [
    { title: "GRC Analyst", company: "Deloitte", match: 96, salary: "$95K - $140K" },
    { title: "IT Auditor", company: "PwC", match: 93, salary: "$90K - $135K" },
    { title: "Compliance Manager, Security", company: "Salesforce", match: 90, salary: "$110K - $160K" },
  ],
  "data-analysis": [
    { title: "Data Analyst, Product", company: "TikTok", match: 97, salary: "$100K - $150K" },
    { title: "Business Analyst", company: "Capital One", match: 94, salary: "$95K - $145K" },
    { title: "SQL Analyst", company: "Wayfair", match: 91, salary: "$90K - $130K" },
  ],
  "machine-learning": [
    { title: "Machine Learning Engineer", company: "NVIDIA", match: 98, salary: "$160K - $240K" },
    { title: "Data Scientist, Machine Learning", company: "Spotify", match: 95, salary: "$150K - $220K" },
    { title: "AI Engineer", company: "Adobe", match: 92, salary: "$140K - $200K" },
  ],
  "data-engineering": [
    { title: "Data Engineer", company: "Databricks", match: 98, salary: "$150K - $220K" },
    { title: "ETL Developer", company: "JPMorgan Chase", match: 94, salary: "$110K - $170K" },
    { title: "Big Data Engineer", company: "Netflix", match: 92, salary: "$160K - $240K" },
  ],
  "business-intelligence": [
    { title: "BI Developer", company: "Microsoft", match: 97, salary: "$110K - $160K" },
    { title: "Business Intelligence Analyst", company: "Slalom", match: 94, salary: "$100K - $150K" },
    { title: "Tableau Developer", company: "T-Mobile", match: 91, salary: "$95K - $145K" },
  ],
  "brand-design": [
    { title: "Brand Designer", company: "Pentagram", match: 96, salary: "$85K - $130K" },
    { title: "Visual Designer, Brand", company: "Airbnb", match: 93, salary: "$95K - $145K" },
    { title: "Brand Strategist", company: "Wolff Olins", match: 90, salary: "$100K - $150K" },
  ],
  illustration: [
    { title: "Illustrator", company: "The New York Times", match: 95, salary: "$70K - $110K" },
    { title: "Concept Artist", company: "Blizzard Entertainment", match: 92, salary: "$80K - $130K" },
    { title: "Graphic Artist", company: "Disney", match: 89, salary: "$75K - $120K" },
  ],
  "industrial-design": [
    { title: "Industrial Designer", company: "IDEO", match: 97, salary: "$90K - $140K" },
    { title: "Product Designer (Hardware)", company: "Google Nest", match: 94, salary: "$110K - $160K" },
    { title: "3D Modeler", company: "Nike", match: 91, salary: "$85K - $130K" },
  ],
  "content-marketing": [
    { title: "Content Marketing Manager", company: "HubSpot", match: 96, salary: "$85K - $130K" },
    { title: "Content Strategist", company: "Ahrefs", match: 93, salary: "$90K - $140K" },
    { title: "Copywriter", company: "Ogilvy", match: 90, salary: "$75K - $120K" },
  ],
  "social-media-marketing": [
    { title: "Social Media Manager", company: "Gymshark", match: 95, salary: "$70K - $110K" },
    { title: "Community Manager", company: "Discord", match: 92, salary: "$80K - $125K" },
    { title: "Social Media Strategist", company: "VaynerMedia", match: 89, salary: "$85K - $135K" },
  ],
  "paid-advertising": [
    { title: "PPC Specialist", company: "WordStream", match: 96, salary: "$75K - $115K" },
    { title: "Paid Media Manager", company: "GroupM", match: 93, salary: "$85K - $130K" },
    { title: "Performance Marketing Manager", company: "Hims & Hers", match: 90, salary: "$95K - $145K" },
  ],
  "seo-specialist": [
    { title: "SEO Specialist", company: "Moz", match: 97, salary: "$70K - $110K" },
    { title: "SEO Manager", company: "Shopify", match: 94, salary: "$90K - $140K" },
    { title: "SEO Strategist", company: "Backlinko", match: 91, salary: "$80K - $130K" },
  ],
  "traditional-pm": [
    { title: "Project Manager", company: "Deloitte", match: 95, salary: "$95K - $145K" },
    { title: "Program Manager", company: "Accenture", match: 92, salary: "$110K - $160K" },
    { title: "Project Coordinator", company: "Jacobs", match: 88, salary: "$70K - $100K" },
  ],
  "consumer-pm": [
    { title: "Product Manager, Consumer", company: "Spotify", match: 97, salary: "$130K - $190K" },
    { title: "Associate Product Manager", company: "Meta", match: 94, salary: "$120K - $170K" },
    { title: "Group Product Manager", company: "Airbnb", match: 91, salary: "$160K - $230K" },
  ],
  "ux-research": [
    { title: "UX Researcher", company: "UserTesting", match: 98, salary: "$110K - $170K" },
    { title: "User Researcher", company: "Microsoft", match: 95, salary: "$120K - $180K" },
    { title: "Research Manager", company: "Google", match: 92, salary: "$140K - $210K" },
  ],
  "ux-analytics": [
    { title: "UX Analyst", company: "Amplitude", match: 96, salary: "$105K - $155K" },
    { title: "Product Analyst", company: "Mixpanel", match: 93, salary: "$110K - $165K" },
    { title: "Data Analyst, UX", company: "Electronic Arts (EA)", match: 90, salary: "$100K - $150K" },
  ],
  "frontend-development": [
    { title: "Frontend Developer", company: "Vercel", match: 98, salary: "$120K - $180K" },
    { title: "React Developer", company: "Shopify", match: 95, salary: "$115K - $175K" },
    { title: "Frontend Engineer", company: "Netflix", match: 92, salary: "$140K - $210K" },
  ],
  "backend-development": [
    { title: "Backend Developer", company: "Stripe", match: 97, salary: "$130K - $200K" },
    { title: "Backend Engineer", company: "Twilio", match: 94, salary: "$125K - $190K" },
    { title: "Node.js Developer", company: "PayPal", match: 91, salary: "$120K - $180K" },
  ],
  "full-stack-development": [
    { title: "Full Stack Developer", company: "Brex", match: 96, salary: "$130K - $195K" },
    { title: "Full Stack Engineer", company: "Coinbase", match: 93, salary: "$140K - $210K" },
    { title: "MERN Stack Developer", company: "Startups on Wellfound", match: 90, salary: "$120K - $180K" },
  ],
  "ui-ux-development": [
    { title: "UI/UX Developer", company: "Webflow", match: 97, salary: "$110K - $170K" },
    { title: "Design Technologist", company: "Amazon", match: 94, salary: "$120K - $180K" },
    { title: "Creative Technologist", company: "Google Creative Lab", match: 91, salary: "$130K - $190K" },
  ],
}

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState("Sneha V")
  const [recommendations, setRecommendations] = useState(recommendationsData.default)
  const [stats, setStats] = useState({
    profileStrength: 0,
    matchingJobs: 0,
    learningProgress: 0,
    marketInsights: 0,
  })

  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  useEffect(() => {
    const newRecommendations = (courseId && recommendationsData[courseId]) || recommendationsData.default;
    setRecommendations(newRecommendations)

    // Simulate fetching personalized stats
    // In a real app, this would come from an API call based on the user's profile
    const fetchStats = () => {
      // Simulate a user profile object. In a real app, this would be fetched from your database.
      // For a new user, these fields would be empty, resulting in a low profile strength.
      // As they fill out their profile (e.g., in the Settings page), this data would update.
      const userProfile = {
        name: "Sneha V", // This might come from initial sign-up
        email: "sneha@example.com", // This might come from initial sign-up
        phone: "",
        location: "",
        bio: "",
        linkedinUrl: "",
        courseraProgress: 0, // Percentage, starts at 0
        assessmentTaken: false, // Starts as false
      };

      // Calculate profile strength based on completion
      let score = 0;
      if (userProfile.name) score += 15;
      if (userProfile.email) score += 15;
      if (userProfile.location) score += 10;
      if (userProfile.bio) score += 15;
      if (userProfile.linkedinUrl) score += 20;
      if (userProfile.assessmentTaken) score += 20;
      const profileStrength = Math.min(score, 100); // Cap at 100

      // Example: Job count from recommendations or a job board API
      const matchingJobs = courseId ? 15 + Math.floor(Math.random() * 10) : 24;
      // Example: Learning progress from a learning platform integration
      const learningProgress = courseId ? 25 + Math.floor(Math.random() * 30) : 45;
      const marketInsights = courseId ? 8 + Math.floor(Math.random() * 8) : 12;
      setStats({ profileStrength, matchingJobs, learningProgress, marketInsights });
    };
    fetchStats();
  }, [courseId])

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg transition">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader />

          {/* Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userName}</h1>
                <p className="text-muted-foreground">Here's your personalized career dashboard</p>
              </div>

              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-4 mb-8">
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Profile Strength</p>
                      <p className="text-2xl font-bold text-foreground">{stats.profileStrength}%</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Matching Jobs</p>
                      <p className="text-2xl font-bold text-foreground">{stats.matchingJobs}</p>
                    </div>
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Learning Progress</p>
                      <p className="text-2xl font-bold text-foreground">{stats.learningProgress}%</p>
                    </div>
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Market Insights</p>
                      <p className="text-2xl font-bold text-foreground">{stats.marketInsights}</p>
                    </div>
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </Card>
              </div>

              {/* Main Grid */}
              <div className="grid gap-8 lg:grid-cols-3 mb-8">
                {/* Left Column - Larger Widgets */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Recent Jobs */}
                  <RecentJobsWidget />

                  {/* Learning Path */}
                  <LearningPathWidget />
                </div>

                {/* Right Column - Sidebar Widgets */}
                <div className="space-y-8">
                  {/* Goals */}
                  <GoalsWidget />

                  {/* Market Insights */}
                  <MarketInsightsWidget />
                </div>
              </div>

              {/* Recommendations Section */}
              <div className="rounded-xl border border-border bg-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Personalized Recommendations</h2>
                  <Link href={`/jobs${courseId ? `?course=${courseId}` : ""}`}>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {recommendations.map((job, idx) => (
                    <div key={idx} className="rounded-lg border border-border p-4 hover:border-primary/50 transition">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {job.match}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{job.salary}</p>
                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/jobs${courseId ? `?course=${courseId}` : ""}`}>
                          View Job
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    // Wrap the component in Suspense because it uses useSearchParams
    <Suspense fallback={<div className="p-6">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
