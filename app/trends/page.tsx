"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChartIcon, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"

type TrendData = {
  avgSalaryGrowth: string
  jobOpenings: string
  remoteRoles: string
  avgExperience: string
  salaryTrends: { year: string; salary: number }[]
  jobGrowth: { role:string; growth: number }[]
  remoteDistribution: { name: string; value: number }[]
  topSkills: { skill: string; demand: number }[]
  topCompanies: { company: string; careerUrl: string }[]
}

const trendsByCareer: Record<string, TrendData> = {
  default: {
    avgSalaryGrowth: "+18%",
    jobOpenings: "25.1K",
    remoteRoles: "42%",
    avgExperience: "4.8 yrs",
    salaryTrends: [
      { year: "2020", salary: 115 },
      { year: "2021", salary: 125 },
      { year: "2022", salary: 140 },
      { year: "2023", salary: 150 },
      { year: "2024", salary: 165 },
    ],
    jobGrowth: [
      { role: "Product Manager", growth: 23 },
      { role: "Data Scientist", growth: 31 },
      { role: "UX Designer", growth: 18 },
      { role: "ML Engineer", growth: 42 },
      { role: "DevOps", growth: 28 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 42 },
      { name: "Hybrid", value: 38 },
      { name: "On-site", value: 20 },
    ],
    topSkills: [
      { skill: "Product Strategy", demand: 92 },
      { skill: "Data Analysis", demand: 88 },
      { skill: "Leadership", demand: 85 },
      { skill: "Agile Methodologies", demand: 81 },
      { skill: "User Research", demand: 78 },
    ],
    topCompanies: [
      { company: "Google", careerUrl: "https://careers.google.com/" },
      { company: "Microsoft", careerUrl: "https://careers.microsoft.com/" },
      { company: "Amazon", careerUrl: "https://www.amazon.jobs/" },
      { company: "Meta", careerUrl: "https://www.metacareers.com/" },
      { company: "Stripe", careerUrl: "https://stripe.com/jobs" },
    ],
  },
  "software-developer": {
    avgSalaryGrowth: "+21%",
    jobOpenings: "32.5K",
    remoteRoles: "55%",
    avgExperience: "3.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 90 },
      { year: "2021", salary: 100 },
      { year: "2022", salary: 115 },
      { year: "2023", salary: 125 },
      { year: "2024", salary: 140 },
    ],
    jobGrowth: [
      { role: "Backend", growth: 25 },
      { role: "Frontend", growth: 22 },
      { role: "Full Stack", growth: 30 },
      { role: "Mobile", growth: 18 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 55 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Python/Node.js", demand: 95 },
      { skill: "React/Vue", demand: 91 },
      { skill: "AWS/GCP", demand: 88 },
      { skill: "Docker/Kubernetes", demand: 85 },
      { skill: "SQL/NoSQL", demand: 82 },
    ],
    topCompanies: [
      { company: "Netflix", careerUrl: "https://jobs.netflix.com/" },
      { company: "Amazon", careerUrl: "https://www.amazon.jobs/" },
      { company: "Salesforce", careerUrl: "https://www.salesforce.com/company/careers/" },
      { company: "Vercel", careerUrl: "https://vercel.com/careers" },
      { company: "Stripe", careerUrl: "https://stripe.com/jobs" },
    ],
  },
  "data-analytics": {
    avgSalaryGrowth: "+25%",
    jobOpenings: "28.9K",
    remoteRoles: "48%",
    avgExperience: "2.8 yrs",
    salaryTrends: [
      { year: "2020", salary: 75 },
      { year: "2021", salary: 85 },
      { year: "2022", salary: 95 },
      { year: "2023", salary: 105 },
      { year: "2024", salary: 115 },
    ],
    jobGrowth: [
      { role: "Data Analyst", growth: 28 },
      { role: "BI Analyst", growth: 25 },
      { role: "Product Analyst", growth: 32 },
      { role: "Marketing Analyst", growth: 22 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 48 },
      { name: "Hybrid", value: 42 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "SQL", demand: 98 },
      { skill: "Tableau/Power BI", demand: 95 },
      { skill: "Python/R", demand: 90 },
      { skill: "Statistics", demand: 85 },
      { skill: "Excel", demand: 80 },
    ],
    topCompanies: [
      { company: "Spotify", careerUrl: "https://www.lifeatspotify.com/jobs" },
      { company: "Meta", careerUrl: "https://www.metacareers.com/" },
      { company: "Uber", careerUrl: "https://www.uber.com/careers/" },
      { company: "Capital One", careerUrl: "https://www.capitalonecareers.com/" },
      { company: "TikTok", careerUrl: "https://careers.tiktok.com/" },
    ],
  },
  cybersecurity: {
    avgSalaryGrowth: "+30%",
    jobOpenings: "45.2K",
    remoteRoles: "40%",
    avgExperience: "4.1 yrs",
    salaryTrends: [
      { year: "2020", salary: 95 },
      { year: "2021", salary: 105 },
      { year: "2022", salary: 120 },
      { year: "2023", salary: 130 },
      { year: "2024", salary: 145 },
    ],
    jobGrowth: [
      { role: "Security Analyst", growth: 32 },
      { role: "Pen Tester", growth: 35 },
      { role: "Incident Responder", growth: 28 },
      { role: "GRC Analyst", growth: 25 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 40 },
      { name: "Hybrid", value: 45 },
      { name: "On-site", value: 15 },
    ],
    topSkills: [
      { skill: "Cloud Security", demand: 97 },
      { skill: "SIEM Tools", demand: 94 },
      { skill: "Threat Intelligence", demand: 90 },
      { skill: "Penetration Testing", demand: 88 },
      { skill: "Risk Management", demand: 85 },
    ],
    topCompanies: [
      { company: "Palo Alto Networks", careerUrl: "https://www.paloaltonetworks.com/company/careers" },
      { company: "CrowdStrike", careerUrl: "https://www.crowdstrike.com/careers/" },
      { company: "Mandiant (Google)", careerUrl: "https://careers.google.com/teams/mandiant/" },
      { company: "Microsoft", careerUrl: "https://careers.microsoft.com/" },
      { company: "Deloitte", careerUrl: "https://www2.deloitte.com/us/en/careers.html" },
    ],
  },
  "software-engineer": {
    avgSalaryGrowth: "+22%",
    jobOpenings: "38.6K",
    remoteRoles: "58%",
    avgExperience: "5.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 120 },
      { year: "2021", salary: 135 },
      { year: "2022", salary: 150 },
      { year: "2023", salary: 165 },
      { year: "2024", salary: 180 },
    ],
    jobGrowth: [
      { role: "Senior Engineer", growth: 28 },
      { role: "Staff Engineer", growth: 35 },
      { role: "Principal Engineer", growth: 30 },
      { role: "SRE", growth: 26 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 58 },
      { name: "Hybrid", value: 32 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "System Design", demand: 99 },
      { skill: "Distributed Systems", demand: 96 },
      { skill: "Scalability", demand: 92 },
      { skill: "Cloud Architecture", demand: 90 },
      { skill: "Go/Rust", demand: 85 },
    ],
    topCompanies: [
      { company: "Apple", careerUrl: "https://www.apple.com/careers/" },
      { company: "LinkedIn", careerUrl: "https://www.linkedin.com/company/linkedin/jobs/" },
      { company: "Cloudflare", careerUrl: "https://www.cloudflare.com/careers/" },
      { company: "Google", careerUrl: "https://careers.google.com/" },
      { company: "NVIDIA", careerUrl: "https://www.nvidia.com/en-us/careers/" },
    ],
  },
  "strategy-manager": {
    avgSalaryGrowth: "+15%",
    jobOpenings: "15.3K",
    remoteRoles: "30%",
    avgExperience: "6.2 yrs",
    salaryTrends: [
      { year: "2020", salary: 130 },
      { year: "2021", salary: 140 },
      { year: "2022", salary: 155 },
      { year: "2023", salary: 160 },
      { year: "2024", salary: 175 },
    ],
    jobGrowth: [
      { role: "Corp Strategy", growth: 18 },
      { role: "BizOps", growth: 22 },
      { role: "M&A", growth: 15 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 30 },
      { name: "Hybrid", value: 50 },
      { name: "On-site", value: 20 },
    ],
    topSkills: [
      { skill: "Market Analysis", demand: 95 },
      { skill: "Financial Modeling", demand: 92 },
      { skill: "Stakeholder Mgmt", demand: 90 },
    ],
    topCompanies: [
      { company: "McKinsey", careerUrl: "https://www.mckinsey.com/careers" },
      { company: "BCG", careerUrl: "https://careers.bcg.com/" },
      { company: "Bain", careerUrl: "https://www.bain.com/careers/" },
    ],
  },
  "project-manager": {
    avgSalaryGrowth: "+12%",
    jobOpenings: "40.1K",
    remoteRoles: "45%",
    avgExperience: "5.1 yrs",
    salaryTrends: [
      { year: "2020", salary: 90 },
      { year: "2021", salary: 98 },
      { year: "2022", salary: 105 },
      { year: "2023", salary: 112 },
      { year: "2024", salary: 120 },
    ],
    jobGrowth: [
      { role: "Technical PM", growth: 20 },
      { role: "Agile PM", growth: 25 },
      { role: "Program Manager", growth: 18 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 45 },
      { name: "Hybrid", value: 40 },
      { name: "On-site", value: 15 },
    ],
    topSkills: [
      { skill: "Agile/Scrum", demand: 96 },
      { skill: "Risk Management", demand: 91 },
      { skill: "Budgeting", demand: 88 },
    ],
    topCompanies: [
      { company: "Google", careerUrl: "https://careers.google.com/" },
      { company: "Atlassian", careerUrl: "https://www.atlassian.com/company/careers" },
      { company: "IBM", careerUrl: "https://www.ibm.com/careers/" },
    ],
  },
  "operations-manager": {
    avgSalaryGrowth: "+10%",
    jobOpenings: "35.7K",
    remoteRoles: "25%",
    avgExperience: "6.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 80 },
      { year: "2021", salary: 88 },
      { year: "2022", salary: 95 },
      { year: "2023", salary: 102 },
      { year: "2024", salary: 110 },
    ],
    jobGrowth: [
      { role: "Ops Manager", growth: 15 },
      { role: "Supply Chain", growth: 18 },
      { role: "Logistics", growth: 12 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 25 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 40 },
    ],
    topSkills: [
      { skill: "Process Improvement", demand: 94 },
      { skill: "Logistics", demand: 90 },
      { skill: "Team Leadership", demand: 87 },
    ],
    topCompanies: [
      { company: "Amazon", careerUrl: "https://www.amazon.jobs/" },
      { company: "Tesla", careerUrl: "https://www.tesla.com/careers" },
      { company: "FedEx", careerUrl: "https://careers.fedex.com/" },
    ],
  },
  "clinical-lead": {
    avgSalaryGrowth: "+14%",
    jobOpenings: "18.2K",
    remoteRoles: "15%",
    avgExperience: "7.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 95 },
      { year: "2021", salary: 102 },
      { year: "2022", salary: 110 },
      { year: "2023", salary: 118 },
      { year: "2024", salary: 125 },
    ],
    jobGrowth: [
      { role: "Clinical Lead", growth: 16 },
      { role: "Nurse Manager", growth: 14 },
      { role: "Research Manager", growth: 18 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 15 },
      { name: "Hybrid", value: 45 },
      { name: "On-site", value: 40 },
    ],
    topSkills: [
      { skill: "Patient Care", demand: 98 },
      { skill: "Team Leadership", demand: 95 },
      { skill: "Clinical Trials", demand: 90 },
    ],
    topCompanies: [
      { company: "Pfizer", careerUrl: "https://careers.pfizer.com/" },
      { company: "HCA Healthcare", careerUrl: "https://careers.hcahealthcare.com/" },
      { company: "Johnson & Johnson", careerUrl: "https://www.careers.jnj.com/" },
    ],
  },
  "visual-designer": {
    avgSalaryGrowth: "+16%",
    jobOpenings: "22.4K",
    remoteRoles: "60%",
    avgExperience: "3.8 yrs",
    salaryTrends: [
      { year: "2020", salary: 70 },
      { year: "2021", salary: 78 },
      { year: "2022", salary: 85 },
      { year: "2023", salary: 92 },
      { year: "2024", salary: 100 },
    ],
    jobGrowth: [
      { role: "Visual Designer", growth: 20 },
      { role: "UI Designer", growth: 25 },
      { role: "Graphic Designer", growth: 15 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 60 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Figma/Sketch", demand: 97 },
      { skill: "Typography", demand: 94 },
      { skill: "Color Theory", demand: 91 },
    ],
    topCompanies: [
      { company: "Canva", careerUrl: "https://www.canva.com/careers/" },
      { company: "Mailchimp", careerUrl: "https://mailchimp.com/jobs/" },
      { company: "Pentagram", careerUrl: "https://www.pentagram.com/jobs" },
    ],
  },
  "healthcare-educator": {
    avgSalaryGrowth: "+11%",
    jobOpenings: "12.1K",
    remoteRoles: "35%",
    avgExperience: "5.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 75 },
      { year: "2021", salary: 80 },
      { year: "2022", salary: 86 },
      { year: "2023", salary: 92 },
      { year: "2024", salary: 98 },
    ],
    jobGrowth: [
      { role: "Clinical Educator", growth: 14 },
      { role: "Nurse Educator", growth: 12 },
      { role: "Patient Educator", growth: 15 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 35 },
      { name: "Hybrid", value: 45 },
      { name: "On-site", value: 20 },
    ],
    topSkills: [
      { skill: "Curriculum Design", demand: 95 },
      { skill: "Clinical Training", demand: 92 },
      { skill: "Public Speaking", demand: 88 },
    ],
    topCompanies: [
      { company: "Mayo Clinic", careerUrl: "https://jobs.mayoclinic.org/" },
      { company: "Cleveland Clinic", careerUrl: "https://my.clevelandclinic.org/careers" },
      { company: "Kaiser Permanente", careerUrl: "https://www.kaiserpermanentejobs.org/" },
    ],
  },
  "systems-engineer": {
    avgSalaryGrowth: "+19%",
    jobOpenings: "29.8K",
    remoteRoles: "50%",
    avgExperience: "4.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 100 },
      { year: "2021", salary: 110 },
      { year: "2022", salary: 125 },
      { year: "2023", salary: 135 },
      { year: "2024", salary: 150 },
    ],
    jobGrowth: [
      { role: "Systems Engineer", growth: 22 },
      { role: "Cloud Engineer", growth: 28 },
      { role: "SRE", growth: 25 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 50 },
      { name: "Hybrid", value: 40 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Cloud (AWS/Azure/GCP)", demand: 98 },
      { skill: "Linux/Unix", demand: 95 },
      { skill: "Terraform/Ansible", demand: 92 },
    ],
    topCompanies: [
      { company: "Lockheed Martin", careerUrl: "https://www.lockheedmartinjobs.com/" },
      { company: "AWS", careerUrl: "https://www.amazon.jobs/en/teams/aws" },
      { company: "Google", careerUrl: "https://careers.google.com/" },
    ],
  },
  "mechanical-engineer": {
    avgSalaryGrowth: "+9%",
    jobOpenings: "19.5K",
    remoteRoles: "10%",
    avgExperience: "4.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 80 },
      { year: "2021", salary: 85 },
      { year: "2022", salary: 92 },
      { year: "2023", salary: 98 },
      { year: "2024", salary: 105 },
    ],
    jobGrowth: [
      { role: "Mechanical Eng", growth: 12 },
      { role: "Civil Eng", growth: 10 },
      { role: "Structural Eng", growth: 11 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 10 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 60 },
    ],
    topSkills: [
      { skill: "CAD (SolidWorks)", demand: 97 },
      { skill: "FEA Analysis", demand: 92 },
      { skill: "Thermodynamics", demand: 88 },
    ],
    topCompanies: [
      { company: "Boston Dynamics", careerUrl: "https://www.bostondynamics.com/careers" },
      { company: "AECOM", careerUrl: "https://aecom.com/careers/" },
      { company: "Arup", careerUrl: "https://careers.arup.com/" },
    ],
  },
  "digital-marketing": {
    avgSalaryGrowth: "+17%",
    jobOpenings: "33.1K",
    remoteRoles: "65%",
    avgExperience: "3.2 yrs",
    salaryTrends: [
      { year: "2020", salary: 65 },
      { year: "2021", salary: 72 },
      { year: "2022", salary: 80 },
      { year: "2023", salary: 88 },
      { year: "2024", salary: 95 },
    ],
    jobGrowth: [
      { role: "Digital Mktg Mgr", growth: 22 },
      { role: "SEO Manager", growth: 25 },
      { role: "Social Media Mgr", growth: 20 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 65 },
      { name: "Hybrid", value: 25 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "SEO/SEM", demand: 98 },
      { skill: "Content Marketing", demand: 95 },
      { skill: "Google Analytics", demand: 92 },
    ],
    topCompanies: [
      { company: "HubSpot", careerUrl: "https://www.hubspot.com/careers" },
      { company: "Shopify", careerUrl: "https://www.shopify.com/careers" },
      { company: "Buffer", careerUrl: "https://buffer.com/journey" },
    ],
  },
  "brand-manager": {
    avgSalaryGrowth: "+13%",
    jobOpenings: "14.8K",
    remoteRoles: "40%",
    avgExperience: "5.8 yrs",
    salaryTrends: [
      { year: "2020", salary: 95 },
      { year: "2021", salary: 105 },
      { year: "2022", salary: 115 },
      { year: "2023", salary: 125 },
      { year: "2024", salary: 135 },
    ],
    jobGrowth: [
      { role: "Brand Manager", growth: 15 },
      { role: "Product Mktg Mgr", growth: 18 },
      { role: "Brand Strategist", growth: 16 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 40 },
      { name: "Hybrid", value: 45 },
      { name: "On-site", value: 15 },
    ],
    topSkills: [
      { skill: "Brand Strategy", demand: 97 },
      { skill: "Market Research", demand: 94 },
      { skill: "Campaign Management", demand: 90 },
    ],
    topCompanies: [
      { company: "Procter & Gamble", careerUrl: "https://www.pgcareers.com/" },
      { company: "Salesforce", careerUrl: "https://www.salesforce.com/company/careers/" },
      { company: "Interbrand", careerUrl: "https://interbrand.com/careers/" },
    ],
  },
  "nlp-engineer": {
    avgSalaryGrowth: "+28%",
    jobOpenings: "12.5K",
    remoteRoles: "60%",
    avgExperience: "4.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 120 },
      { year: "2021", salary: 135 },
      { year: "2022", salary: 150 },
      { year: "2023", salary: 165 },
      { year: "2024", salary: 180 },
    ],
    jobGrowth: [
      { role: "NLP Scientist", growth: 30 },
      { role: "ML Engineer, NLP", growth: 28 },
      { role: "Conversational AI", growth: 25 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 60 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Transformers", demand: 99 },
      { skill: "PyTorch/TensorFlow", demand: 96 },
      { skill: "Hugging Face", demand: 92 },
    ],
    topCompanies: [
      { company: "Google AI", careerUrl: "https://ai.google/careers/" },
      { company: "Apple", careerUrl: "https://www.apple.com/careers/" },
      { company: "Amazon Alexa", careerUrl: "https://www.amazon.jobs/en/teams/alexa-ai" },
    ],
  },
  "cv-engineer": {
    avgSalaryGrowth: "+32%",
    jobOpenings: "10.2K",
    remoteRoles: "50%",
    avgExperience: "4.2 yrs",
    salaryTrends: [
      { year: "2020", salary: 125 },
      { year: "2021", salary: 140 },
      { year: "2022", salary: 155 },
      { year: "2023", salary: 170 },
      { year: "2024", salary: 190 },
    ],
    jobGrowth: [
      { role: "CV Engineer", growth: 35 },
      { role: "Perception Eng", growth: 32 },
      { role: "AR/VR Engineer", growth: 30 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 50 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 15 },
    ],
    topSkills: [
      { skill: "Deep Learning", demand: 98 },
      { skill: "OpenCV", demand: 95 },
      { skill: "Image Processing", demand: 91 },
    ],
    topCompanies: [
      { company: "Tesla", careerUrl: "https://www.tesla.com/careers" },
      { company: "Waymo", careerUrl: "https://waymo.com/careers/" },
      { company: "Meta Reality Labs", careerUrl: "https://www.metacareers.com/areas-of-work/reality-labs/" },
    ],
  },
  "rl-engineer": {
    avgSalaryGrowth: "+35%",
    jobOpenings: "8.9K",
    remoteRoles: "55%",
    avgExperience: "5.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 130 },
      { year: "2021", salary: 150 },
      { year: "2022", salary: 170 },
      { year: "2023", salary: 190 },
      { year: "2024", salary: 210 },
    ],
    jobGrowth: [
      { role: "RL Engineer", growth: 40 },
      { role: "RL Scientist", growth: 38 },
      { role: "Robotics AI Eng", growth: 35 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 55 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Reinforcement Learning", demand: 99 },
      { skill: "Robotics", demand: 94 },
      { skill: "Game Theory", demand: 90 },
    ],
    topCompanies: [
      { company: "DeepMind", careerUrl: "https://www.deepmind.com/careers" },
      { company: "NVIDIA", careerUrl: "https://www.nvidia.com/en-us/careers/" },
      { company: "Boston Dynamics", careerUrl: "https://www.bostondynamics.com/careers" },
    ],
  },
  "ai-ethics": {
    avgSalaryGrowth: "+25%",
    jobOpenings: "5.2K",
    remoteRoles: "65%",
    avgExperience: "5.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 110 },
      { year: "2021", salary: 125 },
      { year: "2022", salary: 140 },
      { year: "2023", salary: 155 },
      { year: "2024", salary: 170 },
    ],
    jobGrowth: [
      { role: "AI Ethicist", growth: 30 },
      { role: "Policy Advisor", growth: 28 },
      { role: "Researcher", growth: 25 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 65 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "AI Governance", demand: 98 },
      { skill: "Algorithmic Bias", demand: 95 },
      { skill: "Policy Making", demand: 92 },
    ],
    topCompanies: [
      { company: "OpenAI", careerUrl: "https://openai.com/careers/" },
      { company: "Microsoft", careerUrl: "https://careers.microsoft.com/us/en/job/1683464/Principal-Responsible-AI-Program-Manager" },
      { company: "Google", careerUrl: "https://careers.google.com/teams/trust-safety/" },
    ],
  },
  "offensive-security": {
    avgSalaryGrowth: "+28%",
    jobOpenings: "18.7K",
    remoteRoles: "50%",
    avgExperience: "4.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 100 },
      { year: "2021", salary: 115 },
      { year: "2022", salary: 130 },
      { year: "2023", salary: 145 },
      { year: "2024", salary: 160 },
    ],
    jobGrowth: [
      { role: "Pen Tester", growth: 32 },
      { role: "Red Teamer", growth: 35 },
      { role: "Exploit Dev", growth: 28 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 50 },
      { name: "Hybrid", value: 40 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Penetration Testing", demand: 99 },
      { skill: "Exploit Dev", demand: 95 },
      { skill: "Kali Linux", demand: 92 },
    ],
    topCompanies: [
      { company: "Bishop Fox", careerUrl: "https://bishopfox.com/careers" },
      { company: "CrowdStrike", careerUrl: "https://www.crowdstrike.com/careers/" },
      { company: "Mandiant", careerUrl: "https://careers.google.com/teams/mandiant/" },
    ],
  },
  "defensive-security": {
    avgSalaryGrowth: "+26%",
    jobOpenings: "24.1K",
    remoteRoles: "45%",
    avgExperience: "3.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 90 },
      { year: "2021", salary: 100 },
      { year: "2022", salary: 115 },
      { year: "2023", salary: 125 },
      { year: "2024", salary: 140 },
    ],
    jobGrowth: [
      { role: "SOC Analyst", growth: 30 },
      { role: "Threat Hunter", growth: 28 },
      { role: "Security Engineer", growth: 25 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 45 },
      { name: "Hybrid", value: 45 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "SIEM Tools", demand: 98 },
      { skill: "Threat Hunting", demand: 94 },
      { skill: "Network Defense", demand: 90 },
    ],
    topCompanies: [
      { company: "Palo Alto Networks", careerUrl: "https://www.paloaltonetworks.com/company/careers" },
      { company: "Dragos", careerUrl: "https://www.dragos.com/careers/" },
      { company: "Cloudflare", careerUrl: "https://www.cloudflare.com/careers/" },
    ],
  },
  "incident-response": {
    avgSalaryGrowth: "+27%",
    jobOpenings: "15.5K",
    remoteRoles: "55%",
    avgExperience: "4.2 yrs",
    salaryTrends: [
      { year: "2020", salary: 105 },
      { year: "2021", salary: 120 },
      { year: "2022", salary: 135 },
      { year: "2023", salary: 150 },
      { year: "2024", salary: 165 },
    ],
    jobGrowth: [
      { role: "Incident Responder", growth: 33 },
      { role: "Forensics Analyst", growth: 30 },
      { role: "Malware Analyst", growth: 28 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 55 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Digital Forensics", demand: 99 },
      { skill: "Malware Analysis", demand: 96 },
      { skill: "Incident Handling", demand: 93 },
    ],
    topCompanies: [
      { company: "Mandiant (Google)", careerUrl: "https://careers.google.com/teams/mandiant/" },
      { company: "Kroll", careerUrl: "https://www.kroll.com/en/careers" },
      { company: "CrowdStrike", careerUrl: "https://www.crowdstrike.com/careers/" },
    ],
  },
  "governance-compliance": {
    avgSalaryGrowth: "+18%",
    jobOpenings: "20.3K",
    remoteRoles: "40%",
    avgExperience: "5.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 95 },
      { year: "2021", salary: 105 },
      { year: "2022", salary: 115 },
      { year: "2023", salary: 125 },
      { year: "2024", salary: 135 },
    ],
    jobGrowth: [
      { role: "GRC Analyst", growth: 22 },
      { role: "IT Auditor", growth: 20 },
      { role: "Compliance Manager", growth: 18 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 40 },
      { name: "Hybrid", value: 50 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Risk Management", demand: 97 },
      { skill: "IT Audit", demand: 94 },
      { skill: "Compliance Frameworks", demand: 91 },
    ],
    topCompanies: [
      { company: "Deloitte", careerUrl: "https://www2.deloitte.com/us/en/careers.html" },
      { company: "PwC", careerUrl: "https://www.pwc.com/us/en/careers.html" },
      { company: "Salesforce", careerUrl: "https://www.salesforce.com/company/careers/" },
    ],
  },
  "data-analysis": {
    avgSalaryGrowth: "+24%",
    jobOpenings: "31.2K",
    remoteRoles: "50%",
    avgExperience: "2.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 70 },
      { year: "2021", salary: 80 },
      { year: "2022", salary: 90 },
      { year: "2023", salary: 100 },
      { year: "2024", salary: 110 },
    ],
    jobGrowth: [
      { role: "Data Analyst", growth: 29 },
      { role: "Business Analyst", growth: 26 },
      { role: "SQL Analyst", growth: 24 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 50 },
      { name: "Hybrid", value: 40 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "SQL", demand: 99 },
      { skill: "Tableau/Power BI", demand: 96 },
      { skill: "Python/R", demand: 92 },
    ],
    topCompanies: [
      { company: "TikTok", careerUrl: "https://careers.tiktok.com/" },
      { company: "Capital One", careerUrl: "https://www.capitalonecareers.com/" },
      { company: "Wayfair", careerUrl: "https://www.aboutwayfair.com/careers" },
    ],
  },
  "machine-learning": {
    avgSalaryGrowth: "+30%",
    jobOpenings: "22.8K",
    remoteRoles: "60%",
    avgExperience: "4.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 125 },
      { year: "2021", salary: 140 },
      { year: "2022", salary: 155 },
      { year: "2023", salary: 170 },
      { year: "2024", salary: 185 },
    ],
    jobGrowth: [
      { role: "ML Engineer", growth: 35 },
      { role: "Data Scientist, ML", growth: 32 },
      { role: "AI Engineer", growth: 30 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 60 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "PyTorch/TensorFlow", demand: 98 },
      { skill: "Deep Learning", demand: 95 },
      { skill: "MLOps", demand: 91 },
    ],
    topCompanies: [
      { company: "NVIDIA", careerUrl: "https://www.nvidia.com/en-us/careers/" },
      { company: "Spotify", careerUrl: "https://www.lifeatspotify.com/jobs" },
      { company: "Adobe", careerUrl: "https://careers.adobe.com/" },
    ],
  },
  "data-engineering": {
    avgSalaryGrowth: "+28%",
    jobOpenings: "25.9K",
    remoteRoles: "55%",
    avgExperience: "3.8 yrs",
    salaryTrends: [
      { year: "2020", salary: 115 },
      { year: "2021", salary: 130 },
      { year: "2022", salary: 145 },
      { year: "2023", salary: 160 },
      { year: "2024", salary: 175 },
    ],
    jobGrowth: [
      { role: "Data Engineer", growth: 33 },
      { role: "ETL Developer", growth: 28 },
      { role: "Big Data Engineer", growth: 30 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 55 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "SQL", demand: 99 },
      { skill: "Python/Scala", demand: 96 },
      { skill: "Apache Spark", demand: 94 },
    ],
    topCompanies: [
      { company: "Databricks", careerUrl: "https://www.databricks.com/company/careers" },
      { company: "JPMorgan Chase", careerUrl: "https://careers.jpmorgan.com/us/en/students/programs" },
      { company: "Netflix", careerUrl: "https://jobs.netflix.com/" },
    ],
  },
  "business-intelligence": {
    avgSalaryGrowth: "+20%",
    jobOpenings: "21.4K",
    remoteRoles: "45%",
    avgExperience: "3.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 85 },
      { year: "2021", salary: 95 },
      { year: "2022", salary: 105 },
      { year: "2023", salary: 115 },
      { year: "2024", salary: 125 },
    ],
    jobGrowth: [
      { role: "BI Developer", growth: 25 },
      { role: "BI Analyst", growth: 22 },
      { role: "Tableau Developer", growth: 20 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 45 },
      { name: "Hybrid", value: 45 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Power BI/Tableau", demand: 98 },
      { skill: "SQL", demand: 97 },
      { skill: "Data Modeling", demand: 93 },
    ],
    topCompanies: [
      { company: "Microsoft", careerUrl: "https://careers.microsoft.com/" },
      { company: "Slalom", careerUrl: "https://www.slalom.com/careers" },
      { company: "T-Mobile", careerUrl: "https://careers.t-mobile.com/" },
    ],
  },
  "brand-design": {
    avgSalaryGrowth: "+15%",
    jobOpenings: "12.3K",
    remoteRoles: "55%",
    avgExperience: "4.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 75 },
      { year: "2021", salary: 85 },
      { year: "2022", salary: 95 },
      { year: "2023", salary: 105 },
      { year: "2024", salary: 115 },
    ],
    jobGrowth: [
      { role: "Brand Designer", growth: 20 },
      { role: "Visual Designer", growth: 18 },
      { role: "Brand Strategist", growth: 15 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 55 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Adobe Creative Suite", demand: 98 },
      { skill: "Brand Strategy", demand: 95 },
      { skill: "Typography", demand: 92 },
    ],
    topCompanies: [
      { company: "Pentagram", careerUrl: "https://www.pentagram.com/jobs" },
      { company: "Airbnb", careerUrl: "https://careers.airbnb.com/" },
      { company: "Wolff Olins", careerUrl: "https://www.wolffolins.com/careers" },
    ],
  },
  illustration: {
    avgSalaryGrowth: "+12%",
    jobOpenings: "8.1K",
    remoteRoles: "70%",
    avgExperience: "3.2 yrs",
    salaryTrends: [
      { year: "2020", salary: 60 },
      { year: "2021", salary: 68 },
      { year: "2022", salary: 75 },
      { year: "2023", salary: 82 },
      { year: "2024", salary: 90 },
    ],
    jobGrowth: [
      { role: "Illustrator", growth: 18 },
      { role: "Concept Artist", growth: 20 },
      { role: "Graphic Artist", growth: 15 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 70 },
      { name: "Hybrid", value: 20 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Digital Painting", demand: 97 },
      { skill: "Adobe Illustrator", demand: 95 },
      { skill: "Conceptualization", demand: 90 },
    ],
    topCompanies: [
      { company: "The New York Times", careerUrl: "https://www.nytco.com/careers/" },
      { company: "Blizzard", careerUrl: "https://careers.blizzard.com/" },
      { company: "Disney", careerUrl: "https://jobs.disneycareers.com/" },
    ],
  },
  "industrial-design": {
    avgSalaryGrowth: "+10%",
    jobOpenings: "6.5K",
    remoteRoles: "20%",
    avgExperience: "4.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 80 },
      { year: "2021", salary: 88 },
      { year: "2022", salary: 95 },
      { year: "2023", salary: 102 },
      { year: "2024", salary: 110 },
    ],
    jobGrowth: [
      { role: "Industrial Designer", growth: 15 },
      { role: "Product Designer (HW)", growth: 18 },
      { role: "3D Modeler", growth: 12 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 20 },
      { name: "Hybrid", value: 40 },
      { name: "On-site", value: 40 },
    ],
    topSkills: [
      { skill: "CAD (SolidWorks)", demand: 98 },
      { skill: "Prototyping", demand: 94 },
      { skill: "Ergonomics", demand: 90 },
    ],
    topCompanies: [
      { company: "IDEO", careerUrl: "https://www.ideo.com/jobs" },
      { company: "Google Nest", careerUrl: "https://careers.google.com/teams/hardware/" },
      { company: "Nike", careerUrl: "https://jobs.nike.com/" },
    ],
  },
  "content-marketing": {
    avgSalaryGrowth: "+18%",
    jobOpenings: "28.4K",
    remoteRoles: "70%",
    avgExperience: "3.0 yrs",
    salaryTrends: [
      { year: "2020", salary: 60 },
      { year: "2021", salary: 68 },
      { year: "2022", salary: 78 },
      { year: "2023", salary: 85 },
      { year: "2024", salary: 95 },
    ],
    jobGrowth: [
      { role: "Content Manager", growth: 24 },
      { role: "Content Strategist", growth: 22 },
      { role: "Copywriter", growth: 18 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 70 },
      { name: "Hybrid", value: 25 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "SEO", demand: 98 },
      { skill: "Copywriting", demand: 96 },
      { skill: "Content Strategy", demand: 94 },
    ],
    topCompanies: [
      { company: "HubSpot", careerUrl: "https://www.hubspot.com/careers" },
      { company: "Ahrefs", careerUrl: "https://ahrefs.com/jobs" },
      { company: "Ogilvy", careerUrl: "https://www.ogilvy.com/careers" },
    ],
  },
  "social-media-marketing": {
    avgSalaryGrowth: "+16%",
    jobOpenings: "25.1K",
    remoteRoles: "75%",
    avgExperience: "2.8 yrs",
    salaryTrends: [
      { year: "2020", salary: 55 },
      { year: "2021", salary: 62 },
      { year: "2022", salary: 70 },
      { year: "2023", salary: 78 },
      { year: "2024", salary: 85 },
    ],
    jobGrowth: [
      { role: "Social Media Manager", growth: 25 },
      { role: "Community Manager", growth: 22 },
      { role: "Social Strategist", growth: 20 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 75 },
      { name: "Hybrid", value: 20 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "Community Management", demand: 97 },
      { skill: "Content Creation", demand: 95 },
      { skill: "Platform Analytics", demand: 92 },
    ],
    topCompanies: [
      { company: "Gymshark", careerUrl: "https://careers.gymshark.com/" },
      { company: "Discord", careerUrl: "https://discord.com/careers" },
      { company: "VaynerMedia", careerUrl: "https://vaynermedia.com/careers/" },
    ],
  },
  "paid-advertising": {
    avgSalaryGrowth: "+22%",
    jobOpenings: "19.8K",
    remoteRoles: "65%",
    avgExperience: "3.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 70 },
      { year: "2021", salary: 80 },
      { year: "2022", salary: 90 },
      { year: "2023", salary: 100 },
      { year: "2024", salary: 110 },
    ],
    jobGrowth: [
      { role: "PPC Specialist", growth: 28 },
      { role: "Paid Media Manager", growth: 25 },
      { role: "Performance Mktg", growth: 22 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 65 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "Google/Meta Ads", demand: 99 },
      { skill: "Budget Management", demand: 96 },
      { skill: "A/B Testing", demand: 93 },
    ],
    topCompanies: [
      { company: "WordStream", careerUrl: "https://www.wordstream.com/careers" },
      { company: "GroupM", careerUrl: "https://www.groupm.com/careers/" },
      { company: "Hims & Hers", careerUrl: "https://www.hims.com/careers" },
    ],
  },
  "seo-specialist": {
    avgSalaryGrowth: "+20%",
    jobOpenings: "17.6K",
    remoteRoles: "70%",
    avgExperience: "3.1 yrs",
    salaryTrends: [
      { year: "2020", salary: 65 },
      { year: "2021", salary: 75 },
      { year: "2022", salary: 85 },
      { year: "2023", salary: 95 },
      { year: "2024", salary: 105 },
    ],
    jobGrowth: [
      { role: "SEO Specialist", growth: 26 },
      { role: "SEO Manager", growth: 24 },
      { role: "SEO Strategist", growth: 22 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 70 },
      { name: "Hybrid", value: 25 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "Keyword Research", demand: 99 },
      { skill: "Technical SEO", demand: 97 },
      { skill: "Link Building", demand: 94 },
    ],
    topCompanies: [
      { company: "Moz", careerUrl: "https://moz.com/about/jobs" },
      { company: "Shopify", careerUrl: "https://www.shopify.com/careers" },
      { company: "Backlinko", careerUrl: "https://backlinko.com/careers" },
    ],
  },
  "traditional-pm": {
    avgSalaryGrowth: "+10%",
    jobOpenings: "29.5K",
    remoteRoles: "35%",
    avgExperience: "5.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 85 },
      { year: "2021", salary: 92 },
      { year: "2022", salary: 100 },
      { year: "2023", salary: 108 },
      { year: "2024", salary: 115 },
    ],
    jobGrowth: [
      { role: "Project Manager", growth: 15 },
      { role: "Program Manager", growth: 18 },
      { role: "Project Coordinator", growth: 12 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 35 },
      { name: "Hybrid", value: 45 },
      { name: "On-site", value: 20 },
    ],
    topSkills: [
      { skill: "Waterfall", demand: 96 },
      { skill: "Budgeting", demand: 94 },
      { skill: "Risk Management", demand: 92 },
    ],
    topCompanies: [
      { company: "Deloitte", careerUrl: "https://www2.deloitte.com/us/en/careers.html" },
      { company: "Accenture", careerUrl: "https://www.accenture.com/us-en/careers" },
      { company: "Jacobs", careerUrl: "https://www.jacobs.com/careers" },
    ],
  },
  "consumer-pm": {
    avgSalaryGrowth: "+20%",
    jobOpenings: "18.9K",
    remoteRoles: "50%",
    avgExperience: "4.2 yrs",
    salaryTrends: [
      { year: "2020", salary: 110 },
      { year: "2021", salary: 125 },
      { year: "2022", salary: 140 },
      { year: "2023", salary: 155 },
      { year: "2024", salary: 170 },
    ],
    jobGrowth: [
      { role: "Product Manager", growth: 25 },
      { role: "Associate PM", growth: 28 },
      { role: "Group PM", growth: 22 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 50 },
      { name: "Hybrid", value: 40 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "User Empathy", demand: 98 },
      { skill: "Market Analysis", demand: 95 },
      { skill: "Product Strategy", demand: 93 },
    ],
    topCompanies: [
      { company: "Spotify", careerUrl: "https://www.lifeatspotify.com/jobs" },
      { company: "Meta", careerUrl: "https://www.metacareers.com/" },
      { company: "Airbnb", careerUrl: "https://careers.airbnb.com/" },
    ],
  },
  "ux-research": {
    avgSalaryGrowth: "+22%",
    jobOpenings: "14.7K",
    remoteRoles: "60%",
    avgExperience: "3.5 yrs",
    salaryTrends: [
      { year: "2020", salary: 95 },
      { year: "2021", salary: 105 },
      { year: "2022", salary: 120 },
      { year: "2023", salary: 135 },
      { year: "2024", salary: 150 },
    ],
    jobGrowth: [
      { role: "UX Researcher", growth: 28 },
      { role: "User Researcher", growth: 26 },
      { role: "Research Manager", growth: 22 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 60 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "User Interviews", demand: 99 },
      { skill: "Usability Testing", demand: 97 },
      { skill: "Qualitative Analysis", demand: 94 },
    ],
    topCompanies: [
      { company: "UserTesting", careerUrl: "https://www.usertesting.com/about-us/careers" },
      { company: "Microsoft", careerUrl: "https://careers.microsoft.com/" },
      { company: "Google", careerUrl: "https://careers.google.com/" },
    ],
  },
  "ux-analytics": {
    avgSalaryGrowth: "+24%",
    jobOpenings: "11.3K",
    remoteRoles: "65%",
    avgExperience: "3.8 yrs",
    salaryTrends: [
      { year: "2020", salary: 100 },
      { year: "2021", salary: 112 },
      { year: "2022", salary: 125 },
      { year: "2023", salary: 140 },
      { year: "2024", salary: 155 },
    ],
    jobGrowth: [
      { role: "UX Analyst", growth: 30 },
      { role: "Product Analyst", growth: 28 },
      { role: "Data Analyst, UX", growth: 25 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 65 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "A/B Testing", demand: 98 },
      { skill: "Quantitative Analysis", demand: 96 },
      { skill: "User Behavior Analytics", demand: 93 },
    ],
    topCompanies: [
      { company: "Amplitude", careerUrl: "https://amplitude.com/careers" },
      { company: "Mixpanel", careerUrl: "https://mixpanel.com/jobs/" },
      { company: "Electronic Arts", careerUrl: "https://www.ea.com/careers" },
    ],
  },
  "frontend-development": {
    avgSalaryGrowth: "+23%",
    jobOpenings: "29.6K",
    remoteRoles: "60%",
    avgExperience: "3.2 yrs",
    salaryTrends: [
      { year: "2020", salary: 95 },
      { year: "2021", salary: 108 },
      { year: "2022", salary: 122 },
      { year: "2023", salary: 135 },
      { year: "2024", salary: 150 },
    ],
    jobGrowth: [
      { role: "Frontend Developer", growth: 28 },
      { role: "React Developer", growth: 30 },
      { role: "Frontend Engineer", growth: 25 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 60 },
      { name: "Hybrid", value: 35 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "React/Next.js", demand: 99 },
      { skill: "JavaScript/TypeScript", demand: 98 },
      { skill: "CSS/Tailwind", demand: 95 },
    ],
    topCompanies: [
      { company: "Vercel", careerUrl: "https://vercel.com/careers" },
      { company: "Shopify", careerUrl: "https://www.shopify.com/careers" },
      { company: "Netflix", careerUrl: "https://jobs.netflix.com/" },
    ],
  },
  "backend-development": {
    avgSalaryGrowth: "+25%",
    jobOpenings: "27.4K",
    remoteRoles: "58%",
    avgExperience: "3.6 yrs",
    salaryTrends: [
      { year: "2020", salary: 105 },
      { year: "2021", salary: 120 },
      { year: "2022", salary: 135 },
      { year: "2023", salary: 150 },
      { year: "2024", salary: 165 },
    ],
    jobGrowth: [
      { role: "Backend Developer", growth: 30 },
      { role: "Backend Engineer", growth: 28 },
      { role: "Node.js Developer", growth: 26 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 58 },
      { name: "Hybrid", value: 32 },
      { name: "On-site", value: 10 },
    ],
    topSkills: [
      { skill: "Node.js/Python/Go", demand: 99 },
      { skill: "Databases (SQL/NoSQL)", demand: 97 },
      { skill: "API Design", demand: 95 },
    ],
    topCompanies: [
      { company: "Stripe", careerUrl: "https://stripe.com/jobs" },
      { company: "Twilio", careerUrl: "https://www.twilio.com/company/careers" },
      { company: "PayPal", careerUrl: "https://careers.pypl.com/" },
    ],
  },
  "full-stack-development": {
    avgSalaryGrowth: "+26%",
    jobOpenings: "35.2K",
    remoteRoles: "62%",
    avgExperience: "3.4 yrs",
    salaryTrends: [
      { year: "2020", salary: 100 },
      { year: "2021", salary: 115 },
      { year: "2022", salary: 130 },
      { year: "2023", salary: 145 },
      { year: "2024", salary: 160 },
    ],
    jobGrowth: [
      { role: "Full Stack Developer", growth: 32 },
      { role: "Full Stack Engineer", growth: 30 },
      { role: "MERN Stack Dev", growth: 28 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 62 },
      { name: "Hybrid", value: 30 },
      { name: "On-site", value: 8 },
    ],
    topSkills: [
      { skill: "React/Node.js", demand: 99 },
      { skill: "Databases", demand: 96 },
      { skill: "Cloud/DevOps", demand: 93 },
    ],
    topCompanies: [
      { company: "Brex", careerUrl: "https://www.brex.com/careers/" },
      { company: "Coinbase", careerUrl: "https://www.coinbase.com/careers" },
      { company: "Wellfound Startups", careerUrl: "https://wellfound.com/jobs" },
    ],
  },
  "ui-ux-development": {
    avgSalaryGrowth: "+21%",
    jobOpenings: "16.8K",
    remoteRoles: "68%",
    avgExperience: "3.9 yrs",
    salaryTrends: [
      { year: "2020", salary: 90 },
      { year: "2021", salary: 102 },
      { year: "2022", salary: 115 },
      { year: "2023", salary: 128 },
      { year: "2024", salary: 140 },
    ],
    jobGrowth: [
      { role: "UI/UX Developer", growth: 27 },
      { role: "Design Technologist", growth: 25 },
      { role: "Creative Technologist", growth: 22 },
    ],
    remoteDistribution: [
      { name: "Remote", value: 68 },
      { name: "Hybrid", value: 27 },
      { name: "On-site", value: 5 },
    ],
    topSkills: [
      { skill: "Design Systems", demand: 98 },
      { skill: "Web Accessibility", demand: 95 },
      { skill: "Advanced CSS", demand: 93 },
    ],
    topCompanies: [
      { company: "Webflow", careerUrl: "https://webflow.com/about#jobs" },
      { company: "Amazon", careerUrl: "https://www.amazon.jobs/" },
      { company: "Google Creative Lab", careerUrl: "https://careers.google.com/teams/creative-lab/" },
    ],
  },
}

