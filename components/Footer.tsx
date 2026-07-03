import Link from 'next/link'
import { Mail, MessageCircle } from 'lucide-react'
import { Logo } from './Logo'
import { BRAND, CONTACT, NAV_LINKS } from '@/lib/constants'

// Server component — no event handlers; hover via CSS custom props.
// Logo inside here is 'use client' but that's fine in a server component tree.
export function Footer() {
  const waUrl = `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27m%20interested%20in%20hosting%20a%20charging%20station.`

  return (
    <footer
      id="contact"
      className="relative px-6"
      style={{
        backgroundColor: 'var(--bg-contact)',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBlock: 'clamp(64px, 10vh, 96px)',
      }}
    >
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
      {/* Ambient atmosphere — two offset glows so the footer doesn't read as a flat void */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 20% 35%, rgba(52,224,224,0.035), transparent), ' +
            'radial-gradient(ellipse 50% 40% at 80% 75%, rgba(52,224,224,0.025), transparent)',
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 w-full">

        {/* ── Brand column ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <Logo variant="nav" animated={false} />
          <p
            className="text-sm leading-relaxed mt-1"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-mid)' }}
          >
            {BRAND.promise}
          </p>
          <p
            className="text-xs mt-auto pt-6"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
          >
            © {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
          </p>
        </div>

        {/* ── Navigate column ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <p className="type-eyebrow mb-3">Navigate</p>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="footer-link text-sm transition-colors duration-150">
              {label}
            </Link>
          ))}
        </div>

        {/* ── Contact column ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <p className="type-eyebrow mb-3">Get in touch</p>

          {/* WhatsApp — amber hover is one of the four allowed amber uses */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-wa inline-flex items-center gap-2.5 text-sm transition-colors duration-150"
          >
            <MessageCircle size={15} aria-hidden />
            {CONTACT.whatsapp === 'PLACEHOLDER_WHATSAPP' ? 'WhatsApp us' : CONTACT.whatsapp}
          </a>

          <a
            href={CONTACT.emailUrl}
            className="footer-link inline-flex items-center gap-2.5 text-sm transition-colors duration-150"
          >
            <Mail size={15} aria-hidden />
            {CONTACT.email === 'PLACEHOLDER_EMAIL' ? 'Email us' : CONTACT.email}
          </a>

          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link inline-flex items-center gap-2.5 text-sm transition-colors duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  )
}
