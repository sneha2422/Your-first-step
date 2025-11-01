"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const quizzes = [
  {
    id: "general",
    title: "Career Test: What Career is Right for Me?",
    description: "Discover your ideal career path with this comprehensive assessment",
    duration: "5-10 minutes",
    questions: 20,
    icon: "🎯",
  },
  {
    id: "ai",
    title: "AI Career Quiz",
    description: "Explore opportunities in artificial intelligence and machine learning",
    duration: "3-5 minutes",
    questions: 10,
    icon: "🤖",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Career Quiz",
    description: "Find your place in the world of digital protection.",
    duration: "5-10 minutes",
    questions: 10,
    icon: "🔒",
  },
  {
    id: "data-science",
    title: "Data Science Career Quiz",
    description: "Find your ideal role in the world of data.",
    duration: "5-10 minutes",
    questions: 10,
    icon: "📊",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Career Quiz",
    description: "Discover your ideal role in the world of digital marketing.",
    duration: "5-10 minutes",
    questions: 10,
    icon: "📱",
  },
  {
    id: "graphic-design",
    title: "Graphic Design Career Quiz",
    description: "Explore your creative potential in visual design.",
    duration: "5-10 minutes",
    questions: 10,
    icon: "🎨",
  },
  {
    id: "machine-learning",
    title: "Machine Learning Career Quiz",
    description: "Test your interest in building intelligent systems.",
    duration: "5-10 minutes",
    questions: 10,
    icon: "⚙️",
  },
  {
    id: "product-management",
    title: "Product Management Career Quiz",
    description: "Assess your fit for leading product strategy and development.",
    duration: "5-10 minutes",
    questions: 10,
    icon: "📦",
  },
  {
    id: "project-management",
    title: "Project Management Career Quiz",
    description: "Explore leadership and project coordination opportunities",
    duration: "5-10 minutes",
    questions: 10,
    icon: "📋",
  },
  {
    id: "ux",
    title: "UX Career Quiz",
    description: "Discover if user experience design is your calling",
    duration: "3-5 minutes",
    questions: 10,
    icon: "✨",
  },
  {
    id: "web-development",
    title: "Web Developer Career Quiz",
    description: "Test your interest in building web applications",
    duration: "3-5 minutes",
    questions: 10,
    icon: "💻",
  },
]

