'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// ─── Particle type ────────────────────────────────────────────────────────────

interface Particle {
  x:          number
  baseY:      number
  y:          number
  vx:         number
  phase:      number
  phaseSpeed: number
  amplitude:  number
  radius:     number
  opacity:    number
  isAmber:    boolean
}

function makeParticle(w: number, h: number, startX?: number): Particle {
  const isAmber = Math.random() < 0.026  // ~2.5% amber glints — rare by design
  return {
    x:          startX ?? Math.random() * w,
    baseY:      Math.random() * h,
    y:          0,
    vx:         0.14 + Math.random() * 0.28,   // slightly faster for visible directional flow
    phase:      Math.random() * Math.PI * 2,
    phaseSpeed: 0.003 + Math.random() * 0.008,  // slow sine oscillation
    amplitude:  8 + Math.random() * 38,          // tighter vertical range = clearer flow direction
    radius:     0.6 + Math.random() * 1.9,
    opacity:    0.07 + Math.random() * 0.42,
    isAmber,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Animated particle wave: light-cyan fluorescent dots flowing left→right over
 * a dark background, with sine-wave vertical oscillation.
 * - Lazy: animation starts only when active=true (after logo animation finishes)
 * - Mobile: capped at 42 particles, glow disabled for perf
 * - prefers-reduced-motion: renders a static radial gradient instead
 */
export function ParticleWave({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced   = useReducedMotion()
  const rafRef    = useRef<number>(0)
  const runRef    = useRef(false)

  useEffect(() => {
    if (!active || reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr      = Math.min(window.devicePixelRatio || 1, 2)
    const mobile   = window.innerWidth < 768
    const COUNT    = mobile ? 80 : 220
    const useGlow  = !mobile

    // Set canvas pixel buffer to match CSS size at device pixel ratio
    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const particles: Particle[] = Array.from(
      { length: COUNT },
      () => makeParticle(canvas.offsetWidth, canvas.offsetHeight)
    )

    runRef.current = true

    const tick = () => {
      if (!runRef.current) return

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Advance position
        p.x     += p.vx
        p.phase += p.phaseSpeed
        p.y      = p.baseY + Math.sin(p.phase) * p.amplitude

        // Wrap: once off right edge, reset to left with a new baseY
        if (p.x > w + 14) {
          const fresh = makeParticle(w, h, -14)
          Object.assign(p, fresh)
        }

        // Colour channels
        const r = p.isAmber ? 255 : 52
        const g = p.isAmber ? 178 : 224
        const b = p.isAmber ? 62  : 224

        if (useGlow) {
          ctx.save()
          ctx.shadowColor = `rgba(${r},${g},${b},0.85)`
          ctx.shadowBlur  = p.radius * 5
          ctx.fillStyle   = `rgba(${r},${g},${b},${p.opacity})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        } else {
          // Mobile: skip glow, draw slightly larger+opaque dot
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(p.opacity * 1.5, 0.55)})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 1.15, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    window.addEventListener('resize', resize, { passive: true })

    return () => {
      runRef.current = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [active, reduced])

  // Reduced-motion path: static atmospheric gradient — no canvas, no RAF
  if (reduced) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex:     2,
          background: 'radial-gradient(ellipse 80% 55% at 50% 45%, rgba(52,224,224,0.055) 0%, transparent 70%)',
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex:     2,
        width:      '100%',
        height:     '100%',
        opacity:    active ? 1 : 0,
        transition: 'opacity 1.6s ease',
      }}
    />
  )
}
