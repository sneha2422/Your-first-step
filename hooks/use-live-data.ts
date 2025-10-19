"use client"

import { useState, useEffect } from "react"

export function useLiveJobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/live-data/jobs")
        const data = await response.json()
        if (data.success) {
          setJobs(data.data)
        }
      } catch (err) {
        setError("Failed to fetch jobs")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
    // Refresh every 5 minutes
    const interval = setInterval(fetchJobs, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { jobs, loading, error }
}

export function useLiveCourses() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/live-data/courses")
        const data = await response.json()
        if (data.success) {
          setCourses(data.data)
        }
      } catch (err) {
        setError("Failed to fetch courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
    // Refresh every 10 minutes
    const interval = setInterval(fetchCourses, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { courses, loading, error }
}

export function useMarketTrends() {
  const [trends, setTrends] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch("/api/live-data/market-trends")
        const data = await response.json()
        if (data.success) {
          setTrends(data.data)
        }
      } catch (err) {
        setError("Failed to fetch trends")
      } finally {
        setLoading(false)
      }
    }

    fetchTrends()
    // Refresh every 15 minutes
    const interval = setInterval(fetchTrends, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { trends, loading, error }
}
