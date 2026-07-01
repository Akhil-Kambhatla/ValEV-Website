'use client'

import { MessageCircle, CheckCircle2 } from 'lucide-react'
import { BackdropSection } from './BackdropSection'
import { CONTACT, PARTNER_PLACEHOLDERS as P } from '@/lib/constants'

const waFoco =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27m%20interested%20in%20the%20FOCO%20franchise%20model.`
const waHost =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%20run%20a%20business%2Flocation%20and%20want%20to%20host%20a%20charging%20station.`

// ─── Shared sub-components ────────────────────────────────────────────────────

function WaButton({ href, label = 'Talk to us on WhatsApp' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-medium transition-[box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
      style={{
        fontFamily:      'var(--font-body)',
        backgroundColor: 'var(--cyan)',
        color:           'var(--bg-hero)',
        fontSize:        'var(--text-body)',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.boxShadow =
          '0 0 28px rgba(52,224,224,0.28), 0 0 8px rgba(52,224,224,0.14)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      <MessageCircle size={17} aria-hidden />
      {label}
    </a>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3"
      style={{ borderBottom: '1px solid rgba(52,224,224,0.07)' }}
    >
      <dt
        className="shrink-0"
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         'var(--silver-lo)',
          minWidth:      '9rem',
        }}
      >
        {label}
      </dt>
      <dd
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-body)',
          color:      'var(--silver-mid)',
          margin:     0,
        }}
      >
        {value}
      </dd>
    </div>
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

function IndicativeNote() {
  return (
    <p
      className="mt-4"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize:   '0.65rem',
        letterSpacing: '0.08em',
        color:      'rgba(200,160,60,0.75)',
      }}
    >
      Indicative figures — subject to confirmation
    </p>
  )
}

function SectionDivider() {
  return (
    <div
      aria-hidden
      style={{
        height:     '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.10) 40%, rgba(52,224,224,0.16) 50%, rgba(52,224,224,0.10) 60%, transparent 100%)',
      }}
    />
  )
}

// ─── Process strip ────────────────────────────────────────────────────────────

const STEPS = [
  { n: '01', title: 'Get in touch',          body: 'Drop us a message on WhatsApp or email. We will respond within one working day.' },
  { n: '02', title: 'Site assessment',        body: 'Our team evaluates the location — space, power availability, and traffic profile.' },
  { n: '03', title: 'Installation',           body: 'ValEV handles permitting, equipment supply, and installation end to end.' },
  { n: '04', title: 'Operations and earnings', body: 'We operate the station 24/7. You earn from every charging session.' },
]

