export async function GET(request: Request) {
  try {
    // Simulate fetching from Coursera, Udemy, Google APIs
    const courses = [
      {
        id: 1,
        title: "Product Management Specialization",
        platform: "Coursera",
        instructor: "University of Virginia",
        duration: "4 months",
        rating: 4.8,
        students: 125000,
        price: "$39/month",
        image: "/product-management-course.png",
        skills: ["Product Strategy", "Analytics", "User Research"],
        certified: true,
      },
      {
        id: 2,
        title: "The Complete Product Management Course",
        platform: "Udemy",
        instructor: "Reforge",
        duration: "12 hours",
        rating: 4.7,
        students: 85000,
        price: "$14.99",
        image: "/udemy-product-course.jpg",
        skills: ["Product Development", "Roadmapping", "Metrics"],
        certified: true,
      },
      {
        id: 3,
        title: "Google Product Management Certificate",
        platform: "Google",
        instructor: "Google Career Certificates",
        duration: "3 months",
        rating: 4.9,
        students: 200000,
        price: "$39/month",
        image: "/google-pm-certificate.jpg",
        skills: ["Product Thinking", "Analytics", "Leadership"],
        certified: true,
      },
    ]

    return Response.json({ success: true, data: courses, timestamp: new Date().toISOString() })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch courses" }, { status: 500 })
  }
}
