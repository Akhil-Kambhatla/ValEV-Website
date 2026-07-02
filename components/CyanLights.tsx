// Transient cyan light layer — decorative background effect for dark sections.
// Pure CSS keyframes (GPU-composited transform + opacity only).
// Reduced motion: streaks hidden; orbs kept as static glows.

interface CyanLightsProps {
  // Mirror orb positions horizontally so adjacent sections feel varied
  flip?: boolean
}

export function CyanLights({ flip = false }: CyanLightsProps) {
  const s = flip ? { right: 'auto', left: '8%' } : { left: 'auto', right: '8%' }
  const s2 = flip ? { left: 'auto', right: '14%' } : { right: 'auto', left: '14%' }

  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      {/* Soft drifting orbs — visible even in reduced-motion as gentle static glows */}
      <div
        className="valev-orb"
        style={{
          position:   'absolute',
          width:      '380px',
          height:     '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,224,224,0.065) 0%, transparent 68%)',
          top:        '-90px',
          ...s,
          ['--o-dur' as string]: '19s',
          ['--o-delay' as string]: '0s',
        }}
      />
      <div
        className="valev-orb"
        style={{
          position:   'absolute',
          width:      '260px',
          height:     '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,224,224,0.04) 0%, transparent 68%)',
          bottom:     '-70px',
          ...s2,
          ['--o-dur' as string]: '24s',
          ['--o-delay' as string]: '6s',
        }}
      />

      {/* Traveling streaks — hidden via CSS under prefers-reduced-motion */}
      <div
        className="valev-streak"
        style={{
          position:   'absolute',
          top:        '23%',
          left:       0,
          width:      '54%',
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.30) 50%, transparent 100%)',
          ['--s-dur' as string]:   '9s',
          ['--s-delay' as string]: '0s',
        }}
      />
      <div
        className="valev-streak"
        style={{
          position:   'absolute',
          top:        '57%',
          left:       0,
          width:      '38%',
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.20) 50%, transparent 100%)',
          ['--s-dur' as string]:   '12s',
          ['--s-delay' as string]: '3.8s',
        }}
      />
      <div
        className="valev-streak"
        style={{
          position:   'absolute',
          top:        '40%',
          left:       0,
          width:      '28%',
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.14) 50%, transparent 100%)',
          ['--s-dur' as string]:   '15s',
          ['--s-delay' as string]: '7.2s',
        }}
      />
      <div
        className="valev-streak"
        style={{
          position:   'absolute',
          top:        '76%',
          left:       0,
          width:      '20%',
          height:     '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.10) 50%, transparent 100%)',
          ['--s-dur' as string]:   '18s',
          ['--s-delay' as string]: '1.5s',
        }}
      />
    </div>
  )
}
