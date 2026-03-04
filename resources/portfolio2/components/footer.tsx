"use client"

import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-glass-border bg-glass/30 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 border border-primary/20">
              <Shield className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">
              CloudArch &copy; {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Architecting the future of cloud infrastructure, one deployment at a time.
          </p>
          <div className="flex items-center gap-4">
            {["Home", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