function ProcessStrip() {
  return (
    <section
      style={{
        paddingBlock:  'clamp(56px, 8vh, 88px)',
        paddingInline: 'clamp(20px, 5vw, 72px)',
        backgroundColor: 'var(--bg-s3)',
        position:      'relative',
      }}
    >
      <SectionDivider />

      <div style={{ maxWidth: '960px', marginInline: 'auto', marginTop: '1px' }}>
        <p
          className="text-center mb-3"
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--silver-lo)',
          }}
        >
          How it works
        </p>
        <h2
          className="text-center mb-12 font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize:   'var(--text-h2)',
            color:      'var(--silver-hi)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          From first call to first charge
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ n, title, body }) => (
            <div
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function PartnerPage() {
  return (
    <>
      {/* ── Backdrop hero ─────────────────────────────────────────────────── */}
      <BackdropSection
        src="/ValEV Backdrop.jpeg"
        alt="ValEV fast-charging station"
        overlayStrength={0.75}
        priority
        bg="var(--bg-hero)"
      >
        <div
          className="relative max-w-3xl mx-auto px-6 w-full"
          style={{
            zIndex:        10,
            paddingTop:    'clamp(96px, 14vh, 144px)',
            paddingBottom: 'clamp(64px, 10vh, 100px)',
          }}
        >
          <p
            className="uppercase tracking-widest mb-4"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.675rem',
              color:         'var(--cyan)',
              letterSpacing: '0.12em',
            }}
          >
            Partnership
          </p>

          <h1
            className="font-bold tracking-tight mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Partner with ValEV
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
              maxWidth:   '44ch',
            }}
          >
            Two models. Both designed so you benefit from South India&rsquo;s EV growth
            without managing the complexity of running a charging station.
          </p>

          {/* Disclaimer badge */}
          <div
            className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-lg"
            style={{
              background: 'rgba(200,160,60,0.08)',
              border:     '1px solid rgba(200,160,60,0.22)',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.675rem',
                letterSpacing: '0.06em',
                color:         'rgba(200,160,60,0.85)',
              }}
            >
              Indicative figures on this page are subject to confirmation
            </span>
          </div>
        </div>
      </BackdropSection>

      {/* ── Model sections ────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: 'var(--bg-s2)' }}>

        {/* ── FOCO Franchise ────────────────────────────────────────────── */}
        <section
          id="franchise"
          style={{
            paddingBlock:  'clamp(56px, 8vh, 96px)',
            paddingInline: 'clamp(20px, 5vw, 72px)',
            scrollMarginTop: '72px',
          }}
        >
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            {/* Header */}
            <p
              className="uppercase tracking-widest mb-3"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.65rem',
                letterSpacing: '0.16em',
                color:         'var(--cyan)',
              }}
            >
              Model 1 · Franchise
            </p>
            <h2
              className="font-bold tracking-tight mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'var(--text-h2)',
                color:      'var(--silver-hi)',
                lineHeight: 'var(--leading-snug)',
              }}
            >
              Franchise Owned, Company Operated
            </h2>
            <p
              className="mb-10"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize:   '0.8125rem',
                color:      'rgba(52,224,224,0.7)',
              }}
            >
              FOCO
            </p>

            {/* Body */}
            <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">
              {/* Left — description + what ValEV provides */}
              <div className="flex flex-col gap-6">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  You fund and own the charging station. ValEV handles everything
                  else: site selection support, equipment supply and installation,
                  technology, and full day-to-day operations and maintenance. Your
                  station is live and earning without you managing a thing.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  This model suits investors, landowners, and businesses looking for
                  a passive income stream from the growing EV charging market in South
                  India.
                </p>

                {/* What ValEV provides */}
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'rgba(52,224,224,0.04)',
                    border:     '1px solid rgba(52,224,224,0.09)',
                  }}
                >
                  <p
                    className="mb-4"
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
                  <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                    <CheckItem text="Equipment supply and installation" />
                    <CheckItem text="Technology platform and remote monitoring software" />
                    <CheckItem text="24/7 network operations and uptime management" />
                    <CheckItem text="All maintenance, servicing, and repairs" />
                    <CheckItem text="Customer support for drivers" />
                    <CheckItem text="Ongoing site support" />
                  </ul>
                </div>

                <div className="pt-2">
                  <WaButton href={waFoco} label="Talk to us on WhatsApp" />
                </div>
              </div>

              {/* Right — spec card */}
              <div
                className="p-6 rounded-xl sticky top-24"
                style={{
                  background: 'rgba(7,8,10,0.60)',
                  border:     '1px solid rgba(52,224,224,0.12)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <p
                  className="mb-1"
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--silver-lo)',
                  }}
                >
                  Indicative details
                </p>

                <dl className="flex flex-col">
                  <SpecRow label="Investment"       value={P.focoInvestmentFrom} />
                  <SpecRow label="Space needed"     value={P.focoSpaceNeeded} />
                  <SpecRow label="Power setup"      value={P.focoPowerSetup} />
                  <SpecRow label="Ideal locations"  value={P.focoIdealLocations} />
                  <SpecRow label="Payback period"   value={P.focoPaybackPeriod} />
                  <SpecRow label="Annual return"    value={P.focoAnnualReturn} />
                </dl>

                <IndicativeNote />
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── Host a Station ────────────────────────────────────────────── */}
        <section
          id="host"
          style={{
            paddingBlock:  'clamp(56px, 8vh, 96px)',
            paddingInline: 'clamp(20px, 5vw, 72px)',
            scrollMarginTop: '72px',
          }}
        >
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            {/* Header */}
            <p
              className="uppercase tracking-widest mb-3"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.65rem',
                letterSpacing: '0.16em',
                color:         'var(--cyan)',
              }}
            >
              Model 2 · Location Partner
            </p>
            <h2
              className="font-bold tracking-tight mb-10"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'var(--text-h2)',
                color:      'var(--silver-hi)',
                lineHeight: 'var(--leading-snug)',
              }}
            >
              Host a Station
            </h2>

            {/* Body */}
            <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">
              {/* Left — description + split cards + CTA */}
              <div className="flex flex-col gap-6">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  Got parking space at a restaurant, cafe, workplace, fuel station,
                  hotel, or commercial complex? ValEV installs and operates a fast
                  charger at your location at no cost to you. You earn from every
                  charging session, and your venue benefits from longer visitor dwell
                  times.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  No upfront investment. No equipment to manage. No operations to run.
                  Just space, and a share of the revenue.
                </p>

                {/* You provide / We provide */}
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
                      What you provide
                    </p>
                    <ul className="flex flex-col gap-2 list-none m-0 p-0">
                      <CheckItem text="Parking space (2+ bays preferred)" />
                      <CheckItem text="Mains electricity access" />
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
                      <CheckItem text="Equipment and installation (zero cost)" />
                      <CheckItem text="Technology and software" />
                      <CheckItem text="Full operations and maintenance" />
                      <CheckItem text="Customer support for drivers" />
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <WaButton href={waHost} label="Talk to us on WhatsApp" />
                </div>
              </div>

              {/* Right — earnings + ideal hosts */}
              <div className="flex flex-col gap-4">
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'rgba(7,8,10,0.60)',
                    border:     '1px solid rgba(52,224,224,0.12)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <p
                    className="mb-4"
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--silver-lo)',
                    }}
                  >
                    How you earn
                  </p>
                  <dl className="flex flex-col">
                    <SpecRow label="Earning rate"    value={P.hostEarningRate} />
                    <SpecRow label="Monthly (illus)" value={P.hostMonthlyEarning} />
                  </dl>
                  <IndicativeNote />
                </div>

                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'rgba(7,8,10,0.60)',
                    border:     '1px solid rgba(52,224,224,0.12)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <p
                    className="mb-4"
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         'var(--silver-lo)',
                    }}
                  >
                    Ideal host locations
                  </p>
                  <ul className="flex flex-col gap-2 list-none m-0 p-0">
                    {[
                      'Restaurants and cafes',
                      'Workplaces and offices',
                      'Fuel stations',
                      'Hotels and lodges',
                      'Malls and commercial complexes',
                      'Residential complexes',
                      'Highways and dhabas',
                    ].map(loc => (
                      <CheckItem key={loc} text={loc} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <ProcessStrip />
    </>
  )
}
