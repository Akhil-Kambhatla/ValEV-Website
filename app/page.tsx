import type { Metadata } from 'next'
import { HeroSection }        from '@/components/HeroSection'
import { PartnerSection }     from '@/components/PartnerSection'
import { AboutTeaser }        from '@/components/AboutTeaser'
import { ChargerSection }     from '@/components/ChargerSection'
import { BusOperatorSection } from '@/components/BusOperatorSection'
import { NetworkSection }     from '@/components/NetworkSection'

export const metadata: Metadata = {
  title: { absolute: 'ValEV - Fast Charging, Built for South India' },
  description:
    "ValEV is building South India's EV fast-charging network, starting in Andhra Pradesh and Telangana. Coming soon to highways, hotels, and commercial hubs.",
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
