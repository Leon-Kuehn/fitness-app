import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/layout/bottom-nav";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CookieConsentProvider } from "@/components/ui/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { LayoutClient } from "@/components/layout/LayoutClient";

export const metadata: Metadata = {
  title: { default: "FitTrack", template: "%s | FitTrack" },
  description: "Your personal fitness tracking app — Open Source & Free",
  openGraph: {
    title: "FitTrack",
    description: "Your personal fitness tracking app",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="antialiased bg-[#0f0f0f] text-[#f5f5f5]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#6366f1] focus:text-white focus:top-0 focus:left-0"
        >
          Zum Hauptinhalt springen
        </a>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <CookieConsentProvider>
                <LayoutClient>{children}</LayoutClient>
                <BottomNav />
                <Footer />
              </CookieConsentProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
