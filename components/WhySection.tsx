'use client'

import { useState } from 'react'
import { Building2, TrendingUp, Users, Settings2, Activity, Leaf } from 'lucide-react'
import { SectionWrapper } from './SectionWrapper'
import { SectionAmbient } from './SectionAmbient'

const CARDS = [
  {
    Icon: Building2,
    label: 'No upfront cost',
    body: 'ValEV covers all equipment and installation costs. Hosts provide the parking space.',
  },
  {
    Icon: TrendingUp,
    label: 'Revenue per session',
    body: 'Hosts earn on every unit of electricity dispensed. Payouts are automatic.',
  },
  {
    Icon: Users,
    label: 'Extended dwell time',
    body: 'EV drivers typically wait on-site while their car charges. For restaurants and retail, this extends the visit.',
  },
  {
    Icon: Settings2,
    label: 'Operated by ValEV',
    body: 'ValEV handles monitoring, maintenance, and all driver support remotely.',
  },
  {
    Icon: Activity,
    label: 'Host dashboard',
    body: 'A host portal shows session history, earnings, and charger status in real time.',
  },
  {
    Icon: Leaf,
    label: 'Clean energy use',
    body: 'Each unit of electricity dispensed replaces a petrol trip. Hosts can display a ValEV badge at their venue.',
  },
]

export function WhySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <SectionWrapper
      bg="s2"
      id="why"
      ambientGlow="rgba(52,224,224,0.03)"
      ambientLayer={<SectionAmbient intensity={1} />}
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="type-eyebrow mb-4">Why ValEV</p>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            How a host arrangement works.
          </h2>
          <p
            className="mt-4 max-w-lg mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            ValEV installs and runs the charger. You provide the space. Here is what the
            arrangement looks like in practice.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) => {
            const hovered = hoveredIdx === i
            return (
              <div
                key={card.label}
                className="rounded-xl p-6 flex flex-col gap-4 cursor-default"
                style={{
                  backgroundColor: 'var(--card-s2)',
                  border:          `1px solid ${hovered ? 'rgba(52,224,224,0.18)' : 'var(--border-cyan)'}`,
                  transition:      'border-color 0.2s',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <card.Icon
                  size={22}
                  aria-hidden
                  style={{
                    color:      hovered ? 'var(--cyan)' : 'var(--silver-lo)',
                    transition: 'color 0.2s',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.8125rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color:         'var(--silver-hi)',
                      lineHeight:    1.3,
                      marginBottom:  '0.5rem',
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--silver-mid)' }}
                  >
                    {card.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
