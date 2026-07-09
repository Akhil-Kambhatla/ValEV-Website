'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, Zap, Plug, Shield, Wifi } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { StaggerGrid, StaggerItem } from './StaggerGrid'
import { GlowCTA, SecondaryBrighten } from './HoverInteractions'
import { CONTACT } from '@/lib/constants'

const TECH_WA_URL =
  CONTACT.whatsappUrl +
  '?text=' +
  encodeURIComponent("Hi ValEV, I'd like to know more about your charging technology.")

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Part 1: Hero ────────────────────────────────────────────────────────────

const HERO_CHIPS = [
  { val: 'Up to 240 kW', lbl: 'Per charger' },
  { val: 'Dual CCS2',    lbl: 'Two vehicles at once' },
  { val: 'IP54 rated',   lbl: 'All-weather ready' },
]

function TechHero() {
  const ambientLayer = (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <style>{`
        @media (max-width: 640px) {
          .tech-machine-img { object-position: right 15% !important; }
          .tech-machine-mob { display: block !important; }
        }
      `}</style>
      <Image
        src="/machine.png"
        alt=""
        fill
        sizes="100vw"
        className="tech-machine-img"
        style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
        priority
      />
      {/* Left-to-right gradient — text zone is fully dark, charger emerges right */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'linear-gradient(to right, rgba(7,8,10,0.98) 0%, rgba(7,8,10,0.92) 28%, rgba(7,8,10,0.58) 54%, rgba(7,8,10,0.14) 76%, rgba(7,8,10,0.04) 100%)',
      }} />
      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(7,8,10,0.82) 0%, transparent 38%)',
      }} />
      {/* Top vignette — text stacks above charger on small screens */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(7,8,10,0.82) 0%, transparent 35%)',
      }} />
      {/* Cyan atmosphere at charger body (right-center of section) */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse 38% 62% at 70% 46%, rgba(52,224,224,0.08) 0%, transparent 70%)',
      }} />
      {/* Mobile blanket overlay: left→right gradient fails when content fills full width */}
      <div
        className="tech-machine-mob"
        style={{
          display: 'none',
          position: 'absolute', inset: 0,
          background: 'rgba(7,8,10,0.52)',
        }}
      />
    </div>
  )

  return (
    <SectionWrapper bg="hero" noReveal ambientLayer={ambientLayer}>
      <div
        style={{
          minHeight: 'clamp(560px, 80vh, 880px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <motion.div
          className="max-w-7xl mx-auto px-6 w-full"
          style={{
            paddingTop:    'clamp(7rem, 14vw, 9.5rem)',
            paddingBottom: 'clamp(4rem, 8vw, 6.5rem)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          <div style={{ maxWidth: '600px' }}>

            {/* H1 */}
            <h1
              className="font-bold"
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     'var(--text-h1)',
                color:        'var(--silver-hi)',
                lineHeight:   'var(--leading-snug)',
                marginBottom: '1.5rem',
              }}
            >
              Technology built<br />to be relied on.
            </h1>

            {/* Lead */}
            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'var(--text-body-lg)',
              color:        'var(--silver-mid)',
              lineHeight:   'var(--leading-normal)',
              maxWidth:     '50ch',
              marginBottom: '2.5rem',
            }}>
              Premium modular DC fast-charging hardware, engineered for Indian
              roads, weather, and scale. Each station is designed to charge
              dependably, session after session.
            </p>

            {/* Spec chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {HERO_CHIPS.map(({ val, lbl }) => (
                <div
                  key={val}
                  style={{
                    display:        'flex',
                    flexDirection:  'column',
                    gap:            '0.25rem',
                    padding:        '0.75rem 1.125rem',
                    borderRadius:   '0.5rem',
                    border:         '1px solid rgba(52,224,224,0.13)',
                    background:     'rgba(7,8,10,0.62)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '1rem',
                    fontWeight:    700,
                    color:         'var(--silver-hi)',
                    letterSpacing: '0.02em',
                    lineHeight:    1,
                  }}>
                    {val}
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.625rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--silver-lo)',
                    lineHeight:    1.3,
                  }}>
                    {lbl}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

// ─── Part 2: Core capabilities ────────────────────────────────────────────────

const CAPABILITIES = [
  {
    Icon:      Zap,
    stat:      '60–240 kW',
    statLabel: 'per charger',
    title:     'Modular power output',
    body:      'Each station is sized to its site. Power modules combine to deliver anywhere from 60 to 240 kW per charger, matched to the real demand of the location and the vehicles it serves.',
  },
  {
    Icon:      Plug,
    stat:      '2 vehicles',
    statLabel: 'simultaneously',
    title:     'Dual CCS2 connectors',
    body:      'Every machine carries two CCS2 guns. Both vehicles charge at the same time, each drawing at the maximum speed their battery can accept, independently.',
  },
  {
    Icon:      Shield,
    stat:      'IP54',
    statLabel: 'enclosure rating',
    title:     'Built for Indian conditions',
    body:      'Rated against dust and water ingress. Designed to stay online through South India\'s monsoons, high-humidity summers, and wide temperature swings with no need for shelter.',
  },
  {
    Icon:      Wifi,
    stat:      'OTA',
    statLabel: 'software updates',
    title:     'Smart charging software',
    body:      'Remote monitoring and real-time status built in. Drivers start sessions via app, RFID card, or QR code, and pay through a single integrated flow. Stations update over the air with no site visits needed to stay current.',
  },
]

function TechCapabilities() {
  return (
    <SectionWrapper bg="s2" ambientGlow="rgba(52,224,224,0.045)">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* Section heading */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)', maxWidth: '560px' }}>
          <h2
            className="font-bold"
            style={{
              fontFamily:   'var(--font-display)',
              fontSize:     'var(--text-section-h)',
              color:        'var(--silver-hi)',
              lineHeight:   'var(--leading-snug)',
              marginBottom: '0.875rem',
            }}
          >
            What our chargers deliver.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body-lg)',
            color:      'var(--silver-mid)',
            lineHeight: 'var(--leading-normal)',
          }}>
            Premium modular hardware, configured to each site.
          </p>
        </div>

        {/* 2×2 capability grid — hairline separators, matching hero stats style */}
        <StaggerGrid
          className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-xl"
          style={{ background: 'rgba(52,224,224,0.07)', border: '1px solid rgba(52,224,224,0.09)' }}
        >
          {CAPABILITIES.map(({ Icon, stat, statLabel, title, body }) => (
            <StaggerItem
              key={title}
              style={{
                background: 'var(--bg-s2)',
                padding:    'clamp(1.5rem, 3vw, 2rem)',
                display:    'flex',
                flexDirection: 'column',
                gap:        '0',
              }}
            >
              {/* Icon */}
              <Icon
                size={22}
                aria-hidden
                strokeWidth={1.6}
                style={{ color: 'var(--cyan)', marginBottom: '1.25rem', flexShrink: 0 }}
              />

              {/* Stat */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  display:       'block',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'clamp(1.25rem, 2.2vw, 1.5rem)',
                  fontWeight:    700,
                  color:         'var(--silver-hi)',
                  letterSpacing: '0.02em',
                  lineHeight:    1,
                  marginBottom:  '0.3rem',
                }}>
                  {stat}
                </span>
                <span style={{
                  display:       'block',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.625rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         'var(--silver-lo)',
                  lineHeight:    1,
                }}>
                  {statLabel}
                </span>
              </div>

              {/* Title */}
              <p
                style={{
                  fontFamily:   'var(--font-body)',
                  fontSize:     '0.9375rem',
                  fontWeight:   600,
                  color:        'var(--silver-hi)',
                  lineHeight:   1.35,
                  marginBottom: '0.625rem',
                }}
              >
                {title}
              </p>

              {/* Body */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-sm)',
                color:      'var(--silver-mid)',
                lineHeight: 'var(--leading-normal)',
              }}>
                {body}
              </p>
            </StaggerItem>
          ))}
        </StaggerGrid>

      </div>
    </SectionWrapper>
  )
}

