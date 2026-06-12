'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { ArrowLeft, ArrowRight } from '@/components/ui/icons'

// El canvas WebGL no puede SSR-earse
const CarouselCanvas = dynamic(() => import('@/components/three/CarouselCanvas'), { ssr: false })

const SLOT_COUNT = 4

function scrollToContent() {
  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  const navigate = useCallback(
    (dir: 'next' | 'prev') => {
      if (isAnimating) return
      setIsAnimating(true)
      setActiveIndex((prev) =>
        dir === 'next' ? (prev + 1) % SLOT_COUNT : (prev + SLOT_COUNT - 1) % SLOT_COUNT,
      )
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating],
  )

  // Auto-avance cada 3.5 s (se pausa cuando el hero sale de pantalla)
  useEffect(() => {
    if (!heroVisible) return
    const id = setInterval(() => navigate('next'), 3500)
    return () => clearInterval(id)
  }, [heroVisible, navigate])

  // Navegación con teclado (flechas)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--bg)]"
      style={{ height: '100vh', fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* Ghost text gigante (relleno tenue, las esculturas lo solapan) */}
      <div
        className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
        style={{ top: '24%', zIndex: 2 }}
      >
        <span
          className="whitespace-nowrap uppercase"
          style={{
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: 'clamp(80px, 25vw, 340px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.045)',
          }}
        >
          ASENCIO
        </span>
      </div>

      {/* Canvas 3D (esculturas) */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <CarouselCanvas activeIndex={activeIndex} visible={heroVisible} />
      </div>

      {/* Scrim superior (legibilidad de brand/nav) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ zIndex: 4, height: '22%', background: 'linear-gradient(to bottom, rgba(5,6,10,0.85), transparent)' }}
      />
      {/* Scrim inferior (legibilidad del texto y botones) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ zIndex: 4, height: '48%', background: 'linear-gradient(to top, rgba(5,6,10,0.94) 0%, rgba(5,6,10,0.55) 38%, transparent 100%)' }}
      />

      {/* Grano */}
      <div className="grain" style={{ zIndex: 50 }} />

      {/* Brand top-left */}
      <div
        className="absolute left-4 top-6 sm:left-8"
        style={{ zIndex: 60 }}
      >
        <span
          className="text-xs font-semibold uppercase text-white/90"
          style={{ letterSpacing: '0.18em' }}
        >
          José Asencio
        </span>
      </div>

      {/* Bottom-left: label + desc + nav */}
      <div
        className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
        style={{ zIndex: 60, maxWidth: 340, textShadow: '0 2px 14px rgba(0,0,0,0.85)' }}
      >
        <p
          className="mb-2 text-base font-bold uppercase tracking-widest text-white/95 sm:mb-3 sm:text-[22px]"
          style={{ letterSpacing: '0.02em' }}
        >
          Esculturas · Código
        </p>
        <p className="mb-4 hidden text-xs leading-relaxed text-white/90 sm:mb-5 sm:block sm:text-sm">
          Desarrollador Full-Stack y automatizador industrial. Construyo experiencias digitales
          con la misma precisión con la que se talla una pieza. Desde Puerto Montt, Chile.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('prev')}
            aria-label="Anterior"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white transition-all duration-150 hover:scale-105 hover:bg-white/10 sm:h-16 sm:w-16"
          >
            <ArrowLeft width={26} height={26} />
          </button>
          <button
            onClick={() => navigate('next')}
            aria-label="Siguiente"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white transition-all duration-150 hover:scale-105 hover:bg-white/10 sm:h-16 sm:w-16"
          >
            <ArrowRight width={26} height={26} />
          </button>
        </div>
      </div>

      {/* Bottom-right: link explorar */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToContent()
        }}
        className="absolute bottom-6 right-4 flex items-center gap-2 uppercase text-white/95 transition-opacity duration-200 hover:opacity-100 sm:bottom-20 sm:right-10"
        style={{
          zIndex: 60,
          fontFamily: 'var(--font-anton), sans-serif',
          fontSize: 'clamp(20px, 4vw, 56px)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          textDecoration: 'none',
        }}
      >
        Explorar
        <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
      </a>
    </section>
  )
}
