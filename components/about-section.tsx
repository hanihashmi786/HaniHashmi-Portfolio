"use client"

import { Code2, Lightbulb, Rocket } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"

const projectPreviews = {
  "Break Portal": {
    url: "https://breakportal.marsbpo.team/login",
    status: "live",
  },
  "Call Loom": {
    url: "https://callloom.com/",
    status: "live",
  },
  "Data Scrubber": {
    url: "https://scrubber.marsbpo.team/",
    status: "live",
  },
  "Dial Loom": {
    status: "ui-only",
    text: "UI Design for Team",
  },
  Taskio: {
    status: "archived",
    text: "Removed by company - Code available",
  },
  "Rujo-illalah": {
    status: "in-progress",
    text: "In Progress",
  },
}

export function AboutSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const ProjectName = ({ name }: { name: string }) => {
    const preview = projectPreviews[name as keyof typeof projectPreviews]
    if (!preview) return <span>{name}</span>

    return (
      <span
        className="relative inline-block cursor-pointer text-primary hover:text-primary/80 transition-colors font-semibold"
        onMouseEnter={() => setHoveredProject(name)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {name}
        {hoveredProject === name && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="w-96 bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl border border-primary/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {preview.status === "live" && preview.url ? (
                <div className="relative">
                  <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-muted-foreground font-medium">{name}</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-muted/30 overflow-hidden">
                    <iframe
                      src={preview.url}
                      className="w-full h-full scale-75 origin-top-left"
                      style={{ width: "133.33%", height: "133.33%" }}
                      title={`${name} preview`}
                    />
                  </div>
                  <div className="px-4 py-3 bg-muted/30 border-t border-border/50">
                    <div className="text-xs text-center text-primary font-medium">🟢 Live Project</div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="mb-4">
                    {preview.status === "in-progress" && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">In Progress</span>
                      </div>
                    )}
                    {preview.status === "ui-only" && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full">
                        <span className="text-sm font-medium">UI Design</span>
                      </div>
                    )}
                    {preview.status === "archived" && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-500 rounded-full">
                        <span className="text-sm font-medium">Archived</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-2">{name}</div>
                  <div className="text-sm text-muted-foreground">{preview.text}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </span>
    )
  }

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a Software Engineer with 2 years of experience in Full Stack Development, IT Support, Software
                Support, and Networking. Skilled in React.js, React Native, Python (Flask/Django), and the MERN stack,
                with a solid foundation in AI, Machine Learning, and NLP.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I have contributed to multiple successful projects including <ProjectName name="Break Portal" />,{" "}
                <ProjectName name="Call Loom" />, <ProjectName name="Data Scrubber" />, <ProjectName name="Dial Loom" />
                , <ProjectName name="Taskio" />, and <ProjectName name="Rujo-illalah" />. My work has improved
                deployment time by 30%, increased system reliability by 25%, and reduced issue resolution time by 40%.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently based in Riyadh, Saudi Arabia, I hold a BS in Software Engineering from Capital University of
                Science & Technology and multiple certifications in Python, JavaScript, DevOps, and Data Science.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-2">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src="/images/profile.png" alt="Hani Mustafa Hashmi" fill className="object-cover" priority />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card hover:bg-card/80 transition-colors border-border">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Code2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-card-foreground">Clean Code</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Writing maintainable, scalable, and efficient code following industry best practices.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card hover:bg-card/80 transition-colors border-border">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-card-foreground">Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Constantly exploring new technologies and creative solutions to complex problems.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card hover:bg-card/80 transition-colors border-border">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-card-foreground">Performance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building fast, responsive applications that provide excellent user experiences.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
