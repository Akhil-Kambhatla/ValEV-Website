'use client'

import { useReducedMotion } from 'framer-motion'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const IndiaRaw = require('@svg-maps/india') as {
  default: { viewBox: string; locations: { path: string; id: string; name: string }[] }
}
const India = IndiaRaw.default

// ─── SVG path parser ────────────────────────────────────────────────────────
// @svg-maps/india paths use only: m (first = absolute, rest = relative), z
// Subsequent coordinate pairs after m are implicit relative lineto segments.

type Poly = [number, number][]
type MultiPoly = Poly[]

function parsePath(d: string): MultiPoly {
  const result: MultiPoly = []
  // tokenize: command letters OR numbers (incl. negative, decimal, sci notation)
  const tokens = d.match(/[mzMZ]|-?[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/g) ?? []

  let cx = 0, cy = 0   // current point
  let sx = 0, sy = 0   // current subpath start
  let poly: Poly = []
  let firstM = true

  const flush = () => { if (poly.length >= 3) result.push(poly); poly = [] }

  let i = 0
  while (i < tokens.length) {
    const t = tokens[i]

    if (t === 'z' || t === 'Z') {
      flush()
      cx = sx; cy = sy          // after close, current point = subpath start
      i++

    } else if (t === 'm' || t === 'M') {
      flush()
      i++
      const x = parseFloat(tokens[i] ?? '0')
      const y = parseFloat(tokens[i + 1] ?? '0')
      i += 2

      // First m in the entire path is treated as absolute (SVG spec)
      if (firstM || t === 'M') { cx = x; cy = y } else { cx += x; cy += y }
      sx = cx; sy = cy
      poly = [[cx, cy]]
      firstM = false

      // Implicit relative lineto: consume coordinate pairs until next command
      while (i < tokens.length && !/^[mzMZ]$/.test(tokens[i])) {
        cx += parseFloat(tokens[i] ?? '0')
        cy += parseFloat(tokens[i + 1] ?? '0')
        poly.push([cx, cy])
        i += 2
      }

    } else {
      i++
    }
  }
  flush()
  return result
}

// ─── Ray-casting point-in-polygon ───────────────────────────────────────────

function pipPoly(px: number, py: number, poly: Poly): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

function inMultiPoly(px: number, py: number, mp: MultiPoly): boolean {
  return mp.some(p => pipPoly(px, py, p))
}

// ─── Build south India polygons at module load ───────────────────────────────
// IDs from @svg-maps/india: tg=Telangana, ap=Andhra Pradesh, ka=Karnataka,
//                           tn=Tamil Nadu, kl=Kerala

const SOUTH_IDS = ['tg', 'ap', 'ka', 'tn', 'kl']
const southPolys: MultiPoly[] = SOUTH_IDS.map(id =>
  parsePath(India.locations.find(l => l.id === id)!.path)
)

function inSouthIndia(px: number, py: number): boolean {
  return southPolys.some(mp => inMultiPoly(px, py, mp))
}

// ─── Seeded LCG (stable across renders) ─────────────────────────────────────

function makeLcg(seed: number) {
  let s = seed >>> 0
  return () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 0x100000000 }
}

// ─── Generate PIP-verified pins in south India SVG space ─────────────────────
// Combined bounding box derived from actual @svg-maps/india path geometry
// (viewBox 0 0 612 696): Telangana 189-285/412-502, AP 179-347/428-571,
// Karnataka 124-218/444-593, TN 168-255/551-668, Kerala 140-193/567-663

function buildPins() {
  const rand = makeLcg(42)
  const X0 = 124, X1 = 347, Y0 = 412, Y1 = 668
  const out: { x: number; y: number; delay: number }[] = []
  let delay = 0.4, attempts = 0

  while (out.length < 102 && attempts < 8000) {
    const x = X0 + rand() * (X1 - X0)
    const y = Y0 + rand() * (Y1 - Y0)
    if (inSouthIndia(x, y)) {
      out.push({ x, y, delay })
      delay += 0.48
    }
    attempts++
  }
  return out
}

const PINS = buildPins()   // all verified on land in south India

// ─── Component ───────────────────────────────────────────────────────────────

export function IndiaMapBackdrop() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        className="absolute"
        style={{
          top:       '50%',
          left:      '58%',
          transform: 'translate(-50%, -50%)',
          width:     'clamp(500px, 70vw, 820px)',
          opacity:   0.22,
        }}
      >
        <svg
          viewBox={India.viewBox}
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Map states: one-shot zoom-out, then holds at scale(1) ── */}
          <g
            style={
              reduced
                ? { transform: 'scale(1)', opacity: 1 }
                : {
                    transformOrigin: '43% 65%',
                    animation: 'india-map-enter 10s ease-out 1 both',
                    willChange: 'transform, opacity',
                  }
            }
          >
            {India.locations.map(({ id, path }) => (
              <path
                key={id}
                d={path}
                fill="rgba(52,224,224,0.04)"
                stroke="rgba(52,224,224,0.25)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* ── Pins: independent staggered sequence, outside zoom group ── */}
          {PINS.map(({ x, y, delay }, i) => (
            <g
              key={i}
              style={
                reduced
                  ? {}
                  : {
                      transformOrigin: `${x}px ${y}px`,
                      animation: 'pin-appear 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
                      animationDelay: `${delay}s`,
                    }
              }
            >
              <circle cx={x} cy={y} r={4}   fill="none" stroke="rgba(52,224,224,0.28)" strokeWidth="0.8" />
              <circle cx={x} cy={y} r={1.8} fill="rgba(52,224,224,0.85)" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
