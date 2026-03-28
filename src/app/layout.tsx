import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: "FitTrack",
  description: "Your personal fitness tracking app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0f0f0f] text-[#f5f5f5]">
        <Sidebar />
        <main className="lg:ml-60 min-h-screen pb-20 lg:pb-0">
          <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
            {children}
          </div>
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
