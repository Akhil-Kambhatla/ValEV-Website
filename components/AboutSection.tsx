'use client'

import Link from 'next/link'
import { SectionWrapper } from './SectionWrapper'
import { IndiaMapBackdrop } from './IndiaMapBackdrop'

// ── Mission: numbered facts ───────────────────────────────────────────────────
const FACTS = [
  {
    n:    '01',
    text: 'ValEV installs and operates DC fast charging stations at commercial venues across South India.',
  },
  {
    n:    '02',
    text: "We are building the region's dedicated fast-charging network, starting in Telangana and Andhra Pradesh.",
  },
  {
    n:    '03',
    text: 'Hosts provide a parking space. ValEV covers all equipment, installation, and operating costs at zero charge to the host.',
  },
  {
    n:    '04',
    text: 'EV drivers access reliable CCS2 fast charging at everyday destinations — restaurants, offices, and apartment complexes.',
  },
]

// ── Why EV, Why Now: directional stat cards ───────────────────────────────────
const EV_POINTS = [
  {
    figure: '30%',
    label:  'EV sales target by 2030',
    desc:   "India's national policy sets a 30% EV sales share target across vehicle segments by 2030, backed by FAME incentives and state-level mandates.",
  },
  {
    figure: '~1/3',
    label:  'per-km cost vs. petrol',
    desc:   'Charging an EV costs roughly a third of the per-kilometre fuel expense of an equivalent petrol vehicle at current electricity tariffs.',
  },
  {
    figure: '2x+',
    label:  'EV sales growth, year-on-year',
    desc:   'Passenger and two-wheeler EV registrations in India have grown sharply each consecutive year, with two-wheelers leading the volume surge.',
  },
  {
    figure: '#1',
    label:  'barrier to adoption',
    desc:   'Range anxiety from sparse fast-charging coverage is consistently the most cited reason prospective EV buyers hold back. That is the gap ValEV fills.',
  },
]

// ── Why South India: three points ────────────────────────────────────────────
const SOUTH_POINTS = [
  {
    heading: 'Growing adoption',
    body: 'Telangana and Andhra Pradesh are among India\'s fastest-growing EV markets, driven by strong state-level incentives and rising two-wheeler and passenger EV sales.',
  },
  {
    heading: 'Key corridors underserved',
    body: 'Major inter-city routes — including Hyderabad to Vijayawada and Tirupati — lack reliable fast-charging options, leaving a gap ValEV is positioned to address first.',
  },
  {
    heading: 'Supportive policy environment',
    body: 'Both states have active EV policies covering purchase subsidies, infrastructure mandates, and registration incentives that align with ValEV\'s early deployment timeline.',
  },
]

