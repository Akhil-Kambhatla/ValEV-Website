'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { MessageCircle, CheckCircle2, ChevronLeft } from 'lucide-react'
import { CONTACT, FLEET_SAVINGS_CALC } from '@/lib/constants'
import { SectionWrapper, EASE } from './SectionWrapper'
import { StaggerGrid, StaggerItem } from './StaggerGrid'
import { AnimatedNumber } from './AnimatedNumber'
import { GlowCTA } from './HoverInteractions'

const waFleet =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%20represent%20a%20bus%2Fcab%20fleet%20operation%20and%20want%20to%20discuss%20a%20charging%20partnership.`

function formatRupees(n: number): string {
  if (n >= 10_000_000) return `₹${parseFloat((n / 10_000_000).toFixed(2))} crore`
  if (n >= 100_000)    return `₹${parseFloat((n / 100_000).toFixed(2))} lakh`
  return '₹' + n.toLocaleString('en-IN')
}

function WaButton({ href, label = 'Talk to us on WhatsApp' }: { href: string; label?: string }) {
  return (
    <GlowCTA
      href={href}
      external
      glow="0 0 28px rgba(52,224,224,0.28), 0 0 8px rgba(52,224,224,0.14)"
      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
      style={{
        fontFamily:      'var(--font-body)',
        backgroundColor: 'var(--cyan)',
        color:           'var(--bg-hero)',
        fontSize:        'var(--text-body)',
      }}
    >
      <MessageCircle size={17} aria-hidden />
      {label}
    </GlowCTA>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle2
        size={16}
        aria-hidden
        style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '0.2rem' }}
      />
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-body)',
          color:      'var(--silver-mid)',
        }}
      >
        {text}
      </span>
    </li>
  )
}

const pillBase: React.CSSProperties = {
  fontFamily:      'var(--font-mono)',
  fontSize:        '0.8rem',
  padding:         '6px 16px',
  borderRadius:    '6px',
  border:          '1px solid rgba(52,224,224,0.18)',
  cursor:          'pointer',
  background:      'transparent',
  color:           'var(--silver-mid)',
}
const pillActive: React.CSSProperties = {
  background:   'rgba(52,224,224,0.12)',
  border:       '1px solid rgba(52,224,224,0.4)',
  color:        'var(--cyan)',
}

function FleetSavingsCalc() {
  const {
    savingsOptions, defaultSavings,
    defaultVehicles, vehiclesMin, vehiclesMax,
    defaultChargesPerWk, weeksPerMonth, weeksPerYear,
    disclaimer,
  } = FLEET_SAVINGS_CALC

  const [savings,      setSavings]      = useState<number>(defaultSavings)
  const [vehicles,     setVehicles]     = useState<number>(defaultVehicles)
  const [chargesPerWk, setChargesPerWk] = useState<number>(defaultChargesPerWk)
  const [isDraggingVehicles, setIsDraggingVehicles] = useState(false)

  const v       = Math.max(vehiclesMin, Math.min(vehiclesMax, vehicles || 0))
  const monthly = Math.round(savings * v * chargesPerWk * weeksPerMonth)
  const yearly  = Math.round(savings * v * chargesPerWk * weeksPerYear)

  const waText = encodeURIComponent(
    `Hi ValEV, I run a fleet of ${v} vehicles and would like to discuss preferential charging rates. My estimated yearly saving is approximately ${formatRupees(yearly)}.`
  )
  const waUrl = `${CONTACT.whatsappUrl}?text=${waText}`

  const labelStyle: React.CSSProperties = {
    fontFamily:    'var(--font-body)',
    fontSize:      '0.8125rem',
    color:         'var(--silver-lo)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    display:       'block',
    marginBottom:  '10px',
  }

  return (
    <SectionWrapper
      bg="hero"
      ambientLayer={
        <>
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse 75% 55% at 50% 85%, rgba(52,224,224,0.04), transparent)' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse 50% 35% at 10% 20%, rgba(52,224,224,0.022), transparent)' }} />
          <div aria-hidden style={{ position: 'absolute', top: 0, insetInline: 0, height: '1px', backgroundColor: 'rgba(52,224,224,0.08)', zIndex: 0 }} />
          <div aria-hidden style={{ position: 'absolute', bottom: 0, insetInline: 0, height: '1px', backgroundColor: 'rgba(52,224,224,0.08)', zIndex: 0 }} />
        </>
      }
    >
      <div
        style={{
          paddingBlock:  'clamp(56px, 8vh, 88px)',
          paddingInline: 'clamp(20px, 5vw, 72px)',
        }}
      >
        <div style={{ maxWidth: '720px', marginInline: 'auto' }}>
          <h2
            className="font-bold tracking-tight mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-h2)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Estimate your savings
          </h2>

          <div className="flex flex-col gap-7">
            {/* Savings per charge */}
            <div>
              <span style={labelStyle}>Savings per charge (vs standard rates)</span>
              <div className="flex gap-2 flex-wrap">
                {savingsOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSavings(opt)}
                    style={savings === opt ? { ...pillBase, ...pillActive } : pillBase}
                  >
                    ₹{opt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of vehicles */}
            <div>
              <label
                htmlFor="fleet-vehicles"
                style={{
                  ...labelStyle,
                  display:        'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Number of vehicles</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{v}</span>
              </label>
              <input
                id="fleet-vehicles"
                type="range"
                min={vehiclesMin}
                max={vehiclesMax}
                value={v}
                onChange={e => setVehicles(Number(e.target.value))}
                onPointerDown={() => setIsDraggingVehicles(true)}
                onPointerUp={() => setIsDraggingVehicles(false)}
                onPointerCancel={() => setIsDraggingVehicles(false)}
                className="w-full"
                style={{ accentColor: 'var(--cyan)' }}
              />
              <div
                className="flex justify-between mt-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.65rem',
                  color:      'var(--silver-lo)',
                }}
              >
                <span>{vehiclesMin}</span>
                <span>{vehiclesMax}</span>
              </div>
            </div>

            {/* Charges per week */}
            <div>
              <span style={labelStyle}>Charges per vehicle per week</span>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setChargesPerWk(n)}
                    style={chargesPerWk === n ? { ...pillBase, ...pillActive } : pillBase}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(7,8,10,0.60)',
                border:     '1px solid rgba(52,224,224,0.10)',
              }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'var(--silver-lo)',
                  marginBottom:  '8px',
                }}
              >
                Monthly savings
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   'clamp(1.4rem, 2.5vw, 1.75rem)',
                  fontWeight: 700,
                  color:      'var(--silver-hi)',
                  lineHeight: 1,
                }}
              >
                {monthly > 0 ? <AnimatedNumber value={monthly} format={formatRupees} instant={isDraggingVehicles} /> : '-'}
              </p>
            </div>

            <div
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(52,224,224,0.07)',
                border:     '1px solid rgba(52,224,224,0.25)',
              }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'var(--cyan)',
                  opacity:       0.7,
                  marginBottom:  '8px',
                }}
              >
                Yearly savings
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   'clamp(1.4rem, 2.5vw, 1.75rem)',
                  fontWeight: 700,
                  color:      'var(--cyan)',
                  lineHeight: 1,
                }}
              >
                {yearly > 0 ? <AnimatedNumber value={yearly} format={formatRupees} instant={isDraggingVehicles} /> : '-'}
              </p>
            </div>
          </div>

          <p
            className="mt-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '0.75rem',
              color:      'var(--silver-lo)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            {disclaimer}
          </p>

          <div className="mt-6">
            <WaButton href={waUrl} label="Talk to us on WhatsApp" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

const FLEET_STEPS = [
  {
    n:     '01',
    title: 'Get in touch',
    body:  'Tell us about your fleet: vehicle count, routes, and depot locations. We respond within one working day.',
  },
  {
    n:     '02',
    title: 'Route and depot analysis',
    body:  'Our team maps your operations and identifies the optimal placement for charging infrastructure.',
  },
  {
    n:     '03',
    title: 'Pricing and agreement',
    body:  'We agree on a dedicated rate structure and infrastructure plan tailored to your fleet size and usage.',
  },
  {
    n:     '04',
    title: 'Deployment',
    body:  'ValEV installs, operates, and monitors the charging infrastructure. Your fleet charges; we handle the rest.',
  },
]

function FleetProcessStrip() {
  return (
    <SectionWrapper
      bg="s3"
      ambientLayer={
        <>
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse 80% 50% at 50% 80%, rgba(52,224,224,0.035), transparent)' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse 55% 40% at 85% 15%, rgba(52,224,224,0.018), transparent)' }} />
        </>
      }
    >
      <div
        style={{
          paddingBlock:  'clamp(56px, 8vh, 88px)',
          paddingInline: 'clamp(20px, 5vw, 72px)',
        }}
      >
        <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
          <h2
            className="text-center mb-12 font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-h2)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            From first conversation to first charge
          </h2>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET_STEPS.map(({ n, title, body }) => (
              <StaggerItem
                key={n}
                className="flex flex-col gap-3 p-6 rounded-xl"
                style={{
                  background: 'rgba(7,8,10,0.50)',
                  border:     '1px solid rgba(52,224,224,0.09)',
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '1.5rem',
                    fontWeight:    700,
                    color:         'var(--cyan)',
                    opacity:       0.6,
                    lineHeight:    1,
                    letterSpacing: '0.02em',
                  }}
                >
                  {n}
                </span>
                <h3
                  className="font-semibold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   '1rem',
                    color:      'var(--silver-hi)',
                    lineHeight: 'var(--leading-snug)',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body-sm, 0.8125rem)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {body}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </SectionWrapper>
  )
}

export function PartnerFleetPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.08 })
  const prefersReducedMotion = useReducedMotion()
  const shouldRevealHero = !prefersReducedMotion

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-hero)',
          minHeight: 'clamp(420px, 60vh, 680px)',
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .fleet-bus-img { object-position: 65% 50% !important; }
          }
        `}</style>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bus%20backdrop%20valev.png"
          alt=""
          aria-hidden
          className="fleet-bus-img"
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: '65% 45%',
            opacity:        0.55,
            zIndex:         0,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset:    0,
            zIndex:   1,
            background:
              'linear-gradient(135deg, rgba(7,8,10,0.98) 0%, rgba(7,8,10,0.94) 30%, rgba(7,8,10,0.78) 55%, rgba(7,8,10,0.32) 80%, rgba(7,8,10,0.10) 100%)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset:    0,
            zIndex:   1,
            background:
              'linear-gradient(to right, rgba(7,8,10,0.72) 0%, transparent 50%)',
          }}
        />

        <motion.div
          ref={heroRef}
          className="relative max-w-3xl mx-auto px-6 w-full"
          style={{
            zIndex:        10,
            paddingTop:    'clamp(96px, 14vh, 144px)',
            paddingBottom: 'clamp(64px, 10vh, 100px)',
          }}
          initial={shouldRevealHero ? { opacity: 0, y: 24 } : false}
          animate={
            shouldRevealHero
              ? { opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 24 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            href="/partner"
            className="inline-flex items-center gap-1.5 mb-6 text-sm transition-colors duration-150 hover:text-[color:var(--silver-hi)] focus-visible:outline-2 focus-visible:rounded-sm"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
          >
            <ChevronLeft size={14} aria-hidden />
            All partnership models
          </Link>

          <h1
            className="font-bold tracking-tight mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Charging built<br />for your fleet.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
              maxWidth:   '46ch',
            }}
          >
            ValEV works directly with bus and cab fleet operators to provide dedicated, preferential charging infrastructure placed exactly where your operations need it.
          </p>
        </motion.div>
      </section>

      {/* Fleet value props */}
      <SectionWrapper
        bg="s2"
        ambientLayer={
          <>
            <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
              background: 'radial-gradient(ellipse 85% 55% at 50% 85%, rgba(52,224,224,0.038), transparent)' }} />
            <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
              background: 'radial-gradient(ellipse 40% 45% at 85% 12%, rgba(52,224,224,0.02), transparent)' }} />
          </>
        }
      >
        <div
          style={{
            paddingBlock:  'clamp(56px, 8vh, 96px)',
            paddingInline: 'clamp(20px, 5vw, 72px)',
          }}
        >
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">

              {/* Left */}
              <div className="flex flex-col gap-6">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  We design charging around your routes, depot locations, and fleet size, not a public driver tariff.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: 'rgba(7,8,10,0.50)',
                      border:     '1px solid rgba(52,224,224,0.09)',
                    }}
                  >
                    <p
                      className="mb-3"
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         'var(--silver-lo)',
                      }}
                    >
                      Who this is for
                    </p>
                    <ul className="flex flex-col gap-2 list-none m-0 p-0">
                      <CheckItem text="Intercity and intra-city bus operators" />
                      <CheckItem text="Cab and ride-hailing fleet operators" />
                      <CheckItem text="Logistics and commercial EV fleets" />
                      <CheckItem text="State and private transport corporations" />
                    </ul>
                  </div>

                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: 'rgba(52,224,224,0.04)',
                      border:     '1px solid rgba(52,224,224,0.09)',
                    }}
                  >
                    <p
                      className="mb-3"
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.65rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color:         'var(--silver-lo)',
                      }}
                    >
                      What ValEV provides
                    </p>
                    <ul className="flex flex-col gap-2 list-none m-0 p-0">
                      <CheckItem text="Dedicated, preferential unit pricing" />
                      <CheckItem text="Strategically placed infrastructure" />
                      <CheckItem text="Smart load-sharing for depot charging" />
                      <CheckItem text="Full installation and operations" />
                      <CheckItem text="Single point of contact end to end" />
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <WaButton href={waFleet} label="Talk to us on WhatsApp" />
                </div>
              </div>

              {/* Right — value prop cards */}
              <div className="flex flex-col gap-4">
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background:     'rgba(7,8,10,0.60)',
                    border:         '1px solid rgba(52,224,224,0.12)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <p
                    className="mb-2"
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--silver-lo)',
                    }}
                  >
                    Dedicated pricing
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--text-body)',
                      color:      'var(--silver-mid)',
                      lineHeight: 'var(--leading-normal)',
                    }}
                  >
                    Preferential unit rates structured around your fleet volume and charging patterns, not a public driver tariff.
                  </p>
                </div>

                <div
                  className="p-6 rounded-xl"
                  style={{
                    background:     'rgba(7,8,10,0.60)',
                    border:         '1px solid rgba(52,224,224,0.12)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <p
                    className="mb-2"
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--silver-lo)',
                    }}
                  >
                    Strategic placement
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--text-body)',
                      color:      'var(--silver-mid)',
                      lineHeight: 'var(--leading-normal)',
                    }}
                  >
                    Stations sited at the exact depots, stops, and waypoints your routes already use. No detours.
                  </p>
                </div>

                <div
                  className="p-6 rounded-xl"
                  style={{
                    background:     'rgba(7,8,10,0.60)',
                    border:         '1px solid rgba(52,224,224,0.12)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <p
                    className="mb-2"
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--silver-lo)',
                    }}
                  >
                    Smart load-sharing
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--text-body)',
                      color:      'var(--silver-mid)',
                      lineHeight: 'var(--leading-normal)',
                    }}
                  >
                    Multiple vehicles charge simultaneously at one site without overloading the grid connection. Depot charging made practical.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Savings calculator */}
      <FleetSavingsCalc />

      {/* How it works */}
      <FleetProcessStrip />
    </>
  )
}
