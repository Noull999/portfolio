'use client'

import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('es-CL', {
  timeZone: 'America/Santiago',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

/** Hora de Puerto Montt. Arranca vacía para que el HTML del servidor y el del cliente coincidan. */
export default function Clock() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span>{time}</span>
}
