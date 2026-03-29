import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/layout/bottom-nav";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CookieConsentProvider } from "@/components/ui/CookieBanner";
import { LayoutClient } from "@/components/layout/LayoutClient";
import { PWAInstaller } from "@/components/PWAInstaller";
import { InstallPrompt } from "@/components/ui/InstallPrompt";

export const metadata: Metadata = {
  title: { default: "FitTrack", template: "%s | FitTrack" },
  description: "Your personal fitness tracking app — Open Source & Free",
  manifest: "/fitness-app/manifest.json",
  openGraph: {
    title: "FitTrack",
    description: "Your personal fitness tracking app",
    type: "website",
  },
  other: {
    "theme-color": "#6366f1",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/fitness-app/icon-192.png" />
      </head>
      <body className="antialiased bg-[#0f0f0f] text-[#f5f5f5]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#6366f1] focus:text-white focus:top-0 focus:left-0"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <CookieConsentProvider>
                <LayoutClient>{children}</LayoutClient>
                <BottomNav />
              </CookieConsentProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
        <PWAInstaller />
        <InstallPrompt />
      </body>
    </html>
  );
}
