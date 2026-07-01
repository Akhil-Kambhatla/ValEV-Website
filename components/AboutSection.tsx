'use client'

import { SectionWrapper } from './SectionWrapper'
import { IndiaMapBackdrop } from './IndiaMapBackdrop'

const FACTS = [
  {
    n:    '01',
    text: 'ValEV installs and operates super-fast EV charging stations at commercial venues across South India.',
  },
  {
    n:    '02',
    text: 'We are building the region\'s dedicated fast-charging network, starting in Telangana and Andhra Pradesh.',
  },
  {
    n:    '03',
    text: 'Hosts provide a parking space. ValEV covers all equipment, installation, and operating costs at zero charge to the host.',
  },
  {
    n:    '04',
    text: 'EV drivers access reliable CCS2 fast charging at everyday destinations — restaurants, offices, and apartment complexes.',
  },
]

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const innerClass = standalone
    ? 'max-w-5xl mx-auto px-6 pt-40 pb-24 md:pt-48 md:pb-32'
    : 'max-w-5xl mx-auto px-6 py-24 md:py-32'

  return (
    <SectionWrapper
      bg="s3"
      id="about"
      ambientGlow="rgba(52,224,224,0.02)"
      ambientLayer={<IndiaMapBackdrop />}
    >
      <div className={innerClass}>

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h2
            className="font-bold tracking-tight max-w-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Building South India&rsquo;s EV charging network.
          </h2>
        </div>

        {/* Mission paragraph */}
        <p
          className="max-w-xl mb-16 md:mb-20"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body-lg)',
            color:      'var(--silver-mid)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          Our goal is to become one of South India&rsquo;s most relied-on EV fast-charging
          providers. Starting in Telangana and Andhra Pradesh, we are building the
          infrastructure that drivers and hosts can count on as the region&rsquo;s EV
          adoption grows.
        </p>

        {/* Facts list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {FACTS.map(({ n, text }) => (
            <div
              key={n}
              className="flex gap-6 py-7"
              style={{ borderTop: '1px solid rgba(52,224,224,0.06)' }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6875rem',
                  fontWeight:    700,
                  color:         'var(--cyan)',
                  letterSpacing: '0.1em',
                  opacity:       0.7,
                  flexShrink:    0,
                  paddingTop:    '0.18rem',
                }}
              >
                {n}
              </span>

              {/* Fact */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-body-lg)',
                  color:      'var(--silver-mid)',
                  lineHeight: 'var(--leading-normal)',
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Pre-launch note */}
        <p
          className="mt-12"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--silver-lo)',
            opacity:       0.55,
          }}
        >
          Pre-launch — operations beginning 2026
        </p>

      </div>
    </SectionWrapper>
  )
}
