export default function VideoBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}
    >
      {/* Video — tinte rojo que combina con el acento del portfolio */}
      <video
        src="/videos/bg-smoke.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'sepia(1) hue-rotate(310deg) saturate(2) brightness(0.38)',
        }}
      />
      {/* Overlay: funde con el fondo negro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(5,6,10,0.72) 0%, rgba(5,6,10,0.45) 50%, rgba(5,6,10,0.72) 100%)',
        }}
      />
      {/* Viñeta lateral */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, rgba(5,6,10,0.6) 100%)',
        }}
      />
    </div>
  )
}
