"use client"

interface QuestionProps {
  question: {
    id: number
    category: string
    question: string
    scale: string
  }
  answer: number | undefined
  onAnswer: (value: number) => void
}

const scaleLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]

export default function AssessmentQuestion({ question, answer, onAnswer }: QuestionProps) {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">{question.scale}</div>

      {/* Response Options */}
      <div className="flex gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => onAnswer(value)}
            className={`flex-1 py-4 px-2 sm:px-4 rounded-lg border-2 transition font-medium text-sm sm:text-base ${
              answer === value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50"
            }`}
            title={scaleLabels[value - 1]}
          >
            <div className="hidden sm:block">{scaleLabels[value - 1]}</div>
            <div className="sm:hidden">{value}</div>
          </button>
        ))}
      </div>

      {/* Visual Feedback */}
      {answer && (
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <p className="text-sm text-foreground">
            You selected: <span className="font-medium">{scaleLabels[answer - 1]}</span>
          </p>
        </div>
      )}
    </div>
  )
}
