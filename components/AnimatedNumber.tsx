'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface AnimatedNumberProps {
  /** The current numeric value to display. */
  value: number
  /** Formats the (possibly mid-tween) numeric value for display, e.g. formatInr. */
  format: (n: number) => string
  /** Tween duration in seconds. */
  duration?: number
  /** Skip the tween and snap immediately — use while a connected slider is being dragged. */
  instant?: boolean
}

/**
 * Tweens between numeric values, formatting the in-flight value through the
 * caller's own formatter every frame. Always lands exactly on `value` — no
 * spring, no overshoot. Snaps instantly under reduced motion or `instant`.
 */
export function AnimatedNumber({ value, format, duration = 0.5, instant = false }: AnimatedNumberProps) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)
  const displayRef = useRef(reduced ? value : 0)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (reduced || (instant && mountedRef.current)) {
      displayRef.current = value
      setDisplay(value)
      mountedRef.current = true
      return
    }
    mountedRef.current = true

    if (displayRef.current === value) return

    const controls = animate(displayRef.current, value, {
      duration,
      ease: EASE,
      onUpdate: latest => {
        displayRef.current = latest
        setDisplay(latest)
      },
      onComplete: () => {
        displayRef.current = value
        setDisplay(value)
      },
    })

    return () => controls.stop()
  }, [value, instant, reduced, duration])

  return <>{format(display)}</>
}
