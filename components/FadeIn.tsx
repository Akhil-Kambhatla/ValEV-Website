'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { EASE } from './SectionWrapper'

/**
 * Simple opacity-only scroll reveal (no rise) — for lightweight content
 * blocks like legal pages, where the full SectionWrapper fade+rise treatment
 * is heavier than the content warrants. Reuses the same EASE/duration and
 * useInView settings as SectionWrapper.
 */
export function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const prefersReduced = useReducedMotion()

  const shouldReveal = !prefersReduced

  return (
    <motion.div
      ref={ref}
      initial={shouldReveal ? { opacity: 0 } : false}
      animate={shouldReveal ? { opacity: inView ? 1 : 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
