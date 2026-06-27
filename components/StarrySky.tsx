"use client";

import { useEffect, useRef } from "react";

/**
 * Animated WebGL starry-sky background (twinkling stars + atmospheric teal
 * glow). Ported from the Stitch design system shader. Degrades gracefully —
 * if WebGL is unavailable it simply renders nothing over the navy base.
 */
export default function StarrySky({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = v_texCoord;
  vec3 color = vec3(0.03, 0.05, 0.1); // Deep navy base

  // Grainy sky texture
  float n = hash(uv + u_time * 0.0001);
  color += n * 0.02;

  // Distant twinkling stars
  float stars = pow(hash(uv), 1000.0);
  float twinkle = sin(u_time * 2.0 + hash(uv) * 6.28) * 0.5 + 0.5;
  color += stars * twinkle;

  // Subtle atmospheric teal glow at the bottom
  float glow = exp(-5.0 * (1.0 - uv.y));
  color += vec3(0.08, 0.72, 0.65) * glow * 0.1;

  gl_FragColor = vec4(color, 1.0);
}`;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    function syncSize() {
      const w = canvas!.clientWidth || 1280;
      const h = canvas!.clientHeight || 720;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
    }

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(syncSize);
      ro.observe(canvas);
    }
    syncSize();

    let raf = 0;
    const render = (t: number) => {
      if (typeof ResizeObserver === "undefined") syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
