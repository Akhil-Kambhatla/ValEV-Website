import type { Metadata } from 'next'
import { TechnologyPage } from '@/components/TechnologyPage'

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'ValEV builds premium modular DC fast-charging hardware for Indian conditions: up to 240 kW, dual CCS2, smart software, and fleet-scale load management.',
  alternates: { canonical: '/technology' },
}

export default function TechnologyPageRoute() {
  return <TechnologyPage />
}
