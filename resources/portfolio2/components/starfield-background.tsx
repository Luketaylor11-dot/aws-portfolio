"use client"

import { useEffect, useRef, useCallback } from "react"

interface Star {
  x: number
  y: number
  z: number
  ox: number
  oy: number
  size: number
  speed: number
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // Initialize stars on first frame
    if (!canvasRef.current?.dataset.initialized) {
      canvasRef.current!.dataset.initialized = "true"
    }

    ctx.clearRect(0, 0, w, h)

    // Draw gradient background
    const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7)
    bg.addColorStop(0, "rgba(15, 23, 42, 1)")
    bg.addColorStop(0.5, "rgba(10, 15, 30, 1)")
    bg.addColorStop(1, "rgba(5, 8, 18, 1)")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    // Create stars
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 3,
      ox: 0,
      oy: 0,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.3 + 0.05,
    }))

    // Create nodes for network
    const nodes: Node[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
    }))

    let time = 0

    const draw = () => {
      time += 0.005
      ctx.clearRect(0, 0, w, h)

      // Deep background
      const bg = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w / 2, h / 2, w * 0.8)
      bg.addColorStop(0, "rgba(15, 25, 50, 1)")
      bg.addColorStop(0.4, "rgba(8, 14, 32, 1)")
      bg.addColorStop(1, "rgba(4, 6, 14, 1)")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Grid pattern (subtle)
      ctx.strokeStyle = "rgba(56, 130, 246, 0.03)"
      ctx.lineWidth = 0.5
      const gridSize = 60
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Draw stars with parallax & twinkle
      stars.forEach((star) => {
        const parallax = star.z * 0.5
        const px = star.x + mouseRef.current.x * parallax * 0.01
        const py = star.y + mouseRef.current.y * parallax * 0.01
        const twinkle = 0.4 + Math.sin(time * 3 + star.x) * 0.6
        const alpha = twinkle * (0.3 + star.z * 0.2)

        ctx.beginPath()
        ctx.arc(px, py, star.size * (0.5 + star.z * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140, 180, 255, ${alpha})`
        ctx.fill()

        // Star glow for larger ones
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(px, py, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(56, 130, 246, ${alpha * 0.1})`
          ctx.fill()
        }

        // Slow drift
        star.y += star.speed
        if (star.y > h + 10) {
          star.y = -10
          star.x = Math.random() * w
        }
      })

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 130, 246, 0.4)`
        ctx.fill()

        // Node glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 130, 246, 0.05)`
        ctx.fill()
      })

      // Draw connections between nearby nodes
      const connectionDist = 180
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.15
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(56, 130, 246, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Bokeh circles (depth of field effect)
      const bokehCount = 8
      for (let i = 0; i < bokehCount; i++) {
        const bx = (Math.sin(time * 0.3 + i * 1.5) * 0.5 + 0.5) * w
        const by = (Math.cos(time * 0.2 + i * 2) * 0.5 + 0.5) * h
        const bSize = 30 + Math.sin(time + i) * 20
        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, bSize)
        gradient.addColorStop(0, `rgba(56, 130, 246, 0.04)`)
        gradient.addColorStop(0.5, `rgba(56, 130, 246, 0.02)`)
        gradient.addColorStop(1, `rgba(56, 130, 246, 0)`)
        ctx.beginPath()
        ctx.arc(bx, by, bSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX - w / 2,
        y: e.clientY - h / 2,
      }
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("resize", handleResize)
    }
  }, [animate])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ filter: "blur(0.5px)" }}
      aria-hidden="true"
    />
  )
}
