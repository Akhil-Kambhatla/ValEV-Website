import type { Metadata } from 'next'
import { PartnerFleetPage } from '@/components/PartnerFleetPage'

export const metadata: Metadata = {
  title: 'Fleet Operators | Partner with ValEV',
  description:
    'Dedicated, preferential EV charging infrastructure for bus and cab fleet operators in South India. Strategic placement, smart load-sharing, and pricing tailored to your fleet volume.',
}

export default function FleetRoute() {
  return (
    <main>
      <PartnerFleetPage />
    </main>
  )
}
