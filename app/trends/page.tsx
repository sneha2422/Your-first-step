"use client"

import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChartIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const salaryTrends = [
  { year: "2020", salary: 95 },
  { year: "2021", salary: 105 },
  { year: "2022", salary: 120 },
  { year: "2023", salary: 135 },
  { year: "2024", salary: 155 },
]

const jobGrowth = [
  { role: "Product Manager", growth: 23 },
  { role: "Data Scientist", growth: 31 },
  { role: "UX Designer", growth: 18 },
  { role: "ML Engineer", growth: 42 },
  { role: "DevOps", growth: 28 },
]

const remoteDistribution = [
  { name: "Remote", value: 35 },
  { name: "Hybrid", value: 45 },
  { name: "On-site", value: 20 },
]

const COLORS = ["var(--color-primary)", "var(--color-chart-2)", "var(--color-chart-3)"]

export default function TrendsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Market Trends & Insights</h1>
          <p className="text-muted-foreground">Real-time data on job market, salaries, and industry trends</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Salary Growth</p>
                <p className="text-3xl font-bold text-foreground">+23%</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Year over year</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Job Openings</p>
                <p className="text-3xl font-bold text-foreground">12.4K</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Active positions</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Remote Roles</p>
                <p className="text-3xl font-bold text-foreground">35%</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Of all positions</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Experience</p>
                <p className="text-3xl font-bold text-foreground">5.2 yrs</p>
              </div>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Required for roles</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          {/* Salary Trends */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-primary" />
              Salary Trends (5 Years)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Work Style Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Work Style Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartComponent>
                <Pie
                  data={remoteDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {remoteDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChartComponent>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Job Growth */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Job Growth by Role (YoY %)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="role" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="growth" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Insights */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Top Growing Skills</h3>
            <div className="space-y-3">
              {["AI/ML", "Data Analysis", "Cloud Architecture", "Product Strategy", "Leadership"].map((skill, idx) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${90 - idx * 10}%` }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{90 - idx * 10}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Top Companies Hiring</h3>
            <div className="space-y-3">
              {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map((company, idx) => (
                <div key={company} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{company}</span>
                  <span className="text-xs font-medium text-primary">{500 - idx * 50} openings</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
