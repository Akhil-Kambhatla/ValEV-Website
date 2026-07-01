import type { Metadata } from "next";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HashScrollHandler } from "@/components/HashScrollHandler";
import { LogoPhaseProvider } from "@/contexts/LogoPhase";

// next/font variables use distinct names so @theme can reference them without
// circular deps: --font-display references var(--font-chakra), etc.
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.promise,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${inter.variable} ${jetbrains.variable}`}
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
