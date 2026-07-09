'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, CSSProperties, MouseEventHandler } from 'react'

/**
 * Three canonical hover/tap treatments, replacing the site's previous
 * per-element onMouseEnter/onMouseLeave style mutation. Each treatment is
 * wired via whileHover/whileTap so touch users get real press feedback,
 * which the old JS-mutation pattern never provided.
 *
 * Under reduced motion, whileTap (scale) is dropped — but hover color/
 * border/shadow changes stay, snapped to near-zero duration rather than
 * animated, since those are state changes, not motion.
 */

const TAP = { scale: 0.98 } as const

const MotionLink   = motion.create(Link)
const MotionAnchor = motion.a
const MotionButton = motion.button

interface BaseProps {
  children:  ReactNode
  className?: string
  style?:     CSSProperties
  href?:      string
  /** Renders a plain <a target="_blank" rel="noopener noreferrer"> instead of next/link. */
  external?:  boolean
  onClick?:   MouseEventHandler
  type?:      'button' | 'submit'
  role?:      string
  'aria-label'?:      string
  'aria-expanded'?:   boolean
  'aria-haspopup'?:   React.AriaAttributes['aria-haspopup']
  'aria-controls'?:   string
}

function useTreatmentMotion() {
  const reduced = useReducedMotion()
  return {
    transition: reduced ? { duration: 0.01 } : { duration: 0.2 },
    tap: reduced ? undefined : TAP,
  }
}

/** Treatment 1 — Primary CTA glow. Solid cyan (or amber) buttons; box-shadow bloom on hover. */
export function GlowCTA({
  children, className, style, href, external, onClick,
  glow = '0 0 28px rgba(52,224,224,0.32), 0 0 8px rgba(52,224,224,0.18)',
}: BaseProps & { glow?: string }) {
  const { transition, tap } = useTreatmentMotion()
  const shared = {
    className,
    style: { boxShadow: 'none', ...style },
    whileHover: { boxShadow: glow },
    whileTap: tap,
    transition,
    onClick,
  }

  if (!href) return null
  if (external) {
    return (
      <MotionAnchor href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {children}
      </MotionAnchor>
    )
  }
  return <MotionLink href={href} {...shared}>{children}</MotionLink>
}

/** Treatment 2 — Secondary outline brighten. Border/text/bg-tint links, outline buttons, icon buttons. */
export function SecondaryBrighten({
  children, className, style, href, external, onClick, type,
  hoverColor, hoverBorderColor, hoverBackgroundColor, hoverBoxShadow,
  ...aria
}: BaseProps & {
  hoverColor?: string
  hoverBorderColor?: string
  hoverBackgroundColor?: string
  hoverBoxShadow?: string
}) {
  const { transition, tap } = useTreatmentMotion()
  const hover: Record<string, string> = {}
  if (hoverColor)           hover.color = hoverColor
  if (hoverBorderColor)     hover.borderColor = hoverBorderColor
  if (hoverBackgroundColor) hover.backgroundColor = hoverBackgroundColor
  if (hoverBoxShadow)       hover.boxShadow = hoverBoxShadow

  const shared = {
    className,
    style,
    whileHover: hover,
    whileTap: tap,
    transition,
    onClick,
    ...aria,
  }

  if (href) {
    if (external) {
      return (
        <MotionAnchor href={href} target="_blank" rel="noopener noreferrer" {...shared}>
          {children}
        </MotionAnchor>
      )
    }
    return <MotionLink href={href} {...shared}>{children}</MotionLink>
  }

  return (
    <MotionButton type={type ?? 'button'} {...shared}>
      {children}
    </MotionButton>
  )
}

/** Treatment 3 — Card lift. -2px translateY + border brighten, for interactive card surfaces. */
export function CardLift({
  children, className, style, href, external, onClick,
  hoverBorderColor,
}: BaseProps & { hoverBorderColor?: string }) {
  const { transition, tap } = useTreatmentMotion()
  const reduced = useReducedMotion()

  const hover: Record<string, string | number> = {}
  if (hoverBorderColor) hover.borderColor = hoverBorderColor
  if (!reduced) hover.y = -2

  const shared = {
    className,
    style,
    whileHover: hover,
    whileTap: tap,
    transition,
    onClick,
  }

  if (href) {
    if (external) {
      return (
        <MotionAnchor href={href} target="_blank" rel="noopener noreferrer" {...shared}>
          {children}
        </MotionAnchor>
      )
    }
    return <MotionLink href={href} {...shared}>{children}</MotionLink>
  }

  return <motion.div {...shared}>{children}</motion.div>
}
