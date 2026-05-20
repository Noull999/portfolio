'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100   // mouse real
    let rx = -100, ry = -100   // ring interpolada
    let raf = 0
    let hovering = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }

    const attach = () => {
      document.querySelectorAll('a, button, [data-magnetic]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    const loop = () => {
      // Dot: sin lag — sigue el mouse al instante
      dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`

      // Ring: lerp suave — factor 0.18 = sigue rápido sin ser inmediato
      const ease = 0.18
      rx += (mx - rx) * ease
      ry += (my - ry) * ease
      const scale = hovering ? 1.7 : 1
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`
      ring.style.opacity    = hovering ? '0.8' : '0.5'

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* DOT — instantáneo */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* RING — lerp suave */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.5,
          willChange: 'transform, opacity',
          transition: 'opacity 0.15s ease',
        }}
      />
    </>
  )
}
