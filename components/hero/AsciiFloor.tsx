'use client'

import { useEffect, useRef } from 'react'

const RAMP = '.:;+*#@'
const CELL = 11 // px por carácter (alto); el ancho sale de la proporción del glifo
const GLYPH_RATIO = 0.6

/** Donde el haz toca el piso, los píxeles se dispersan en caracteres ASCII. ~20 fps y en pausa fuera de pantalla. */
export default function AsciiFloor() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext('2d')
    if (!cv || !ctx) return

    let cols = 0
    let rows = 0
    let cw = 0
    let ch = 0
    const dpr = Math.min(devicePixelRatio || 1, 2)

    const setup = () => {
      const r = cv.getBoundingClientRect()
      cv.width = Math.round(r.width * dpr)
      cv.height = Math.round(r.height * dpr)
      ch = CELL * dpr
      cw = ch * GLYPH_RATIO
      cols = Math.floor(cv.width / cw)
      rows = Math.floor(cv.height / ch)
      const mono = getComputedStyle(cv).getPropertyValue('--mono') || 'monospace'
      ctx.font = `${Math.round(ch * 0.95)}px ${mono}`
      ctx.textBaseline = 'top'
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      for (let y = 0; y < rows; y++) {
        const depth = (y + 1) / rows
        // Más ancho cuanto más cerca del piso: la luz "salpica"
        const spread = 0.05 + depth * depth * 0.45
        for (let x = 0; x < cols; x++) {
          const d = (x - cols / 2) / (cols * spread)
          const base = Math.exp(-d * d) * (0.25 + 0.75 * depth * depth)
          const flicker = 0.55 + 0.45 * Math.sin(t * 0.004 + x * 1.7 + y * 2.3) * Math.sin(t * 0.0023 + x * 0.6)
          const v = base * flicker
          if (v < 0.06 || Math.random() < 0.2) continue
          const k = Math.min(1, v * 1.4)
          ctx.fillStyle = `rgba(255, ${45 + 190 * k * k}, ${61 + 180 * k * k}, ${Math.min(0.95, v * 2.2)})`
          ctx.fillText(RAMP[Math.min(RAMP.length - 1, Math.floor(k * RAMP.length))], x * cw, y * ch)
        }
      }
    }

    setup()
    draw(0)

    let visible = true
    let last = 0
    let raf = 0
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(cv)
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden || t - last < 50) return
      last = t
      draw(t)
    }
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(loop)

    const onResize = () => { setup(); draw(performance.now()) }
    addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="ascii-floor" />
}
