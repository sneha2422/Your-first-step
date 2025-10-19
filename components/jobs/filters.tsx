"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface JobFiltersProps {
  filters: {
    salary: [number, number]
    remote: string[]
    type: string[]
    location: string
  }
  setFilters: (filters: any) => void
}

export default function JobFilters({ filters, setFilters }: JobFiltersProps) {
  const handleSalaryChange = (index: number, value: number) => {
    const newSalary: [number, number] = [...filters.salary]
    newSalary[index] = value
    setFilters({ ...filters, salary: newSalary })
  }

  const toggleRemote = (value: string) => {
    const newRemote = filters.remote.includes(value)
      ? filters.remote.filter((r) => r !== value)
      : [...filters.remote, value]
    setFilters({ ...filters, remote: newRemote })
  }

  const toggleType = (value: string) => {
    const newType = filters.type.includes(value) ? filters.type.filter((t) => t !== value) : [...filters.type, value]
    setFilters({ ...filters, type: newType })
  }

  return (
    <div className="space-y-6">
      {/* Location */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Location</h3>
        <Input
          placeholder="City or region"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </Card>

      {/* Salary Range */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Salary Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Min: ${filters.salary[0]}K</label>
            <input
              type="range"
              min="0"
              max="250"
              value={filters.salary[0]}
              onChange={(e) => handleSalaryChange(0, Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Max: ${filters.salary[1]}K</label>
            <input
              type="range"
              min="0"
              max="250"
              value={filters.salary[1]}
              onChange={(e) => handleSalaryChange(1, Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Work Style */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Work Style</h3>
        <div className="space-y-2">
          {["Remote", "Hybrid", "On-site"].map((style) => (
            <label key={style} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.remote.includes(style)}
                onChange={() => toggleRemote(style)}
                className="h-4 w-4 rounded border-border"
              />
              <span className="text-sm text-foreground">{style}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Job Type */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Job Type</h3>
        <div className="space-y-2">
          {["Full-time", "Part-time", "Contract"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => toggleType(type)}
                className="h-4 w-4 rounded border-border"
              />
              <span className="text-sm text-foreground">{type}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() =>
          setFilters({
            salary: [0, 250],
            remote: [],
            type: [],
            location: "",
          })
        }
      >
        Reset Filters
      </Button>
    </div>
  )
}
