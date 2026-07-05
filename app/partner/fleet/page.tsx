import type { Metadata } from 'next'
import { PartnerFleetPage } from '@/components/PartnerFleetPage'

export const metadata: Metadata = {
  title: 'Fleet Operators',
  description:
    'Dedicated, preferential EV charging infrastructure for bus and cab fleet operators in South India. Strategic placement, smart load-sharing, and pricing tailored to your fleet volume.',
  alternates: { canonical: '/partner/fleet' },
}

export default function FleetRoute() {
  return (
    <main>
      <PartnerFleetPage />
    </main>
  )
}
