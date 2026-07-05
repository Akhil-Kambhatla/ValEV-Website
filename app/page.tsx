import type { Metadata } from 'next'
import { HeroSection }        from '@/components/HeroSection'
import { PartnerSection }     from '@/components/PartnerSection'
import { AboutTeaser }        from '@/components/AboutTeaser'
import { ChargerSection }     from '@/components/ChargerSection'
import { BusOperatorSection } from '@/components/BusOperatorSection'
import { NetworkSection }     from '@/components/NetworkSection'

export const metadata: Metadata = {
  title: { absolute: 'ValEV' },
  description:
    'ValEV is building a super-fast EV charging network across Andhra Pradesh and Telangana. Reliable charging for drivers, earning opportunities for hosts.',
  alternates: { canonical: '/' },
  openGraph: { url: 'https://valev.in' },
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PartnerSection />
      <AboutTeaser />
      <ChargerSection />
      <BusOperatorSection />
      <NetworkSection />
    </main>
  )
}
