'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper } from './SectionWrapper'
import { ESTIMATOR } from '@/lib/constants'

const DAILY = ESTIMATOR.defaultCarsPerDay * ESTIMATOR.defaultUnitsPerCar * ESTIMATOR.hostPayoutPerUnit
const MONTHLY = Math.round(DAILY * 30)

const METRICS = [
  {
    value: `${ESTIMATOR.defaultCarsPerDay}+`,
    label: 'cars per day',
    note:  'illustrative traffic at a busy site',
  },
  {
    value: `~${ESTIMATOR.defaultUnitsPerCar}`,
    label: 'kWh per session',
    note:  'typical fast-charge fill',
  },
  {
    value: `₹${ESTIMATOR.hostPayoutPerUnit.toFixed(1)}`,
    label: 'per kWh, your share',
    note:  'illustrative rate',
  },
]

export function WhatHostsEarn() {
  const barRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(barRef, { once: true, amount: 0.6 })

  return (
    <SectionWrapper bg="s5" id="stations" ambientGlow="rgba(52,224,224,0.018)">
      <div className="max-w-4xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="type-eyebrow mb-6">What Hosts Earn</p>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize:   'var(--text-section-h)',
              color:      'var(--silver-hi)',
              lineHeight: 'var(--leading-snug)',
            }}
          >
            How host revenue works.
          </h2>
          <p
            className="mt-5 max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body-lg)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Hosts provide unused parking. ValEV installs and operates the charger at zero cost.
            On every unit of electricity dispensed, a share of the revenue is paid out to
            the host automatically.
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-body)',
              color:      'var(--silver-mid)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            EV drivers spend time on-site while their car charges. For venues with
            food, retail, or services, this often means additional customer activity.
          </p>
        </div>

        {/* Illustrative example */}
        <div
          className="rounded-2xl p-8 md:p-10 card-border"
          style={{ backgroundColor: 'var(--card-s5)' }}
        >
          <p className="type-eyebrow mb-8 text-center">Illustrative example</p>

          {/* Metric tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {METRICS.map(({ value, label, note }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2 rounded-xl py-6 px-4"
                style={{
                  backgroundColor: 'var(--card-s4)',
                  border:          '1px solid var(--border-cyan)',
                }}
              >
                <span
                  style={{
                    fontFamily:  'var(--font-mono)',
                    fontSize:    '2rem',
                    fontWeight:  700,
                    color:       'var(--silver-hi)',
                    lineHeight:  1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         'var(--silver-lo)',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '0.7rem',
                    color:      'var(--silver-lo)',
                    lineHeight: 1.4,
                  }}
                >
                  {note}
                </span>
              </div>
            ))}
          </div>

          {/* Amber charge bar */}
          <div className="mb-3">
            <div
              ref={barRef}
              className="rounded-full overflow-hidden"
              style={{ height: '6px', background: 'rgba(255,178,62,0.1)' }}
            >
              <motion.div
                style={{
                  height:          '100%',
                  width:           '68%',
                  background:      'linear-gradient(to right, var(--amber), rgba(255,178,62,0.5))',
                  borderRadius:    '9999px',
                  transformOrigin: '0% 50%',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6"
            style={{ borderTop: '1px solid var(--border-cyan)' }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.6875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:      'var(--silver-lo)',
                  marginBottom: '0.25rem',
                }}
              >
                Illustrative monthly earnings
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '1.75rem',
                  fontWeight: 700,
                  color:      'var(--silver-hi)',
                  lineHeight: 1,
                }}
              >
                ₹{MONTHLY.toLocaleString('en-IN')}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize:   '0.875rem',
                    fontWeight: 400,
                    color:      'var(--silver-lo)',
                    marginLeft: '0.5rem',
                  }}
                >
                  / month
                </span>
              </p>
            </div>

            <p
              className="text-center sm:text-right max-w-xs"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.75rem',
                color:      'var(--silver-lo)',
                lineHeight: 1.5,
              }}
            >
              Illustrative estimate based on assumed traffic and payout rate.
              Actual earnings depend on location, utilisation, and prevailing tariffs.
              Not a guarantee.
            </p>
          </div>
        </div>

      </div>
    </SectionWrapper>
  )
}
