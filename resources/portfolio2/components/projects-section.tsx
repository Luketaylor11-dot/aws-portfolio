"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import {
  ExternalLink,
  Github,
  X,
  Cloud,
  Network,
  Server,
  Lock,
  Layers,
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Laravel on AWS",
    subtitle: "Full-Stack Cloud Deployment",
    description:
      "End-to-end deployment of a Laravel application on AWS infrastructure. Configured EC2 instances with auto-scaling groups, RDS for MySQL, S3 for asset storage, and CloudFront CDN. Implemented CI/CD pipeline with CodePipeline and CodeDeploy for zero-downtime deployments.",
    tags: ["AWS EC2", "RDS", "S3", "CloudFront", "Laravel", "CodePipeline"],
    Icon: Cloud,
    highlights: [
      "99.9% uptime with auto-scaling",
      "60% reduction in deployment time",
      "SSL/TLS encryption end-to-end",
    ],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Enterprise VPC Architecture",
    subtitle: "Multi-Tier Network Design",
    description:
      "Designed and implemented a multi-tier VPC architecture with public, private, and isolated subnets across multiple Availability Zones. Configured NAT Gateways, VPC Peering, and Transit Gateway for inter-VPC communication. Implemented VPC Flow Logs and GuardDuty for security monitoring.",
    tags: ["VPC", "Transit Gateway", "NAT", "Flow Logs", "GuardDuty"],
    Icon: Network,
    highlights: [
      "Multi-AZ high availability",
      "Network segmentation & isolation",
      "Real-time threat detection",
    ],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "Serverless API Gateway",
    subtitle: "Microservices Architecture",
    description:
      "Built a serverless microservices architecture using API Gateway, Lambda functions, and DynamoDB. Implemented authentication with Cognito, request throttling, and custom authorizers. Created CloudFormation templates for infrastructure-as-code deployment.",
    tags: ["API Gateway", "Lambda", "DynamoDB", "Cognito", "CloudFormation"],
    Icon: Server,
    highlights: [
      "Sub-100ms response times",
      "Auto-scaling to 10K+ requests/sec",
      "Infrastructure as Code",
    ],
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "Network Security Lab",
    subtitle: "Penetration Testing & Hardening",
    description:
      "Comprehensive network security laboratory environment for testing firewall configurations, IDS/IPS systems, and security policies. Includes automated vulnerability scanning, compliance checking against CIS benchmarks, and incident response playbooks.",
    tags: ["Firewall", "IDS/IPS", "CIS Benchmarks", "Nmap", "Wireshark"],
    Icon: Lock,
    highlights: [
      "Automated vulnerability assessment",
      "CIS benchmark compliance",
      "Incident response automation",
    ],
    github: "#",
    live: "#",
  },
  {
    id: 5,
    title: "Hybrid Cloud Migration",
    subtitle: "On-Prem to AWS Migration",
    description:
      "Led the migration of legacy on-premises infrastructure to AWS hybrid cloud architecture. Utilized AWS Migration Hub, DMS for database migration, and Direct Connect for secure hybrid connectivity. Reduced infrastructure costs by 40% while improving performance.",
    tags: ["Migration Hub", "DMS", "Direct Connect", "CloudEndure"],
    Icon: Layers,
    highlights: [
      "40% cost reduction",
      "Zero data loss migration",
      "Hybrid connectivity via Direct Connect",
    ],
    github: "#",
    live: "#",
  },
]

function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0]
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative text-left w-full rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(56,130,246,0.12)] cursor-pointer"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Rim light */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_1px_0_rgba(56,130,246,0.3),inset_0_-1px_0_rgba(56,130,246,0.1),0_0_20px_rgba(56,130,246,0.08)]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-500">
            <project.Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-primary/10 bg-primary/5 px-2.5 py-0.5 text-xs font-mono text-primary/80"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="inline-flex items-center text-xs text-muted-foreground">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-glass-border bg-surface backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(56,130,246,0.1)]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-glass transition-colors"
          aria-label="Close project details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <project.Icon className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Key Achievements
          </h4>
          <div className="space-y-2">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-mono text-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
          <a
            href={project.github}
            className="inline-flex items-center gap-2 rounded-lg border border-glass-border bg-glass px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <Github className="h-4 w-4" />
            Source Code
          </a>
          <a
            href={project.live}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-[0_0_20px_rgba(56,130,246,0.3)] transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(
    null
  )

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">
                Featured Work
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
              Featured Projects
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Real-world cloud architectures and network engineering solutions built
              with security and scalability at the core.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.1} direction="up">
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
