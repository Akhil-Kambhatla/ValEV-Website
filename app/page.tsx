import { HeroSection }        from '@/components/HeroSection'
import { PartnerSection }     from '@/components/PartnerSection'
import { AboutTeaser }        from '@/components/AboutTeaser'
import { ChargerSection }     from '@/components/ChargerSection'
import { BusOperatorSection } from '@/components/BusOperatorSection'
import { NetworkSection }     from '@/components/NetworkSection'

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
