'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { SectionWrapper } from './SectionWrapper'

const NEON_CSS = `
  @keyframes cs-reveal {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 8% 0 0); }
  }
  @keyframes cs-tip-slide {
    from { left: 0%; }
    to   { left: 87%; }
  }
  @keyframes cs-tip-life {
    0%   { opacity: 0; }
    5%   { opacity: 1; }
    68%  { opacity: 1; }
    86%  { opacity: 0; }
    100% { opacity: 0; }
  }
  @keyframes cs-breathe {
    0%   { opacity: 1;    }
    50%  { opacity: 0.88; }
    100% { opacity: 1;    }
  }

  .cs-svg {
    display: block;
    width: 100%;
    clip-path: inset(0 100% 0 0);
  }
  .cs-tip {
    position: absolute;
    top: 10%; bottom: 10%;
    left: 0%;
    width: 72px;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(ellipse at center,
      rgba(230,255,255,0.90) 0%,
      rgba(52,224,224,0.68) 28%,
      rgba(52,224,224,0.12) 70%,
      transparent 100%);
  }

  .cs-active .cs-svg {
    animation: cs-reveal 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both;
  }
  .cs-active .cs-tip {
    animation:
      cs-tip-slide 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both,
      cs-tip-life  2.4s ease                            0.7s forwards;
  }
  .cs-active .cs-neon-group {
    animation: cs-breathe 4s ease-in-out 3.5s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .cs-svg        { clip-path: inset(0 8% 0 0) !important; animation: none !important; }
    .cs-tip        { display: none !important; }
    .cs-neon-group { animation: none !important; }
  }

  .cs-t { font-family: var(--font-display, 'Chakra Petch', sans-serif); }

  @media (max-width: 640px) {
    .cs-neon-wrap { justify-content: flex-start !important; }
  }
`

function NeonSignature({ active }: { active: boolean }) {
  return (
    <>
      <style>{NEON_CSS}</style>
      <div
        className={`cs-neon-wrap${active ? ' cs-active' : ''}`}
        aria-hidden
        style={{ display: 'flex', justifyContent: 'center', lineHeight: 0, userSelect: 'none' }}
      >
        {/* Inner wrapper: same width as SVG so the tip tracks the text correctly */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 'clamp(300px, 72vw, 780px)' }}>
          <svg
            className="cs-svg"
            viewBox="0 0 880 210"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: 'auto', overflow: 'visible' }}
          >
            <defs>
              {/* Neon tube glow — shadow backdrop + outer bloom + mid corona */}
              <filter id="cs-fill-glow" x="-15%" y="-65%" width="130%" height="230%">
                <feColorMatrix in="SourceGraphic" type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 18 0"
                  result="silhouette" />
                <feGaussianBlur in="silhouette" stdDeviation="22" result="shadow" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="26" result="glow3" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="glow2" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="4"  result="glow1" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="glow3" />
                  <feMergeNode in="glow2" />
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Hot core — tight halo for the white inner-tube stroke */}
              <filter id="cs-core-glow" x="-5%" y="-30%" width="110%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b1" />
                <feMerge>
                  <feMergeNode in="b1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g className="cs-neon-group">
              {/* Tube body: pure #34E0E0 with shadow backdrop + bloom */}
              <text
                x="440" y="170"
                textAnchor="middle"
                className="cs-t"
                fontSize="82" fontStyle="italic" fontWeight="700"
                fill="#34E0E0"
                filter="url(#cs-fill-glow)"
              >fast charging</text>

              {/* Hot white inner core — bright center of a real neon tube */}
              <text
                x="440" y="170"
                textAnchor="middle"
                className="cs-t"
                fontSize="82" fontStyle="italic" fontWeight="700"
                fill="none"
                stroke="rgba(215,255,255,0.82)"
                strokeWidth="1.4"
                filter="url(#cs-core-glow)"
              >fast charging</text>
            </g>
          </svg>

          {/* Moving glow tip — sibling to SVG, not clipped, leads the reveal */}
          <div className="cs-tip" />
        </div>
      </div>
    </>
  )
}

export function ChargerSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [neonActive, setNeonActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNeonActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const ambientLayer = (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Image
        src="/valev-car.png"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 38%' }}
        priority={false}
      />
      {/* Bottom-heavy gradient — heavy over road, open over sky */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(7,8,10,0.96) 0%, rgba(7,8,10,0.82) 18%, rgba(7,8,10,0.48) 42%, rgba(7,8,10,0.14) 68%, rgba(7,8,10,0.04) 100%)',
      }} />
      {/* Subtle cyan glow near road/charger (bottom-left) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 65% 32% at 28% 94%, rgba(52,224,224,0.08) 0%, transparent 70%)',
      }} />
      {/* Thin top vignette so neon reads against bright sky */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(7,8,10,0.28) 0%, transparent 28%)',
      }} />
    </div>
  )

  return (
    <SectionWrapper bg="s4" id="technology" ambientLayer={ambientLayer}>
      <div
        ref={sectionRef}
        style={{
          minHeight: 'clamp(520px, 85vh, 960px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 'clamp(56px, 9vh, 96px)',
          paddingBottom: 'clamp(48px, 8vh, 88px)',
          paddingInline: 'clamp(20px, 5vw, 72px)',
        }}
      >
        {/* Neon signature — top of image */}
        <NeonSignature active={neonActive} />

        {/* Copy block — bottom, over road/foreground */}
        <div style={{ maxWidth: '600px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section-h)',
              color: 'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
              fontWeight: 700,
              marginBottom: '0.875rem',
            }}
          >
            240 kW. Dual gun.<br />Built for India.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.7vw, 1.125rem)',
              color: 'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
              maxWidth: '44ch',
            }}
          >
            Fast enough that the wait becomes the break. Built to hold up to Indian roads, weather, and grids.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
