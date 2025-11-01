"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Zap,
  Award,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Course = {
  id: number
  title: string
  instructor: string
  category: string
  level: string
  duration: string
  hours: number
  students: number
  rating: number
  progress: number
  status: "in-progress" | "completed" | "not-started"
  skills: string[]
  recommended: boolean
  relevance: number
  image: string
  platform: string
  platformUrl: string
}

type LearningPath = {
  id: number
  title: string
  description: string
  courses: number[]
  duration: string
  difficulty: string
  matchScore: number
}

const allCoursesData: Record<string, Course[]> = {
  default: [
    {
      id: 1,
      title: "Advanced Product Strategy",
      instructor: "Sarah Chen",
      category: "Product Management",
      level: "Advanced",
      duration: "8 weeks",
      hours: 32,
      students: 2400,
      rating: 4.9,
      progress: 75,
      status: "in-progress",
      skills: ["Strategy", "Leadership", "Analytics"],
      recommended: true,
      relevance: 95,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 2,
      title: "Data-Driven Decision Making",
      instructor: "Marcus Johnson",
      category: "Analytics",
      level: "Intermediate",
      duration: "6 weeks",
      hours: 24,
      students: 3100,
      rating: 4.8,
      progress: 100,
      status: "completed",
      skills: ["Data Analysis", "SQL", "Visualization"],
      recommended: true,
      relevance: 88,
      image: "/udemy-product-course.jpg",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
    {
      id: 3,
      title: "Leadership for Managers",
      instructor: "Emily Rodriguez",
      category: "Leadership",
      level: "Intermediate",
      duration: "10 weeks",
      hours: 40,
      students: 1800,
      rating: 4.7,
      progress: 30,
      status: "in-progress",
      skills: ["Team Management", "Communication", "Delegation"],
      recommended: true,
      relevance: 92,
      image: "/google-pm-certificate.jpg",
      platform: "LinkedIn Learning",
      platformUrl: "https://www.linkedin.com/learning",
    },
    {
      id: 4,
      title: "Introduction to Product Management",
      instructor: "John Doe",
      category: "Product Management",
      level: "Beginner",
      duration: "4 weeks",
      hours: 16,
      students: 5200,
      rating: 4.6,
      progress: 0,
      status: "not-started",
      skills: ["Product Lifecycle", "User Research", "Roadmapping"],
      recommended: false,
      relevance: 85,
      image: "/placeholder.svg",
      platform: "edX",
      platformUrl: "https://www.edx.org",
    },
    {
      id: 5,
      title: "Agile for Product Managers",
      instructor: "Jane Smith",
      category: "Agile",
      level: "Intermediate",
      duration: "3 weeks",
      hours: 12,
      students: 2900,
      rating: 4.8,
      progress: 0,
      status: "not-started",
      skills: ["Scrum", "Kanban", "User Stories"],
      recommended: false,
      relevance: 82,
      image: "/placeholder.svg",
      platform: "Pluralsight",
      platformUrl: "https://www.pluralsight.com",
    },
  ],
  "systems-engineer": [
    {
      id: 301,
      title: "Systems Engineering Specialization",
      instructor: "University of New South Wales",
      category: "Engineering",
      level: "Intermediate",
      duration: "5 months",
      hours: 80,
      students: 8000,
      rating: 4.7,
      progress: 15,
      status: "in-progress",
      skills: ["System Design", "Requirements Analysis", "Modeling"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 302,
      title: "AWS Certified Solutions Architect - Associate",
      instructor: "Stephane Maarek",
      category: "Cloud",
      level: "Intermediate",
      duration: "27 hours",
      hours: 27,
      students: 500000,
      rating: 4.7,
      progress: 40,
      status: "in-progress",
      skills: ["AWS", "Cloud Architecture", "Scalability"],
      recommended: true,
      relevance: 95,
      image: "/udemy-product-course.jpg",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
    {
      id: 303,
      title: "Google Cloud Professional Cloud Architect",
      instructor: "Google Cloud",
      category: "Cloud",
      level: "Advanced",
      duration: "3 months",
      hours: 60,
      students: 15000,
      rating: 4.6,
      progress: 0,
      status: "not-started",
      skills: ["GCP", "Kubernetes", "Infrastructure"],
      recommended: true,
      relevance: 90,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "software-developer": [
    {
      id: 101,
      title: "Meta Back-End Developer Professional Certificate",
      instructor: "Meta",
      category: "Backend",
      level: "Beginner",
      duration: "7 months",
      hours: 120,
      students: 15000,
      rating: 4.8,
      progress: 15,
      status: "in-progress",
      skills: ["Python", "Django", "APIs", "Databases"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 102,
      title: "IBM Full Stack Software Developer Professional Certificate",
      instructor: "IBM",
      category: "Full Stack",
      level: "Intermediate",
      duration: "10 months",
      hours: 180,
      students: 12000,
      rating: 4.7,
      progress: 0,
      status: "not-started",
      skills: ["React", "Node.js", "Cloud", "DevOps"],
      recommended: true,
      relevance: 95,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 103,
      title: "Algorithms Specialization",
      instructor: "Stanford University",
      category: "Algorithms",
      level: "Intermediate",
      duration: "4 months",
      hours: 60,
      students: 150000,
      rating: 4.8,
      progress: 50,
      status: "in-progress",
      skills: ["Data Structures", "Algorithm Design", "Complexity Analysis"],
      recommended: true,
      relevance: 94,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "data-analytics": [
    {
      id: 201,
      title: "Google Data Analytics Professional Certificate",
      instructor: "Google",
      category: "Analytics",
      level: "Beginner",
      duration: "6 months",
      hours: 100,
      students: 50000,
      rating: 4.9,
      progress: 60,
      status: "in-progress",
      skills: ["SQL", "Tableau", "R", "Spreadsheets"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 202,
      title: "IBM Data Science Professional Certificate",
      instructor: "IBM",
      category: "Data Science",
      level: "Intermediate",
      duration: "11 months",
      hours: 200,
      students: 25000,
      rating: 4.7,
      progress: 20,
      status: "in-progress",
      skills: ["Python", "Machine Learning", "Pandas"],
      recommended: true,
      relevance: 92,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 203,
      title: "Tableau Business Intelligence Analyst Certificate",
      instructor: "Tableau",
      category: "BI",
      level: "Intermediate",
      duration: "8 months",
      hours: 150,
      students: 8000,
      rating: 4.7,
      progress: 0,
      status: "not-started",
      skills: ["Tableau", "Data Visualization", "Business Intelligence"],
      recommended: true,
      relevance: 90,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  // Adding all other keys from goalsData to avoid fallback
  cybersecurity: [
    {
      id: 401,
      title: "Google Cybersecurity Professional Certificate",
      instructor: "Google",
      category: "Security",
      level: "Beginner",
      duration: "6 months",
      hours: 100,
      students: 75000,
      rating: 4.8,
      progress: 25,
      status: "in-progress",
      skills: ["SIEM Tools", "Threat Detection", "Python Scripting"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 402,
      title: "CompTIA Security+ (SY0-701) Complete Course & Exam",
      instructor: "Jason Dion",
      category: "Certification",
      level: "Intermediate",
      duration: "25 hours",
      hours: 25,
      students: 200000,
      rating: 4.7,
      progress: 40,
      status: "in-progress",
      skills: ["Network Security", "Cryptography", "Risk Management"],
      recommended: true,
      relevance: 95,
      image: "/udemy-product-course.jpg",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
    {
      id: 403,
      title: "Ethical Hacking: An Introduction",
      instructor: "EC-Council",
      category: "Offensive Security",
      level: "Beginner",
      duration: "4 weeks",
      hours: 16,
      students: 15000,
      rating: 4.6,
      progress: 0,
      status: "not-started",
      skills: ["Penetration Testing", "Vulnerability Assessment", "Metasploit"],
      recommended: false,
      relevance: 88,
      image: "/product-management-course.png",
      platform: "edX",
      platformUrl: "https://www.edx.org",
    },
  ],
  "ui-ux-design": [
    {
      id: 901,
      title: "Google UX Design Professional Certificate",
      instructor: "Google",
      category: "UX/UI",
      level: "Beginner",
      duration: "6 months",
      hours: 120,
      students: 350000,
      rating: 4.8,
      progress: 45,
      status: "in-progress",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 902,
      title: "UI/UX Design Specialization",
      instructor: "CalArts",
      category: "Design",
      level: "Intermediate",
      duration: "4 months",
      hours: 80,
      students: 50000,
      rating: 4.7,
      progress: 10,
      status: "in-progress",
      skills: ["UI Design", "UX Strategy", "Visual Design"],
      recommended: true,
      relevance: 94,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 903,
      title: "Figma for UI/UX: Master Web & App Design",
      instructor: "Andrei Neagoie",
      category: "Tooling",
      level: "All Levels",
      duration: "25 hours",
      hours: 25,
      students: 120000,
      rating: 4.7,
      progress: 0,
      status: "not-started",
      skills: ["Figma", "Prototyping", "Design Systems"],
      recommended: false,
      relevance: 90,
      image: "/udemy-product-course.jpg",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
  ],
  "penetration-tester": [
    {
      id: 1401,
      title: "Offensive Security Certified Professional (OSCP)",
      instructor: "Offensive Security",
      category: "Certification",
      level: "Advanced",
      duration: "Self-paced (90 days lab)",
      hours: 300,
      students: 20000,
      rating: 4.9,
      progress: 10,
      status: "in-progress",
      skills: ["Penetration Testing", "Exploit Development", "Kali Linux"],
      recommended: true,
      relevance: 99,
      image: "/product-management-course.png",
      platform: "Offensive Security",
      platformUrl: "https://www.offensive-security.com/",
    },
    {
      id: 1402,
      title: "Practical Ethical Hacking - The Complete Course",
      instructor: "Heath Adams (The Cyber Mentor)",
      category: "Ethical Hacking",
      level: "Intermediate",
      duration: "25 hours",
      hours: 25,
      students: 150000,
      rating: 4.8,
      progress: 0,
      status: "not-started",
      skills: ["Active Directory", "Python Scripting", "Web App Hacking"],
      recommended: true,
      relevance: 95,
      image: "/udemy-product-course.jpg",
      platform: "TCM Security",
      platformUrl: "https://academy.tcm-sec.com/",
    },
  ],
  "defensive-security": [
    {
      id: 1501,
      title: "GIAC Certified Incident Handler (GCIH)",
      instructor: "SANS Institute",
      category: "Certification",
      level: "Intermediate",
      duration: "6 days (bootcamp)",
      hours: 48,
      students: 10000,
      rating: 4.9,
      progress: 0,
      status: "not-started",
      skills: ["Incident Handling", "Threat Detection", "Forensics"],
      recommended: true,
      relevance: 98,
      image: "/google-pm-certificate.jpg",
      platform: "SANS",
      platformUrl: "https://www.sans.org/",
    },
  ],
  "incident-response": [
    {
      id: 1601,
      title: "Digital Forensics and Incident Response",
      instructor: "SANS Institute",
      category: "Forensics",
      level: "Advanced",
      duration: "6 days (bootcamp)",
      hours: 48,
      students: 8000,
      rating: 4.9,
      progress: 15,
      status: "in-progress",
      skills: ["Digital Forensics", "Malware Analysis", "Incident Response"],
      recommended: true,
      relevance: 99,
      image: "/product-management-course.png",
      platform: "SANS",
      platformUrl: "https://www.sans.org/",
    },
  ],
  "governance-compliance": [
    {
      id: 1701,
      title: "Certified Information Security Manager (CISM)",
      instructor: "ISACA",
      category: "Certification",
      level: "Advanced",
      duration: "Self-paced",
      hours: 100,
      students: 50000,
      rating: 4.8,
      progress: 10,
      status: "in-progress",
      skills: ["GRC", "Risk Management", "Security Governance"],
      recommended: true,
      relevance: 99,
      image: "/udemy-product-course.jpg",
      platform: "ISACA",
      platformUrl: "https://www.isaca.org/",
    },
  ],
  "data-analysis": [
    {
      id: 2301,
      title: "Google Data Analytics Professional Certificate",
      instructor: "Google",
      category: "Analytics",
      level: "Beginner",
      duration: "6 months",
      hours: 180,
      students: 500000,
      rating: 4.8,
      progress: 20,
      status: "in-progress",
      skills: ["SQL", "Tableau", "R", "Spreadsheets", "Data Cleaning"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "software-engineer": [
    {
      id: 501,
      title: "Software Design and Architecture Specialization",
      instructor: "University of Alberta",
      category: "Architecture",
      level: "Advanced",
      duration: "4 months",
      hours: 60,
      students: 20000,
      rating: 4.6,
      progress: 20,
      status: "in-progress",
      skills: ["Design Patterns", "Software Architecture", "UML", "Object-Oriented Design"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "strategy-manager": [
    {
      id: 601,
      title: "Business Strategy Specialization",
      instructor: "University of Virginia",
      category: "Strategy",
      level: "Intermediate",
      duration: "4 months",
      hours: 60,
      students: 45000,
      rating: 4.8,
      progress: 50,
      status: "in-progress",
      skills: ["Market Analysis", "Strategic Planning", "Competitive Strategy"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 602,
      title: "Financial Modeling for Strategic Decision Making",
      instructor: "Wharton Online",
      category: "Finance",
      level: "Advanced",
      duration: "6 weeks",
      hours: 24,
      students: 18000,
      rating: 4.7,
      progress: 0,
      status: "not-started",
      skills: ["Financial Modeling", "Valuation", "Excel"],
      recommended: true,
      relevance: 92,
      image: "/udemy-product-course.jpg",
      platform: "edX",
      platformUrl: "https://www.edx.org",
    },
  ],
  "project-manager": [
    {
      id: 701,
      title: "Google Project Management Professional Certificate",
      instructor: "Google",
      category: "Project Management",
      level: "Beginner",
      duration: "6 months",
      hours: 120,
      students: 400000,
      rating: 4.8,
      progress: 40,
      status: "in-progress",
      skills: ["Agile", "Scrum", "Risk Management", "Stakeholder Management"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 702,
      title: "The Complete Agile Project Management Course",
      instructor: "Joe Parys",
      category: "Agile",
      level: "Intermediate",
      duration: "20 hours",
      hours: 20,
      students: 95000,
      rating: 4.6,
      progress: 0,
      status: "not-started",
      skills: ["Jira", "Kanban", "Agile Methodologies"],
      recommended: true,
      relevance: 93,
      image: "/udemy-product-course.jpg",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
  ],
  "operations-manager": [
    {
      id: 801,
      title: "Supply Chain Management Specialization",
      instructor: "Rutgers University",
      category: "Supply Chain",
      level: "Intermediate",
      duration: "5 months",
      hours: 80,
      students: 30000,
      rating: 4.7,
      progress: 10,
      status: "in-progress",
      skills: ["Logistics", "Operations", "Supply Chain", "Six Sigma"],
      recommended: true,
      relevance: 97,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "clinical-lead": [
    {
      id: 1001,
      title: "Healthcare Organization Operations Specialization",
      instructor: "Rutgers University",
      category: "Healthcare Management",
      level: "Intermediate",
      duration: "5 months",
      hours: 75,
      students: 12000,
      rating: 4.7,
      progress: 30,
      status: "in-progress",
      skills: ["Healthcare Operations", "Leadership", "Quality Improvement"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "healthcare-educator": [
    {
      id: 1101,
      title: "Teaching and Assessing Clinical Skills",
      instructor: "University of Michigan",
      category: "Medical Education",
      level: "Intermediate",
      duration: "4 months",
      hours: 60,
      students: 8000,
      rating: 4.8,
      progress: 40,
      status: "in-progress",
      skills: ["Instructional Design", "Clinical Teaching", "Assessment"],
      recommended: true,
      relevance: 97,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "visual-designer": [
    {
      id: 1201,
      title: "Graphic Design Specialization",
      instructor: "CalArts",
      category: "Design",
      level: "Beginner",
      duration: "6 months",
      hours: 90,
      students: 150000,
      rating: 4.8,
      progress: 35,
      status: "in-progress",
      skills: ["Typography", "Color Theory", "Adobe Illustrator"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "mechanical-engineer": [
    {
      id: 1301,
      title: "Introduction to Engineering Mechanics",
      instructor: "Georgia Institute of Technology",
      category: "Engineering",
      level: "Beginner",
      duration: "12 weeks",
      hours: 48,
      students: 60000,
      rating: 4.7,
      progress: 50,
      status: "in-progress",
      skills: ["Statics", "Dynamics", "Structural Analysis"],
      recommended: true,
      relevance: 96,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
    {
      id: 1302,
      title: "Autodesk Certified Professional: AutoCAD for Design and Drafting",
      instructor: "Autodesk",
      category: "CAD",
      level: "Intermediate",
      duration: "8 weeks",
      hours: 40,
      students: 25000,
      rating: 4.6,
      progress: 10,
      status: "in-progress",
      skills: ["AutoCAD", "Drafting", "CAD Software"],
      recommended: true,
      relevance: 94,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "digital-marketing": [
    {
      id: 1801,
      title: "Google Digital Marketing & E-commerce Certificate",
      instructor: "Google",
      category: "Marketing",
      level: "Beginner",
      duration: "6 months",
      hours: 120,
      students: 100000,
      rating: 4.8,
      progress: 45,
      status: "in-progress",
      skills: ["SEO", "SEM", "Email Marketing", "E-commerce"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "brand-manager": [
    {
      id: 1901,
      title: "Brand Management: Aligning Business, Brand and Behaviour",
      instructor: "University of London",
      category: "Branding",
      level: "Intermediate",
      duration: "5 weeks",
      hours: 20,
      students: 50000,
      rating: 4.7,
      progress: 50,
      status: "in-progress",
      skills: ["Brand Strategy", "Brand Identity", "Marketing"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "nlp-engineer": [
    {
      id: 2001,
      title: "Natural Language Processing Specialization",
      instructor: "DeepLearning.AI",
      category: "AI/ML",
      level: "Intermediate",
      duration: "4 months",
      hours: 80,
      students: 60000,
      rating: 4.7,
      progress: 25,
      status: "in-progress",
      skills: ["NLP", "Transformers", "Sentiment Analysis", "TensorFlow"],
      recommended: true,
      relevance: 99,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "cv-engineer": [
    {
      id: 2101,
      title: "Computer Vision Specialization",
      instructor: "University of Buffalo & The State University of New York",
      category: "AI/ML",
      level: "Intermediate",
      duration: "5 months",
      hours: 100,
      students: 25000,
      rating: 4.6,
      progress: 20,
      status: "in-progress",
      skills: ["Computer Vision", "Image Processing", "OpenCV", "PyTorch"],
      recommended: true,
      relevance: 98,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "rl-engineer": [
    {
      id: 2201,
      title: "Reinforcement Learning Specialization",
      instructor: "University of Alberta",
      category: "AI/ML",
      level: "Advanced",
      duration: "4 months",
      hours: 80,
      students: 30000,
      rating: 4.7,
      progress: 15,
      status: "in-progress",
      skills: ["Reinforcement Learning", "Q-Learning", "Policy Gradients"],
      recommended: true,
      relevance: 99,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "ai-ethics": [
    {
      id: 2301,
      title: "AI Ethics Specialization",
      instructor: "University of Michigan",
      category: "Ethics",
      level: "Intermediate",
      duration: "4 months",
      hours: 60,
      students: 15000,
      rating: 4.7,
      progress: 30,
      status: "in-progress",
      skills: ["AI Governance", "Algorithmic Bias", "Policy Making"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "machine-learning": [
    {
      id: 2401,
      title: "Machine Learning Specialization",
      instructor: "DeepLearning.AI & Stanford",
      category: "AI/ML",
      level: "Beginner",
      duration: "3 months",
      hours: 70,
      students: 300000,
      rating: 4.9,
      progress: 25,
      status: "in-progress",
      skills: ["Supervised Learning", "Unsupervised Learning", "Python"],
      recommended: true,
      relevance: 99,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "data-engineering": [
    {
      id: 2501,
      title: "Google Professional Data Engineer Certification Prep",
      instructor: "Google Cloud",
      category: "Cloud",
      level: "Advanced",
      duration: "2 months",
      hours: 50,
      students: 40000,
      rating: 4.7,
      progress: 5,
      status: "in-progress",
      skills: ["Data Pipelines", "ETL", "BigQuery", "Apache Spark"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "business-intelligence": [
    {
      id: 2601,
      title: "Microsoft Power BI Data Analyst Professional Certificate",
      instructor: "Microsoft",
      category: "BI",
      level: "Intermediate",
      duration: "5 months",
      hours: 100,
      students: 150000,
      rating: 4.7,
      progress: 30,
      status: "in-progress",
      skills: ["Power BI", "DAX", "Data Modeling", "Data Visualization"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "brand-design": [
    {
      id: 2701,
      title: "Graphic Design Specialization",
      instructor: "CalArts",
      category: "Design",
      level: "Beginner",
      duration: "6 months",
      hours: 90,
      students: 150000,
      rating: 4.8,
      progress: 35,
      status: "in-progress",
      skills: ["Typography", "Color Theory", "Adobe Illustrator", "Branding"],
      recommended: true,
      relevance: 98,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  illustration: [
    {
      id: 2801,
      title: "Learn to Draw: Daily Practices to Improve Your Drawing Skills",
      instructor: "Gabrielle Brickey",
      category: "Art",
      level: "Beginner",
      duration: "15 hours",
      hours: 15,
      students: 80000,
      rating: 4.8,
      progress: 0,
      status: "not-started",
      skills: ["Sketching", "Digital Art", "Procreate", "Illustration"],
      recommended: true,
      relevance: 95,
      image: "/google-pm-certificate.jpg",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
  ],
  "industrial-design": [
    {
      id: 2901,
      title: "Product Design, Sketching, and Rendering",
      instructor: "Politecnico di Milano",
      category: "Design",
      level: "Intermediate",
      duration: "4 weeks",
      hours: 20,
      students: 10000,
      rating: 4.6,
      progress: 0,
      status: "not-started",
      skills: ["Sketching", "CAD", "Rendering", "Product Design"],
      recommended: true,
      relevance: 96,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "content-marketing": [
    {
      id: 3001,
      title: "Content Marketing Certification",
      instructor: "HubSpot Academy",
      category: "Marketing",
      level: "Beginner",
      duration: "8 hours",
      hours: 8,
      students: 200000,
      rating: 4.7,
      progress: 70,
      status: "in-progress",
      skills: ["Content Strategy", "SEO", "Storytelling", "Content Creation"],
      recommended: true,
      relevance: 98,
      image: "/udemy-product-course.jpg",
      platform: "HubSpot",
      platformUrl: "https://academy.hubspot.com/",
    },
  ],
  "social-media-marketing": [
    {
      id: 3101,
      title: "Meta Social Media Marketing Professional Certificate",
      instructor: "Meta",
      category: "Marketing",
      level: "Beginner",
      duration: "5 months",
      hours: 100,
      students: 250000,
      rating: 4.8,
      progress: 60,
      status: "in-progress",
      skills: ["Social Media Strategy", "Content Creation", "Community Management"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "paid-advertising": [
    {
      id: 3201,
      title: "Google Ads for Beginners",
      instructor: "Isaac Rudansky",
      category: "Marketing",
      level: "Beginner",
      duration: "25 hours",
      hours: 25,
      students: 180000,
      rating: 4.7,
      progress: 55,
      status: "in-progress",
      skills: ["Google Ads", "PPC", "SEM", "Keyword Research"],
      recommended: true,
      relevance: 97,
      image: "/product-management-course.png",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
  ],
  "search-engine-optimization": [
    {
      id: 3301,
      title: "SEO Specialization",
      instructor: "UC Davis",
      category: "Marketing",
      level: "Intermediate",
      duration: "5 months",
      hours: 80,
      students: 90000,
      rating: 4.7,
      progress: 30,
      status: "in-progress",
      skills: ["SEO", "Keyword Research", "Link Building", "Technical SEO"],
      recommended: true,
      relevance: 98,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "seo-specialist": [
    {
      id: 3301,
      title: "SEO Specialization",
      instructor: "UC Davis",
      category: "Marketing",
      level: "Intermediate",
      duration: "5 months",
      hours: 80,
      students: 90000,
      rating: 4.7,
      progress: 30,
      status: "in-progress",
      skills: ["SEO", "Keyword Research", "Link Building", "Technical SEO"],
      recommended: true,
      relevance: 98,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org/specializations/seo",
    },
    {
      id: 3302,
      title: "HubSpot SEO Certification Course",
      instructor: "HubSpot Academy",
      category: "Marketing",
      level: "Beginner",
      duration: "4 hours",
      hours: 4,
      students: 150000,
      rating: 4.6,
      progress: 0,
      status: "not-started",
      skills: ["On-Page SEO", "Content Strategy", "Link Building", "Reporting"],
      recommended: true,
      relevance: 95,
      image: "/product-management-course.png",
      platform: "HubSpot",
      platformUrl: "https://academy.hubspot.com/courses/seo-training",
    },
  ],
  "traditional-pm": [
    {
      id: 3401,
      title: "PMP Certification Exam Prep Course",
      instructor: "Andrew Ramdayal",
      category: "Certification",
      level: "Advanced",
      duration: "35 hours",
      hours: 35,
      students: 250000,
      rating: 4.8,
      progress: 10,
      status: "in-progress",
      skills: ["PMP", "Waterfall", "Risk Management", "Scope Management"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
  ],
  "technical-pm": [
    {
      id: 3601,
      title: "Software Product Management Specialization",
      instructor: "University of Alberta",
      category: "Product Management",
      level: "Intermediate",
      duration: "6 months",
      hours: 100,
      students: 50000,
      rating: 4.6,
      progress: 30,
      status: "in-progress",
      skills: ["Technical PM", "Agile", "Software Development Lifecycle"],
      recommended: true,
      relevance: 98,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "growth-pm": [
    {
      id: 3701,
      title: "Product-led Growth",
      instructor: "Reforge",
      category: "Growth",
      level: "Advanced",
      duration: "6 weeks",
      hours: 30,
      students: 5000,
      rating: 4.9,
      progress: 15,
      status: "in-progress",
      skills: ["Growth Hacking", "A/B Testing", "User Acquisition", "Funnel Optimization"],
      recommended: true,
      relevance: 99,
      image: "/google-pm-certificate.jpg",
      platform: "Reforge",
      platformUrl: "https://www.reforge.com/",
    },
  ],
  "consumer-pm": [
    {
      id: 3801,
      title: "Product Manager Certificate",
      instructor: "Product School",
      category: "Product Management",
      level: "Beginner",
      duration: "8 weeks",
      hours: 40,
      students: 20000,
      rating: 4.7,
      progress: 35,
      status: "in-progress",
      skills: ["User Research", "Roadmapping", "PRD", "B2C Products"],
      recommended: true,
      relevance: 97,
      image: "/product-management-course.png",
      platform: "Product School",
      platformUrl: "https://productschool.com/",
    },
  ],
  "ux-research": [
    {
      id: 4001,
      title: "User Research – Methods and Best Practices",
      instructor: "Interaction Design Foundation",
      category: "UX",
      level: "Intermediate",
      duration: "Self-paced",
      hours: 30,
      students: 15000,
      rating: 4.8,
      progress: 25,
      status: "in-progress",
      skills: ["User Research", "Usability Testing", "Personas", "Journey Mapping"],
      recommended: true,
      relevance: 98,
      image: "/google-pm-certificate.jpg",
      platform: "IDF",
      platformUrl: "https://www.interaction-design.org/",
    },
  ],
  "interaction-design": [
    {
      id: 4101,
      title: "Interaction Design Specialization",
      instructor: "UC San Diego",
      category: "UX",
      level: "Intermediate",
      duration: "8 months",
      hours: 120,
      students: 45000,
      rating: 4.7,
      progress: 30,
      status: "in-progress",
      skills: ["Interaction Design", "Prototyping", "HCI", "User-Centered Design"],
      recommended: true,
      relevance: 97,
      image: "/product-management-course.png",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "ui-design": [
    {
      id: 4201,
      title: "UI Design Program",
      instructor: "CareerFoundry",
      category: "UI",
      level: "Beginner",
      duration: "5 months",
      hours: 200,
      students: 5000,
      rating: 4.8,
      progress: 20,
      status: "in-progress",
      skills: ["UI Design", "Visual Design", "Figma", "Design Systems"],
      recommended: true,
      relevance: 98,
      image: "/udemy-product-course.jpg",
      platform: "CareerFoundry",
      platformUrl: "https://careerfoundry.com/",
    },
  ],
  "ux-analytics": [
    {
      id: 4301,
      title: "Google Analytics for Beginners",
      instructor: "Google Analytics Academy",
      category: "Analytics",
      level: "Beginner",
      duration: "4 hours",
      hours: 4,
      students: 500000,
      rating: 4.7,
      progress: 80,
      status: "in-progress",
      skills: ["Google Analytics", "UX Analytics", "Data Analysis", "A/B Testing"],
      recommended: true,
      relevance: 96,
      image: "/google-pm-certificate.jpg",
      platform: "Google",
      platformUrl: "https://analytics.google.com/analytics/academy/",
    },
  ],
  "frontend-development": [
    {
      id: 4401,
      title: "The Complete 2024 Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      category: "Web Development",
      level: "Beginner",
      duration: "65 hours",
      hours: 65,
      students: 800000,
      rating: 4.7,
      progress: 25,
      status: "in-progress",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      recommended: true,
      relevance: 98,
      image: "/product-management-course.png",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
  ],
  "backend-development": [
    {
      id: 4501,
      title: "Meta Back-End Developer Professional Certificate",
      instructor: "Meta",
      category: "Backend",
      level: "Beginner",
      duration: "7 months",
      hours: 120,
      students: 15000,
      rating: 4.8,
      progress: 20,
      status: "in-progress",
      skills: ["Python", "Django", "APIs", "Databases", "SQL"],
      recommended: true,
      relevance: 99,
      image: "/udemy-product-course.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "full-stack-development": [
    {
      id: 4601,
      title: "IBM Full Stack Software Developer Professional Certificate",
      instructor: "IBM",
      category: "Full Stack",
      level: "Intermediate",
      duration: "10 months",
      hours: 180,
      students: 12000,
      rating: 4.7,
      progress: 10,
      status: "in-progress",
      skills: ["React", "Node.js", "Cloud", "DevOps", "JavaScript"],
      recommended: true,
      relevance: 98,
      image: "/google-pm-certificate.jpg",
      platform: "Coursera",
      platformUrl: "https://www.coursera.org",
    },
  ],
  "ui-ux-development": [
    {
      id: 4701,
      title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
      instructor: "Jonas Schmedtmann",
      category: "Web Development",
      level: "Advanced",
      duration: "28 hours",
      hours: 28,
      students: 200000,
      rating: 4.8,
      progress: 35,
      status: "in-progress",
      skills: ["CSS", "Sass", "Flexbox", "Grid", "Animations"],
      recommended: true,
      relevance: 97,
      image: "/product-management-course.png",
      platform: "Udemy",
      platformUrl: "https://www.udemy.com",
    },
  ],
}

const allLearningPathsData: Record<string, LearningPath[]> = {
  default: [
    {
      id: 1,
      title: "Product Manager Mastery",
      description: "Complete path to become a successful Product Manager",
      courses: [1, 2, 3],
      duration: "24 weeks",
      difficulty: "Advanced",
      matchScore: 94,
    },
  ],
  "systems-engineer": [
    {
      id: 301,
      title: "Cloud & Systems Architecture Path",
      description: "Become a proficient systems engineer with expertise in cloud platforms.",
      courses: [301, 302, 303],
      duration: "9 months",
      difficulty: "Advanced",
      matchScore: 97,
    },
  ],
  "software-developer": [
    {
      id: 101,
      title: "Backend & Full Stack Developer Path",
      description: "Become a versatile developer with backend, full stack, and algorithmic skills.",
      courses: [101, 102, 103],
      duration: "21 months",
      difficulty: "Intermediate",
      matchScore: 96,
    },
  ],
  "software-engineer": [
    {
      id: 501,
      title: "Software Architect Path",
      description: "Master the principles of software architecture and design patterns.",
      courses: [501],
      duration: "4 months",
      difficulty: "Advanced",
      matchScore: 98,
    },
  ],
  "data-analytics": [
    {
      id: 201,
      title: "From Analyst to Data Scientist",
      description: "Master data analytics and take the next step into data science.",
      courses: [201, 202, 203],
      duration: "25 months",
      difficulty: "Intermediate",
      matchScore: 97,
    },
  ],
  cybersecurity: [
    {
      id: 401,
      title: "Cybersecurity Analyst Path",
      description: "Gain foundational and practical skills to become a cybersecurity analyst.",
      courses: [401, 402, 403],
      duration: "10 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  // Adding all other keys from goalsData to avoid fallback
  "ui-ux-design": [
    {
      id: 901,
      title: "Complete UX/UI Designer Path",
      description: "From fundamentals to advanced topics, become a job-ready UX/UI designer.",
      courses: [901, 902, 903],
      duration: "10 months",
      difficulty: "Intermediate",
      matchScore: 99,
    },
  ],
  "penetration-tester": [
    {
      id: 1401,
      title: "Ethical Hacker & Pen-Tester Path",
      description: "Master the tools and techniques used by professional penetration testers.",
      courses: [1401, 1402],
      duration: "9 months",
      difficulty: "Advanced",
      matchScore: 99,
    },
  ],
  "defensive-security": [],
  "incident-response": [],
  "governance-compliance": [],
  "data-analysis": [
    {
      id: 2301,
      title: "Data Analyst Career Path",
      description: "Go from zero to job-ready as a data analyst with this comprehensive path.",
      courses: [2301],
      duration: "6 months",
      difficulty: "Beginner",
      matchScore: 99,
    },
  ],
  "strategy-manager": [
    {
      id: 601,
      title: "Corporate Strategy Path",
      description: "Develop the skills to lead strategic initiatives and drive business growth.",
      courses: [601, 602],
      duration: "6 months",
      difficulty: "Advanced",
      matchScore: 98,
    },
  ],
  "project-manager": [
    {
      id: 701,
      title: "Certified Project Leader Path",
      description: "Master both traditional and Agile project management to lead any project to success.",
      courses: [701, 702],
      duration: "8 months",
      difficulty: "Intermediate",
      matchScore: 99,
    },
  ],
  "operations-manager": [
    {
      id: 801,
      title: "Operational Excellence Path",
      description: "Learn to optimize business processes and manage complex supply chains.",
      courses: [801],
      duration: "5 months",
      difficulty: "Intermediate",
      matchScore: 97,
    },
  ],
  "clinical-lead": [
    {
      id: 1001,
      title: "Clinical Leadership Path",
      description: "Develop the operational and leadership skills to excel as a clinical team lead.",
      courses: [1001],
      duration: "5 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "healthcare-educator": [
    {
      id: 1101,
      title: "Clinical Educator Path",
      description: "Master the art and science of teaching clinical skills to healthcare professionals.",
      courses: [1101],
      duration: "4 months",
      difficulty: "Intermediate",
      matchScore: 97,
    },
  ],
  "visual-designer": [
    {
      id: 1201,
      title: "Visual Branding Expert Path",
      description: "Learn the fundamentals of graphic design to create compelling visual identities.",
      courses: [1201],
      duration: "6 months",
      difficulty: "Beginner",
      matchScore: 98,
    },
  ],
  "mechanical-engineer": [
    {
      id: 1301,
      title: "Mechanical Design & Analysis Path",
      description: "Build a strong foundation in mechanical engineering principles and CAD software.",
      courses: [1301, 1302],
      duration: "6 months",
      difficulty: "Intermediate",
      matchScore: 95,
    },
  ],
  "digital-marketing": [
    {
      id: 1801,
      title: "Digital Marketing Specialist Path",
      description: "Become a certified digital marketing professional with skills in SEO, SEM, and e-commerce.",
      courses: [1801],
      duration: "6 months",
      difficulty: "Beginner",
      matchScore: 99,
    },
  ],
  "brand-manager": [
    {
      id: 1901,
      title: "Brand Strategist Path",
      description: "Learn to align business goals with brand strategy and create powerful brand identities.",
      courses: [1901],
      duration: "5 weeks",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "nlp-engineer": [
    {
      id: 2001,
      title: "NLP Engineer Path",
      description: "Master the techniques to build systems that understand human language.",
      courses: [2001],
      duration: "4 months",
      difficulty: "Intermediate",
      matchScore: 99,
    },
  ],
  "cv-engineer": [
    {
      id: 2101,
      title: "Computer Vision Engineer Path",
      description: "Learn to build applications that can 'see' and interpret the visual world.",
      courses: [2101],
      duration: "5 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "rl-engineer": [
    {
      id: 2201,
      title: "Reinforcement Learning Expert Path",
      description: "Dive deep into the algorithms that power autonomous decision-making agents.",
      courses: [2201],
      duration: "4 months",
      difficulty: "Advanced",
      matchScore: 99,
    },
  ],
  "ai-ethics": [
    {
      id: 2301,
      title: "AI Governance Professional Path",
      description: "Develop the skills to ensure AI is developed and deployed responsibly.",
      courses: [2301],
      duration: "4 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "machine-learning": [
    {
      id: 2401,
      title: "Machine Learning Foundations Path",
      description: "Build a strong foundation in the most important machine learning concepts.",
      courses: [2401],
      duration: "3 months",
      difficulty: "Beginner",
      matchScore: 99,
    },
  ],
  "data-engineering": [
    {
      id: 2501,
      title: "Cloud Data Engineer Path",
      description: "Prepare for a career in data engineering and the Google Professional Data Engineer certification.",
      courses: [2501],
      duration: "2 months",
      difficulty: "Advanced",
      matchScore: 99,
    },
  ],
  "business-intelligence": [
    {
      id: 2601,
      title: "BI Analyst Path with Power BI",
      description: "Master Power BI to transform data into actionable business insights.",
      courses: [2601],
      duration: "5 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "brand-design": [
    {
      id: 2701,
      title: "Brand Identity & Design Path",
      description: "Learn the core principles of graphic design to build compelling brand identities.",
      courses: [2701],
      duration: "6 months",
      difficulty: "Beginner",
      matchScore: 98,
    },
  ],
  illustration: [
    {
      id: 2801,
      title: "Digital Illustrator Path",
      description: "Develop your drawing skills and master digital tools like Procreate.",
      courses: [2801],
      duration: "1 month",
      difficulty: "Beginner",
      matchScore: 95,
    },
  ],
  "industrial-design": [
    {
      id: 2901,
      title: "Product Design & Sketching Path",
      description: "Learn the fundamentals of industrial design, from sketching to rendering.",
      courses: [2901],
      duration: "4 weeks",
      difficulty: "Intermediate",
      matchScore: 96,
    },
  ],
  "content-marketing": [],
  "social-media-marketing": [],
  "paid-advertising": [
    {
      id: 3201,
      title: "Paid Advertising Specialist Path",
      description: "Master Google Ads, Meta Ads, and PPC strategies to drive measurable results.",
      courses: [3201],
      duration: "1 month",
      difficulty: "Beginner",
      matchScore: 97,
    },
  ],
  "search-engine-optimization": [
    {
      id: 3301,
      title: "SEO Expert Path",
      description: "Learn technical SEO, content strategy, and link building to rank higher on search engines.",
      courses: [3301],
      duration: "5 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "seo-specialist": [
    {
      id: 3301,
      title: "SEO Expert Path",
      description: "Learn technical SEO, content strategy, and link building to rank higher on search engines.",
      courses: [3301, 3302],
      duration: "5 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "traditional-pm": [
    {
      id: 3401,
      title: "PMP Certification Path",
      description: "Prepare for the PMP exam and master the principles of traditional project management.",
      courses: [3401],
      duration: "2 months",
      difficulty: "Advanced",
      matchScore: 99,
    },
  ],
  "technical-pm": [
    {
      id: 3601,
      title: "Technical Product Manager Path",
      description: "Bridge the gap between engineering and business by mastering technical product management.",
      courses: [3601],
      duration: "6 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "growth-pm": [
    {
      id: 3701,
      title: "Growth Product Manager Path",
      description: "Learn the frameworks and tactics to drive product-led growth and user acquisition.",
      courses: [3701],
      duration: "6 weeks",
      difficulty: "Advanced",
      matchScore: 99,
    },
  ],
  "consumer-pm": [
    {
      id: 3801,
      title: "Consumer Product Manager Path",
      description: "Master the skills to build and manage successful B2C products.",
      courses: [3801],
      duration: "8 weeks",
      difficulty: "Beginner",
      matchScore: 97,
    },
  ],
  "strategic-pm": [
    {
      id: 3901,
      title: "Product Strategy Leader Path",
      description: "Develop advanced skills in market analysis, portfolio management, and long-term product strategy.",
      courses: [3901],
      duration: "6 weeks",
      difficulty: "Advanced",
      matchScore: 99,
    },
  ],
  "ux-research": [
    {
      id: 4001,
      title: "UX Researcher Path",
      description: "Become an expert in user research methods, from interviews to usability testing.",
      courses: [4001],
      duration: "4 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "interaction-design": [
    {
      id: 4101,
      title: "Interaction Designer Path",
      description: "Master the principles of HCI and user-centered design to create intuitive digital experiences.",
      courses: [4101],
      duration: "8 months",
      difficulty: "Intermediate",
      matchScore: 97,
    },
  ],
  "ui-design": [
    {
      id: 4201,
      title: "UI Design Specialist Path",
      description: "Master the art of creating beautiful, intuitive, and effective user interfaces.",
      courses: [4201],
      duration: "5 months",
      difficulty: "Beginner",
      matchScore: 98,
    },
  ],
  "ux-analytics": [],
  "frontend-development": [
    {
      id: 4401,
      title: "Frontend Developer Career Path",
      description: "Master HTML, CSS, JavaScript, and React to become a job-ready frontend developer.",
      courses: [4401],
      duration: "6 months",
      difficulty: "Beginner",
      matchScore: 98,
    },
  ],
  "backend-development": [
    {
      id: 4501,
      title: "Backend Developer Career Path",
      description: "Learn Python, Django, and databases to build powerful server-side applications.",
      courses: [4501],
      duration: "7 months",
      difficulty: "Beginner",
      matchScore: 99,
    },
  ],
  "full-stack-development": [
    {
      id: 4601,
      title: "Full Stack Developer Career Path",
      description: "Become a versatile developer by mastering both frontend and backend technologies.",
      courses: [4601],
      duration: "10 months",
      difficulty: "Intermediate",
      matchScore: 98,
    },
  ],
  "ui-ux-development": [
    {
      id: 4701,
      title: "UI/UX Development Specialist Path",
      description: "Bridge the gap between design and development by mastering advanced CSS and animations.",
      courses: [4701],
      duration: "1 month",
      difficulty: "Advanced",
      matchScore: 97,
    },
  ],
}

const capitalizeString = (str: string | undefined): string => {
  if (!str) return "Unknown"
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function LearningPageContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPath, setSelectedPath] = useState<number | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [isUpdateCourseOpen, setUpdateCourseOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [updatedProgress, setUpdatedProgress] = useState(0)

  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")

  useEffect(() => {
    const initialCourses = (courseId && allCoursesData[courseId]) || allCoursesData.default
    const initialPaths = (courseId && allLearningPathsData[courseId]) || allLearningPathsData.default
    setCourses(initialCourses)
    setLearningPaths(initialPaths)
  }, [courseId])

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
      setUpdateCourseOpen(false)
      setSelectedCourse(null)
    }
  }

  const openUpdateDialog = (course: Course) => {
    setSelectedCourse(course)
    setUpdatedProgress(course.progress)
    setUpdateCourseOpen(true)
  }

  const categories = ["all", ...new Set(courses.map((c) => c.category).filter(Boolean))]
  const statuses = ["all", "in-progress", "completed", "not-started"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || course.category === filterCategory
    const matchesStatus = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const recommendedCourses = courses.filter((c) => c.recommended).sort((a, b) => b.relevance - a.relevance)

  const stats = {
    inProgress: courses.filter((c) => c.status === "in-progress").length,
    completed: courses.filter((c) => c.status === "completed").length,
    totalHours: Math.round(courses.reduce((sum, c) => sum + (c.progress / 100) * c.hours, 0)),
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <Card
      className="overflow-hidden hover:border-primary/50 transition flex flex-col cursor-pointer"
      onClick={() => openUpdateDialog(course)}
    >
      {/* Course Image */}
      {course.image && (
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
          {course.status === "completed" && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
          )}
        </div>
      )}

      {/* Course Header */}
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {course.level}
          </div>
          <a
            href={course.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition"
            title={`Visit ${course.platform}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{course.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground">{course.platform}</span>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.students?.toLocaleString() || "N/A"}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(course.rating || 0) ? "fill-primary text-primary" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{course.rating || "N/A"}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {course.skills?.map((skill: string) => (
            <span key={skill} className="px-2 py-1 rounded-full bg-muted text-xs text-foreground">
              {skill}
            </span>
          ))}
        </div>

        {/* Progress */}
        {course.progress !== undefined && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Progress</span>
              <span className="text-xs text-muted-foreground">{course.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-6 pt-4 border-t border-border">
        <Button className="w-full" asChild>
          <a href={course.platformUrl} target="_blank" rel="noopener noreferrer">
            {course.status === "completed" ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Completed
              </>
            ) : course.status === "in-progress" ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Continue
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Course
              </>
            )}
          </a>
        </Button>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Learning Hub</h1>

          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
              </div>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Learning Hours</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalHours}</p>
              </div>
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Personalized Learning Paths</h2>
            <p className="text-muted-foreground">AI-recommended paths based on your career profile</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className={`p-6 cursor-pointer transition border-2 ${
                  selectedPath === path.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {path.difficulty}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
                    <Zap className="h-3 w-3 text-primary" />
                    <span className="text-xs font-bold text-primary">{path.matchScore}%</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{path.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {path.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {path.courses.length} courses
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Recommended For You</h2>
            <p className="text-muted-foreground">Courses tailored to your career goals</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course) => (
              <div key={`${course.id}-${course.title}`} className="relative">
                <CourseCard course={course} />
                {course.relevance && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    <Award className="h-3 w-3" />
                    {course.relevance}% Match
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">All Courses</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  filterCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {capitalizeString(cat)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Status:</span>
            </div>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {capitalizeString(status.replace("-", " "))}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={`${course.id}-${course.title}`} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </Card>
        )}
      </div>
    </div>
  )
}