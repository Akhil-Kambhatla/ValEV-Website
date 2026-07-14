import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const V_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="240 0 625 691"><path d="M301.837 117.884L258.837 1.88419L430.337 141.384L458.837 222.384L470.337 258.884L498.837 342.384L509.837 376.884L532.337 438.884H543.837L682.337 152.384L864.837 0.384186L532.337 689.884L349.837 248.384L317.337 158.884L301.837 117.884Z" fill="#D4D7DC"/><path d="M301.337 115.884L458.337 220.884L470.337 258.884L317.337 158.884Z" fill="#07080A"/><path d="M349.337 247.884L498.837 342.884L509.837 377.384L366.337 288.384Z" fill="#07080A"/></svg>`

export default function OGImage() {
  const vMarkSrc = `data:image/svg+xml;base64,${Buffer.from(V_MARK_SVG).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          backgroundColor: '#07080A',
          alignItems: 'center',
          padding: '0 88px',
        }}
      >
        {/* V mark */}
        <img
          src={vMarkSrc}
          width={270}
          height={298}
          style={{ flexShrink: 0, marginRight: 80 }}
        />

        {/* Text column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#D4D7DC',
              letterSpacing: '-4px',
              lineHeight: 1,
            }}
          >
            ValEV
          </div>

          {/* Cyan accent bar */}
          <div
            style={{
              width: 88,
              height: 4,
              backgroundColor: '#34E0E0',
              marginTop: 28,
              marginBottom: 32,
            }}
          />

          <div
            style={{
              fontSize: 32,
              color: '#7A8290',
              lineHeight: 1.45,
              maxWidth: 580,
            }}
          >
            EV fast charging, built for South India.
          </div>

          <div
            style={{
              fontSize: 20,
              color: '#34E0E0',
              marginTop: 28,
              letterSpacing: '1px',
            }}
          >
            valev.in
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
