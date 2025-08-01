"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiFlask,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiFigma,
} from "react-icons/si"
import { Brain, MessageSquare, Code2 } from "lucide-react"

const techStack = [
  { name: "Python", icon: SiPython, level: 90, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, level: 88, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, level: 85, color: "#3178C6" },
  { name: "React", icon: SiReact, level: 95, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, level: 92, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 88, color: "#06B6D4" },
  { name: "Flask", icon: SiFlask, level: 85, color: "#000000" },
  { name: "Django", icon: SiDjango, level: 85, color: "#092E20" },
  { name: "Node.js", icon: SiNodedotjs, level: 90, color: "#339933" },
  { name: "Express", icon: SiExpress, level: 88, color: "#000000" },
  { name: "PostgreSQL", icon: SiPostgresql, level: 85, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, level: 88, color: "#47A248" },
  { name: "AI/ML", icon: Brain, level: 80, color: "#FF6B6B" },
  { name: "NLP", icon: MessageSquare, level: 78, color: "#4ECDC4" },
]

const tools = [
  { name: "Git", icon: SiGit, level: 92, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, level: 92, color: "#181717" },
  { name: "Docker", icon: SiDocker, level: 75, color: "#2496ED" },
  { name: "VS Code", icon: Code2, level: 95, color: "#007ACC" },
  { name: "Postman", icon: SiPostman, level: 88, color: "#FF6C37" },
  { name: "Figma", icon: SiFigma, level: 80, color: "#F24E1E" },
]

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"tech" | "tools">("tech")
  const currentSkills = activeTab === "tech" ? techStack : tools

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Skills & Technologies</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern web applications
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              onClick={() => setActiveTab("tech")}
              variant={activeTab === "tech" ? "default" : "outline"}
              size="lg"
              className="px-8 transition-all duration-300"
            >
              Tech Stack
            </Button>
            <Button
              onClick={() => setActiveTab("tools")}
              variant={activeTab === "tools" ? "default" : "outline"}
              size="lg"
              className="px-8 transition-all duration-300"
            >
              Tools
            </Button>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {currentSkills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <Card
                  key={skill.name}
                  className="group relative p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="relative">
                      <Icon className="h-12 w-12 transition-colors duration-300" style={{ color: skill.color }} />

                      {/* Skill Level Tooltip on Hover */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                          {skill.level}% Proficiency
                        </div>
                        <div className="w-2 h-2 bg-primary rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-card-foreground text-center">{skill.name}</span>
                  </div>

                  {/* Progress Bar on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
