"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const goalsData: Record<string, { id: number; title: string; deadline: string; progress: number }[]> = {
  default: [
    { id: 1, title: "Complete career assessment", deadline: "1 week", progress: 100 },
    { id: 2, title: "Explore 3 recommended career paths", deadline: "2 weeks", progress: 50 },
    { id: 3, title: "Start a recommended course", deadline: "1 month", progress: 0 },
  ],
  "software-developer": [
    { id: 1, title: "Get 'Meta Back-End Developer' Certificate", deadline: "6 months", progress: 15 },
    { id: 2, title: "Build a full-stack portfolio project", deadline: "4 months", progress: 30 },
    { id: 3, title: "Master Data Structures & Algorithms", deadline: "3 months", progress: 50 },
  ],
  "data-analytics": [
    { id: 1, title: "Finish 'Google Data Analytics' Certificate", deadline: "4 months", progress: 60 },
    { id: 2, title: "Learn advanced SQL queries", deadline: "2 months", progress: 40 },
    { id: 3, title: "Create a dashboard in Tableau", deadline: "1 month", progress: 75 },
  ],
  cybersecurity: [
    { id: 1, title: "Pass CompTIA Security+ exam", deadline: "4 months", progress: 25 },
    { id: 2, title: "Set up a home lab for practice", deadline: "1 month", progress: 80 },
    { id: 3, title: "Participate in a Capture The Flag (CTF) competition", deadline: "3 months", progress: 10 },
  ],
  "ux-ui-designer": [
    { id: 1, title: "Complete 'Google UX Design' Certificate", deadline: "5 months", progress: 45 },
    { id: 2, title: "Design and prototype a mobile app", deadline: "3 months", progress: 20 },
    { id: 3, title: "Build a professional design portfolio", deadline: "4 months", progress: 10 },
  ],
  "software-engineer": [
    { id: 1, title: "Complete 'Software Design and Architecture' Specialization", deadline: "6 months", progress: 20 },
    { id: 2, title: "Contribute to an open-source project", deadline: "5 months", progress: 5 },
    { id: 3, title: "Master system design interview questions", deadline: "3 months", progress: 30 },
  ],
  "strategy-manager": [
    { id: 1, title: "Finish 'Business Strategy' Specialization", deadline: "4 months", progress: 50 },
    { id: 2, title: "Analyze a public company's 10-K report", deadline: "1 month", progress: 65 },
    { id: 3, title: "Develop a mock business plan for a startup", deadline: "3 months", progress: 15 },
  ],
  "project-manager": [
    { id: 1, title: "Get 'Google Project Management' Certificate", deadline: "5 months", progress: 40 },
    { id: 2, title: "Manage a small personal project end-to-end", deadline: "2 months", progress: 70 },
    { id: 3, title: "Learn to use Jira or a similar PM tool", deadline: "1 month", progress: 90 },
  ],
  "operations-manager": [
    { id: 1, title: "Complete 'Operations Management' course", deadline: "3 months", progress: 25 },
    { id: 2, title: "Identify and document a process for improvement", deadline: "1 month", progress: 80 },
    { id: 3, title: "Learn Six Sigma basics", deadline: "4 months", progress: 10 },
  ],
  "clinical-lead": [
    { id: 1, title: "Finish 'Healthcare Organization Operations' Specialization", deadline: "6 months", progress: 30 },
    { id: 2, title: "Mentor a junior team member", deadline: "3 months", progress: 50 },
    { id: 3, title: "Lead a quality improvement initiative", deadline: "5 months", progress: 15 },
  ],
  "healthcare-educator": [
    { id: 1, title: "Complete 'Teaching and Assessing Clinical Skills' course", deadline: "4 months", progress: 40 },
    { id: 2, title: "Develop a short training module", deadline: "2 months", progress: 60 },
    { id: 3, title: "Shadow an experienced clinical educator", deadline: "1 month", progress: 90 },
  ],
  "visual-designer": [
    { id: 1, title: "Complete 'Graphic Design' Specialization", deadline: "5 months", progress: 35 },
    { id: 2, title: "Create a personal branding package (logo, color palette)", deadline: "2 months", progress: 55 },
    { id: 3, title: "Contribute to a design challenge (e.g., Daily UI)", deadline: "1 month", progress: 80 },
  ],
  "systems-engineer": [
    { id: 1, title: "Finish 'Systems Engineering' Specialization", deadline: "7 months", progress: 15 },
    { id: 2, title: "Design a scalable architecture for a sample app", deadline: "4 months", progress: 25 },
    { id: 3, title: "Get an AWS or Azure fundamentals certification", deadline: "3 months", progress: 40 },
  ],
  "mechanical-engineer": [
    { id: 1, title: "Master a CAD software (e.g., SolidWorks)", deadline: "6 months", progress: 50 },
    { id: 2, title: "Design and 3D print a functional part", deadline: "2 months", progress: 75 },
    { id: 3, title: "Complete 'Engineering of Structures' Specialization", deadline: "8 months", progress: 10 },
  ],
  "digital-marketing": [
    { id: 1, title: "Get 'Google Digital Marketing & E-commerce' Certificate", deadline: "5 months", progress: 45 },
    { id: 2, title: "Run a small-budget ad campaign on a social platform", deadline: "1 month", progress: 60 },
    { id: 3, title: "Become proficient in Google Analytics", deadline: "3 months", progress: 30 },
  ],
  "brand-manager": [
    { id: 1, title: "Complete 'Branding' Specialization", deadline: "4 months", progress: 50 },
    { id: 2, title: "Conduct a brand audit of a favorite company", deadline: "1 month", progress: 70 },
    { id: 3, title: "Develop a brand strategy for a fictional product", deadline: "3 months", progress: 20 },
  ],
  "nlp-engineer": [
    { id: 1, title: "Finish 'Natural Language Processing' Specialization", deadline: "6 months", progress: 25 },
    { id: 2, title: "Build a simple sentiment analysis model", deadline: "3 months", progress: 40 },
    { id: 3, title: "Experiment with a transformer model (e.g., BERT, GPT)", deadline: "4 months", progress: 10 },
  ],
  "cv-engineer": [
    { id: 1, title: "Complete 'Deep Learning for Computer Vision' Specialization", deadline: "7 months", progress: 20 },
    { id: 2, title: "Build an image classifier using a well-known dataset", deadline: "3 months", progress: 35 },
    { id: 3, title: "Learn OpenCV for real-time image processing", deadline: "2 months", progress: 50 },
  ],
  "rl-engineer": [
    { id: 1, title: "Complete 'Deep Learning and Reinforcement Learning' course", deadline: "6 months", progress: 15 },
    { id: 2, title: "Implement a simple RL agent for a game (e.g., CartPole)", deadline: "2 months", progress: 40 },
    { id: 3, "title": "Study foundational papers on Q-learning and Policy Gradients", deadline: "3 months", progress: 25 },
  ],
  "ai-ethics": [
    { id: 1, title: "Finish 'AI Ethics' Specialization", deadline: "4 months", progress: 30 },
    { id: 2, title: "Write a policy brief on an AI ethics topic", deadline: "2 months", progress: 50 },
    { id: 3, title: "Analyze a case study of algorithmic bias", deadline: "1 month", progress: 75 },
  ],
  "penetration-tester": [
    { id: 1, title: "Prepare for Offensive Security Certified Professional (OSCP)", deadline: "8 months", progress: 10 },
    { id: 2, title: "Complete a room on TryHackMe or HackTheBox weekly", deadline: "Ongoing", progress: 60 },
    { id: 3, title: "Learn Python for scripting and automation", deadline: "3 months", progress: 40 },
  ],
  "defensive-security": [
    { id: 1, title: "Get CompTIA Security+ certified", deadline: "4 months", progress: 35 },
    { id: 2, title: "Set up and learn a SIEM tool like Splunk (free version)", deadline: "3 months", progress: 20 },
    { id: 3, title: "Analyze network traffic with Wireshark", deadline: "2 months", progress: 50 },
  ],
  "incident-response": [
    { id: 1, title: "Study for GIAC Certified Incident Handler (GCIH)", deadline: "6 months", progress: 15 },
    { id: 2, title: "Analyze a malware sample in a safe environment", deadline: "3 months", progress: 30 },
    { id: 3, title: "Practice digital forensics on a sample disk image", deadline: "4 months", progress: 20 },
  ],
  "governance-compliance": [
    { id: 1, title: "Prepare for Certified Information Security Manager (CISM)", deadline: "7 months", progress: 10 },
    { id: 2, title: "Perform a mock risk assessment on a fictional company", deadline: "2 months", progress: 40 },
    { id: 3, title: "Read and summarize the NIST Cybersecurity Framework", deadline: "1 month", progress: 60 },
  ],
  "data-analysis": [
    { id: 1, title: "Complete 'Google Data Analytics' Certificate", deadline: "5 months", progress: 20 },
    { id: 2, title: "Master pivot tables and advanced Excel functions", deadline: "1 month", progress: 70 },
    { id: 3, title: "Create a data visualization project with a public dataset", deadline: "3 months", progress: 30 },
  ],
  "machine-learning": [
    { id: 1, title: "Finish 'Deep Learning Specialization' by Andrew Ng", deadline: "6 months", progress: 25 },
    { id: 2, title: "Build and train a neural network from scratch", deadline: "3 months", progress: 40 },
    { id: 3, title: "Deploy a simple model using a cloud service (AWS/GCP)", deadline: "4 months", progress: 10 },
  ],
  "data-engineering": [
    { id: 1, title: "Prepare for 'Google Professional Data Engineer' certification", deadline: "8 months", progress: 5 },
    { id: 2, title: "Build an ETL pipeline for a personal project", deadline: "4 months", progress: 25 },
    { id: 3, title: "Learn Apache Spark fundamentals", deadline: "3 months", progress: 35 },
  ],
  "business-intelligence": [
    { id: 1, title: "Get 'Microsoft Certified: Power BI Data Analyst' certification", deadline: "4 months", progress: 30 },
    { id: 2, title: "Create an interactive dashboard with multiple data sources", deadline: "2 months", progress: 50 },
    { id: 3, title: "Master advanced DAX functions in Power BI", deadline: "3 months", progress: 20 },
  ],
  "brand-design": [
    { id: 1, title: "Complete a foundational graphic design course", deadline: "3 months", progress: 60 },
    { id: 2, title: "Design a complete brand guide for a fictional company", deadline: "4 months", progress: 25 },
    { id: 3, title: "Master Adobe Illustrator and Photoshop", deadline: "6 months", progress: 40 },
  ],
  "ui-ux-design": [
    { id: 1, title: "Complete 'Google UX Design' Certificate", deadline: "5 months", progress: 45 },
    { id: 2, title: "Design and prototype a mobile app in Figma", deadline: "3 months", progress: 20 },
    { id: 3, title: "Build a professional design portfolio with 3 case studies", deadline: "4 months", progress: 10 },
  ],
  "illustration": [
    { id: 1, title: "Complete a specialized illustration course", deadline: "4 months", progress: 30 },
    { id: 2, title: "Create a new illustration piece every week for 2 months", deadline: "2 months", progress: 50 },
    { id: 3, title: "Develop a unique personal art style", deadline: "6 months", progress: 15 },
  ],
  "industrial-design": [
    { id: 1, title: "Master a 3D CAD software like SolidWorks or Rhino", deadline: "7 months", progress: 35 },
    { id: 2, title: "Sketch 10 new product concepts", deadline: "1 month", progress: 80 },
    { id: 3, title: "Create a physical prototype of a simple product", deadline: "4 months", progress: 15 },
  ],
  "content-marketing": [
    { id: 1, title: "Get 'Hubspot Content Marketing' Certification", deadline: "1 month", progress: 70 },
    { id: 2, title: "Write and publish 5 blog posts on a chosen topic", deadline: "3 months", progress: 40 },
    { id: 3, title: "Learn SEO fundamentals for content writers", deadline: "2 months", progress: 50 },
  ],
  "social-media-marketing": [
    { id: 1, title: "Get 'Meta Certified Digital Marketing Associate' certification", deadline: "2 months", progress: 60 },
    { id: 2, title: "Grow a social media account (personal or fictional) to 1000 followers", deadline: "4 months", progress: 20 },
    { id: 3, title: "Create a content calendar for one month", deadline: "2 weeks", progress: 90 },
  ],
  "paid-advertising": [
    { id: 1, title: "Complete Google Ads Certifications (e.g., Search, Display)", deadline: "2 months", progress: 55 },
    { id: 2, title: "Manage a mock PPC campaign with a set budget", deadline: "1 month", progress: 40 },
    { id: 3, title: "Learn A/B testing principles for ad copy and creatives", deadline: "3 weeks", progress: 75 },
  ],
  "search-engine-optimization": [
    { id: 1, title: "Complete an SEO certification from Moz or SEMrush", deadline: "3 months", progress: 30 },
    { id: 2, title: "Perform a technical SEO audit on a website", deadline: "1 month", progress: 50 },
    { id: 3, title: "Write an optimized piece of content that ranks for a keyword", deadline: "4 months", progress: 15 },
  ],
  "agile-pm": [
    { id: 1, title: "Get Certified ScrumMaster (CSM) certification", deadline: "2 months", progress: 40 },
    { id: 2, title: "Act as a Scrum Master for a personal or volunteer project", deadline: "3 months", progress: 25 },
    { id: 3, title: "Master Jira for Agile project management", deadline: "1 month", progress: 70 },
  ],
  "traditional-pm": [
    { id: 1, title: "Prepare for Project Management Professional (PMP) Certification", deadline: "6 months", progress: 10 },
    { id: 2, title: "Create a detailed project plan with a Gantt chart for a complex task", deadline: "1 month", progress: 60 },
    { id: 3, title: "Learn Microsoft Project", deadline: "2 months", progress: 45 },
  ],
  "technical-pm": [
    { id: 1, title: "Finish 'Software Product Management' Specialization", deadline: "5 months", progress: 30 },
    { id: 2, title: "Write a technical specification document for a new API", deadline: "1 month", progress: 50 },
    { id: 3, title: "Learn system architecture fundamentals", deadline: "4 months", progress: 20 },
  ],
  "growth-pm": [
    { id: 1, title: "Complete a growth series from Reforge or CXL", deadline: "4 months", progress: 15 },
    { id: 2, title: "Design and analyze an A/B test for a website feature", deadline: "2 months", progress: 40 },
    { id: 3, title: "Learn SQL to analyze user funnels", deadline: "3 months", progress: 30 },
  ],
  "consumer-pm": [
    { id: 1, title: "Get a Product School certification", deadline: "3 months", progress: 35 },
    { id: 2, title: "Conduct 5 user interviews for a product idea", deadline: "1 month", progress: 60 },
    { id: 3, title: "Write a full Product Requirements Document (PRD)", deadline: "2 months", progress: 25 },
  ],
  "strategic-pm": [
    { id: 1, title: "Complete an advanced product strategy course", deadline: "4 months", progress: 20 },
    { id: 2, title: "Create a financial model for a new product line", deadline: "2 months", progress: 40 },
    { id: 3, title: "Perform a competitive analysis of 3 major players in a market", deadline: "1 month", progress: 65 },
  ],
  "ux-research": [
    { id: 1, title: "Complete a course on Human-Computer Interaction (HCI)", deadline: "5 months", progress: 25 },
    { id: 2, title: "Plan and execute a usability study with 5 participants", deadline: "2 months", progress: 45 },
    { id: 3, title: "Create a set of user personas and journey maps", deadline: "1 month", progress: 70 },
  ],
  "interaction-design": [
    { id: 1, title: "Master an advanced prototyping tool (e.g., Principle, Framer)", deadline: "4 months", progress: 30 },
    { id: 2, title: "Design and animate micro-interactions for a mobile app", deadline: "2 months", progress: 50 },
    { id: 3, title: "Create a detailed user flow diagram for a complex feature", deadline: "1 month", progress: 75 },
  ],
  "ui-design": [
    { id: 1, title: "Create a comprehensive design system from scratch", deadline: "4 months", progress: 20 },
    { id: 2, title: "Re-design 3 screens of a popular application", deadline: "1 month", progress: 60 },
    { id: 3, title: "Master color theory and typography principles", deadline: "3 months", progress: 40 },
  ],
  "ux-analytics": [
    { id: 1, title: "Get Google Analytics certified", deadline: "1 month", progress: 80 },
    { id: 2, title: "Learn to use a product analytics tool like Mixpanel or Amplitude", deadline: "3 months", progress: 30 },
    { id: 3, title: "Analyze a public dataset to find user behavior insights", deadline: "2 months", progress: 40 },
  ],
  "frontend-development": [
    { id: 1, title: "Complete The Odin Project or FreeCodeCamp frontend path", deadline: "6 months", progress: 25 },
    { id: 2, title: "Build 3 responsive websites from scratch", deadline: "3 months", progress: 50 },
    { id: 3, title: "Master a JavaScript framework like React or Vue", deadline: "5 months", progress: 20 },
  ],
  "backend-development": [
    { id: 1, title: "Complete a backend specialization (e.g., Python/Django, Node.js/Express)", deadline: "6 months", progress: 20 },
    { id: 2, title: "Build a RESTful API with database integration", deadline: "3 months", progress: 40 },
    { id: 3, title: "Get a cloud provider certification (e.g., AWS Certified Developer)", deadline: "4 months", progress: 15 },
  ],
  "full-stack-development": [
    { id: 1, title: "Complete a full-stack bootcamp or program (e.g., MERN stack)", deadline: "8 months", progress: 10 },
    { id: 2, title: "Build and deploy a full-stack web application", deadline: "5 months", progress: 25 },
    { id: 3, title: "Learn about DevOps, Docker, and CI/CD pipelines", deadline: "4 months", progress: 15 },
  ],
  "ui-ux-development": [
    { id: 1, title: "Complete a course on web accessibility (WCAG)", deadline: "2 months", progress: 50 },
    { id: 2, title: "Build a component library for a design system", deadline: "4 months", progress: 20 },
    { id: 3, title: "Translate a complex Figma design into pixel-perfect code", deadline: "3 months", progress: 35 },
  ],
}

