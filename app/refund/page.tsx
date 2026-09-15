import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'
import { BRAND, CONTACT, LEGAL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy',
  description:
    'How cancellations and refunds work for ValEV EV charging: wallet top-ups, charging sessions, failed payments, and roaming partner payments.',
  alternates: { canonical: '/refund' },
}

const h2Style = { fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }

export default function RefundPage() {
  const hasAddress = LEGAL.registeredAddress !== 'PLACEHOLDER_ADDRESS'
  const hasGstin   = LEGAL.gstin !== 'PLACEHOLDER_GSTIN'

  return (
    <main
      className="relative flex flex-col"
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--bg-hero)',
        paddingTop: 'clamp(96px, 14vh, 128px)',
        paddingBottom: 'clamp(64px, 10vh, 96px)',
      }}
    >
      {/* Ambient depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(52,224,224,0.035), transparent), ' +
            'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(52,224,224,0.025), transparent)',
        }}
      />

      <FadeIn>
      <div className="relative max-w-2xl mx-auto px-6 w-full">

        {/* Pre-launch note */}
        <p
          className="mb-8 px-4 py-3 rounded-lg text-xs"
          style={{
            fontFamily:      'var(--font-body)',
            color:           'var(--silver-mid)',
            backgroundColor: 'rgba(52,224,224,0.05)',
            border:          '1px solid rgba(52,224,224,0.12)',
            lineHeight:      'var(--leading-relaxed)',
          }}
        >
          This is a good-faith, plain-language policy written for a pre-launch website.
          It is not an exhaustive legal document.
        </p>

        <h1
          className="mb-2"
          style={{
            fontFamily: 'var(--font-chakra)',
            fontSize:   'var(--text-h1)',
            lineHeight: 'var(--leading-tight)',
            color:      'var(--silver-hi)',
            fontWeight: 600,
          }}
        >
          Cancellation &amp; Refund Policy
        </h1>
        <p
          className="mb-10 text-xs"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
        >
          Last updated: September 2026
        </p>

        <div
          className="flex flex-col gap-8"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-mid)', lineHeight: 'var(--leading-relaxed)' }}
        >

          <section>
            <h2 className="mb-3" style={h2Style}>
              Scope of this policy
            </h2>
            <p>
              This policy explains how cancellations and refunds work for payments made to ValEV through our website
              and app. That means money added to your ValEV Wallet and charging sessions paid for from it. Please read
              it before topping up your Wallet or starting a session.
            </p>
          </section>

          <section>
            <h2 className="mb-3" style={h2Style}>
              Definitions
            </h2>
            <p>
              <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>Company</strong>, &ldquo;ValEV&rdquo;,
              &ldquo;we&rdquo; or &ldquo;us&rdquo; means {BRAND.legal}, trading as ValEV
              {hasAddress && <>, registered at {LEGAL.registeredAddress}</>}
              {hasGstin && <> (GSTIN {LEGAL.gstin})</>}.
            </p>
            <p className="mt-3">
              <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>Application</strong> means the ValEV
              mobile app. <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>Website</strong> means{' '}
              {SITE_URL.replace('https://', '')}. <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>Service</strong>{' '}
              means the Website, the Application, or both.
            </p>
            <p className="mt-3">
              <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>Wallet</strong> means the prepaid balance
              in the Application used to pay for EV charging.{' '}
              <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>Charging Session</strong> means one
              charge of your vehicle at a ValEV charger.{' '}
              <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>Roaming Partner</strong> means a
              third-party EV charging app or wallet that can be used to pay at ValEV stations.{' '}
              <strong style={{ color: 'var(--silver-hi)', fontWeight: 500 }}>You</strong> means any person or entity
              using the Service.
            </p>
          </section>

          <section id="wallet" style={{ scrollMarginTop: '120px' }}>
            <h2 className="mb-3" style={h2Style}>
              ValEV Wallet
            </h2>
            <p>
              Money added to your Wallet can be used only to pay for charging at ValEV stations. Wallet balances are
              non-refundable. They cannot be withdrawn to a bank account or transferred to another user.
            </p>
            <p className="mt-3">
              The Wallet exists so you can start charging in seconds without making a fresh payment every time. Your
              balance stays in your account for future sessions, so please add only what you expect to use.
            </p>
          </section>

          <section>
            <h2 className="mb-3" style={h2Style}>
              Charging sessions
            </h2>
            <p>
              You pay only for the energy actually delivered to your vehicle: the units (kWh) charged, multiplied by the
              tariff shown before you start, plus applicable GST.
            </p>
            <p className="mt-3">
              If a session fails to start, or stops early because of a fault with our charger or app, you are not
              charged for energy you did not receive. Any amount held for that session is returned to your Wallet.
            </p>
            <p className="mt-3">
              If money is debited from your bank, UPI, or card but does not reach your Wallet, or you are charged twice
              for the same top-up, the amount is reversed to your original payment method, usually within 5&ndash;7
              working days depending on your bank.
            </p>
          </section>

          <section>
            <h2 className="mb-3" style={h2Style}>
              Roaming partners
            </h2>
            <p>
              If you pay for a session through a Roaming Partner&apos;s app or wallet, that payment and any refund are
              handled by the Roaming Partner under its own policy. We will share session details with them to help
              resolve any issue.
            </p>
          </section>

          <section>
            <h2 className="mb-3" style={h2Style}>
              Partner and franchise payments
            </h2>
            <p>
              Payments made by host, franchise, or fleet partners are governed by the signed agreement with that partner,
              not by this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3" style={h2Style}>
              Contact
            </h2>
            <p>
              Questions about a payment or a charging session? Email{' '}
              <a
                href={CONTACT.emailUrl}
                style={{ color: 'var(--cyan)' }}
              >
                {CONTACT.email}
              </a>
              {' '}or message us on{' '}
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--cyan)' }}
              >
                WhatsApp
              </a>
              . Please include your session ID or transaction reference so we can help faster.
            </p>
          </section>

        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm transition-colors duration-150"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
          >
            &larr; Back to home
          </Link>
        </div>

      </div>
      </FadeIn>
    </main>
  )
}
