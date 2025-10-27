"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Smartphone, Lock } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const projects = [
  {
    title: "Break Portal",
    description:
      "A comprehensive web portal built with React and Python backend, streamlining business operations and user management.",
    tech: ["React", "Python", "Flask", "PostgreSQL"],
    liveUrl: "https://breakportal.marsbpo.team/login",
    githubUrl: null,
    codeConfidential: true,
    status: "live",
    previewUrl: "https://breakportal.marsbpo.team/login",
  },
  {
    title: "Call Loom",
    description:
      "Comprehensive communication platform with both mobile app and web version. Built with React Native for mobile and React for web, featuring call management, analytics, and real-time communication.",
    tech: ["React Native", "React", "Node.js", "MongoDB"],
    liveUrl: "https://callloom.com/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.calloom3",
    githubUrl: null,
    codeConfidential: true,
    status: "live",
    previewUrl: "https://callloom.com/",
  },
  {
    title: "Data Scrubber",
    description:
      "Data cleaning and processing tool utilizing Python and machine learning algorithms for data quality improvement.",
    tech: ["Python", "Django", "Machine Learning", "PostgreSQL"],
    liveUrl: "https://scrubber.marsbpo.team/",
    githubUrl: null,
    codeConfidential: true,
    status: "live",
    previewUrl: "https://scrubber.marsbpo.team/",
  },
  {
    title: "Dial Loom",
    description:
      "Advanced dialing system mobile app with real-time communication features and user-friendly interface.",
    tech: ["React Native", "TypeScript", "Express"],
    liveUrl: "#",
    githubUrl: null,
    codeConfidential: true,
    status: "ui-only",
    statusText: "UI Design for Team",
  },
  {
    title: "Taskio",
    description:
      "Task management and productivity application with real-time collaboration features built using the MERN stack.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/hanihashmi786/taskio",
    codeConfidential: false,
    status: "archived",
    statusText: "Removed by company - Code available",
  },
  {
    title: "Rujo-illalah",
    description: "Islamic mobile application providing spiritual guidance and resources, built with React Native.",
    tech: ["React Native", "Firebase", "TypeScript"],
    liveUrl: "#",
    githubUrl: null,
    codeConfidential: false,
    status: "in-progress",
    statusText: "In Progress",
  },
]

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work showcasing various technologies and problem-solving approaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group relative overflow-visible bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {hoveredProject === index && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-50 pointer-events-none mb-2">
                    <div className="w-80 bg-card/95 backdrop-blur-md rounded-xl shadow-2xl border border-primary/20 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                      {project.status === "live" && project.previewUrl ? (
                        <div className="relative">
                          <div className="bg-muted/50 px-3 py-2 flex items-center gap-2 border-b border-border/50">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-red-500/80" />
                              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                              <div className="w-2 h-2 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 text-center">
                              <span className="text-xs text-muted-foreground font-medium">{project.title}</span>
                            </div>
                          </div>
                          <div className="aspect-video bg-muted/30 overflow-hidden">
                            <iframe
                              src={project.previewUrl}
                              className="w-full h-full scale-75 origin-top-left"
                              style={{ width: "133.33%", height: "133.33%" }}
                              title={`${project.title} preview`}
                            />
                          </div>
                          <div className="px-3 py-2 bg-muted/30 border-t border-border/50">
                            <div className="text-xs text-center text-primary font-medium">🟢 Live Project</div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 text-center">
                          <div className="mb-3">
                            {project.status === "in-progress" && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-full">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-xs font-medium">In Progress</span>
                              </div>
                            )}
                            {project.status === "ui-only" && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-full">
                                <span className="text-xs font-medium">UI Design</span>
                              </div>
                            )}
                            {project.status === "archived" && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-500 rounded-full">
                                <span className="text-xs font-medium">Archived</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                          <div className="text-xs text-muted-foreground">{project.statusText}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-serif font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {project.status === "live" ? (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {project.status === "in-progress" ? "Coming Soon" : "Not Available"}
                      </Button>
                    )}
                    {project.playStoreUrl ? (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                          <Smartphone className="h-4 w-4 mr-2" />
                          Play Store
                        </a>
                      </Button>
                    ) : project.codeConfidential ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex-1">
                              <Button variant="outline" size="sm" className="w-full bg-transparent" disabled>
                                <Lock className="h-4 w-4 mr-2" />
                                Code
                              </Button>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">Source code cannot be disclosed due to company policy and confidentiality agreements.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : project.githubUrl ? (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