function GoalsContent() {
  const [goals, setGoals] = useState<{ id: number; title: string; deadline: string; progress: number }[]>([])
  const [isAddGoalOpen, setAddGoalOpen] = useState(false)
  const [isUpdateGoalOpen, setUpdateGoalOpen] = useState(false)
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [newGoalDeadline, setNewGoalDeadline] = useState("")
  const [selectedGoal, setSelectedGoal] = useState<{ id: number; title: string; deadline: string; progress: number } | null>(null)
  const [updatedProgress, setUpdatedProgress] = useState(0)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")

  useEffect(() => {
    const initialGoals = (courseId && goalsData[courseId]) || goalsData.default
    setGoals(initialGoals)
  }, [courseId])

  const handleAddGoal = () => {
    if (newGoalTitle.trim() && newGoalDeadline.trim()) {
      const newGoal = {
        id: Date.now(),
        title: newGoalTitle,
        deadline: newGoalDeadline,
        progress: 0,
      }
      setGoals([...goals, newGoal])
      setNewGoalTitle("")
      setNewGoalDeadline("")
      setAddGoalOpen(false)
    }
  }

  const handleUpdateProgress = () => {
    if (selectedGoal) {
      setGoals(goals.map((g) => (g.id === selectedGoal.id ? { ...g, progress: updatedProgress } : g)))
      setUpdateGoalOpen(false)
      setSelectedGoal(null)
    }
  }

  const openUpdateDialog = (goal: { id: number; title: string; deadline: string; progress: number }) => {
    setSelectedGoal(goal)
    setUpdatedProgress(goal.progress)
    setUpdateGoalOpen(true)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Career Goals</h2>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => openUpdateDialog(goal)}
            className="w-full p-3 rounded-lg border border-border text-left hover:border-primary/50 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">{goal.title}</h3>
              <span className="text-xs text-muted-foreground">{goal.deadline}</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${goal.progress}%` }}></div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={isAddGoalOpen} onOpenChange={setAddGoalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a New Goal</DialogTitle>
            <DialogDescription>Set a new career goal to track your progress.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal-title" className="text-right">
                Goal
              </Label>
              <Input
                id="goal-title"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Master React Hooks"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal-deadline" className="text-right">
                Deadline
              </Label>
              <Input
                id="goal-deadline"
                value={newGoalDeadline}
                onChange={(e) => setNewGoalDeadline(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 3 months"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddGoal}>
              Save Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isUpdateGoalOpen} onOpenChange={setUpdateGoalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Goal Progress</DialogTitle>
            <DialogDescription>{selectedGoal?.title}</DialogDescription>
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

// We need to wrap the component in Suspense because it uses useSearchParams
export default function GoalsWidget() {
  return (
    <Suspense fallback={<Card className="p-6">Loading goals...</Card>}>
      <GoalsContent />
    </Suspense>
  )
}
