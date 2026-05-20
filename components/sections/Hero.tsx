'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ROLES, SOCIAL } from '@/lib/data'
import VideoBackground from '@/components/ui/VideoBackground'
import HorizonLayers from '@/components/hero/HorizonLayers'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const tagRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  // Typed effect
  useEffect(() => {
    const current = ROLES[roleIdx]
    let t: NodeJS.Timeout
    if (!isDeleting && typedText === current) {
      t = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    } else {
      t = setTimeout(() => {
        setTypedText(isDeleting ? current.slice(0, typedText.length - 1) : current.slice(0, typedText.length + 1))
      }, isDeleting ? 50 : 90)
    }
    return () => clearTimeout(t)
  }, [typedText, isDeleting, roleIdx])

  // GSAP entrance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(tagRef.current,    { y: 20, opacity: 0, duration: 0.7 }, 0.3)
      .from(titleRef.current,  { y: 40, opacity: 0, duration: 0.9 }, 0.45)
      .from(subRef.current,    { y: 20, opacity: 0, duration: 0.7 }, 0.6)
      .from(ctaRef.current,    { y: 20, opacity: 0, duration: 0.7 }, 0.72)
      .from(scrollRef.current, { opacity: 0, duration: 0.6 }, 1.0)
      .from(statusRef.current, { opacity: 0, duration: 0.6 }, 1.1)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ isolation: 'isolate', padding: '0 clamp(1.5rem, 4vw, 4rem)' }}
    >
      {/* ── Layer -1: video background con parallax */}
      <VideoBackground intensity={0.22} />

      {/* ── Layer 1: CSS grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* ── Layer 2: radial glows */}
      <div
        className="absolute inset-[-10%] pointer-events-none"
        style={{
          zIndex: 1,
          background: [
            'radial-gradient(ellipse 55% 55% at 72% 45%, rgba(255,23,68,0.08) 0%, transparent 70%)',
            'radial-gradient(ellipse 45% 70% at 12% 75%, rgba(183,28,28,0.07) 0%, transparent 70%)',
          ].join(','),
        }}
      />

      {/* ── Layer 3: horizon mountain layers */}
      <HorizonLayers />

      {/* ── Layer 4: hero content */}
      <div
        className="relative flex flex-col justify-center"
        style={{ zIndex: 10 }}
      >
        {/* Actual content */}
        <div className="relative max-w-4xl" style={{ padding: '3rem 2rem' }}>
          {/* Tag */}
          <div
            ref={tagRef}
            className="inline-flex items-center gap-2 border rounded-sm mb-8"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent)',
              borderColor: 'rgba(255,23,68,0.25)',
              background: 'rgba(255,23,68,0.06)',
              padding: '0.35rem 0.9rem',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Puerto Montt, Chile
          </div>

          {/* Name */}
          <h1
            ref={titleRef}
            className="select-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 12vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block" style={{ color: 'var(--text)' }}>JOSÉ</span>
            <span className="block gradient-text">Asencio</span>
          </h1>

          {/* Typed role */}
          <p
            className="mt-6"
            style={{ fontSize: '1rem', color: 'var(--muted)', minHeight: '1.6em', fontFamily: 'var(--font-body)' }}
          >
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{typedText}</span>
            <span className="animate-[blink_0.8s_infinite]" style={{ color: 'var(--accent)' }}>|</span>
          </p>

          {/* Sub */}
          <p
            ref={subRef}
            className="mt-2"
            style={{ fontSize: '0.92rem', color: 'var(--muted)', maxWidth: '440px', lineHeight: 1.75 }}
          >
            Desarrollo Full-Stack · Automatización Industrial · Soporte Técnico
            <br />
            Puerto Montt, Chile
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex gap-4 mt-10 flex-wrap">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 px-7 py-3 font-semibold text-sm rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,23,68,0.35)]"
              style={{ background: 'var(--grad)', color: '#fff', textDecoration: 'none', cursor: 'none' }}
              data-magnetic
            >
              Ver Proyectos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </a>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm rounded-sm border transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                color: 'var(--text)',
                borderColor: 'var(--border)',
                textDecoration: 'none',
              }}
              data-magnetic
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub / Noull999
            </a>

            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm rounded-sm border transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                color: 'var(--text)',
                borderColor: 'var(--border)',
                textDecoration: 'none',
              }}
              data-magnetic
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>

            <a
              href="/cv.pdf"
              download="CV-Jose-Asencio.pdf"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm rounded-sm border transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                color: 'var(--text)',
                borderColor: 'var(--border)',
                textDecoration: 'none',
              }}
              data-magnetic
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Descargar CV
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-[clamp(1.5rem,4vw,4rem)] flex items-center gap-4"
        style={{ zIndex: 10, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        <div className="w-14 h-px relative overflow-hidden" style={{ background: 'var(--border)' }}>
          <div className="absolute inset-y-0 left-[-100%] w-full animate-[scrollLine_2s_1.5s_infinite]" style={{ background: 'var(--accent)' }} />
        </div>
        Scroll
      </div>

      {/* Status */}
      <div
        ref={statusRef}
        className="absolute bottom-10 right-[clamp(1.5rem,4vw,4rem)] flex items-center gap-2"
        style={{ zIndex: 10, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e] animate-pulse" />
        Actualmente disponible
      </div>
    </section>
  )
}
