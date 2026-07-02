'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function SavingsTeaser() {
  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBlock: 'clamp(64px, 10vh, 100px)',
        paddingInline: 'clamp(20px, 5vw, 72px)',
        backgroundColor: 'var(--bg-s4)',
        position: 'relative',
      }}
    >
      {/* Hairline separator */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(52,224,224,0.12) 40%, rgba(52,224,224,0.18) 50%, rgba(52,224,224,0.12) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 65% 45% at 85% 15%, rgba(52,224,224,0.04), transparent), ' +
            'radial-gradient(ellipse 55% 40% at 15% 85%, rgba(52,224,224,0.03), transparent)',
        }}
      />

      <div style={{ maxWidth: '600px', marginInline: 'auto', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--silver-lo)',
          marginBottom: '1rem',
        }}>
          For location owners
        </p>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h2)',
          color: 'var(--silver-hi)',
          fontWeight: 700,
          lineHeight: 'var(--leading-snug)',
          marginBottom: '1rem',
        }}>
          Curious what your space could earn?
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-body)',
          color: 'var(--silver-mid)',
          lineHeight: 'var(--leading-normal)',
          marginBottom: '1.75rem',
          maxWidth: '44ch',
          marginInline: 'auto',
        }}>
          Hosting a ValEV station costs you nothing. You earn a payout on every unit charged at your location. See the numbers for your site.
        </p>

        <Link
          href="/earnings"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body)',
            fontWeight: 500,
            backgroundColor: 'var(--cyan)',
            color: 'var(--bg-hero)',
            borderRadius: '8px',
            padding: '12px 24px',
            textDecoration: 'none',
            transition: 'box-shadow 200ms ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(52,224,224,0.32)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          }}
        >
          Calculate your earnings
          <ChevronRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  )
}
