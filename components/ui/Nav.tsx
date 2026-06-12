'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Proyectos', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contacto', href: '#contact' },
]

function go(e: React.MouseEvent, href: string) {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed right-4 top-6 z-[70] flex items-center gap-5 sm:right-10"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          onClick={(e) => go(e, l.href)}
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
        >
          {l.label}
        </a>
      ))}
      <span
        className="hidden h-1.5 w-1.5 rounded-full sm:inline-block"
        style={{
          background: scrolled ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
          boxShadow: scrolled ? '0 0 10px var(--accent)' : 'none',
          transition: 'all 0.4s',
        }}
        aria-hidden="true"
      />
    </nav>
  )
}
