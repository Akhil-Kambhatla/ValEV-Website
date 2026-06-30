'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * Subtle drifting blobs for the darker upper sections (s2, s3).
 * intensity: 1 = full opacity (s2), 0.5 = half (s3). Pass nothing for s4+.
 * Respects prefers-reduced-motion: blobs become static.
 */
export function SectionAmbient({ intensity = 1 }: { intensity?: number }) {
  const reduced = useReducedMotion()
  const base    = 0.026 * intensity

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Primary blob — upper area, cyan */}
      <div
        className={reduced ? undefined : 'ambient-blob-1'}
        style={{
          position:     'absolute',
          top:          '-22%',
          left:         '12%',
          width:        '68%',
          height:       '78%',
          borderRadius: '50%',
          background:   `radial-gradient(ellipse at center, rgba(52,224,224,${base}) 0%, transparent 68%)`,
          filter:       'blur(64px)',
        }}
      />

      {/* Secondary blob — lower right, cool blue — only for higher-intensity sections */}
      {intensity > 0.6 && (
        <div
          className={reduced ? undefined : 'ambient-blob-2'}
          style={{
            position:     'absolute',
            bottom:       '-18%',
            right:        '-12%',
            width:        '52%',
            height:       '65%',
            borderRadius: '50%',
            background:   `radial-gradient(ellipse at center, rgba(18,110,155,${base * 0.65}) 0%, transparent 68%)`,
            filter:       'blur(88px)',
          }}
        />
      )}
    </div>
  )
}
