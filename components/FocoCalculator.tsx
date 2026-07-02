'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { FOCO_CALC, CONTACT } from '@/lib/constants'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function formatInr(n: number): string {
  if (n >= 10_000_000) {
    const crore = n / 10_000_000
    const s = crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2).replace(/\.?0+$/, '')
    return `₹${s} crore`
  }
  if (n >= 100_000) {
    const lakh = n / 100_000
    const s = lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2).replace(/\.?0+$/, '')
    return `₹${s} lakh`
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

const TYPES = FOCO_CALC.machineTypes

const cardBase: React.CSSProperties = {
  borderRadius:    '12px',
  border:          '1px solid rgba(52,224,224,0.10)',
  backgroundColor: 'rgba(7,8,10,0.60)',
  padding:         'clamp(20px, 3vw, 28px)',
}

function ChipButton({
  active, onClick, children,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily:      'var(--font-mono)',
        fontSize:        '0.8125rem',
        fontWeight:      600,
        padding:         '0.5rem 1.125rem',
        borderRadius:    '6px',
        border:          active ? '1px solid rgba(52,224,224,0.50)' : '1px solid rgba(52,224,224,0.12)',
        backgroundColor: active ? 'rgba(52,224,224,0.10)'           : 'rgba(52,224,224,0.02)',
        color:           active ? 'var(--cyan)'                      : 'var(--silver-mid)',
        cursor:          'pointer',
        transition:      'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
      }}
    >
      {children}
    </button>
  )
}

