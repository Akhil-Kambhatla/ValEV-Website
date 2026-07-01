'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SAVINGS_CALC } from '@/lib/constants'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function rupees(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

function SliderField({
  id, label, value, min, max, step = 1, unit, onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
        <label
          htmlFor={id}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-mid)' }}
        >
          {label}
        </label>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--cyan)', fontWeight: 600 }}>
          {value.toLocaleString('en-IN')} {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{ width: '100%', accentColor: 'var(--cyan)', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--silver-lo)', marginTop: '0.25rem' }}>
        <span>{min.toLocaleString('en-IN')}</span><span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  )
}

function NumberField({
  id, label, value, min, max, step = 1, prefix, suffix, onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--silver-mid)',
          marginBottom: '0.4rem',
        }}
      >
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        {prefix && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--silver-lo)' }}>
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => {
            const n = Number(e.target.value)
            if (!isNaN(n) && n >= min && n <= max) onChange(n)
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--silver-hi)',
            backgroundColor: 'rgba(52,224,224,0.04)',
            border: '1px solid rgba(52,224,224,0.14)',
            borderRadius: '6px',
            padding: '6px 10px',
            width: '90px',
            outline: 'none',
          }}
          onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(52,224,224,0.4)' }}
          onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(52,224,224,0.14)' }}
        />
        {suffix && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-lo)' }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export function SavingsCalculator() {
  const reduced = useReducedMotion()

  const [monthlyKm,    setMonthlyKm]    = useState<number>(SAVINGS_CALC.defaultMonthlyKm)
  const [mileage,      setMileage]      = useState<number>(SAVINGS_CALC.defaultPetrolMileage)
  const [petrolPrice,  setPetrolPrice]  = useState<number>(SAVINGS_CALC.defaultPetrolPrice)
  const [evEfficiency, setEvEfficiency] = useState<number>(SAVINGS_CALC.defaultEvEfficiency)
  const [chargingCost, setChargingCost] = useState<number>(SAVINGS_CALC.defaultChargingCost)

  const litresConsumed = monthlyKm / mileage
  const monthlyPetrol  = litresConsumed * petrolPrice
  const kWhConsumed    = monthlyKm / evEfficiency
  const monthlyEV      = kWhConsumed * chargingCost
  const monthlySavings = monthlyPetrol - monthlyEV
  const annualSavings  = monthlySavings * 12
  const co2Monthly     = litresConsumed * SAVINGS_CALC.co2PerLitrePetrol

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
      {/* ── Controls + comparison card ───────────────────────────── */}
      <div style={{ ...cardBase, marginBottom: '1.5rem' }}>
        {/* Input controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SliderField
              id="monthly-km"
              label="Monthly distance driven"
              value={monthlyKm}
              min={200}
              max={5000}
              step={50}
              unit="km"
              onChange={setMonthlyKm}
            />
            <SliderField
              id="petrol-mileage"
              label="Petrol car mileage"
              value={mileage}
              min={8}
              max={25}
              unit="km/L"
              onChange={setMileage}
            />
            <SliderField
              id="ev-efficiency"
              label="EV efficiency"
              value={evEfficiency}
              min={4}
              max={12}
              step={0.5}
              unit="km/kWh"
              onChange={setEvEfficiency}
            />
          </div>

          {/* Number inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <NumberField
              id="petrol-price"
              label="Petrol price"
              value={petrolPrice}
              min={50}
              max={200}
              prefix="₹"
              suffix="per litre"
              onChange={setPetrolPrice}
            />
            <NumberField
              id="charging-cost"
              label="EV charging cost"
              value={chargingCost}
              min={5}
              max={25}
              prefix="₹"
              suffix="per kWh"
              onChange={setChargingCost}
            />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--silver-lo)',
              lineHeight: 'var(--leading-relaxed)',
              marginTop: 'auto',
            }}>
              Defaults reflect a typical South Indian city commuter. Adjust to match your vehicle and local prices.
            </p>
          </div>
        </div>

        {/* Petrol vs EV side-by-side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          backgroundColor: 'rgba(52,224,224,0.08)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          {/* Petrol */}
          <div style={{ backgroundColor: '#0F1117', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--silver-lo)',
              marginBottom: '0.75rem',
            }}>
              Petrol car / month
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--silver-hi)',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
            }}>
              {rupees(monthlyPetrol)}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--silver-lo)' }}>
              {litresConsumed.toFixed(1)} L consumed
            </p>
          </div>

          {/* EV */}
          <div style={{ backgroundColor: '#0F1117', padding: '1.5rem', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--cyan)',
              marginBottom: '0.75rem',
              opacity: 0.8,
            }}>
              Electric (ValEV) / month
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--cyan)',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
            }}>
              {rupees(monthlyEV)}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--silver-lo)' }}>
              {kWhConsumed.toFixed(1)} kWh charged
            </p>
          </div>
        </div>
      </div>

      {/* ── Savings highlight ────────────────────────────────────── */}
      <div style={{
        ...cardBase,
        border: '1px solid rgba(52,224,224,0.18)',
        background: 'linear-gradient(135deg, rgba(52,224,224,0.04) 0%, transparent 60%)',
        textAlign: 'center',
        padding: 'clamp(24px, 4vw, 40px)',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--silver-lo)',
          marginBottom: '0.75rem',
        }}>
          {monthlySavings >= 0 ? 'You\'d save each month' : 'EV costs more at these settings'}
        </p>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 700,
          color: monthlySavings >= 0 ? 'var(--cyan)' : 'var(--silver-lo)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
        }}>
          {rupees(Math.abs(monthlySavings))}
        </p>

        {monthlySavings < 0 && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--silver-lo)', marginBottom: '0.5rem' }}>
            Try a lower charging cost or higher petrol price to see savings.
          </p>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(2rem, 5vw, 4rem)',
          flexWrap: 'wrap',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(52,224,224,0.08)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--silver-lo)',
              marginBottom: '0.25rem',
            }}>
              Annual savings
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 700,
              color: 'var(--silver-hi)',
            }}>
              {rupees(annualSavings)}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--silver-lo)',
              marginBottom: '0.25rem',
            }}>
              CO2 avoided / month
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 700,
              color: 'var(--silver-hi)',
            }}>
              ~{co2Monthly.toFixed(0)} kg
            </p>
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: 'var(--silver-lo)',
          marginTop: '1.5rem',
          maxWidth: '56ch',
          marginInline: 'auto',
          lineHeight: 'var(--leading-relaxed)',
        }}>
          This is {SAVINGS_CALC.disclaimer}
        </p>
      </div>
    </motion.div>
  )
}
