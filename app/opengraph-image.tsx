import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'José Asencio — Dev & Tech'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#050608',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(255,23,68,0.25), transparent 45%), radial-gradient(circle at 85% 85%, rgba(255,23,68,0.12), transparent 50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#ff1744' }} />
          <div style={{ fontSize: 28, color: '#8a8a92', letterSpacing: 2 }}>PUERTO MONTT · CHILE</div>
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, color: '#f5f5f7', lineHeight: 1.05 }}>
          José Asencio
        </div>
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 500, color: '#ff1744', marginTop: 4 }}>
          Dev &amp; Tech
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#a8a8b0', marginTop: 36, maxWidth: 900 }}>
          Analista Programador · Full-Stack · WebGL / Three.js
        </div>
      </div>
    ),
    { ...size }
  )
}
