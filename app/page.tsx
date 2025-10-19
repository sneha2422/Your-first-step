import Link from "next/link"
import { ArrowRight, CheckCircle, Users, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-foreground">CareerPath</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
                How it Works
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition">
                Testimonials
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 w-fit rounded-full border border-border bg-card px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span className="text-sm text-muted-foreground">Trusted by 50,000+ professionals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover Your <span className="text-primary">Perfect Career</span> Path
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Take our scientifically-backed psychometric assessment and get personalized career recommendations
                powered by AI. Find roles that match your strengths and values.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col gap-3 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">Takes only 15 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">Instant personalized results</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 lg:h-full min-h-96 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center overflow-hidden">
            <div
            className="relative h-96 lg:h-full min-h-96 rounded-2xl border border-border overflow-hidden"
            >
              <img
                src="/artwork.png"
                alt="Career Path Visual"
                className="w-full h-full object-cover"
             />
            </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Animated background elements */}
                  <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl"></div>
                  <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>

                  {/* Card mockup */}
                 {/* <div className="relative z-10 w-80 rounded-xl bg-card border border-border shadow-2xl p-6 space-y-4">
                    <div className="h-3 w-24 rounded-full bg-primary/30"></div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-muted"></div>
                      <div className="h-2 w-5/6 rounded-full bg-muted"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-4">
                      <div className="h-12 rounded-lg bg-primary/20"></div>
                      <div className="h-12 rounded-lg bg-primary/20"></div>
                      <div className="h-12 rounded-lg bg-primary/20"></div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose CareerPath?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven career assessment methodologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "AI-Powered Matching",
                description: "Advanced algorithms match your profile with ideal career paths",
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                description: "Real-time data on job trends, salaries, and growth opportunities",
              },
              {
                icon: Users,
                title: "Expert Guidance",
                description: "Connect with career coaches and industry professionals",
              },
              {
                icon: CheckCircle,
                title: "Proven Methodology",
                description: "Based on decades of career psychology research",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-background p-6 hover:border-primary/50 transition"
              >
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your personalized career path in just 4 simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Sign Up", desc: "Create your free account in seconds" },
              { step: "2", title: "Assessment", desc: "Complete our 15-minute psychometric test" },
              { step: "3", title: "Analysis", desc: "AI analyzes your results and preferences" },
              { step: "4", title: "Recommendations", desc: "Get personalized career suggestions" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {idx < 3 && <div className="hidden md:block absolute top-6 -right-4 w-8 h-0.5 bg-border"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Trusted by Professionals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how CareerPath has helped thousands find their ideal career
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Product Manager",
                company: "Tech Startup",
                quote:
                  "CareerPath helped me transition from engineering to product management. The recommendations were spot-on!",
              },
              {
                name: "Marcus Johnson",
                role: "Data Scientist",
                company: "Fortune 500",
                quote: "The market insights feature showed me opportunities I never knew existed. Highly recommend!",
              },
              {
                name: "Emily Rodriguez",
                role: "UX Designer",
                company: "Design Agency",
                quote: "Finally found a career assessment that actually understands my strengths and values.",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-background p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Ready to Find Your Perfect Career?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already discovered their ideal career path with CareerPath.
          </p>
          <Link href="/auth/signup">
            <Button size="lg">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">C</span>
                </div>
                <span className="font-bold text-foreground">CareerPath</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Discover your perfect career path with AI-powered insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 CareerPath. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
