'use client'

import Link from 'next/link'
import { MessageCircle, CheckCircle2, ChevronLeft } from 'lucide-react'
import { BackdropSection } from './BackdropSection'
import { FocoCalculator }  from './FocoCalculator'
import { CyanLights }      from './CyanLights'
import { CONTACT, PARTNER_PLACEHOLDERS as P } from '@/lib/constants'

const waFoco =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27m%20interested%20in%20the%20FOCO%20franchise%20model.`

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
      <dd style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--silver-mid)', margin: 0 }}>
        {value}
      </dd>
    </div>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle2 size={16} aria-hidden style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '0.2rem' }} />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--silver-mid)' }}>
        {text}
      </span>
    </li>
  )
}

const STEPS = [
  { n: '01', title: 'Get in touch',           body: 'Drop us a message on WhatsApp or email. We will respond within one working day.' },
  { n: '02', title: 'Site assessment',         body: 'Our team evaluates the location — space, power availability, and traffic profile.' },
  { n: '03', title: 'Installation',            body: 'ValEV handles permitting, equipment supply, and installation end to end.' },
  { n: '04', title: 'Operations and earnings', body: 'We operate the station 24/7. You earn from every charging session.' },
]

function ProcessStrip() {
  return (
    <section
      style={{
        paddingBlock:    'clamp(56px, 8vh, 88px)',
        paddingInline:   'clamp(20px, 5vw, 72px)',
        backgroundColor: 'var(--bg-s3)',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      <CyanLights />
      <div
        aria-hidden
        style={{
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.10) 40%, rgba(52,224,224,0.16) 50%, rgba(52,224,224,0.10) 60%, transparent 100%)',
          position:   'relative',
          zIndex:     1,
        }}
      />
      <div style={{ maxWidth: '960px', marginInline: 'auto', marginTop: '1px', position: 'relative', zIndex: 1 }}>
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
              style={{ background: 'rgba(7,8,10,0.50)', border: '1px solid rgba(52,224,224,0.09)' }}
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

export function PartnerFranchisePage() {
  return (
    <>
      {/* Hero */}
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
          <Link
            href="/partner"
            className="inline-flex items-center gap-1.5 mb-6 text-sm transition-colors duration-150 hover:text-[color:var(--silver-hi)] focus-visible:outline-2 focus-visible:rounded-sm"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
          >
            <ChevronLeft size={14} aria-hidden />
            All partnership models
          </Link>

          <p
            className="uppercase tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.675rem', color: 'var(--cyan)', letterSpacing: '0.12em' }}
          >
            Partnership · FOCO Franchise
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
            Franchise Owned,<br />Company Operated
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
            You invest and own the station. We handle everything else: site selection, installation, technology, and full day-to-day operations.
          </p>

          {/* Indicative figures badge — prominent on the franchise page */}
          <div
            className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-lg"
            style={{ background: 'rgba(200,160,60,0.08)', border: '1px solid rgba(200,160,60,0.22)' }}
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

      {/* FOCO content */}
      <div style={{ backgroundColor: 'var(--bg-s2)', position: 'relative', overflow: 'hidden' }}>
        <CyanLights />
        <section
          style={{
            paddingBlock:    'clamp(56px, 8vh, 96px)',
            paddingInline:   'clamp(20px, 5vw, 72px)',
            scrollMarginTop: '72px',
            position:        'relative',
            zIndex:          1,
          }}
        >
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">

              {/* Left — description + what ValEV provides */}
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--silver-mid)', lineHeight: 'var(--leading-normal)' }}>
                  You fund and own the charging station. ValEV handles everything else: site selection support, equipment supply and installation, technology, and full day-to-day operations and maintenance. Your station is live and earning without you managing a thing.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--silver-mid)', lineHeight: 'var(--leading-normal)' }}>
                  This model suits investors, landowners, and businesses looking for a passive income stream from the growing EV charging market in South India.
                </p>

                <div
                  className="p-6 rounded-xl"
                  style={{ background: 'rgba(52,224,224,0.04)', border: '1px solid rgba(52,224,224,0.09)' }}
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
                  background:     'rgba(7,8,10,0.60)',
                  border:         '1px solid rgba(52,224,224,0.12)',
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
                  <SpecRow label="Investment"      value={P.focoInvestmentFrom} />
                  <SpecRow label="Space needed"    value={P.focoSpaceNeeded} />
                  <SpecRow label="Power setup"     value={P.focoPowerSetup} />
                  <SpecRow label="Ideal locations" value={P.focoIdealLocations} />
                  <SpecRow label="Payback period"  value={P.focoPaybackPeriod} />
                  <SpecRow label="Annual return"   value={P.focoAnnualReturn} />
                </dl>
                <p
                  className="mt-4"
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.65rem',
                    letterSpacing: '0.08em',
                    color:         'rgba(200,160,60,0.75)',
                  }}
                >
                  Indicative figures — subject to confirmation
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FOCO Calculator */}
      <section
        style={{
          paddingBlock:    'clamp(56px, 8vh, 96px)',
          paddingInline:   'clamp(20px, 5vw, 72px)',
          backgroundColor: 'var(--bg-s2)',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        <CyanLights flip />
        {/* Hairline separator */}
        <div
          aria-hidden
          style={{
            position:   'absolute',
            top:        0, left: 0, right: 0,
            height:     '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.10) 40%, rgba(52,224,224,0.16) 50%, rgba(52,224,224,0.10) 60%, transparent 100%)',
            zIndex:     1,
          }}
        />
        <div style={{ maxWidth: '960px', marginInline: 'auto', position: 'relative', zIndex: 1 }}>
          <h2
            className="font-bold tracking-tight mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-h2)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Estimate your returns
          </h2>
          <p
            style={{
              fontFamily:   'var(--font-body)',
              fontSize:     'var(--text-body)',
              color:        'var(--silver-mid)',
              lineHeight:   'var(--leading-normal)',
              maxWidth:     '48ch',
              marginBottom: 'clamp(2rem, 4vh, 3rem)',
            }}
          >
            See indicative setup costs and annual earnings for your FOCO station. Numbers are illustrative — we will provide a detailed site-specific estimate after a brief call.
          </p>
          <FocoCalculator />
        </div>
      </section>

      {/* How it works */}
      <ProcessStrip />
    </>
  )
}
