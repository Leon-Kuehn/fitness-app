"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

interface CookieConsentContextValue {
  openSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
}

function saveConsent(prefs: CookiePreferences) {
  localStorage.setItem("fittrack_cookie_consent", JSON.stringify(prefs));
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const openSettings = () => setSettingsOpen(true);

  return (
    <CookieConsentContext.Provider value={{ openSettings }}>
      {children}
      <CookieBannerInternal settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
    </CookieConsentContext.Provider>
  );
}

interface CookieBannerInternalProps {
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

function CookieBannerInternal({ settingsOpen, setSettingsOpen }: CookieBannerInternalProps) {
  const { t } = useTranslation();
  const [consentGiven, setConsentGiven] = useState(true);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fittrack_cookie_consent");
    if (!stored) {
      setConsentGiven(false);
    } else {
      try {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setFunctional(parsed.functional);
        setAnalytics(parsed.analytics);
      } catch {
        setConsentGiven(false);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, functional: true, analytics: true });
    setConsentGiven(true);
    setSettingsOpen(false);
  };

  const handleEssentialOnly = () => {
    saveConsent({ necessary: true, functional: false, analytics: false });
    setConsentGiven(true);
    setSettingsOpen(false);
  };

  const handleSaveSettings = () => {
    saveConsent({ necessary: true, functional, analytics });
    setConsentGiven(true);
    setSettingsOpen(false);
  };

  if (consentGiven && !settingsOpen) return null;

  return (
    <>
      {/* Cookie banner */}
      {!consentGiven && !settingsOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
          <div className="mx-auto max-w-3xl bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl p-5">
            <h3 className="text-sm font-semibold text-[#f5f5f5] mb-1">{t("cookieBannerTitle")}</h3>
            <p className="text-xs text-[#737373] mb-4">{t("cookieBannerDescription")}</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-medium bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg transition-colors"
              >
                {t("acceptAll")}
              </button>
              <button
                onClick={handleEssentialOnly}
                className="px-4 py-2 text-xs font-medium bg-[#242424] hover:bg-[#2a2a2a] text-[#f5f5f5] rounded-lg transition-colors"
              >
                {t("essentialOnly")}
              </button>
              <button
                onClick={() => setSettingsOpen(true)}
                className="px-4 py-2 text-xs font-medium text-[#737373] hover:text-[#f5f5f5] transition-colors"
              >
                {t("cookieSettingsBtn")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              if (consentGiven) setSettingsOpen(false);
            }}
          />
          <div className="relative w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl p-6">
            <h3 className="text-base font-semibold text-[#f5f5f5] mb-4">{t("cookieSettingsBtn")}</h3>

            {/* Necessary */}
            <div className="mb-4 p-3 bg-[#242424] rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#f5f5f5]">{t("necessary")}</span>
                <span className="text-xs text-[#6366f1] font-medium">Aktiv</span>
              </div>
              <p className="text-xs text-[#737373]">{t("necessaryDesc")}</p>
            </div>

            {/* Functional */}
            <div className="mb-4 p-3 bg-[#242424] rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#f5f5f5]">{t("functional")}</span>
                <button
                  role="switch"
                  aria-checked={functional}
                  onClick={() => setFunctional(!functional)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    functional ? "bg-[#6366f1]" : "bg-[#3a3a3a]"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      functional ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-[#737373]">{t("functionalDesc")}</p>
            </div>

            {/* Analytics */}
            <div className="mb-6 p-3 bg-[#242424] rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#f5f5f5]">{t("analytics")}</span>
                <button
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics(!analytics)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    analytics ? "bg-[#6366f1]" : "bg-[#3a3a3a]"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      analytics ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-[#737373]">{t("analyticsDesc")}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-4 py-2 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg transition-colors"
              >
                {t("save")}
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2 text-sm font-medium bg-[#242424] hover:bg-[#2a2a2a] text-[#f5f5f5] rounded-lg transition-colors"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function CookieBanner() {
  return null;
}