export function FocoCalculator() {
  const reduced = useReducedMotion()
  const [typeIdx, setTypeIdx] = useState(0)
  const [count,   setCount]   = useState(1)

  const machine        = TYPES[typeIdx]
  const { costs }      = machine
  const perMachine     = costs.machine + costs.transformer + costs.civil + costs.software + costs.other
  const totalSetup     = perMachine * count
  const totalDailyUnits = machine.avgUnitsPerDay * count
  const annualEarnings = totalDailyUnits * 365 * FOCO_CALC.netProfitPerUnit
  const paybackYears   = annualEarnings > 0 ? totalSetup / annualEarnings : 0

  const waMessage = encodeURIComponent(
    `Hi ValEV, I'm interested in the FOCO model — ${count} × ${machine.kw} kW machine${count > 1 ? 's' : ''}. Please share a detailed estimate.`
  )
  const waUrl = `${CONTACT.whatsappUrl}?text=${waMessage}`

  const breakdown = [
    { label: 'Machine cost',             value: costs.machine },
    { label: 'Transformer / power',      value: costs.transformer },
    { label: 'Civil works',              value: costs.civil },
    { label: 'Software & commissioning', value: costs.software },
    { label: 'Other / contingency',      value: costs.other },
  ]

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Eyebrow */}
      <p style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         'var(--silver-lo)',
        marginBottom:  '0.75rem',
      }}>
        FOCO Setup Cost + Return Estimator
      </p>
      <p style={{
        fontFamily:   'var(--font-body)',
        fontSize:     'var(--text-body-sm, 0.8125rem)',
        color:        'var(--silver-mid)',
        lineHeight:   'var(--leading-relaxed)',
        maxWidth:     '58ch',
        marginBottom: '2rem',
      }}>
        Select a machine type and quantity to see an indicative setup cost and return view. Actual shared-infrastructure costs vary by site — this uses simple per-machine multiplication.
      </p>

      {/* Selectors */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap:                 '1.5rem',
        marginBottom:        '2rem',
      }}>
        {/* Machine type */}
        <div>
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '0.8125rem',
            color:        'var(--silver-mid)',
            marginBottom: '0.75rem',
          }}>
            Machine type
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {TYPES.map((m, i) => (
              <ChipButton key={m.kw} active={typeIdx === i} onClick={() => setTypeIdx(i)}>
                {m.label}
              </ChipButton>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '0.8125rem',
            color:        'var(--silver-mid)',
            marginBottom: '0.75rem',
          }}>
            Number of machines
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[1, 2, 3].map(n => (
              <ChipButton key={n} active={count === n} onClick={() => setCount(n)}>
                {n}
              </ChipButton>
            ))}
          </div>
          <p style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '0.7rem',
            color:       'var(--silver-lo)',
            marginTop:   '0.625rem',
            lineHeight:  'var(--leading-relaxed)',
          }}>
            For larger deployments, contact us for a detailed estimate.
          </p>
        </div>
      </div>

      {/* Result cards */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap:                 '1rem',
        marginBottom:        '1.5rem',
      }}>
        {/* Setup cost + breakdown */}
        <div style={cardBase}>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--silver-lo)',
            marginBottom:  '0.75rem',
          }}>
            Estimated setup cost
          </p>
          <p style={{
            fontFamily:   'var(--font-mono)',
            fontSize:     'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight:   700,
            color:        'var(--silver-hi)',
            lineHeight:   1.1,
            marginBottom: '1.25rem',
          }}>
            {formatInr(totalSetup)}
          </p>

          {/* Per-machine breakdown */}
          <div style={{ borderTop: '1px solid rgba(52,224,224,0.07)', paddingTop: '0.875rem' }}>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'var(--silver-lo)',
              marginBottom:  '0.625rem',
            }}>
              Breakdown ({count === 1 ? '1 machine' : `${count} machines`})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {breakdown.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--silver-lo)' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--silver-mid)', flexShrink: 0 }}>
                    {formatInr(value * count)}
                  </span>
                </div>
              ))}
              <div style={{
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'baseline',
                gap:            '0.5rem',
                borderTop:      '1px solid rgba(52,224,224,0.07)',
                paddingTop:     '0.45rem',
                marginTop:      '0.25rem',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--silver-mid)', fontWeight: 600 }}>
                  Total
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', fontWeight: 700, flexShrink: 0 }}>
                  {formatInr(totalSetup)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings + payback */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Annual earnings */}
          <div style={{
            ...cardBase,
            border:     '1px solid rgba(52,224,224,0.18)',
            background: 'linear-gradient(135deg, rgba(52,224,224,0.06) 0%, transparent 60%)',
          }}>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--silver-lo)',
              marginBottom:  '0.75rem',
            }}>
              Estimated annual earnings
            </p>
            <p style={{
              fontFamily:   'var(--font-mono)',
              fontSize:     'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight:   700,
              color:        'var(--cyan)',
              lineHeight:   1.1,
              marginBottom: '0.5rem',
            }}>
              {formatInr(annualEarnings)}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--silver-lo)', lineHeight: 'var(--leading-relaxed)' }}>
              {totalDailyUnits.toLocaleString('en-IN')} kWh/day &times; 365 &times; &#8377;{FOCO_CALC.netProfitPerUnit}/unit net profit
            </p>
          </div>

          {/* Payback */}
          <div style={cardBase}>
            <p style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'var(--silver-lo)',
              marginBottom:  '0.75rem',
            }}>
              Indicative payback period
            </p>
            <p style={{
              fontFamily:   'var(--font-mono)',
              fontSize:     'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight:   700,
              color:        'var(--silver-hi)',
              lineHeight:   1.1,
              marginBottom: '0.5rem',
            }}>
              {paybackYears.toFixed(1)}{' '}
              <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--silver-lo)' }}>years</span>
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--silver-lo)', lineHeight: 'var(--leading-relaxed)' }}>
              Annual earnings vs. total setup cost
            </p>
          </div>
        </div>
      </div>

      {/* Amber disclaimer */}
      <div style={{
        padding:         '12px 16px',
        borderRadius:    '8px',
        backgroundColor: 'rgba(200,160,60,0.05)',
        border:          '1px solid rgba(200,160,60,0.14)',
        marginBottom:    '1.75rem',
      }}>
        <p style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '0.7rem',
          color:       'rgba(200,160,60,0.80)',
          lineHeight:  'var(--leading-relaxed)',
          margin:      0,
        }}>
          {FOCO_CALC.disclaimer} Net profit assumed at &#8377;{FOCO_CALC.netProfitPerUnit}/kWh; daily unit average for a {machine.kw}&nbsp;kW machine assumed at {machine.avgUnitsPerDay}&nbsp;kWh/day. All figures are placeholders.
        </p>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display:         'inline-flex',
          alignItems:      'center',
          gap:             '0.5rem',
          fontFamily:      'var(--font-body)',
          fontSize:        'var(--text-body)',
          fontWeight:      600,
          backgroundColor: 'var(--cyan)',
          color:           'var(--bg-hero)',
          borderRadius:    '8px',
          padding:         '14px 28px',
          textDecoration:  'none',
          transition:      'box-shadow 200ms ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(52,224,224,0.32)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
      >
        <MessageCircle size={18} aria-hidden />
        Talk to us on WhatsApp
      </a>
      <p style={{
        fontFamily:  'var(--font-body)',
        fontSize:    '0.7rem',
        color:       'var(--silver-lo)',
        marginTop:   '0.75rem',
        lineHeight:  'var(--leading-relaxed)',
      }}>
        Opens WhatsApp with your selection pre-filled: {count} &times; {machine.kw}&nbsp;kW.
      </p>
    </motion.div>
  )
}
