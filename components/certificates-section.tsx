"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import { useState } from "react"

const certificates = [
  {
    title: "Google IT Support",
    issuer: "Google",
    category: "IT Support",
    icon: "🎓",
    previewUrl: "https://www.coursera.org/professional-certificates/google-it-support",
  },
  {
    title: "Crash Course on Python",
    issuer: "Google",
    category: "Programming",
    icon: "🐍",
    previewUrl: "https://www.coursera.org/learn/python-crash-course",
  },
  {
    title: "Introduction to DevOps",
    issuer: "Coursera",
    category: "DevOps",
    icon: "⚙️",
    previewUrl: "https://www.coursera.org/learn/intro-to-devops",
  },
  {
    title: "Data Science",
    issuer: "Coursera",
    category: "Data Science",
    icon: "📊",
    previewUrl: "https://www.coursera.org/browse/data-science",
  },
  {
    title: "JavaScript (Basics)",
    issuer: "Coursera",
    category: "Programming",
    icon: "💻",
    previewUrl: "https://www.coursera.org/learn/javascript-basics",
  },
  {
    title: "JavaScript",
    issuer: "Coursera",
    category: "Programming",
    icon: "⚡",
    previewUrl: "https://www.coursera.org/learn/javascript",
  },
  {
    title: "Advanced Appium: Scalable Mobile Test Automation",
    issuer: "Coursera",
    category: "Test Automation",
    icon: "📱",
    previewUrl: "https://www.coursera.org/account/accomplishments/verify/W9XMI8AGU48H",
  },
]

export function CertificatesSection() {
  const [hoveredCert, setHoveredCert] = useState<number | null>(null)

  return (
    <section id="certificates" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Certifications</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and courses completed to enhance my technical expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-border hover:border-primary/50 bg-card relative"
                onMouseEnter={() => setHoveredCert(index)}
                onMouseLeave={() => setHoveredCert(null)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{cert.icon}</div>
                    <Badge variant="secondary" className="text-xs">
                      {cert.category}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <span>View Certificate</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>

                {hoveredCert === index && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-50 pointer-events-none">
                    <div className="bg-card border-2 border-primary rounded-xl shadow-2xl overflow-hidden w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-300">
                      {/* Browser-style header */}
                      <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b border-border">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 text-xs text-muted-foreground truncate ml-2">{cert.previewUrl}</div>
                      </div>

                      {/* Preview content */}
                      <div className="h-[250px] bg-background">
                        <iframe
                          src={cert.previewUrl}
                          className="w-full h-full"
                          title={`${cert.title} preview`}
                          sandbox="allow-same-origin"
                        />
                      </div>

                      {/* Footer with certificate info */}
                      <div className="bg-card/95 backdrop-blur-sm p-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">{cert.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-foreground truncate">{cert.title}</div>
                            <div className="text-xs text-muted-foreground">Issued by {cert.issuer}</div>
                          </div>
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {cert.category}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Arrow pointer */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-card border-r-2 border-b-2 border-primary rotate-45" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
