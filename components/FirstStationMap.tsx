'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { STATIONS, stationMapsUrl } from '@/lib/constants'
import type { Station } from '@/lib/constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LMap    = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LMarker = any

const STATUS_LABEL: Record<Station['status'], string> = {
  'coming-soon': 'Coming soon',
  'live':        'Live',
  'planned':     'Planned',
}

function pinHtml(active: boolean) {
  return `<div class="fs-pin-wrap fs-pin-wrap--${active ? 'active' : 'idle'}">
    <div class="fs-pin-ring"></div>
    <div class="fs-pin-dot"></div>
  </div>`
}

/* ── Sub-components ────────────────────────────────────────────────────────── */

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path
        d="M4.5 2H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.5M7 1h3m0 0v3m0-3L5 6"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
      style={{ flexShrink: 0, marginTop: '2px', color: 'var(--silver-lo)' }}
    >
      <path
        d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1Z"
        stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
      <circle cx="6" cy="4.5" r="1.1" fill="currentColor" />
    </svg>
  )
}

function StationCard({
  station,
  active,
  reduced,
  onSelect,
}: {
  station:  Station
  active:   boolean
  reduced:  boolean | null
  onSelect: () => void
}) {
  const url = stationMapsUrl(station)

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'flex-start',
        gap:            '10px',
        padding:        'clamp(14px, 2vw, 18px)',
        background:     active ? 'rgba(52,224,224,0.04)' : 'rgba(15,17,23,0.60)',
        border:         `1px solid ${active ? 'rgba(52,224,224,0.28)' : 'rgba(52,224,224,0.08)'}`,
        borderRadius:   '10px',
        cursor:         'pointer',
        textAlign:      'left',
        width:          '100%',
        transition:     reduced ? 'none' : 'border-color 200ms ease, background 200ms ease',
      }}
    >
      {/* Badges row */}
      <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         'var(--silver-lo)',
          background:    'rgba(240,242,244,0.05)',
          border:        '1px solid rgba(240,242,244,0.10)',
          borderRadius:  '4px',
          padding:       '3px 8px',
        }}>
          {STATUS_LABEL[station.status]}
        </span>

        <span style={{
          display:       'inline-flex',
          alignItems:    'center',
          gap:           '5px',
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         'var(--cyan)',
          background:    'rgba(52,224,224,0.05)',
          border:        '1px solid rgba(52,224,224,0.15)',
          borderRadius:  '4px',
          padding:       '3px 8px',
        }}>
          <span style={{
            display:      'inline-block',
            width:        '5px',
            height:       '5px',
            borderRadius: '50%',
            background:   'var(--cyan)',
            flexShrink:   0,
          }} />
          {station.machines} machines
        </span>
      </div>

      {/* Venue name */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize:   'clamp(1rem, 2vw, 1.25rem)',
        fontWeight: 700,
        color:      active ? 'var(--silver-hi)' : 'var(--silver-mid)',
        lineHeight: 'var(--leading-snug)',
        margin:     0,
        transition: reduced ? 'none' : 'color 200ms ease',
      }}>
        {station.venue}
      </p>

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
        <PinIcon />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-xs)',
          color:      'var(--silver-lo)',
          lineHeight: '1.5',
        }}>
          {station.city}, {station.state}
        </span>
      </div>

      {/* Get directions — only when selected */}
      {active && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '5px',
            fontFamily:     'var(--font-body)',
            fontSize:       'var(--text-xs)',
            fontWeight:     500,
            color:          'var(--cyan)',
            textDecoration: 'none',
          }}
        >
          Get directions
          <ExternalLinkIcon />
        </a>
      )}
    </button>
  )
}

/* ── Main component ────────────────────────────────────────────────────────── */

