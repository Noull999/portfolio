'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SOCIAL } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    gsap.from(contentRef.current?.children ?? [], {
      scrollTrigger: { trigger: section, start: 'top 75%' },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    })
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '7rem 3rem' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
      />

      <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10">
        <div
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}
        >
          // Contacto
        </div>

        <h2
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1, color: 'var(--text)', marginBottom: '1.5rem' }}
        >
          ¿Tienes un<br /><span className="gradient-text">Proyecto?</span>
        </h2>

        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '460px', margin: '0 auto 3rem' }}>
          ¿Necesitas soporte técnico, un sistema web o automatización? Estoy disponible y con ganas de colaborar.
        </p>

        <a
          href={`mailto:${SOCIAL.email}`}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-sm font-semibold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,229,255,0.25)]"
          style={{ background: 'var(--grad)', color: '#000', textDecoration: 'none', cursor: 'none', fontFamily: 'var(--font-body)' }}
          data-magnetic
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Escribir email
        </a>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {[
            {
              href: SOCIAL.github,
              label: 'GitHub',
              icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>,
              fill: true,
            },
            {
              href: SOCIAL.linkedin,
              label: 'LinkedIn',
              icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>,
              fill: false,
            },
          ].map(({ href, label, icon, fill }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm border rounded-sm px-4 py-2 transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ color: 'var(--muted)', borderColor: 'var(--border)', textDecoration: 'none', cursor: 'none', fontFamily: 'var(--font-mono)' }}
              data-magnetic
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="2">
                {icon}
              </svg>
              {label}
            </a>
          ))}
        </div>

        {/* Location */}
        <div
          className="mt-12 flex items-center justify-center gap-2"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Puerto Montt, Los Lagos, Chile
        </div>
      </div>
    </section>
  )
}
