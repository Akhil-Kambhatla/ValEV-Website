'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EV_FACTS } from '@/lib/constants'

const INTERVAL_MS = 4200

// Thin inline band that crossfades through EV facts one at a time.
// Does NOT claim a full brightness-ladder rung — bg matches s5 above it.
export function EvFactsStrip() {
  const reduced            = useReducedMotion()
  const [index, setIndex]  = useState(0)

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % EV_FACTS.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [reduced])

  const fact = EV_FACTS[index]

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-s5)',
        borderTop:       '1px solid rgba(52,224,224,0.07)',
        borderBottom:    '1px solid rgba(52,224,224,0.07)',
      }}
    >
      <div
        className="max-w-4xl mx-auto px-6 flex items-center justify-center"
        style={{ height: '4rem' }}
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="flex items-baseline gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          >
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.9375rem',
                fontWeight:    700,
                color:         'var(--silver-hi)',
                letterSpacing: '0.04em',
              }}
            >
              {fact.stat}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.8125rem',
                color:      'var(--silver-lo)',
              }}
            >
              {fact.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
