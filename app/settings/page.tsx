"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Lock, User, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    firstName: "Sneha",
    lastName: "V",
    email: "sneha@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Career seeker passionate about product management",
  })

  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    courseUpdates: true,
    marketInsights: true,
    weeklyDigest: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showSalary: false,
    allowMessages: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrivacyChange = (key: string) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "privacy", label: "Privacy & Security", icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">Personal Information</h2>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    rows={4}
                  />
                </div>

                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Update Password</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <Card className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">Notification Preferences</h2>

            <div className="space-y-4">
              {[
                {
                  key: "jobAlerts",
                  label: "Job Alerts",
                  description: "Get notified about new job opportunities matching your profile",
                },
                {
                  key: "courseUpdates",
                  label: "Course Updates",
                  description: "Receive updates about your enrolled courses",
                },
                {
                  key: "marketInsights",
                  label: "Market Insights",
                  description: "Weekly market trends and industry insights",
                },
                {
                  key: "weeklyDigest",
                  label: "Weekly Digest",
                  description: "Summary of your activity and recommendations",
                },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={() => handleNotificationChange(item.key)}
                    className="h-5 w-5 rounded border-border"
                  />
                </div>
              ))}

              <Button className="w-full mt-6">Save Preferences</Button>
            </div>
          </Card>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-foreground mb-6">Privacy Settings</h2>

              <div className="space-y-4">
                {[
                  {
                    key: "profilePublic",
                    label: "Public Profile",
                    description: "Allow others to view your profile",
                  },
                  {
                    key: "showSalary",
                    label: "Show Salary Expectations",
                    description: "Display your salary range to recruiters",
                  },
                  {
                    key: "allowMessages",
                    label: "Allow Messages",
                    description: "Let recruiters and professionals contact you",
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy[item.key as keyof typeof privacy]}
                      onChange={() => handlePrivacyChange(item.key)}
                      className="h-5 w-5 rounded border-border"
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-destructive/50 bg-destructive/5">
              <h2 className="text-lg font-bold text-foreground mb-4">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
