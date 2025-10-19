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
    questions: 12,
    icon: "🤖",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Career Quiz",
    description: "Test your interest in protecting digital assets and systems",
    duration: "3-5 minutes",
    questions: 12,
    icon: "🔒",
  },
  {
    id: "data-science",
    title: "Data Science Career Quiz",
    description: "Assess your aptitude for transforming data into insights",
    duration: "3-5 minutes",
    questions: 12,
    icon: "📊",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Career Quiz",
    description: "Discover if digital marketing aligns with your strengths",
    duration: "3-5 minutes",
    questions: 12,
    icon: "📱",
  },
  {
    id: "graphic-design",
    title: "Graphic Design Career Quiz",
    description: "Explore your creative potential in visual design",
    duration: "3-5 minutes",
    questions: 12,
    icon: "🎨",
  },
  {
    id: "machine-learning",
    title: "Machine Learning Career Quiz",
    description: "Test your interest in building intelligent systems",
    duration: "3-5 minutes",
    questions: 12,
    icon: "⚙️",
  },
  {
    id: "product-management",
    title: "Product Management Career Quiz",
    description: "Assess your fit for leading product strategy and development",
    duration: "3-5 minutes",
    questions: 12,
    icon: "📦",
  },
  {
    id: "project-management",
    title: "Project Management Career Quiz",
    description: "Explore leadership and project coordination opportunities",
    duration: "3-5 minutes",
    questions: 12,
    icon: "📋",
  },
  {
    id: "ux",
    title: "UX Career Quiz",
    description: "Discover if user experience design is your calling",
    duration: "3-5 minutes",
    questions: 12,
    icon: "✨",
  },
  {
    id: "web-development",
    title: "Web Development Career Path",
    description: "Test your interest in building web applications",
    duration: "3-5 minutes",
    questions: 12,
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

export default function AssessmentPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [generalQuestions[currentQuestion].id]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < generalQuestions.length - 1) {
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

  const progress = ((currentQuestion + 1) / generalQuestions.length) * 100

  // Calculate domain scores
  const calculateDomainScores = () => {
    const domainScores: Record<string, number> = {
      TC: 0,
      BM: 0,
      HS: 0,
      CD: 0,
      ED: 0,
      MC: 0,
    }

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = generalQuestions.find((q) => q.id === Number.parseInt(questionId))
      if (question) {
        const domain = question.domains[optionIndex]
        domainScores[domain]++
      }
    })

    return domainScores
  }

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background">
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
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Button variant="outline" onClick={handleBackToQuizzes} className="mb-8 bg-transparent">
            Back to Quizzes
          </Button>

          <div className="rounded-xl border border-border bg-card p-8 mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Assessment Results</h2>
            <p className="text-muted-foreground mb-8">Based on your answers, here's your domain profile:</p>

            <div className="space-y-6">
              {Object.entries(domainScores).map(([domain, score]) => {
                const domainNames: Record<string, string> = {
                  TC: "Technical",
                  BM: "Business",
                  HS: "Healthcare",
                  CD: "Creative",
                  ED: "Engineering",
                  MC: "Marketing",
                }
                return (
                  <div key={domain}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{domainNames[domain]}</span>
                      <span className="text-sm text-muted-foreground">{score}/20</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(score / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link href="/results" className="block mt-8">
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBackToQuizzes}>
              Back
            </Button>
            <div className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {generalQuestions.length}
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
              {generalQuestions[currentQuestion].section}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {generalQuestions[currentQuestion].question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {generalQuestions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  answers[generalQuestions[currentQuestion].id] === idx
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
            <Button onClick={handleNext} disabled={answers[generalQuestions[currentQuestion].id] === undefined}>
              {currentQuestion === generalQuestions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
