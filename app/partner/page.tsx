import type { Metadata } from 'next'
import { PartnerPage } from '@/components/PartnerPage'

export const metadata: Metadata = {
  title: 'Partner with ValEV',
  description:
    'Two ways to join the ValEV EV fast-charging network in South India: invest through the FOCO franchise model, or host a station at your business at zero cost.',
}

export default function PartnerRoute() {
  return (
    <main>
      <PartnerPage />
    </main>
  )
}
