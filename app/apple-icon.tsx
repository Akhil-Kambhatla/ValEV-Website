import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const V_STRIPED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="131 -85 860 860"><rect x="131" y="-85" width="860" height="860" fill="#07080A"/><path d="M301.837 117.884L258.837 1.88419L430.337 141.384L458.837 222.384L470.337 258.884L498.837 342.384L509.837 376.884L532.337 438.884H543.837L682.337 152.384L864.837 0.384186L532.337 689.884L349.837 248.384L317.337 158.884L301.837 117.884Z" fill="#D4D7DC"/><path d="M458.337 220.884L301.337 115.884L258.837 1.88419L430.337 141.384L458.337 220.884Z" fill="#07080A"/><path d="M470.337 258.884L317.337 158.884L349.337 247.884L498.837 342.884L470.337 258.884Z" fill="#07080A"/><line x1="366.337" y1="288.384" x2="509.837" y2="377.384" stroke="#07080A" stroke-width="35"/></svg>`

export default function AppleIcon() {
  const src = `data:image/svg+xml;base64,${Buffer.from(V_STRIPED).toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, backgroundColor: '#07080A', display: 'flex' }}>
        <img src={src} width={180} height={180} />
      </div>
    ),
    { width: 180, height: 180 },
  )
}
