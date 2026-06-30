'use client'

import { useReducedMotion } from 'framer-motion'

// Three large radial-gradient blobs that drift very slowly through the hero void.
// Pure CSS keyframe animation — no JS per frame, GPU-composited via blur filter.
// Opacities are kept deliberately low (0.018–0.05) so the effect reads as
// "depth and atmosphere" rather than "cyan glow" (which is only allowed on 4 elements).
export function AmbientBackground() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Blob 1 — primary cyan, upper centre. The largest and brightest. */}
      <div
        className={reduced ? undefined : 'ambient-blob-1'}
        style={{
          position:     'absolute',
          top:          '-25%',
          left:         '15%',
          width:        '72%',
          height:       '85%',
          borderRadius: '50%',
          background:   'radial-gradient(ellipse at center, rgba(52,224,224,0.048) 0%, transparent 68%)',
          filter:       'blur(56px)',
        }}
      />

      {/* Blob 2 — deeper cyan-blue, left edge. Counterbalances blob 1. */}
      <div
        className={reduced ? undefined : 'ambient-blob-2'}
        style={{
          position:     'absolute',
          top:          '10%',
          left:         '-18%',
          width:        '58%',
          height:       '75%',
          borderRadius: '50%',
          background:   'radial-gradient(ellipse at center, rgba(20,130,170,0.032) 0%, transparent 68%)',
          filter:       'blur(80px)',
        }}
      />

      {/* Blob 3 — amber glint, lower-right. One of the four allowed amber uses.
          Very low opacity — just enough to add warmth in the lower dark. */}
      <div
        className={reduced ? undefined : 'ambient-blob-3'}
        style={{
          position:     'absolute',
          bottom:       '-15%',
          right:        '-12%',
          width:        '48%',
          height:       '60%',
          borderRadius: '50%',
          background:   'radial-gradient(ellipse at center, rgba(255,178,62,0.018) 0%, transparent 68%)',
          filter:       'blur(96px)',
        }}
      />
    </div>
  )
}
