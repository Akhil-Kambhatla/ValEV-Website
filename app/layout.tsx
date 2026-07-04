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
  title: `${BRAND.name}: ${BRAND.tagline}`,
  description: BRAND.promise,
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
