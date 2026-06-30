'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export type SectionBg = 'hero' | 's2' | 's3' | 's4' | 's5' | 'contact'

export interface SectionWrapperProps {
  bg: SectionBg
  children: React.ReactNode
  id?: string
  className?: string
  /** Skip the scroll-reveal — use for the first (always-visible) section. */
  noReveal?: boolean
  /**
   * Optional CSS color string for the radial ambient glow behind content.
   * The glow anchor is at ~20% from the top so it bleeds in from the top
   * as you scroll into the section. Gets warmer/brighter for lower sections
   * to build the "charge building" feel.
   * Example: 'rgba(52, 224, 224, 0.04)'
   */
  ambientGlow?: string
  /**
   * Optional ambient background layer rendered at z-0 behind content.
   * Must be aria-hidden, pointer-events-none, position absolute, inset 0.
   */
  ambientLayer?: React.ReactNode
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function SectionWrapper({
  bg,
  children,
  id,
  className = '',
  noReveal = false,
  ambientGlow,
  ambientLayer,
}: SectionWrapperProps) {
  const ref  = useRef<HTMLDivElement>(null)
  const inView         = useInView(ref, { once: true, amount: 0.08 })
  const prefersReduced = useReducedMotion()

  const shouldReveal = !noReveal && !prefersReduced

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: `var(--bg-${bg})` }}
    >
      {/* 1px hairline separator — whisper of cyan glow at each section boundary.
          Hidden on the hero so the very top of the page is clean. */}
      {bg !== 'hero' && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.12) 40%, rgba(52,224,224,0.18) 50%, rgba(52,224,224,0.12) 60%, transparent 100%)',
            boxShadow: '0 0 10px rgba(52,224,224,0.07)',
          }}
        />
      )}

      {/* Internal vertical gradient — slightly darker at top, clearing at 40%.
          Creates the sense that each section is "lit from below." */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 40%)',
          zIndex: 0,
        }}
      />

      {/* Optional ambient radial glow.
          Anchored at 20% from top so it blooms into view as you scroll in.
          Pass warmer/brighter colors for lower sections (the charge builds). */}
      {ambientGlow && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 90% 55% at 50% 20%, ${ambientGlow}, transparent)`,
            zIndex: 0,
          }}
        />
      )}

      {/* Ambient background layer — z-0, behind content */}
      {ambientLayer}

      {/* Content wrapper — scroll-revealed once.
          Fade + 24px translate-up is the ONLY scroll animation used site-wide. */}
      <motion.div
        ref={ref}
        className="relative"
        style={{ zIndex: 10 }}
        initial={shouldReveal ? { opacity: 0, y: 24 } : false}
        animate={
          shouldReveal
            ? { opacity: inView ? 1 : 0, y: inView ? 0 : 24 }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </section>
  )
}
