'use client'

import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
})

const ROLES = ['Full-Stack', 'Automatización Industrial', 'Soporte IT']

export default function DarkAbout() {
  return (
    <section id="about" className="dot-grid relative bg-[var(--bg)] px-6 py-32 sm:px-10 lg:px-24">
      {/* glow blanco tenue esquina superior derecha */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 45% 35% at 90% 10%, rgba(255,255,255,0.05), transparent 70%)' }}
      />
      <div className="mx-auto max-w-6xl">
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
      </div>
    </section>
  )
}
