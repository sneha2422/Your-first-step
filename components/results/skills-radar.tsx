"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SkillsRadarProps {
  data: Record<string, number>
}

export default function SkillsRadar({ data }: SkillsRadarProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name: name.split(" ")[0],
    value,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
        <YAxis tick={{ fontSize: 12 }} stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: `1px solid var(--color-border)`,
            borderRadius: "8px",
          }}
          cursor={{ fill: "var(--color-primary)" }}
        />
        <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
