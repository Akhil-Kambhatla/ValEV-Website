import type { Metadata } from 'next'
import { PartnerFranchisePage } from '@/components/PartnerFranchisePage'

export const metadata: Metadata = {
  title: 'FOCO Franchise | Partner with ValEV',
  description:
    'The Franchise Owned, Company Operated model: you invest and own the EV charging station; ValEV handles site selection, installation, operations, and maintenance.',
}

export default function FranchiseRoute() {
  return (
    <main>
      <PartnerFranchisePage />
    </main>
  )
}
