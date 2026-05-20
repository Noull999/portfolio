'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILLS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    gsap.from(grid.querySelectorAll('.skill-group'), {
      scrollTrigger: { trigger: section, start: 'top 75%' },
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    })

    gsap.from(grid.querySelectorAll('.skill-tag'), {
      scrollTrigger: { trigger: section, start: 'top 70%' },
      scale: 0.85, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.7)',
    })
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ padding: '7rem 3rem' }}
    >
      <div className="max-w-5xl mx-auto">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          // Skills
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1, color: 'var(--text)', marginBottom: '3.5rem' }}>
          Stack Técnico
        </h2>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map(({ group, items }) => (
            <div
              key={group}
              className="skill-group border rounded-sm p-6 transition-colors duration-300 hover:border-[var(--border-h)]"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <div
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}
              >
                {group}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag text-xs border rounded-sm px-2.5 py-1 transition-colors duration-200 hover:border-[var(--border-h)] hover:text-[var(--text)]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--muted)',
                      borderColor: 'var(--border)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
