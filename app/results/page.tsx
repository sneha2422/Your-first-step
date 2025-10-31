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
      id: "ux-ui-designer",
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
  TP: [
    {
      id: "traditional-pm",
      title: "Traditional Project Management",
      description: "Focus on structured project planning and execution using established methodologies.",
      keySkills: ["Project planning", "Risk management", "Scope management", "Budgeting"],
      dailyWork: "Creating project plans, managing resources, tracking progress, ensuring deliverables.",
      growthPath: "Project Coordinator → Project Manager → Senior PM → Program Manager",
      salaryRange: "$80K - $150K",
      growthPotential: "High",
      learningPaths: [
        "PMI-PMP Certification Training Course Specialization",
        "Google Project Management Professional Certificate",
        "Practice Exam for CAPM Certification",
      ],
    },
  ],
  AG: [
    {
      id: "agile-pm",
      title: "Agile Project Management",
      description: "Lead iterative, adaptive projects using Agile frameworks.",
      keySkills: ["Scrum/Kanban", "Sprint planning", "Agile", "Continuous improvement"],
      dailyWork: "Sprint management, team facilitation, removing blockers, delivering incremental value.",
      growthPath: "Scrum Master → Agile Coach → Agile Transformation Lead",
      salaryRange: "$95K - $175K",
      growthPotential: "Very High",
      learningPaths: ["Scrum Master Certification Specialization", "Agile Leadership Specialization", "Agile Project Management"],
    },
  ],
  ST: [
    {
      id: "strategic-pm",
      title: "Strategic Project Management",
      description: "Align projects with organizational strategy and business objectives.",
      keySkills: ["Portfolio management", "Strategic planning", "Business analysis", "ROI optimization"],
      dailyWork: "Portfolio prioritization, resource optimization, strategic alignment.",
      growthPath: "Strategic Project Manager → Portfolio Manager → PMO Director",
      salaryRange: "$110K - $190K",
      growthPotential: "Very High",
      learningPaths: [
        "Program Management Professional PMI-PgMP Certification Prep Specialization",
        "Strategic Leadership and Management Specialization",
        "Business Strategy Specialization",
      ],
    },
  ],
  UR: [
    {
      id: "ux-research",
      title: "UX Research",
      description: "Understand user behaviors, needs, and motivations.",
      keySkills: ["Qualitative research methods", "User interviewing", "Usability testing", "Research synthesis"],
      dailyWork: "Conducting user interviews, running usability studies, creating research plans, presenting findings.",
      growthPath: "UX Researcher → Senior UX Researcher → Research Lead → Head of User Research",
      salaryRange: "$90K - $160K",
      growthPotential: "High",
      learningPaths: [
        "Google UX Design Professional Certificate",
        "User Experience Research and Design Specialization",
        "Qualitative Research Methods",
      ],
    },
  ],
  IX: [
    {
      id: "interaction-design",
      title: "Interaction Design (IX)",
      description: "Design how users interact with products and services.",
      keySkills: ["User flows", "Information architecture", "Interaction patterns", "Wireframing", "Prototyping"],
      dailyWork: "Creating user flows, designing interactions, building wireframes, prototyping solutions.",
      growthPath: "Interaction Designer → Senior IxD → Lead Interaction Designer → Product Design Director",
      salaryRange: "$95K - $170K",
      growthPotential: "High",
      learningPaths: ["Interaction Design Specialization", "Web Design: Strategy and Information Architecture"],
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
  BU: [
    {
      id: "growth-pm",
      title: "Growth Product Management Path (BU)",
      description: "Drive product growth and business metrics.",
      keySkills: ["Analytics", "A/B testing", "Monetization strategy"],
      dailyWork: "Growth experiments, metric analysis, revenue optimization.",
      growthPath: "Growth PM → Senior Growth PM → Head of Growth",
      salaryRange: "$120K - $200K",
      growthPotential: "Very High",
      learningPaths: ["Product Analytics and AI", "Business Growth Strategies", "Strategic Product Development"],
    },
  ],
  CX: [
    {
      id: "consumer-pm",
      title: "Consumer Product Management Path (CX)",
      description: "Create exceptional user experiences.",
      keySkills: ["User research", "UX design", "Behavioral analytics"],
      dailyWork: "Feature development, user testing, experience optimization.",
      growthPath: "Product Manager → Senior PM → Director of Product",
      salaryRange: "$110K - $190K",
      growthPotential: "High",
      learningPaths: [
        "User Experience Research & Design Specialization",
        "Market Research and Consumer Behavior",
        "Product Ideation, Design, and Management Specialization",
      ],
    },
  ],
  ST_PM: [
    {
      id: "strategic-pm-path",
      title: "Strategic Product Management Path (ST)",
      description: "Define product vision and strategy.",
      keySkills: ["Market analysis", "Strategic planning", "Stakeholder management"],
      dailyWork: "Roadmap planning, competitive analysis, strategic initiatives.",
      growthPath: "Strategic PM → Senior PM → VP of Product",
      salaryRange: "$140K - $230K",
      growthPotential: "Very High",
      learningPaths: ["Strategic Product Development", "Strategic Leadership and Management Specialization"],
    },
  ],
  UI_DESIGN: [
    {
      id: "ui-design-path",
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
  FE: [
    {
      id: "frontend-dev-path",
      title: "Frontend Development Path (FE)",
      description: "Create engaging user interfaces and interactions.",
      keySkills: ["HTML5", "CSS3", "JavaScript", "Frontend frameworks (React/Vue/Angular)"],
      dailyWork: "UI implementation, responsive design, frontend optimization.",
      growthPath: "Junior Frontend Developer → Senior Frontend Developer → Frontend Architect",
      salaryRange: "$90K - $170K",
      growthPotential: "Very High",
      learningPaths: ["Frontend Web Development Specialization", "React Basics", "Meta Front-End Developer Professional Certificate"],
    },
  ],
  BE: [
    {
      id: "backend-dev-path",
      title: "Backend Development Path (BE)",
      description: "Build server-side applications and systems.",
      keySkills: ["Server-side languages (Node.js/Python/Java)", "Databases", "APIs"],
      dailyWork: "API development, database design, server optimization.",
      growthPath: "Backend Developer → Senior Backend Engineer → Solutions Architect",
      salaryRange: "$100K - $180K",
      growthPotential: "Very High",
      learningPaths: ["IBM Back-End Development Professional Certificate", "Meta Back-End Developer Professional Certificate", "Cloud Computing Specialization"],
    },
  ],
  FS: [
    {
      id: "fullstack-dev-path",
      title: "Full Stack Development Path (FS)",
      description: "Handle end-to-end web application development.",
      keySkills: ["Frontend + Backend technologies", "DevOps", "System architecture"],
      dailyWork: "Full application development, deployment, maintenance.",
      growthPath: "Full Stack Developer → Senior Full Stack Engineer → Technical Lead",
      salaryRange: "$110K - $200K",
      growthPotential: "Very High",
      learningPaths: ["IBM Full Stack Software Developer Professional Certificate", "IBM DevOps and Software Engineering Professional Certificate"],
    },
  ],
  DE_WEB: [
    {
      id: "ui-ux-dev-path",
      title: "UI/UX Development Path (DE)",
      description: "Create user-centered design solutions.",
      keySkills: ["UI design principles", "UX research", "Frontend development"],
      dailyWork: "Prototyping, user testing, design implementation.",
      growthPath: "UI Developer → Senior UI/UX Developer → Design Systems Engineer",
      salaryRange: "$95K - $175K",
      growthPotential: "High",
      learningPaths: ["UI/UX Design Specialization", "Design Thinking Specialization", "Web Accessibility Fundamentals"],
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
  UI: "UI/UX Design",
  IL: "Illustration",
  ID: "Industrial Design",
  CM: "Content Marketing",
  SM: "Social Media Marketing",
  PPC: "Paid Advertising",
  SEO: "Search Engine Optimization",
  TP: "Traditional Project Management",
  AG: "Agile Project Management",
  TC_PM: "Technical Product Management",
  BU: "Growth Product Management",
  CX: "Consumer Product Management",
  ST_PM: "Strategic Product Management",
  UR: "UX Research",
  IX: "Interaction Design",
  UI_DESIGN: "UI Design",
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
          <div className="mb-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Your Personalized Recommendation</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Based on your assessment, your strongest alignment is with the{" "}
              <span className="font-bold text-primary">{topDomainName}</span> domain. A career path like{" "}
              <span className="font-bold text-primary">{topCareer.title}</span> could be an excellent fit for you, offering great potential for progress and satisfaction.
            </p>
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

              <Link href="/dashboard">
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
              <h4 className="font-semibold text-foreground mb-2">Find Job Opportunities</h4>
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
