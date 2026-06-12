'use client'

import { type ReactNode } from 'react'

/**
 * Fondo "Liquid Chrome" rojo — CSS puro, CERO WebGL.
 * El hero ya usa un contexto WebGL (R3F). Un segundo contexto para el fondo
 * rompe en GPUs/navegadores que solo permiten uno → desaparecían los modelos.
 * Esta versión usa gradientes radiales animados con blend, se ve metálico/fluido
 * y corre en cualquier dispositivo.
 */
export default function SectionsBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-[var(--bg)]">
      {/* Capa de fondo sticky: sigue el scroll de las secciones */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="liquid-chrome sticky top-0 h-screen w-full" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
