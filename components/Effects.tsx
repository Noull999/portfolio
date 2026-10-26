'use client'

import { useEffect } from 'react'

/** Efectos globales que necesitan el navegador: liquid glass, brillo que sigue al mouse y aparición al hacer scroll. */
export default function Effects() {
  useEffect(() => {
    // Liquid glass real solo en Chromium (en iOS todos los navegadores son WebKit y su user agent no dice "Chrome/")
    if (/Chrome\//.test(navigator.userAgent)) {
      document.documentElement.classList.add('liquid')
    }

    // Brillo especular: un solo listener para todos los elementos .glass
    let onMove: ((e: PointerEvent) => void) | undefined
    if (matchMedia('(pointer: fine)').matches) {
      onMove = (e) => {
        const el = (e.target as Element | null)?.closest?.('.glass') as HTMLElement | null
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      document.addEventListener('pointermove', onMove, { passive: true })
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`
      io.observe(el)
    })

    return () => {
      if (onMove) document.removeEventListener('pointermove', onMove)
      io.disconnect()
    }
  }, [])

  return null
}
