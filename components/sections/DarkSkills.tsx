'use client'

import { motion } from 'framer-motion'
import { SKILLS } from '@/lib/data'

const LINE_WIDTHS = [55, 85, 38, 70]

function DrawLines() {
  return (
    <div className="mb-14 space-y-[10px]" aria-hidden>
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
            background: i === 2
              ? 'linear-gradient(to right, rgba(255,23,68,0.45), transparent)'
              : 'linear-gradient(to right, rgba(255,255,255,0.08), transparent)',
          }}
        />
      ))}
    </div>
  )
}

export default function DarkSkills() {
  return (
    <section id="skills" className="dot-grid relative bg-[var(--bg)] px-6 py-32 sm:px-10 lg:px-24">
      {/* glow rojo tenue esquina inferior derecha */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 100% 100%, rgba(255,23,68,0.07), transparent 65%)' }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          <span className="text-white/35">003</span>&nbsp;&nbsp;/&nbsp;&nbsp;Stack técnico
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="chrome-text mb-12 uppercase"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: 'clamp(2.6rem, 7vw, 6rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
          }}
        >
          Habilidades
        </motion.h2>

        <DrawLines />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: (i % 3) * 0.1 }}
              className="border-t pt-5"
              style={{ borderColor: 'var(--border)' }}
            >
              <h3
                className="mb-4 uppercase text-white"
                style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: '1.4rem', lineHeight: 1 }}
              >
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border px-2.5 py-1 font-mono text-[11px] text-white/65"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
