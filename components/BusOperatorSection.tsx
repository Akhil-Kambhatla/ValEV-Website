'use client'

import { CONTACT } from '@/lib/constants'
import { SectionWrapper } from './SectionWrapper'

const BUS_WA_MSG = encodeURIComponent(
  'Hi ValEV, I run or represent an EV bus operation and want to discuss a charging partnership.'
)

const PROPS = [
  {
    label: 'Dedicated pricing',
    desc: 'Operator-specific rates structured around your fleet and charging volumes, not individual driver sessions.',
  },
  {
    label: 'Route-matched placement',
    desc: 'Stations sited at the exact depots, stops, and waypoints your buses already use — no detours.',
  },
  {
    label: 'One conversation',
    desc: 'A single point of contact from initial scoping through commissioning and ongoing support.',
  },
]

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
    {/* Bus image — slightly reduced opacity so it reads as atmosphere */}
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
      ambientLayer={busImageLayer}
    >
      <div
        style={{
          paddingBlock: 'clamp(80px, 12vh, 128px)',
          paddingInline: 'clamp(20px, 5vw, 72px)',
        }}
      >
        {/* Text content pinned to the left ~55% on desktop */}
        <div style={{ maxWidth: '520px' }}>
          {/* Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section-h)',
              color: 'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}
          >
            Charging built for your routes.
          </h2>

          {/* Sub-copy */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.7vw, 1.125rem)',
              color: 'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
              marginBottom: '3rem',
            }}
          >
            We work directly with intercity and electric bus operators to place
            fast chargers exactly where your fleet needs them, and to price them
            specifically for your operation. Not a public rate. Not a workaround.
            A real partnership.
          </p>

          {/* Value props */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              marginBottom: '3rem',
            }}
          >
            {PROPS.map(({ label, desc }) => (
              <div
                key={label}
                style={{
                  borderLeft: '2px solid rgba(52,224,224,0.22)',
                  paddingLeft: '1.25rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.9375rem, 1.4vw, 1rem)',
                    fontWeight: 600,
                    color: 'var(--silver-hi)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.875rem, 1.2vw, 0.9375rem)',
                    color: 'var(--silver-lo)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={`${CONTACT.whatsappUrl}?text=${BUS_WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              fontWeight: 500,
              backgroundColor: 'transparent',
              color: 'var(--cyan)',
              border: '1.5px solid rgba(52,224,224,0.40)',
              borderRadius: '8px',
              padding: '14px 32px',
              textDecoration: 'none',
              transition: 'border-color 200ms ease, box-shadow 200ms ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(52,224,224,0.80)'
              el.style.boxShadow = '0 0 20px rgba(52,224,224,0.14)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(52,224,224,0.40)'
              el.style.boxShadow = 'none'
            }}
          >
            Talk to us
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
