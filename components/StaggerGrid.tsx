'use client'

import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties } from 'react'
import { EASE } from './SectionWrapper'

// Container only orchestrates timing — it owns no opacity/transform of its
// own. Opacity for the whole block stays owned by the parent SectionWrapper;
// giving the container an opacity too would double-fade every card (see
// StaggerItem below).
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

// Items own only the rise, not opacity — SectionWrapper already fades the
// section (including this grid) in once. Re-fading each card on top of that
// compounds into a slower, muddier opacity ramp instead of a clean effect.
const itemVariants: Variants = {
  hidden: { y: 8 },
  visible: { y: 0, transition: { duration: 0.3, ease: EASE } },
}

interface StaggerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Wrap a card grid's container element with this. */
export function StaggerGrid({ children, className = '', style }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
}

/** Wrap each card inside a StaggerGrid with this. */
export function StaggerItem({ children, className = '', style }: StaggerProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
