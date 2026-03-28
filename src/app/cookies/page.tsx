import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Cookie-Richtlinie von FitTrack",
};

const cookies = [
  {
    name: "fittrack_cookie_consent",
    provider: "FitTrack",
    purpose: "Speichert die Cookie-Einstellungen des Nutzers",
    expiry: "1 Jahr",
    type: "Notwendig",
  },
  {
    name: "fittrack_sidebar_collapsed",
    provider: "FitTrack",
    purpose: "Speichert den Zustand der Seitenleiste (eingeklappt/ausgeklappt)",
    expiry: "Unbegrenzt (localStorage)",
    type: "Funktional",
  },
  {
    name: "fittrack_theme",
    provider: "FitTrack",
    purpose: "Speichert die gewählte Darstellung (Hell/Dunkel/System)",
    expiry: "Unbegrenzt (localStorage)",
    type: "Funktional",
  },
  {
    name: "fittrack_language",
    provider: "FitTrack",
    purpose: "Speichert die gewählte Sprache (Deutsch/Englisch)",
    expiry: "Unbegrenzt (localStorage)",
    type: "Funktional",
  },
  {
    name: "fittrack_accent_color",
    provider: "FitTrack",
    purpose: "Speichert die gewählte Akzentfarbe der Benutzeroberfläche",
    expiry: "Unbegrenzt (localStorage)",
    type: "Funktional",
  },
  {
    name: "fittrack_font_size",
    provider: "FitTrack",
    purpose: "Speichert die gewählte Schriftgröße für die Barrierefreiheit",
    expiry: "Unbegrenzt (localStorage)",
    type: "Funktional",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Wird zur Unterscheidung von Benutzern verwendet",
    expiry: "2 Jahre",
    type: "Analyse",
  },
  {
    name: "_ga_*",
    provider: "Google Analytics",
    purpose: "Wird zur Aufrechterhaltung des Sitzungsstatus verwendet",
    expiry: "2 Jahre",
    type: "Analyse",
  },
];

const typeColors: Record<string, string> = {
  Notwendig: "bg-[#6366f1]/15 text-[#6366f1]",
  Funktional: "bg-[#10b981]/15 text-[#10b981]",
  Analyse: "bg-[#f59e0b]/15 text-[#f59e0b]",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl py-8">
      <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Cookie-Richtlinie</h1>
      <p className="text-xs text-[#737373] mb-8">Stand: Januar 2025</p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Was sind Cookies?
        </h2>
        <p className="text-sm text-[#a3a3a3] leading-relaxed">
          Cookies sind kleine Textdateien, die von einer Website auf Ihrem Gerät gespeichert werden.
          FitTrack verwendet überwiegend localStorage, um Ihre Einstellungen zu speichern. Diese
          Daten verlassen Ihr Gerät nicht und werden nicht an externe Server übertragen, es sei denn,
          Sie haben der Nutzung von Analyse-Cookies zugestimmt.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Cookie-Kategorien
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Notwendig", "Funktional", "Analyse"].map((cat) => (
            <div key={cat} className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${typeColors[cat]}`}>
                {cat}
              </span>
              <p className="text-xs text-[#737373] leading-relaxed">
                {cat === "Notwendig" &&
                  "Unbedingt erforderlich für den Betrieb der Website. Können nicht deaktiviert werden."}
                {cat === "Funktional" &&
                  "Ermöglichen erweiterte Funktionen und Personalisierungen. Können deaktiviert werden."}
                {cat === "Analyse" &&
                  "Helfen uns zu verstehen, wie die Website genutzt wird. Nur mit Ihrer Einwilligung aktiv."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-4 pb-2 border-b border-[#2a2a2a]">
          Verwendete Cookies
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="text-left py-3 px-3 text-xs font-semibold text-[#f5f5f5]">Name</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-[#f5f5f5]">Anbieter</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-[#f5f5f5]">Zweck</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-[#f5f5f5]">Ablauf</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-[#f5f5f5]">Typ</th>
              </tr>
            </thead>
            <tbody>
              {cookies.map((cookie, i) => (
                <tr
                  key={i}
                  className="border-b border-[#1e1e1e] hover:bg-[#1a1a1a] transition-colors"
                >
                  <td className="py-3 px-3">
                    <code className="text-xs text-[#6366f1] font-mono">{cookie.name}</code>
                  </td>
                  <td className="py-3 px-3 text-xs text-[#a3a3a3]">{cookie.provider}</td>
                  <td className="py-3 px-3 text-xs text-[#737373] max-w-xs">{cookie.purpose}</td>
                  <td className="py-3 px-3 text-xs text-[#737373] whitespace-nowrap">{cookie.expiry}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[cookie.type]}`}>
                      {cookie.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Cookie-Einstellungen ändern
        </h2>
        <p className="text-sm text-[#a3a3a3] leading-relaxed mb-3">
          Sie können Ihre Cookie-Einstellungen jederzeit anpassen. Klicken Sie dazu auf den Button
          unten oder besuchen Sie unsere{" "}
          <a href="/settings" className="text-[#6366f1] hover:underline">
            Einstellungen-Seite
          </a>
          .
        </p>
        <p className="text-sm text-[#a3a3a3] leading-relaxed">
          Sie können Cookies auch über Ihren Browser löschen oder blockieren. Bitte beachten Sie,
          dass das Deaktivieren notwendiger Cookies die Funktionalität der Website beeinträchtigen kann.
        </p>
      </section>
    </div>
  );
}
