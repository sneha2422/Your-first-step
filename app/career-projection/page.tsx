"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { TrendingUp, Award, BookOpen, DollarSign, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const careerData: Record<string, any> = {
    "product-manager": {
      title: "Product Manager",
      description: "Lead product strategy and development",
      startSalary: 120000,
      endSalary: 250000,
      growthRate: 8.5,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "Product Fundamentals", level: "Beginner" },
        { year: 2, skill: "Data Analysis", level: "Intermediate" },
        { year: 4, skill: "Strategic Planning", level: "Advanced" },
        { year: 7, skill: "Team Leadership", level: "Expert" },
        { year: 10, skill: "Executive Strategy", level: "Expert" },
        { year: 15, skill: "Board-level Thinking", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Associate PM", salary: 120000 },
        { year: 3, title: "Senior PM", salary: 160000 },
        { year: 7, title: "Lead PM", salary: 200000 },
        { year: 12, title: "Director of Product", salary: 240000 },
        { year: 18, title: "VP of Product", salary: 280000 },
        { year: 25, title: "Chief Product Officer", salary: 350000 },
      ],
      courses: [
        {
          year: 0,
          name: "Product Management 101",
          platform: "Coursera",
          duration: "4 weeks",
          url: "https://www.coursera.org/search?query=Product%20Management",
        },
        {
          year: 1,
          name: "Data-Driven Product Strategy",
          platform: "Udemy",
          duration: "6 weeks",
          url: "https://www.udemy.com/courses/search/?q=Data-Driven%20Product%20Strategy",
        },
        {
          year: 3,
          name: "Advanced Analytics for PMs",
          platform: "LinkedIn Learning",
          duration: "8 weeks",
          url: "https://www.linkedin.com/learning/search?keywords=Advanced%20Analytics%20for%20Product%20Managers",
        },
        {
          year: 5,
          name: "Executive Leadership",
          platform: "Coursera",
          duration: "12 weeks",
          url: "https://www.coursera.org/search?query=Executive%20Leadership",
        },
      ],
    },
    "software-developer": {
      title: "Software Developer",
      description: "Build, test, and maintain software applications.",
      startSalary: 90000,
      endSalary: 250000,
      growthRate: 9.0,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 14,
      skills: [
        { year: 0, skill: "Programming Fundamentals (Python/JS)", level: "Beginner" },
        { year: 2, skill: "Frameworks (React/Node.js)", level: "Intermediate" },
        { year: 5, skill: "System Design & Architecture", level: "Advanced" },
        { year: 8, skill: "Cloud & DevOps", level: "Expert" },
        { year: 12, skill: "Technical Leadership", level: "Expert" },
        { year: 18, skill: "Engineering Management", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Junior Developer", salary: 90000 },
        { year: 2, title: "Software Developer", salary: 115000 },
        { year: 5, title: "Senior Developer", salary: 150000 },
        { year: 9, title: "Tech Lead", salary: 180000 },
        { year: 15, title: "Engineering Manager", salary: 210000 },
        { year: 25, title: "Director of Engineering", salary: 250000 },
      ],
      courses: [
        {
          year: 0,
          name: "IBM Full Stack Developer Certificate",
          platform: "Coursera",
          duration: "10 months",
          url: "https://www.coursera.org/professional-certificates/ibm-full-stack-software-developer",
        },
        {
          year: 2,
          name: "Advanced JavaScript",
          platform: "Udemy",
          duration: "8 weeks",
          url: "https://www.udemy.com/courses/search/?q=Advanced%20JavaScript",
        },
        {
          year: 4,
          name: "Grokking the System Design Interview",
          platform: "Educative",
          duration: "10 weeks",
          url: "https://www.educative.io/courses/grokking-the-system-design-interview",
        },
        {
          year: 7,
          name: "AWS Certified Developer - Associate",
          platform: "AWS",
          duration: "12 weeks",
          url: "https://aws.amazon.com/certification/certified-developer-associate/",
        },
      ],
    },
    "data-analytics": {
      title: "Data Analyst",
      description: "Interpret data and turn it into information which can offer ways to improve a business.",
      startSalary: 75000,
      endSalary: 180000,
      growthRate: 7.5,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "SQL & Excel", level: "Beginner" },
        { year: 2, skill: "Data Visualization (Tableau/Power BI)", level: "Intermediate" },
        { year: 4, skill: "Python/R for Data Science", level: "Advanced" },
        { year: 7, skill: "Statistical Analysis & A/B Testing", level: "Expert" },
        { year: 10, skill: "Machine Learning Concepts", level: "Expert" },
        { year: 15, skill: "Analytics Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Junior Data Analyst", salary: 75000 },
        { year: 3, title: "Data Analyst", salary: 95000 },
        { year: 6, title: "Senior Data Analyst", salary: 120000 },
        { year: 10, title: "Analytics Manager", salary: 150000 },
        { year: 16, title: "Director of Analytics", salary: 180000 },
        { year: 25, title: "Head of Data", salary: 220000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google Data Analytics Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        },
        {
          year: 2,
          name: "Tableau Desktop Specialist",
          platform: "Tableau",
          duration: "8 weeks",
          url: "https://www.tableau.com/learn/certification/desktop-specialist",
        },
        {
          year: 4,
          name: "IBM Data Science Professional Certificate",
          platform: "Coursera",
          duration: "11 months",
          url: "https://www.coursera.org/professional-certificates/ibm-data-science",
        },
        {
          year: 7,
          name: "Advanced Statistics for Data Science",
          platform: "edX",
          duration: "10 weeks",
          url: "https://www.edx.org/search?q=Advanced%20Statistics%20for%20Data%20Science",
        },
      ],
    },
    cybersecurity: {
      title: "Cybersecurity Analyst",
      description: "Protect computer systems and networks from security breaches.",
      startSalary: 85000,
      endSalary: 200000,
      growthRate: 8.0,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "Security Fundamentals (CompTIA Security+)", level: "Beginner" },
        { year: 2, skill: "SIEM Tools & Threat Detection", level: "Intermediate" },
        { year: 5, skill: "Penetration Testing & Ethical Hacking", level: "Advanced" },
        { year: 8, skill: "Cloud Security (AWS/Azure)", level: "Expert" },
        { year: 12, skill: "Security Architecture", level: "Expert" },
        { year: 18, skill: "Cybersecurity Leadership (CISM)", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "SOC Analyst", salary: 85000 },
        { year: 3, title: "Cybersecurity Analyst", salary: 110000 },
        { year: 6, title: "Senior Security Engineer", salary: 140000 },
        { year: 10, title: "Security Architect", salary: 170000 },
        { year: 16, title: "Security Manager/Director", salary: 200000 },
        { year: 25, title: "Chief Information Security Officer (CISO)", salary: 260000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google Cybersecurity Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
        },
        {
          year: 2,
          name: "CompTIA Security+ Certification Prep",
          platform: "Udemy",
          duration: "8 weeks",
          url: "https://www.udemy.com/courses/search/?q=comptia%20security%2B",
        },
        {
          year: 5,
          name: "Practical Ethical Hacking",
          platform: "TCM Security",
          duration: "12 weeks",
          url: "https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course",
        },
        {
          year: 8,
          name: "AWS Certified Security - Specialty",
          platform: "AWS",
          duration: "10 weeks",
          url: "https://aws.amazon.com/certification/certified-security-specialty/",
        },
      ],
    },
    "software-engineer": {
      title: "Software Engineer",
      description: "Design, develop, and maintain large-scale software systems.",
      startSalary: 110000,
      endSalary: 300000,
      growthRate: 9.5,
      yearsToSenior: 3,
      yearsToLead: 7,
      yearsToExecutive: 12,
      skills: [
        { year: 0, skill: "Advanced Algorithms & Data Structures", level: "Beginner" },
        { year: 2, skill: "System Design & Scalability", level: "Intermediate" },
        { year: 5, skill: "Distributed Systems", level: "Advanced" },
        { year: 8, skill: "Cloud Native Technologies (Kubernetes)", level: "Expert" },
        { year: 12, skill: "Technical Strategy & Vision", level: "Expert" },
        { year: 18, skill: "Executive Engineering Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Software Engineer I", salary: 110000 },
        { year: 3, title: "Senior Software Engineer", salary: 160000 },
        { year: 7, title: "Staff Engineer", salary: 210000 },
        { year: 12, title: "Principal Engineer", salary: 260000 },
        { year: 18, title: "Distinguished Engineer / Director", salary: 300000 },
        { year: 25, title: "VP of Engineering / CTO", salary: 400000 },
      ],
      courses: [
        {
          year: 0,
          name: "Software Design and Architecture Specialization",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/software-design-architecture",
        },
        {
          year: 2,
          name: "Grokking the System Design Interview",
          platform: "Educative",
          duration: "10 weeks",
          url: "https://www.educative.io/courses/grokking-the-system-design-interview",
        },
        {
          year: 5,
          name: "Designing Data-Intensive Applications (Book)",
          platform: "O'Reilly",
          duration: "Self-paced",
          url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781449373320/",
        },
        {
          year: 8,
          name: "Certified Kubernetes Application Developer (CKAD)",
          platform: "Linux Foundation",
          duration: "12 weeks",
          url: "https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/",
        },
      ],
    },
    "strategy-manager": {
      title: "Strategy Manager",
      description: "Develops and executes organizational growth strategies.",
      startSalary: 110000,
      endSalary: 300000,
      growthRate: 8.0,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 14,
      skills: [
        { year: 0, skill: "Market Analysis & Research", level: "Beginner" },
        { year: 2, skill: "Financial Modeling & Valuation", level: "Intermediate" },
        { year: 5, skill: "Corporate Strategy & M&A", level: "Advanced" },
        { year: 8, skill: "Stakeholder Management", level: "Expert" },
        { year: 12, skill: "Business Transformation", level: "Expert" },
        { year: 18, skill: "Executive Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Strategy Analyst", salary: 110000 },
        { year: 4, title: "Strategy Manager", salary: 150000 },
        { year: 8, title: "Director of Strategy", salary: 200000 },
        { year: 14, title: "VP of Strategy", salary: 250000 },
        { year: 20, title: "Chief Strategy Officer (CSO)", salary: 300000 },
        { year: 30, title: "Board Member / Advisor", salary: 400000 },
      ],
      courses: [
        {
          year: 0,
          name: "Business Strategy Specialization",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/business-strategy",
        },
        {
          year: 2,
          name: "Financial Modeling & Valuation Course",
          platform: "Wall Street Prep",
          duration: "8 weeks",
          url: "https://www.wallstreetprep.com/self-study-programs/premium-package/",
        },
        {
          year: 5,
          name: "Advanced Business Strategy",
          platform: "Coursera",
          duration: "6 weeks",
          url: "https://www.coursera.org/learn/advanced-business-strategy",
        },
        {
          year: 10,
          name: "Executive Leadership Program",
          platform: "Harvard Business School",
          duration: "12 weeks",
          url: "https://www.exed.hbs.edu/programs/ple/",
        },
      ],
    },
    "project-manager": {
      title: "Project Manager",
      description: "Leads complex initiatives and teams to successful completion.",
      startSalary: 80000,
      endSalary: 190000,
      growthRate: 7.0,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 18,
      skills: [
        { year: 0, skill: "Project Management Fundamentals (PMP/CAPM)", level: "Beginner" },
        { year: 2, skill: "Agile & Scrum Methodologies", level: "Intermediate" },
        { year: 5, skill: "Risk Management & Budgeting", level: "Advanced" },
        { year: 8, skill: "Program Management", level: "Expert" },
        { year: 12, skill: "Portfolio Management", level: "Expert" },
        { year: 18, skill: "Organizational Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Project Coordinator", salary: 80000 },
        { year: 3, title: "Project Manager", salary: 105000 },
        { year: 7, title: "Senior Project Manager", salary: 130000 },
        { year: 12, title: "Program Manager", salary: 160000 },
        { year: 18, title: "Director of PMO", salary: 190000 },
        { year: 25, title: "VP of Operations", salary: 240000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google Project Management Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/google-project-management",
        },
        {
          year: 2,
          name: "Certified ScrumMaster (CSM)",
          platform: "Scrum Alliance",
          duration: "2 days",
          url: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
        },
        {
          year: 5,
          name: "PMP Certification Training",
          platform: "Udemy",
          duration: "10 weeks",
          url: "https://www.udemy.com/courses/search/?q=pmp%20certification",
        },
        {
          year: 10,
          name: "Program Management Professional (PgMP)",
          platform: "PMI",
          duration: "12 weeks",
          url: "https://www.pmi.org/certifications/program-management-pgmp",
        },
      ],
    },
    "operations-manager": {
      title: "Operations Manager",
      description: "Optimizes business processes for efficiency and performance.",
      startSalary: 70000,
      endSalary: 220000,
      growthRate: 7.8,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Process Mapping & Analysis", level: "Beginner" },
        { year: 3, skill: "Supply Chain & Logistics", level: "Intermediate" },
        { year: 6, skill: "Lean Six Sigma (Green Belt)", level: "Advanced" },
        { year: 9, skill: "Operations Strategy", level: "Expert" },
        { year: 14, skill: "Global Operations Management", level: "Expert" },
        { year: 20, skill: "Executive Operations Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Operations Analyst", salary: 70000 },
        { year: 4, title: "Operations Manager", salary: 100000 },
        { year: 8, title: "Senior Operations Manager", salary: 130000 },
        { year: 13, title: "Director of Operations", salary: 170000 },
        { year: 18, title: "VP of Operations", salary: 220000 },
        { year: 25, title: "Chief Operating Officer (COO)", salary: 300000 },
      ],
      courses: [
        {
          year: 0,
          name: "Operations Management Foundations",
          platform: "LinkedIn Learning",
          duration: "4 weeks",
          url: "https://www.linkedin.com/learning/search?keywords=Operations%20Management",
        },
        {
          year: 3,
          name: "Supply Chain Management Specialization",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/specializations/supply-chain-management",
        },
        {
          year: 6,
          name: "Lean Six Sigma Green Belt Certification",
          platform: "ASQ",
          duration: "10 weeks",
          url: "https://asq.org/cert/six-sigma-green-belt",
        },
        {
          year: 10,
          name: "Global Master of Business Administration (GMBA)",
          platform: "Various",
          duration: "2 years",
          url: "https://www.coursera.org/degrees/mba",
        },
      ],
    },
    "clinical-lead": {
      title: "Clinical Team Lead",
      description: "Guides clinical teams and oversees patient care quality.",
      startSalary: 95000,
      endSalary: 210000,
      growthRate: 6.5,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 18,
      skills: [
        { year: 0, skill: "Clinical Practice & Patient Care", level: "Beginner" },
        { year: 3, skill: "Team Leadership & Mentoring", level: "Intermediate" },
        { year: 6, skill: "Healthcare Regulations & Compliance", level: "Advanced" },
        { year: 10, skill: "Clinical Trial Management", level: "Expert" },
        { year: 15, skill: "Healthcare Administration", level: "Expert" },
        { year: 22, skill: "Executive Medical Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Registered Nurse / Clinician", salary: 95000 },
        { year: 4, title: "Clinical Team Lead", salary: 115000 },
        { year: 8, title: "Clinical Manager", salary: 140000 },
        { year: 14, title: "Director of Nursing / Clinical Services", salary: 175000 },
        { year: 20, title: "VP of Clinical Operations", salary: 210000 },
        { year: 30, title: "Chief Medical Officer (CMO)", salary: 280000 },
      ],
      courses: [
        {
          year: 0,
          name: "Healthcare Organization Operations",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/specializations/healthcare-organization-operations",
        },
        {
          year: 3,
          name: "Clinical Leadership and Management",
          platform: "edX",
          duration: "8 weeks",
          url: "https://www.edx.org/search?q=Clinical%20Leadership",
        },
        {
          year: 8,
          name: "Master of Healthcare Administration (MHA)",
          platform: "Various",
          duration: "2 years",
          url: "https://www.coursera.org/degrees/mha-unorth-texas",
        },
        {
          year: 12,
          name: "Clinical Trial Management Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/clinical-trial-management",
        },
      ],
    },
    "visual-designer": {
      title: "Visual Designer",
      description: "Creates compelling visual concepts for brands and products.",
      startSalary: 65000,
      endSalary: 180000,
      growthRate: 7.2,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 18,
      skills: [
        { year: 0, skill: "Design Fundamentals (Figma/Adobe)", level: "Beginner" },
        { year: 2, skill: "UI/UX Design Principles", level: "Intermediate" },
        { year: 5, skill: "Brand Identity & Strategy", level: "Advanced" },
        { year: 9, skill: "Motion Graphics & Animation", level: "Expert" },
        { year: 14, skill: "Creative Direction", level: "Expert" },
        { year: 20, skill: "Design Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Junior Visual Designer", salary: 65000 },
        { year: 3, title: "Visual Designer", salary: 85000 },
        { year: 6, title: "Senior Visual/Product Designer", salary: 115000 },
        { year: 11, title: "Art Director", salary: 145000 },
        { year: 18, title: "Creative Director", salary: 180000 },
        { year: 25, title: "Head of Design", salary: 230000 },
      ],
      courses: [
        {
          year: 0,
          name: "Graphic Design Specialization",
          platform: "Coursera (CalArts)",
          duration: "6 months",
          url: "https://www.coursera.org/specializations/graphic-design",
        },
        {
          year: 2,
          name: "Google UX Design Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/google-ux-design",
        },
        {
          year: 5,
          name: "Brand Management: Aligning Business, Brand and Behaviour",
          platform: "Coursera",
          duration: "5 weeks",
          url: "https://www.coursera.org/learn/brand-management",
        },
        {
          year: 8,
          name: "After Effects - Motion Graphics & Data Visualization",
          platform: "Udemy",
          duration: "10 weeks",
          url: "https://www.udemy.com/courses/search/?q=after%20effects%20motion%20graphics",
        },
      ],
    },
    "healthcare-educator": {
      title: "Healthcare Educator",
      description: "Designs and delivers clinical and patient training programs.",
      startSalary: 75000,
      endSalary: 160000,
      growthRate: 6.0,
      yearsToSenior: 6,
      yearsToLead: 12,
      yearsToExecutive: 20,
      skills: [
        { year: 0, skill: "Clinical Expertise", level: "Beginner" },
        { year: 3, skill: "Instructional Design & Curriculum Dev", level: "Intermediate" },
        { year: 7, skill: "Adult Learning Principles", level: "Advanced" },
        { year: 11, skill: "E-Learning Development", level: "Expert" },
        { year: 16, skill: "Education Program Management", level: "Expert" },
        { year: 22, skill: "Leadership in Healthcare Education", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Clinical Educator", salary: 75000 },
        { year: 5, title: "Senior Educator / Instructional Designer", salary: 95000 },
        { year: 10, title: "Education Manager", salary: 115000 },
        { year: 16, title: "Director of Clinical Education", salary: 140000 },
        { year: 22, title: "Chief Learning Officer (Healthcare)", salary: 160000 },
        { year: 30, title: "Consultant", salary: 180000 },
      ],
      courses: [
        {
          year: 0,
          name: "Teaching and Assessing Clinical Skills",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/learn/teaching-assessing-clinical-skills",
        },
        {
          year: 3,
          name: "Instructional Design Foundations",
          platform: "LinkedIn Learning",
          duration: "6 weeks",
          url: "https://www.linkedin.com/learning/search?keywords=Instructional%20Design",
        },
        {
          year: 8,
          name: "Master of Health Professions Education (MHPE)",
          platform: "Various",
          duration: "2 years",
          url: "https://www.coursera.org/search?query=Master%20of%20Health%20Professions%20Education",
        },
        {
          year: 12,
          name: "Articulate Storyline 360 Training",
          platform: "Udemy",
          duration: "8 weeks",
          url: "https://www.udemy.com/courses/search/?q=articulate%20storyline",
        },
      ],
    },
    "systems-engineering": {
      title: "Systems Engineer",
      description: "Designs, integrates, and manages complex engineering systems.",
      startSalary: 95000,
      endSalary: 240000,
      growthRate: 8.8,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "System Modeling (SysML/UML)", level: "Beginner" },
        { year: 2, skill: "Requirements Engineering", level: "Intermediate" },
        { year: 5, skill: "System Architecture & Design", level: "Advanced" },
        { year: 9, skill: "Cloud Infrastructure (AWS/Azure)", level: "Expert" },
        { year: 14, skill: "Site Reliability Engineering (SRE)", level: "Expert" },
        { year: 20, skill: "Enterprise Architecture", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Systems Engineer", salary: 95000 },
        { year: 4, title: "Senior Systems Engineer", salary: 130000 },
        { year: 8, title: "Systems Architect", salary: 170000 },
        { year: 13, title: "Principal Engineer / SRE Lead", salary: 200000 },
        { year: 18, title: "Director of Infrastructure", salary: 240000 },
        { year: 25, title: "Chief Technology Officer (CTO)", salary: 320000 },
      ],
      courses: [
        {
          year: 0,
          name: "Systems Engineering Specialization",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/specializations/systems-engineering",
        },
        {
          year: 4,
          name: "AWS Certified Solutions Architect",
          platform: "AWS",
          duration: "10 weeks",
          url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        },
        {
          year: 8,
          name: "Google Cloud Professional Cloud Architect",
          platform: "Coursera",
          duration: "3 months",
          url: "https://www.coursera.org/professional-certificates/gcp-cloud-architect",
        },
        {
          year: 12,
          name: "TOGAF Enterprise Architecture Certification",
          platform: "The Open Group",
          duration: "12 weeks",
          url: "https://www.opengroup.org/certifications/togaf",
        },
      ],
    },
    "mechanical-civil-engineering": {
      title: "Mechanical/Civil Engineer",
      description: "Designs, builds, and maintains physical structures and machines.",
      startSalary: 75000,
      endSalary: 190000,
      growthRate: 6.2,
      yearsToSenior: 6,
      yearsToLead: 12,
      yearsToExecutive: 20,
      skills: [
        { year: 0, skill: "CAD Software (AutoCAD/SolidWorks)", level: "Beginner" },
        { year: 3, skill: "Structural Analysis & FEA", level: "Intermediate" },
        { year: 6, skill: "Project Management (P.E. License)", level: "Advanced" },
        { year: 10, skill: "Construction Management", level: "Expert" },
        { year: 15, skill: "Engineering Firm Leadership", level: "Expert" },
        { year: 22, skill: "Public Works Directorship", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Engineer in Training (EIT)", salary: 75000 },
        { year: 5, title: "Professional Engineer (PE)", salary: 105000 },
        { year: 10, title: "Senior Engineer / Project Lead", salary: 135000 },
        { year: 16, title: "Engineering Manager", salary: 165000 },
        { year: 22, title: "Principal / Firm Partner", salary: 190000 },
        { year: 30, title: "Director of Engineering", salary: 240000 },
      ],
      courses: [
        {
          year: 0,
          name: "Autodesk Certified Professional in AutoCAD",
          platform: "Autodesk",
          duration: "8 weeks",
          url: "https://www.autodesk.com/certification/products/autocad-certified-professional",
        },
        {
          year: 2,
          name: "FE/EIT Exam Preparation",
          platform: "PPI2PASS",
          duration: "12 weeks",
          url: "https://ppi2pass.com/fe-exam",
        },
        {
          year: 5,
          name: "PE Exam Preparation (Civil/Mechanical)",
          platform: "PPI2PASS",
          duration: "16 weeks",
          url: "https://ppi2pass.com/pe-exam",
        },
        {
          year: 10,
          name: "Construction Management Specialization",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/specializations/construction-management",
        },
      ],
    },
    "digital-marketing-manager": {
      title: "Digital Marketing Manager",
      description: "Drives customer acquisition and brand growth through online channels.",
      startSalary: 70000,
      endSalary: 200000,
      growthRate: 8.2,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "SEO, SEM, & Social Media Marketing", level: "Beginner" },
        { year: 2, skill: "Content Marketing & Analytics", level: "Intermediate" },
        { year: 5, skill: "Marketing Automation & CRM", level: "Advanced" },
        { year: 8, skill: "Growth Hacking & Experimentation", level: "Expert" },
        { year: 12, skill: "Marketing Leadership & Budgeting", level: "Expert" },
        { year: 18, skill: "Executive Brand Strategy", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Marketing Coordinator", salary: 70000 },
        { year: 3, title: "Digital Marketing Manager", salary: 100000 },
        { year: 7, title: "Senior Marketing Manager", salary: 130000 },
        { year: 11, title: "Director of Marketing", salary: 165000 },
        { year: 16, title: "VP of Marketing", salary: 200000 },
        { year: 25, title: "Chief Marketing Officer (CMO)", salary: 280000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google Digital Marketing & E-commerce Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
        },
        {
          year: 2,
          name: "HubSpot Content Marketing Certification",
          platform: "HubSpot",
          duration: "6 weeks",
          url: "https://academy.hubspot.com/courses/content-marketing",
        },
        {
          year: 5,
          name: "Salesforce Administrator Certification",
          platform: "Salesforce",
          duration: "10 weeks",
          url: "https://trailhead.salesforce.com/credentials/administrator",
        },
        {
          year: 8,
          name: "Growth Marketing Program",
          platform: "Reforge",
          duration: "8 weeks",
          url: "https://www.reforge.com/programs/growth-series",
        },
      ],
    },
    "brand-manager": {
      title: "Brand Manager",
      description: "Shapes a brand's identity, voice, and market position.",
      startSalary: 80000,
      endSalary: 230000,
      growthRate: 7.9,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 17,
      skills: [
        { year: 0, skill: "Market Research & Consumer Behavior", level: "Beginner" },
        { year: 3, skill: "Brand Strategy & Positioning", level: "Intermediate" },
        { year: 6, skill: "Product Marketing & Go-to-Market", level: "Advanced" },
        { year: 10, skill: "Campaign Management & Creative Direction", level: "Expert" },
        { year: 15, skill: "Portfolio & P&L Management", level: "Expert" },
        { year: 21, skill: "Global Brand Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Assistant Brand Manager", salary: 80000 },
        { year: 4, title: "Brand Manager", salary: 115000 },
        { year: 8, title: "Senior Brand Manager", salary: 150000 },
        { year: 13, title: "Marketing Director / Group Brand Director", salary: 190000 },
        { year: 19, title: "VP of Brand/Marketing", salary: 230000 },
        { year: 28, title: "Chief Marketing Officer (CMO)", salary: 310000 },
      ],
      courses: [
        {
          year: 0,
          name: "Brand Management: Aligning Business, Brand and Behaviour",
          platform: "Coursera",
          duration: "5 weeks",
          url: "https://www.coursera.org/learn/brand-management",
        },
        {
          year: 3,
          name: "Marketing Strategy Specialization",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/marketing-strategy",
        },
        {
          year: 6,
          name: "Product Marketing Course",
          platform: "Pragmatic Institute",
          duration: "8 weeks",
          url: "https://www.pragmaticinstitute.com/courses/foundations-market-build/",
        },
        {
          year: 12,
          name: "Executive MBA",
          platform: "Various",
          duration: "2 years",
          url: "https://www.coursera.org/degrees/mba",
        },
      ],
    },
    "nlp-engineer": {
      title: "NLP Engineer",
      description: "Builds systems that understand and generate human language.",
      startSalary: 120000,
      endSalary: 320000,
      growthRate: 9.8,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 14,
      skills: [
        { year: 0, skill: "NLP Fundamentals & Transformers", level: "Beginner" },
        { year: 2, skill: "LLM Fine-Tuning & Prompt Engineering", level: "Intermediate" },
        { year: 5, skill: "Advanced Model Architecture", level: "Advanced" },
        { year: 9, skill: "NLP System Deployment (MLOps)", level: "Expert" },
        { year: 14, skill: "Research & Innovation Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "NLP Engineer", salary: 120000 },
        { year: 4, title: "Senior NLP Engineer", salary: 170000 },
        { year: 8, title: "NLP Research Scientist", salary: 220000 },
        { year: 14, title: "Principal AI Scientist (NLP)", salary: 280000 },
        { year: 20, title: "Director of AI Research", salary: 320000 },
      ],
      courses: [
        {
          year: 0,
          name: "Natural Language Processing Specialization",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/natural-language-processing",
        },
        {
          year: 2,
          name: "Hugging Face NLP Course",
          platform: "Hugging Face",
          duration: "Self-paced",
          url: "https://huggingface.co/learn/nlp-course",
        },
        {
          year: 5,
          name: "Advanced NLP with spaCy",
          platform: "Official Docs",
          duration: "Self-paced",
          url: "https://course.spacy.io/en/",
        },
      ],
    },
    "cv-engineer": {
      title: "Computer Vision Engineer",
      description: "Develops systems that can 'see' and interpret visual data.",
      startSalary: 125000,
      endSalary: 330000,
      growthRate: 9.9,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "CV Fundamentals & OpenCV", level: "Beginner" },
        { year: 2, skill: "Deep Learning for Image Recognition", level: "Intermediate" },
        { year: 5, skill: "Object Detection & Segmentation", level: "Advanced" },
        { year: 9, skill: "3D Vision & SLAM", level: "Expert" },
        { year: 15, skill: "Vision Systems Architecture", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "CV Engineer", salary: 125000 },
        { year: 4, title: "Senior CV Engineer", salary: 175000 },
        { year: 8, title: "CV Research Scientist", salary: 230000 },
        { year: 15, title: "Principal Scientist (Vision)", salary: 290000 },
        { year: 22, title: "Director of Computer Vision", salary: 330000 },
      ],
      courses: [
        {
          year: 0,
          name: "Computer Vision Specialization",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/specializations/computer-vision",
        },
        {
          year: 2,
          name: "Advanced Computer Vision with TensorFlow",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/learn/advanced-computer-vision-with-tensorflow",
        },
        {
          year: 5,
          name: "Self-Driving Car Engineering Nanodegree",
          platform: "Udacity",
          duration: "6 months",
          url: "https://www.udacity.com/course/self-driving-car-engineer-nanodegree--nd0013",
        },
      ],
    },
    "rl-engineer": {
      title: "Reinforcement Learning Engineer",
      description: "Creates agents that learn optimal behaviors through trial and error.",
      startSalary: 130000,
      endSalary: 350000,
      growthRate: 10.2,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "RL Fundamentals (Q-Learning, Policy Gradients)", level: "Beginner" },
        { year: 2, skill: "Deep Reinforcement Learning", level: "Intermediate" },
        { year: 5, skill: "Multi-Agent RL & Game Theory", level: "Advanced" },
        { year: 9, skill: "RL for Robotics & Control", level: "Expert" },
        { year: 16, skill: "Advanced Research in RL", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "RL Engineer", salary: 130000 },
        { year: 4, title: "Senior RL Engineer", salary: 185000 },
        { year: 9, title: "RL Research Scientist", salary: 240000 },
        { year: 16, title: "Principal AI Scientist (RL)", salary: 300000 },
        { year: 24, title: "Head of Robotics/AI", salary: 350000 },
      ],
      courses: [
        {
          year: 0,
          name: "Reinforcement Learning Specialization",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/reinforcement-learning",
        },
        {
          year: 2,
          name: "Deep Reinforcement Learning Nanodegree",
          platform: "Udacity",
          duration: "4 months",
          url: "https://www.udacity.com/course/deep-reinforcement-learning-nanodegree--nd893",
        },
        {
          year: 5,
          name: "Modern Robotics Specialization",
          platform: "Coursera",
          duration: "7 months",
          url: "https://www.coursera.org/specializations/modernrobotics",
        },
      ],
    },
    "ai-ethics": {
      title: "AI Ethics & Governance",
      description: "Ensures AI systems are developed and used responsibly and fairly.",
      startSalary: 100000,
      endSalary: 250000,
      growthRate: 7.8,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Foundations of AI Ethics", level: "Beginner" },
        { year: 3, skill: "Algorithmic Bias & Fairness Audits", level: "Intermediate" },
        { year: 6, skill: "AI Policy & Regulation", level: "Advanced" },
        { year: 10, skill: "Explainable AI (XAI)", level: "Expert" },
        { year: 16, skill: "AI Governance Frameworks", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "AI Ethics Analyst", salary: 100000 },
        { year: 5, title: "AI Policy Advisor", salary: 140000 },
        { year: 10, title: "AI Ethics Lead", salary: 180000 },
        { year: 16, title: "Director of Responsible AI", salary: 220000 },
        { year: 25, title: "Chief AI Ethics Officer", salary: 250000 },
      ],
      courses: [
        {
          year: 0,
          name: "AI Ethics Specialization",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/ai-ethics",
        },
        {
          year: 3,
          name: "Responsible AI for Developers Specialization",
          platform: "Coursera",
          duration: "3 months",
          url: "https://www.coursera.org/specializations/responsible-ai-for-developers",
        },
        {
          year: 6,
          name: "Technology Policy",
          platform: "edX",
          duration: "8 weeks",
          url: "https://www.edx.org/search?q=Technology%20Policy",
        },
      ],
    },
    "offensive-security": {
      title: "Offensive Security Engineer",
      description: "Simulates attacks to find and fix security vulnerabilities.",
      startSalary: 105000,
      endSalary: 280000,
      growthRate: 9.2,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "Penetration Testing Fundamentals", level: "Beginner" },
        { year: 2, skill: "Web & Network Exploitation", level: "Intermediate" },
        { year: 5, skill: "Red Teaming & Adversary Simulation", level: "Advanced" },
        { year: 9, skill: "Exploit Development", level: "Expert" },
        { year: 15, skill: "Offensive Security Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Penetration Tester", salary: 105000 },
        { year: 4, title: "Senior Penetration Tester", salary: 150000 },
        { year: 8, title: "Red Team Lead", salary: 190000 },
        { year: 15, title: "Principal Security Engineer", salary: 240000 },
        { year: 22, title: "Director of Offensive Security", salary: 280000 },
      ],
      courses: [
        {
          year: 0,
          name: "Practical Ethical Hacking",
          platform: "TCM Security",
          duration: "12 weeks",
          url: "https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course",
        },
        {
          year: 2,
          name: "Offensive Security Certified Professional (OSCP)",
          platform: "Offensive Security",
          duration: "Self-paced",
          url: "https://www.offensive-security.com/pwk-oscp/",
        },
        {
          year: 5,
          name: "Web Security Academy",
          platform: "PortSwigger",
          duration: "Self-paced",
          url: "https://portswigger.net/web-security",
        },
      ],
    },
    "defensive-security": {
      title: "Defensive Security Analyst",
      description: "Protects networks and systems from cyber threats.",
      startSalary: 90000,
      endSalary: 240000,
      growthRate: 8.5,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Security Operations (SOC) Fundamentals", level: "Beginner" },
        { year: 2, skill: "Threat Hunting & SIEM Tools", level: "Intermediate" },
        { year: 5, skill: "Network Defense & Intrusion Detection", level: "Advanced" },
        { year: 9, skill: "Cloud Security Defense", level: "Expert" },
        { year: 16, skill: "Security Architecture", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "SOC Analyst", salary: 90000 },
        { year: 4, title: "Senior Security Analyst", salary: 125000 },
        { year: 9, title: "Security Engineer (Defense)", salary: 160000 },
        { year: 16, title: "Security Architect", salary: 200000 },
        { year: 24, title: "Director of Security Operations", salary: 240000 },
      ],
      courses: [
        {
          year: 0,
          name: "CompTIA Security+ Certification",
          platform: "CompTIA",
          duration: "8 weeks",
          url: "https://www.comptia.org/certifications/security",
        },
        {
          year: 2,
          name: "Splunk Core Certified Power User",
          platform: "Splunk",
          duration: "6 weeks",
          url: "https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html",
        },
        {
          year: 5,
          name: "GIAC Certified Incident Handler (GCIH)",
          platform: "SANS",
          duration: "Bootcamp",
          url: "https://www.sans.org/cyber-security-courses/hacker-techniques-incident-handling/",
        },
      ],
    },
    "incident-response": {
      title: "Incident Response Analyst",
      description: "Manages and investigates security breaches.",
      startSalary: 100000,
      endSalary: 270000,
      growthRate: 9.0,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "Incident Handling Procedures", level: "Beginner" },
        { year: 2, skill: "Digital Forensics & Evidence Collection", level: "Intermediate" },
        { year: 5, skill: "Malware Analysis & Reverse Engineering", level: "Advanced" },
        { year: 9, skill: "Threat Intelligence Integration", level: "Expert" },
        { year: 15, skill: "IR Team Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Incident Responder", salary: 100000 },
        { year: 4, title: "Senior Incident Responder", salary: 145000 },
        { year: 8, title: "Forensics/Malware Analyst", salary: 185000 },
        { year: 15, title: "Incident Response Manager", salary: 230000 },
        { year: 22, title: "Director of Incident Response", salary: 270000 },
      ],
      courses: [
        {
          year: 0,
          name: "GIAC Certified Incident Handler (GCIH)",
          platform: "SANS",
          duration: "Bootcamp",
          url: "https://www.sans.org/cyber-security-courses/hacker-techniques-incident-handling/",
        },
        {
          year: 2,
          name: "GIAC Certified Forensic Analyst (GCFA)",
          platform: "SANS",
          duration: "Bootcamp",
          url: "https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting/",
        },
        {
          year: 5,
          name: "Certified Reverse Engineering Analyst (CREA)",
          platform: "eLearnSecurity",
          duration: "Self-paced",
          url: "https://elearnsecurity.com/product/crea-certification/",
        },
      ],
    },
    "governance-compliance": {
      title: "Governance & Compliance Analyst",
      description: "Ensures an organization adheres to security and data privacy standards.",
      startSalary: 85000,
      endSalary: 220000,
      growthRate: 7.5,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 17,
      skills: [
        { year: 0, skill: "Security Frameworks (NIST, ISO 27001)", level: "Beginner" },
        { year: 3, skill: "IT Auditing & Risk Assessment", level: "Intermediate" },
        { year: 6, skill: "Data Privacy Regulations (GDPR, CCPA)", level: "Advanced" },
        { year: 10, skill: "GRC Program Management", level: "Expert" },
        { year: 17, skill: "Executive Compliance Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "GRC Analyst", salary: 85000 },
        { year: 5, title: "IT Auditor / Compliance Specialist", salary: 120000 },
        { year: 10, title: "Compliance Manager", salary: 155000 },
        { year: 17, title: "Director of GRC", salary: 190000 },
        { year: 25, title: "Chief Compliance Officer", salary: 220000 },
      ],
      courses: [
        {
          year: 0,
          name: "Certified Information Systems Auditor (CISA)",
          platform: "ISACA",
          duration: "Self-paced",
          url: "https://www.isaca.org/credentialing/cisa",
        },
        {
          year: 3,
          name: "Certified Information Security Manager (CISM)",
          platform: "ISACA",
          duration: "Self-paced",
          url: "https://www.isaca.org/credentialing/cism",
        },
        {
          year: 6,
          name: "Certified Data Privacy Solutions Engineer (CDPSE)",
          platform: "ISACA",
          duration: "Self-paced",
          url: "https://www.isaca.org/credentialing/cdpse",
        },
      ],
    },
    "data-analysis": {
      title: "Data Analysis",
      description: "Extracts and analyzes data to provide actionable insights.",
      startSalary: 70000,
      endSalary: 190000,
      growthRate: 7.8,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "SQL & Data Wrangling", level: "Beginner" },
        { year: 2, skill: "Dashboarding (Tableau/Power BI)", level: "Intermediate" },
        { year: 5, skill: "Statistical Analysis with Python/R", level: "Advanced" },
        { year: 9, skill: "Product/Business Analytics", level: "Expert" },
        { year: 16, skill: "Analytics Team Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Data Analyst", salary: 70000 },
        { year: 4, title: "Senior Data Analyst", salary: 105000 },
        { year: 9, title: "Business Intelligence Manager", salary: 140000 },
        { year: 16, title: "Director of Analytics", salary: 170000 },
        { year: 24, title: "Head of Data & Analytics", salary: 190000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google Data Analytics Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        },
        {
          year: 2,
          name: "Microsoft Power BI Data Analyst Certificate",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst",
        },
        {
          year: 5,
          name: "IBM Data Science Professional Certificate",
          platform: "Coursera",
          duration: "11 months",
          url: "https://www.coursera.org/professional-certificates/ibm-data-science",
        },
      ],
    },
    "machine-learning": {
      title: "Machine Learning Engineer",
      description: "Designs and deploys machine learning models and systems.",
      startSalary: 125000,
      endSalary: 340000,
      growthRate: 10.0,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 14,
      skills: [
        { year: 0, skill: "ML Fundamentals & Python", level: "Beginner" },
        { year: 2, skill: "Deep Learning (PyTorch/TensorFlow)", level: "Intermediate" },
        { year: 5, skill: "MLOps & Model Deployment", level: "Advanced" },
        { year: 9, skill: "Specialized ML (NLP/CV)", level: "Expert" },
        { year: 14, skill: "AI Research & Strategy", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "ML Engineer", salary: 125000 },
        { year: 4, title: "Senior ML Engineer", salary: 180000 },
        { year: 8, title: "ML Research Scientist", salary: 230000 },
        { year: 14, title: "Principal AI Scientist", salary: 290000 },
        { year: 21, title: "Director of Machine Learning", salary: 340000 },
      ],
      courses: [
        {
          year: 0,
          name: "Machine Learning Specialization",
          platform: "Coursera",
          duration: "3 months",
          url: "https://www.coursera.org/specializations/machine-learning-introduction",
        },
        {
          year: 2,
          name: "Deep Learning Specialization",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/deep-learning",
        },
        {
          year: 5,
          name: "Machine Learning Engineering for Production (MLOps)",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops",
        },
      ],
    },
    "data-engineering": {
      title: "Data Engineer",
      description: "Builds and maintains scalable data pipelines and infrastructure.",
      startSalary: 115000,
      endSalary: 300000,
      growthRate: 9.5,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "SQL & Python for Data", level: "Beginner" },
        { year: 2, skill: "ETL/ELT Pipelines & Data Warehousing", level: "Intermediate" },
        { year: 5, skill: "Big Data Technologies (Spark, Kafka)", level: "Advanced" },
        { year: 9, skill: "Cloud Data Architecture (AWS/GCP)", level: "Expert" },
        { year: 15, skill: "Data Governance & Strategy", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Data Engineer", salary: 115000 },
        { year: 4, title: "Senior Data Engineer", salary: 165000 },
        { year: 8, title: "Data Architect", salary: 210000 },
        { year: 15, title: "Principal Data Engineer", salary: 260000 },
        { year: 22, title: "Director of Data Engineering", salary: 300000 },
      ],
      courses: [
        {
          year: 0,
          name: "IBM Data Engineering Professional Certificate",
          platform: "Coursera",
          duration: "13 months",
          url: "https://www.coursera.org/professional-certificates/ibm-data-engineer",
        },
        {
          year: 2,
          name: "Databricks Certified Data Engineer Associate",
          platform: "Databricks",
          duration: "Self-paced",
          url: "https://www.databricks.com/learn/certification/data-engineer-associate",
        },
        {
          year: 5,
          name: "Google Professional Data Engineer Certification",
          platform: "Google Cloud",
          duration: "Self-paced",
          url: "https://cloud.google.com/learn/certification/data-engineer",
        },
      ],
    },
    "business-intelligence": {
      title: "Business Intelligence Developer",
      description: "Creates dashboards and reports to help businesses make data-driven decisions.",
      startSalary: 80000,
      endSalary: 200000,
      growthRate: 7.9,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "BI Tools (Tableau/Power BI)", level: "Beginner" },
        { year: 2, skill: "Advanced SQL & Data Modeling", level: "Intermediate" },
        { year: 5, skill: "ETL Processes & Data Warehousing", level: "Advanced" },
        { year: 9, skill: "BI Strategy & Architecture", level: "Expert" },
        { year: 16, skill: "Analytics Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "BI Analyst", salary: 80000 },
        { year: 4, title: "BI Developer", salary: 115000 },
        { year: 9, title: "Senior BI Developer/Architect", salary: 150000 },
        { year: 16, title: "BI Manager", salary: 180000 },
        { year: 24, title: "Director of Business Intelligence", salary: 200000 },
      ],
      courses: [
        {
          year: 0,
          name: "Microsoft Power BI Data Analyst Certificate",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst",
        },
        {
          year: 2,
          name: "Tableau Business Intelligence Analyst Certificate",
          platform: "Coursera",
          duration: "8 months",
          url: "https://www.coursera.org/professional-certificates/tableau-business-intelligence-analyst",
        },
        {
          year: 5,
          name: "Data Warehousing for Business Intelligence",
          platform: "Coursera",
          duration: "4 months",
          url: "https://www.coursera.org/specializations/data-warehousing-business-intelligence",
        },
      ],
    },
    "brand-design": {
      title: "Brand Designer",
      description: "Creates the visual identity and strategy for brands.",
      startSalary: 60000,
      endSalary: 170000,
      growthRate: 7.0,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 18,
      skills: [
        { year: 0, skill: "Graphic Design Fundamentals", level: "Beginner" },
        { year: 3, skill: "Brand Strategy & Identity Systems", level: "Intermediate" },
        { year: 6, skill: "Packaging & Environmental Design", level: "Advanced" },
        { year: 10, skill: "Creative Direction", level: "Expert" },
        { year: 18, skill: "Design Agency Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Junior Brand Designer", salary: 60000 },
        { year: 4, title: "Brand Designer", salary: 85000 },
        { year: 8, title: "Senior Brand Designer", salary: 110000 },
        { year: 12, title: "Art Director", salary: 140000 },
        { year: 18, title: "Creative Director", salary: 170000 },
      ],
      courses: [
        {
          year: 0,
          name: "Graphic Design Specialization",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/specializations/graphic-design",
        },
        {
          year: 3,
          name: "Brand Management: Aligning Business, Brand and Behaviour",
          platform: "Coursera",
          duration: "5 weeks",
          url: "https://www.coursera.org/learn/brand-management",
        },
      ],
    },
    illustration: {
      title: "Illustrator",
      description: "Creates original artwork for various media.",
      startSalary: 50000,
      endSalary: 150000,
      growthRate: 6.5,
      yearsToSenior: 6,
      yearsToLead: 12,
      yearsToExecutive: 20,
      skills: [
        { year: 0, skill: "Drawing & Digital Painting", level: "Beginner" },
        { year: 3, skill: "Conceptual Art & Character Design", level: "Intermediate" },
        { year: 7, skill: "Advanced Illustration Techniques", level: "Advanced" },
        { year: 12, skill: "Art Direction for Illustration", level: "Expert" },
        { year: 20, skill: "Running a Creative Business", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Junior Illustrator", salary: 50000 },
        { year: 5, title: "Illustrator / Concept Artist", salary: 75000 },
        { year: 10, title: "Senior Illustrator", salary: 100000 },
        { year: 15, title: "Lead Illustrator / Art Director", salary: 125000 },
        { year: 22, title: "Freelance / Studio Owner", salary: 150000 },
      ],
      courses: [
        {
          year: 0,
          name: "Learn to Draw: Daily Practices",
          platform: "Udemy",
          duration: "Self-paced",
          url: "https://www.udemy.com/course/learn-to-draw-daily-practices-to-improve-your-drawing-skills/",
        },
        {
          year: 3,
          name: "Character Art School: Complete Character Drawing",
          platform: "Udemy",
          duration: "Self-paced",
          url: "https://www.udemy.com/course/character-art-school-complete-character-drawing-course/",
        },
      ],
    },
    "industrial-design": {
      title: "Industrial Designer",
      description: "Designs and develops physical products for manufacturing.",
      startSalary: 65000,
      endSalary: 180000,
      growthRate: 6.8,
      yearsToSenior: 5,
      yearsToLead: 11,
      yearsToExecutive: 19,
      skills: [
        { year: 0, skill: "Sketching & CAD (SolidWorks/Rhino)", level: "Beginner" },
        { year: 3, skill: "Prototyping & Materials Science", level: "Intermediate" },
        { year: 6, skill: "Human Factors & Ergonomics", level: "Advanced" },
        { year: 11, skill: "Design for Manufacturing (DFM)", level: "Expert" },
        { year: 19, skill: "Design Leadership & Strategy", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Industrial Designer", salary: 65000 },
        { year: 5, title: "Senior Industrial Designer", salary: 95000 },
        { year: 11, title: "Lead Product Designer (Hardware)", salary: 130000 },
        { year: 19, title: "Design Director", salary: 160000 },
        { year: 28, title: "Head of Industrial Design", salary: 180000 },
      ],
      courses: [
        {
          year: 0,
          name: "Product Design, Sketching, and Rendering",
          platform: "Coursera",
          duration: "4 weeks",
          url: "https://www.coursera.org/learn/product-design-sketching-rendering",
        },
        {
          year: 3,
          name: "3D Printing and Additive Manufacturing",
          platform: "Coursera",
          duration: "4 weeks",
          url: "https://www.coursera.org/specializations/3d-printing",
        },
      ],
    },
    "content-marketing": {
      title: "Content Marketing Manager",
      description: "Creates and executes content strategies to attract and engage audiences.",
      startSalary: 60000,
      endSalary: 160000,
      growthRate: 7.5,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Copywriting & SEO Fundamentals", level: "Beginner" },
        { year: 2, skill: "Content Strategy & Calendar Management", level: "Intermediate" },
        { year: 5, skill: "Content Analytics & Performance", level: "Advanced" },
        { year: 9, skill: "Multi-channel Content Distribution", level: "Expert" },
        { year: 16, skill: "Marketing Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Content Coordinator", salary: 60000 },
        { year: 4, title: "Content Marketing Manager", salary: 90000 },
        { year: 9, title: "Senior Content Strategist", salary: 120000 },
        { year: 16, title: "Director of Content", salary: 145000 },
        { year: 24, title: "VP of Marketing", salary: 160000 },
      ],
      courses: [
        {
          year: 0,
          name: "Content Marketing Certification",
          platform: "HubSpot",
          duration: "Self-paced",
          url: "https://academy.hubspot.com/courses/content-marketing",
        },
        {
          year: 2,
          name: "SEO Specialization",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/specializations/seo",
        },
      ],
    },
    "social-media-marketing": {
      title: "Social Media Manager",
      description: "Manages a brand's presence and community on social platforms.",
      startSalary: 55000,
      endSalary: 150000,
      growthRate: 7.2,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 17,
      skills: [
        { year: 0, skill: "Platform Management & Content Creation", level: "Beginner" },
        { year: 2, skill: "Community Management & Engagement", level: "Intermediate" },
        { year: 5, skill: "Social Media Analytics & Reporting", level: "Advanced" },
        { year: 9, skill: "Paid Social & Influencer Marketing", level: "Expert" },
        { year: 17, skill: "Audience Growth Strategy", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Social Media Coordinator", salary: 55000 },
        { year: 4, title: "Social Media Manager", salary: 80000 },
        { year: 9, title: "Senior Social/Community Manager", salary: 105000 },
        { year: 17, title: "Director of Social Media", salary: 130000 },
        { year: 25, title: "Head of Audience", salary: 150000 },
      ],
      courses: [
        {
          year: 0,
          name: "Meta Social Media Marketing Certificate",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/professional-certificates/facebook-social-media-marketing",
        },
        {
          year: 2,
          name: "Social Media Marketing Specialization",
          platform: "Coursera",
          duration: "7 months",
          url: "https://www.coursera.org/specializations/social-media-marketing",
        },
      ],
    },
    "paid-advertising": {
      title: "Paid Advertising Specialist",
      description: "Manages and optimizes paid media campaigns (PPC, Social Ads).",
      startSalary: 65000,
      endSalary: 180000,
      growthRate: 8.0,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "Google & Meta Ads Platforms", level: "Beginner" },
        { year: 2, skill: "A/B Testing & Bid Management", level: "Intermediate" },
        { year: 5, skill: "Conversion Rate Optimization (CRO)", level: "Advanced" },
        { year: 8, skill: "Performance Marketing Strategy", level: "Expert" },
        { year: 15, skill: "Growth Marketing Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "PPC Specialist", salary: 65000 },
        { year: 4, title: "Performance Marketing Manager", salary: 100000 },
        { year: 8, title: "Senior Growth Manager", salary: 135000 },
        { year: 15, title: "Director of Growth", salary: 165000 },
        { year: 23, title: "VP of Performance Marketing", salary: 180000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google Ads Certifications",
          platform: "Google",
          duration: "Self-paced",
          url: "https://skillshop.exceedlms.com/student/catalog/list?category_ids=2844-google-ads-certifications",
        },
        {
          year: 2,
          name: "Meta Certified Marketing Science Professional",
          platform: "Meta",
          duration: "Self-paced",
          url: "https://www.facebook.com/business/learn/certification/exams/400-101-exam",
        },
      ],
    },
    "seo-specialist": {
      title: "SEO Specialist",
      description: "Improves a website's visibility on search engines.",
      startSalary: 60000,
      endSalary: 170000,
      growthRate: 7.8,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Keyword Research & On-Page SEO", level: "Beginner" },
        { year: 2, skill: "Technical SEO & Link Building", level: "Intermediate" },
        { year: 5, skill: "SEO Analytics & Reporting", level: "Advanced" },
        { year: 9, skill: "Advanced SEO Strategy", level: "Expert" },
        { year: 16, skill: "Leadership in Organic Growth", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "SEO Specialist", salary: 60000 },
        { year: 4, title: "SEO Manager", salary: 95000 },
        { year: 9, title: "Senior SEO Strategist", salary: 125000 },
        { year: 16, title: "Director of SEO", salary: 150000 },
        { year: 24, title: "Head of Organic Growth", salary: 170000 },
      ],
      courses: [
        {
          year: 0,
          name: "SEO Specialization",
          platform: "Coursera",
          duration: "5 months",
          url: "https://www.coursera.org/specializations/seo",
        },
        {
          year: 2,
          name: "HubSpot SEO Certification Course",
          platform: "HubSpot",
          duration: "Self-paced",
          url: "https://academy.hubspot.com/courses/seo-training",
        },
      ],
    },
    "traditional-pm": {
      title: "Traditional Project Manager",
      description: "Manages projects using linear, sequential methodologies like Waterfall.",
      startSalary: 75000,
      endSalary: 180000,
      growthRate: 6.8,
      yearsToSenior: 5,
      yearsToLead: 10,
      yearsToExecutive: 18,
      skills: [
        { year: 0, skill: "Waterfall & Scope Management", level: "Beginner" },
        { year: 3, skill: "Budgeting & Risk Management (PMP)", level: "Intermediate" },
        { year: 6, skill: "Program Management", level: "Advanced" },
        { year: 10, skill: "Portfolio Management", level: "Expert" },
        { year: 18, skill: "PMO Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Project Coordinator", salary: 75000 },
        { year: 5, title: "Project Manager (PMP)", salary: 110000 },
        { year: 10, title: "Senior PM / Program Manager", salary: 140000 },
        { year: 18, title: "Director of PMO", salary: 165000 },
        { year: 26, title: "VP of Operations", salary: 180000 },
      ],
      courses: [
        {
          year: 0,
          name: "Certified Associate in Project Management (CAPM)",
          platform: "PMI",
          duration: "Self-paced",
          url: "https://www.pmi.org/certifications/certified-associate-capm",
        },
        {
          year: 3,
          name: "Project Management Professional (PMP) Certification",
          platform: "PMI",
          duration: "Self-paced",
          url: "https://www.pmi.org/certifications/project-management-pmp",
        },
      ],
    },
    "consumer-pm": {
      title: "Consumer Product Manager",
      description: "Builds and manages products for the end-user market (B2C).",
      startSalary: 110000,
      endSalary: 280000,
      growthRate: 8.8,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 14,
      skills: [
        { year: 0, skill: "User Empathy & Research", level: "Beginner" },
        { year: 2, skill: "Product-Led Growth (PLG) & A/B Testing", level: "Intermediate" },
        { year: 5, skill: "Market Analysis & Product Strategy", level: "Advanced" },
        { year: 8, skill: "Group Product Leadership", level: "Expert" },
        { year: 14, skill: "Executive Product Vision", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Associate Product Manager", salary: 110000 },
        { year: 4, title: "Product Manager", salary: 155000 },
        { year: 8, title: "Group Product Manager", salary: 200000 },
        { year: 14, title: "Director of Product", salary: 240000 },
        { year: 21, title: "VP of Product", salary: 280000 },
      ],
      courses: [
        {
          year: 0,
          name: "Product School Certifications",
          platform: "Product School",
          duration: "8 weeks",
          url: "https://productschool.com/product-management-certification",
        },
        {
          year: 2,
          name: "Growth Series Program",
          platform: "Reforge",
          duration: "6 weeks",
          url: "https://www.reforge.com/programs/growth-series",
        },
      ],
    },
    "ux-research": {
      title: "UX Researcher",
      description: "Uncovers user needs and behaviors to inform design decisions.",
      startSalary: 90000,
      endSalary: 220000,
      growthRate: 8.2,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Qualitative Research (Interviews, Usability Testing)", level: "Beginner" },
        { year: 2, skill: "Survey Design & Quantitative Analysis", level: "Intermediate" },
        { year: 5, skill: "Mixed-Methods Research", level: "Advanced" },
        { year: 9, skill: "Research Strategy & Operations", level: "Expert" },
        { year: 16, skill: "Research Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "UX Researcher", salary: 90000 },
        { year: 4, title: "Senior UX Researcher", salary: 130000 },
        { year: 9, title: "Lead UX Researcher", salary: 165000 },
        { year: 16, title: "Research Manager", salary: 195000 },
        { year: 24, title: "Director of Research", salary: 220000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google UX Design Professional Certificate",
          platform: "Coursera",
          duration: "6 months",
          url: "https://www.coursera.org/professional-certificates/google-ux-design",
        },
        {
          year: 2,
          name: "User Research – Methods and Best Practices",
          platform: "Interaction Design Foundation",
          duration: "Self-paced",
          url: "https://www.interaction-design.org/courses/user-research-methods-and-best-practices",
        },
      ],
    },
    "ux-analytics": {
      title: "UX Analyst",
      description: "Uses quantitative data to understand and improve user experience.",
      startSalary: 95000,
      endSalary: 230000,
      growthRate: 8.4,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Web Analytics (Google Analytics)", level: "Beginner" },
        { year: 2, skill: "A/B Testing & Experimentation", level: "Intermediate" },
        { year: 5, skill: "SQL for UX Data", level: "Advanced" },
        { year: 9, skill: "Product Analytics Strategy", level: "Expert" },
        { year: 16, skill: "Data-Driven Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "UX/Product Analyst", salary: 95000 },
        { year: 4, title: "Senior UX Analyst", salary: 135000 },
        { year: 9, title: "Lead Analyst", salary: 170000 },
        { year: 16, title: "Manager, Product Analytics", salary: 200000 },
        { year: 24, title: "Director of Product Analytics", salary: 230000 },
      ],
      courses: [
        {
          year: 0,
          name: "Google Analytics Certification",
          platform: "Google",
          duration: "Self-paced",
          url: "https://skillshop.exceedlms.com/student/path/2940-google-analytics-certification",
        },
        {
          year: 2,
          name: "Advanced A/B Testing Course",
          platform: "CXL",
          duration: "Self-paced",
          url: "https://cxl.com/courses/ab-testing-mastery/",
        },
      ],
    },
    "frontend-development": {
      title: "Frontend Developer",
      description: "Builds the user-facing part of websites and applications.",
      startSalary: 95000,
      endSalary: 260000,
      growthRate: 9.1,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "HTML, CSS, JS & React/Vue", level: "Beginner" },
        { year: 2, skill: "TypeScript & State Management", level: "Intermediate" },
        { year: 5, skill: "Web Performance & Accessibility", level: "Advanced" },
        { year: 8, skill: "Frontend Architecture & Design Systems", level: "Expert" },
        { year: 15, skill: "Technical Leadership", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Frontend Developer", salary: 95000 },
        { year: 4, title: "Senior Frontend Developer", salary: 140000 },
        { year: 8, title: "Frontend Architect / Lead", salary: 185000 },
        { year: 15, title: "Principal Frontend Engineer", salary: 225000 },
        { year: 23, title: "Director of Frontend Engineering", salary: 260000 },
      ],
      courses: [
        {
          year: 0,
          name: "Meta Front-End Developer Certificate",
          platform: "Coursera",
          duration: "7 months",
          url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        },
        {
          year: 2,
          name: "The Complete JavaScript Course",
          platform: "Udemy",
          duration: "Self-paced",
          url: "https://www.udemy.com/course/the-complete-javascript-course/",
        },
      ],
    },
    "backend-development": {
      title: "Backend Developer",
      description: "Builds the server-side logic, databases, and APIs.",
      startSalary: 105000,
      endSalary: 280000,
      growthRate: 9.3,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "Node.js/Python/Go & Databases (SQL/NoSQL)", level: "Beginner" },
        { year: 2, skill: "API Design (REST/GraphQL)", level: "Intermediate" },
        { year: 5, skill: "Cloud Services & DevOps", level: "Advanced" },
        { year: 8, skill: "System Architecture & Scalability", level: "Expert" },
        { year: 15, skill: "Distinguished Engineer", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Backend Developer", salary: 105000 },
        { year: 4, title: "Senior Backend Developer", salary: 155000 },
        { year: 8, title: "Backend Architect / Lead", salary: 200000 },
        { year: 15, title: "Principal Backend Engineer", salary: 240000 },
        { year: 23, title: "Director of Backend Engineering", salary: 280000 },
      ],
      courses: [
        {
          year: 0,
          name: "Meta Back-End Developer Certificate",
          platform: "Coursera",
          duration: "7 months",
          url: "https://www.coursera.org/professional-certificates/meta-back-end-developer",
        },
        {
          year: 2,
          name: "AWS Certified Developer - Associate",
          platform: "AWS",
          duration: "Self-paced",
          url: "https://aws.amazon.com/certification/certified-developer-associate/",
        },
      ],
    },
    "full-stack-development": {
      title: "Full Stack Developer",
      description: "Works on both the frontend and backend of an application.",
      startSalary: 100000,
      endSalary: 270000,
      growthRate: 9.2,
      yearsToSenior: 4,
      yearsToLead: 8,
      yearsToExecutive: 15,
      skills: [
        { year: 0, skill: "MERN/MEAN Stack", level: "Beginner" },
        { year: 2, skill: "DevOps & CI/CD", level: "Intermediate" },
        { year: 5, skill: "Full Stack Architecture", level: "Advanced" },
        { year: 8, skill: "Technical Leadership", level: "Expert" },
        { year: 15, skill: "Solution Architecture", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "Full Stack Developer", salary: 100000 },
        { year: 4, title: "Senior Full Stack Developer", salary: 150000 },
        { year: 8, title: "Tech Lead", salary: 195000 },
        { year: 15, title: "Solution Architect", salary: 235000 },
        { year: 23, title: "CTO (Startup) / Principal Engineer", salary: 270000 },
      ],
      courses: [
        {
          year: 0,
          name: "IBM Full Stack Software Developer Certificate",
          platform: "Coursera",
          duration: "10 months",
          url: "https://www.coursera.org/professional-certificates/ibm-full-stack-software-developer",
        },
        {
          year: 2,
          name: "Docker and Kubernetes: The Complete Guide",
          platform: "Udemy",
          duration: "Self-paced",
          url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
        },
      ],
    },
    "ui-ux-development": {
      title: "UI/UX Developer",
      description: "Bridges the gap between design and development.",
      startSalary: 90000,
      endSalary: 240000,
      growthRate: 8.5,
      yearsToSenior: 4,
      yearsToLead: 9,
      yearsToExecutive: 16,
      skills: [
        { year: 0, skill: "Advanced CSS & Animations", level: "Beginner" },
        { year: 2, skill: "Design System Implementation", level: "Intermediate" },
        { year: 5, skill: "Web Accessibility (WCAG)", level: "Advanced" },
        { year: 9, skill: "Creative Technology Leadership", level: "Expert" },
        { year: 16, skill: "Head of Design Technology", level: "Expert" },
      ],
      milestones: [
        { year: 0, title: "UI/UX Developer", salary: 90000 },
        { year: 4, title: "Senior UI/UX Developer", salary: 130000 },
        { year: 9, title: "Design Technologist", salary: 170000 },
        { year: 16, title: "Lead Creative Technologist", salary: 205000 },
        { year: 24, title: "Director of Design Technology", salary: 240000 },
      ],
      courses: [
        {
          year: 0,
          name: "Advanced CSS and Sass",
          platform: "Udemy",
          duration: "Self-paced",
          url: "https://www.udemy.com/course/advanced-css-and-sass/",
        },
        {
          year: 2,
          name: "Design Systems with Figma",
          platform: "Udemy",
          duration: "Self-paced",
          url: "https://www.udemy.com/course/design-systems-with-figma/",
        },
      ],
    },
  }

