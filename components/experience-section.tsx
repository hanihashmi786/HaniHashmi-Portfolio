"use client"

import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Freelancing",
    location: "Riyadh, Saudi Arabia",
    period: "Oct 2025 - Present",
    description: [
      "Providing services as Full Stack Developer",
      "Developed the Islamic mobile app 'Rujo-illalah' using React Native",
    ],
    current: true,
  },
  {
    title: "Full Stack Developer",
    company: "Mars BPO Pvt. Ltd.",
    location: "Riyadh, Saudi Arabia",
    period: "Jul 2024 - Aug 2025",
    description: [
      "Developed & maintained 5+ web using React and mobile apps using React Native & Python (Flask/Django), improving deployment time by 30%",
      "Collaborated with cross-functional teams to build scalable solutions, resulting in a 25% increase in system reliability",
      "Optimized backend codebase & debugging processes, reducing issue resolution time by 40%",
    ],
    current: false,
  },
  {
    title: "Full Stack Developer",
    company: "Freelancing",
    location: "Islamabad, Pakistan",
    period: "Sep 2023 - Jul 2024",
    description: [
      "Developed a UI/UX dashboard using React.js",
      "Built a mobile app for online clothing sales using React Native",
      "Created an e-commerce store for an international student project with MERN stack",
      "Built a voice changer website using Python as a final year project",
    ],
    current: false,
  },
  {
    title: "Javascript Developer",
    company: "SOFTOO Pvt. Ltd.",
    location: "Islamabad, Pakistan",
    period: "Jul 2023 - Sep 2023",
    description: [
      "Completed intensive Node.js training during the internship",
      "Enhanced logical thinking & problem-solving by independently tackling coding challenges and debugging exercises",
      "Contributed to a collaborative team culture by sharing solutions and improving peer review quality",
    ],
    current: false,
    internship: true,
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey in software development
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-8 top-8 w-4 h-4 -ml-[7px] rounded-full bg-primary border-4 border-background z-10 hidden md:block" />

                  <Card className="md:ml-20 group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 bg-card">
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            {exp.current && (
                              <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                                Current
                              </span>
                            )}
                            {exp.internship && (
                              <span className="px-3 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-full">
                                Internship
                              </span>
                            )}
                          </div>
                          <p className="text-lg font-semibold text-primary flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {exp.company}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:text-right">
                          <div className="flex items-center gap-2 sm:justify-end">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-medium">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 sm:justify-end">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-3">
                        {exp.description.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 group/item">
                            <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
