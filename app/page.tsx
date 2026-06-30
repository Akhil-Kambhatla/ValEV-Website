import { HeroSection }        from '@/components/HeroSection'
import { PartnerSection }     from '@/components/PartnerSection'
import { AboutSection }       from '@/components/AboutSection'
import { ChargerSection }     from '@/components/ChargerSection'
import { BusOperatorSection } from '@/components/BusOperatorSection'
import { NetworkSection }     from '@/components/NetworkSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PartnerSection />
      <AboutSection />
      <ChargerSection />
      <BusOperatorSection />
      <NetworkSection />
    </main>
  )
}