const COLORS = ["var(--color-primary)", "var(--color-chart-2)", "var(--color-chart-3)"]

const careerPaths = [
  { id: "default", name: "Product Management" },
  { id: "software-developer", name: "Software Developer" },
  { id: "data-analytics", name: "Data Analytics" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "software-engineer", name: "Software Engineering" },
  { id: "strategy-manager", name: "Strategy Manager" },
  { id: "project-manager", name: "Project Management" },
  { id: "operations-manager", name: "Operations Manager" },
  { id: "clinical-lead", name: "Clinical Team Lead" },
  { id: "visual-designer", name: "Visual Design" },
  { id: "healthcare-educator", name: "Healthcare Educator" },
  { id: "systems-engineer", name: "Systems Engineering" },
  { id: "mechanical-engineer", name: "Mechanical/Civil Engineering" },
  { id: "digital-marketing", name: "Digital Marketing" },
  { id: "brand-manager", name: "Brand Manager" },
  { id: "nlp-engineer", name: "NLP Engineer" },
  { id: "cv-engineer", name: "Computer Vision Engineer" },
  { id: "rl-engineer", name: "Reinforcement Learning Engineer" },
  { id: "ai-ethics", name: "AI Ethics & Governance" },
  { id: "offensive-security", name: "Offensive Security" },
  { id: "defensive-security", name: "Defensive Security" },
  { id: "incident-response", name: "Incident Response" },
  { id: "governance-compliance", name: "Governance & Compliance" },
  { id: "data-analysis", name: "Data Analysis" },
  { id: "machine-learning", name: "Machine Learning" },
  { id: "data-engineering", name: "Data Engineering" },
  { id: "business-intelligence", name: "Business Intelligence" },
  { id: "brand-design", name: "Brand Design" },
  { id: "illustration", name: "Illustration" },
  { id: "industrial-design", name: "Industrial Design" },
  { id: "content-marketing", name: "Content Marketing" },
  { id: "social-media-marketing", name: "Social Media Marketing" },
  { id: "paid-advertising", name: "Paid Advertising" },
  { id: "seo-specialist", name: "Search Engine Optimization" },
  { id: "traditional-pm", name: "Traditional Project Management" },
  { id: "consumer-pm", name: "Consumer Product Management" },
  { id: "ux-research", name: "UX Research" },
  { id: "ux-analytics", name: "UX Analytics" },
  { id: "frontend-development", name: "Frontend Development" },
  { id: "backend-development", name: "Backend Development" },
  { id: "full-stack-development", name: "Full Stack Development" },
  { id: "ui-ux-development", name: "UI/UX Development" },
]

function TrendsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCourseId = searchParams.get("course") || "default"

  const [selectedCareer, setSelectedCareer] = useState(initialCourseId)
  const [trends, setTrends] = useState<TrendData>(trendsByCareer[initialCourseId] || trendsByCareer.default)

  useEffect(() => {
    const newTrends = trendsByCareer[selectedCareer] || trendsByCareer.default
    setTrends(newTrends)
    // Update URL without reloading the page
    const params = new URLSearchParams(window.location.search)
    params.set("course", selectedCareer)
    router.replace(`${window.location.pathname}?${params.toString()}`)
  }, [selectedCareer, router])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Market Trends & Insights</h1>
          <p className="text-muted-foreground">Real-time data on job market, salaries, and industry trends</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Career Path Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Select a Career Path to View Trends</h2>
          <div className="flex flex-wrap gap-2">
            {careerPaths.map((path) => (
              <Button
                key={path.id}
                variant={selectedCareer === path.id ? "default" : "outline"}
                onClick={() => setSelectedCareer(path.id)}
              >
                {path.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Salary Growth</p>
                <p className="text-3xl font-bold text-foreground">{trends.avgSalaryGrowth}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Year over year</p>
          </Card>

          <Card className="p-6" >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Job Openings</p>
                <p className="text-3xl font-bold text-foreground">{trends.jobOpenings}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Active positions</p>
          </Card>

          <Card className="p-6" >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Remote Roles</p>
                <p className="text-3xl font-bold text-foreground">{trends.remoteRoles}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Of all positions</p>
          </Card>

          <Card className="p-6" >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Experience</p>
                <p className="text-3xl font-bold text-foreground">{trends.avgExperience}</p>
              </div>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Required for roles</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          {/* Salary Trends */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-primary" />
              Salary Trends (5 Years)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends.salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card) / 0.9)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Work Style Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Work Style Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={trends.remoteDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="var(--color-primary)"
                  dataKey="value"
                >
                  {trends.remoteDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card) / 0.9)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChartComponent>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Job Growth */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Job Growth by Role (YoY %)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trends.jobGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="role" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card) / 0.9)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                }}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="growth" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Insights */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Top Growing Skills</h3>
            <div className="space-y-3">
              {trends.topSkills.map((item) => (
                <div key={item.skill} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.demand}%` }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.demand}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Top Companies Hiring</h3>
            <div className="space-y-3">
              {trends.topCompanies.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <a
                    href={item.careerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:text-primary hover:underline"
                  >{item.company}</a>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function TrendsPage() {
  return (
    // Wrap the component in Suspense because it uses useSearchParams
    <Suspense fallback={<div className="p-6">Loading trends...</div>}>
      <TrendsPageContent />
    </Suspense>
  )
}
