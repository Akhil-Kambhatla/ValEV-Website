import type { Metadata } from 'next'
import { PartnerPage } from '@/components/PartnerPage'

export const metadata: Metadata = {
  title: 'Partner with ValEV',
  description:
    'Three ways to join the ValEV EV fast-charging network in South India: the FOCO franchise model, hosting a station at your business at zero cost, or a dedicated fleet charging partnership.',
  alternates: { canonical: '/partner' },
}

export default function PartnerRoute() {
  return (
    <main>
      <PartnerPage />
    </main>
  )
}
