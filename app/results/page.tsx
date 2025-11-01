"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { TrendingUp, Briefcase, ArrowRight, Download, Share2, BookOpen, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const careerPaths = {
  TC: [
    {
      id: "software-developer",
      title: "Software Developer",
      description: "Builds applications and software solutions",
      keySkills: ["Programming languages", "System design", "Algorithms"],
      dailyWork: "Coding, testing, architecture",
      growthPath: "Senior Developer → Technical Lead → CTO",
      salaryRange: "$100K - $180K",
      growthPotential: "Very High",
      learningPaths: [
        "Meta Back-End Developer Professional Certificate",
        "IBM Full Stack Software Developer Professional Certificate",
      ],
    },
    {
      id: "data-analytics",
      title: "Data Analytics",
      description: "Transforms data into business insights",
      keySkills: ["Statistics", "SQL", "Data visualization", "Python/R"],
      dailyWork: "Data cleaning, analysis, reporting, visualization",
      growthPath: "Data Analyst → Data Scientist → Analytics Director",
      salaryRange: "$80K - $150K",
      growthPotential: "Very High",
      learningPaths: ["Google Data Analytics Professional Certificate", "IBM Data Science Professional Certificate"],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      description: "Protects digital assets and systems",
      keySkills: ["Security protocols", "Threat detection", "Risk assessment"],
      dailyWork: "Security monitoring, incident response, compliance",
      growthPath: "Security Analyst → Security Architect → CISO",
      salaryRange: "$90K - $160K",
      growthPotential: "Very High",
      learningPaths: [
        "Google Cybersecurity Professional Certificate",
        "IBM Cybersecurity Analyst Professional Certificate",
      ],
    },
    {
      id: "software-engineer",
      title: "Software Engineering",
      description: "Architects complex software systems and infrastructure",
      keySkills: ["System architecture", "Advanced algorithms", "Scalability"],
      dailyWork: "Technical design, code architecture, system optimization",
      growthPath: "Senior Engineer → Principal Engineer → Engineering Director",
      salaryRange: "$120K - $200K",
      growthPotential: "Very High",
      learningPaths: ["Software Engineering Specialization", "Software Design and Architecture Specialization"],
    },
  ],
  BM: [
    {
      id: "strategy-manager",
      title: "Strategy Manager",
      description: "Develops and executes organizational growth strategies",
      keySkills: ["Market analysis", "Strategic planning", "Financial modeling"],
      dailyWork: "Research, stakeholder management, business planning",
      growthPath: "Strategy Analyst → Strategy Director → COO",
      salaryRange: "$110K - $180K",
      growthPotential: "High",
      learningPaths: ["Business Strategy Specialization", "Strategic Leadership and Management Specialization"],
    },
    {
      id: "project-manager",
      title: "Project Management",
      description: "Leads complex initiatives and teams",
      keySkills: ["Leadership", "Risk management", "Resource planning"],
      dailyWork: "Team coordination, timeline management, deliverables",
      growthPath: "Project Manager → Program Manager → Portfolio Director",
      salaryRange: "$90K - $160K",
      growthPotential: "High",
      learningPaths: [
        "Google Project Management Professional Certificate",
        "Project Management Principles and Practices",
      ],
    },
    {
      id: "operations-manager",
      title: "Operations Manager",
      description: "Optimizes business processes and performance",
      keySkills: ["Process improvement", "Team leadership", "Resource allocation"],
      dailyWork: "Operations oversight, performance tracking, optimization",
      growthPath: "Operations Lead → Operations Director → COO/CEO",
      salaryRange: "$85K - $155K",
      growthPotential: "High",
      learningPaths: ["Operations Management", "Supply Chain Excellence"],
    },
  ],
  HS: [
    {
      id: "clinical-lead",
      title: "Clinical Team Lead",
      description: "Guides clinical teams while developing talent",
      keySkills: ["Medical knowledge", "Leadership", "Quality management"],
      dailyWork: "Staff coaching, care oversight, team development",
      growthPath: "Team Lead → Clinical Director → Chief Medical Officer",
      salaryRange: "$95K - $170K",
      growthPotential: "High",
      learningPaths: ["Healthcare Organization Operations Specialization"],
    },
    {
      id: "healthcare-educator",
      title: "Healthcare Educator",
      description: "Designs and delivers clinical training programs",
      keySkills: ["Clinical expertise", "Instructional design", "Assessment"],
      dailyWork: "Training delivery, curriculum development, skills evaluation",
      growthPath: "Clinical Trainer → Education Director → Chief Learning Officer",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: ["Teaching and Assessing Clinical Skills"],
    },
  ],
  CD: [
    {
      id: "ui-ux-design",
      title: "UX/UI Design",
      description: "Creates intuitive digital experiences",
      keySkills: ["User research", "Wireframing", "Interaction design"],
      dailyWork: "Interface design, user testing, prototyping",
      growthPath: "UX Designer → Lead Designer → UX Director",
      salaryRange: "$85K - $155K",
      growthPotential: "High",
      learningPaths: ["Google UX Design Certificate", "UI/UX Design Specialization"],
    },
    {
      id: "visual-designer",
      title: "Visual Design",
      description: "Develops brand and product visuals",
      keySkills: ["Typography", "Color theory", "Design software"],
      dailyWork: "Visual design, asset creation, brand guidelines",
      growthPath: "Visual Designer → Art Director → Creative Director",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: ["Graphic Design Specialization", "Visual Elements of User Interface Design"],
    },
  ],
  ED: [
    {
      id: "systems-engineer",
      title: "Systems Engineering",
      description: "Designs and optimizes complex systems",
      keySkills: ["System architecture", "Infrastructure", "Scalability"],
      dailyWork: "System design, optimization, technical planning",
      growthPath: "Systems Engineer → Systems Architect → Engineering Director",
      salaryRange: "$110K - $180K",
      growthPotential: "Very High",
      learningPaths: ["Systems Engineering Specialization"],
    },
    {
      id: "mechanical-engineer",
      title: "Mechanical/Civil Engineering",
      description: "Creates physical infrastructure and systems",
      keySkills: ["CAD", "Structural analysis", "Project management"],
      dailyWork: "Design work, calculations, specifications",
      growthPath: "Project Engineer → Senior Engineer → Engineering Manager",
      salaryRange: "$85K - $160K",
      growthPotential: "High",
      learningPaths: ["Engineering of Structures Specialization"],
    },
  ],
  MC: [
    {
      id: "digital-marketing",
      title: "Digital Marketing Manager",
      description: "Drives digital engagement and growth",
      keySkills: ["Analytics", "Content creation", "Social media management"],
      dailyWork: "Campaign execution, performance tracking, optimization",
      growthPath: "Marketing Manager → Digital Director → CMO",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: [
        "Google Digital Marketing & E-commerce Professional Certificate",
        "Meta Social Media Marketing Certificate",
      ],
    },
    {
      id: "brand-manager",
      title: "Brand Manager",
      description: "Shapes brand identity and market position",
      keySkills: ["Brand strategy", "Market research", "Creative direction"],
      dailyWork: "Brand development, creative oversight, audience engagement",
      growthPath: "Brand Manager → Brand Director → Global Brand Chief",
      salaryRange: "$85K - $160K",
      growthPotential: "High",
      learningPaths: ["Branding Specialization", "Brand Management"],
    },
  ],
  NLP: [
    {
      id: "nlp-engineer",
      title: "Natural Language Processing (NLP) Engineer",
      description: "Create systems that understand and process human language",
      keySkills: ["Linguistics", "ML algorithms", "Python", "deep learning", "transformers"],
      dailyWork: "Model training, text analysis, chatbot development, translation systems",
      growthPath: "NLP Engineer → Senior NLP Engineer → NLP Architect → AI Research Lead",
      salaryRange: "$110K - $190K",
      growthPotential: "Very High",
      learningPaths: [
        "Natural Language Processing Specialization",
        "TensorFlow Developer Professional Certificate",
        "Computational Social Science Specialization",
      ],
    },
  ],
  CV: [
    {
      id: "cv-engineer",
      title: "Computer Vision (CV) Engineer",
      description: "Develop systems that understand and process visual information",
      keySkills: ["Image processing", "neural networks", "PyTorch", "OpenCV", "deep learning"],
      dailyWork: "Model development, image recognition, object detection, video analysis",
      growthPath: "CV Engineer → Senior CV Engineer → Vision AI Lead → Research Director",
      salaryRange: "$115K - $195K",
      growthPotential: "Very High",
      learningPaths: [
        "Deep Learning for Computer Vision Specialization",
        "Advanced Computer Vision with TensorFlow",
        "Applied ML in Python",
        "Computer Vision for Engineering and Science Specialization",
      ],
    },
  ],
  RL: [
    {
      id: "rl-engineer",
      title: "Reinforcement Learning (RL) Engineer",
      description: "Build systems that learn through interaction and feedback",
      keySkills: ["Mathematics", "Python", "optimization theory", "robotics", "game theory"],
      dailyWork: "Agent development, simulation design, policy optimization",
      growthPath: "RL Engineer → Senior RL Engineer → RL Research Scientist → AI Director",
      salaryRange: "$120K - $210K",
      growthPotential: "Very High",
      learningPaths: ["Deep Learning and Reinforcement Learning", "Advanced Game Theory", "Modern Robotics Specialization"],
    },
  ],
  AIE: [
    {
      id: "ai-ethics",
      title: "AI Ethics and Governance Specialist",
      description: "Ensure responsible AI development and deployment",
      keySkills: ["Ethics", "policy analysis", "risk assessment", "technical documentation"],
      dailyWork: "Policy development, impact assessment, stakeholder collaboration",
      growthPath: "AI Ethics Researcher → Policy Advisor → Ethics Director → Chief AI Officer",
      salaryRange: "$90K - $170K",
      growthPotential: "High",
      learningPaths: ["AI Ethics Specialization", "Technology Policy", "Responsible AI for Developers Specialization"],
    },
  ],
  OF: [
    {
      id: "penetration-tester",
      title: "Offensive Security",
      description: "Penetrates systems to identify and mitigate vulnerabilities",
      salaryRange: "$110K - $160K",
      growthPotential: "Very High",
      growthPath: "Jr. Pen Tester → Penetration Tester → Senior Pen Tester → Red Team Lead",
      dailyWork: "Ethical hacking, vulnerability exploitation, security research, report writing, exploit development",
      keySkills: ["Networking", "Linux", "Python/Bash Scripting", "Burp Suite", "Active Directory"],
      learningPaths: ["Offensive Security Certified Professional (OSCP)", "GIAC Penetration Tester (GPEN)"],
    },
  ],
  DF: [
    {
      id: "defensive-security",
      title: "Defensive Security",
      description: "Protects systems and networks by detecting, analyzing, and responding to threats",
      salaryRange: "$105K - $150K",
      growthPotential: "High",
      growthPath: "Security Analyst → SOC Analyst Tier 2/3 → Incident Handler → Security Engineer → Security Architect",
      dailyWork: "Real-time security monitoring (SIEM), alert triage, threat hunting, vulnerability management, patching",
      keySkills: ["SIEM Tools (Splunk/ELK)", "Threat Intelligence", "Network Forensics", "Linux/Windows Administration", "CompTIA Security+"],
      learningPaths: ["CompTIA Security+", "Certified Information Systems Security Professional (CISSP)", "GIAC Certified Incident Handler (GCIH)"],
    },
  ],
  IR: [
    {
      id: "incident-response",
      title: "Incident Response",
      description: "Acts immediately to contain, eradicate, and recover from active security breaches",
      salaryRange: "$115K - $175K",
      growthPotential: "High",
      growthPath: "SOC Analyst → Incident Responder → Senior Incident Handler → Incident Response Manager",
      dailyWork: "Breach containment, digital forensics, root cause analysis, developing post-incident reports, security tool tuning",
      keySkills: ["Digital Forensics", "Malware Analysis", "Network Traffic Analysis", "Memory Analysis", "Log Analysis (Splunk)"],
      learningPaths: ["GIAC Certified Incident Handler (GCIH)", "Certified Reverse Engineering Analyst (CREA)"],
    },
  ],
  GC: [
    {
      id: "governance-compliance",
      title: "Governance & Compliance",
      description: "Ensures organizational adherence to legal, regulatory, and internal security standards (GRC)",
      salaryRange: "$95K - $145K",
      growthPotential: "Moderate to High",
      growthPath: "Compliance Analyst → GRC Specialist → Information Security Auditor → CISO/Security Director",
      dailyWork: "Performing risk assessments, developing security policies, auditing systems against compliance frameworks (e.g., ISO 27001, SOC 2, HIPAA)",
      keySkills: ["Risk Management", "Audit Principles", "Regulatory Frameworks (NIST, CIS)", "Policy Writing", "Communication"],
      learningPaths: ["Certified Information Security Manager (CISM)", "Certified Information Systems Auditor (CISA)"],
    },
  ],
  DA: [
    {
      id: "data-analysis",
      title: "Data Analysis",
      description: "Examines large datasets to extract meaningful insights, trends, and conclusions",
      salaryRange: "$70K - $115K",
      growthPotential: "High",
      growthPath: "Junior Data Analyst → Data Analyst → Senior Data Analyst → Business Intelligence Manager",
      dailyWork: "Data cleaning/pre-processing, SQL querying, statistical analysis, creating dashboards (Tableau/Power BI), presenting insights",
      keySkills: ["SQL", "Python/R", "Data Visualization (Tableau/Power BI)", "Statistics", "Excel"],
      learningPaths: ["Google Data Analytics Professional Certificate", "IBM Data Analyst Professional Certificate"],
    },
  ],
  ML: [
    {
      id: "machine-learning",
      title: "Machine Learning",
      description: "Designs, implements, and deploys algorithms that enable systems to learn from data",
      salaryRange: "$130K - $190K+",
      growthPotential: "Very High",
      growthPath: "ML Engineer/Scientist → Senior ML Engineer → Principal ML Scientist → Director of AI/ML",
      dailyWork: "Building and training models (e.g., neural networks), optimizing algorithms, MLOps, deploying models to production, large-scale data processing",
      keySkills: ["Python (PyTorch/TensorFlow)", "Advanced Mathematics", "Deep Learning", "MLOps", "Cloud Platforms (AWS/GCP/Azure)"],
      learningPaths: ["Deep Learning Specialization (Coursera/Andrew Ng)", "relevant cloud certifications (e.g., AWS ML Specialty)"],
    },
  ],
  DE: [
    {
      id: "data-engineering",
      title: "Data Engineering",
      description: "Builds and maintains the robust, scalable infrastructure for data ingestion, storage, and processing (ETL pipelines)",
      salaryRange: "$120K - $175K",
      growthPotential: "Very High",
      growthPath: "Junior Data Engineer → Data Engineer → Senior Data Engineer → Principal Data Architect",
      dailyWork: "Designing and building ETL/ELT pipelines, optimizing data warehouses (Snowflake, Redshift), managing big data tools (Spark, Hadoop), cloud infrastructure setup",
      keySkills: ["SQL", "Python/Scala/Java", "Cloud Data Tools (Databricks, S3)", "Distributed Systems (Spark)", "Data Warehousing"],
      learningPaths: ["Google Professional Data Engineer", "AWS Certified Data Analytics - Specialty"],
    },
  ],
  BI: [
    {
      id: "business-intelligence",
      title: "Business Intelligence",
      description: "Uses data tools and techniques to transform raw data into actionable business insights and reports",
      salaryRange: "$80K - $125K",
      growthPotential: "High",
      growthPath: "BI Analyst → Senior BI Analyst → BI Developer → BI Manager/Data Architect",
      dailyWork: "Gathering business requirements, creating interactive dashboards (Power BI/Tableau), data modeling, writing complex SQL queries, performance tuning reports",
      keySkills: ["SQL", "Data Visualization (Power BI/Tableau)", "Data Modeling", "ETL Processes", "Business Acumen"],
      learningPaths: ["Microsoft Certified: Power BI Data Analyst Associate", "Tableau Desktop Specialist"],
    },
  ],
  BR: [
    {
      id: "brand-design",
      title: "Brand Design",
      description: "Develops the visual elements (logo, typography, color palette) that define a company's identity and voice",
      salaryRange: "$70K - $110K",
      growthPotential: "Moderate",
      growthPath: "Brand Designer → Senior Brand Designer → Creative Director / Brand Strategist",
      dailyWork: "Creating style guides, designing logos and visual assets, producing marketing and communication materials, ensuring brand consistency",
      keySkills: ["Adobe Creative Suite (Illustrator, Photoshop)", "Typography", "Color Theory", "Brand Strategy", "Print Production"],
      learningPaths: ["Foundational Graphic Design courses", "Brand Strategy certifications"],
    },
  ],
  UI: [
    {
      id: "ux-research",
      title: "UX Research",
      description: "Focuses on understanding user behaviors, needs, and motivations through observation, task analysis, and other feedback methodologies.",
      salaryRange: "$85K - $155K",
      growthPotential: "High",
      growthPath: "UX Researcher → Senior UX Researcher → Research Manager → Director of Research",
      dailyWork:
        "Planning and conducting user interviews, creating surveys, analyzing qualitative and quantitative data, creating user personas and journey maps, presenting findings to stakeholders.",
      keySkills: ["User Interviews", "Survey Design", "Qualitative Data Analysis", "Usability Testing", "Persona Creation"],
      learningPaths: ["Google UX Design Certificate", "UI/UX Design Specialization"],
    },
  ],
  IL: [
    {
      id: "illustration",
      title: "Illustration",
      description: "Creates visual images, drawings, or graphics for books, magazines, advertising, and digital media",
      salaryRange: "$50K - $90K (Salaried) / Highly Variable (Freelance)",
      growthPotential: "Moderate",
      growthPath: "Junior Illustrator → Illustrator → Senior Illustrator → Art Director",
      dailyWork: "Producing visual concepts based on client briefs, sketching, digital painting, creating storyboards, delivering production-ready artwork",
      keySkills: ["Drawing Proficiency", "Adobe Illustrator/Photoshop", "Digital Painting", "Conceptualization", "Time Management (for freelance)"],
      learningPaths: ["Specialized Illustration degrees or courses", "focused portfolio development"],
    },
  ],
  ID: [
    {
      id: "industrial-design",
      title: "Industrial Design",
      description: "Designs physical products (cars, electronics, furniture) for mass production, focusing on form, function, and user experience",
      salaryRange: "$75K - $125K",
      growthPotential: "Moderate",
      growthPath: "Junior Industrial Designer → Industrial Designer → Design Strategist / Design Director",
      dailyWork: "Sketching concepts, 3D modeling (CAD), prototyping, materials research, manufacturing feasibility analysis, human factors engineering",
      keySkills: ["3D CAD Software (SolidWorks, Rhino)", "Sketching", "Prototyping", "Materials Science", "Ergonomics"],
      learningPaths: ["Bachelor's/Master's Degree in Industrial Design", "Professional Certification in CAD Software"],
    },
  ],
  CM: [
    {
      id: "content-marketing",
      title: "Content Marketing",
      description: "Creates and distributes valuable, relevant, and consistent content (articles, videos, guides) to attract and retain a defined audience",
      salaryRange: "$65K - $105K",
      growthPotential: "High",
      growthPath: "Content Writer → Content Strategist → Content Marketing Manager → VP of Marketing",
      dailyWork: "Writing and editing content, developing content calendars, keyword research (SEO), measuring content performance, managing distribution channels",
      keySkills: ["SEO", "Copywriting", "Content Strategy", "Analytics (Google Analytics)", "Editing", "Storytelling"],
      learningPaths: ["Hubspot Content Marketing Certification", "specialized SEO courses"],
    },
  ],
  SM: [
    {
      id: "social-media-marketing",
      title: "Social Media Marketing",
      description: "Leverages social media platforms (Instagram, TikTok, LinkedIn) to build brand awareness, drive traffic, and generate leads",
      salaryRange: "$60K - $95K",
      growthPotential: "High",
      growthPath: "Social Media Coordinator → Social Media Specialist → Social Media Manager → Head of Audience/Community",
      dailyWork: "Creating daily content (posts, stories, reels), managing community engagement, running organic campaigns, analyzing platform metrics, staying current on trends",
      keySkills: ["Platform-Specific Strategy", "Community Management", "Content Creation (Canva/basic video editing)", "Analytics", "Crisis Communication"],
      learningPaths: ["Meta Certified Digital Marketing Associate", "specialized courses in platform analytics"],
    },
  ],
  PPC: [
    {
      id: "paid-advertising",
      title: "Paid Advertising",
      description: "Manages and optimizes paid campaigns (PPC, social ads) across platforms like Google, Meta, and others to drive conversions and ROI",
      salaryRange: "$75K - $120K",
      growthPotential: "High",
      growthPath: "Paid Media Specialist → Performance Marketing Manager → Director of Growth Marketing",
      dailyWork: "Creating and launching ad campaigns, A/B testing ad copy/creatives, budget management, bid optimization, reporting on key performance indicators (KPIs)",
      keySkills: ["Google Ads", "Meta Ads Manager", "Budget Management", "A/B Testing", "Conversion Rate Optimization (CRO)", "Analytics"],
      learningPaths: ["Google Ads Certifications", "Meta Blueprint Certifications"],
    },
  ],
  SA: [
    {
      id: "ux-analytics",
      title: "UX Analytics",
      description: "Measure and optimize user experience through data.",
      keySkills: ["Quantitative analysis", "A/B testing", "User behavior analytics", "Data visualization"],
      dailyWork: "Analyzing user metrics, running A/B tests, creating dashboards, making data-driven recommendations.",
      growthPath: "UX Analyst → Senior Analytics Designer → Analytics Lead → Head of UX Analytics",
      salaryRange: "$100K - $180K",
      growthPotential: "Very High",
      learningPaths: [
        "Google Analytics Professional Certificate",
        "Meta Data Analyst Professional Certificate",
        "Quantitative Research",
      ],
    },
  ],
  TC_PM: [
    {
      id: "technical-pm",
      title: "Technical Product Management Path (TC)",
      description: "Lead technical product development and engineering collaboration.",
      keySkills: ["Technical architecture", "API design", "System integration"],
      dailyWork: "Technical specifications, feature planning, engineering coordination.",
      growthPath: "Technical PM → Senior Technical PM → Director of Technical Product",
      salaryRange: "$130K - $220K",
      growthPotential: "Very High",
      learningPaths: ["Software Product Management Specialization", "API Product Management", "Cloud Architecture Fundamentals"],
    },
  ],
  TP: [
    {
      id: "traditional-pm",
      title: "Traditional Project Management",
      description: "Manages projects with a linear, sequential approach (Waterfall), emphasizing comprehensive planning and documentation upfront",
      salaryRange: "$90K - $140K",
      growthPotential: "Moderate",
      growthPath: "Project Coordinator → Project Manager → Senior PM → Program Manager / Portfolio Manager",
      dailyWork: "Defining scope and objectives, creating Gantt charts and timelines, managing budget and resources, risk management, maintaining detailed documentation",
      keySkills: ["Scope Management", "Budgeting", "Risk Assessment", "Waterfall Methodology", "Microsoft Project", "Communication"],
      learningPaths: ["Project Management Professional (PMP) Certification", "Certified Associate in Project Management (CAPM)"],
    },
  ],
  CX: [
    {
      id: "consumer-pm",
      title: "Consumer Product Management",
      description: "Focuses on products designed for the end-user market (e.g., mobile apps, social media platforms), emphasizing market fit and user experience",
      salaryRange: "$110K - $170K",
      growthPotential: "High",
      growthPath: "Associate PM → Product Manager → Group Product Manager → VP of Consumer Product",
      dailyWork: "Defining product vision/roadmap, gathering user feedback, writing user stories, prioritizing the backlog, conducting competitive analysis, managing product launch",
      keySkills: ["User Empathy", "Market Analysis", "Product Strategy", "User Story Writing", "Stakeholder Management", "Agile"],
      learningPaths: ["Product School Certifications", "Product Management courses/bootcamps"],
    },
  ],
  UI_DESIGN: [
    {
      id: "ui-design",
      title: "UI Design Path (UI)",
      description: "Create visually appealing and intuitive interfaces.",
      keySkills: ["Visual design principles", "Typography", "Color theory", "Prototyping tools (Figma, Sketch)"],
      dailyWork: "Creating UI mockups, Maintaining design systems, Visual design iteration, Collaborating with developers.",
      growthPath: "Junior UI Designer → Senior UI Designer → Lead Designer → Design Director",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: ["UI/UX Design Specialization", "Design Fundamentals", "Create High-Fidelity Designs and Prototypes in Figma"],
    },
  ],
  FS: [
    {
      id: "full-stack-development",
      title: "Full Stack Development",
      description: "Manages both the frontend and backend of a web application, from the database to the user interface",
      salaryRange: "$110K - $175K",
      growthPotential: "Very High",
      growthPath: "Junior Dev → Full Stack Developer → Senior Dev → Principal Engineer / CTO",
      dailyWork: "Database design, API development, UI component building, deployment and maintenance (DevOps), managing the entire application lifecycle",
      keySkills: ["HTML/CSS/JavaScript (React/Vue)", "Python/Node.js/Java", "Databases (SQL/NoSQL)", "Cloud Services", "DevOps (Docker/Kubernetes)"],
      learningPaths: ["Comprehensive Full Stack bootcamps/programs (e.g., MERN/MEAN stack)", "architecture training"],
    },
  ],
  BE: [
    {
      id: "backend-development",
      title: "Backend Development",
      description: "Builds and maintains the server-side logic, databases, and APIs that power the frontend application",
      salaryRange: "$105K - $160K",
      growthPotential: "High",
      growthPath: "Junior Dev → Backend Developer → Senior Dev → Backend Architect",
      dailyWork: "Designing and managing databases (SQL/NoSQL), writing server-side code (Python/Java/Node.js), building and securing APIs, cloud service management (AWS/Azure)",
      keySkills: ["Python/Java/Node.js/Go", "SQL/NoSQL Databases", "API Design", "Cloud Services (AWS/GCP)", "Security Principles"],
      learningPaths: ["Specialized courses in Python/Node.js backend frameworks (Django/Spring/Express)", "Cloud Certifications"],
    },
  ],
  DE_WEB: [
    {
      id: "ui-ux-development",
      title: "UI/UX Development",
      description: "A hybrid role focused on implementing the visual and interaction design (UI/UX) directly into high-quality, front-end code",
      salaryRange: "$95K - $150K",
      growthPotential: "High",
      growthPath: "UI Developer → Senior UI/UX Dev → Design Systems Engineer",
      dailyWork: "Translating design mockups (Figma) into responsive, pixel-perfect code, building and maintaining the component library (Design System), focusing on accessibility (A11y)",
      keySkills: ["HTML", "Advanced CSS/SASS", "JavaScript (React/Vue)", "Design Systems", "Web Accessibility (WCAG)", "Performance Tuning"],
      learningPaths: ["Focused courses on React/Vue component libraries", "Web Accessibility certifications"],
    },
  ],
  SEO: [
    {
      id: "seo-specialist",
      title: "Search Engine Optimization (SEO)",
      description: "Improves website visibility and ranking on search engines like Google through organic (non-paid) strategies.",
      salaryRange: "$60K - $100K",
      growthPotential: "High",
      growthPath: "SEO Specialist → SEO Manager → Head of SEO/Director of Acquisition",
      dailyWork:
        "Conducting keyword research, on-page optimization (content, meta tags), technical SEO audits (site speed, crawlability), link building, and analyzing performance with tools like Google Analytics.",
      keySkills: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building", "Google Analytics", "Content Strategy"],
      learningPaths: ["Google SEO Fundamentals", "Hubspot SEO Certification Course"],
    },
  ],
  FE: [
    {
      id: "frontend-development",
      title: "Frontend Development",
      description: "Builds the user-facing part of websites and web applications, focusing on user experience and visual design.",
      salaryRange: "$90K - $150K",
      growthPotential: "Very High",
      growthPath: "Junior Frontend Developer → Frontend Developer → Senior Frontend Developer → Frontend Architect/Lead",
      dailyWork:
        "Developing user interfaces with HTML, CSS, and JavaScript, working with frameworks like React or Vue, ensuring responsive design, and optimizing for performance.",
      keySkills: ["HTML", "CSS", "JavaScript", "React/Vue/Angular", "Responsive Design", "Performance Optimization"],
      learningPaths: ["Meta Front-End Developer Professional Certificate", "Complete JavaScript courses"],
    },
  ],
  UR: [
    {
      id: "ux-research",
      title: "UX Research",
      description: "Focuses on understanding user behaviors, needs, and motivations through observation, task analysis, and other feedback methodologies.",
      salaryRange: "$90K - $160K",
      growthPotential: "High",
      growthPath: "UX Researcher → Senior UX Researcher → Research Manager → Director of Research",
      dailyWork:
        "Planning and conducting user interviews, creating surveys, analyzing qualitative and quantitative data, creating user personas and journey maps, presenting findings to stakeholders.",
      keySkills: ["User Interviews", "Survey Design", "Qualitative Data Analysis", "Usability Testing", "Persona Creation"],
      learningPaths: ["Google UX Design Professional Certificate", "User Research – Methods and Best Practices"],
    },
  ],
}

