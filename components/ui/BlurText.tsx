'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  style?: CSSProperties
  /** retraso base antes de empezar el stagger (segundos) */
  delay?: number
}

/**
 * Anima un texto palabra por palabra: blur(10px)→0 con un pequeño "rebote" de opacidad,
 * disparado al entrar en viewport (IntersectionObserver al 10%).
 */
export default function BlurText({ text, className, style, delay = 0 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [inView, setInView] = useState(false)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.1em', ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            inView
              ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : {}
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: 'easeOut',
            delay: delay + (i * 100) / 1000,
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}
