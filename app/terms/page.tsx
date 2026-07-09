import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for the ValEV website, a pre-launch informational site for Val Energy Pvt. Ltd. All figures are illustrative and not guarantees.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
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
          Terms of Use
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
              About this site
            </h2>
            <p>
              This website belongs to Val Energy Pvt. Ltd. (trading as ValEV). It is a pre-launch informational site.
              By using it you agree to these terms.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              Content is informational
            </h2>
            <p>
              All content, including pricing, earnings projections, payback estimates, and network coverage maps, is
              for illustration and general information only. These are indicative figures, not guarantees or
              commitments. Actual results depend on many factors and will be discussed with partners directly.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              No warranty
            </h2>
            <p>
              This site is provided as-is. We do not warrant that it will be uninterrupted, error-free, or that any
              information on it is complete or accurate at all times. We may update or remove content at any time
              without notice.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              Use of the site
            </h2>
            <p>
              You may use this site for lawful purposes only. You must not attempt to disrupt, scrape at scale, or
              misuse the site or its content. All content is owned by Val Energy Pvt. Ltd. unless otherwise noted.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              Limitation of liability
            </h2>
            <p>
              To the extent permitted by law, Val Energy Pvt. Ltd. is not liable for any loss or damage arising from
              your use of this site or reliance on any information contained on it.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              Updates to these terms
            </h2>
            <p>
              We may update these terms as the service grows. Continued use of the site after changes constitutes
              acceptance of the updated terms. The date at the top of this page reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: 'var(--font-chakra)', fontSize: 'var(--text-h3)', color: 'var(--silver-hi)', fontWeight: 600 }}
            >
              Contact
            </h2>
            <p>
              Questions about these terms? Email{' '}
              <a
                href="mailto:valevenergy@gmail.com"
                style={{ color: 'var(--cyan)' }}
              >
                valevenergy@gmail.com
              </a>
              .
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
