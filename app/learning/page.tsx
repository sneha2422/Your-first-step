import { Suspense } from "react"
import LearningPageContent from "@/components/dashboard/widgets/learning-client-page"
import { Card } from "@/components/ui/card"

function LearningPage() {
  return (
    <Suspense fallback={<Card className="m-8 p-6">Loading learning hub...</Card>}>
      <LearningPageContent />
    </Suspense>
  )
}

export default LearningPage