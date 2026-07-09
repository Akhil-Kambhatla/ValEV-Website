'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { HOST_EARNINGS_CALC, CONTACT } from '@/lib/constants'
import { AnimatedNumber } from './AnimatedNumber'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function formatInr(n: number): string {
  if (n >= 100000) {
    const lakhs = n / 100000
    const formatted = lakhs.toFixed(2).replace(/\.?0+$/, '')
    return `₹${formatted} lakh`
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

function SliderField({
  id, label, value, min, max, step = 1, unit, onChange, onDragStateChange,
}: {
  id: string; label: string; value: number; min: number; max: number
  step?: number; unit: string; onChange: (v: number) => void
  onDragStateChange?: (dragging: boolean) => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
        <label htmlFor={id} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-mid)' }}>
          {label}
        </label>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--cyan)', fontWeight: 600 }}>
          {value.toLocaleString('en-IN')} {unit}
        </span>
      </div>
      <input
        id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        onPointerDown={() => onDragStateChange?.(true)}
        onPointerUp={() => onDragStateChange?.(false)}
        onPointerCancel={() => onDragStateChange?.(false)}
        aria-valuemin={min} aria-valuemax={max} aria-valuenow={value}
        style={{ width: '100%', accentColor: 'var(--cyan)', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--silver-lo)', marginTop: '0.25rem' }}>
        <span>{min.toLocaleString('en-IN')}</span><span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  )
}

function NumberField({
  id, label, value, min, max, step = 0.25, prefix, suffix, onChange,
}: {
  id: string; label: string; value: number; min: number; max: number
  step?: number; prefix?: string; suffix?: string; onChange: (v: number) => void
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-mid)', marginBottom: '0.4rem' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        {prefix && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--silver-lo)' }}>{prefix}</span>
        )}
        <input
          id={id} type="number" min={min} max={max} step={step} value={value}
          onChange={e => { const n = Number(e.target.value); if (!isNaN(n) && n >= min && n <= max) onChange(n) }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--silver-hi)',
            backgroundColor: 'rgba(52,224,224,0.04)', border: '1px solid rgba(52,224,224,0.14)',
            borderRadius: '6px', padding: '6px 10px', width: '90px', outline: 'none',
          }}
          onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(52,224,224,0.4)' }}
          onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(52,224,224,0.14)' }}
        />
        {suffix && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-lo)' }}>{suffix}</span>
        )}
      </div>
    </div>
  )
}

const SCENARIOS = [
  { label: 'Conservative', cars: 10, units: 25 },
  { label: 'Typical',      cars: 20, units: 30 },
  { label: 'Active',       cars: 35, units: 35 },
]

