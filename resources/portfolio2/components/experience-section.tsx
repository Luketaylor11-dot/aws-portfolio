"use client"

import { ScrollReveal } from "./scroll-reveal"
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react"

const experiences = [
  {
    role: "AWS Solutions Architect",
    company: "Cloud Architecture Consulting",
    period: "2023 - Present",
    location: "Remote",
    description:
      "Design and implement enterprise cloud architectures on AWS. Lead migration strategies for on-premises workloads, optimize cost structures, and ensure security compliance across multi-account environments.",
    highlights: [
      "Architected 15+ production environments on AWS",
      "Reduced client infrastructure costs by an average of 35%",
      "Implemented zero-trust security across all deployments",
    ],
  },
  {
    role: "Network Engineer",
    company: "United States Army",
    period: "2019 - 2023",
    location: "Multiple Duty Stations",
    description:
      "Managed and secured tactical and garrison network infrastructure supporting mission-critical operations. Responsible for network design, implementation, and maintenance across classified and unclassified environments.",
    highlights: [
      "Maintained 99.99% uptime for mission-critical networks",
      "Managed infrastructure supporting 2,000+ users",
      "Led network modernization initiatives across post",
    ],
  },
  {
    role: "Signal Support Systems Specialist",
    company: "United States Army",
    period: "2017 - 2019",
    location: "Fort Hood, TX",
    description:
      "Installed, operated, and maintained tactical communication systems. Configured routers, switches, and secure communication equipment. Earned Security+ and Network+ certifications while on active duty.",
    highlights: [
      "Earned CompTIA Security+ and Network+",
      "Configured and maintained SIPR/NIPR networks",
      "Trained 20+ soldiers on network operations",
    ],
  },
  {
    role: "IT Support & Early Career",
    company: "Pre-Military Service",
    period: "2015 - 2017",
    location: "Various",
    description:
      "Built foundational IT skills through hands-on technical support roles. Developed passion for networking and infrastructure that led to pursuing a career in military network engineering.",
    highlights: [
      "Help desk and tier-2 technical support",
      "Hardware and software troubleshooting",
      "Earned CompTIA A+ certification",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">
                Career Path
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
              Experience
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              From Army network operations to architecting cloud solutions --
              a journey rooted in discipline, security, and continuous growth.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-glass-border" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} direction="left">
                <div className="relative pl-8 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 -translate-x-1/2 top-1">
                    <div className="relative">
                      <div className="h-4 w-4 rounded-full border-2 border-primary bg-background" />
                      <div className="absolute inset-0 h-4 w-4 rounded-full bg-primary/30 blur-sm" />
                    </div>
                  </div>

                  <div className="group rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(56,130,246,0.06)]">
                    {/* Rim light */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_1px_0_rgba(56,130,246,0.2)]" />

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-primary/80 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5">
                      {exp.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-2">
                          <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                          <span className="text-xs text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
