import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How ValEV (Val Energy Pvt. Ltd.) handles your data. We collect only what you submit, run no ad trackers, and never sell your information.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p
          className="mb-10 text-xs"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
        >
          Last updated: July 2026
        </p>

        <div
          className="flex flex-col gap-8"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-mid)', lineHeight: 'var(--leading-relaxed)' }}
        >

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              What we collect
            </h2>
            <p>
              When you submit our interest survey we collect the information you provide: your city or area, state,
              where you would like a charging station, and any charging problems you describe. If you reach out to us
              directly by email or WhatsApp, we also receive whatever contact details and message you send.
            </p>
            <p className="mt-3">
              We do not run analytics trackers, advertising pixels, or third-party cookies on this site.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              How we use it
            </h2>
            <p>
              We use survey responses to understand where EV charging is needed and to plan our network. If you
              expressed interest in hosting a station or partnering with us, we may use your contact details to reach
              out to you. We do not use your information for any purpose unrelated to building the ValEV network.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              We do not sell your data
            </h2>
            <p>
              We do not sell, rent, or share your personal information with third parties for their own marketing or
              commercial purposes.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              Your information
            </h2>
            <p>
              If you would like to know what information we hold about you, ask us to correct it, or ask us to delete
              it, email us at{' '}
              <a
                href="mailto:valevenergy@gmail.com"
                style={{ color: 'var(--cyan)' }}
              >
                valevenergy@gmail.com
              </a>
              {' '}and we will respond promptly.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              Updates to this policy
            </h2>
            <p>
              We may update this policy as the service grows. If we make material changes, we will update the date at
              the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm transition-colors duration-150"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-lo)' }}
            onMouseEnter={undefined}
          >
            &larr; Back to home
          </Link>
        </div>

      </div>
      </FadeIn>
    </main>
  )
}