export function HostEarningsCalculator() {
  const reduced = useReducedMotion()

  const [carsPerDay,    setCarsPerDay]    = useState<number>(HOST_EARNINGS_CALC.defaultCarsPerDay)
  const [unitsPerCar,   setUnitsPerCar]   = useState<number>(HOST_EARNINGS_CALC.defaultUnitsPerCar)
  const [payoutPerUnit, setPayoutPerUnit] = useState<number>(HOST_EARNINGS_CALC.defaultPayoutPerUnit)
  const [isDraggingSlider, setIsDraggingSlider] = useState(false)

  const unitsPerDay      = carsPerDay * unitsPerCar
  const earningsPerDay   = unitsPerDay * payoutPerUnit
  const earningsPerMonth = earningsPerDay * 30
  const earningsPerYear  = earningsPerDay * 365

  const waMessage = encodeURIComponent(
    `Hi ValEV, I'm interested in hosting a station. Based on your calculator my estimated monthly earning is approximately ${formatInr(earningsPerMonth)}.`
  )
  const waUrl = `${CONTACT.whatsappUrl}?text=${waMessage}`

  const cardBase: React.CSSProperties = {
    borderRadius: '12px',
    border: '1px solid rgba(52,224,224,0.08)',
    backgroundColor: '#0F1117',
    padding: 'clamp(20px, 3vw, 32px)',
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* ── Inputs ── */}
      <div style={{ ...cardBase, marginBottom: '1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SliderField
              id="cars-per-day"
              label="EV cars charging per day"
              value={carsPerDay}
              min={1} max={60}
              unit="cars/day"
              onChange={setCarsPerDay}
              onDragStateChange={setIsDraggingSlider}
            />
            <SliderField
              id="units-per-car"
              label="Average units per session"
              value={unitsPerCar}
              min={5} max={80}
              unit="kWh"
              onChange={setUnitsPerCar}
              onDragStateChange={setIsDraggingSlider}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <NumberField
              id="payout-per-unit"
              label="Host payout rate"
              value={payoutPerUnit}
              min={0.5} max={5} step={0.25}
              prefix="₹"
              suffix="per kWh"
              onChange={setPayoutPerUnit}
            />
            <div style={{
              backgroundColor: 'rgba(52,224,224,0.04)',
              border: '1px solid rgba(52,224,224,0.10)',
              borderRadius: '8px',
              padding: '14px 16px',
            }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-mid)', lineHeight: 'var(--leading-relaxed)' }}>
                ValEV covers equipment, installation, and operations at no cost to you. Your payout is essentially net earning: you invest nothing to earn from every unit charged at your location.
              </p>
            </div>
          </div>
        </div>

        {/* Day / Month / Year + units row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1px',
          backgroundColor: 'rgba(52,224,224,0.08)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          {([
            { period: 'Units / day',  value: unitsPerDay,      format: (n: number) => `${Math.round(n).toLocaleString('en-IN')} kWh`, isCyan: false },
            { period: 'Per day',      value: earningsPerDay,   format: formatInr, isCyan: false },
            { period: 'Per month',    value: earningsPerMonth, format: formatInr, isCyan: false },
            { period: 'Per year',     value: earningsPerYear,  format: formatInr, isCyan: false },
          ] as const).map(({ period, value, format, isCyan }) => (
            <div key={period} style={{ backgroundColor: '#0F1117', padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--silver-lo)', marginBottom: '0.75rem' }}>
                {period}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, color: isCyan ? 'var(--cyan)' : 'var(--silver-hi)', lineHeight: 1.1 }}>
                <AnimatedNumber value={value} format={format} instant={isDraggingSlider} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Annual highlight ── */}
      <div style={{
        ...cardBase,
        border: '1px solid rgba(52,224,224,0.22)',
        background: 'linear-gradient(135deg, rgba(52,224,224,0.06) 0%, transparent 60%)',
        textAlign: 'center',
        padding: 'clamp(24px, 4vw, 44px)',
        marginBottom: '1.5rem',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--silver-lo)', marginBottom: '0.75rem' }}>
          Estimated annual earning
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, color: 'var(--cyan)', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          <AnimatedNumber value={earningsPerYear} format={formatInr} instant={isDraggingSlider} />
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-mid)' }}>
          Net earning: no equipment cost, no installation cost, no franchise fee.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--silver-lo)', marginTop: '1rem', maxWidth: '56ch', marginInline: 'auto', lineHeight: 'var(--leading-relaxed)' }}>
          This is {HOST_EARNINGS_CALC.disclaimer}
        </p>
      </div>

      {/* ── Indicative scenarios ── */}
      <div style={{ ...cardBase, marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--silver-lo)', marginBottom: '1.25rem' }}>
          Indicative scenarios at ₹{payoutPerUnit.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}/kWh payout
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          backgroundColor: 'rgba(52,224,224,0.08)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {SCENARIOS.map(({ label, cars, units }) => {
            const monthly = cars * units * payoutPerUnit * 30
            const annual  = monthly * 12
            const isTypical = label === 'Typical'
            return (
              <div key={label} style={{
                backgroundColor: isTypical ? 'rgba(52,224,224,0.04)' : '#0F1117',
                padding: 'clamp(12px, 2vw, 20px)',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: isTypical ? 'var(--cyan)' : 'var(--silver-lo)', marginBottom: '0.5rem' }}>
                  {label}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--silver-lo)', marginBottom: '0.75rem' }}>
                  {cars} cars · {units} kWh
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', fontWeight: 700, color: isTypical ? 'var(--cyan)' : 'var(--silver-hi)', marginBottom: '0.25rem' }}>
                  <AnimatedNumber value={monthly} format={formatInr} /><span style={{ fontWeight: 400, fontSize: '0.75em', color: 'var(--silver-lo)' }}>/mo</span>
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--silver-lo)' }}>
                  <AnimatedNumber value={annual} format={formatInr} />/yr
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── WhatsApp CTA ── */}
      <div style={{ textAlign: 'center' }}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body)',
            fontWeight: 600,
            backgroundColor: 'var(--cyan)',
            color: 'var(--bg-hero)',
            borderRadius: '8px',
            padding: '14px 28px',
            textDecoration: 'none',
            transition: 'box-shadow 200ms ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(52,224,224,0.32)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
        >
          <MessageCircle size={18} aria-hidden />
          Talk to us on WhatsApp
        </a>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--silver-lo)', marginTop: '0.75rem', lineHeight: 'var(--leading-relaxed)' }}>
          Opens WhatsApp with your estimated monthly earning ({formatInr(earningsPerMonth)}) pre-filled.
        </p>
      </div>
    </motion.div>
  )
}
