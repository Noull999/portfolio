'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/data'
import NocturaPreview from '@/components/projects/NocturaPreview'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0] & { featured?: boolean }; index: number }) {
  return (
    <div
      className="flex-shrink-0 w-[85vw] max-w-[560px] border rounded-sm p-8 pt-9 flex flex-col gap-5 transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
        cursor: 'none',
      }}
      data-magnetic
    >
      {/* Color stripe top */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${project.color}, transparent)`, transform: 'scaleX(0.35)' }}
      />

      {/* Giant ghost numeral */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none transition-opacity duration-500 opacity-40 group-hover:opacity-70"
        style={{
          top: '-2.5rem',
          right: '-0.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: '11rem',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: `1px ${project.color}22`,
          letterSpacing: '-0.04em',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Badges row */}
      <div className="absolute top-5 right-7 flex items-center gap-2 z-10">
        {project.featured && (
          <span
            className="text-xs rounded-sm px-2 py-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              color: project.color,
              background: `${project.color}14`,
              border: `1px solid ${project.color}40`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            ★ Destacado
          </span>
        )}
        {project.private && (
          <span
            className="text-xs border rounded-sm px-1.5 py-0.5"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--muted)', borderColor: 'var(--border)', letterSpacing: '0.06em' }}
          >
            NDA
          </span>
        )}
      </div>

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${project.color}18, transparent 70%)` }}
      />

      {/* Featured visual preview */}
      {project.id === 'noctura' && (
        <div className="relative">
          <NocturaPreview color={project.color} />
        </div>
      )}

      {/* Category */}
      <div
        className="relative"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: project.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}
      >
        <span className="inline-block w-6 h-px align-middle mr-2" style={{ background: project.color }} />
        {project.category}
      </div>

      {/* Title */}
      <h3
        className="relative"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)', lineHeight: 1.05, color: 'var(--text)', letterSpacing: '-0.015em' }}
      >
        {project.title}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7, flex: 1 }}>
        {project.description}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="text-xs border rounded-sm px-2 py-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--muted)',
              borderColor: 'var(--border)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-300 hover:text-[var(--accent)]"
            style={{ color: 'var(--muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Ver repositorio
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-300 hover:text-[var(--accent)]"
            style={{ color: 'var(--muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Demo en vivo
          </a>
        )}
        {project.private && (
          <span
            className="flex items-center gap-1.5 text-xs"
            style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Bajo NDA
          </span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reveal label/title
    gsap.from([labelRef.current, titleRef.current], {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    })

    if (prefersReduced) return

    // Horizontal scroll
    const cards = track.querySelectorAll('.project-card-item')
    const totalWidth = track.scrollWidth - section.clientWidth + 96

    const tl = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth + 200}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    // Stagger cards in
    gsap.from(cards, {
      scrollTrigger: { trigger: section, start: 'top 70%' },
      x: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    })

    return () => { tl.kill(); ScrollTrigger.getAll().forEach((t) => { if (t.vars.trigger === section) t.kill() }) }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ padding: '7rem 0' }}
    >
      {/* Header */}
      <div className="px-12 mb-12">
        <div
          ref={labelRef}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}
        >
          // Proyectos
        </div>
        <h2
          ref={titleRef}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1, color: 'var(--text)' }}
        >
          Trabajo Seleccionado
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-12 will-change-transform"
      >
        {PROJECTS.map((project, i) => (
          <div key={project.id} className="project-card-item">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      {/* Progress hint */}
      <div
        className="flex items-center gap-3 px-12 mt-8"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        Scroll para explorar
      </div>
    </section>
  )
}
