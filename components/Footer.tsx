import { Mail, MessageCircle } from 'lucide-react'
import { Logo } from './Logo'
import { BRAND, CONTACT, NAV_LINKS, FOOTER_LINKS } from '@/lib/constants'

// Server component — no event handlers; hover via CSS custom props.
// Logo inside here is 'use client' but that's fine in a server component tree.
export function Footer() {
  const waUrl = `${CONTACT.whatsappUrl}?text=Hi%20ValEV%2C%20I%27m%20interested%20in%20hosting%20a%20charging%20station.`

  return (
    <footer
      id="contact"
      className="relative pt-16 pb-10 px-6"
      style={{ backgroundColor: 'var(--bg-contact)' }}
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

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
          <p className="type-eyebrow mb-1">Navigate</p>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="footer-link text-sm transition-colors duration-150"
            >
              {label}
            </a>
          ))}
          <div className="flex gap-4 mt-2">
            {FOOTER_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="footer-link-lo text-xs transition-colors duration-150"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Contact column ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <p className="type-eyebrow mb-1">Get in touch</p>

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
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link inline-flex items-center gap-2.5 text-sm transition-colors duration-150"
          >
            {/* lucide-react doesn't export Instagram; inline the icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            @valev.in
          </a>
        </div>

      </div>
    </footer>
  )
}
