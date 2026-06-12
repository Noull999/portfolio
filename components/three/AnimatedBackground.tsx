'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface Props {
  className?: string
}

interface Circle {
  cx: number
  cy: number
  r: number
  opacity: number
}

/**
 * Fondo animado simple con SVG y GSAP (más ligero que Three.js)
 * Renderiza círculos flotantes que se mueven suavemente
 */
export default function AnimatedBackground({ className }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [circles, setCircles] = useState<Circle[]>([])

  // Generar números random solo en el cliente (evita hydration mismatch)
  useEffect(() => {
    const generatedCircles = Array.from({ length: 12 }).map(() => ({
      cx: Math.random() * 1000,
      cy: Math.random() * 800,
      r: Math.random() * 40 + 20,
      opacity: 0.03 + Math.random() * 0.04,
    }))
    setCircles(generatedCircles)
  }, [])

  useEffect(() => {
    if (!svgRef.current || circles.length === 0) return

    const svg = svgRef.current
    const circleElements = svg.querySelectorAll('circle')

    circleElements.forEach((circle) => {
      const timeline = gsap.timeline({ repeat: -1 })
      timeline.to(
        circle,
        {
          cx: () => Math.random() * 800 + 100,
          cy: () => Math.random() * 600 + 100,
          duration: Math.random() * 8 + 12,
          ease: 'sine.inOut',
        },
        0,
      )
    })

    return () => {
      gsap.killTweensOf(circleElements)
    }
  }, [circles])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 800"
      className={`${className} w-full h-full`}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {circles.map((circle, i) => (
        <circle
          key={i}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          fill="white"
          opacity={circle.opacity}
          filter="blur(20px)"
        />
      ))}
    </svg>
  )
}
