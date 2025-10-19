"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  MessageSquare,
  TrendingUp,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Job Portal", href: "/jobs" },
  { icon: BookOpen, label: "Learning Hub", href: "/learning" },
  { icon: BarChart3, label: "Market Trends", href: "/trends" },
  { icon: TrendingUp, label: "Career Projection", href: "/career-projection" },
  { icon: MessageSquare, label: "Feedback", href: "/feedback" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={onClose}></div>}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 border-r border-border bg-card transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">CareerPath</span>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-6 left-6 right-6">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
