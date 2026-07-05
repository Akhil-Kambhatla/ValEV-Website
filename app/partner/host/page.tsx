import type { Metadata } from 'next'
import { PartnerHostPage } from '@/components/PartnerHostPage'

export const metadata: Metadata = {
  title: 'Host a Station',
  description:
    'Provide parking space at your business and ValEV installs, operates, and maintains a fast EV charger at zero cost to you. Earn revenue from every charging session.',
  alternates: { canonical: '/partner/host' },
}

export default function HostRoute() {
  return (
    <main>
      <PartnerHostPage />
    </main>
  )
}
