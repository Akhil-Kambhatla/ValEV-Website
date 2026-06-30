'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

// ─── Inlined path data from public/valev-logo.svg (viewBox 0 0 1136 923) ────
//
// Structure: the V body polygon covers the ENTIRE V silhouette including gap
// areas between blades. Slash-1 and slash-2 are the two upper silver blade
// parallelograms. The gaps between them are NOT explicitly in the SVG — they
// must be derived from the shared vertices and drawn as black shapes on top.
//
// Path-to-ID mapping:
//   Path 1 → v-body    M301.837 117.884…  full V silhouette,     FILLED silver
//   Path 2 → slash-1   M458.337 220.884…  top blade,             FILLED silver
//   Path 3 → slash-2   M470.337 258.884…  middle blade,          FILLED silver
//   Path 4 → slash-3   M366.337 288.384…  lower separator LINE   stroke silver
//   Paths 5-8 / Rects 1-3 → wordmark letters + cyan bars (unchanged)
//
// Gap shapes (derived from shared vertices, rendered BLACK on top of silver):
//   gap-1: space between blade 1 and blade 2
//     M301.337 115.884 L458.337 220.884 L470.337 258.884 L317.337 158.884 Z
//   gap-2: space between blade 2 and the slash-3 separator
//     M349.337 247.884 L498.837 342.884 L509.837 377.384 L366.337 288.384 Z
//   slash-3 stroke (BLACK) closes the lower gap cleanly.
//
// Animation beat: solid silver V fills → glint sweeps → three BLACK gaps cut
// in top-to-bottom like a blade slicing through metal → wordmark breathes out
// → cyan bars light up.

const D_V_BODY = "M301.837 117.884L258.837 1.88419L430.337 141.384L458.837 222.384L470.337 258.884L498.837 342.384L509.837 376.884L532.337 438.884H543.837L682.337 152.384L864.837 0.384186L532.337 689.884L349.837 248.384L317.337 158.884L301.837 117.884Z"
const D_SLASH1 = "M458.337 220.884L301.337 115.884L258.837 1.88419L430.337 141.384L458.337 220.884Z"
const D_SLASH2 = "M470.337 258.884L317.337 158.884L349.337 247.884L498.837 342.884L470.337 258.884Z"
const D_SLASH3 = "M366.337 288.384L509.837 377.384"  // separator line — stroke only, NEVER fill

// Black gap shapes — derived from shared vertices of the blade parallelograms:
// gap-1 sits between blade 1's bottom edge and blade 2's top edge
const D_GAP1 = "M301.337 115.884 L458.337 220.884 L470.337 258.884 L317.337 158.884 Z"
// gap-2 sits between blade 2's bottom edge and the slash-3 separator line
const D_GAP2 = "M349.337 247.884 L498.837 342.884 L509.837 377.384 L366.337 288.384 Z"

const D_WM_V1  = "M24.8371 784.384H0.837097L74.3371 920.884H85.3371L159.337 783.884H136.337L80.8371 888.384L24.8371 784.384Z"
const D_WM_A   = "M311.837 784.384L238.337 920.884H261.837L319.837 814.884L375.837 920.384H398.837L325.837 784.384H311.837Z"
const D_WM_L   = "M524.337 784.884H505.337V920.884H620.337V900.884H524.337V784.884Z"
const D_WM_V2  = "M1000.84 783.884H978.337L1050.84 920.884H1060.34L1134.34 783.884H1111.34L1055.84 887.884L1000.84 783.884Z"

// Colors
const C_SILVER_HI  = '#F0F2F4'
const C_SILVER_LO  = '#9AA0A8'
const C_SILVER_MID = '#C4C8CE'
const C_CYAN       = '#34E0E0'
const C_BLACK      = '#000000'

// Shared ease
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export interface LogoProps {
  animated?: boolean
  variant?: 'hero' | 'nav'
  /** When true, the V mark fades out (wordmark stays) — used right before the hero→nav lift. */
  lifting?: boolean
  /**
   * Called once when the hero animation finishes (or immediately for return visitors /
   * reduced-motion). Receives `wasAnimated: true` if the full sequence played, false otherwise.
   */
  onAnimationComplete?: (wasAnimated: boolean) => void
}

