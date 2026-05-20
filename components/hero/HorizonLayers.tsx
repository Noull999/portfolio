'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 4 mountain planes — farthest to nearest
// viewBox 0 0 1440 900, mountains occupy bottom ~35-45% of frame
// Fill colors get progressively more opaque; Layer 4 = exact body bg so no visible gap on scroll
const LAYERS = [
  {
    d: 'M0,600 C80,578 160,548 260,510 C360,472 422,522 522,542 C622,562 690,498 800,465 C910,432 992,476 1102,450 C1212,424 1312,456 1440,440 L1440,900 L0,900 Z',
    fill: 'rgba(22,7,12,0.48)',
    yEnd: '-4%',
    blur: 2,
  },
  {
    d: 'M0,642 C88,618 176,586 286,554 C396,522 458,568 572,586 C686,604 750,546 870,518 C990,490 1070,526 1188,506 C1306,486 1390,510 1440,498 L1440,900 L0,900 Z',
    fill: 'rgba(13,4,8,0.72)',
    yEnd: '-9%',
    blur: 0.5,
  },
  {
    d: 'M0,686 C98,656 196,622 320,590 C444,558 510,606 640,624 C770,642 852,594 1000,568 C1148,542 1244,574 1380,556 C1432,548 1440,544 1440,542 L1440,900 L0,900 Z',
    fill: 'rgba(9,3,5,0.88)',
    yEnd: '-16%',
    blur: 0,
  },
  {
    // Solid match of body bg: rgb(7,3,5) = --bg so no gap shows below on scroll
    d: 'M0,736 C118,702 238,672 392,646 C546,620 626,680 790,698 C954,716 1048,666 1212,644 C1376,622 1430,626 1440,624 L1440,900 L0,900 Z',
    fill: 'rgb(7,3,5)',
    yEnd: '-24%',
    blur: 0,
  },
]

export default function HorizonLayers() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { y: '0%' },
          {
            y: LAYERS[i].yEnd,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric haze above the mountain ridge */}
      <div
        style={{
          position: 'absolute',
          bottom: '38%',
          left: '5%',
          right: '5%',
          height: '140px',
          background:
            'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,23,68,0.07) 0%, transparent 100%)',
          filter: 'blur(4px)',
          zIndex: 8,
        }}
      />

      {/* Horizon glow line */}
      <div
        style={{
          position: 'absolute',
          bottom: '37%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,23,68,0.08) 10%, rgba(255,23,68,0.55) 50%, rgba(255,23,68,0.08) 90%, transparent 100%)',
          filter: 'blur(1.5px)',
          zIndex: 9,
        }}
      />

      {/* Mountain planes */}
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={el => {
            refs.current[i] = el
          }}
          style={{
            position: 'absolute',
            inset: 0,
            willChange: 'transform',
            filter: layer.blur ? `blur(${layer.blur}px)` : undefined,
          }}
        >
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}
          >
            <path d={layer.d} fill={layer.fill} />
          </svg>
        </div>
      ))}
    </div>
  )
}
