'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowUpRight, GitHub, LinkedIn, Mail } from '@/components/ui/icons'
import { SOCIAL } from '@/lib/data'
import LiquidChromeShader from '@/components/three/LiquidChromeShader'

export default function DarkContact() {
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
    <section
      id="contact"
      className="dot-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-6 py-32 text-center"
      ref={sectionRef}
    >
      {/* Liquid Chrome shader background */}
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ zIndex: 1 }}>
        {isVisible && <LiquidChromeShader />}
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute right-8 top-8 select-none leading-none text-white opacity-[0.022]"
        style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: 'clamp(6rem,18vw,16rem)', zIndex: 2 }}
      >
        004
      </span>

      <div className="relative" style={{ zIndex: 3 }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="relative mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
        >
        <span className="text-white/35">004</span>&nbsp;&nbsp;/&nbsp;&nbsp;Contacto
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="chrome-text relative uppercase"
        style={{
          fontFamily: 'var(--font-anton), sans-serif',
          fontSize: 'clamp(3rem, 12vw, 9rem)',
          lineHeight: 0.88,
          letterSpacing: '-0.02em',
        }}
      >
        Hablemos
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mt-8 max-w-md text-base text-white/60"
      >
        Disponible para proyectos freelance y colaboraciones. Escríbeme y te respondo pronto.
      </motion.p>

      <motion.a
        href={`mailto:${SOCIAL.email}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative mt-10 inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        style={{ borderColor: 'rgba(255,255,255,0.8)' }}
      >
        {SOCIAL.email}
        <ArrowUpRight width={18} height={18} />
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mt-10 flex items-center gap-7"
      >
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-white" aria-label="GitHub">
          <GitHub width={22} height={22} />
        </a>
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-white" aria-label="LinkedIn">
          <LinkedIn width={22} height={22} />
        </a>
        <a href={`mailto:${SOCIAL.email}`} className="text-white/60 transition-colors hover:text-white" aria-label="Email">
          <Mail width={22} height={22} />
        </a>
      </motion.div>
      </div>
    </section>
  )
}
