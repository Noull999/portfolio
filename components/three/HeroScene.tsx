'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import CrystalScene from './CrystalScene'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function HeroScene() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const c = document.createElement('canvas')
    const hasWebGL = !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
    if (hasWebGL) setReady(true)
  }, [])

  if (!ready) return null

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 7], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 3, // ACESFilmic
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', zIndex: 1 }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <CrystalScene />
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.85} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
