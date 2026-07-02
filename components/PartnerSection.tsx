'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BackdropSection } from './BackdropSection'

function ModelPill({
  label,
  desc,
  href,
}: {
  label: string
  desc: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-start text-left px-6 py-5 rounded-xl transition-[border-color] duration-200"
      style={{
        background:     'rgba(7,8,10,0.55)',
        border:         '1px solid rgba(52,224,224,0.12)',
        backdropFilter: 'blur(6px)',
        flex:           '1 1 0',
        minWidth:       '200px',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(52,224,224,0.32)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(52,224,224,0.12)'
      }}
    >
      <span
        className="font-semibold mb-1"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize:   '1rem',
          color:      'var(--silver-hi)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-body-sm, 0.8125rem)',
          color:      'var(--silver-mid)',
        }}
      >
        {desc}
      </span>
    </Link>
  )
}

export function PartnerSection() {
  return (
    <BackdropSection
      src="/ValEV Backdrop.jpeg"
      alt="ValEV fast-charging station"
      overlayStrength={0.72}
      id="partner"
      bg="var(--bg-s2)"
      className="flex items-center min-h-[90vh] py-24 md:py-36"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height:     '1px',
          zIndex:     10,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.12) 40%, rgba(52,224,224,0.18) 50%, rgba(52,224,224,0.12) 60%, transparent 100%)',
        }}
      />

      <div
        className="relative max-w-4xl mx-auto px-6 w-full text-center"
        style={{ zIndex: 10 }}
      >
        <h2
          className="font-bold tracking-tight mb-5"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize:   'var(--text-section-h)',
            color:      'var(--silver-hi)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          Partner with us
        </h2>

        <p
          className="mb-10 mx-auto"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body-lg)',
            color:      'var(--silver-mid)',
            maxWidth:   '38rem',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          Three models. All designed so you benefit from South India&rsquo;s EV growth without managing the complexity.
        </p>

        {/* Model pills */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 max-w-2xl mx-auto">
          <ModelPill
            label="Franchise (FOCO)"
            desc="Invest and own. We operate."
            href="/partner/franchise"
          />
          <ModelPill
            label="Host a Station"
            desc="Provide space. Zero cost to you."
            href="/partner/host"
          />
          <ModelPill
            label="Fleet operators"
            desc="Dedicated pricing and strategic placement."
            href="/partner/fleet"
          />
        </div>

        {/* Primary CTA */}
        <Link
          href="/partner"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium transition-[box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
          style={{
            fontFamily:      'var(--font-body)',
            backgroundColor: 'var(--cyan)',
            color:           'var(--bg-hero)',
            fontSize:        'var(--text-body)',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 28px rgba(52,224,224,0.32), 0 0 8px rgba(52,224,224,0.14)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          Explore partnership
          <ChevronRight size={16} aria-hidden />
        </Link>
      </div>
    </BackdropSection>
  )
}
