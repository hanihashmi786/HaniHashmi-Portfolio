export function Footer() {
  return (
    <footer className="py-8 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Hani Hashmi. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Software Engineer | Full Stack Developer</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
