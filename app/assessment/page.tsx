"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import AssessmentQuestion from "@/components/assessment/question"

const assessmentQuestions = [
  {
    id: 1,
    category: "Personality",
    question: "I prefer working on projects with clear, defined goals and timelines.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 2,
    category: "Work Style",
    question: "I enjoy collaborating with others and working in team environments.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 3,
    category: "Problem Solving",
    question: "I like to analyze problems deeply before taking action.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 4,
    category: "Creativity",
    question: "I often come up with innovative solutions to challenges.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 5,
    category: "Leadership",
    question: "I naturally take on leadership roles in group settings.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 6,
    category: "Adaptability",
    question: "I adapt well to changes and unexpected situations.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 7,
    category: "Communication",
    question: "I express my ideas clearly and listen actively to others.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 8,
    category: "Detail Orientation",
    question: "I pay close attention to details and quality in my work.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 9,
    category: "Risk Taking",
    question: "I'm comfortable taking calculated risks to achieve goals.",
    scale: "Strongly Disagree to Strongly Agree",
  },
  {
    id: 10,
    category: "Learning",
    question: "I'm motivated to continuously learn and develop new skills.",
    scale: "Strongly Disagree to Strongly Agree",
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(900) // 15 minutes

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          window.location.href = "/results"
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [assessmentQuestions[currentQuestion].id]: value }))
    if (soundEnabled) {
      // Play subtle sound effect
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      window.location.href = "/results"
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-background to-background ${isFullscreen ? "fixed inset-0" : ""}`}
    >
      {/* Minimal Header */}
      <div className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-muted-foreground">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </div>
              <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-foreground">{formatTime(timeRemaining)}</div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 hover:bg-muted rounded-lg transition"
                title={soundEnabled ? "Disable sound" : "Enable sound"}
              >
                {soundEnabled ? (
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-muted rounded-lg transition"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Maximize2 className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-8 sm:p-12">
          {/* Question */}
          <div className="mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              {assessmentQuestions[currentQuestion].category}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              {assessmentQuestions[currentQuestion].question}
            </h2>
          </div>

          {/* Response Scale */}
          <AssessmentQuestion
            question={assessmentQuestions[currentQuestion]}
            answer={answers[assessmentQuestions[currentQuestion].id]}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <div className="flex gap-4 pt-12 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-transparent"
            >
              Previous
            </Button>
            <div className="flex-1"></div>
            <Button onClick={handleNext}>
              {currentQuestion === assessmentQuestions.length - 1 ? "Complete Assessment" : "Next Question"}
            </Button>
          </div>
        </div>

        {/* Accessibility Info */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>This assessment is designed to be accessible. Use Tab to navigate and Enter to select.</p>
        </div>
      </div>
    </div>
  )
}
