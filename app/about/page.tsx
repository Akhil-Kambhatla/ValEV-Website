import type { Metadata } from 'next'
import { AboutSection } from '@/components/AboutSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    "ValEV (Val Energy Pvt. Ltd.) is building South India's EV fast-charging network, starting in Telangana and Andhra Pradesh. Our story and mission.",
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main>
      <AboutSection standalone />
    </main>
  )
}
