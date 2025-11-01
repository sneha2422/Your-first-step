"use client"

import { Bell, Settings, User } from "lucide-react"

export default function DashboardHeader() {
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") || "Sneha V" : "Sneha V"
  const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") || "Career Seeker" : "Career Seeker"

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-40">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-lg transition">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </button>

            {/* Settings */}
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Profile Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
