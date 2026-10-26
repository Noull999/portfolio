'use client'

import { useEffect, useRef } from 'react'

const COLS = 88
const STREAKS = 34

type Streak = { x: number; y: number; v: number; len: number }

/** Haz de píxeles: canvas de baja resolución escalado, ~30 fps y en pausa fuera de pantalla */
export default function BeamPixels() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext('2d')
    if (!cv || !ctx) return

    let rows = 0
    let img: ImageData
    let streaks: Streak[] = []

    const newStreak = (): Streak => {
      // Más probabilidad cerca del centro
      const off = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
      return { x: Math.round(COLS / 2 + off * COLS * 0.32), y: -Math.random() * 30, v: 0.25 + Math.random() * 0.9, len: 4 + Math.random() * 14 }
    }
    const falloff = (x: number) => {
      const d = (x - COLS / 2 + 0.5) / (COLS * 0.13)
      return Math.exp(-d * d)
    }

    const setup = () => {
      const r = cv.getBoundingClientRect()
      rows = Math.max(40, Math.round((COLS * r.height) / Math.max(r.width, 1)))
      cv.width = COLS
      cv.height = rows
      img = ctx.createImageData(COLS, rows)
      streaks = Array.from({ length: STREAKS }, newStreak)
      streaks.forEach((s) => { s.y = Math.random() * rows })
    }

    const draw = () => {
      const d = img.data
      for (let y = 0; y < rows; y++) {
        const depth = y / rows
        for (let x = 0; x < COLS; x++) {
          const f = falloff(x)
          const a = f * (0.12 + depth * 0.35) * (Math.random() < 0.08 ? 1.8 : 1)
          const i = (y * COLS + x) * 4
          const w = f * f
          d[i] = 255
          d[i + 1] = 45 + 200 * w
          d[i + 2] = 61 + 190 * w
          d[i + 3] = Math.min(255, a * 255)
        }
      }
      for (const s of streaks) {
        for (let k = 0; k < s.len; k++) {
          const y = Math.floor(s.y) - k
          if (y < 0 || y >= rows || s.x < 0 || s.x >= COLS) continue
          const i = (y * COLS + s.x) * 4
          const t = 1 - k / s.len
          d[i] = 255
          d[i + 1] = 150 + 105 * t
          d[i + 2] = 155 + 100 * t
          d[i + 3] = Math.min(255, d[i + 3] + t * 200 * (0.4 + falloff(s.x)))
        }
        s.y += s.v
        if (s.y - s.len > rows) Object.assign(s, newStreak())
      }
      ctx.putImageData(img, 0, 0)
    }

    setup()
    draw()

    let visible = true
    let last = 0
    let raf = 0
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(cv)
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden || t - last < 33) return
      last = t
      draw()
    }
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) raf = requestAnimationFrame(loop)

    const onResize = () => { setup(); draw() }
    addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="beam-pixels" />
}
