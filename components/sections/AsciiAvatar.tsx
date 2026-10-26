'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const SRC = '/jose.jpg'
const COLS = 64
const RAMP = ' .:-=+*#%@'
const GLYPH_RATIO = 0.6 // ancho / alto de un carácter monoespaciado
const DECODE_MS = 1100
const HOLD_MS = 1400

/**
 * Retrato en ASCII rojo: al entrar en pantalla los caracteres se "decodifican"
 * y después se funden en la foto real. Con el mouse encima (o un toque) vuelve el ASCII.
 */
export default function AsciiAvatar() {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [photo, setPhoto] = useState(false)
  const revealed = useRef(false)

  useEffect(() => {
    const cv = canvas.current
    const box = wrap.current
    const ctx = cv?.getContext('2d')
    if (!cv || !box || !ctx) return

    let cancelled = false
    let raf = 0
    let holdTimer = 0
    let draw: ((t: number) => void) | null = null
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

    const img = new window.Image()
    img.src = SRC
    img.onload = () => {
      if (cancelled) return
      const dpr = Math.min(devicePixelRatio || 1, 2)
      const { width, height } = box.getBoundingClientRect()
      cv.width = Math.round(width * dpr)
      cv.height = Math.round(height * dpr)

      const cellW = cv.width / COLS
      const cellH = cellW / GLYPH_RATIO
      const rows = Math.floor(cv.height / cellH)

      // Brillo de cada celda, estirado al rango completo porque la foto es oscura
      const sample = document.createElement('canvas')
      sample.width = COLS
      sample.height = rows
      const sctx = sample.getContext('2d')!
      sctx.drawImage(img, 0, 0, COLS, rows)
      const px = sctx.getImageData(0, 0, COLS, rows).data
      const lum: number[] = []
      for (let i = 0; i < px.length; i += 4) lum.push(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2])
      const sorted = [...lum].sort((a, b) => a - b)
      const lo = sorted[Math.floor(sorted.length * 0.03)]
      const hi = sorted[Math.floor(sorted.length * 0.97)]
      const level = lum.map((l) => Math.pow(Math.min(1, Math.max(0, (l - lo) / (hi - lo || 1))), 0.85))

      // Cada celda se revela con una onda de arriba hacia abajo más algo de azar
      const revealAt = level.map((_, i) => (Math.floor(i / COLS) / rows) * DECODE_MS * 0.6 + Math.random() * DECODE_MS * 0.4)

      const mono = getComputedStyle(cv).getPropertyValue('--mono') || 'monospace'
      ctx.font = `${Math.round(cellH * 0.92)}px ${mono}`
      ctx.textBaseline = 'top'

      const color = (v: number) => {
        if (v < 0.5) {
          const k = v / 0.5
          return `rgb(${120 + 135 * k}, ${10 + 35 * k}, ${20 + 41 * k})`
        }
        const k = (v - 0.5) / 0.5
        return `rgb(255, ${45 + 165 * k}, ${61 + 149 * k})`
      }

      draw = (t: number) => {
        ctx.fillStyle = '#0b0607'
        ctx.fillRect(0, 0, cv.width, cv.height)
        for (let i = 0; i < level.length; i++) {
          const x = (i % COLS) * cellW
          const y = Math.floor(i / COLS) * cellH
          if (t < revealAt[i]) {
            if (Math.random() < 0.5) continue
            ctx.fillStyle = 'rgba(255,45,61,.35)'
            ctx.fillText(RAMP[1 + Math.floor(Math.random() * (RAMP.length - 1))], x, y)
            continue
          }
          const v = level[i]
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))]
          if (ch === ' ') continue
          ctx.fillStyle = color(v)
          ctx.fillText(ch, x, y)
        }
      }
      draw(0)

      // Arranca cuando el retrato entra en pantalla
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting || revealed.current) return
        io.disconnect()
        const start = performance.now()
        const step = (now: number) => {
          const t = reduce ? Infinity : now - start
          draw!(t)
          if (t < DECODE_MS) raf = requestAnimationFrame(step)
          else holdTimer = window.setTimeout(() => { revealed.current = true; setPhoto(true) }, HOLD_MS)
        }
        raf = requestAnimationFrame(step)
      }, { threshold: 0.4 })
      io.observe(box)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(holdTimer)
    }
  }, [])

  const showAscii = (on: boolean) => { if (revealed.current) setPhoto(!on) }

  return (
    <div
      ref={wrap}
      className={`avatar${photo ? ' photo' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && showAscii(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && showAscii(false)}
      onClick={() => showAscii(photo)}
    >
      <Image src={SRC} alt="José Asencio" fill sizes="(max-width: 960px) 420px, 330px" />
      <canvas ref={canvas} className="ascii" aria-hidden="true" />
      <small>José Asencio · Dev</small>
    </div>
  )
}
