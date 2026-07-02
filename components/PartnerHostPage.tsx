'use client'

import Link from 'next/link'
import { MessageCircle, CheckCircle2, ChevronLeft, Banknote, Zap, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BackdropSection } from './BackdropSection'
import { CONTACT } from '@/lib/constants'

const waHost =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%20run%20a%20business%2Flocation%20and%20want%20to%20host%20a%20charging%20station.`

const waEarnings =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27m%20interested%20in%20hosting%20a%20station%20and%20would%20like%20to%20discuss%20earning%20options.`

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

function EarningCard({
  Icon,
  title,
  description,
}: {
  Icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-xl"
      style={{
        background:     'rgba(7,8,10,0.55)',
        border:         '1px solid rgba(52,224,224,0.12)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
        style={{ background: 'rgba(52,224,224,0.08)', border: '1px solid rgba(52,224,224,0.18)' }}
        aria-hidden
      >
        <Icon size={18} style={{ color: 'var(--cyan)' }} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize:   'var(--text-card-h)',
            color:      'var(--silver-hi)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body)',
            color:      'var(--silver-mid)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {description}
        </p>
      </div>
    </div>
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

      {/* Earning Options */}
      <div style={{ backgroundColor: 'var(--bg-hero)', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient depth */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 90%, rgba(52,224,224,0.045), transparent)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 50% 35% at 80% 15%, rgba(52,224,224,0.02), transparent)' }} />
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
            <div className="flex flex-col gap-10">
              <div>
                <h2
                  className="font-bold mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   'clamp(1.5rem, 3vw, 2rem)',
                    color:      'var(--silver-hi)',
                    lineHeight: 'var(--leading-snug)',
                  }}
                >
                  Choose the arrangement that suits your business
                </h2>
                <p
                  style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    'var(--text-body)',
                    color:       'var(--silver-mid)',
                    lineHeight:  'var(--leading-normal)',
                    maxWidth:    '54ch',
                  }}
                >
                  We tailor terms to your location. Exact figures are discussed directly with you, not published here.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <EarningCard
                  Icon={Banknote}
                  title="Fixed Rent"
                  description="ValEV pays you a fixed monthly amount for the space, regardless of how many sessions take place. Simple and predictable income."
                />
                <EarningCard
                  Icon={Zap}
                  title="Per-Unit Share"
                  description="You earn a share on every unit of electricity dispensed at your station. The more drivers charge, the more you earn."
                />
                <EarningCard
                  Icon={Layers}
                  title="Hybrid"
                  description="A base monthly rent plus a per-unit share on top. Balances a guaranteed floor with upside as usage grows."
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
                <p
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.65rem',
                    letterSpacing: '0.08em',
                    color:         'rgba(200,160,60,0.75)',
                    maxWidth:      '46ch',
                    lineHeight:    1.6,
                  }}
                >
                  All arrangements are tailored to your site and discussed directly. No figures are fixed until we assess your location.
                </p>
                <WaButton href={waEarnings} label="Discuss earning options" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Host content */}
      <div style={{ backgroundColor: 'var(--bg-s2)', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient depth */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 90% 50% at 50% 80%, rgba(52,224,224,0.035), transparent)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 45% 45% at 90% 10%, rgba(52,224,224,0.02), transparent)' }} />
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

              {/* Right — ideal hosts */}
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