// ── What We're Building: audience cards ──────────────────────────────────────
const AUDIENCES = [
  {
    eyebrow: 'EV Drivers',
    heading: 'Charge where you already stop.',
    desc:    'Reliable CCS2 fast chargers at restaurants, offices, and apartment complexes — so you top up during a meal or a meeting, not at a standalone station out of your way.',
    href:    '/technology',
    cta:     'Our technology',
  },
  {
    eyebrow: 'Property Hosts',
    heading: 'Earn from your parking space.',
    desc:    'ValEV installs and operates at zero cost to you. You provide the space; we cover all equipment, maintenance, and driver support — and share the revenue on every session.',
    href:    '/partner/host',
    cta:     'Become a host',
  },
  {
    eyebrow: 'Fleet Operators',
    heading: 'Charging built around your schedule.',
    desc:    'Dedicated support for commercial fleets: session tracking, priority access, and infrastructure designed around regular, high-utilisation needs.',
    href:    '/partner/fleet',
    cta:     'Fleet solutions',
  },
]

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const heroPad = standalone
    ? 'max-w-5xl mx-auto px-6 pt-40 pb-24 md:pt-48 md:pb-32'
    : 'max-w-5xl mx-auto px-6 py-24 md:py-32'

  return (
    <>
      {/* ── 1. Mission / Who We Are ────────────────────────────────────────── */}
      <SectionWrapper
        bg="s3"
        id="about"
        ambientGlow="rgba(52,224,224,0.02)"
        ambientLayer={<IndiaMapBackdrop />}
        noReveal={standalone}
      >
        <div className={heroPad}>

          {/* Pre-launch badge */}
          <p
            className="mb-8"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6875rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color:         'var(--cyan)',
              opacity:       0.75,
            }}
          >
            Pre-launch &mdash; first station confirmed, operations beginning 2026
          </p>

          {/* Page heading */}
          <div className="mb-8 md:mb-10">
            <h1
              className="font-bold tracking-tight max-w-2xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'var(--text-section-h)',
                color:      'var(--silver-hi)',
                lineHeight: 'var(--leading-snug)',
              }}
            >
              Building South India&rsquo;s EV charging network.
            </h1>
          </div>

          {/* Mission paragraph */}
          <p
            className="max-w-xl mb-16 md:mb-20"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Our goal is to become one of South India&rsquo;s most relied-on EV fast-charging
            providers. Starting in Telangana and Andhra Pradesh, we are building the
            infrastructure that drivers and hosts can count on as the region&rsquo;s EV
            adoption grows.
          </p>

          {/* Numbered facts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {FACTS.map(({ n, text }) => (
              <div
                key={n}
                className="flex gap-6 py-7"
                style={{ borderTop: '1px solid rgba(52,224,224,0.06)' }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6875rem',
                    fontWeight:    700,
                    color:         'var(--cyan)',
                    letterSpacing: '0.1em',
                    opacity:       0.7,
                    flexShrink:    0,
                    paddingTop:    '0.18rem',
                  }}
                >
                  {n}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body-lg)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 2. Why EV, Why Now ─────────────────────────────────────────────── */}
      <SectionWrapper bg="s4" id="why-ev" ambientGlow="rgba(52,224,224,0.025)">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">

          <p className="type-eyebrow mb-6">Why EV, Why Now</p>

          <h2
            className="font-bold tracking-tight max-w-2xl mb-5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(1.75rem, 3.5vw, 2.5rem)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            The case for EV charging in India is clear.
          </h2>

          <p
            className="max-w-xl mb-14"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            EV adoption in India is accelerating — driven by economics, policy, and a
            generational shift in how people think about fuel. The gap that acceleration
            reveals is that charging infrastructure has not kept pace.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EV_POINTS.map(({ figure, label, desc }) => (
              <div
                key={label}
                className="rounded-xl p-6 md:p-8 flex flex-col gap-3"
                style={{
                  backgroundColor: 'var(--card-s4)',
                  border:          '1px solid var(--border-cyan)',
                }}
              >
                <p
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight:    700,
                    color:         'var(--cyan)',
                    lineHeight:    1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {figure}
                </p>
                <p
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color:         'var(--silver-hi)',
                    lineHeight:    1.3,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-sm)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 3. Why South India ─────────────────────────────────────────────── */}
      <SectionWrapper bg="s3" id="why-south-india" ambientGlow="rgba(52,224,224,0.02)">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">

          <p className="type-eyebrow mb-6">Why South India</p>

          <h2
            className="font-bold tracking-tight max-w-2xl mb-5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(1.75rem, 3.5vw, 2.5rem)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            Starting where the opportunity is most clear.
          </h2>

          <p
            className="max-w-2xl mb-12"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Telangana and Andhra Pradesh are among India&rsquo;s fastest-growing EV
            markets, yet fast-charging infrastructure in both states remains thin compared to
            western and northern metros. ValEV is building first here because the unmet need
            is greatest and the policy environment supports early deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {SOUTH_POINTS.map(({ heading, body }) => (
              <div
                key={heading}
                className="py-7 md:pr-10"
                style={{ borderTop: '1px solid rgba(52,224,224,0.08)' }}
              >
                <h3
                  className="mb-3"
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.8125rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color:         'var(--silver-hi)',
                    lineHeight:    1.3,
                  }}
                >
                  {heading}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── 4. What We're Building ─────────────────────────────────────────── */}
      <SectionWrapper bg="s4" id="what-were-building" ambientGlow="rgba(52,224,224,0.03)">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">

          <p className="type-eyebrow mb-6">What We&rsquo;re Building</p>

          <h2
            className="font-bold tracking-tight max-w-2xl mb-5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(1.75rem, 3.5vw, 2.5rem)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            One network, three audiences.
          </h2>

          <p
            className="max-w-xl mb-14"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            ValEV is designed from the ground up to serve drivers who need reliable charging,
            businesses that want to offer it, and fleets that depend on it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AUDIENCES.map(({ eyebrow, heading, desc, href, cta }) => (
              <div
                key={eyebrow}
                className="rounded-xl p-7 flex flex-col gap-4"
                style={{
                  backgroundColor: 'var(--card-s4)',
                  border:          '1px solid var(--border-cyan)',
                }}
              >
                <p
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6875rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--cyan)',
                    opacity:       0.8,
                  }}
                >
                  {eyebrow}
                </p>
                <h3
                  className="font-semibold"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '1.125rem',
                    color:      'var(--silver-hi)',
                    lineHeight: 'var(--leading-snug)',
                  }}
                >
                  {heading}
                </h3>
                <p
                  className="flex-1"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   'var(--text-body)',
                    color:      'var(--silver-mid)',
                    lineHeight: 'var(--leading-normal)',
                  }}
                >
                  {desc}
                </p>
                <Link
                  href={href}
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         'var(--cyan)',
                    textDecoration: 'none',
                    opacity:       0.85,
                  }}
                >
                  {cta} &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* Pre-launch footer note */}
          <p
            className="mt-16"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'var(--silver-lo)',
              opacity:       0.55,
            }}
          >
            Pre-launch &mdash; first station confirmed, operations beginning 2026
          </p>

        </div>
      </SectionWrapper>
    </>
  )
}
