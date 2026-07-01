import type { Metadata } from 'next'
import { SavingsCalculator } from '@/components/SavingsCalculator'

export const metadata: Metadata = {
  title: 'EV Savings Calculator — ValEV',
  description:
    'See how much you could save switching to an electric vehicle. Compare your monthly petrol costs against EV charging costs with real numbers.',
}

export default function SavingsPage() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
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
          {/* Page header */}
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
            Savings Calculator
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
            See what you&apos;d save going electric.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body-lg)',
              color: 'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
              maxWidth: '52ch',
              marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
            }}
          >
            Enter your driving habits and local fuel prices below. The calculator
            compares your current petrol spend against what you&apos;d pay charging
            at a ValEV station.
          </p>

          <SavingsCalculator />
        </div>
      </section>
    </main>
  )
}
