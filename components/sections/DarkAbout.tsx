'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import LiquidChromeShader from '@/components/three/LiquidChromeShader'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
})

const ROLES = ['Full-Stack', 'Automatización Industrial', 'Soporte IT']
const LINE_WIDTHS = [72, 44, 88, 28]

function DrawLines() {
  return (
    <div className="mt-16 space-y-[10px]" aria-hidden>
      {LINE_WIDTHS.map((w, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: 'left',
            width: `${w}%`,
            height: '1px',
            background: i === 0
              ? 'linear-gradient(to right, rgba(255,23,68,0.55), transparent)'
              : 'linear-gradient(to right, rgba(255,255,255,0.09), transparent)',
          }}
        />
      ))}
    </div>
  )
}

export default function DarkAbout() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting), { threshold: 0 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <section id="about" className="dot-grid relative bg-[var(--bg)] px-6 py-32 sm:px-10 lg:px-24" ref={sectionRef}>
      {/* Liquid Chrome shader background */}
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ zIndex: 1 }}>
        {isVisible && <LiquidChromeShader />}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute right-8 top-8 select-none leading-none text-white opacity-[0.022]"
        style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(6rem,18vw,16rem)', zIndex: 2 }}
      >
        001
      </span>
      <div className="mx-auto max-w-6xl relative" style={{ zIndex: 3 }}>
        <motion.p
          {...fade(0)}
          className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          <span className="text-white/35">001</span>&nbsp;&nbsp;/&nbsp;&nbsp;Sobre mí
        </motion.p>

        <motion.h2
          {...fade(0.1)}
          className="chrome-text uppercase"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: 'clamp(2.6rem, 7vw, 6rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            maxWidth: '16ch',
          }}
        >
          Construyo software con precisión de artesano
        </motion.h2>

        <motion.p
          {...fade(0.2)}
          className="mt-10 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Analista Programador titulado, desarrollador Full-Stack y automatizador industrial.
          Del backend a la planta — diseño, construyo y despliego con la misma obsesión por el
          detalle. Cada proyecto es una pieza tallada, no una plantilla. Desde Puerto Montt, Chile.
        </motion.p>

        <motion.div {...fade(0.3)} className="mt-12 flex flex-wrap gap-3">
          {ROLES.map((r) => (
            <span
              key={r}
              className="rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white/80"
              style={{ borderColor: 'var(--border)' }}
            >
              {r}
            </span>
          ))}
        </motion.div>

        <DrawLines />
      </div>
    </section>
  )
}
