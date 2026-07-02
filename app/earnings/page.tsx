import type { Metadata } from 'next'
import { HostEarningsCalculator } from '@/components/HostEarningsCalculator'

export const metadata: Metadata = {
  title: 'Host Earnings Calculator — ValEV',
  description:
    'See what your location could earn hosting a ValEV fast-charging station. Zero investment required — calculate your estimated revenue from every unit charged.',
}

export default function EarningsPage() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(52,224,224,0.05), transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          backgroundColor: 'var(--bg-s2)',
          paddingTop: 'clamp(96px, 14vh, 140px)',
          paddingBottom: 'clamp(64px, 10vh, 120px)',
          paddingInline: 'clamp(20px, 5vw, 72px)',
        }}
      >
        <div style={{ maxWidth: '860px', marginInline: 'auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--silver-lo)',
              marginBottom: '1rem',
            }}
          >
            For location owners
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              color: 'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            See what your location could earn.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body-lg)',
              color: 'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
              maxWidth: '54ch',
              marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
            }}
          >
            Businesses that host a ValEV station earn a payout on every unit of electricity
            dispensed — with no equipment to buy, no installation to manage, and no
            operations to run. Adjust the numbers below to match your location.
          </p>

          <HostEarningsCalculator />
        </div>
      </section>
    </main>
  )
}
