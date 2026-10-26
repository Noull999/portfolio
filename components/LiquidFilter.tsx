/** Filtro de distorsión del liquid glass. Solo Chromium lo aplica al fondo (backdrop-filter: url(#liquid)). */
export default function LiquidFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="liquid" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves={2} seed={11} result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale={70} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
