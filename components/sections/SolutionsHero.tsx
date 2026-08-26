'use client'

import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.7, ease: 'easeOut' as const, delay },
})

export default function SolutionsHero() {
  return (
    <section
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center sm:px-10"
      style={{ background: 'rgba(5,6,10,0.72)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 20%, rgba(255,23,68,0.08), transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-3xl" style={{ zIndex: 1 }}>
        <motion.p
          {...fade(0)}
          className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          Soluciones para pymes
        </motion.p>

        <motion.h1
          {...fade(0.1)}
          className="chrome-text uppercase"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: 'clamp(2.4rem, 8vw, 5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
          }}
        >
          Software que ya funciona, listo para tu negocio
        </motion.h1>

        <motion.p
          {...fade(0.2)}
          className="mt-8 text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Sistemas probados en producción — reservas online, facturación — que adapto a tu marca
          y tu rubro en días, no meses. Nada de empezar de cero.
        </motion.p>
      </div>
    </section>
  )
}
