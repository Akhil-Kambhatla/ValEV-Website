'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'

const STEPS = [
  {
    n: '01',
    title: 'You sign up',
    body: 'Tell us your location and parking capacity — takes a few minutes.',
  },
  {
    n: '02',
    title: 'We survey and install',
    body: 'Our team assesses the site and installs the charger at zero cost to you.',
  },
  {
    n: '03',
    title: 'Drivers find you',
    body: 'Your location goes live on the ValEV network and drivers start charging there.',
  },
  {
    n: '04',
    title: 'You earn, we manage',
    body: 'Every session earns a payout. We handle uptime, support, and maintenance.',
  },
]

export function HowItWorks() {
  const connectorRef = useRef<HTMLDivElement>(null)
  const inView       = useInView(connectorRef, { once: true, amount: 0.5 })

  return (
    <SectionWrapper bg="s4" id="network" ambientGlow="rgba(52,224,224,0.02)">
      <div className="max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="type-eyebrow mb-6">How It Works</p>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            What happens after you sign up.
          </h2>
        </div>

        {/* Steps + connector */}
        <div className="relative">

          {/* Connector track (desktop only) — behind step circles */}
          <div
            className="hidden md:block absolute h-px"
            style={{
              top:        '2rem',
              left:       '12.5%',
              right:      '12.5%',
              background: 'rgba(52,224,224,0.07)',
            }}
          />

          {/* Connector fill — amber→cyan, charges left-to-right on scroll */}
          <motion.div
            ref={connectorRef}
            className="hidden md:block absolute h-px"
            style={{
              top:             '2rem',
              left:            '12.5%',
              right:           '12.5%',
              background:      'linear-gradient(to right, var(--amber), var(--cyan))',
              transformOrigin: '0% 50%',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 1.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col items-center text-center gap-5 md:gap-6"
              >
                {/* Circle */}
                <div
                  className="relative z-10 flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width:           '4rem',
                    height:          '4rem',
                    backgroundColor: 'var(--bg-s4)',
                    border:          '1px solid rgba(52,224,224,0.15)',
                  }}
                >
                  <span
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '1.125rem',
                      fontWeight:    700,
                      color:         'var(--cyan)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {step.n}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <p
                    className="mb-2"
                    style={{
                      fontFamily:  'var(--font-body)',
                      fontSize:    'var(--text-body)',
                      fontWeight:  600,
                      color:       'var(--silver-hi)',
                      lineHeight:  'var(--leading-snug)',
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color:      'var(--silver-mid)',
                      lineHeight: 'var(--leading-normal)',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
