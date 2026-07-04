import type { Metadata } from 'next'
import { AboutSection } from '@/components/AboutSection'

export const metadata: Metadata = {
  title: 'About | ValEV',
  description:
    "Building South India's EV fast-charging network, starting in Telangana and Andhra Pradesh.",
}

export default function AboutPage() {
  return (
    <main>
      <AboutSection standalone />
    </main>
  )
}
