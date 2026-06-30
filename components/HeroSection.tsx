'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Logo } from './Logo'
import { ParticleWave } from './ParticleWave'
import { useLogoPhase } from '@/contexts/LogoPhase'

const EASE      = [0.25, 0.46, 0.45, 0.94] as const
const LIFT_EASE = [0.33, 0, 0.22, 1]       as const

type HeroPhase    = 'playing' | 'prelifting' | 'lifting' | 'done'
type LiftTransform = { x: number; y: number; scale: number }

// 2×2 capability stats — hardware specs, not live-network claims
const STATS = [
  { value: '240 kW',     label: 'Peak output'            },
  { value: 'Dual gun',   label: 'Two vehicles at once'   },
  { value: 'CCS2',       label: 'DC fast-charge standard'},
  { value: 'All-weather',label: 'Rated for India'        },
]

export function HeroSection() {
  const { phase, setPhase } = useLogoPhase()
  const prefersReduced      = useReducedMotion()

  const [heroPhase, setHeroPhase]         = useState<HeroPhase>('playing')
  const [liftTransform, setLiftTransform] = useState<LiftTransform | null>(null)

  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const liftTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => { if (liftTimerRef.current) clearTimeout(liftTimerRef.current) }
  }, [])

  useEffect(() => {
    if (phase === 'nav') setHeroPhase('done')
  }, [phase])

  const measureAndLift = useCallback(() => {
    const logoEl = logoWrapperRef.current
    const navSvg = document.querySelector('[data-nav-logo] svg') as SVGSVGElement | null

    if (!logoEl || !navSvg) { setHeroPhase('done'); setPhase('nav'); return }

    const heroRect = logoEl.getBoundingClientRect()
    const navRect  = navSvg.getBoundingClientRect()

    if (heroRect.width === 0 || navRect.width === 0) {
      setHeroPhase('done'); setPhase('nav'); return
    }

    const scale = navRect.width / heroRect.width

    const heroCenterX = heroRect.left + heroRect.width  / 2
    const heroCenterY = heroRect.top  + heroRect.height / 2
    const navCenterX  = navRect.left  + navRect.width   / 2
    const navCenterY  = navRect.top   + navRect.height  / 2

    const wordmarkMidFraction  = (784 + 921) / (2 * 923)
    const wordmarkOffsetY      = (wordmarkMidFraction - 0.5) * heroRect.height
    const wordmarkOffsetScaled = wordmarkOffsetY * scale

    const dx = navCenterX - heroCenterX
    const dy = navCenterY - heroCenterY - wordmarkOffsetScaled

    setLiftTransform({ x: dx, y: dy, scale })
    setHeroPhase('lifting')
  }, [setPhase])

  const handleLogoComplete = useCallback((wasAnimated: boolean) => {
    if (heroPhase === 'done') return
    if (!wasAnimated || prefersReduced) { setHeroPhase('done'); setPhase('nav'); return }
    setHeroPhase('prelifting')
    liftTimerRef.current = setTimeout(() => measureAndLift(), 420)
  }, [heroPhase, prefersReduced, setPhase, measureAndLift])

  const handleLiftComplete = useCallback(() => {
    if (!liftTransform) return
    setHeroPhase('done')
    setPhase('nav')
  }, [liftTransform, setPhase])

  const showHeroLogo = heroPhase !== 'done'
  const showCopy     = heroPhase === 'done'

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-hero)' }}
    >
      {/* Particle wave — lazy-inits after logo animation, fades in over 1.6s */}
      <ParticleWave active={showCopy} />

      {/* Text-protection veil — z-5 (above canvas z-2, below copy z-10 and logo z-20).
          A dark radial gradient that clears the headline/stats zone so particles
          never visually compete with the text, while remaining fully visible at
          the canvas margins. Unconditionally rendered: on dark bg it's invisible
          until particles appear behind it. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          background:
            'radial-gradient(ellipse 60% 54% at 50% 47%, rgba(7,8,10,0.90) 12%, rgba(7,8,10,0.60) 38%, rgba(7,8,10,0.20) 58%, transparent 74%)',
        }}
      />

      {/* Hero logo stage — unchanged animation logic */}
      {showHeroLogo && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 20 }}
        >
          <motion.div
            ref={logoWrapperRef}
            initial={false}
            animate={liftTransform ?? {}}
            transition={{ duration: 0.85, ease: LIFT_EASE }}
            onAnimationComplete={handleLiftComplete}
          >
            <Logo
              animated
              variant="hero"
              lifting={heroPhase === 'prelifting' || heroPhase === 'lifting'}
              onAnimationComplete={handleLogoComplete}
            />
          </motion.div>
        </div>
      )}

      {/* Hero copy */}
      {showCopy && (
        <motion.div
          className="relative flex flex-col items-center text-center px-6 pt-28 pb-24 max-w-3xl mx-auto w-full"
          style={{ zIndex: 10 }}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          {/* Eyebrow */}
          <p className="type-eyebrow mb-7 tracking-[0.22em]">
            South India&nbsp;&middot;&nbsp;EV fast-charging
          </p>

          {/* Headline */}
          <h1
            className="font-bold tracking-tight mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-hero)',
              color:      'var(--silver-hi)',
              lineHeight: 1.06,
            }}
          >
            Charge ahead.{' '}
            <span style={{ color: 'var(--silver-mid)' }}>Go further.</span>
          </h1>

          {/* Subline */}
          <p
            className="max-w-xl mb-10"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            ValEV installs and operates super-fast EV charging stations at restaurants,
            parking spaces, and offices across South India, so drivers can charge quickly
            and carry on.
          </p>

          {/* 2×2 capability stats */}
          <div
            className="grid grid-cols-2 gap-px mb-10 w-full max-w-sm overflow-hidden rounded-xl"
            style={{
              background:   'rgba(52,224,224,0.07)',
              border:       '1px solid rgba(52,224,224,0.1)',
            }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={value}
                className="flex flex-col items-center justify-center py-5 px-4"
                style={{ background: 'rgba(7,8,10,0.52)' }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '1.0625rem',
                    fontWeight:    700,
                    color:         'var(--silver-hi)',
                    letterSpacing: '0.02em',
                    lineHeight:    1,
                    marginBottom:  '0.35rem',
                    display:       'block',
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.625rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--silver-lo)',
                    lineHeight:    1.3,
                    display:       'block',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#technology"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium transition-[border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
            style={{
              fontFamily: 'var(--font-body)',
              border:     '1px solid rgba(52,224,224,0.22)',
              color:      'var(--silver-mid)',
              fontSize:   'var(--text-body)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(52,224,224,0.45)'
              el.style.color       = 'var(--silver-hi)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(52,224,224,0.22)'
              el.style.color       = 'var(--silver-mid)'
            }}
          >
            Our technology
            <ChevronRight size={15} aria-hidden />
          </a>
        </motion.div>
      )}

      {/* Scroll cue */}
      {showCopy && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ color: 'var(--silver-lo)', zIndex: 10 }}
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        >
          <span className="type-eyebrow" style={{ letterSpacing: '0.22em', fontSize: '0.625rem' }}>
            Scroll
          </span>
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
