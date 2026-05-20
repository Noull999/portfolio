'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  count?: number
}

export default function ParticleField({ count = 3000 }: Props) {
  const meshRef = useRef<THREE.Points>(null!)
  const { mouse } = useThree()

  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const rnd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 12 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      rnd[i] = Math.random()
    }
    return [pos, rnd]
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.04 + mouse.x * 0.1
    meshRef.current.rotation.x = Math.sin(t * 0.02) * 0.08 + mouse.y * 0.06
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-random"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ff1744"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
