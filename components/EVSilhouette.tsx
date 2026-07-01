'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

// ── Timing ───────────────────────────────────────────────────────────────────
const PASS_SEC   = 20      // seconds for one full traversal
const FIRST_MS   = 6_000   // delay before the very first pass
const GAP_MIN_MS = 15_000  // minimum gap between passes
const GAP_MAX_MS = 26_000  // maximum gap between passes

// SVG canvas — viewBox "0 0 360 88", ground at y=78
// Front of car faces RIGHT (direction of travel)
// Rear wheel: cx=90  Front wheel: cx=268  Wheelbase: 178 / car length: 332 ≈ 53.6%

function EvCarSvg() {
  return (
    <svg
      viewBox="0 0 360 88"
      width={360}
      height={88}
      style={{ overflow: 'visible', display: 'block' }}
      aria-hidden
    >
      <defs>
        {/* Underglow — wide radial fan below car */}
        <radialGradient id="evs-glow" cx="50%" cy="100%" rx="48%" ry="70%">
          <stop offset="0%"   stopColor="#34E0E0" stopOpacity="0.60"/>
          <stop offset="50%"  stopColor="#34E0E0" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#34E0E0" stopOpacity="0"/>
        </radialGradient>

        {/* Comet trail gradient — left=transparent, right=visible at rear bumper */}
        <linearGradient id="evs-trail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#34E0E0" stopOpacity="0"/>
          <stop offset="55%"  stopColor="#34E0E0" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#34E0E0" stopOpacity="0.22"/>
        </linearGradient>

        {/* Soft-blur for glow halo */}
        <filter id="evs-blur" x="-30%" y="-120%" width="160%" height="340%">
          <feGaussianBlur stdDeviation="7 5"/>
        </filter>
      </defs>

      {/* ── Comet trail extending left of rear bumper ── */}
      <rect x={-300} y={62.5} width={330} height={2.5} fill="url(#evs-trail)" opacity={0.90}/>
      <rect x={-300} y={65.5} width={330} height={1.5} fill="url(#evs-trail)" opacity={0.60}/>
      <rect x={-220} y={68}   width={250} height={1.0} fill="url(#evs-trail)" opacity={0.30}/>

      {/* ── Underglow halo (blurred) ── */}
      <ellipse cx={185} cy={80} rx={152} ry={14}
               fill="#34E0E0" opacity={0.13} filter="url(#evs-blur)"/>
      {/* Underglow crisp gradient strip */}
      <ellipse cx={185} cy={80} rx={148} ry={8} fill="url(#evs-glow)"/>

      {/* ── Car body silhouette — modern EV fastback ── */}
      {/*   Rear bumper → C-pillar → roofline → A-pillar → windshield → hood → front bumper  */}
      <path
        d="M22,78
           Q17,72 20,64
           L26,54
           Q44,32 64,18
           Q76,12 90,12
           L230,11
           Q238,11 246,14
           Q259,22 268,28
           Q280,40 286,42
           L310,52 L332,58 L346,64
           Q351,68 354,74
           L354,78 Z"
        fill="rgba(8,10,14,0.92)"
      />

      {/* ── Window greenhouse — darker tint for depth ── */}
      <path
        d="M65,20 Q77,13 90,13 L230,12 L246,15
           Q258,22 265,28
           L258,35 Q247,23 237,17 L90,14 Q78,15 67,22 Z"
        fill="rgba(10,18,26,0.68)"
      />

      {/* ── Wheel voids — opaque background fill so they read as cut-outs ── */}
      <circle cx={90}  cy={78} r={21} fill="#07080A"/>
      <circle cx={268} cy={78} r={21} fill="#07080A"/>

      {/* ── Wheel rim highlights ── */}
      <circle cx={90}  cy={78} r={13} fill="none"
              stroke="rgba(52,224,224,0.14)" strokeWidth={1.5}/>
      <circle cx={268} cy={78} r={13} fill="none"
              stroke="rgba(52,224,224,0.14)" strokeWidth={1.5}/>

      {/* ── Cyan rim light along roofline / A-pillar ── */}
      <path
        d="M90,12 L230,11 Q238,11 246,14 Q259,22 268,28"
        fill="none"
        stroke="rgba(52,224,224,0.36)"
        strokeWidth={1.3}
        strokeLinecap="round"
      />

      {/* ── Headlight glow at front ── */}
      <ellipse cx={354} cy={66} rx={10} ry={6}
               fill="#34E0E0" opacity={0.18} filter="url(#evs-blur)"/>
      <ellipse cx={354} cy={67} rx={3.5} ry={2.2} fill="#34E0E0" opacity={0.48}/>
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export function EVSilhouette({ active }: { active: boolean }) {
  const prefersReduce = useReducedMotion()
  const [animKey, setAnimKey] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const vwRef     = useRef(1440)

  // Track viewport width without causing re-renders
  useEffect(() => {
    vwRef.current = window.innerWidth
    const onResize = () => { vwRef.current = window.innerWidth }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timerRef.current) }
  }, [])

  const fire = () => {
    setAnimKey(k => k + 1)
    setRunning(true)
  }

  const onDone = () => {
    setRunning(false)
    const gap = GAP_MIN_MS + Math.random() * (GAP_MAX_MS - GAP_MIN_MS)
    timerRef.current = setTimeout(fire, gap)
  }

  useEffect(() => {
    if (!active || prefersReduce) return
    timerRef.current = setTimeout(fire, FIRST_MS)
  }, [active, prefersReduce])

  if (!active || prefersReduce) return null

  // Car is 360px wide; start fully off-screen left, end fully off-screen right
  const startX = -(360 + 40)
  const endX   = vwRef.current + 40

  return (
    <div
      aria-hidden
      style={{
        position:      'absolute',
        left:          0,
        right:         0,
        bottom:        '7%',
        height:        88,
        zIndex:        4,
        pointerEvents: 'none',
      }}
    >
      {running && (
        <motion.div
          key={animKey}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
          initial={{ x: startX }}
          animate={{ x: endX }}
          transition={{ duration: PASS_SEC, ease: 'linear' }}
          onAnimationComplete={onDone}
        >
          <EvCarSvg />
        </motion.div>
      )}
    </div>
  )
}