const domainNames: Record<string, string> = {
  TC: "Technical",
  BM: "Business",
  HS: "Healthcare",
  CD: "Creative",
  ED: "Engineering",
  MC: "Marketing",
  NLP: "Natural Language Processing",
  CV: "Computer Vision",
  RL: "Reinforcement Learning",
  AIE: "AI Ethics & Governance",
  OF: "Offensive Security",
  DF: "Defensive Security",
  IR: "Incident Response",
  GC: "Governance & Compliance",
  DA: "Data Analysis",
  ML: "Machine Learning",
  DE: "Data Engineering",
  BI: "Business Intelligence",
  BR: "Brand Design",
  UI: "UI/UX Design", // This was correct, but good to confirm
  IL: "Illustration",
  ID: "Industrial Design",
  CM: "Content Marketing",
  SM: "Social Media Marketing",
  PPC: "Paid Advertising",
  SEO: "Search Engine Optimization",
  TP: "Traditional Project Management",
  CX: "Consumer Product Management",
  UR: "UX Research",
  "ui-design": "UI Design",
  SA: "UX Analytics",
  FE: "Frontend Development",
  BE: "Backend Development",
  FS: "Full Stack Development",
  DE_WEB: "UI/UX Development",
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const topDomainFromParams = searchParams.get("topDomain") as keyof typeof careerPaths | null

  const [selectedDomain, setSelectedDomain] = useState<keyof typeof careerPaths>(topDomainFromParams || "TC")
  const [selectedCareer, setSelectedCareer] = useState<(typeof careerPaths)[keyof typeof careerPaths][number]>(
    careerPaths[topDomainFromParams || "TC"][0],
  )

  const careers = careerPaths[selectedDomain] || []

  useEffect(() => {
    if (topDomainFromParams && careerPaths[topDomainFromParams]) {
      setSelectedDomain(topDomainFromParams)
      setSelectedCareer(careerPaths[topDomainFromParams][0])
    }
  }, [topDomainFromParams])

  const topDomainName = topDomainFromParams ? domainNames[topDomainFromParams] : null
  const topCareer = topDomainFromParams ? careerPaths[topDomainFromParams]?.[0] : null

  const handleDomainSelect = (key: string) => {
    const domainKey = key as keyof typeof careerPaths
    const careerList = careerPaths[domainKey]
    if (careerList && careerList.length > 0) {
      setSelectedDomain(domainKey)
      setSelectedCareer(careerList[0])
    } else {
      // Fallback if a domain has no careers defined (should not happen with current data)
      setSelectedDomain("TC")
      setSelectedCareer(careerPaths.TC[0])
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Career Recommendations</h1>
              <p className="text-muted-foreground mt-1">Explore career paths across different domains</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {topDomainName && topCareer && (
          <div className="mb-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Your Personalized Recommendation</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-center mb-8">
              Based on your assessment, your strongest alignment is with the{" "}
              <span className="font-bold text-primary">{topDomainName}</span> domain. A career path like{" "}
              <span className="font-bold text-primary">{topCareer.title}</span> could be an excellent fit for you.
            </p>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Roadmap for a {topCareer.title}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Skills to Master</h4>
                  <div className="flex flex-wrap gap-2">
                    {topCareer.keySkills.map((skill: string) => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Typical Growth Path</h4>
                  <p className="text-muted-foreground">{topCareer.growthPath}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Recommended Learning</h4>
                  <p className="text-muted-foreground">{topCareer.learningPaths[0]}</p>
                </div>
              </div>
              <Link href={`/dashboard?course=${topCareer.id}`} className="block mt-6">
                <Button className="w-full">Explore More Resources <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        )}
        {/* Domain Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Select a Domain</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {Object.entries(domainNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => handleDomainSelect(key)}
                className={`p-4 rounded-lg border-2 transition-all font-medium ${
                  selectedDomain === key
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Career Selection and Details */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {/* Left: Career List */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-foreground mb-4">Career Paths</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {careers.map((career: any) => (
                <button
                  key={career.id}
                  onClick={() => setSelectedCareer(career)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCareer.id === career.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <h4 className="font-semibold text-foreground text-sm">{career.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{career.salaryRange}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Career Details */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">{selectedCareer.title}</h2>
              <p className="text-muted-foreground mb-6">{selectedCareer.description}</p>

              {/* Key Info */}
              <div className="grid gap-6 md:grid-cols-2 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                  <p className="text-xl font-bold text-foreground">{selectedCareer.salaryRange}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Growth Potential</p>
                  <p className="text-xl font-bold text-foreground">{selectedCareer.growthPotential}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Growth Path</p>
                  <p className="text-lg font-semibold text-foreground">{selectedCareer.growthPath}</p>
                </div>
              </div>

              {/* Daily Work */}
              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Daily Work</h4>
                <p className="text-muted-foreground">{selectedCareer.dailyWork}</p>
              </div>

              {/* Key Skills */}
              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Key Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.keySkills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Paths */}
              <div className="mb-8">
                <h4 className="font-bold text-foreground mb-3">Recommended Learning Paths</h4>
                <div className="space-y-2">
                  {selectedCareer.learningPaths.map((path: string) => (
                    <div key={path} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{path}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href={`/dashboard?course=${selectedCareer.id}`}>
                <Button className="w-full">
                  Explore Learning Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Your Next Steps</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Learn New Skills</h4>
              <p className="text-sm text-muted-foreground">Explore recommended courses and certifications</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Find Job rOpportunities</h4>
              <p className="text-sm text-muted-foreground">Browse positions matching your career path</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Track Your Progress</h4>
              <p className="text-sm text-muted-foreground">Monitor your career development journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    // Wrap the component that uses `useSearchParams` in a Suspense boundary
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  )
}
