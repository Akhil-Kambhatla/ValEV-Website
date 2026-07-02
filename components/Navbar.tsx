'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { BRAND, NAV_LINKS } from '@/lib/constants'
import { useLogoPhase } from '@/contexts/LogoPhase'

const PARTNER_SUB = [
  { label: 'Franchise (FOCO)', href: '/partner/franchise' },
  { label: 'Host a Station',   href: '/partner/host'      },
  { label: 'Fleet operators',  href: '/partner/fleet'     },
] as const

export function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [partnerOpen,   setPartnerOpen]   = useState(false)  // desktop dropdown
  const [mobilePartner, setMobilePartner] = useState(false)  // mobile accordion
  const { phase } = useLogoPhase()
  const pathname   = usePathname()
  const router     = useRouter()
  const partnerRef = useRef<HTMLLIElement>(null)

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

  // ESC closes partner dropdown (desktop)
  useEffect(() => {
    if (!partnerOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPartnerOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [partnerOpen])

  // Outside click closes partner dropdown
  useEffect(() => {
    if (!partnerOpen) return
    const onClick = (e: MouseEvent) => {
      if (partnerRef.current && !partnerRef.current.contains(e.target as Node)) {
        setPartnerOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [partnerOpen])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Reset mobile partner accordion when drawer closes
  useEffect(() => {
    if (!mobileOpen) setMobilePartner(false)
  }, [mobileOpen])

  // Close partner dropdown on route change
  useEffect(() => { setPartnerOpen(false) }, [pathname])

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
        {/* Logo slot */}
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
          {NAV_LINKS.map(({ label, href }) => {
            if (label === 'Partner') {
              return (
                <li
                  key={label}
                  ref={partnerRef}
                  className="relative"
                  onMouseEnter={() => setPartnerOpen(true)}
                  onMouseLeave={() => setPartnerOpen(false)}
                >
                  <div className="flex items-center gap-0.5">
                    <Link
                      href="/partner"
                      className={cls}
                      style={sty}
                      onClick={() => setPartnerOpen(false)}
                    >
                      Partner
                    </Link>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={partnerOpen}
                      aria-label={partnerOpen ? 'Close partner sub-menu' : 'Open partner sub-menu'}
                      onClick={() => setPartnerOpen(o => !o)}
                      className={`${cls} p-0.5 -mr-1`}
                      style={sty}
                    >
                      <motion.span
                        animate={{ rotate: partnerOpen ? 180 : 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: 'flex' }}
                      >
                        <ChevronDown size={13} aria-hidden />
                      </motion.span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {partnerOpen && (
                      /* paddingTop acts as a transparent hover bridge so the
                         dropdown doesn't flicker when mousing from the nav
                         item text down into the panel */
                      <motion.div
                        style={{
                          position:   'absolute',
                          top:        '100%',
                          left:       '50%',
                          transform:  'translateX(-50%)',
                          paddingTop: '6px',
                          minWidth:   '190px',
                          zIndex:     60,
                        }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.14, ease: 'easeOut' }}
                      >
                        <div
                          role="menu"
                          aria-label="Partner sub-menu"
                          style={{
                            backgroundColor:      'rgba(7, 8, 10, 0.96)',
                            backdropFilter:       'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                            border:               '1px solid rgba(52,224,224,0.10)',
                            borderRadius:         '10px',
                            padding:              '6px',
                            boxShadow:            '0 8px 32px rgba(0,0,0,0.4)',
                          }}
                        >
                          {PARTNER_SUB.map(({ label: sub, href: subHref }) => (
                            <Link
                              key={subHref}
                              href={subHref}
                              role="menuitem"
                              onClick={() => setPartnerOpen(false)}
                              className="flex items-center px-3 py-2.5 rounded-md text-sm transition-colors duration-100 hover:text-[color:var(--cyan)] focus-visible:outline-2 focus-visible:rounded-sm"
                              style={{
                                fontFamily:  'var(--font-body)',
                                color:       'var(--silver-mid)',
                                whiteSpace:  'nowrap',
                              }}
                              onMouseEnter={e => {
                                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(52,224,224,0.06)'
                              }}
                              onMouseLeave={e => {
                                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                              }}
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            }

            return (
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
            )
          })}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          {/* "Host a Station" CTA */}
          <Link
            href="/partner/host"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-[box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4 focus-visible:rounded-md"
            style={{
              fontFamily:      'var(--font-body)',
              backgroundColor: 'var(--cyan)',
              color:           'var(--bg-hero)',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 22px rgba(255,178,62,0.32)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
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
            onMouseEnter={e => { ;(e.currentTarget as HTMLElement).style.color = 'var(--silver-hi)' }}
            onMouseLeave={e => { ;(e.currentTarget as HTMLElement).style.color = 'var(--silver-mid)' }}
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
            {NAV_LINKS.map(({ label, href }) => {
              if (label === 'Partner') {
                return (
                  <div key={label}>
                    {/* Partner row: link text + expand chevron */}
                    <div
                      className="flex items-center justify-between border-b"
                      style={{ borderColor: 'rgba(52, 224, 224, 0.06)' }}
                    >
                      <Link
                        href="/partner"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 text-base py-3 transition-colors duration-150 hover:text-[color:var(--cyan)] focus-visible:outline-2 focus-visible:rounded-sm"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-mid)' }}
                      >
                        Partner
                      </Link>
                      <button
                        type="button"
                        aria-expanded={mobilePartner}
                        aria-label={mobilePartner ? 'Collapse partner menu' : 'Expand partner menu'}
                        onClick={() => setMobilePartner(o => !o)}
                        className="p-2 -mr-2 transition-colors duration-150 hover:text-[color:var(--cyan)] focus-visible:outline-2 focus-visible:rounded-sm"
                        style={{ color: 'var(--silver-mid)' }}
                      >
                        <motion.span
                          animate={{ rotate: mobilePartner ? 180 : 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ display: 'flex' }}
                        >
                          <ChevronDown size={16} aria-hidden />
                        </motion.span>
                      </button>
                    </div>

                    {/* Expandable sub-items */}
                    <AnimatePresence>
                      {mobilePartner && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          {PARTNER_SUB.map(({ label: sub, href: subHref }) => (
                            <Link
                              key={subHref}
                              href={subHref}
                              onClick={() => { setMobileOpen(false); setMobilePartner(false) }}
                              className="flex items-center py-2.5 pl-4 text-sm border-b transition-colors duration-150 hover:text-[color:var(--cyan)] focus-visible:outline-2 focus-visible:rounded-sm"
                              style={{
                                fontFamily:  'var(--font-body)',
                                color:       'var(--silver-mid)',
                                borderColor: 'rgba(52, 224, 224, 0.04)',
                              }}
                            >
                              {sub}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
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
              )
            })}

            <Link
              href="/partner/host"
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
