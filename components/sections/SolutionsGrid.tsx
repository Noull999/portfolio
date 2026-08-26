'use client'

import { motion } from 'framer-motion'
import { SOLUTIONS } from '@/lib/data'
import { ArrowUpRight } from '@/components/ui/icons'

function SolutionCard({ solution, i }: { solution: (typeof SOLUTIONS)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
      className="glass-card group relative flex flex-col rounded-xl p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-4 select-none uppercase opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.13]"
        style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: '5rem', lineHeight: 1 }}
      >
        {String(i + 1).padStart(2, '0')}
      </span>

      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: solution.color }}>
          {solution.tag}
        </p>
        <span
          className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/70"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}
        >
          Personalizable
        </span>
      </div>

      <h3
        className="relative mt-4 uppercase text-white"
        style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: '1.9rem', lineHeight: 1.05, letterSpacing: '0.01em' }}
      >
        {solution.title}
      </h3>

      <p className="mt-3 text-sm font-semibold" style={{ color: solution.color }}>
        {solution.pitch}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-white/60">{solution.description}</p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {solution.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-white/70">
            <span className="mt-0.5 shrink-0" style={{ color: solution.color }}>
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <div className="mt-7 flex items-center gap-4 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <a
          href={solution.demo}
          target={solution.demoIsPublic ? '_blank' : undefined}
          rel={solution.demoIsPublic ? 'noopener noreferrer' : undefined}
          data-track={`demo-${solution.id}`}
          className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-105"
          style={{ borderColor: solution.color }}
        >
          {solution.demoIsPublic ? 'Ver demo en vivo' : 'Pedime una demo'}
          <ArrowUpRight width={14} height={14} />
        </a>
      </div>
    </motion.article>
  )
}

export default function SolutionsGrid() {
  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-24" style={{ background: 'rgba(5,6,10,0.72)' }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 100% 20%, rgba(255,23,68,0.05), transparent 60%)' }}
      />
      <div className="relative mx-auto max-w-6xl grid gap-5 md:grid-cols-2" style={{ zIndex: 1 }}>
        {SOLUTIONS.map((s, i) => (
          <SolutionCard key={s.id} solution={s} i={i} />
        ))}
      </div>
    </section>
  )
}
