'use client'

import { useRef, useEffect } from 'react'

export default function ScrollScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let duration = 0
    let rafId: number

    const getProgress = () => {
      const start = document.getElementById('about')
      const end   = document.getElementById('contact')
      if (!start || !end || !duration) return null

      const startTop    = start.getBoundingClientRect().top + window.scrollY
      const endBottom   = end.getBoundingClientRect().bottom + window.scrollY
      const totalScroll = endBottom - startTop - window.innerHeight
      const scrolled    = window.scrollY - startTop

      const raw = Math.max(0, Math.min(1, scrolled / totalScroll))

      // Ping-pong 2×: avanza en la primera mitad del scroll, retrocede en la segunda.
      // El video siempre se mueve (no se congela) y la velocidad efectiva se duplica.
      const cycle = (raw * 2) % 2
      return cycle < 1 ? cycle : 2 - cycle
    }

    const scrub = () => {
      const p = getProgress()
      if (p !== null) {
        const target = p * duration
        video.currentTime = target
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(scrub)
    }

    const onLoaded = () => {
      duration = video.duration
      scrub()
    }

    video.addEventListener('loadedmetadata', onLoaded)
    if (video.readyState >= 1) onLoaded()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      video.removeEventListener('loadedmetadata', onLoaded)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    >
      <video
        ref={videoRef}
        src="/videos/bg-scroll.mp4"
        preload="auto"
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // tinte rojizo que combina con el acento del portfolio
          filter: 'sepia(1) hue-rotate(310deg) saturate(2) brightness(0.4)',
        }}
      />
      {/* Overlay que funde el video con el fondo oscuro */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,6,10,0.6) 0%, rgba(5,6,10,0.38) 50%, rgba(5,6,10,0.6) 100%)',
      }} />
      {/* Viñeta lateral */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 45%, rgba(5,6,10,0.65) 100%)',
      }} />
    </div>
  )
}
