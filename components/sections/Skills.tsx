'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILLS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const GROUP_META: Record<string, { color: string; glyph: string }> = {
  Backend:     { color: '#10b981', glyph: '◢' },
  Frontend:    { color: '#48cae4', glyph: '◣' },
  'IA & APIs': { color: '#c084fc', glyph: '✦' },
  Industrial:  { color: '#ff1744', glyph: '▣' },
  'IT & Infra':{ color: '#f59e0b', glyph: '◈' },
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    gsap.from([labelRef.current, titleRef.current], {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    })

    gsap.from(grid.querySelectorAll('.skill-group'), {
      scrollTrigger: { trigger: section, start: 'top 75%' },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    })

    gsap.from(grid.querySelectorAll('.skill-tag'), {
      scrollTrigger: { trigger: section, start: 'top 70%' },
      scale: 0.85, opacity: 0, duration: 0.45, stagger: 0.03, ease: 'back.out(1.7)',
    })
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: '7rem 3rem' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(72,202,228,0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 50% at 85% 70%, rgba(192,132,252,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <div
              ref={labelRef}
              className="flex items-center gap-3"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.85rem' }}
            >
              <span>03</span>
              <span className="w-8 h-px" style={{ background: 'var(--border)' }} />
              Skills
            </div>
            <h2
              ref={titleRef}
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', lineHeight: 0.95, letterSpacing: '-0.025em', color: 'var(--text)' }}
            >
              Stack <span className="gradient-text">Técnico</span>
            </h2>
          </div>

          <div
            className="flex items-center gap-2 border rounded-sm px-3 py-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--muted)',
              borderColor: 'var(--border)',
              background: 'rgba(255,255,255,0.02)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            {SKILLS.reduce((n, g) => n + g.items.length, 0)} tecnologías · {SKILLS.length} dominios
          </div>
        </div>

        {/* Cinematic grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map(({ group, items }, idx) => {
            const meta = GROUP_META[group] ?? { color: 'var(--accent)', glyph: '◆' }
            return (
              <div
                key={group}
                className="skill-group group relative border rounded-sm p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--card)',
                  cursor: 'none',
                }}
                data-magnetic
              >
                {/* Color stripe */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] origin-left transition-transform duration-500"
                  style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)`, transform: 'scaleX(0.3)' }}
                />
                <div
                  className="absolute top-0 left-0 w-full h-[2px] origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }}
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${meta.color}14, transparent 70%)` }}
                />

                {/* Ghost glyph */}
                <div
                  aria-hidden
                  className="absolute pointer-events-none select-none transition-all duration-500 opacity-20 group-hover:opacity-40 group-hover:rotate-12"
                  style={{
                    top: '-1.5rem',
                    right: '-0.5rem',
                    fontSize: '7rem',
                    lineHeight: 1,
                    color: meta.color,
                  }}
                >
                  {meta.glyph}
                </div>

                {/* Header row */}
                <div className="flex items-center justify-between mb-5 relative">
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      color: meta.color,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')} · {group}
                  </div>
                  <div
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--muted)' }}
                  >
                    {items.length}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag text-xs border rounded-sm px-2.5 py-1 transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--muted)',
                        borderColor: 'var(--border)',
                        background: 'rgba(255,255,255,0.025)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = meta.color
                        e.currentTarget.style.borderColor = `${meta.color}55`
                        e.currentTarget.style.background = `${meta.color}10`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--muted)'
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
