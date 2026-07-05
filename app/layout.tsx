import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";
import { BRAND, CONTACT, SITE_URL } from "@/lib/constants";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import { LogoPhaseProvider } from "@/contexts/LogoPhase";

// Two fonts only: Chakra Petch (headings ≥32px) and Inter (everything else).
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ValEV',
  legalName: 'Val Energy Pvt Ltd',
  url: SITE_URL,
  logo: `${SITE_URL}/valev-logo.svg`,
  sameAs: [CONTACT.linkedin],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: `+${CONTACT.whatsapp}`,
      contactType: 'customer service',
    },
    {
      '@type': 'ContactPoint',
      telephone: `+${CONTACT.whatsappSecondary}`,
      contactType: 'customer service',
    },
    {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      contactType: 'customer service',
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://valev.in'),
  title: {
    template: '%s | ValEV',
    default: 'ValEV - Fast Charging, Built for South India',
  },
  description:
    "ValEV is building South India's EV fast-charging network, starting in Andhra Pradesh and Telangana. Pre-launch.",
  openGraph: {
    siteName: 'ValEV',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${inter.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <LogoPhaseProvider>
          <HashScrollHandler />
          <Navbar />
          {children}
          <Footer />
        </LogoPhaseProvider>
      </body>
    </html>
  );
}
