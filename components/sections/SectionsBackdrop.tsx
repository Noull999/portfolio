'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Fondo Liquid Chrome rojo compartido por todas las secciones de contenido.
 * UN solo contexto WebGL (sticky, tamaño viewport) para no competir con el
 * canvas del hero: crear/destruir muchos contextos hace que el navegador
 * mate el más antiguo (y desaparezcan los modelos 3D).
 * El loop se pausa con IntersectionObserver, pero el contexto nunca se destruye.
 */

const FRAG = `
precision mediump float;
uniform float uT;
uniform vec2 uR;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uR) / min(uR.x, uR.y);
  float t = uT * 0.22;

  for (float i = 1.0; i < 8.0; i += 1.0) {
    uv.x += 0.55 / i * cos(i * 2.3 * uv.y + t);
    uv.y += 0.55 / i * cos(i * 1.7 * uv.x + t * 1.2);
  }

  float v = abs(sin(uv.x + uv.y));
  v = v * v;

  vec3 col = mix(vec3(0.008, 0.009, 0.016), vec3(0.15, 0.02, 0.05), v * 0.45);
  col += vec3(1.0, 0.09, 0.27) * pow(v, 7.0) * 0.3;

  gl_FragColor = vec4(col, 1.0);
}
`

export default function SectionsBackdrop({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
      depth: false,
      stencil: false,
    })
    if (!gl) return

    const onLost = (e: Event) => e.preventDefault()
    canvas.addEventListener('webglcontextlost', onLost)

    const vs = gl.createShader(gl.VERTEX_SHADER)
    const fsh = gl.createShader(gl.FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!vs || !fsh || !program) return

    gl.shaderSource(vs, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}')
    gl.compileShader(vs)
    gl.shaderSource(fsh, FRAG)
    gl.compileShader(fsh)
    gl.attachShader(program, vs)
    gl.attachShader(program, fsh)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uT = gl.getUniformLocation(program, 'uT')
    const uR = gl.getUniformLocation(program, 'uR')

    // Resolución reducida: el efecto es suave, estirado por CSS no se nota
    const SCALE = 0.55
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE))
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uR, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    let raf = 0
    let running = false

    const loop = () => {
      gl.uniform1f(uT, (performance.now() - t0) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Pausa (sin destruir el contexto) cuando las secciones no están en pantalla
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(wrap)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fsh)
      gl.deleteBuffer(buffer)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative bg-[var(--bg)]">
      {/* Canvas sticky: ocupa el viewport mientras se scrollean las secciones */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sticky top-0 h-screen w-full opacity-35">
          <canvas ref={canvasRef} className="block h-full w-full" />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