export function Logo({
  animated = true,
  variant = 'hero',
  lifting = false,
  onAnimationComplete,
}: LogoProps) {
  const uid = useId().replace(/:/g, '_')
  const prefersReduced = useReducedMotion() === true

  const [mounted, setMounted]       = useState(false)
  const [played, setPlayed]         = useState(false)
  const [cyanPhase, setCyanPhase]   = useState<'pre' | 'live'>('pre')
  // Nav-only hover state — triggers the cyan bar shimmer
  const [navHovered, setNavHovered] = useState(false)

  // Show content immediately for non-animated (nav) variant to avoid SSR blank flash.
  // For animated (hero) variant, wait for mount to read sessionStorage correctly.
  const showContent = !animated || mounted

  // Stable ref so onAnimationComplete doesn't need to be in effect deps
  const onCompleteRef = useRef(onAnimationComplete)
  onCompleteRef.current = onAnimationComplete

  useEffect(() => {
    setMounted(true)
    if (sessionStorage.getItem('valev-logo-played')) setPlayed(true)
  }, [])

  const shouldAnimate =
    animated && variant === 'hero' && mounted && !played && !prefersReduced

  useEffect(() => {
    if (!mounted) return
    if (!shouldAnimate) {
      setCyanPhase('live')
      onCompleteRef.current?.(false)  // no animation played
      return
    }
    const shimmer = setTimeout(() => setCyanPhase('live'), 4100)
    const mark    = setTimeout(() => {
      sessionStorage.setItem('valev-logo-played', '1')
      onCompleteRef.current?.(true)   // full animation played
    }, 4500)
    return () => { clearTimeout(shimmer); clearTimeout(mark) }
  }, [mounted, shouldAnimate])

  // Unique defs IDs
  const gradId    = `vg${uid}`   // silver gradient (userSpaceOnUse for consistent shading)
  const haloId    = `vh${uid}`   // blur filter
  const clipId    = `vc${uid}`   // glint clip (V body shape)
  const glintGrId = `vgg${uid}`  // glint gradient

  // Bars shimmer: hero uses cyanPhase 'live'; nav uses pointer hover only.
  const barsShouldShimmer =
    (variant === 'hero' && cyanPhase === 'live') ||
    (variant === 'nav'  && navHovered)

  const WM = [
    { id: 'wm-v1', d: D_WM_V1, delay: 2.30 },
    { id: 'wm-a',  d: D_WM_A,  delay: 2.36 },
    { id: 'wm-l',  d: D_WM_L,  delay: 2.42 },
    { id: 'wm-v2', d: D_WM_V2, delay: 2.48 },
  ]

  const BARS = [
    { id: 'cyan-3', y: 902.884, delay: 2.95 },
    { id: 'cyan-2', y: 842.884, delay: 3.10 },
    { id: 'cyan-1', y: 783.884, delay: 3.25 },
  ]

  // Animation timeline (seconds from mount):
  //  0.00 – V body stroke draws on (1.4s)
  //  1.15 – Entire composed mark fades in as one unit (silver fills + black gaps
  //          together, 0.55s). The V never appears solid — gaps are locked to fills.
  //  1.35 – Draw-on stroke fades out (0.4s, overlapping fill arrival)
  //  1.72 – Specular glint sweeps diagonally across the already-cut silver V (0.50s)
  //  2.30 – Wordmark letters breathe out (staggered 0.06s, 0.8s each)
  //  2.95 – Cyan bars bloom bottom-to-top (staggered 0.15s)
  //  3.30 – Halo blooms
  //  4.10 – Shimmer loop starts

  // Shared transition for every element in the composed mark (fill + gaps as one unit).
  const markFade = shouldAnimate
    ? { delay: 1.15, duration: 0.55, ease: EASE }
    : { duration: 0 }

  return (
    <div className={variant === 'hero' ? 'flex flex-col items-center select-none' : 'select-none'}>
      <svg
        viewBox={variant === 'nav' ? '0 780 1136 145' : '0 0 1136 923'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={variant === 'hero' ? 'w-52 sm:w-60 md:w-72' : 'h-6 sm:h-7 w-auto'}
        aria-label="ValEV logo"
        role="img"
        onMouseEnter={variant === 'nav' ? () => setNavHovered(true)  : undefined}
        onMouseLeave={variant === 'nav' ? () => setNavHovered(false) : undefined}
      >
        <defs>
          {/* Silver gradient in SVG user space so all elements share the same
              light source — blades darken consistently top-to-bottom */}
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse"
            x1="532" y1="0" x2="532" y2="690">
            <stop offset="0%"   stopColor={C_SILVER_HI} />
            <stop offset="100%" stopColor={C_SILVER_LO} />
          </linearGradient>

          {/* Cyan halo blur */}
          <filter id={haloId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="44" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glint clip — constrains the specular sweep to the V body silhouette */}
          <clipPath id={clipId}>
            <path d={D_V_BODY} />
          </clipPath>

          {/* Glint gradient — narrow white band sweeping left→right */}
          <linearGradient id={glintGrId} gradientUnits="objectBoundingBox"
            x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0"    />
            <stop offset="38%"  stopColor="white" stopOpacity="0"    />
            <stop offset="48%"  stopColor="white" stopOpacity="0.16" />
            <stop offset="52%"  stopColor="white" stopOpacity="0.36" />
            <stop offset="62%"  stopColor="white" stopOpacity="0"    />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </linearGradient>
        </defs>

        {showContent && (
          <>
            {/* Ambient cyan halo (hero only) */}
            {variant === 'hero' && (
              <motion.ellipse
                cx={530} cy={330} rx={230} ry={190}
                fill={C_CYAN} filter={`url(#${haloId})`}
                initial={{ opacity: 0 }}
                animate={shouldAnimate ? { opacity: [0, 0.07, 0.02] } : { opacity: 0.02 }}
                transition={
                  shouldAnimate
                    ? { delay: 3.3, duration: 1.6, times: [0, 0.22, 1], ease: EASE }
                    : { duration: 0 }
                }
              />
            )}

            {/* ══ LOGO MARK ══════════════════════════════════════════════ */}
            <g id="logo-mark">

              {/* ── Draw-on stroke — ONLY during initial animation, separate from mark fills ── */}
              {variant === 'hero' && shouldAnimate && (
                <motion.path
                  d={D_V_BODY}
                  fill="none"
                  stroke={C_SILVER_MID}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 0 }}
                  transition={{
                    pathLength: { duration: 1.4, ease: EASE },
                    opacity:    { delay: 1.35, duration: 0.4, ease: 'easeOut' },
                  }}
                />
              )}

              {/* ── Specular glint ── */}
              {shouldAnimate && (
                <motion.rect
                  x={0} y={-100} width={380} height={1100}
                  fill={`url(#${glintGrId})`}
                  clipPath={`url(#${clipId})`}
                  initial={{ x: -480, skewX: -10 }}
                  animate={{ x: 1300, skewX: -10 }}
                  transition={{ delay: 1.72, duration: 0.50, ease: [0.25, 0, 0.45, 1] }}
                />
              )}

              {/* ── Mark fills — grouped so they fade together during the pre-lift phase.
                  When lifting=true the whole group fades to opacity 0 (0.35s) so only
                  the wordmark is visible by the time the FLIP transition fires.          ── */}
              <motion.g
                animate={{ opacity: lifting ? 0 : 1 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <motion.path
                  id="v-body"
                  d={D_V_BODY}
                  fill={`url(#${gradId})`}
                  stroke="none"
                  initial={shouldAnimate ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={markFade}
                />
                <motion.path
                  id="slash-1"
                  d={D_SLASH1}
                  fill={`url(#${gradId})`}
                  stroke="none"
                  initial={shouldAnimate ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={markFade}
                />
                <motion.path
                  id="slash-2"
                  d={D_SLASH2}
                  fill={`url(#${gradId})`}
                  stroke="none"
                  initial={shouldAnimate ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={markFade}
                />
                <motion.path
                  d={D_GAP1}
                  fill={C_BLACK}
                  stroke="none"
                  initial={shouldAnimate ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={markFade}
                />
                <motion.path
                  d={D_GAP2}
                  fill={C_BLACK}
                  stroke="none"
                  initial={shouldAnimate ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={markFade}
                />
                <motion.path
                  id="slash-3"
                  d={D_SLASH3}
                  fill="none"
                  stroke={C_BLACK}
                  strokeWidth={4}
                  strokeLinecap="round"
                  initial={shouldAnimate ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={markFade}
                />
              </motion.g>

            </g>

            {/* ══ LOGO WORDMARK ══════════════════════════════════════════ */}
            <g id="logo-wordmark">

              {WM.map(({ id, d, delay }) => (
                <motion.path
                  key={id} id={id} d={d}
                  fill={C_SILVER_MID} stroke="none"
                  initial={shouldAnimate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    shouldAnimate
                      ? { delay, duration: 0.8, ease: EASE }
                      : { duration: 0 }
                  }
                />
              ))}

              {BARS.map(({ id, y, delay }) => (
                <motion.rect
                  key={id} id={id}
                  x={741.337} y={y} width={130} height={20}
                  fill={C_CYAN}
                  initial={{ opacity: shouldAnimate ? 0 : 1 }}
                  animate={
                    barsShouldShimmer
                      ? { opacity: [1, 0.68, 1] }
                      : { opacity: 1 }
                  }
                  transition={
                    barsShouldShimmer
                      ? { duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0 }
                      : shouldAnimate
                      ? { delay, duration: 0.35, ease: EASE }
                      : { duration: 0 }
                  }
                />
              ))}

            </g>
          </>
        )}
      </svg>
    </div>
  )
}
