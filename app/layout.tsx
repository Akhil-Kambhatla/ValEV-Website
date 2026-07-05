import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";
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
