'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BackdropSection } from './BackdropSection'

const MODELS = [
  {
    eyebrow:    'Franchise Owned, Company Operated',
    label:      'Franchise (FOCO)',
    desc:       'You invest and own the charging station. ValEV handles site selection, installation, technology, and full day-to-day operations and maintenance. Earn passively from every charging session.',
    highlights: [
      'Passive income — no operational involvement',
      'ValEV operates end to end',
      'Suits investors, landowners, and businesses',
    ],
    href: '/partner/franchise',
    cta:  'Explore FOCO model',
  },
  {
    eyebrow:    'Location Partner',
    label:      'Host a Station',
    desc:       'Provide unused parking space at your business. ValEV installs and operates the charger at zero cost to you. You earn from every session and draw EV drivers to your venue.',
    highlights: [
      'Zero upfront investment',
      'Revenue share on every charge',
      'Ideal for restaurants, offices, fuel stations',
    ],
    href: '/partner/host',
    cta:  'Explore host model',
  },
  {
    eyebrow:    'Fleet Operators',
    label:      'Fleet Partnership',
    desc:       'Bus and cab fleet operators get dedicated, preferential charging infrastructure placed exactly where their routes and depots need it. Pricing tailored to your fleet volume, not a public driver rate.',
    highlights: [
      'Dedicated preferential pricing',
      'Strategic depot and route placement',
      'Smart load-sharing for multi-vehicle sites',
    ],
    href: '/partner/fleet',
    cta:  'Explore fleet model',
  },
] as const

function ModelCard({
  eyebrow,
  label,
  desc,
  highlights,
  href,
  cta,
}: (typeof MODELS)[number]) {
  return (
    <div
      className="flex flex-col p-8 rounded-2xl"
      style={{
        background:     'rgba(7,8,10,0.55)',
        border:         '1px solid rgba(52,224,224,0.12)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <p
        className="uppercase tracking-widest mb-3"
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.65rem',
          letterSpacing: '0.14em',
          color:         'var(--cyan)',
        }}
      >
        {eyebrow}
      </p>

      <h2
        className="font-bold tracking-tight mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize:   'var(--text-h2)',
          color:      'var(--silver-hi)',
          lineHeight: 'var(--leading-snug)',
        }}
      >
        {label}
      </h2>

      <p
        className="mb-6"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-body)',
          color:      'var(--silver-mid)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        {desc}
      </p>

      <ul className="flex flex-col gap-2.5 mb-8 list-none m-0 p-0">
        {highlights.map(h => (
          <li
            key={h}
            className="flex items-center gap-2.5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-sm, 0.8125rem)',
              color:      'var(--silver-mid)',
            }}
          >
            <span
              aria-hidden
              style={{
                width:           '4px',
                height:          '4px',
                borderRadius:    '50%',
                backgroundColor: 'var(--cyan)',
                flexShrink:      0,
              }}
            />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-[border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
          style={{
            fontFamily: 'var(--font-body)',
            border:     '1px solid rgba(52,224,224,0.28)',
            color:      'var(--silver-hi)',
            fontSize:   'var(--text-body)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(52,224,224,0.60)'
            el.style.color       = 'var(--cyan)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(52,224,224,0.28)'
            el.style.color       = 'var(--silver-hi)'
          }}
        >
          {cta}
          <ChevronRight size={15} aria-hidden />
        </Link>
      </div>
    </div>
  )
}

export function PartnerPage() {
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
            Three models. All designed so you benefit from South India&rsquo;s EV growth
            without managing the complexity of running a charging station.
          </p>
        </div>
      </BackdropSection>

      {/* Model cards */}
      <section
        style={{
          backgroundColor: 'var(--bg-s2)',
          paddingBlock:    'clamp(64px, 10vh, 96px)',
          paddingInline:   'clamp(20px, 5vw, 72px)',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        {/* Ambient depth */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 85% 55% at 50% 85%, rgba(52,224,224,0.04), transparent)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 60% 40% at 15% 20%, rgba(52,224,224,0.025), transparent)' }} />
        <div style={{ maxWidth: '960px', marginInline: 'auto', position: 'relative', zIndex: 1 }}>
          <div className="grid md:grid-cols-3 gap-6">
            {MODELS.map(m => (
              <ModelCard key={m.href} {...m} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
