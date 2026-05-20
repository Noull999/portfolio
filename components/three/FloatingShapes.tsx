'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ShapeProps {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  initialRotation: [number, number, number]
  speed: number
  color?: string
  scale?: number
}

function WireShape({ geometry, position, initialRotation, speed, color = '#00e5ff', scale = 1 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = initialRotation[0] + t * speed * 0.4
    ref.current.rotation.y = initialRotation[1] + t * speed * 0.6
    ref.current.rotation.z = initialRotation[2] + t * speed * 0.2
    ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.3
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial color={color} wireframe opacity={0.12} transparent />
    </mesh>
  )
}

export default function FloatingShapes() {
  const geometries = useMemo(() => ({
    icosa: new THREE.IcosahedronGeometry(1.6, 0),
    torus: new THREE.TorusGeometry(1.2, 0.35, 8, 24),
    octa: new THREE.OctahedronGeometry(1.1, 0),
    tetra: new THREE.TetrahedronGeometry(0.9, 0),
  }), [])

  return (
    <group>
      <WireShape geometry={geometries.icosa}  position={[4.5, 1, -3]}    initialRotation={[0.3, 0.5, 0]}   speed={0.18} color="#ff1744" />
      <WireShape geometry={geometries.torus}  position={[-4, -0.5, -4]}  initialRotation={[0.8, 0.2, 0.4]} speed={0.14} color="#b71c1c" />
      <WireShape geometry={geometries.octa}   position={[2.5, -2, -2]}   initialRotation={[0.1, 0.7, 0.2]} speed={0.22} color="#ff6b6b" scale={0.8} />
      <WireShape geometry={geometries.tetra}  position={[-2.5, 2, -3]}   initialRotation={[0.5, 0.3, 0.8]} speed={0.28} color="#ff1744" scale={0.7} />
    </group>
  )
}