export function FirstStationMap() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const mapDivRef  = useRef<HTMLDivElement>(null)
  const mapRef     = useRef<LMap>(null)
  const markersRef = useRef<LMarker[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LRef       = useRef<any>(null)

  const [selectedIdx, setSelectedIdx] = useState(0)
  const reduced = useReducedMotion()
  const inView  = useInView(wrapRef, { once: true, margin: '-8% 0px' })

  // ── Initialize map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return

    import('leaflet').then((L) => {
      if (!mapDivRef.current || mapRef.current) return
      LRef.current = L

      const first = STATIONS[0]
      const map = L.map(mapDivRef.current, {
        center:             [first.latitude, first.longitude],
        zoom:               14,
        zoomControl:        false,
        attributionControl: true,
        scrollWheelZoom:    false,
        dragging:           false,
        touchZoom:          false,
        doubleClickZoom:    false,
        boxZoom:            false,
        keyboard:           false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains:  'abcd',
        maxZoom:     19,
      }).addTo(map)

      STATIONS.forEach((station, i) => {
        const icon = L.divIcon({
          className:  '',
          html:       pinHtml(i === 0),
          iconSize:   [32, 32],
          iconAnchor: [16, 16],
        })

        const marker: LMarker = L.marker([station.latitude, station.longitude], { icon }).addTo(map)

        marker.on('click', () => {
          setSelectedIdx(i)
          window.open(stationMapsUrl(station), '_blank', 'noopener,noreferrer')
        })

        markersRef.current.push(marker)
      })

      mapRef.current = map
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current  = null
      markersRef.current = []
      LRef.current    = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Pan + update markers when selection changes ──────────────────────────
  useEffect(() => {
    const L   = LRef.current
    const map = mapRef.current
    if (!L || !map) return

    const station = STATIONS[selectedIdx]

    if (reduced) {
      map.setView([station.latitude, station.longitude], 14)
    } else {
      map.flyTo([station.latitude, station.longitude], 14, { duration: 0.7 })
    }

    markersRef.current.forEach((marker, i) => {
      marker.setIcon(L.divIcon({
        className:  '',
        html:       pinHtml(i === selectedIdx),
        iconSize:   [32, 32],
        iconAnchor: [16, 16],
      }))
    })
  }, [selectedIdx, reduced])

  const show = inView || !!reduced

  return (
    <div
      id="stations"
      ref={wrapRef}
      style={{
        paddingBlock:  'clamp(56px, 9vh, 100px)',
        paddingInline: 'clamp(20px, 5vw, 72px)',
        maxWidth:      '1100px',
        marginInline:  'auto',
        opacity:       show ? 1 : 0,
        transform:     show ? 'none' : 'translateY(20px)',
        transition:    reduced ? 'none' : 'opacity 640ms ease, transform 640ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'clamp(28px, 4vw, 40px)' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize:   'var(--text-section-h)',
          color:      'var(--silver-hi)',
          lineHeight: 'var(--leading-snug)',
          fontWeight: 700,
          margin:     0,
        }}>
          Where it all begins.
        </h2>
      </div>

      {/* Map + panel */}
      <div style={{
        display:    'flex',
        flexWrap:   'wrap',
        gap:        'clamp(12px, 2.5vw, 20px)',
        alignItems: 'stretch',
      }}>

        {/* Map */}
        <div style={{
          flex:         '3 1 300px',
          minWidth:     0,
          height:       'clamp(280px, 42vh, 440px)',
          borderRadius: '10px',
          overflow:     'hidden',
          border:       '1px solid rgba(52,224,224,0.08)',
        }}>
          <div ref={mapDivRef} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Station list panel */}
        <div style={{
          flex:          '2 1 240px',
          minWidth:      0,
          display:       'flex',
          flexDirection: 'column',
          gap:           '10px',
        }}>
          {/* Panel label */}
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-xs)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--silver-lo)',
            paddingInline: '2px',
            margin:        0,
          }}>
            Our stations — {STATIONS.length} {STATIONS.length === 1 ? 'site' : 'sites'}
          </p>

          {/* Scrollable cards list */}
          <div style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '8px',
            overflowY:     'auto',
            flex:          1,
          }}>
            {STATIONS.map((station, i) => (
              <StationCard
                key={`${station.latitude}-${station.longitude}`}
                station={station}
                active={i === selectedIdx}
                reduced={reduced}
                onSelect={() => setSelectedIdx(i)}
              />
            ))}
          </div>

          {/* Footer note — fills remaining space */}
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      'var(--text-xs)',
            color:         'var(--silver-lo)',
            lineHeight:    '1.6',
            paddingInline: '2px',
            margin:        0,
            marginTop:     'auto',
            paddingTop:    '12px',
          }}>
            More stations coming to Andhra Pradesh and Telangana. Tap a marker to open in
            Google Maps.
          </p>
        </div>
      </div>

      {/* Section divider */}
      <div style={{
        marginTop:  'clamp(40px, 7vh, 72px)',
        height:     '1px',
        background: 'rgba(52,224,224,0.06)',
      }} />
    </div>
  )
}
