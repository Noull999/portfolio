'use client'

import { useRef, useMemo, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { MODELS } from '@/lib/media'

const SLOT_COUNT = 4

type Role = 'center' | 'right' | 'back' | 'left'

interface RoleTarget {
  pos: [number, number, number]
  scale: number
  role: Role
}

/** Rol y transform objetivo de un slot según el índice activo */
function roleTarget(slot: number, active: number): RoleTarget {
  const rel = (slot - active + SLOT_COUNT) % SLOT_COUNT
  switch (rel) {
    case 0:
      return { pos: [0, 0, 0], scale: 2.3, role: 'center' }
    case 1:
      return { pos: [4, -0.4, -1.5], scale: 0.78, role: 'right' }
    case 2:
      return { pos: [0, 0.5, -3.2], scale: 0.55, role: 'back' }
    default:
      return { pos: [-4, -0.4, -1.5], scale: 0.78, role: 'left' }
  }
}

/** Marco animado: hace damp de posición/escala hacia el rol y rota */
function SculptureFrame({
  slot,
  activeIndex,
  children,
}: {
  slot: number
  activeIndex: number
  children: ReactNode
}) {
  const ref = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const t = roleTarget(slot, activeIndex)
    // suavizado exponencial (~transición 650ms)
    const a = 1 - Math.exp(-6 * delta)

    g.position.x += (t.pos[0] - g.position.x) * a
    g.position.y += (t.pos[1] - g.position.y) * a
    g.position.z += (t.pos[2] - g.position.z) * a

    g.scale.x += (t.scale - g.scale.x) * a
    g.scale.y += (t.scale - g.scale.y) * a
    g.scale.z += (t.scale - g.scale.z) * a

    // El centro gira más; los demás flotan lento
    const spin = t.role === 'center' ? 0.4 : 0.12
    g.rotation.y += delta * spin
    g.position.y += Math.sin(state.clock.elapsedTime * 0.6 + slot) * 0.0015
  })

  return (
    <group ref={ref} scale={0.001}>
      {children}
    </group>
  )
}

/** Escultura desde un .glb (normalizada: centrada y escalada a tamaño uniforme) */
function ModelSculpture({ slot, activeIndex, url }: { slot: number; activeIndex: number; url: string }) {
  const { scene } = useGLTF(url)

  const normalized = useMemo(() => {
    const cloned = scene.clone(true)
    // Centrar y escalar para que la mayor dimensión mida ~2.2 unidades
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const norm = 2.2 / maxDim

    cloned.position.set(-center.x, -center.y, -center.z)
    const wrapper = new THREE.Group()
    wrapper.add(cloned)
    wrapper.scale.setScalar(norm)
    return wrapper
  }, [scene])

  return (
    <SculptureFrame slot={slot} activeIndex={activeIndex}>
      <primitive object={normalized} />
    </SculptureFrame>
  )
}

/** Geometría obsidiana placeholder (hasta que lleguen los modelos) */
function PlaceholderGeo({ slot }: { slot: number }) {
  switch (slot % 4) {
    case 0:
      return <icosahedronGeometry args={[1, 0]} />
    case 1:
      return <dodecahedronGeometry args={[1, 0]} />
    case 2:
      return <torusKnotGeometry args={[0.6, 0.24, 160, 24]} />
    default:
      return <octahedronGeometry args={[1.2, 0]} />
  }
}

function PlaceholderSculpture({ slot, activeIndex }: { slot: number; activeIndex: number }) {
  return (
    <SculptureFrame slot={slot} activeIndex={activeIndex}>
      <mesh castShadow>
        <PlaceholderGeo slot={slot} />
        <meshStandardMaterial color="#0a0a0d" metalness={1} roughness={0.14} envMapIntensity={1.4} />
      </mesh>
    </SculptureFrame>
  )
}

export default function SculptureCarousel({ activeIndex }: { activeIndex: number }) {
  const hasModels = MODELS.length > 0

  return (
    <>
      {/* Self-hosted en vez de preset="night": el preset pide el .hdr en vivo
          a raw.githack.com (CDN de terceros pensado para demos), que puede
          devolver 403/estar caido sin aviso. Mismo archivo, servido desde
          /public para no depender de nadie mas. */}
      <Environment files="/hdri/dikhololo_night_1k.hdr" />
      <ambientLight intensity={0.18} />
      <pointLight position={[5, 5, 6]} intensity={45} color="#ffffff" distance={28} decay={2} />
      <pointLight position={[-5, -2, 3]} intensity={26} color="#ff1744" distance={22} decay={2} />
      <spotLight position={[0, 9, 5]} angle={0.5} penumbra={0.9} intensity={70} color="#ffffff" />

      {Array.from({ length: SLOT_COUNT }).map((_, i) =>
        hasModels && MODELS[i] ? (
          <ModelSculpture key={i} slot={i} activeIndex={activeIndex} url={MODELS[i]} />
        ) : (
          <PlaceholderSculpture key={i} slot={i} activeIndex={activeIndex} />
        ),
      )}
    </>
  )
}

MODELS.forEach((m) => useGLTF.preload(m))
