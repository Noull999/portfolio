'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  /** elemento que actúa de trigger para el parallax (por defecto: el propio wrapper) */
  triggerSelector?: string
  /** qué tan pronunciado es el parallax: 0–1, default 0.25 */
  intensity?: number
}

export default function VideoBackground({ triggerSelector, intensity = 0.25 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef  = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const trigger = triggerSelector
      ? document.querySelector(triggerSelector)
      : wrapperRef.current

    if (!videoRef.current || !trigger) return

    const shift = `${intensity * 100}%`

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { y: '0%' },
        {
          y: `-${shift}`,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [triggerSelector, intensity])

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Overlay: oscurece lo suficiente para que el texto sea legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'linear-gradient(to bottom,',
            '  rgba(7,3,5,0.60) 0%,',
            '  rgba(7,3,5,0.35) 45%,',
            '  rgba(7,3,5,0.65) 100%)',
          ].join(''),
          zIndex: 1,
        }}
      />

      {/* Vignette lateral */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(7,3,5,0.55) 100%)',
          zIndex: 2,
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src="/video-fondo.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          /* extra height para que el parallax no deje huecos */
          height: `${100 + 25}%`,
          objectFit: 'cover',
          willChange: 'transform',
        }}
      />

    </div>
  )
}
