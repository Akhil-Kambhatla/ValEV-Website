'use client'

import Link from 'next/link'
import { MessageCircle, CheckCircle2, ChevronLeft } from 'lucide-react'
import { BackdropSection } from './BackdropSection'
import { CONTACT, PARTNER_PLACEHOLDERS as P } from '@/lib/constants'

const waHost =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%20run%20a%20business%2Flocation%20and%20want%20to%20host%20a%20charging%20station.`

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

export function PartnerHostPage() {
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
            Partnership · Location Partner
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
            Host a Station
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
            Got parking space? ValEV installs and operates a fast charger at your location at zero cost. You earn from every session.
          </p>
        </div>
      </BackdropSection>

      {/* Host content */}
      <div style={{ backgroundColor: 'var(--bg-s2)' }}>
        <section
          style={{
            paddingBlock:    'clamp(56px, 8vh, 96px)',
            paddingInline:   'clamp(20px, 5vw, 72px)',
            scrollMarginTop: '72px',
          }}
        >
          <div style={{ maxWidth: '960px', marginInline: 'auto' }}>
            <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">

              {/* Left */}
              <div className="flex flex-col gap-6">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--silver-mid)', lineHeight: 'var(--leading-normal)' }}>
                  Got parking space at a restaurant, cafe, workplace, fuel station, hotel, or commercial complex? ValEV installs and operates a fast charger at your location at no cost to you. You earn from every charging session, and your venue benefits from longer visitor dwell times.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--silver-mid)', lineHeight: 'var(--leading-normal)' }}>
                  No upfront investment. No equipment to manage. No operations to run. Just space, and a share of the revenue.
                </p>

                {/* You provide / We provide */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div
                    className="p-5 rounded-xl"
                    style={{ background: 'rgba(7,8,10,0.50)', border: '1px solid rgba(52,224,224,0.09)' }}
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
                    style={{ background: 'rgba(52,224,224,0.04)', border: '1px solid rgba(52,224,224,0.09)' }}
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
                    background:     'rgba(7,8,10,0.60)',
                    border:         '1px solid rgba(52,224,224,0.12)',
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

                <div
                  className="p-6 rounded-xl"
                  style={{
                    background:     'rgba(7,8,10,0.60)',
                    border:         '1px solid rgba(52,224,224,0.12)',
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
    </>
  )
}
