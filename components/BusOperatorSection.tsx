'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'

// Full-bleed image layer with a diagonal gradient overlay:
//   upper-left  → near-opaque black  (text zone)
//   lower-right → nearly transparent (let the neon bus glow through)
const busImageLayer = (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    <style>{`
      @media (max-width: 640px) {
        .bus-backdrop-img { object-position: center bottom !important; }
      }
    `}</style>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/bus%20backdrop%20valev.png"
      alt=""
      className="bus-backdrop-img"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'right bottom',
        opacity: 0.72,
      }}
    />

    {/* Diagonal gradient: dark upper-left (text) → transparent lower-right (bus glow) */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(135deg, rgba(7,8,10,0.97) 0%, rgba(7,8,10,0.93) 28%, rgba(7,8,10,0.72) 50%, rgba(7,8,10,0.28) 72%, rgba(7,8,10,0.08) 100%)',
      }}
    />

    {/* Extra vignette along the left edge so text always has a clean dark field */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(to right, rgba(7,8,10,0.60) 0%, transparent 45%)',
      }}
    />
  </div>
)

export function BusOperatorSection() {
  return (
    <SectionWrapper
      bg="s4"
      id="bus-operators"
      className="min-h-[60vh] flex flex-col justify-center"
      ambientLayer={busImageLayer}
    >
      <div
        style={{
          paddingBlock: 'clamp(72px, 10vh, 108px)',
          paddingInline: 'clamp(20px, 5vw, 72px)',
        }}
      >
        <div style={{ maxWidth: '520px' }}>
          <p
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color:         'var(--cyan)',
              marginBottom:  '1rem',
            }}
          >
            Fleet operators
          </p>

          <h2
            style={{
              fontFamily:   'var(--font-display)',
              fontSize:     'var(--text-section-h)',
              color:        'var(--silver-hi)',
              lineHeight:   'var(--leading-snug)',
              fontWeight:   700,
              marginBottom: '1.25rem',
            }}
          >
            Charging built for your routes.
          </h2>

          <p
            style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'clamp(1rem, 1.7vw, 1.125rem)',
              color:        'var(--silver-mid)',
              lineHeight:   'var(--leading-normal)',
              marginBottom: '2.5rem',
              maxWidth:     '38ch',
            }}
          >
            Bus and cab fleets get dedicated pricing and infrastructure placed exactly where they need it.
          </p>

          <Link
            href="/partner/fleet"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-[border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body)',
              color:      'var(--cyan)',
              border:     '1.5px solid rgba(52,224,224,0.40)',
              borderRadius: '8px',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(52,224,224,0.80)'
              el.style.boxShadow   = '0 0 20px rgba(52,224,224,0.14)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(52,224,224,0.40)'
              el.style.boxShadow   = 'none'
            }}
          >
            Fleet partnership details
            <ChevronRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
