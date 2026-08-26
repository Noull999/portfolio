'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from '@/components/ui/icons'
import { SOCIAL } from '@/lib/data'

export default function SolutionsCTA() {
  return (
    <section
      className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
      style={{ background: 'rgba(5,6,10,0.72)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 60%, rgba(255,23,68,0.08), transparent 70%)' }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="chrome-text relative uppercase"
        style={{
          fontFamily: 'var(--font-anton), sans-serif',
          fontSize: 'clamp(2.4rem, 9vw, 6rem)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
        }}
      >
        ¿Le sirve a tu negocio?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative mt-8 max-w-md text-base text-white/60"
      >
        Contame de tu negocio y vemos juntos cómo adaptarlo. Sin compromiso.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="relative mt-10"
      >
        <a
          href={`mailto:${SOCIAL.email}?subject=Consulta%20sobre%20soluciones%20para%20mi%20negocio`}
          data-track="contacto-soluciones"
          className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{ borderColor: 'rgba(255,255,255,0.8)' }}
        >
          Conversemos
          <ArrowUpRight width={18} height={18} />
        </a>
      </motion.div>
    </section>
  )
}
