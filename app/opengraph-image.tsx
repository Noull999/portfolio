import { ImageResponse } from 'next/og'

export const alt = 'José Asencio — Apps y sistemas a medida para tu negocio'
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
          background: '#070405',
          backgroundImage:
            'linear-gradient(90deg, transparent 72%, rgba(255,45,61,0.18) 76.5%, rgba(255,220,220,0.85) 77%, rgba(255,45,61,0.18) 77.5%, transparent 82%), radial-gradient(ellipse 40% 50% at 77% 100%, rgba(255,45,61,0.45), transparent 70%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#4ade80' }} />
          <div style={{ fontSize: 24, color: 'rgba(255,232,230,0.6)', letterSpacing: 3 }}>DISPONIBLE · PUERTO MONTT, CHILE</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, fontWeight: 600, color: '#fff3f2', lineHeight: 1, letterSpacing: -3 }}>
          <span>Apps y sistemas</span>
          <span style={{ color: '#ff8a8f' }}>a medida para</span>
          <span>tu negocio.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: 'rgba(255,232,230,0.62)', marginTop: 40 }}>
          José Asencio · Desarrollador full-stack
        </div>
      </div>
    ),
    { ...size }
  )
}
