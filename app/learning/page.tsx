import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import LearningPageContent from "@/components/dashboard/widgets/learning-client-page"

export const metadata: Metadata = {
  title: "Learning Hub - Your Career Platform",
  description: "Explore personalized learning paths and courses to achieve your career goals.",
}

export function generateViewport(): Viewport {
  return {
    themeColor: "white",
  }
}

export default function LearningPage() {
  return (
    <Suspense>
      <LearningPageContent />
    </Suspense>
  )
}