const generalQuestions = [
  {
    id: 1,
    section: "Work Style & Environment",
    question: "Your ideal work environment is one where:",
    options: [
      "Quiet focused spaces",
      "Strategy rooms and boardrooms",
      "Care-centered facilities",
      "Open creative studios",
      "Hands-on technical workspaces",
      "Team collaboration hubs",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 2,
    section: "Work Style & Environment",
    question: "When solving problems, you prefer to:",
    options: [
      "Take things apart to find the source",
      "Look at the numbers and track patterns",
      "Talk to people to understand needs",
      "Draw out or map different solutions",
      "Start small and test each piece",
      "Gather feedback to find the best approach",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 3,
    section: "Work Style & Environment",
    question: "You're most energized when:",
    options: [
      "Working through complex code",
      "Optimizing business performance",
      "Improving patient outcomes",
      "Exploring design concepts",
      "Building working solutions",
      "Shaping market trends",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 4,
    section: "Work Style & Environment",
    question: "In team settings, you naturally:",
    options: [
      "Find system weaknesses",
      "Guide team priorities",
      "Foster collaboration",
      "Drive creative vision",
      "Design solutions",
      "Craft compelling stories",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 5,
    section: "Work Style & Environment",
    question: "You excel at handling:",
    options: [
      "Complex technical puzzles",
      "Making key decisions",
      "People's wellbeing needs",
      "Pushing creative limits",
      "Developing systems and structures",
      "Analyzing trend shifts and changes",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 6,
    section: "Skills & Abilities",
    question: "Your strongest natural abilities are:",
    options: [
      "Mathematical and logical thinking",
      "Strategic planning and analysis",
      "Understanding people's needs",
      "Visual and creative expression",
      "Technical problem-solving",
      "Communication and persuasion",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 7,
    section: "Skills & Abilities",
    question: "When analyzing information, you excel at:",
    options: [
      "Finding patterns in data",
      "Connecting market signals and ROI",
      "Recognizing care patterns",
      "Visualizing user flows",
      "Detecting technical issues",
      "Understanding consumer behavior",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 8,
    section: "Skills & Abilities",
    question: "Your approach to learning new skills is:",
    options: [
      "Deep technical immersion",
      "Business scenario analysis",
      "Through practice scenarios",
      "By experimenting creatively",
      "Through technical documentation",
      "Industry trend research",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 9,
    section: "Skills & Abilities",
    question: "In challenging situations, you typically:",
    options: [
      "Troubleshoot systematically",
      "Assess risks and opportunities",
      "Focus on people's wellbeing",
      "Try different approaches",
      "Build step-by-step solutions",
      "Find consensus and alignment",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 10,
    section: "Skills & Abilities",
    question: "Your problem-solving strength is:",
    options: [
      "Test hypotheses and isolate issues",
      "Model scenarios and calculate risk",
      "Balance patient and staff needs",
      "Push boundaries and explore edges",
      "Design systems and scale processes",
      "Study behaviors and drive actions",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 11,
    section: "Knowledge & Interests",
    question: "You most enjoy learning about:",
    options: [
      "How things work",
      "What drives success",
      "Ways to improve wellbeing",
      "New creative techniques",
      "Building better solutions",
      "Why people make choices",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 12,
    section: "Knowledge & Interests",
    question: "When reading for work, you prefer:",
    options: [
      "Code documentation and guides",
      "Financial reports and news",
      "Patient care studies",
      "Design portfolios",
      "System specifications",
      "Consumer data and research",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 13,
    section: "Knowledge & Interests",
    question: "You're most likely to take courses in:",
    options: [
      "Software development",
      "Financial modeling",
      "Clinical management",
      "User experience design",
      "Structure design",
      "Campaign design",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 14,
    section: "Knowledge & Interests",
    question: "Your internet browsing often includes:",
    options: [
      "Code libraries and forums",
      "Investment trends",
      "Healthcare discoveries",
      "Creative inspiration",
      "New technologies",
      "Marketing trends",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 15,
    section: "Knowledge & Interests",
    question: "You're most motivated by:",
    options: [
      "Building innovative solutions",
      "Driving business growth",
      "Helping others",
      "Creating beautiful things",
      "Solving complex problems",
      "Influencing people",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 16,
    section: "Career Goals",
    question: "In your ideal career, you would:",
    options: [
      "Work with cutting-edge technology",
      "Lead strategic initiatives",
      "Make a direct impact on people",
      "Express creativity daily",
      "Build scalable systems",
      "Connect with diverse audiences",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 17,
    section: "Career Goals",
    question: "Your career success would be measured by:",
    options: [
      "Technical excellence",
      "Business impact and ROI",
      "Lives improved",
      "Creative recognition",
      "System reliability",
      "Market influence",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 18,
    section: "Career Goals",
    question: "The work environment that appeals to you most is:",
    options: [
      "Fast-paced tech company",
      "Corporate strategy team",
      "Healthcare organization",
      "Creative agency",
      "Engineering firm",
      "Marketing department",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 19,
    section: "Career Goals",
    question: "You prefer working on projects that are:",
    options: [
      "Technically challenging",
      "Strategically important",
      "Socially impactful",
      "Visually compelling",
      "Structurally complex",
      "Market-driven",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
  {
    id: 20,
    section: "Career Goals",
    question: "Your ideal role would involve:",
    options: [
      "Deep technical work",
      "Strategic decision-making",
      "Direct client care",
      "Creative direction",
      "System architecture",
      "Business development",
    ],
    domains: ["TC", "BM", "HS", "CD", "ED", "MC"],
  },
]

const cybersecurityQuestions = [
  {
    id: 1,
    section: "Core Interest",
    question: "When thinking about cybersecurity, what interests you most?",
    options: [
      "Finding and exploiting weaknesses to help fix them",
      "Protecting systems from potential attacks",
      "Responding to and investigating security incidents",
      "Creating and managing security policies",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 2,
    section: "Preferred Activities",
    question: "Which activity sounds most appealing?",
    options: [
      "Testing systems for vulnerabilities",
      "Building strong defensive systems",
      "Analyzing security breaches",
      "Developing security strategies",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 3,
    section: "Situational Preference",
    question: "In a security situation, you would prefer to:",
    options: [
      "Think like an attacker to prevent attacks",
      "Monitor and maintain security systems",
      "Lead the response to security incidents",
      "Ensure compliance with security standards",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 4,
    section: "Personal Traits",
    question: "Which statement best describes you?",
    options: [
      "I enjoy solving complex puzzles and finding hidden problems",
      "I'm detail-oriented and focused on prevention",
      "I work well under pressure and am good at investigation",
      "I excel at organizing and implementing processes",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 5,
    section: "Work Environment",
    question: "What type of work environment do you prefer?",
    options: [
      "Dynamic and challenging",
      "Structured and methodical",
      "Fast-paced and investigative",
      "Strategic and collaborative",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 6,
    section: "Skill Development",
    question: "Which skill would you most like to develop?",
    options: [
      "Ethical hacking and penetration testing",
      "Network security and system hardening",
      "Digital forensics and malware analysis",
      "Risk assessment and compliance",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 7,
    section: "Team Role",
    question: "In a team project, you naturally tend to:",
    options: [
      "Look for potential problems and weaknesses",
      "Implement protective measures and safeguards",
      "Handle emergencies and unexpected issues",
      "Establish guidelines and best practices",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 8,
    section: "Technology Interest",
    question: "What interests you most about technology?",
    options: [
      "Understanding how systems can be compromised",
      "Learning about new security technologies",
      "Investigating and analyzing incidents",
      "Managing and improving security processes",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 9,
    section: "Achievement Motivation",
    question: "Which achievement would make you proudest?",
    options: [
      "Finding a critical security vulnerability before it's exploited",
      "Successfully preventing a major security breach",
      "Solving a complex security incident",
      "Implementing a comprehensive security program",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
  {
    id: 10,
    section: "Learning Style",
    question: "How do you prefer to learn new things?",
    options: [
      "Through hands-on experimentation",
      "By studying established best practices",
      "Through real-world case studies",
      "By understanding frameworks and methodologies",
    ],
    domains: ["OF", "DF", "IR", "GC"],
  },
]

const dataScienceQuestions = [
  {
    id: 1,
    section: "Learning Style",
    question: "When trying to understand something new, you prefer:",
    options: [
      "Looking for patterns and connections in information",
      "Experimenting to see if you can predict outcomes",
      "Organizing information into clear structures",
      "Creating diagrams or charts to explain it to others",
    ],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 2,
    section: "Academic Interest",
    question: "Which school subject did/do you enjoy most?",
    options: ["Math and Statistics", "Computer Science or Physics", "Information Technology or Engineering", "Business or Economics"],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 3,
    section: "Team Role",
    question: "In group projects, you naturally:",
    options: [
      "Ask questions and investigate problems",
      "Come up with innovative solutions",
      "Organize and structure the work",
      "Present findings to the group",
    ],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 4,
    section: "Problem-Solving Preference",
    question: "When solving puzzles, you prefer ones that:",
    options: [
      "Require careful observation and analysis",
      "Challenge you to figure out complex patterns",
      "Need systematic organizing and sorting",
      "Involve visual problem-solving",
    ],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 5,
    section: "Job Satisfaction",
    question: "You're most satisfied when:",
    options: [
      "Finding the answer to a tricky question",
      "Creating something that works automatically",
      "Making a complex system run smoothly",
      "Helping others understand complex information",
    ],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 6,
    section: "Technical Inclination",
    question: "When using your phone/computer, you often think about:",
    options: [
      "How to better organize your information",
      "How the device predicts your preferences",
      "How all the apps work together",
      "How to customize displays and layouts",
    ],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 7,
    section: "Personal Traits",
    question: "Your friends would describe you as:",
    options: ["Analytical and thorough", "Innovative and experimental", "Organized and practical", "Visual and communicative"],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 8,
    section: "Information Consumption",
    question: "When reading news, you tend to:",
    options: [
      "Look for facts and evidence",
      "Think about future implications",
      "Consider how different stories connect",
      "Focus on charts and visual information",
    ],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 9,
    section: "Strategic Thinking",
    question: "In a game or sport, you enjoy:",
    options: ["Analyzing strategies and statistics", "Predicting opponent's moves", "Planning and coordinating team plays", "Reviewing game footage and highlights"],
    domains: ["DA", "ML", "DE", "BI"],
  },
  {
    id: 10,
    section: "Decision Making",
    question: "When making decisions, you prefer to:",
    options: ["Gather all available information first", "Try new approaches and learn from results", "Follow a clear, structured process", "Look at trends and visual patterns"],
    domains: ["DA", "ML", "DE", "BI"],
  },
]

const aiQuestions = [
  {
    id: 1,
    section: "Learning Preference",
    question: "When learning about AI, you prefer:",
    options: [
      "Analyzing language patterns and structures",
      "Understanding visual information processing",
      "Exploring decision-making processes",
      "Considering broader implications and impacts",
    ],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 2,
    section: "Technical Interest",
    question: "Which technical background interests you most?",
    options: [
      "Programming and linguistics",
      "Mathematics and signal processing",
      "Statistics and probability",
      "Philosophy and computer science",
    ],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 3,
    section: "Project Role",
    question: "In projects, you naturally:",
    options: [
      "Ask questions and analyze information",
      "Build and test prototypes",
      "Experiment and iterate solutions",
      "Plan and coordinate with others",
    ],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 4,
    section: "Challenges",
    question: "Which challenge excites you most?",
    options: [
      "Making machines understand context",
      "Teaching computers to see",
      "Creating adaptive systems",
      "Ensuring AI fairness",
    ],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 5,
    section: "Ideal Work",
    question: "Your ideal work involves:",
    options: [
      "Processing and analyzing text",
      "Working with visual data",
      "Building learning systems",
      "Developing AI policies",
    ],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 6,
    section: "Core Interest",
    question: "You're most interested in:",
    options: ["Language and communication", "Pattern recognition", "Decision optimization", "Social impact"],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 7,
    section: "Problem Solving",
    question: "Your approach to problems is:",
    options: ["Analytical and linguistic", "Visual and systematic", "Experimental and iterative", "Philosophical and practical"],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 8,
    section: "Data Preference",
    question: "You prefer working with:",
    options: ["Text and speech data", "Images and videos", "Interactive systems", "Policy frameworks"],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 9,
    section: "Development Focus",
    question: "In AI development, you focus on:",
    options: [
      "Improving language understanding",
      "Enhancing visual perception",
      "Optimizing learning strategies",
      "Ensuring responsible development",
    ],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
  {
    id: 10,
    section: "Impact",
    question: "Your preferred impact would be:",
    options: [
      "Making communication more accessible",
      "Advancing computer perception",
      "Creating smarter autonomous systems",
      "Shaping ethical AI practices",
    ],
    domains: ["NLP", "CV", "RL", "AIE"],
  },
]

const digitalMarketingQuestions = [
  {
    id: 1,
    section: "Content Preference",
    question: "When creating digital content, you prefer:",
    options: [
      "Creating visuals and videos",
      "Managing social media engagement",
      "Optimizing ad copy and keywords",
      "Analyzing search data and trends",
    ],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 2,
    section: "Core Interest",
    question: "Which interests you most?",
    options: [
      "Storytelling and brand messaging",
      "Social media and viral trends",
      "Advertising and campaign management",
      "Website performance and search rankings",
    ],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 3,
    section: "Team Role",
    question: "In a team project, you naturally:",
    options: [
      "Come up with creative ideas",
      "Manage relationships and communication",
      "Track metrics and measure success",
      "Research and implement best practices",
    ],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 4,
    section: "Tool Preference",
    question: "Which tool sounds most interesting?",
    options: [
      "Content management systems",
      "Social media scheduling platforms",
      "Ad campaign managers",
      "Website analytics tools",
    ],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 5,
    section: "Satisfaction Driver",
    question: "You're most satisfied when:",
    options: [
      "Creating content people love",
      "Growing an engaged community",
      "Improving conversion rates",
      "Increasing organic traffic",
    ],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 6,
    section: "Marketing Aspect",
    question: "What aspect of marketing interests you?",
    options: ["Creating compelling narratives", "Building brand presence", "Managing marketing budgets", "Improving search visibility"],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 7,
    section: "Personal Trait",
    question: "Your friends would describe you as:",
    options: ["Creative and expressive", "Outgoing and sociable", "Analytical and strategic", "Technical and detail-oriented"],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 8,
    section: "Metrics of Interest",
    question: "Which metrics interest you most?",
    options: ["Content engagement rates", "Social media reach and shares", "Cost per click and ROI", "Rankings and organic traffic"],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 9,
    section: "Ideal Workday",
    question: "Your ideal workday involves:",
    options: ["Writing and editing content", "Managing social media channels", "Optimizing ad campaigns", "Analyzing website performance"],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
  {
    id: 10,
    section: "Learning Style",
    question: "When learning something new, you prefer to:",
    options: ["Express it creatively", "Share it with others", "Test and measure results", "Research and document it"],
    domains: ["CM", "SM", "PPC", "SEO"],
  },
]

const graphicDesignQuestions = [
  {
    id: 1,
    section: "Design Perception",
    question: "When looking at designs, you tend to notice:",
    options: [
      "The overall emotional impact and message",
      "How easy it is to understand and navigate",
      "The style and artistic elements",
      "How the product packaging stands out",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 2,
    section: "Appealing Activities",
    question: "Which activity sounds most appealing?",
    options: [
      "Creating a company's visual identity",
      "Designing an app that's enjoyable to use",
      "Drawing characters or scenes",
      "Designing product labels and packages",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 3,
    section: "Work Environment",
    question: "Your ideal work environment would be:",
    options: [
      "An advertising agency with diverse clients",
      "A tech company's design team",
      "A publishing house or media company",
      "A consumer products company",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 4,
    section: "Skill Development",
    question: "Which skills would you most enjoy developing?",
    options: [
      "Typography and logo design",
      "User research and interface design",
      "Digital illustration and character design",
      "3D modeling and packaging design",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 5,
    section: "Project Approach",
    question: "When starting a project, you prefer to:",
    options: [
      "Research the client's brand and audience",
      "Map out user flows and interactions",
      "Sketch concepts and gather visual inspiration",
      "Study market trends and competitor products",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 6,
    section: "Core Interest",
    question: "Which interests you more?",
    options: [
      "Creating consistent brand experiences",
      "Making websites more user-friendly",
      "Telling stories through visuals",
      "Creating eye-catching product displays",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 7,
    section: "Natural Talent",
    question: "Your friends often ask you to help with:",
    options: [
      "Creating logos or business cards",
      "Making their website more intuitive",
      "Drawing or creating artwork",
      "Designing event materials or merchandise",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 8,
    section: "Exciting Challenges",
    question: "Which challenge excites you most?",
    options: [
      "Making a brand stand out in a crowded market",
      "Simplifying complex user interactions",
      "Creating unique visual styles",
      "Designing sustainable packaging solutions",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 9,
    section: "Tool Preference",
    question: "Which tools interest you most?",
    options: [
      "Vector graphics and layout software",
      "Prototyping and wireframing tools",
      "Digital painting and illustration software",
      "3D modeling and rendering tools",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
  {
    id: 10,
    section: "Source of Pride",
    question: "What would make you feel most proud?",
    options: [
      "Creating a logo or design that perfectly captures a company's personality",
      "Making something complicated feel simple and easy to use",
      "Having others emotionally connect with your artwork",
      "Seeing your design idea come to life as a physical object",
    ],
    domains: ["BR", "UI", "IL", "ID"],
  },
]

const machineLearningQuestions = [
  {
    id: 1,
    section: "Data Focus",
    question: "When working with data, you tend to focus most on:",
    options: [
      "Building systems that can learn and improve automatically",
      "Finding hidden patterns and making predictions",
      "Developing new algorithms and approaches",
      "Understanding and communicating insights from data",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 2,
    section: "Appealing Activities",
    question: "Which activity sounds most appealing?",
    options: [
      "Deploying models in production environments",
      "Solving business problems with data-driven solutions",
      "Publishing papers on new machine learning techniques",
      "Creating clear visualizations of complex data",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 3,
    section: "Project Role",
    question: "In technical projects, you naturally tend to:",
    options: [
      "Focus on system architecture and scalability",
      "Balance technical depth with business impact",
      "Dive deep into theoretical foundations",
      "Translate technical findings for non-technical audiences",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 4,
    section: "Personal Description",
    question: "Which statement best describes you?",
    options: [
      "I enjoy building and optimizing complex systems",
      "I like finding actionable insights in data",
      "I'm passionate about advancing the field through research",
      "I excel at making data meaningful to others",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 5,
    section: "Core Interest in AI/ML",
    question: "What interests you most about AI/ML?",
    options: [
      "Creating efficient and scalable ML systems",
      "Using ML to solve real-world problems",
      "Understanding the mathematics behind algorithms",
      "Making AI/ML more accessible to everyone",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 6,
    section: "Initial Approach",
    question: "When faced with a new dataset, you first think about:",
    options: [
      "How to process and pipeline the data efficiently",
      "What questions we could answer with this data",
      "What novel approaches could be applied",
      "How to clean and validate the data",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 7,
    section: "Enjoyable Tasks",
    question: "Which would you enjoy most?",
    options: [
      "Optimizing model performance and deployment",
      "Building end-to-end ML solutions",
      "Experimenting with cutting-edge algorithms",
      "Creating insightful data stories",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 8,
    section: "Problem-Solving Appeal",
    question: "What aspect of problem-solving appeals to you?",
    options: [
      "Building scalable solutions",
      "Finding the right balance of accuracy and practicality",
      "Developing novel theoretical approaches",
      "Making complex problems understandable",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 9,
    section: "Proudest Achievement",
    question: "Which achievement would make you proudest?",
    options: [
      "Deploying a model that serves millions of users",
      "Solving a critical business problem with ML",
      "Publishing a breakthrough research paper",
      "Creating a dashboard that drives key decisions",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
  {
    id: 10,
    section: "Learning Excitement",
    question: "What excites you most about learning new things?",
    options: [
      "Applying engineering best practices to ML",
      "Combining different approaches to solve problems",
      "Understanding theoretical foundations",
      "Sharing knowledge with others",
    ],
    domains: ["MLE", "DS", "RA", "DA_ML"],
  },
]

const productManagementQuestions = [
  {
    id: 1,
    section: "Product Focus",
    question: "When looking at products, you focus most on:",
    options: [
      "Technical features and capabilities",
      "User experience and customer needs",
    ],
    domains: ["TC_PM", "CX"],
  },
  {
    id: 2,
    section: "Activity Interest",
    question: "Which activity interests you most?",
    options: [
      "Understanding complex technical systems",
      "Conducting user research and interviews",
    ],
    domains: ["TC_PM", "CX"],
  },
  {
    id: 3,
    section: "Strongest Skill",
    question: "Your strongest skill is:",
    options: ["Technical problem-solving", "Financial analysis and planning", "Understanding user behavior", "Strategic thinking and planning"],
    domains: ["TC_PM", "CX", "CX", "TC_PM"],
  },
  {
    id: 4,
    section: "Meeting Role",
    question: "In meetings, you often:",
    options: [
      "Discuss technical feasibility and implementation",
      "Advocate for user needs and feedback",
    ],
    domains: ["TC_PM", "CX"],
  },
  {
    id: 5,
    section: "Motivation",
    question: "What motivates you most?",
    options: [
      "Building innovative technical solutions",
      "Solving real user problems",
    ],
    domains: ["TC_PM", "CX"],
  },
  {
    id: 6,
    section: "Collaboration Preference",
    question: "You prefer working with:",
    options: [
      "Engineering and development teams",
      "UX researchers and designers",
    ],
    domains: ["TC_PM", "CX"],
  },
  {
    id: 7,
    section: "Ideal Project",
    question: "Your ideal project involves:",
    options: [
      "Leading technical product development",
      "Improving user experience",
    ],
    domains: ["TC_PM", "CX"],
  },
  {
    id: 8,
    section: "Core Competency",
    question: "You excel at:",
    options: [
      "Technical documentation and specifications",
      "Business cases and financial modeling",
      "User stories and journey mapping",
      "Product roadmaps and strategy",
    ],
    domains: ["TC_PM", "BU", "CX", "ST_PM"],
   
  },
  {
    id: 9,
    section: "Preferred Metrics",
    question: "Your preferred metrics are:",
    options: [
      "Technical performance and reliability",
      "Revenue and conversion rates",
      "User satisfaction and engagement",
      "Market share and competitive position",
    ],
    domains: ["TC_PM", "BU", "CX", "ST_PM"],
    
  },
  {
    id: 10,
    section: "Decision Making",
    question: "In decision making, you prioritize:",
    options: [
      "Technical feasibility and scalability",
      "Revenue potential and market demand",
      "User needs and pain points",
      "Long-term strategic alignment",
    ],
    domains: ["TC_PM", "BU", "CX", "ST_PM"],
    
  },
]

const projectManagementNewQuestions = [
  {
    id: 1,
    section: "Project Approach",
    question: "When working on projects, you prefer to:",
    options: [
      "Create detailed project timelines and schedules",
      "Adapt quickly to changes and maintain flexibility",
      "Focus on team dynamics and communication",
      "Develop long-term strategies and goals",
    ],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 2,
    section: "Core Values",
    question: "Which skill do you value most?",
    options: [
      "Attention to detail and organization",
      "Adaptability and quick decision-making",
      "Building relationships and resolving conflicts",
      "Strategic thinking and analysis",
    ],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 3,
    section: "Problem-Solving",
    question: "How do you handle project challenges?",
    options: [
      "Follow established processes to resolve issues",
      "Quickly pivot and find alternative solutions",
      "Gather the team to collaborate on solutions",
      "Analyze root causes and implement systemic fixes",
    ],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 4,
    section: "Interests",
    question: "What interests you most about project management?",
    options: [
      "Creating efficient processes and workflows",
      "Leading innovative and fast-paced projects",
      "Developing high-performing teams",
      "Shaping organizational strategy",
    ],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 5,
    section: "Meeting Style",
    question: "In meetings, you typically:",
    options: [
      "Take detailed notes and track action items",
      "Keep discussions focused and moving forward",
      "Ensure everyone's voice is heard",
      "Connect discussions to broader goals",
    ],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 6,
    section: "Contributions",
    question: "Your strongest contribution to projects is:",
    options: [
      "Maintaining organization and documentation",
      "Driving rapid progress and results",
      "Building strong team collaboration",
      "Ensuring alignment with business objectives",
    ],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 7,
    section: "Project Kickoff",
    question: "When starting a new project, you first:",
    options: [
      "Create detailed project plans and timelines",
      "Establish flexible frameworks for execution",
      "Build relationships with stakeholders",
      "Define strategic objectives and success metrics",
    ],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 8,
    section: "Communication Style",
    question: "Which best describes your communication style?",
    options: ["Structured and detail-oriented", "Direct and action-focused", "Collaborative and inclusive", "Strategic and visionary"],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 9,
    section: "Success Metrics",
    question: "What aspect of project success matters most to you?",
    options: ["Meeting deadlines and staying within scope", "Delivering value quickly and iteratively", "Maintaining team satisfaction and growth", "Achieving long-term business impact"],
    domains: ["TP", "AG", "TC", "ST"],
  },
  {
    id: 10,
    section: "Tool Preference",
    question: "Which tool would you most likely champion?",
    options: ["Detailed project management software", "Agile project tracking tools", "Team collaboration platforms", "Strategic planning and analytics tools"],
    domains: ["TP", "AG", "TC", "ST"],
  },
]

const uxQuestions = [
  {
    id: 1,
    section: "Initial Interest",
    question: "When you try a new app or website, you find yourself most interested in:",
    options: [
      "Understanding what problems it solves for people",
      "Appreciating its visual design and aesthetic choices",
      "Following how one action leads to another",
      "Noticing common patterns in how people use it",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 2,
    section: "Appealing Activities",
    question: "Which activity interests you the most?",
    options: [
      "Interviewing people about their experiences",
      "Creating beautiful and intuitive designs",
      "Mapping out user journeys",
      "Analyzing data and identifying trends",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 3,
    section: "Team Role",
    question: "In a team project, you naturally gravitate towards:",
    options: [
      "Gathering requirements and user feedback",
      "Creating mockups and visual designs",
      "Planning the overall user experience",
      "Measuring and tracking project success",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 4,
    section: "Personal Traits",
    question: "Which statement best describes you?",
    options: [
      "I'm curious about people's motivations",
      "I have a strong sense of visual design",
      "I enjoy solving complex problems",
      "I love working with data and metrics",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 5,
    section: "Product Development Interest",
    question: "What aspect of product development interests you most?",
    options: [
      "Understanding user needs and pain points",
      "Creating engaging visual experiences",
      "Designing seamless interactions",
      "Measuring product performance",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 6,
    section: "Product Usage Analysis",
    question: "When using a product, you often think about:",
    options: [
      "Who it was made for and why",
      "How it looks and feels visually",
      "The overall experience and flow",
      "How its success could be measured",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 7,
    section: "Skill Development",
    question: "Which skills would you most like to develop?",
    options: [
      "Conducting user research and interviews",
      "Creating user interfaces and visual designs",
      "Designing user flows and wireframes",
      "Analyzing user behavior and metrics",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 8,
    section: "Problem-Solving Style",
    question: "What type of problem-solving appeals to you?",
    options: [
      "Understanding human behavior and needs",
      "Creating visually appealing solutions",
      "Improving user interactions and flows",
      "Finding insights in data and research",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 9,
    section: "Achievement Motivation",
    question: "Which achievement would make you proudest?",
    options: [
      "Uncovering crucial user insights",
      "Creating a beautiful interface users love",
      "Designing an innovative user experience",
      "Improving key performance metrics",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
  {
    id: 10,
    section: "Core Excitement",
    question: "What excites you most about UX?",
    options: [
      "Understanding human psychology",
      "Creating beautiful experiences",
      "Solving complex interaction problems",
      "Finding data-driven solutions",
    ],
    domains: ["UR", "UI_DESIGN", "IX", "SA"],
  },
]

const webDevelopmentQuestions = [
  {
    id: 1,
    section: "Website Focus",
    question: "When using websites, you tend to focus most on:",
    options: [
      "How the website looks and feels to use",
      "How fast and reliable the website is",
      "Understanding how the whole website works together",
      "Whether the website is intuitive and easy to use",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 2,
    section: "Appealing Activities",
    question: "Which activity sounds most appealing?",
    options: [
      "Creating visually appealing layouts and designs",
      "Solving complex puzzles and logic problems",
      "Building something from start to finish",
      "Understanding how people interact with technology",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 3,
    section: "Project Role",
    question: "In group projects, you naturally tend to:",
    options: [
      "Focus on how the final product will look",
      "Work on behind-the-scenes organization",
      "Coordinate different parts of the project",
      "Consider everyone's needs and experiences",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 4,
    section: "Personal Description",
    question: "Which statement best describes you?",
    options: [
      "I have an eye for detail and visual appeal",
      "I enjoy figuring out how things work",
      "I like to understand systems as a whole",
      "I'm good at putting myself in others' shoes",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 5,
    section: "Technology Interest",
    question: "What interests you most about technology?",
    options: [
      "Creating beautiful and interactive experiences",
      "Understanding the underlying mechanics",
      "Seeing how different parts work together",
      "Making technology more accessible to everyone",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 6,
    section: "App Analysis",
    question: "When using a new app, you often think about:",
    options: [
      "How the app looks and animations feel",
      "How the app handles data and performs tasks",
      "How all the features work together",
      "How easy or difficult the app is to use",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 7,
    section: "Enjoyable Tasks",
    question: "Which would you enjoy most?",
    options: [
      "Designing attractive website layouts",
      "Creating efficient systems and processes",
      "Managing entire projects from start to finish",
      "Making websites more user-friendly",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 8,
    section: "Problem-Solving Appeal",
    question: "What aspect of problem-solving appeals to you?",
    options: [
      "Finding creative and elegant solutions",
      "Breaking down complex problems into steps",
      "Seeing how different solutions connect",
      "Understanding the human impact of solutions",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 9,
    section: "Proudest Achievement",
    question: "Which achievement would make you proudest?",
    options: [
      "Creating a beautiful website people love to look at",
      "Building a system that works perfectly and efficiently",
      "Delivering a complete project from concept to launch",
      "Making a website that's helpful and easy to use",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
  {
    id: 10,
    section: "Learning Excitement",
    question: "What excites you most about learning new things?",
    options: [
      "Expressing creativity in new ways",
      "Understanding complex concepts",
      "Combining different skills together",
      "Finding ways to help others",
    ],
    domains: ["FE", "BE", "FS", "DE_WEB"],
  },
]

const quizData = {
  general: {
    questions: generalQuestions,
    domains: {
      TC: "Technical",
      BM: "Business",
      HS: "Healthcare",
      CD: "Creative",
      ED: "Engineering",
      MC: "Marketing",
    },
  },
  ai: {
    questions: aiQuestions,
    domains: {
      NLP: "Natural Language Processing",
      CV: "Computer Vision",
      RL: "Reinforcement Learning",
      AIE: "AI Ethics & Governance",
    },
  },
  cybersecurity: {
    questions: cybersecurityQuestions,
    domains: {
      OF: "Offensive Security",
      DF: "Defensive Security",
      IR: "Incident Response",
      GC: "Governance & Compliance",
    },
  },
  "data-science": {
    questions: dataScienceQuestions,
    domains: {
      DA: "Data Analysis",
      ML: "Machine Learning",
      DE: "Data Engineering",
      BI: "Business Intelligence",
    },
  },
  "digital-marketing": {
    questions: digitalMarketingQuestions,
    domains: {
      CM: "Content Marketing",
      SM: "Social Media Marketing",
      PPC: "Paid Advertising",
      SEO: "Search Engine Optimization",
    },
  },
  "graphic-design": {
    questions: graphicDesignQuestions,
    domains: {
      BR: "Brand Design",
      UI: "UI/UX Design",
      IL: "Illustration",
      ID: "Industrial Design",
    },
  },
  "machine-learning": {
    questions: machineLearningQuestions,
    domains: {
      MLE: "Machine Learning Engineering",
      DS: "Data Science",
      RA: "Research/Academic",
      DA_ML: "Data Analysis (ML)",
    },
  },
  "product-management": {
    questions: productManagementQuestions,
    domains: {
      TC_PM: "Technical Product Management",
      CX: "Consumer Product Management",
    },
  },
  "project-management": {
    questions: projectManagementNewQuestions,
    domains: {
      AG: "Agile Project Management",
      TC: "Team Leadership",
      ST: "Strategic Management",
    },
  },
  ux: {
    questions: uxQuestions,
    domains: {
      UR: "UX Research",
      SA: "UX Analytics",
    },
  },
  "web-development": {
    questions: webDevelopmentQuestions,
    domains: {
      FE: "Frontend Development",
      BE: "Backend Development",
      FS: "Full Stack Development",
      DE_WEB: "UI/UX Development",
    },
  },
}

const domainRecommendations = {
  general: {
    TC: "Your responses suggest a strong inclination towards technical problem-solving and logical thinking. Careers in software development, data science, or cybersecurity could be a great fit for you.",
    BM: "You show a strong aptitude for strategic planning and business analysis. You might excel in roles like product management, business development, or financial analysis.",
    HS: "Your answers indicate a passion for helping others and improving wellbeing. Consider exploring careers in healthcare, such as nursing, clinical management, or healthcare administration.",
    CD: "You have a creative flair and a keen eye for design. Careers in graphic design, UX/UI design, or digital marketing could be where you thrive.",
    ED: "Your profile points to a talent for building and designing systems. You might find a fulfilling career in engineering, such as software engineering, data engineering, or system architecture.",
    MC: "You seem to have a knack for communication and understanding market trends. A career in marketing, public relations, or sales could be a perfect match.",
  },
  ai: {
    NLP: "You have a strong interest in language and communication. A career in Natural Language Processing, working on chatbots, translation, or sentiment analysis, would be a great fit.",
    CV: "Your profile points to a talent for visual pattern recognition. Consider a career in Computer Vision, working on image recognition, autonomous vehicles, or medical imaging.",
    RL: "You enjoy optimizing decision-making processes. A career in Reinforcement Learning, working on robotics, game AI, or resource management, would be exciting for you.",
    AIE: "You are interested in the broader societal impact of AI. A career in AI Ethics & Governance, ensuring fairness, transparency, and accountability, would be a perfect match.",
  },
  cybersecurity: {
    OF: "You enjoy thinking like an attacker to find and fix vulnerabilities. A career in Offensive Security, like a Penetration Tester or Ethical Hacker, could be exciting for you.",
    DF: "Your detail-oriented and preventative mindset is perfect for Defensive Security. Consider roles like Security Analyst or Network Security Engineer.",
    IR: "You work well under pressure and enjoy investigation. A role in Incident Response, such as a Forensic Analyst or Incident Responder, would be a great fit.",
    GC: "You excel at organizing and implementing processes. A career in Governance & Compliance, like a Security Auditor or Compliance Officer, would suit you well.",
  },
  "data-science": {
    DA: "You have a talent for finding patterns and insights in data. A career as a Data Analyst or Business Analyst would be a great fit.",
    ML: "You are interested in creating predictive models and automated systems. Consider a career as a Machine Learning Engineer or Data Scientist.",
    DE: "You enjoy organizing and structuring data systems. A career in Data Engineering would be a perfect match for you.",
    BI: "You excel at creating clear visualizations and helping others understand data. A role in Business Intelligence would be ideal.",
  },
  "digital-marketing": {
    CM: "You have a creative flair for storytelling and brand messaging. A career in Content Marketing, creating blog posts, videos, and podcasts, would be a great fit.",
    SM: "You are passionate about building communities and engaging with audiences. A career in Social Media Marketing would be a perfect match.",
    PPC: "You are analytical and enjoy optimizing campaigns for performance. A career in Paid Advertising (PPC), managing Google Ads or social media ads, would be exciting.",
    SEO: "You are technical and detail-oriented, with an interest in how search engines work. A career in Search Engine Optimization (SEO) would suit you well.",
  },
  "graphic-design": {
    BR: "You have a talent for creating strong visual identities. A career in Brand Design, working on logos, style guides, and brand strategy, would be a great fit.",
    UI: "You enjoy making digital products easy and enjoyable to use. A career as a UI/UX Designer, working on websites and mobile apps, would be a perfect match.",
    IL: "You are artistic and love telling stories through visuals. A career in Illustration, creating custom graphics for books, websites, or marketing, would be exciting.",
    ID: "You are interested in how design translates to physical products. A career in Industrial Design, working on packaging and product design, would suit you well.",
  },
  "machine-learning": {
    MLE: "You enjoy building and optimizing complex systems. A career as a Machine Learning Engineer, deploying models to production, would be a great fit.",
    DS: "You like finding actionable insights in data to solve real-world problems. A career as a Data Scientist would be a perfect match.",
    RA: "You are passionate about advancing the field through research. A career in an academic or research-focused role would be exciting.",
    DA_ML: "You excel at making data meaningful to others. A role as a Data Analyst with a focus on machine learning would suit you well.",
  },
  "product-management": {
    TC_PM: "You have a strong technical background and enjoy working with engineering teams. A career as a Technical Product Manager would be a great fit.",
    BU: "You are business-savvy and enjoy analyzing market data. A career as a Growth Product Manager, focusing on user acquisition and revenue, would be a perfect match.",
  },
  "project-management": {
    TP: "You are organized and enjoy creating detailed project plans. A career in Traditional Project Management would be a great fit.",
    AG: "You are adaptable and enjoy leading fast-paced, innovative projects. A career in Agile Project Management would be a perfect match.",
    TC: "You excel at building strong teams and fostering collaboration. A career in Team Leadership or as a Scrum Master would be exciting.",
    ST: "You are a strategic thinker and enjoy aligning projects with business objectives. A career in Strategic Management or as a Program Manager would suit you well.",
  },
  ux: {
    UR: "You are curious about people's motivations and enjoy conducting user research. A career as a UX Researcher would be a great fit.",
    UI_DESIGN: "You have a strong sense of visual design and enjoy creating beautiful interfaces. A career as a UI Designer would be a perfect match.",
    SA: "You love working with data and metrics to improve product performance. A career as a UX Analyst would suit you well.",
  },
  "web-development": {
    FE: "You have an eye for detail and enjoy creating beautiful, interactive user experiences. A career in Frontend Development would be a great fit.",
    BE: "You enjoy solving complex logic problems and working on behind-the-scenes systems. A career in Backend Development would be a perfect match.",
    FS: "You like to understand systems as a whole and enjoy working on both the frontend and backend. A career as a Full Stack Developer would be exciting.",
    DE_WEB: "You are good at putting yourself in others' shoes and making technology more accessible. A career as a UI/UX Developer would suit you well.",
  },
}

export default function AssessmentPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = selectedQuiz ? quizData[selectedQuiz as keyof typeof quizData]?.questions || [] : []

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  // Calculate domain scores
  const calculateDomainScores = () => {
    if (!selectedQuiz) return {}
    const currentQuizData = quizData[selectedQuiz as keyof typeof quizData]
    if (!currentQuizData) return {}

    const domainScores: Record<string, number> = Object.keys(currentQuizData.domains).reduce((acc, key) => {
      acc[key] = 0
      return acc
    }, {} as Record<string, number>)

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      if (question) {
        const domain = question.domains[optionIndex]
        domainScores[domain]++
      }
    })

    return domainScores
  }

  const currentQuizDetails = selectedQuiz ? quizData[selectedQuiz as keyof typeof quizData] : null
  const totalQuestions = questions.length
  const domainNames: Record<string, string> = currentQuizDetails?.domains || {}

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-linear-to-b from-background to-background">
        {/* Hero Section */}
        <div className="border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Discover Your Ideal Career Path</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Take our comprehensive career assessment to explore opportunities across technology, business,
                healthcare, creative, engineering, and marketing fields.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Free assessment
                </span>
                <span>•</span>
                <span>5-10 minutes</span>
                <span>•</span>
                <span>20 questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Selection */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* General Quiz - Featured */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Start Here</h2>
            <Card
              className="p-8 border-2 border-primary/50 bg-card hover:border-primary transition-colors cursor-pointer"
              onClick={() => handleStartQuiz("general")}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-4xl mb-4">{quizzes[0].icon}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{quizzes[0].title}</h3>
                  <p className="text-muted-foreground mb-4">{quizzes[0].description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{quizzes[0].duration}</span>
                    <span>•</span>
                    <span>{quizzes[0].questions} questions</span>
                  </div>
                </div>
                <Button className="ml-4">
                  Start Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Domain-Specific Quizzes */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Explore Domain-Specific Quizzes</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.slice(1).map((quiz) => (
                <Card
                  key={quiz.id}
                  className="p-6 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  <div className="text-3xl mb-3">{quiz.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{quiz.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{quiz.duration}</span>
                    <span>{quiz.questions} Q</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 rounded-xl border border-border bg-card/50 p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">How It Works</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <h4 className="font-semibold text-foreground mb-2">Take the Quiz</h4>
                <p className="text-sm text-muted-foreground">
                  Answer questions about your interests, skills, and work style
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <h4 className="font-semibold text-foreground mb-2">Get Results</h4>
                <p className="text-sm text-muted-foreground">
                  Receive personalized career recommendations based on your profile
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <h4 className="font-semibold text-foreground mb-2">Explore Paths</h4>
                <p className="text-sm text-muted-foreground">Discover learning resources and job opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const domainScores = calculateDomainScores()
    const sortedDomains = Object.entries(domainScores).sort(([, a], [, b]) => b - a)
    const topDomain = sortedDomains[0]?.[0]

    const resultsUrl = topDomain ? `/results?topDomain=${topDomain}` : "/results"

    return (
      <div className="min-h-screen bg-linear-to-b from-background to-background">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Button variant="outline" onClick={handleBackToQuizzes} className="mb-8 bg-transparent">
            Back to Quizzes
          </Button>
          <div className="rounded-xl border border-border bg-card p-8 mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Assessment Results</h2>
            <p className="text-muted-foreground mb-8">Based on your answers, here's your domain profile:</p>

            <div className="space-y-6">
              {sortedDomains.map(([domain, score]) => (
                <div key={domain}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-foreground">{domainNames[domain]}</span>
                    <span className="text-sm font-medium text-foreground">{Math.round((score / totalQuestions) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${(score / totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {(domainRecommendations[selectedQuiz as keyof typeof domainRecommendations] as
                      | Record<string, string>
                      | undefined)?.[domain]}
                  </p>
                </div>
              ))}
            </div>

            <Link href={resultsUrl} className="block mt-8">
              <Button className="w-full">
                View Detailed Career Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBackToQuizzes}>
              Back
            </Button>
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {questions[currentQuestion]?.section}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{questions[currentQuestion]?.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {questions[currentQuestion]?.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  answers[questions[currentQuestion].id] === idx
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-8 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-transparent"
            >
              Previous
            </Button>
            <div className="flex-1"></div>
            <Button onClick={handleNext} disabled={answers[questions[currentQuestion]?.id] === undefined}>
              {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
