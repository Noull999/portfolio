'use client'

import { useEffect, useRef } from 'react'

const N = 65
const LINK_DIST = 150
const REPEL = 110

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; a: number
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    let rafId: number
    const mouse = { x: -999, y: -999 }
    const particles: Particle[] = []

    function resize() {
      if (!canvas) return
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    function init() {
      particles.length = 0
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 1 + Math.random() * 2,
          a: 0.15 + Math.random() * 0.35,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const accent = '#ff1744'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repel
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL && dist > 0) {
          p.vx += (dx / dist) * 0.12
          p.vy += (dy / dist) * 0.12
        }

        // Speed limit
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 1.4) { p.vx = (p.vx / spd) * 1.4; p.vy = (p.vy / spd) * 1.4 }

        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = accent
        ctx.globalAlpha = p.a
        ctx.fill()

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const ddx = p.x - q.x
          const ddy = p.y - q.y
          const dd = Math.sqrt(ddx * ddx + ddy * ddy)
          if (dd < LINK_DIST) {
            ctx.globalAlpha = (1 - dd / LINK_DIST) * 0.14
            ctx.strokeStyle = accent
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onResize = () => { resize(); init() }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    resize()
    init()
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
