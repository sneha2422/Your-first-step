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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const learningPathData: Record<string, { id: number; title: string; progress: number; status: string }[]> = {
  // --- TECHNICAL / DEVELOPMENT PATHS ---
  technical: [
    { id: 1, title: "System Design Interview Prep", progress: 40, status: "in-progress" },
    { id: 2, title: "Advanced Algorithms & Data Structures", progress: 10, status: "in-progress" },
    { id: 3, title: "Cloud Architecture Fundamentals", progress: 0, status: "not-started" },
  ],
  engineering: [
    { id: 1, title: "Engineering Management Principles", progress: 65, status: "in-progress" },
    { id: 2, title: "Lean Manufacturing & Six Sigma", progress: 10, status: "in-progress" },
    { id: 3, title: "CAD Software Proficiency (Fusion 360)", progress: 0, status: "not-started" },
  ],
  "frontend-development": [
    { id: 1, title: "ReactJS/Next.js Framework Mastery", progress: 70, status: "in-progress" },
    { id: 2, title: "State Management (Redux/Zustand) Deep Dive", progress: 10, status: "in-progress" },
    { id: 3, title: "Web Performance Optimization", progress: 0, status: "not-started" },
  ],
  "backend-development": [
    { id: 1, title: "Node.js & Express API Development", progress: 85, status: "in-progress" },
    { id: 2, title: "Database Architecture (SQL vs NoSQL)", progress: 100, status: "completed" },
    { id: 3, title: "Microservices & Distributed Systems", progress: 20, status: "in-progress" },
  ],
  "full-stack-development": [
    { id: 1, title: "MERN Stack Capstone Project", progress: 55, status: "in-progress" },
    { id: 2, title: "Deployment with Docker & Kubernetes", progress: 25, status: "in-progress" },
    { id: 3, title: "Full-Stack Security Practices", progress: 0, status: "not-started" },
  ],
  "ui/ux-development": [
    { id: 1, title: "Web Accessibility (WCAG) Implementation", progress: 50, status: "in-progress" },
    { id: 2, title: "Build a Component Library for a Design System", progress: 20, status: "in-progress" },
    { id: 3, title: "Translate a Figma Design to Pixel-Perfect Code", progress: 35, status: "not-started" },
  ],
  "ui-ux-development": [
    { id: 1, title: "Web Accessibility (WCAG) Implementation", progress: 50, status: "in-progress" },
    { id: 2, title: "Build a Component Library for a Design System", progress: 20, status: "in-progress" },
    { id: 3, title: "Translate a Figma Design to Pixel-Perfect Code", progress: 35, status: "not-started" },
  ],
  // --- AI / DATA SCIENCE PATHS ---
  "natural-language-processing": [
    { id: 1, title: "Transformers and Attention Mechanisms", progress: 45, status: "in-progress" },
    { id: 2, title: "LLM Fine-Tuning and Prompt Engineering", progress: 0, status: "not-started" },
    { id: 3, title: "Conversational AI Development", progress: 20, status: "in-progress" },
  ],
  "computer-vision": [
    { id: 1, title: "Deep Learning for Image Recognition", progress: 60, status: "in-progress" },
    { id: 2, title: "Object Detection (YOLO) Implementation", progress: 10, status: "in-progress" },
    { id: 3, title: "3D Vision and Reconstruction", progress: 0, status: "not-started" },
  ],
  "reinforcement-learning": [
    { id: 1, title: "Deep Q-Learning Algorithms", progress: 35, status: "in-progress" },
    { id: 2, title: "Policy Gradient Methods", progress: 0, status: "not-started" },
    { id: 3, title: "RL for Robotics and Control", progress: 0, status: "not-started" },
  ],
  "ai-ethics-&-governance": [
    { id: 1, title: "Fairness and Bias in AI Systems", progress: 75, status: "in-progress" },
    { id: 2, title: "AI Regulation and Compliance (e.g., EU AI Act)", progress: 10, status: "in-progress" },
    { id: 3, title: "Explainable AI (XAI) Techniques", progress: 0, status: "not-started" },
  ],
  "machine-learning": [
    { id: 1, title: "Introduction to Deep Learning with PyTorch", progress: 55, status: "in-progress" },
    { id: 2, title: "Feature Engineering Techniques", progress: 100, status: "completed" },
    { id: 3, title: "Deployment of ML Models (MLOps)", progress: 15, status: "in-progress" },
  ],
  "data-engineering": [
    { id: 1, title: "Apache Spark Fundamentals", progress: 40, status: "in-progress" },
    { id: 2, title: "Building ETL/ELT Pipelines", progress: 0, status: "not-started" },
    { id: 3, title: "Data Warehousing and Cloud Solutions", progress: 30, status: "in-progress" },
  ],
  "business-intelligence": [
    { id: 1, title: "Advanced Data Visualization with Tableau", progress: 70, status: "in-progress" },
    { id: 2, title: "Power BI Dashboard Creation", progress: 100, status: "completed" },
    { id: 3, title: "Business Metrics and KPIs", progress: 10, status: "in-progress" },
  ],

  // --- SECURITY PATHS ---
  "offensive-security": [
    { id: 1, title: "Web Application Penetration Testing", progress: 65, status: "in-progress" },
    { id: 2, title: "Reverse Engineering and Exploit Dev", progress: 0, status: "not-started" },
    { id: 3, title: "Red Team Operations", progress: 0, status: "not-started" },
  ],
  "defensive-security": [
    { id: 1, title: "Security Information and Event Mgmt (SIEM)", progress: 50, status: "in-progress" },
    { id: 2, title: "Network Defense and Firewalls", progress: 20, status: "in-progress" },
    { id: 3, title: "Threat Hunting Methodologies", progress: 0, status: "not-started" },
  ],
  "incident-response": [
    { id: 1, title: "Digital Forensics and Investigation", progress: 75, status: "completed" },
    { id: 2, title: "Developing an Incident Response Plan", progress: 10, status: "in-progress" },
    { id: 3, title: "Malware Analysis Fundamentals", progress: 0, status: "not-started" },
  ],
  "governance-compliance": [
    { id: 1, title: "IT Risk Management (ISO 27001)", progress: 80, status: "in-progress" },
    { id: 2, title: "Data Privacy Regulations (GDPR/CCPA)", progress: 100, status: "completed" },
    { id: 3, title: "Security Audit and Assurance", progress: 10, status: "in-progress" },
  ],

  // --- BUSINESS / MANAGEMENT PATHS ---
  business: [
    { id: 1, title: "Financial Modeling and Valuation", progress: 55, status: "in-progress" },
    { id: 2, title: "Negotiation and Stakeholder Management", progress: 10, status: "in-progress" },
    { id: 3, title: "Global Business Strategy", progress: 0, status: "not-started" },
  ],
  healthcare: [
    { id: 1, title: "Healthcare Information Systems (HIS)", progress: 70, status: "in-progress" },
    { id: 2, title: "Medical Device Regulation (FDA/CE)", progress: 10, status: "in-progress" },
    { id: 3, title: "Health Data Analytics", progress: 0, status: "not-started" },
  ],
  "traditional-pm": [
    { id: 1, title: "PMP Certification Preparation", progress: 85, status: "in-progress" },
    { id: 2, title: "Risk Management and Mitigation", progress: 100, status: "completed" },
    { id: 3, title: "Waterfall Methodology Deep Dive", progress: 20, status: "in-progress" },
  ],
  "consumer-pm": [
    { id: 1, title: "Product-Led Growth (PLG) Strategy", progress: 60, status: "completed" },
    { id: 2, title: "A/B Testing and Experimentation", progress: 100, status: "completed" },
    { id: 3, title: "Market Sizing and Competitive Analysis", progress: 40, status: "in-progress" },
  ],

  // --- CREATIVE / DESIGN PATHS ---
  creative: [
    { id: 1, title: "Creative Direction and Brand Storytelling", progress: 55, status: "in-progress" },
    { id: 2, title: "Advanced Adobe Suite Techniques", progress: 10, status: "in-progress" },
    { id: 3, title: "Portfolio Development Workshop", progress: 0, status: "not-started" },
  ],
  "brand-design": [
    { id: 1, title: "Brand Identity Systems and Guidelines", progress: 75, status: "in-progress" },
    { id: 2, title: "Typography and Color Theory Mastery", progress: 10, status: "in-progress" },
    { id: 3, title: "Logo Design and Visual Communication", progress: 0, status: "not-started" },
  ],
  illustration: [
    { id: 1, title: "Digital Painting Techniques", progress: 45, status: "in-progress" },
    { id: 2, title: "Character Design and Concept Art", progress: 0, status: "not-started" },
    { id: 3, title: "Vector Graphics Mastery", progress: 0, status: "not-started" },
  ],
  "industrial-design": [
    { id: 1, title: "3D Modeling and Rendering (SolidWorks)", progress: 60, status: "in-progress" },
    { id: 2, title: "Materials Science for Product Development", progress: 10, status: "in-progress" },
    { id: 3, title: "Ergonomics and Human Factors", progress: 0, status: "not-started" },
  ],
  "ux-research": [
    { id: 1, title: "Qualitative Research Methods (Interviews/Surveys)", progress: 70, status: "completed" },
    { id: 2, title: "Usability Testing and Analysis", progress: 10, status: "in-progress" },
    { id: 3, title: "Translating Research into Design Action", progress: 0, status: "not-started" },
  ],
  "ui-design": [
    { id: 1, title: "Visual Hierarchy and Layout Principles", progress: 85, status: "in-progress" },
    { id: 2, title: "Motion Design for UI", progress: 100, status: "in-progress" },
    { id: 3, title: "Figma Auto Layout and Variants", progress: 30, status: "in-progress" },
  ],
  "ux-analytics": [
    { id: 1, title: "Product Analytics (Mixpanel/Amplitude)", progress: 65, status: "in-progress" },
    { id: 2, title: "Funnel Analysis and Drop-off Rates", progress: 10, status: "in-progress" },
    { id: 3, title: "A/B Testing Data Interpretation", progress: 0, status: "not-started" },
  ],

  // --- MARKETING PATHS ---
  marketing: [
    { id: 1, title: "Digital Marketing Strategy Certification", progress: 50, status: "in-progress" },
    { id: 2, title: "Customer Journey Mapping", progress: 100, status: "completed" },
    { id: 3, title: "Marketing Budget Allocation", progress: 0, status: "not-started" },
  ],
  "content-marketing": [
    { id: 1, title: "SEO Content Strategy and Execution", progress: 75, status: "in-progress" },
    { id: 2, title: "Blogging and Long-Form Content Mastery", progress: 10, status: "in-progress" },
    { id: 3, title: "Content Distribution and Promotion", progress: 0, status: "not-started" },
  ],
  "social-media-marketing": [
    { id: 1, title: "Platform-Specific Ad Campaign Management", progress: 60, status: "in-progress" },
    { id: 2, title: "Community Building and Engagement", progress: 10, status: "in-progress" },
    { id: 3, title: "Influencer Marketing Strategy", progress: 0, status: "not-started" },
  ],
  "paid-advertising": [
    { id: 1, title: "Google Ads and PPC Optimization", progress: 80, status: "in-progress" },
    { id: 2, title: "Conversion Rate Optimization (CRO)", progress: 100, status: "completed" },
    { id: 3, title: "Ad Copywriting and Creative Testing", progress: 20, status: "in-progress" },
  ],
  "seo-specialist": [
    { id: 1, title: "Advanced Technical SEO Audit", progress: 90, status: "in-progress" },
    { id: 2, title: "Link Building and Authority Strategy", progress: 10, status: "in-progress" },
    { id: 3, title: "Local SEO for Businesses", progress: 0, status: "not-started" },
  ],
  "software-developer": [
    { id: 1, title: "Meta Back-End Developer Certificate", progress: 15, status: "in-progress" },
    { id: 2, title: "IBM Full Stack Developer Certificate", progress: 0, status: "not-started" },
    { id: 3, title: "Algorithms Specialization", progress: 50, status: "in-progress" },
  ],
  "strategy-manager": [
    { id: 1, title: "Business Strategy Specialization (UVA)", progress: 50, status: "in-progress" },
    { id: 2, title: "Advanced Business Strategy (UVA)", progress: 10, status: "in-progress" },
    { id: 3, title: "Financial Modeling & Valuation", progress: 0, status: "not-started" },
  ],
  "project-manager": [
    { id: 1, title: "Google Project Management Certificate", progress: 40, status: "in-progress" },
    { id: 2, title: "Agile Project Management", progress: 10, status: "in-progress" },
    { id: 3, title: "Risk Management in Project Management", progress: 0, status: "not-started" },
  ],
  "operations-manager": [
    { id: 1, title: "Operations Management Foundations", progress: 25, status: "in-progress" },
    { id: 2, title: "Supply Chain Excellence", progress: 0, status: "not-started" },
    { id: 3, title: "Process Improvement with Six Sigma", progress: 10, status: "in-progress" },
  ],
  "clinical-lead": [
    { id: 1, title: "Healthcare Organization Operations Specialization", progress: 30, status: "in-progress" },
    { id: 2, title: "Clinical Leadership and Management", progress: 0, status: "not-started" },
    { id: 3, title: "Value-Based Care", progress: 10, status: "in-progress" },
  ],
  "ui-ux-design": [
    { id: 1, title: "Google UX Design Certificate", progress: 45, status: "in-progress" },
    { id: 2, title: "UI/UX Design Specialization (CalArts)", progress: 10, status: "in-progress" },
    { id: 3, title: "Advanced Prototyping in Figma", progress: 0, status: "not-started" },
  ],
  "healthcare-educator": [
    { id: 1, title: "Teaching and Assessing Clinical Skills", progress: 40, status: "in-progress" },
    { id: 2, title: "Instructional Design for Healthcare", progress: 10, status: "in-progress" },
    { id: 3, title: "Curriculum Development in Medical Education", progress: 0, status: "not-started" },
  ],
  "visual-designer": [
    { id: 1, title: "Graphic Design Specialization (CalArts)", progress: 35, status: "in-progress" },
    { id: 2, title: "Visual Elements of User Interface Design", progress: 55, status: "in-progress" },
    { id: 3, title: "Advanced Typography", progress: 0, status: "not-started" },
  ],
  "mechanical-engineer": [
    { id: 1, title: "Engineering of Structures Specialization", progress: 10, status: "in-progress" },
    { id: 2, title: "Master a CAD software (e.g., SolidWorks)", progress: 50, status: "in-progress" },
    { id: 3, title: "Design and 3D print a functional part", progress: 75, status: "in-progress" },
  ],
  "brand-manager": [
    { id: 1, title: "Branding Specialization", progress: 50, status: "in-progress" },
    { id: 2, title: "Brand Management: Aligning Business, Brand and Behaviour", progress: 20, status: "in-progress" },
    { id: 3, title: "Conduct a brand audit of a favorite company", progress: 70, status: "in-progress" },
  ],
  "systems-engineer": [
    { id: 1, title: "Systems Engineering Specialization", progress: 15, status: "in-progress" },
    { id: 2, title: "AWS Certified Solutions Architect - Associate", progress: 40, status: "in-progress" },
    { id: 3, title: "Google Cloud Professional Cloud Architect", progress: 0, status: "not-started" },
  ],
  "digital-marketing": [
    {
      id: 1,
      title: "Google Digital Marketing & E-commerce Certificate",
      progress: 45,
      status: "in-progress",
    },
    { id: 2, title: "Meta Social Media Marketing Certificate", progress: 10, status: "in-progress" },
    { id: 3, title: "Become proficient in Google Analytics", progress: 30, status: "in-progress" },
  ],
  "nlp-engineer": [
    { id: 1, title: "Natural Language Processing Specialization", progress: 25, status: "in-progress" },
    { id: 2, title: "TensorFlow Developer Professional Certificate", progress: 0, status: "not-started" },
    { id: 3, title: "Hugging Face NLP Course", progress: 10, status: "in-progress" },
  ],
  "cv-engineer": [
    { id: 1, title: "Computer Vision Specialization", progress: 20, status: "in-progress" },
    { id: 2, title: "Advanced Computer Vision with TensorFlow", progress: 0, status: "not-started" },
    { id: 3, "title": "PyTorch for Deep Learning", progress: 15, status: "in-progress" },
  ],
  "rl-engineer": [
    { id: 1, title: "Reinforcement Learning Specialization", progress: 15, status: "in-progress" },
    { id: 2, title: "Deep Reinforcement Learning Nanodegree", progress: 0, status: "not-started" },
    { id: 3, title: "Modern Robotics Specialization", progress: 5, status: "in-progress" },
  ],
  "ai-ethics": [
    { id: 1, title: "AI Ethics Specialization", progress: 30, status: "in-progress" },
    { id: 2, title: "Responsible AI for Developers Specialization", progress: 0, status: "not-started" },
    { id: 3, title: "AI Governance and Policy", progress: 10, status: "in-progress" },
  ],
  "penetration-tester": [
    { id: 1, title: "Offensive Security Certified Professional (OSCP)", progress: 10, status: "in-progress" },
    { id: 2, title: "Practical Ethical Hacking - The Complete Course", progress: 0, status: "not-started" },
    { id: 3, title: "Web Security Academy by PortSwigger", progress: 20, status: "in-progress" },
  ],
  "data-analytics": [
    { id: 1, title: "Google Data Analytics Certificate", progress: 60, status: "in-progress" },
    { id: 2, title: "IBM Data Science Certificate", progress: 100, status: "completed" },
    { id: 3, title: "Tableau Business Intelligence", progress: 0, status: "not-started" },
  ],
  cybersecurity: [
    { id: 1, title: "Google Cybersecurity Certificate", progress: 25, status: "in-progress" },
    { id: 2, title: "CompTIA Security+ Prep Course", progress: 40, status: "in-progress" },
    { id: 3, title: "Ethical Hacking Essentials", progress: 0, status: "not-started" },
  ],
  "software-engineer": [
    { id: 1, title: "Software Design and Architecture Specialization", progress: 20, status: "in-progress" },
    { id: 2, title: "Grokking the System Design Interview", progress: 45, status: "in-progress" },
    { id: 3, title: "Advanced Algorithms and Complexity", progress: 10, status: "not-started" },
  ],
}

function LearningPathContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")
  const [isUpdateGoalOpen, setUpdateGoalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)
  const [updatedProgress, setUpdatedProgress] = useState(0)

  const [courses, setCourses] = useState(() => (courseId && learningPathData[courseId]) || [])

  useEffect(() => {
    setCourses((courseId && learningPathData[courseId]) || [])
  }, [courseId])

  const openUpdateDialog = (course: (typeof courses)[0]) => {
    setSelectedCourse(course)
    setUpdatedProgress(course.progress)
    setUpdateGoalOpen(true)
  }

  const handleUpdateProgress = () => {
    if (selectedCourse) {
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id
            ? {
                ...c,
                progress: updatedProgress,
                status: updatedProgress === 100 ? "completed" : updatedProgress > 0 ? "in-progress" : "not-started",
              }
            : c,
        ),
      )
      setUpdateGoalOpen(false)
      setSelectedCourse(null)
    }
  }

  if (courses.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Your Learning Path</h2>
        </div>
        <div className="text-center text-muted-foreground p-4">
          <BookOpen className="mx-auto h-8 w-8 mb-2" />
          <p className="font-medium">No learning path selected.</p>
          <p className="text-sm">Complete an assessment to get a personalized path.</p>
        </div>
      </Card>
    )
  }

  return (
    <>
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
            </button>
          ))}
        </div>
      </Card>
      <Dialog open={isUpdateGoalOpen} onOpenChange={setUpdateGoalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Learning Progress</DialogTitle>
            <DialogDescription>{selectedCourse?.title}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="progress">Progress: {updatedProgress}%</Label>
            <Input id="progress" type="range" min="0" max="100" value={updatedProgress} onChange={(e) => setUpdatedProgress(Number(e.target.value))} />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateProgress}>Update Progress</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function LearningPathWidget() {
  return (
    <Suspense fallback={<Card className="p-6">Loading learning path...</Card>}>
      <LearningPathContent />
    </Suspense>
  )
}
