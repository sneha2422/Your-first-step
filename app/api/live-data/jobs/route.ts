export async function GET(request: Request) {
  try {
    // Simulate fetching from LinkedIn, Naukri APIs
    const jobs = [
      {
        id: 1,
        title: "Senior Product Manager",
        company: "Google",
        location: "Mountain View, CA",
        salary: "$150K - $200K",
        source: "linkedin",
        postedDate: new Date().toISOString(),
        description: "Lead product strategy for AI initiatives",
        skills: ["Product Strategy", "Data Analysis", "Leadership"],
      },
      {
        id: 2,
        title: "Product Manager",
        company: "Microsoft",
        location: "Seattle, WA",
        salary: "$140K - $190K",
        source: "naukri",
        postedDate: new Date().toISOString(),
        description: "Manage cloud product portfolio",
        skills: ["Cloud Computing", "Product Management", "Analytics"],
      },
      {
        id: 3,
        title: "Head of Product",
        company: "Stripe",
        location: "San Francisco, CA",
        salary: "$160K - $220K",
        source: "linkedin",
        postedDate: new Date().toISOString(),
        description: "Lead product vision and execution",
        skills: ["Strategic Planning", "Team Leadership", "Fintech"],
      },
    ]

    return Response.json({ success: true, data: jobs, timestamp: new Date().toISOString() })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 })
  }
}
