'use client'

const ITEMS = [
  'Full-Stack',
  'Three.js',
  'React',
  'Python',
  'Next.js',
  'GSAP',
  'PostgreSQL',
  'Docker',
  'Automatización Industrial',
  'Claude API',
  'PLC Siemens',
  'TypeScript',
]

const SEP = <span aria-hidden className="mx-6 text-[var(--accent)]">✦</span>

export default function Marquee() {
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div
      className="relative overflow-hidden border-y py-3"
      style={{ borderColor: 'var(--border)' }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40"
          >
            {item}
            {SEP}
          </span>
        ))}
      </div>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />
    </div>
  )
}
