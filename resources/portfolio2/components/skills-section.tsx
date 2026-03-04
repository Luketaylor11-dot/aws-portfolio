"use client"

import { ScrollReveal } from "./scroll-reveal"
import {
  Cloud,
  Server,
  Shield,
  Globe,
  Database,
  Code,
  Network,
  Lock,
  HardDrive,
} from "lucide-react"

const skillCategories = [
  {
    title: "AWS Cloud",
    Icon: Cloud,
    skills: [
      { name: "EC2", level: 95 },
      { name: "VPC", level: 90 },
      { name: "S3", level: 92 },
      { name: "Route 53", level: 88 },
      { name: "IAM", level: 93 },
      { name: "CloudFormation", level: 85 },
    ],
  },
  {
    title: "Network Engineering",
    Icon: Network,
    skills: [
      { name: "TCP/IP", level: 95 },
      { name: "DNS", level: 92 },
      { name: "OSPF/BGP", level: 88 },
      { name: "VPN/IPSec", level: 90 },
      { name: "Firewalls", level: 93 },
      { name: "Subnetting", level: 95 },
    ],
  },
  {
    title: "Development",
    Icon: Code,
    skills: [
      { name: "Laravel", level: 88 },
      { name: "PHP", level: 85 },
      { name: "MySQL", level: 82 },
      { name: "REST APIs", level: 87 },
      { name: "Git", level: 90 },
      { name: "Docker", level: 80 },
    ],
  },
  {
    title: "Security",
    Icon: Shield,
    skills: [
      { name: "Network Security", level: 93 },
      { name: "Encryption", level: 88 },
      { name: "Compliance", level: 85 },
      { name: "Pen Testing", level: 78 },
      { name: "SIEM", level: 82 },
      { name: "Zero Trust", level: 86 },
    ],
  },
  {
    title: "Infrastructure",
    Icon: Server,
    skills: [
      { name: "Linux Admin", level: 90 },
      { name: "Windows Server", level: 85 },
      { name: "Active Directory", level: 88 },
      { name: "Ansible", level: 78 },
      { name: "Terraform", level: 82 },
      { name: "CI/CD", level: 80 },
    ],
  },
  {
    title: "Services & Tools",
    Icon: HardDrive,
    skills: [
      { name: "CloudWatch", level: 85 },
      { name: "Lambda", level: 82 },
      { name: "RDS", level: 88 },
      { name: "ELB", level: 86 },
      { name: "SNS/SQS", level: 80 },
      { name: "ElastiCache", level: 78 },
    ],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6">
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
              <Globe className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">
                Technical Arsenal
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
              Skills & Technologies
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A comprehensive toolkit built through years of military network engineering
              and cloud architecture.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <ScrollReveal key={category.title} delay={idx * 0.1} direction="scale">
              <div className="group relative h-full rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(56,130,246,0.08)]">
                {/* Rim lighting effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_1px_rgba(56,130,246,0.4),0_0_15px_rgba(56,130,246,0.05)]" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                      <category.Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-28 shrink-0">
                          {skill.name}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary/60 group-hover:bg-primary/80 transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono w-8 text-right">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
