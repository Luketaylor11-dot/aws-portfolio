"use client"

import { motion } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale"
  duration?: number
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
}: ScrollRevealProps) {
  const directionVariants = {
    up: { y: 60, x: 0, scale: 1 },
    down: { y: -60, x: 0, scale: 1 },
    left: { y: 0, x: 60, scale: 1 },
    right: { y: 0, x: -60, scale: 1 },
    scale: { y: 0, x: 0, scale: 0.85 },
  }

  const initial = directionVariants[direction]

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
