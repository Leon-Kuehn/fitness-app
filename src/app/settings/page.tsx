"use client";
import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Download, Trash2, X } from "lucide-react";

type FontSize = "small" | "medium" | "large";
type CardDensity = "compact" | "comfortable" | "spacious";
type SidebarWidth = "narrow" | "normal" | "wide";

const ACCENT_COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Cyan", value: "#06b6d4" },
];

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: "14px",
  medium: "16px",
  large: "18px",
};

export default function SettingsPage() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  // Accessibility
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Appearance
  const [accentColor, setAccentColorState] = useState("#6366f1");
  const [cardDensity, setCardDensity] = useState<CardDensity>("comfortable");
  const [sidebarWidth, setSidebarWidth] = useState<SidebarWidth>("normal");

  // Notifications
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  // Delete account dialog
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const fs = localStorage.getItem("fittrack_font_size") as FontSize | null;
    if (fs && (fs === "small" || fs === "medium" || fs === "large")) setFontSizeState(fs);

    const hc = localStorage.getItem("fittrack_high_contrast") === "true";
    setHighContrast(hc);
    if (hc) document.documentElement.classList.add("high-contrast");

    const rm = localStorage.getItem("fittrack_reduced_motion") === "true";
    setReducedMotion(rm);
    if (rm) document.documentElement.classList.add("reduce-motion");

    const ac = localStorage.getItem("fittrack_accent_color");
    if (ac) {
      setAccentColorState(ac);
      document.documentElement.style.setProperty("--color-primary", ac);
    }

    const cd = localStorage.getItem("fittrack_card_density") as CardDensity | null;
    if (cd) setCardDensity(cd);

    const sw = localStorage.getItem("fittrack_sidebar_width") as SidebarWidth | null;
    if (sw) setSidebarWidth(sw);

    const pn = localStorage.getItem("fittrack_push_notifications");
    if (pn !== null) setPushNotifications(pn === "true");

    const en = localStorage.getItem("fittrack_email_notifications");
    if (en !== null) setEmailNotifications(en === "true");

    const wr = localStorage.getItem("fittrack_workout_reminders");
    if (wr !== null) setWorkoutReminders(wr === "true");

    const wkr = localStorage.getItem("fittrack_weekly_report");
    if (wkr !== null) setWeeklyReport(wkr === "true");
  }, []);

  const setFontSize = (fs: FontSize) => {
    setFontSizeState(fs);
    localStorage.setItem("fittrack_font_size", fs);
    document.documentElement.style.fontSize = FONT_SIZE_MAP[fs];
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem("fittrack_high_contrast", String(next));
    if (next) document.documentElement.classList.add("high-contrast");
    else document.documentElement.classList.remove("high-contrast");
  };

  const toggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem("fittrack_reduced_motion", String(next));
    if (next) document.documentElement.classList.add("reduce-motion");
    else document.documentElement.classList.remove("reduce-motion");
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
    localStorage.setItem("fittrack_accent_color", color);
    document.documentElement.style.setProperty("--color-primary", color);
  };

  const handleExportData = () => {
    const mockData = {
      user: { name: "Alex Müller", email: "alex@example.com" },
      workouts: [],
      nutrition: [],
      metrics: [],
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fittrack-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold text-[#f5f5f5] mb-6">{t("settings")}</h1>

      <Tabs.Root defaultValue="general">
        <Tabs.List className="flex gap-1 mb-6 bg-[#1a1a1a] p-1 rounded-xl overflow-x-auto">
          {[
            { value: "general", label: t("general") },
            { value: "accessibility", label: t("accessibility") },
            { value: "appearance", label: t("appearance") },
            { value: "notifications", label: t("notifications") },
            { value: "privacy", label: t("privacyAccount") },
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className="flex-shrink-0 px-3 py-2 text-xs font-medium text-[#737373] rounded-lg transition-colors data-[state=active]:bg-[#6366f1] data-[state=active]:text-white hover:text-[#f5f5f5]"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* General */}
        <Tabs.Content value="general" className="space-y-4">
          <SettingCard title={t("language")}>
            <div className="flex gap-2">
              {(["de", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    language === lang
                      ? "bg-[#6366f1] text-white"
                      : "bg-[#242424] text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  {lang === "de" ? "Deutsch" : "English"}
                </button>
              ))}
            </div>
          </SettingCard>

          <SettingCard title={t("theme")}>
            <div className="flex gap-2">
              {(["dark", "light", "system"] as const).map((th) => (
                <button
                  key={th}
                  onClick={() => setTheme(th)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === th
                      ? "bg-[#6366f1] text-white"
                      : "bg-[#242424] text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  {th === "dark" ? t("dark") : th === "light" ? t("light") : t("system")}
                </button>
              ))}
            </div>
          </SettingCard>
        </Tabs.Content>

        {/* Accessibility */}
        <Tabs.Content value="accessibility" className="space-y-4">
          <SettingCard title={t("fontSize")}>
            <div className="flex gap-2">
              {(["small", "medium", "large"] as const).map((fs) => (
                <button
                  key={fs}
                  onClick={() => setFontSize(fs)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    fontSize === fs
                      ? "bg-[#6366f1] text-white"
                      : "bg-[#242424] text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  {fs === "small" ? t("compact") : fs === "medium" ? t("normal") : t("wide")}
                </button>
              ))}
            </div>
          </SettingCard>

          <SettingCard title={t("highContrast")}>
            <Toggle checked={highContrast} onChange={toggleHighContrast} />
          </SettingCard>

          <SettingCard title={t("reducedMotion")}>
            <Toggle checked={reducedMotion} onChange={toggleReducedMotion} />
          </SettingCard>
        </Tabs.Content>

        {/* Appearance */}
        <Tabs.Content value="appearance" className="space-y-4">
          <SettingCard title={t("accentColor")}>
            <div className="flex gap-3 flex-wrap">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  title={color.name}
                  className={`h-8 w-8 rounded-full transition-transform hover:scale-110 ${
                    accentColor === color.value ? "ring-2 ring-offset-2 ring-offset-[#1a1a1a] ring-white scale-110" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </SettingCard>

          <SettingCard title={t("cardDensity")}>
            <div className="flex gap-2">
              {(["compact", "comfortable", "spacious"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setCardDensity(d);
                    localStorage.setItem("fittrack_card_density", d);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    cardDensity === d
                      ? "bg-[#6366f1] text-white"
                      : "bg-[#242424] text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  {d === "compact" ? t("compact") : d === "comfortable" ? t("comfortable") : t("spacious")}
                </button>
              ))}
            </div>
          </SettingCard>

          <SettingCard title={t("sidebarWidth")}>
            <div className="flex gap-2">
              {(["narrow", "normal", "wide"] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setSidebarWidth(w);
                    localStorage.setItem("fittrack_sidebar_width", w);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    sidebarWidth === w
                      ? "bg-[#6366f1] text-white"
                      : "bg-[#242424] text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  {w === "narrow" ? t("narrow") : w === "normal" ? t("normal") : t("wide")}
                </button>
              ))}
            </div>
          </SettingCard>
        </Tabs.Content>

        {/* Notifications */}
        <Tabs.Content value="notifications" className="space-y-4">
          <SettingCard title={t("pushNotifications")}>
            <Toggle
              checked={pushNotifications}
              onChange={() => {
                const next = !pushNotifications;
                setPushNotifications(next);
                localStorage.setItem("fittrack_push_notifications", String(next));
              }}
            />
          </SettingCard>

          <SettingCard title={t("emailNotifications")}>
            <Toggle
              checked={emailNotifications}
              onChange={() => {
                const next = !emailNotifications;
                setEmailNotifications(next);
                localStorage.setItem("fittrack_email_notifications", String(next));
              }}
            />
          </SettingCard>

          <SettingCard title={t("workoutReminders")}>
            <Toggle
              checked={workoutReminders}
              onChange={() => {
                const next = !workoutReminders;
                setWorkoutReminders(next);
                localStorage.setItem("fittrack_workout_reminders", String(next));
              }}
            />
          </SettingCard>

          <SettingCard title={t("weeklyReport")}>
            <Toggle
              checked={weeklyReport}
              onChange={() => {
                const next = !weeklyReport;
                setWeeklyReport(next);
                localStorage.setItem("fittrack_weekly_report", String(next));
              }}
            />
          </SettingCard>
        </Tabs.Content>

        {/* Privacy & Account */}
        <Tabs.Content value="privacy" className="space-y-4">
          <SettingCard title="Rechtliches">
            <div className="flex flex-col gap-2">
              {[
                { href: "/datenschutz", label: t("privacy") },
                { href: "/impressum", label: t("imprint") },
                { href: "/agb", label: t("terms") },
                { href: "/cookies", label: t("cookies") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#6366f1] hover:underline"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </SettingCard>

          <SettingCard title={t("exportData")}>
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#242424] hover:bg-[#2a2a2a] text-[#f5f5f5] rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              {t("exportData")}
            </button>
          </SettingCard>

          <SettingCard title={t("deleteAccount")}>
            <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
              <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#ef4444]/10 hover:bg-[#ef4444]/20 text-[#ef4444] rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                  {t("deleteAccount")}
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 shadow-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <Dialog.Title className="text-base font-semibold text-[#f5f5f5]">
                      {t("deleteAccount")}
                    </Dialog.Title>
                    <Dialog.Close className="text-[#737373] hover:text-[#f5f5f5] transition-colors">
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>
                  <Dialog.Description className="text-sm text-[#737373] mb-6">
                    {t("deleteAccountConfirm")}
                  </Dialog.Description>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteOpen(false)}
                      className="flex-1 px-4 py-2 text-sm font-medium bg-[#242424] hover:bg-[#2a2a2a] text-[#f5f5f5] rounded-lg transition-colors"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      onClick={() => setDeleteOpen(false)}
                      className="flex-1 px-4 py-2 text-sm font-medium bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg transition-colors"
                    >
                      {t("confirm")}
                    </button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </SettingCard>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
      <p className="text-sm font-medium text-[#f5f5f5] mb-3">{title}</p>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-[#6366f1]" : "bg-[#3a3a3a]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
