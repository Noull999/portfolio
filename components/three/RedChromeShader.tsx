'use client'

import { useEffect, useRef } from 'react'

export default function RedChromeShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const glContext = canvas.getContext('webgl', { alpha: true, antialias: false })
      if (!glContext) return

      const gl = glContext as WebGLRenderingContext
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const vs = `
        attribute vec2 p;
        void main() { gl_Position = vec4(p, 0.0, 1.0); }
      `

      const fs = `
        precision lowp float;
        uniform float uT;
        uniform vec2 uR;

        void main() {
          vec2 uv = (gl_FragCoord.xy * 2.0 - uR) / min(uR.x, uR.y);
          float t = uT * 0.25;

          for(float i = 1.0; i < 8.0; i += 1.0) {
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

      const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type)
        if (!shader) throw new Error('Failed to create shader')
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        return shader
      }

      const vertShader = createShader(gl.VERTEX_SHADER, vs)
      const fragShader = createShader(gl.FRAGMENT_SHADER, fs)

      const program = gl.createProgram()
      if (!program) throw new Error('Failed to create program')

      gl.attachShader(program, vertShader)
      gl.attachShader(program, fragShader)
      gl.linkProgram(program)
      gl.useProgram(program)

      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

      const posLoc = gl.getAttribLocation(program, 'p')
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      const uTLoc = gl.getUniformLocation(program, 'uT')
      const uRLoc = gl.getUniformLocation(program, 'uR')

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRLoc, canvas.width, canvas.height)

      const t0 = performance.now()

      const animate = () => {
        gl.uniform1f(uTLoc, (performance.now() - t0) / 1000)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        rafRef.current = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        cancelAnimationFrame(rafRef.current)
        gl.deleteProgram(program)
        gl.deleteShader(vertShader)
        gl.deleteShader(fragShader)
        gl.deleteBuffer(buffer)
      }
    } catch (error) {
      console.error('Shader error:', error)
      return
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
