export async function GET(request: Request) {
  try {
    // Simulate fetching market trends from LinkedIn, Naukri
    const trends = [
      {
        id: 1,
        title: "Product Manager Demand Surge",
        description: "PM roles increased by 35% in Q4 2024",
        source: "linkedin",
        date: new Date().toISOString(),
        impact: "high",
        salaryTrend: "+12%",
      },
      {
        id: 2,
        title: "AI Skills Premium",
        description: "Professionals with AI skills earn 25% more",
        source: "naukri",
        date: new Date().toISOString(),
        impact: "high",
        salaryTrend: "+25%",
      },
      {
        id: 3,
        title: "Remote Work Stabilization",
        description: "Remote PM roles now 60% of market",
        source: "linkedin",
        date: new Date().toISOString(),
        impact: "medium",
        salaryTrend: "+5%",
      },
    ]

    return Response.json({ success: true, data: trends, timestamp: new Date().toISOString() })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch trends" }, { status: 500 })
  }
}
