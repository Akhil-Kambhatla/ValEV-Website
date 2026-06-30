'use client'

import Image from 'next/image'

interface BackdropLayersProps {
  src:              string
  alt:              string
  overlayStrength?: number  // 0 = nearly transparent overlay, 1 = nearly black. default 0.65
  priority?:        boolean
}

/**
 * BackdropLayers — the four overlay divs that sit on top of a background
 * image to dim, blend, and palette-tint it. Renders at z-0 (image) and z-1
 * (overlays). Content must sit at z-10 or above.
 *
 * Used directly inside sections that manage their own outer element (e.g.
 * HeroSection), and composed inside BackdropSection for standalone use.
 */
export function BackdropLayers({
  src,
  alt,
  overlayStrength = 0.65,
  priority = false,
}: BackdropLayersProps) {
  // Base dimming opacity: stronger as overlayStrength increases.
  const dim = 0.38 + overlayStrength * 0.42

  return (
    <>
      {/* Image — fills the positioned ancestor */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority={priority}
        />
      </div>

      {/* Layer 1 — overall darkening so image reads as atmosphere, not photo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: `rgba(7,8,10,${dim})` }}
      />

      {/* Layer 2 — strong bottom-up gradient: text zone is always readable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to top, rgba(7,8,10,0.94) 0%, rgba(7,8,10,0.18) 48%, transparent 100%)',
        }}
      />

      {/* Layer 3 — edge vignette: draws focus to centre */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse 85% 95% at 50% 50%, transparent 38%, rgba(7,8,10,0.38) 100%)',
        }}
      />

      {/* Layer 4 — palette tint: ties image into our deep blue-black system */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse 100% 38% at 50% 0%, rgba(12,34,50,0.48) 0%, transparent 100%)',
        }}
      />
    </>
  )
}

// ─── Standalone section wrapper ───────────────────────────────────────────────

interface BackdropSectionProps extends BackdropLayersProps {
  id?:       string
  className?: string
  /** Base bg colour shown before image loads and at edges. Default: --bg-hero */
  bg?:       string
  children:  React.ReactNode
}

/**
 * BackdropSection — full-section backdrop treatment.
 * Renders a <section> with the BackdropLayers treatment behind children.
 * Children render at their own z-index (must be ≥ 10 to clear the overlays).
 */
export function BackdropSection({
  src,
  alt,
  overlayStrength,
  priority,
  id,
  className = '',
  bg = 'var(--bg-hero)',
  children,
}: BackdropSectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bg }}
    >
      <BackdropLayers
        src={src}
        alt={alt}
        overlayStrength={overlayStrength}
        priority={priority}
      />
      {children}
    </section>
  )
}
