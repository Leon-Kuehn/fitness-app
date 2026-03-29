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
import { GithubPagesRedirect } from "@/components/GithubPagesRedirect";

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
    "theme-color": "#ff375f",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/fitness-app/icon-192.png" />
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
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
        <GithubPagesRedirect />
      </body>
    </html>
  );
}
