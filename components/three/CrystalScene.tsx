'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ── Individual crystal shard ─────────────────────────────── */
interface CrystalProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  geometry: THREE.BufferGeometry
  color?: string
}

function Crystal({ position, rotation, scale, speed, geometry, color = '#ff1744' }: CrystalProps) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    // Gentle float + rotation
    ref.current.rotation.x = rotation[0] + t * speed * 0.3
    ref.current.rotation.y = rotation[1] + t * speed * 0.5
    ref.current.rotation.z = rotation[2] + t * speed * 0.2
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.8 + position[0]) * 0.35
    // Subtle mouse parallax
    ref.current.position.x = position[0] + pointer.x * 0.4
    ref.current.position.z = position[2] + pointer.y * 0.15
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.4}
        thickness={0.8}
        roughness={0.05}
        transmission={0.92}
        ior={1.55}
        chromaticAberration={0.06}
        anisotropicBlur={0.1}
        color={color}
        attenuationDistance={1.5}
        attenuationColor={color}
        temporalDistortion={0.1}
        distortionScale={0.3}
      />
    </mesh>
  )
}

/* ── Particles field (small dots, subtle) ─────────────────── */
function Particles({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ff1744" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ── Main scene ───────────────────────────────────────────── */
export default function CrystalScene() {
  const { size } = useThree()
  const isMobile = size.width < 768

  const geometries = useMemo(() => ({
    icosa1: new THREE.IcosahedronGeometry(1.1, 1),
    icosa2: new THREE.IcosahedronGeometry(0.75, 1),
    icosa3: new THREE.IcosahedronGeometry(0.55, 0),
    octa:   new THREE.OctahedronGeometry(0.8, 0),
    octa2:  new THREE.OctahedronGeometry(0.5, 0),
    dodeca: new THREE.DodecahedronGeometry(0.65, 0),
  }), [])

  const crystals: CrystalProps[] = useMemo(() => [
    { geometry: geometries.icosa1, position: [ 2.8,  0.4, -1.5], rotation: [0.5, 0.3, 0.1], scale: 1,    speed: 0.18, color: '#ff1744' },
    { geometry: geometries.octa,   position: [-2.5,  0.8, -2.0], rotation: [0.2, 0.7, 0.4], scale: 1,    speed: 0.14, color: '#ff3d5a' },
    { geometry: geometries.icosa2, position: [ 1.2, -1.4, -1.0], rotation: [0.8, 0.1, 0.6], scale: 0.9,  speed: 0.22, color: '#c62828' },
    { geometry: geometries.dodeca, position: [-1.4,  1.5, -2.5], rotation: [0.3, 0.5, 0.2], scale: 0.85, speed: 0.16, color: '#ff1744' },
    { geometry: geometries.icosa3, position: [ 3.5, -1.2, -3.0], rotation: [0.6, 0.4, 0.8], scale: 0.8,  speed: 0.28, color: '#ff6b6b' },
    { geometry: geometries.octa2,  position: [-3.2, -0.6, -1.5], rotation: [0.1, 0.9, 0.3], scale: 0.75, speed: 0.20, color: '#b71c1c' },
  ], [geometries])

  return (
    <>
      {/* Environment map for reflections/refractions — self-hosted, no
          depende de raw.githack.com (puede devolver 403/estar caido) */}
      <Environment files="/hdri/potsdamer_platz_1k.hdr" />

      {/* Dramatic lighting */}
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 6, 3]}   intensity={12} color="#ff1744" distance={18} decay={2} />
      <pointLight position={[-5, -3, 2]} intensity={8}  color="#b71c1c" distance={15} decay={2} />
      <pointLight position={[0, -6, -4]} intensity={5}  color="#ff4444" distance={12} decay={2} />
      <spotLight
        position={[0, 8, 4]}
        angle={0.5}
        penumbra={0.9}
        intensity={20}
        color="#ff1744"
        castShadow={false}
      />

      {!isMobile && crystals.map((props, i) => <Crystal key={i} {...props} />)}
      {isMobile  && crystals.slice(0, 3).map((props, i) => <Crystal key={i} {...props} />)}

      <Particles count={isMobile ? 600 : 1200} />
    </>
  )
}
