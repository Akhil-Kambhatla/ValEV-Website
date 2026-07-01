'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { BRAND, NAV_LINKS } from '@/lib/constants'
import { useLogoPhase } from '@/contexts/LogoPhase'

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { phase } = useLogoPhase()
  const pathname   = usePathname()
  const router     = useRouter()

  // Frosted glass kicks in after 16px scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ESC closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // For /#section links: smooth-scroll on homepage, router.push on other pages.
  function handleAnchorClick(e: React.MouseEvent, href: string) {
    if (!href.startsWith('/#')) return
    e.preventDefault()
    const id = href.slice(2)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(href)
    }
  }

  const cls = "text-sm transition-colors duration-150 hover:text-[color:var(--cyan)] focus-visible:outline-2 focus-visible:rounded-sm"
  const sty = { fontFamily: 'var(--font-body)', color: 'var(--silver-mid)' }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300"
      style={
        scrolled
          ? {
              backgroundColor:      'rgba(7, 8, 10, 0.82)',
              backdropFilter:       'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderBottom:         '1px solid rgba(52, 224, 224, 0.06)',
            }
          : { borderBottom: '1px solid transparent' }
      }
    >
      <nav
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
        aria-label="Main navigation"
      >
        {/* Logo slot — two states:
            'hero' phase: invisible placeholder (maintains layout)
            'nav'  phase: real logo; the hero→nav travel is driven by HeroSection's
                          explicit measured transform, not a FLIP.                */}
        <div data-nav-logo className="flex-shrink-0">
          {phase === 'hero' ? (
            <div aria-hidden style={{ visibility: 'hidden', pointerEvents: 'none' }}>
              <Logo variant="nav" animated={false} />
            </div>
          ) : (
            <Link href="/" aria-label={`${BRAND.name} — back to home`}>
              <Logo variant="nav" animated={false} />
            </Link>
          )}
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={cls}
                style={sty}
                onClick={(e) => handleAnchorClick(e, href)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          {/* "Host a Station" CTA — routes to the Host model on the Partner page */}
          <Link
            href="/partner#host"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-[box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4 focus-visible:rounded-md"
            style={{
              fontFamily:      'var(--font-body)',
              backgroundColor: 'var(--cyan)',
              color:           'var(--bg-hero)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 22px rgba(255,178,62,0.32)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            Host a Station
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-1 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
            style={{ color: 'var(--silver-mid)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--silver-hi)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--silver-mid)' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="md:hidden flex flex-col px-6 pt-2 pb-8 gap-1"
            style={{
              backgroundColor:      'rgba(7, 8, 10, 0.96)',
              backdropFilter:       'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderBottom:         '1px solid rgba(52, 224, 224, 0.06)',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={(e) => {
                  setMobileOpen(false)
                  handleAnchorClick(e, href)
                }}
                className="text-base py-3 border-b transition-colors duration-150 last:border-0 focus-visible:outline-2 focus-visible:rounded-sm hover:text-[color:var(--cyan)]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-mid)', borderColor: 'rgba(52, 224, 224, 0.06)' }}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/partner#host"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-md text-sm font-medium focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
              style={{
                fontFamily:      'var(--font-body)',
                backgroundColor: 'var(--cyan)',
                color:           'var(--bg-hero)',
              }}
            >
              Host a Station
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
