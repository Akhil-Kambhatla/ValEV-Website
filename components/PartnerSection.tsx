'use client'

import { MessageCircle } from 'lucide-react'
import { BackdropSection } from './BackdropSection'
import { CONTACT } from '@/lib/constants'

const waLinkOwner =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%20own%20land%20or%20space%20and%20I%27m%20interested%20in%20hosting%20a%20charging%20station.`

const waLinkRefer =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%20have%20a%20location%20in%20mind%20for%20a%20charging%20station%20but%20I%20don%27t%20own%20it.%20Can%20you%20help%20partner%20with%20it%3F`

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
          '0 0 28px rgba(255,178,62,0.36), 0 0 8px rgba(255,178,62,0.18)'
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
      {/* Hairline at top */}
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
        {/* Eyebrow + main hook — centered */}
        <div className="text-center mb-14 md:mb-16">
          <p className="type-eyebrow mb-7 tracking-[0.22em]">Partner with us</p>
          <h2
            className="font-bold tracking-tight mx-auto"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
              maxWidth:   '38rem',
            }}
          >
            Host super-fast ValEV stations at your location.
          </h2>
        </div>

        {/* Two-column cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

          {/* Left — landowner */}
          <div
            className="flex flex-col gap-5 p-8 rounded-xl"
            style={{
              background: 'rgba(7,8,10,0.55)',
              border:     '1px solid rgba(52,224,224,0.08)',
            }}
          >
            <p
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-body-lg)',
                color:      'var(--silver-hi)',
                lineHeight: 'var(--leading-snug)',
              }}
            >
              Own land and want to host a station?
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-body)',
                color:      'var(--silver-mid)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              If you own a parking space, restaurant, or commercial property in South
              India, you can host a ValEV super-fast charging station. We install and
              operate everything at zero cost to you. Your location earns a share of
              every charging session.
            </p>
            <div className="mt-auto pt-2">
              <WaButton href={waLinkOwner} />
            </div>
          </div>

          {/* Right — referral */}
          <div
            className="flex flex-col gap-5 p-8 rounded-xl"
            style={{
              background: 'rgba(7,8,10,0.55)',
              border:     '1px solid rgba(52,224,224,0.08)',
            }}
          >
            <p
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-body-lg)',
                color:      'var(--silver-hi)',
                lineHeight: 'var(--leading-snug)',
              }}
            >
              Have a location in mind but don&rsquo;t own it?
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'var(--text-body)',
                color:      'var(--silver-mid)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              If you know a restaurant, parking complex, or commercial space that would
              make a great charging spot, tell us about it. We will reach out to the
              location and handle the partnership conversation, so you just need to
              point us in the right direction.
            </p>
            <div className="mt-auto pt-2">
              <WaButton href={waLinkRefer} />
            </div>
          </div>

        </div>
      </div>
    </BackdropSection>
  )
}