function CareerProjectionContent() {
  const searchParams = useSearchParams()
  const initialCareerId = searchParams.get("course") || "product-manager"

  const [selectedCareer, setSelectedCareer] = useState(initialCareerId)
  const data = careerData[selectedCareer]

  useEffect(() => {
    const careerId = searchParams.get("course")
    if (careerId && careerData[careerId]) {
      setSelectedCareer(careerId)
    }
  }, [searchParams])

  if (!data) {
    return <div className="p-8 text-center">Career path not found. Please select a valid career.</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">10-Year Career Projection</h1>
              <p className="text-muted-foreground mt-1">
                A personalized roadmap for a <span className="font-semibold text-primary">{data.title}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={selectedCareer} onValueChange={setSelectedCareer}>
                <SelectTrigger className="w-full sm:w-[280px]">
                  <SelectValue placeholder="Select a career path" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(careerData).map(([id, { title }]) => (
                    <SelectItem key={id} value={id}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href="/results">
                <Button variant="outline" className="bg-transparent">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Career Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Starting Salary</p>
                <p className="text-2xl font-bold text-foreground">${(data.startSalary / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Peak Salary (60 years)</p>
                <p className="text-2xl font-bold text-foreground">${(data.endSalary / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Annual Growth</p>
                <p className="text-2xl font-bold text-foreground">{data.growthRate}%</p>
              </div>
              <Award className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">$9.2M</p>
              </div>
              <Target className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </div>

        {/* Career Milestones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Career Milestones</h2>
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

            {data.milestones.map((milestone: any, idx: number) => (
              <div key={idx} className="relative pl-10 pb-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 top-1 h-4 w-4 rounded-full bg-primary border-4 border-background -translate-x-1/2"></div>
                
                <p className="text-sm font-semibold text-primary mb-1">Year {milestone.year}</p>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expected salary: ${(milestone.salary / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Development */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Skills Development Timeline</h2>
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

            {data.skills.map((skill: any, idx: number) => (
              <div key={idx} className="relative pl-10 pb-8">
                {/* Timeline Dot */}
                <div className="absolute left-8 top-1 h-4 w-4 rounded-full bg-primary border-4 border-background -translate-x-1/2"></div>
                
                <p className="text-sm font-semibold text-primary mb-1">Year {skill.year}</p>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{skill.skill}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        skill.level === "Beginner" ? "bg-blue-500/10 text-blue-500" :
                        skill.level === "Intermediate" ? "bg-green-500/10 text-green-500" :
                        skill.level === "Advanced" ? "bg-yellow-500/10 text-yellow-500" :
                        "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Learning Path</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.courses.map((course: any, idx: number) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Year {course.year}</p>
                    <h3 className="font-semibold text-foreground mt-1">{course.name}</h3>
                  </div>
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <p>{course.platform}</p>
                    <p>{course.duration}</p>
                  </div>
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      Enroll
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CareerProjectionPage() {
  return (
    // Wrap the component in Suspense because it uses useSearchParams
    <Suspense fallback={<div className="p-6">Loading career projection...</div>}>
      <CareerProjectionContent />
    </Suspense>
  )
}
