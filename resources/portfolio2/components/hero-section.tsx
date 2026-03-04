"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, Cloud, Server, Lock } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Radial glow behind hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div
        style={{ y: y1, opacity, scale }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Status badge */}
        <ScrollReveal delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              Available for Opportunities
            </span>
          </div>
        </ScrollReveal>

        {/* Main headline */}
        <ScrollReveal delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
            Architecting{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Secure</span>
              <span className="absolute -inset-1 bg-primary/10 blur-lg rounded-lg" />
            </span>
            , Scalable Cloud Infrastructures
          </h1>
        </ScrollReveal>

        {/* Sub-headline */}
        <ScrollReveal delay={0.4}>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Army Network Engineer turned AWS Solutions Architect. Building resilient,
            mission-critical cloud systems with military-grade precision and security.
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>View Projects</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(56,130,246,0.1)]"
            >
              Let&apos;s Connect
            </a>
          </div>
        </ScrollReveal>

        {/* Floating icons */}
        <motion.div style={{ y: y2 }} className="mt-16 flex items-center justify-center gap-8">
          {[
            { Icon: Cloud, label: "AWS Cloud" },
            { Icon: Server, label: "Infrastructure" },
            { Icon: Lock, label: "Security" },
          ].map(({ Icon, label }, i) => (
            <ScrollReveal key={label} delay={0.8 + i * 0.15} direction="scale">
              <div className="group flex flex-col items-center gap-2">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl border border-glass-border bg-glass backdrop-blur-xl transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(56,130,246,0.15)]"
                  style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}
                >
                  <Icon className="h-6 w-6 text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            </ScrollReveal>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="h-10 w-6 rounded-full border border-glass-border flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
