'use client'

import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

interface Props {
  isMobile?: boolean
}

function DesktopFX() {
  return (
    <ChromaticAberration
      offset={new THREE.Vector2(0.0008, 0.0008)}
      blendFunction={BlendFunction.NORMAL}
      radialModulation={false}
      modulationOffset={0}
    />
  )
}

export default function PostFX({ isMobile = false }: Props) {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.35}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Noise
        opacity={0.045}
        blendFunction={BlendFunction.OVERLAY}
      />
      {isMobile ? <Bloom intensity={0} luminanceThreshold={1} luminanceSmoothing={0} /> : <DesktopFX />}
    </EffectComposer>
  )
}
