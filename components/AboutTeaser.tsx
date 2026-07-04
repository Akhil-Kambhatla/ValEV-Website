import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'

export function AboutTeaser() {
  return (
    <SectionWrapper bg="s3" id="about" className="min-h-[80vh] flex flex-col justify-center" ambientGlow="rgba(52,224,224,0.09)">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center gap-10 md:gap-20">

        {/* Text */}
        <div className="flex-1">
          <h2
            className="font-bold tracking-tight mb-5 max-w-xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Building South India&rsquo;s EV charging network.
          </h2>
          <p
            className="max-w-lg"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            We are building a CCS2 fast-charging network at commercial venues across
            Telangana and Andhra Pradesh. Zero cost to hosts, reliable charging for drivers.
          </p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md text-sm font-medium transition-[border-color,background-color] duration-150 border border-[rgba(52,224,224,0.25)] text-[color:var(--cyan)] hover:border-[rgba(52,224,224,0.55)] hover:bg-[rgba(52,224,224,0.04)] focus-visible:outline-2 focus-visible:outline-[color:var(--cyan)] focus-visible:outline-offset-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            About ValEV
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>

      </div>
    </SectionWrapper>
  )
}
