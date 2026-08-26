'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Hablamos',
    text: 'Me contás qué necesita tu negocio — qué querés resolver, qué usás hoy (planilla, papel, WhatsApp).',
  },
  {
    n: '02',
    title: 'Lo adapto',
    text: 'Tomo el sistema base y lo ajusto a tu marca, tus servicios y tu forma de trabajar. No partimos de cero.',
  },
  {
    n: '03',
    title: 'Lo lanzás',
    text: 'Queda online, con tu dominio si querés, y te muestro cómo usarlo. Soporte para lo que necesites después.',
  },
]

export default function SolutionsProcess() {
  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-24" style={{ background: 'rgba(5,6,10,0.72)' }}>
      <div className="relative mx-auto max-w-5xl" style={{ zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          Cómo funciona
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
              className="relative text-center sm:text-left"
            >
              <span
                className="chrome-text block"
                style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: '2.5rem', lineHeight: 1 }}
              >
                {step.n}
              </span>
              <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
