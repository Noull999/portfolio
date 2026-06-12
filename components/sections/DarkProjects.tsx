'use client'

import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import { ArrowUpRight, GitHub } from '@/components/ui/icons'

export default function DarkProjects() {
  return (
    <section id="projects" className="relative bg-[var(--bg)] px-6 py-32 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          <span className="text-white/35">002</span>&nbsp;&nbsp;/&nbsp;&nbsp;Trabajo seleccionado
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="chrome-text mb-16 uppercase"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: 'clamp(2.6rem, 7vw, 6rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
          }}
        >
          Proyectos
        </motion.h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border md:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: 'var(--border)', background: 'var(--border)' }}
        >
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 3) * 0.08 }}
              className="group relative flex min-h-[260px] flex-col p-7 transition-colors duration-300"
              style={{ background: 'var(--bg)' }}
            >
              {/* índice fantasma */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-4 select-none uppercase opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]"
                style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: '5rem', lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                  {project.category}
                </p>
                <div className="flex shrink-0 gap-1.5">
                  {'featured' in project && project.featured && (
                    <span className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase text-white/70" style={{ borderColor: 'var(--border)' }}>
                      ★
                    </span>
                  )}
                  {project.private && (
                    <span className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase text-white/50" style={{ borderColor: 'var(--border)' }}>
                      NDA
                    </span>
                  )}
                </div>
              </div>

              <h3
                className="relative mt-4 uppercase text-white"
                style={{ fontFamily: 'var(--font-anton), sans-serif', fontSize: '1.7rem', lineHeight: 1, letterSpacing: '0.01em' }}
              >
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/60">{project.description}</p>

              <div className="flex-1" />

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded border px-2 py-0.5 font-mono text-[10px] text-white/55"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-4 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/70 transition-colors hover:text-white">
                    <GitHub width={13} height={13} /> Repo
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/70 transition-colors hover:text-[var(--accent)]">
                    Demo <ArrowUpRight width={13} height={13} />
                  </a>
                )}
                {project.private && !project.links.github && (
                  <span className="font-mono text-[11px] text-white/40">Bajo NDA</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
