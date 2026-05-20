'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LINKS = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between transition-all duration-300"
        style={{
          padding: scrolled ? '0.75rem 3rem' : '1.2rem 3rem',
          background: 'rgba(8,9,12,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-2xl tracking-widest gradient-text select-none"
          style={{ fontFamily: 'var(--font-display)', cursor: 'none' }}
          data-magnetic
        >
          JA
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="relative text-xs uppercase tracking-widest transition-colors duration-300 group"
                style={{ color: 'var(--muted)', textDecoration: 'none', cursor: 'none' }}
                data-magnetic
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ background: 'var(--accent)' }}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:joseestebanasencio@gmail.com"
          className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest border rounded-sm px-3 py-1.5 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--muted)',
            borderColor: 'var(--border)',
            cursor: 'none',
            textDecoration: 'none',
          }}
          data-magnetic
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          Disponible
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 border-none bg-transparent"
          onClick={() => setOpen(!open)}
          style={{ cursor: 'none' }}
          aria-label="Menú"
        >
          <span className={`block w-5 h-0.5 bg-[var(--text)] rounded transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text)] rounded transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--text)] rounded transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-16 z-[499] flex flex-col items-center justify-center gap-10 transition-all duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none -translate-y-4'}`}
        style={{ background: 'var(--bg)' }}
      >
        {LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => scrollTo(e, href)}
            className="text-5xl tracking-wider transition-colors duration-300 hover:text-[var(--accent)]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', textDecoration: 'none' }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
