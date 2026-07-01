'use client'

import { MessageCircle } from 'lucide-react'
import { BackdropSection } from './BackdropSection'
import { CONTACT } from '@/lib/constants'

const waFoco =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27m%20interested%20in%20the%20FOCO%20franchise%20model%20and%20investing%20in%20a%20charging%20station.`

const waHost =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%20run%20a%20business%2Flocation%20and%20want%20to%20host%20a%20charging%20station.`

function WaButton({ href }: { href: string }) {
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
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 0 28px rgba(52,224,224,0.28), 0 0 8px rgba(52,224,224,0.14)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      <MessageCircle size={17} aria-hidden />
      Talk to us on WhatsApp
    </a>
  )
}

interface ModelCardProps {
  label:    string
  title:    string
  subtitle?: string
  body:     string[]
  href:     string
}

function ModelCard({ label, title, subtitle, body, href }: ModelCardProps) {
  return (
    <div
      className="flex flex-col gap-6 p-8 md:p-10 rounded-2xl"
      style={{
        background: 'rgba(7,8,10,0.60)',
        border:     '1px solid rgba(52,224,224,0.14)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Label */}
      <p
        className="uppercase tracking-widest"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.675rem',
          color:      'var(--cyan)',
          letterSpacing: '0.12em',
        }}
      >
        {label}
      </p>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <h3
          className="font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize:   'clamp(1.5rem, 3vw, 2rem)',
            color:      'var(--silver-hi)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-sm, 0.8125rem)',
              color:      'rgba(52,224,224,0.7)',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Hairline divider */}
      <div
        aria-hidden
        style={{
          height:     '1px',
          background: 'rgba(52,224,224,0.10)',
        }}
      />

      {/* Body copy */}
      <div className="flex flex-col gap-3 flex-1">
        {body.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-2">
        <WaButton href={href} />
      </div>
    </div>
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
      className="flex items-center py-24 md:py-36"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '1px',
          zIndex: 10,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.12) 40%, rgba(52,224,224,0.18) 50%, rgba(52,224,224,0.12) 60%, transparent 100%)',
        }}
      />

      <div
        className="relative max-w-5xl mx-auto px-6 w-full"
        style={{ zIndex: 10 }}
      >
        {/* Heading */}
        <div className="text-center mb-14 md:mb-16">
          <h2
            className="font-bold tracking-tight mx-auto"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
              maxWidth:   '32rem',
            }}
          >
            Partner with us
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              maxWidth:   '36rem',
            }}
          >
            Two ways to be part of the ValEV network in South India.
          </p>
        </div>

        {/* Two model cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <ModelCard
            label="Franchise Model"
            title="Franchise (FOCO)"
            subtitle="Franchise Owned, Company Operated"
            body={[
              "You invest in and own the charging infrastructure. ValEV handles everything else: site selection support, deployment, technology, and full day-to-day operations and maintenance.",
              "You own the asset. We run it. Your station is live and earning without you managing a thing.",
            ]}
            href={waFoco}
          />
          <ModelCard
            label="Location Partner"
            title="Host a station"
            body={[
              "Got parking space at a restaurant, cafe, workplace, fuel station, or commercial complex? We install and operate a fast charger at your location at no cost to you.",
              "You bring the space. ValEV covers the equipment, installation, and operations. Your location earns from every charging session.",
            ]}
            href={waHost}
          />
        </div>
      </div>
    </BackdropSection>
  )
}
