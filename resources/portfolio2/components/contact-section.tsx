"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import {
  Send,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/3 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">
                Get in Touch
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
              Let&apos;s Build Together
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Have a cloud project in mind? Looking for an AWS Solutions Architect?
              Let&apos;s connect and make it happen.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-8 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(56,130,246,0.06)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Message Sent
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl border border-glass-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-glass-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      placeholder="Project inquiry"
                      className="w-full rounded-xl border border-glass-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full rounded-xl border border-glass-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,130,246,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Sidebar info */}
          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="flex flex-col gap-6 h-full">
              {/* Social links */}
              <div className="rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 hover:border-primary/20 transition-all duration-500">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  Connect
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      Icon: Github,
                      label: "GitHub",
                      href: "https://github.com",
                      handle: "@yourusername",
                    },
                    {
                      Icon: Linkedin,
                      label: "LinkedIn",
                      href: "https://linkedin.com",
                      handle: "/in/yourprofile",
                    },
                    {
                      Icon: Mail,
                      label: "Email",
                      href: "mailto:hello@example.com",
                      handle: "hello@example.com",
                    },
                  ].map(({ Icon, label, href, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl p-3 -mx-3 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/15 group-hover:bg-primary/15 group-hover:border-primary/25 transition-all">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground truncate">{handle}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick info */}
              <div className="rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 flex-1 hover:border-primary/20 transition-all duration-500">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  Quick Info
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Location", value: "United States" },
                    { label: "Availability", value: "Open to opportunities" },
                    { label: "Response Time", value: "Within 24 hours" },
                    { label: "Certifications", value: "AWS SAA, Security+, Network+" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm text-foreground font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
