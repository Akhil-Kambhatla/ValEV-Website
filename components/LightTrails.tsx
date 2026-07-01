'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Trail color palette: predominantly cyan, rare amber
const PALETTE: [number, number, number][] = [
  [52,  224, 224],  // --cyan
  [52,  224, 224],  // --cyan (weighted)
  [52,  224, 224],  // --cyan (weighted)
  [100, 240, 240],  // lighter cyan
  [100, 240, 240],  // lighter cyan
  [18,  165, 185],  // deep teal
  [255, 175,  40],  // amber (rare)
]

interface Trail {
  x: number
  y: number
  len: number
  speed: number
  opacity: number
  r: number; g: number; b: number
  width: number
}

function buildTrails(count: number, w: number, h: number): Trail[] {
  const yMin = h * 0.50
  const yMax = h * 0.96
  const trails: Trail[] = []
  // Deterministic-looking spread via golden-ratio multiples
  for (let i = 0; i < count; i++) {
    const t = (i * 0.6180339887) % 1
    const u = (i * 0.3819660113) % 1
    const v = (i * 0.7548776662) % 1
    const [r, g, b] = PALETTE[i % PALETTE.length]
    trails.push({
      x:      t * (w + 600) - 300,
      y:      yMin + u * (yMax - yMin),
      len:    90 + v * 320,
      speed:  0.30 + (i * 0.137) % 0.90,
      opacity:0.055 + (i * 0.041) % 0.175,
      r, g, b,
      width:  0.55 + (i * 0.23) % 1.35,
    })
  }
  return trails
}

function drawTrail(ctx: CanvasRenderingContext2D, t: Trail) {
  const { x, y, len, opacity, r, g, b, width } = t
  const grad = ctx.createLinearGradient(x, y, x + len, y)
  grad.addColorStop(0,    `rgba(${r},${g},${b},0)`)
  grad.addColorStop(0.25, `rgba(${r},${g},${b},${opacity * 0.5})`)
  grad.addColorStop(0.72, `rgba(${r},${g},${b},${opacity})`)
  grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + len, y)
  ctx.strokeStyle = grad
  ctx.lineWidth   = width
  ctx.stroke()
}

export function LightTrails({ active }: { active: boolean }) {
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const prefersReduce = useReducedMotion()
  const rafRef        = useRef<number>(0)
  const trailsRef     = useRef<Trail[]>([])
  const sizeRef       = useRef({ w: 0, h: 0 })

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = w
      canvas.height = h
      sizeRef.current = { w, h }
      const count = w < 640 ? 9 : 16
      trailsRef.current = buildTrails(count, w, h)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    if (prefersReduce) {
      // Static snapshot — draw once, no animation
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)
      for (const t of trailsRef.current) drawTrail(ctx, t)
      return () => ro.disconnect()
    }

    function tick() {
      if (!ctx || !canvas) return
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)
      for (const t of trailsRef.current) {
        drawTrail(ctx, t)
        t.x += t.speed
        // Recycle when fully off the right edge
        if (t.x > w + 20) {
          t.x   = -(t.len + 20 + Math.random() * 200)
          t.y   = h * 0.50 + Math.random() * (h * 0.46)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [active, prefersReduce])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  )
}
