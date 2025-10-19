"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Zap,
  Award,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useLiveCourses } from "@/hooks/use-live-data"

const localCourses = [
  {
    id: 1,
    title: "Advanced Product Strategy",
    instructor: "Sarah Chen",
    category: "Product Management",
    level: "Advanced",
    duration: "8 weeks",
    students: 2400,
    rating: 4.9,
    progress: 75,
    status: "in-progress",
    skills: ["Strategy", "Leadership", "Analytics"],
    recommended: true,
    relevance: 95,
    image: "/product-management-course.png",
    platform: "Coursera",
    platformUrl: "https://www.coursera.org",
  },
  {
    id: 2,
    title: "Data-Driven Decision Making",
    instructor: "Marcus Johnson",
    category: "Analytics",
    level: "Intermediate",
    duration: "6 weeks",
    students: 3100,
    rating: 4.8,
    progress: 100,
    status: "completed",
    skills: ["Data Analysis", "SQL", "Visualization"],
    recommended: true,
    relevance: 88,
    image: "/udemy-product-course.jpg",
    platform: "Udemy",
    platformUrl: "https://www.udemy.com",
  },
  {
    id: 3,
    title: "Leadership for Managers",
    instructor: "Emily Rodriguez",
    category: "Leadership",
    level: "Intermediate",
    duration: "10 weeks",
    students: 1800,
    rating: 4.7,
    progress: 30,
    status: "in-progress",
    skills: ["Team Management", "Communication", "Delegation"],
    recommended: true,
    relevance: 92,
    image: "/google-pm-certificate.jpg",
    platform: "LinkedIn Learning",
    platformUrl: "https://www.linkedin.com/learning",
  },
  {
    id: 4,
    title: "Product Design Fundamentals",
    instructor: "Alex Kim",
    category: "Design",
    level: "Beginner",
    duration: "5 weeks",
    students: 4200,
    rating: 4.9,
    progress: 0,
    status: "not-started",
    skills: ["UX/UI", "Prototyping", "User Research"],
    recommended: false,
    relevance: 72,
    image: "/product-management-course.png",
    platform: "Coursera",
    platformUrl: "https://www.coursera.org",
  },
  {
    id: 5,
    title: "SQL for Product Managers",
    instructor: "David Lee",
    category: "Technical",
    level: "Beginner",
    duration: "4 weeks",
    students: 2800,
    rating: 4.8,
    progress: 0,
    status: "not-started",
    skills: ["SQL", "Databases", "Queries"],
    recommended: true,
    relevance: 85,
    image: "/udemy-product-course.jpg",
    platform: "Udemy",
    platformUrl: "https://www.udemy.com",
  },
  {
    id: 6,
    title: "Growth Marketing Strategies",
    instructor: "Lisa Wang",
    category: "Marketing",
    level: "Advanced",
    duration: "7 weeks",
    students: 1900,
    rating: 4.6,
    progress: 0,
    status: "not-started",
    skills: ["Growth", "Marketing", "Experimentation"],
    recommended: false,
    relevance: 78,
    image: "/google-pm-certificate.jpg",
    platform: "Google",
    platformUrl: "https://www.google.com/learning",
  },
]

const learningPaths = [
  {
    id: 1,
    title: "Product Manager Mastery",
    description: "Complete path to become a successful Product Manager",
    courses: [1, 2, 3, 5],
    duration: "24 weeks",
    difficulty: "Advanced",
    matchScore: 94,
  },
  {
    id: 2,
    title: "Data-Driven Leadership",
    description: "Combine data skills with leadership capabilities",
    courses: [2, 3, 5],
    duration: "20 weeks",
    difficulty: "Intermediate",
    matchScore: 88,
  },
  {
    id: 3,
    title: "Strategic Thinking Essentials",
    description: "Master strategic thinking and decision-making",
    courses: [1, 3],
    duration: "18 weeks",
    difficulty: "Intermediate",
    matchScore: 85,
  },
]

const capitalizeString = (str: string | undefined): string => {
  if (!str) return "Unknown"
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function LearningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPath, setSelectedPath] = useState<number | null>(null)
  const [allCourses, setAllCourses] = useState(localCourses)
  const { courses: liveCourses, loading: liveLoading } = useLiveCourses()

  useEffect(() => {
    if (liveCourses && liveCourses.length > 0) {
      const merged = [...localCourses, ...liveCourses.slice(0, 3)]
      setAllCourses(merged)
    }
  }, [liveCourses])

  const categories = ["all", ...new Set(allCourses.map((c) => c.category).filter(Boolean))]
  const statuses = ["all", "in-progress", "completed", "not-started"]

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || course.category === filterCategory
    const matchesStatus = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const recommendedCourses = allCourses.filter((c) => c.recommended).sort((a, b) => b.relevance - a.relevance)

  const stats = {
    inProgress: allCourses.filter((c) => c.status === "in-progress").length,
    completed: allCourses.filter((c) => c.status === "completed").length,
    totalHours: 156,
  }

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="overflow-hidden hover:border-primary/50 transition flex flex-col">
      {/* Course Image */}
      {course.image && (
        <div className="relative h-40 w-full bg-muted overflow-hidden">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
          {course.status === "completed" && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
          )}
        </div>
      )}

      {/* Course Header */}
      <div className="p-6 pb-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {course.level}
          </div>
          <a
            href={course.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition"
            title={`Visit ${course.platform}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{course.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground">{course.platform}</span>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.students?.toLocaleString() || "N/A"}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(course.rating || 0) ? "fill-primary text-primary" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{course.rating || "N/A"}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {course.skills?.map((skill: string) => (
            <span key={skill} className="px-2 py-1 rounded-full bg-muted text-xs text-foreground">
              {skill}
            </span>
          ))}
        </div>

        {/* Progress */}
        {course.progress !== undefined && course.progress > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Progress</span>
              <span className="text-xs text-muted-foreground">{course.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-6 pt-4 border-t border-border">
        <Button className="w-full" asChild>
          <a href={course.platformUrl} target="_blank" rel="noopener noreferrer">
            {course.status === "completed" ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Completed
              </>
            ) : course.status === "in-progress" ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Continue
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Course
              </>
            )}
          </a>
        </Button>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Learning Hub</h1>

          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
              </div>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Learning Hours</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalHours}</p>
              </div>
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Personalized Learning Paths</h2>
            <p className="text-muted-foreground">AI-recommended paths based on your career profile</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className={`p-6 cursor-pointer transition border-2 ${
                  selectedPath === path.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {path.difficulty}
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
                    <Zap className="h-3 w-3 text-primary" />
                    <span className="text-xs font-bold text-primary">{path.matchScore}%</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{path.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {path.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {path.courses.length} courses
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Recommended For You</h2>
            <p className="text-muted-foreground">
              Courses tailored to your career goals {liveLoading && "(Loading live data...)"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard course={course} />
                {course.relevance && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    <Award className="h-3 w-3" />
                    {course.relevance}% Match
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">All Courses</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  filterCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {capitalizeString(cat)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Status:</span>
            </div>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {capitalizeString(status.replace("-", " "))}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </Card>
        )}
      </div>
    </div>
  )
}
