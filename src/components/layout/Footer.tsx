"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/components/ui/CookieBanner";

export function Footer() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { openSettings } = useCookieConsent();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0f0f0f] py-6 px-4 lg:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/datenschutz" className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/impressum" className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors">
              {t("imprint")}
            </Link>
            <Link href="/agb" className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors">
              {t("terms")}
            </Link>
            <Link href="/cookies" className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors">
              {t("cookies")}
            </Link>
            <button
              onClick={openSettings}
              className="text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors"
            >
              {t("cookieSettings")}
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage("de")}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  language === "de"
                    ? "bg-[#6366f1]/15 text-[#6366f1]"
                    : "text-[#737373] hover:text-[#f5f5f5]"
                }`}
              >
                DE
              </button>
              <span className="text-[#2a2a2a] text-xs">/</span>
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  language === "en"
                    ? "bg-[#6366f1]/15 text-[#6366f1]"
                    : "text-[#737373] hover:text-[#f5f5f5]"
                }`}
              >
                EN
              </button>
            </div>

            <a
                          href="https://github.com/Leon-Kuehn/fitness-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#737373] hover:text-[#f5f5f5] transition-colors"
              aria-label="GitHub"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-3 text-[10px] text-[#737373]">{t("copyright")}</p>
      </div>
    </footer>
  );
}
