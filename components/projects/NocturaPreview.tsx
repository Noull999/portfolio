'use client'

export default function NocturaPreview({ color = '#c084fc' }: { color?: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-sm border noctura-preview"
      style={{
        height: 180,
        borderColor: 'var(--border)',
        background: 'radial-gradient(ellipse 80% 80% at 50% 60%, rgba(124,58,237,0.18) 0%, rgba(10,10,15,0.95) 70%)',
      }}
      aria-hidden
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 60%, black 30%, transparent 100%)',
        }}
      />

      {/* Eclipsed moon */}
      <div
        className="absolute left-1/2 top-1/2 noctura-moon"
        style={{
          width: 84,
          height: 84,
          marginLeft: -42,
          marginTop: -42,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}33 60%, transparent 70%)`,
          boxShadow: `0 0 60px ${color}55, inset -12px -8px 24px rgba(0,0,0,0.6)`,
        }}
      />

      {/* Inner ring */}
      <div
        className="absolute left-1/2 top-1/2 noctura-ring-1"
        style={{
          width: 130,
          height: 130,
          marginLeft: -65,
          marginTop: -65,
          borderRadius: '50%',
          border: `1px dashed ${color}55`,
        }}
      />
      {/* Outer ring */}
      <div
        className="absolute left-1/2 top-1/2 noctura-ring-2"
        style={{
          width: 200,
          height: 200,
          marginLeft: -100,
          marginTop: -100,
          borderRadius: '50%',
          border: `1px solid ${color}22`,
        }}
      />
      {/* Outermost arc */}
      <div
        className="absolute left-1/2 top-1/2 noctura-ring-3"
        style={{
          width: 280,
          height: 280,
          marginLeft: -140,
          marginTop: -140,
          borderRadius: '50%',
          border: `1px solid ${color}11`,
          borderTopColor: `${color}66`,
        }}
      />

      {/* Glyph top-left */}
      <div
        className="absolute top-3 left-3"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: `${color}cc`,
          letterSpacing: '0.18em',
        }}
      >
        {'{ NÓCTURA }'}
      </div>

      {/* Coords bottom-right */}
      <div
        className="absolute bottom-3 right-3 text-right"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.56rem',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.1em',
          lineHeight: 1.6,
        }}
      >
        <div>RITO ⋅ CÓDIGO</div>
        <div>41°28′S · 72°56′W</div>
      </div>

      {/* Scanline */}
      <div className="absolute inset-x-0 noctura-scan" style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}88, transparent)` }} />

      <style jsx>{`
        .noctura-ring-1 { animation: noctura-spin 28s linear infinite; }
        .noctura-ring-2 { animation: noctura-spin-rev 44s linear infinite; }
        .noctura-ring-3 { animation: noctura-spin 70s linear infinite; }
        .noctura-moon  { animation: noctura-pulse 5s ease-in-out infinite; }
        .noctura-scan  { animation: noctura-scan 6s linear infinite; }

        @keyframes noctura-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes noctura-spin-rev {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes noctura-pulse {
          0%, 100% { filter: brightness(1); }
          50%      { filter: brightness(1.25); }
        }
        @keyframes noctura-scan {
          0%   { top: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .noctura-ring-1, .noctura-ring-2, .noctura-ring-3,
          .noctura-moon, .noctura-scan { animation: none; }
        }
      `}</style>
    </div>
  )
}
