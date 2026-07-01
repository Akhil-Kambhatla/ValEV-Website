import type { Metadata } from 'next'
import { PartnerPage } from '@/components/PartnerPage'

export const metadata: Metadata = {
  title: 'Partner with ValEV — Franchise and Host Models',
  description:
    'Two ways to join the ValEV EV fast-charging network in South India: the FOCO franchise model (invest and earn) or host a station at your business at zero cost.',
}

export default function PartnerRoute() {
  return (
    <main>
      <PartnerPage />
    </main>
  )
}
