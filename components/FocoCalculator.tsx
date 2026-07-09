'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { FOCO_CALC, CONTACT } from '@/lib/constants'
import { AnimatedNumber } from './AnimatedNumber'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

type SlotKw = 120 | 180 | 240

const MACHINES = FOCO_CALC.machines as readonly { kw: number; priceRs: number; consumptionKw: number; dailyUnits: number }[]
const TRANSFORMERS = FOCO_CALC.transformers as readonly { kva: number; priceRs: number }[]
const CIVIL = FOCO_CALC.civilByCount as readonly number[]

function machineByKw(kw: SlotKw) {
  return MACHINES.find(m => m.kw === kw)!
}

function pickTransformer(totalConsumption: number) {
  return TRANSFORMERS.find(t => totalConsumption < t.kva * 0.9) ?? TRANSFORMERS[TRANSFORMERS.length - 1]
}

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

function formatPayback(years: number): string {
  const months = Math.round(years * 12)
  if (months < 24) return `approximately ${months} month${months === 1 ? '' : 's'}`
  return `about ${years.toFixed(1)} years`
}

const cardBase: React.CSSProperties = {
  borderRadius:    '12px',
  border:          '1px solid rgba(52,224,224,0.10)',
  backgroundColor: 'rgba(7,8,10,0.60)',
  padding:         'clamp(20px, 3vw, 28px)',
}