// ─── Part 3: Smart Load Management / Fleet ────────────────────────────────────

const CHARGER_CX = [52, 140, 228] as const

const FLEET_SERVES = [
  'Fleet operators',
  'Bus depot operators',
  'High-demand commercial sites',
]

function FleetDiagram() {
  return (
    <svg
      viewBox="0 0 280 316"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      role="presentation"
      style={{ width: '100%', maxWidth: '340px', display: 'block' }}
    >
      <defs>
        <style>{`
          @keyframes td-flow {
            0%   { stroke-dashoffset: 20; }
            100% { stroke-dashoffset: 0;  }
          }
          .td-fl {
            stroke: #34E0E0;
            stroke-width: 1.4;
            stroke-dasharray: 5 5;
            animation: td-flow 1s linear var(--td-delay, 0s) infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .td-fl { animation: none; stroke-dasharray: none; }
          }
        `}</style>
      </defs>

      {/* ── Grid / power source ── */}
      <rect x="80" y="8" width="120" height="42" rx="6"
        fill="rgba(52,224,224,0.06)" stroke="rgba(52,224,224,0.25)" strokeWidth="1"/>
      <text x="140" y="26" textAnchor="middle" fill="#9AA0A8"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1">
        GRID CONNECTION
      </text>
      <text x="140" y="43" textAnchor="middle" fill="#C4C8CE"
        fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">
        site power supply
      </text>

      {/* Grid to distribution node */}
      <line x1="140" y1="50" x2="140" y2="88"
        className="td-fl"
        style={{ '--td-delay': '0s' } as React.CSSProperties}/>

      {/* ── Smart distribution node ── */}
      <rect x="10" y="88" width="260" height="52" rx="8"
        fill="rgba(52,224,224,0.10)" stroke="#34E0E0" strokeWidth="1.3"/>
      <text x="140" y="109" textAnchor="middle" fill="#F0F2F4"
        fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">
        ValEV Smart Load Sharing
      </text>
      <text x="140" y="127" textAnchor="middle" fill="#9AA0A8"
        fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.8">
        power allocated dynamically
      </text>

      {/* Distribution node to charger fan lines */}
      {CHARGER_CX.map((cx, i) => (
        <line key={cx} x1={cx} y1="140" x2={cx} y2="170"
          className="td-fl"
          style={{ '--td-delay': `${0.18 + i * 0.16}s` } as React.CSSProperties}/>
      ))}

      {/* ── 3 Charger units ── */}
      {CHARGER_CX.map((cx, i) => (
        <g key={cx}>
          <rect x={cx - 40} y="170" width="80" height="78" rx="7"
            fill="rgba(21,24,32,0.92)" stroke="rgba(52,224,224,0.14)" strokeWidth="1"/>
          {/* Cyan LED accent bar */}
          <rect x={cx - 28} y="177" width="56" height="3" rx="1.5"
            fill="rgba(52,224,224,0.55)"/>
          {/* Power output */}
          <text x={cx} y="217" textAnchor="middle" fill="#F0F2F4"
            fontSize="13" fontWeight="700" fontFamily="var(--font-mono)">
            240 kW
          </text>
          {/* Standard */}
          <text x={cx} y="232" textAnchor="middle" fill="#9AA0A8"
            fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="1">
            CCS2
          </text>
          {/* Unit label */}
          <text x={cx} y="242" textAnchor="middle" fill="#9AA0A8"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="1">
            UNIT {String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}

      {/* Charger units to vehicles */}
      {CHARGER_CX.map((cx, i) => (
        <line key={cx} x1={cx} y1="248" x2={cx} y2="274"
          className="td-fl"
          style={{ '--td-delay': `${0.66 + i * 0.16}s` } as React.CSSProperties}/>
      ))}

      {/* ── Vehicle / asset boxes ── */}
      {CHARGER_CX.map((cx, i) => (
        <g key={cx}>
          <rect x={cx - 40} y="274" width="80" height="34" rx="5"
            fill="rgba(30,42,60,0.8)" stroke="rgba(52,224,224,0.11)" strokeWidth="1"/>
          <text x={cx} y="290" textAnchor="middle" fill="#C4C8CE"
            fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">
            BUS {String(i + 1).padStart(2, '0')}
          </text>
          <text x={cx} y="303" textAnchor="middle" fill="#9AA0A8"
            fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.8">
            CHARGING
          </text>
        </g>
      ))}
    </svg>
  )
}

function TechFleet() {
  return (
    <SectionWrapper bg="s3" ambientGlow="rgba(52,224,224,0.055)">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-center">

          {/* Copy */}
          <div>
            <h2
              className="font-bold"
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     'var(--text-section-h)',
                color:        'var(--silver-hi)',
                lineHeight:   'var(--leading-snug)',
                marginBottom: '1.5rem',
              }}
            >
              A whole bus depot.<br />On one grid connection.
            </h2>

            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'var(--text-body-lg)',
              color:        'var(--silver-mid)',
              lineHeight:   'var(--leading-normal)',
              marginBottom: '1.25rem',
              maxWidth:     '54ch',
            }}>
              When multiple ValEV chargers at a site are linked, they work as one coordinated
              system. Rather than every charger pulling its maximum at once, power is shared
              and reallocated continuously based on what each vehicle actually needs at that
              moment.
            </p>

            <p style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'var(--text-body-lg)',
              color:        'var(--silver-mid)',
              lineHeight:   'var(--leading-normal)',
              marginBottom: '2.5rem',
              maxWidth:     '54ch',
            }}>
              For a fleet operator or bus depot, this changes what is practical. A ValEV
              installation can bring many vehicles onto charge simultaneously without
              exceeding the site's grid connection. Power flows toward the vehicles that
              need it most, and backs off as batteries fill.
            </p>

            {/* Who this serves */}
            <div>
              <p style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         'var(--silver-lo)',
                marginBottom:  '0.875rem',
              }}>
                Who this serves
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {FLEET_SERVES.map(label => (
                  <span
                    key={label}
                    style={{
                      fontFamily:   'var(--font-body)',
                      fontSize:     '0.8125rem',
                      color:        'var(--silver-mid)',
                      padding:      '0.4rem 0.875rem',
                      borderRadius: '9999px',
                      border:       '1px solid rgba(52,224,224,0.15)',
                      background:   'rgba(52,224,224,0.04)',
                      whiteSpace:   'nowrap',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Diagram */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FleetDiagram />
          </div>

        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── Part 4: Close / CTA ─────────────────────────────────────────────────────

function TechClose() {
  return (
    <SectionWrapper bg="s4" ambientGlow="rgba(52,224,224,0.065)">
      <div
        className="max-w-3xl mx-auto px-6 py-24 md:py-32"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        <h2
          className="font-bold"
          style={{
            fontFamily:   'var(--font-display)',
            fontSize:     'var(--text-section-h)',
            color:        'var(--silver-hi)',
            lineHeight:   'var(--leading-snug)',
            marginBottom: '1.25rem',
          }}
        >
          Dependable charging,<br />built for South India.
        </h2>

        <p style={{
          fontFamily:   'var(--font-body)',
          fontSize:     'var(--text-body-lg)',
          color:        'var(--silver-mid)',
          lineHeight:   'var(--leading-normal)',
          maxWidth:     '48ch',
          marginBottom: '2.75rem',
        }}>
          From a single roadside station to a full bus depot, ValEV hardware
          and software is built to perform consistently, every day.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>

          {/* Primary: WhatsApp */}
          <GlowCTA
            href={TECH_WA_URL}
            external
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
            style={{
              fontFamily:      'var(--font-body)',
              backgroundColor: 'var(--cyan)',
              color:           'var(--bg-hero)',
              fontSize:        'var(--text-body)',
            }}
          >
            Talk to us
          </GlowCTA>

          {/* Secondary: Partner section on homepage */}
          <SecondaryBrighten
            href="/#partner"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
            style={{
              fontFamily: 'var(--font-body)',
              border:     '1px solid rgba(52,224,224,0.22)',
              color:      'var(--silver-mid)',
              fontSize:   'var(--text-body)',
            }}
            hoverBorderColor="rgba(52,224,224,0.45)"
            hoverColor="var(--silver-hi)"
          >
            Become a partner
            <ChevronRight size={15} aria-hidden />
          </SecondaryBrighten>

        </div>
      </div>
    </SectionWrapper>
  )
}

// ─── Page assembly ────────────────────────────────────────────────────────────

export function TechnologyPage() {
  return (
    <main>
      <TechHero />
      <TechCapabilities />
      <TechFleet />
      <TechClose />
    </main>
  )
}
