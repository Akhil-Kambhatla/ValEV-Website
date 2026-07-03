'use client'

import { Mail, MessageCircle } from 'lucide-react'
import { useReducedMotion, motion } from 'framer-motion'
import { CONTACT, STATIONS } from '@/lib/constants'

const firstStation = STATIONS[0]

const waUrlPrimary =
  `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27d%20like%20to%20get%20in%20touch.`
const waUrlSecondary =
  `${CONTACT.whatsappSecondaryUrl}?text=Hi%20ValEV%2C%20I%27d%20like%20to%20get%20in%20touch.`

export default function ContactPage() {
  const prefersReduced = useReducedMotion()

  return (
    <main
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--bg-hero)',
        paddingTop: 'clamp(96px, 14vh, 128px)',
        paddingBottom: 'clamp(64px, 10vh, 96px)',
      }}
    >
      {/* Ambient depth — two offset cyan glows, same pattern as footer */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 25%, rgba(52,224,224,0.04), transparent), ' +
            'radial-gradient(ellipse 60% 45% at 75% 80%, rgba(52,224,224,0.028), transparent)',
        }}
      />

      {/* Hairline top separator */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.12) 40%, rgba(52,224,224,0.18) 50%, rgba(52,224,224,0.12) 60%, transparent 100%)',
        }}
      />

      <motion.div
        className="relative w-full max-w-lg mx-auto px-6"
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Heading */}
        <h1
          className="mb-4"
          style={{
            fontFamily:   'var(--font-chakra)',
            fontSize:     'var(--text-h1)',
            lineHeight:   'var(--leading-tight)',
            color:        'var(--silver-hi)',
            fontWeight:   600,
          }}
        >
          Get in touch.
        </h1>

        {/* Sub-line */}
        <p
          className="mb-10"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body-lg)',
            lineHeight: 'var(--leading-relaxed)',
            color:      'var(--silver-mid)',
          }}
        >
          Whether you want to host a station, invest, or bring ValEV to your
          fleet, reach us directly.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">

          {/* WhatsApp primary */}
          <a
            href={waUrlPrimary}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-wa inline-flex items-center gap-3 px-5 py-3.5 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              fontFamily:      'var(--font-body)',
              backgroundColor: 'rgba(52,224,224,0.07)',
              border:          '1px solid rgba(52,224,224,0.14)',
              color:           'var(--silver-hi)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.12)'
              el.style.color = 'var(--cyan)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.07)'
              el.style.color = 'var(--silver-hi)'
            }}
          >
            <MessageCircle size={17} aria-hidden />
            <span>
              WhatsApp (primary)
              <span
                className="block text-xs mt-0.5"
                style={{ color: 'var(--silver-lo)', fontWeight: 400 }}
              >
                +91 80086 73152
              </span>
            </span>
          </a>

          {/* WhatsApp secondary */}
          <a
            href={waUrlSecondary}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-wa inline-flex items-center gap-3 px-5 py-3.5 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              fontFamily:      'var(--font-body)',
              backgroundColor: 'rgba(52,224,224,0.07)',
              border:          '1px solid rgba(52,224,224,0.14)',
              color:           'var(--silver-hi)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.12)'
              el.style.color = 'var(--cyan)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.07)'
              el.style.color = 'var(--silver-hi)'
            }}
          >
            <MessageCircle size={17} aria-hidden />
            <span>
              WhatsApp (secondary)
              <span
                className="block text-xs mt-0.5"
                style={{ color: 'var(--silver-lo)', fontWeight: 400 }}
              >
                +91 91333 77007
              </span>
            </span>
          </a>

          {/* Email */}
          <a
            href={CONTACT.emailUrl}
            className="inline-flex items-center gap-3 px-5 py-3.5 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              fontFamily:      'var(--font-body)',
              backgroundColor: 'rgba(52,224,224,0.07)',
              border:          '1px solid rgba(52,224,224,0.14)',
              color:           'var(--silver-hi)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.12)'
              el.style.color = 'var(--cyan)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.07)'
              el.style.color = 'var(--silver-hi)'
            }}
          >
            <Mail size={17} aria-hidden />
            {CONTACT.email}
          </a>

          {/* LinkedIn */}
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3.5 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              fontFamily:      'var(--font-body)',
              backgroundColor: 'rgba(52,224,224,0.07)',
              border:          '1px solid rgba(52,224,224,0.14)',
              color:           'var(--silver-hi)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.12)'
              el.style.color = 'var(--cyan)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'rgba(52,224,224,0.07)'
              el.style.color = 'var(--silver-hi)'
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Credibility line */}
        <p
          className="mt-10 text-xs leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
        >
          Building South India&apos;s EV fast-charging network, starting in
          Andhra Pradesh and Telangana. First station:{' '}
          {firstStation.venue}, {firstStation.city}.
        </p>
      </motion.div>
    </main>
  )
}
