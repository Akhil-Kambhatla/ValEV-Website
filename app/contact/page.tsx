import type { Metadata } from 'next'
import { ContactPage } from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach the ValEV team by WhatsApp or email. We respond to hosting enquiries, investment questions, and fleet charging partnerships directly.',
  alternates: { canonical: '/contact' },
}

export default function ContactRoute() {
  return <ContactPage />
}
