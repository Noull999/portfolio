'use client'

import { useEffect, useRef } from 'react'

export default function LiquidChromeShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const glContext = canvas.getContext('webgl')
    if (!glContext) return

    const gl = glContext as WebGLRenderingContext

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const vs = `
      attribute vec2 p;
      void main(){gl_Position=vec4(p,0.,1.);}
    `

    const fs = `
      precision mediump float;
      uniform float uT;
      uniform vec2 uR;

      void main(){
        vec2 uv=(gl_FragCoord.xy*2.-uR)/min(uR.x,uR.y);
        float t=uT*.25;
        for(float i=1.;i<8.;i++){
          uv.x+=.55/i*cos(i*2.3*uv.y+t);
          uv.y+=.55/i*cos(i*1.7*uv.x+t*1.2);
        }
        float v=abs(sin(uv.x+uv.y));
        v=pow(v,2.);

        // Dark base
        vec3 col=mix(vec3(.008,.009,.016),vec3(.15,.02,.05),v*.45);

        // Red accent #ff1744 = rgb(255,23,68) normalized
        col+=vec3(1.,.09,.27)*pow(v,7.)*.3;

        gl_FragColor=vec4(col,1.);
      }
    `

    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const vertShader = compileShader(gl.VERTEX_SHADER, vs)
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fs)

    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return

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
    let animationId: number

    function animate() {
      gl.uniform1f(uTLoc, (performance.now() - t0) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      gl.deleteProgram(program)
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
