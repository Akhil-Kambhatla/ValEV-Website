'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { SectionWrapper } from './SectionWrapper'

const FirstStationMap = dynamic(
  () => import('./FirstStationMap').then(m => ({ default: m.FirstStationMap })),
  { ssr: false }
)

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScm5H_97IwkwXdGbEq1ijuqAHyy1AG1FsdJd1xOwz4j0j1Lwg/viewform?embedded=true'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'

function SurveyModal({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const reduced = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const hasOpenedRef = useRef(false)

  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true
      setMounted(true)
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      )
      document.body.style.overflow = 'hidden'
      return () => cancelAnimationFrame(id)
    } else {
      setVisible(false)
      const delay = reduced ? 0 : 260
      const timer = setTimeout(() => {
        setMounted(false)
        document.body.style.overflow = ''
        if (hasOpenedRef.current) triggerRef.current?.focus()
      }, delay)
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    }
  }, [open, reduced, triggerRef])

  useEffect(() => {
    if (visible) closeBtnRef.current?.focus()
  }, [visible])

  useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mounted, onClose])

  const trapFocus = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const panel = panelRef.current
    if (!panel) return
    const els = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (!els.length) return
    const first = els[0]
    const last = els[els.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }, [])

  if (!mounted) return null

  const show = visible || !!reduced

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 32px)',
        backgroundColor: show ? 'rgba(7,8,10,0.88)' : 'rgba(7,8,10,0)',
        backdropFilter: 'blur(4px)',
        transition: reduced ? 'none' : 'background-color 250ms ease',
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="EV Charging Survey"
        onKeyDown={trapFocus}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          height: 'min(840px, calc(100vh - clamp(24px, 6vw, 64px)))',
          borderRadius: '12px',
          border: '1px solid rgba(52,224,224,0.18)',
          backgroundColor: '#0F1117',
          boxShadow: '0 0 60px rgba(52,224,224,0.06), 0 24px 64px rgba(0,0,0,0.72)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: show ? 1 : 0,
          transform: show ? 'none' : 'translateY(8px) scale(0.97)',
          transition: reduced ? 'none' : 'opacity 250ms ease, transform 250ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid rgba(52,224,224,0.08)',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
            color: 'var(--silver-lo)',
          }}>
            EV Charging Survey
          </span>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close survey"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--silver-lo)', padding: '4px', lineHeight: 0,
              borderRadius: '4px', transition: 'color 150ms ease',
              outline: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--silver-hi)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--silver-lo)' }}
            onFocus={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--silver-hi)'
              el.style.boxShadow = '0 0 0 2px var(--cyan)'
            }}
            onBlur={e => {
              const el = e.currentTarget as HTMLElement
              el.style.color = 'var(--silver-lo)'
              el.style.boxShadow = 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Google Form iframe — only rendered when modal is open */}
        <iframe
          src={FORM_URL}
          title="ValEV EV Charging Survey"
          style={{ flex: 1, width: '100%', border: 'none', minHeight: 0 }}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export function NetworkSection() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => setOpen(false), [])

  return (
    <SectionWrapper bg="s5" id="network" className="min-h-screen" ambientGlow="rgba(52,224,224,0.06)">
      {/* First confirmed station map */}
      <FirstStationMap />

      {/* Survey CTA */}
      <div style={{
        paddingBottom: 'clamp(72px, 11vh, 120px)',
        paddingInline:  'clamp(20px, 5vw, 72px)',
        maxWidth:       '640px',
        marginInline:   'auto',
        textAlign:      'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize:   'var(--text-section-h)',
          color:      'var(--silver-hi)',
          lineHeight: 'var(--leading-snug)',
          fontWeight: 700,
          marginBottom: '1.125rem',
        }}>
          Help us decide where to build next.
        </h2>

        <p style={{
          fontFamily:    'var(--font-body)',
          fontSize:      'clamp(1rem, 1.7vw, 1.125rem)',
          color:         'var(--silver-mid)',
          lineHeight:    'var(--leading-normal)',
          marginBottom:  '2.25rem',
          maxWidth:      '48ch',
          marginInline:  'auto',
        }}>
          We&apos;re running a quick survey on EV charging in South India. Your input
          shapes where we build our next stations.
        </p>

        <button
          ref={btnRef}
          onClick={() => setOpen(true)}
          style={{
            fontFamily:      'var(--font-body)',
            fontSize:        'var(--text-body)',
            fontWeight:      500,
            backgroundColor: 'var(--cyan)',
            color:           'var(--bg-hero)',
            border:          'none',
            borderRadius:    '8px',
            padding:         '14px 32px',
            cursor:          'pointer',
            transition:      'box-shadow 200ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 28px rgba(52,224,224,0.32), 0 0 8px rgba(52,224,224,0.18)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
          onFocus={e => {
            (e.currentTarget as HTMLElement).style.outline = '2px solid var(--cyan)'
            ;(e.currentTarget as HTMLElement).style.outlineOffset = '4px'
          }}
          onBlur={e => {
            (e.currentTarget as HTMLElement).style.outline = 'none'
          }}
        >
          Take the survey
        </button>
      </div>

      <SurveyModal open={open} onClose={close} triggerRef={btnRef} />
    </SectionWrapper>
  )
}
