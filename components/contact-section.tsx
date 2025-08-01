import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, MessageSquare, Github, Linkedin, Code2 } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <a
                href="mailto:hanimhashmi121@gmail.com"
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-card-foreground mb-2">Email Me</h3>
                  <p className="text-muted-foreground">hanimhashmi121@gmail.com</p>
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Send Email</Button>
              </a>
            </Card>

            <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <a
                href="https://wa.me/966573542790"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-card-foreground mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground">+966 573542790</p>
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Chat on WhatsApp
                </Button>
              </a>
            </Card>
          </div>

          <Card className="p-8 bg-card border-border">
            <h3 className="text-2xl font-serif font-semibold text-card-foreground mb-6 text-center">Connect With Me</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hover:border-primary hover:text-primary bg-transparent"
              >
                <a href="https://github.com/hanihashmi333" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hover:border-primary hover:text-primary bg-transparent"
              >
                <a href="https://linkedin.com/in/hanihashmi786" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
