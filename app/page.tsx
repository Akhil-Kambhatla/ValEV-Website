import { HeroSection }    from '@/components/HeroSection'
import { PartnerSection } from '@/components/PartnerSection'
import { AboutSection }   from '@/components/AboutSection'
import { ChargerSection } from '@/components/ChargerSection'
import { NetworkSection } from '@/components/NetworkSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PartnerSection />
      <AboutSection />
      <ChargerSection />
      <NetworkSection />
    </main>
  )
}
