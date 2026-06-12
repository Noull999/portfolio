'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import SculptureCarousel from './SculptureCarousel'
import PostFX from './PostFX'

// Se importa con ssr:false, así que esto solo corre en cliente.
function detectWebGL() {
  if (typeof window === 'undefined') return false
  const c = document.createElement('canvas')
  return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
}

export default function CarouselCanvas({ activeIndex }: { activeIndex: number }) {
  const [ready] = useState(detectWebGL)
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640)

  if (!ready) return null

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 3, // ACESFilmic
        toneMappingExposure: 1.15,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <SculptureCarousel activeIndex={activeIndex} />
        <PostFX isMobile={isMobile} />
      </Suspense>
    </Canvas>
  )
}
