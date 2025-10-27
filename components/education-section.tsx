"use client"

import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

const education = {
  degree: "BS Software Engineering",
  institution: "Capital University of Science & Technology",
  location: "Islamabad, Pakistan",
  period: "2020 - 2024",
  description: "Graduated with a strong foundation in software development, algorithms, and system design",
  highlights: [
    "Final Year Project: Detection of Brain Tumor using MR Images",
    "Focused on Full Stack Development, AI/ML, and Mobile App Development",
    "Strong foundation in Data Structures, Algorithms, and System Design",
  ],
}

export function EducationSection() {
  return (
    <section id="education" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Education</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My academic background and learning journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-border hover:border-primary/50 bg-card overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 md:p-12">
                {/* Icon and Title */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-10 h-10 text-primary-foreground" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {education.degree}
                  </h3>
                  <p className="text-xl md:text-2xl text-primary font-semibold mb-6">{education.institution}</p>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium">{education.period}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/80 px-4 py-2 rounded-full">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{education.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                  {education.description}
                </p>

                {/* Highlights Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-2 text-foreground font-semibold">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h4 className="text-lg">Key Highlights</h4>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {education.highlights.map((highlight, i) => (
                      <Card
                        key={i}
                        className="p-5 bg-background/50 hover:bg-background border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{highlight}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
