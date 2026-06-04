'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BIO = 'Soy José Esteban Asencio Barrientos, Analista Programador titulado en INACAP Puerto Montt, actualmente cursando Ingeniería en Informática. Combino desarrollo Full-Stack (Python, Flask, React, Node.js) con automatización industrial (PLC Siemens, TIA Portal) e integración de IA mediante la API de Claude. Aprendo de forma autodidacta y construyo soluciones reales: desde dashboards industriales hasta plataformas SaaS con pagos y coach de IA.'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.from([labelRef.current, titleRef.current], {
      scrollTrigger: { trigger: section, start: 'top 75%' },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    })

    if (!prefersReduced && wordsRef.current) {
      const words = wordsRef.current.querySelectorAll('.word')
      gsap.from(words, {
        scrollTrigger: { trigger: wordsRef.current, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out',
      })
    }

    gsap.from(statsRef.current?.children ?? [], {
      scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
      y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    })
  }, [])

  const words = BIO.split(' ')

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ padding: '7rem 3rem' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-px h-full pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)', opacity: 0.2 }}
      />

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <div
            ref={labelRef}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}
          >
            // Sobre mí
          </div>
          <h2
            ref={titleRef}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1, color: 'var(--text)', marginBottom: '2rem' }}
          >
            Dev &<br /><span className="gradient-text">Tecnólogo</span>
          </h2>

          {/* Word-by-word bio */}
          <div ref={wordsRef} style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-1">{word}</span>
            ))}
          </div>

          <a
            href="mailto:joseestebanasencio@gmail.com"
            className="inline-flex items-center gap-2 mt-8 text-sm border-b transition-colors duration-300 hover:text-[var(--accent)] hover:border-[var(--accent)]"
            style={{ color: 'var(--text)', borderColor: 'var(--border)', paddingBottom: '2px', textDecoration: 'none', cursor: 'none' }}
            data-magnetic
          >
            joseestebanasencio@gmail.com
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </a>
        </div>

        {/* Right — stats */}
        <div ref={statsRef} className="grid grid-cols-2 gap-6 pt-16">
          {[
            { value: '1', label: 'Año de experiencia' },
            { value: '10+', label: 'Proyectos completados' },
            { value: '2026', label: 'Ing. Informática en curso' },
            { value: '∞', label: 'Disponible para proyectos' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="border rounded-sm p-5 transition-colors duration-300 hover:border-[var(--border-h)]"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <div
                style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', lineHeight: 1, color: 'var(--accent)', marginBottom: '0.4rem' }}
              >
                {value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