function SlotSelect({
  label,
  value,
  onChange,
  required,
  disabled,
}: {
  label: string
  value: SlotKw | null
  onChange: (v: SlotKw | null) => void
  required?: boolean
  disabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: disabled ? 0.38 : 1, transition: 'opacity 0.15s ease' }}>
      <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--silver-mid)', cursor: disabled ? 'not-allowed' : 'default' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          disabled={disabled}
          value={value === null ? '' : String(value)}
          onChange={e => {
            const v = e.target.value
            onChange(v === '' ? null : Number(v) as SlotKw)
          }}
          style={{
            fontFamily:      'var(--font-mono)',
            fontSize:        '0.8125rem',
            fontWeight:      600,
            padding:         '0.625rem 2rem 0.625rem 0.875rem',
            borderRadius:    '6px',
            border:          '1px solid rgba(52,224,224,0.22)',
            backgroundColor: 'rgba(7,8,10,0.80)',
            color:           value === null ? 'var(--silver-lo)' : 'var(--silver-hi)',
            cursor:          disabled ? 'not-allowed' : 'pointer',
            width:           '100%',
            appearance:      'none',
            outline:         'none',
          }}
        >
          {!required && <option value="">None</option>}
          {MACHINES.map(m => (
            <option key={m.kw} value={String(m.kw)}>{m.kw} kW</option>
          ))}
        </select>
        <svg
          aria-hidden
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--silver-lo)' }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export function FocoCalculator() {
  const reduced = useReducedMotion()
  const [slot1, setSlot1] = useState<SlotKw>(120)
  const [slot2, setSlot2] = useState<SlotKw | null>(null)
  const [slot3, setSlot3] = useState<SlotKw | null>(null)

  function handleSlot2(v: SlotKw | null) {
    setSlot2(v)
    if (v === null) setSlot3(null)
  }

  const slots = ([slot1, slot2, slot3] as (SlotKw | null)[]).filter((s): s is SlotKw => s !== null)
  const machineCount = slots.length

  const totalMachinePrice = slots.reduce((sum, kw) => sum + machineByKw(kw).priceRs, 0)
  const totalConsumption  = slots.reduce((sum, kw) => sum + machineByKw(kw).consumptionKw, 0)

  // Units rule: 1 machine = that machine's units; 2-3 machines = lowest daily units × count
  const minDailyUnits   = Math.min(...slots.map(kw => machineByKw(kw).dailyUnits))
  const totalDailyUnits = machineCount === 1
    ? machineByKw(slots[0]).dailyUnits
    : minDailyUnits * machineCount

  const transformer    = pickTransformer(totalConsumption)
  const civil          = (CIVIL as number[])[machineCount - 1] ?? 800_000
  const totalSetup     = totalMachinePrice + transformer.priceRs + civil
                       + FOCO_CALC.canopyRs + FOCO_CALC.discomRs + FOCO_CALC.softwareFirstYear
  const annualEarnings = totalDailyUnits * 365 * FOCO_CALC.netProfitPerUnit
  const paybackYears   = totalSetup / annualEarnings

  const configStr = slots.map(kw => `1x${kw}`).join(' + ')
  const waMessage = encodeURIComponent(`Hi ValEV, I'm interested in the FOCO model with ${configStr} kW. Please share a detailed estimate.`)
  const waUrl     = `${CONTACT.whatsappUrl}?text=${waMessage}`

  const includedItems = [
    `Charging machine${machineCount > 1 ? 's' : ''} (${configStr} kW)`,
    `Transformer (${transformer.kva} kVA)`,
    'Civil works',
    'Canopy',
    'Discom charges',
    'Software (first year)',
  ]

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Three independent machine-slot dropdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '0.75rem' }}>
        <SlotSelect label="Machine 1" value={slot1} onChange={v => v && setSlot1(v)} required />
        <SlotSelect label="Machine 2" value={slot2} onChange={handleSlot2} />
        <SlotSelect label="Machine 3" value={slot3} onChange={setSlot3} disabled={slot2 === null} />
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--silver-lo)', lineHeight: 'var(--leading-relaxed)', marginBottom: '2rem' }}>
        For more than 3 machines, contact us for a detailed estimate.
      </p>

      {/* Result cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>

        {/* Setup cost card */}
        <div style={cardBase}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--silver-lo)', marginBottom: '0.75rem' }}>
            Total setup cost
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--silver-hi)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            <AnimatedNumber value={totalSetup} format={formatInr} />
          </p>

          <div style={{ borderTop: '1px solid rgba(52,224,224,0.07)', paddingTop: '0.875rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--silver-lo)', marginBottom: '0.625rem' }}>
              Included
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {includedItems.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span aria-hidden style={{ color: 'var(--cyan)', flexShrink: 0, fontSize: '0.7rem', lineHeight: '1.5rem' }}>+</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--silver-mid)', lineHeight: '1.5rem' }}>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '0.875rem', padding: '0.5rem 0.75rem', borderRadius: '6px', backgroundColor: 'rgba(52,224,224,0.05)', border: '1px solid rgba(52,224,224,0.12)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)', margin: 0 }}>
                Requires a {transformer.kva} kVA transformer
              </p>
            </div>
          </div>
        </div>

        {/* Earnings + payback */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ ...cardBase, border: '1px solid rgba(52,224,224,0.18)', background: 'linear-gradient(135deg, rgba(52,224,224,0.06) 0%, transparent 60%)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--silver-lo)', marginBottom: '0.75rem' }}>
              Estimated annual earnings
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--cyan)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              <AnimatedNumber value={annualEarnings} format={formatInr} />
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--silver-lo)', lineHeight: 'var(--leading-relaxed)' }}>
              {totalDailyUnits.toLocaleString('en-IN')} kWh/day &times; 365 &times; &#8377;{FOCO_CALC.netProfitPerUnit}/unit net profit
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--silver-lo)', lineHeight: 'var(--leading-relaxed)', marginTop: '0.4rem', opacity: 0.75 }}>
              &#8377;{FOCO_CALC.netProfitPerUnit}/unit is an indicative figure for illustration. Actual net profit depends on tariff, utilisation, and operating costs.
            </p>
          </div>

          <div style={cardBase}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--silver-lo)', marginBottom: '0.75rem' }}>
              Indicative payback
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', fontWeight: 700, color: 'var(--silver-hi)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              <AnimatedNumber value={paybackYears} format={formatPayback} />
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--silver-lo)', lineHeight: 'var(--leading-relaxed)' }}>
              Setup cost vs. annual earnings
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', fontWeight: 600, backgroundColor: 'var(--cyan)', color: 'var(--bg-hero)', borderRadius: '8px', padding: '14px 28px', textDecoration: 'none', transition: 'box-shadow 200ms ease' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(52,224,224,0.32)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
      >
        <MessageCircle size={18} aria-hidden />
        Talk to us on WhatsApp
      </a>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--silver-lo)', marginTop: '0.75rem', lineHeight: 'var(--leading-relaxed)' }}>
        Opens WhatsApp with your configuration ({configStr} kW) pre-filled.
      </p>
    </motion.div>
  )
}
