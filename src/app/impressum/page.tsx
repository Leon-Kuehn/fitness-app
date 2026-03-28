import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von FitTrack gemäß § 5 TMG",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl py-8">
      <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Impressum</h1>
      <p className="text-xs text-[#737373] mb-8">Angaben gemäß § 5 TMG</p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Angaben gemäß § 5 TMG
        </h2>
        <address className="not-italic text-sm text-[#a3a3a3] leading-loose">
          <strong className="text-[#f5f5f5]">FitTrack GmbH</strong><br />
          Musterstraße 1<br />
          12345 Musterstadt<br />
          Deutschland
        </address>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Kontakt
        </h2>
        <div className="text-sm text-[#a3a3a3] space-y-1 leading-relaxed">
          <p>Telefon: +49 (0) 123 456789</p>
          <p>Telefax: +49 (0) 123 456790</p>
          <p>E-Mail: info@fittrack.app</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Registereintrag
        </h2>
        <div className="text-sm text-[#a3a3a3] space-y-1 leading-relaxed">
          <p>Eintragung im Handelsregister.</p>
          <p>Registergericht: Amtsgericht Musterstadt</p>
          <p>Registernummer: HRB 123456</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Umsatzsteuer-ID
        </h2>
        <div className="text-sm text-[#a3a3a3] space-y-1 leading-relaxed">
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
          </p>
          <p>DE 123 456 789</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Vertreten durch
        </h2>
        <div className="text-sm text-[#a3a3a3] leading-relaxed">
          <p>Geschäftsführer: Max Mustermann</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
        </h2>
        <address className="not-italic text-sm text-[#a3a3a3] leading-loose">
          Max Mustermann<br />
          Musterstraße 1<br />
          12345 Musterstadt
        </address>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Streitschlichtung
        </h2>
        <div className="text-sm text-[#a3a3a3] space-y-3 leading-relaxed">
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366f1] hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
          Haftungsausschluss
        </h2>
        <div className="text-sm text-[#a3a3a3] space-y-4 leading-relaxed">
          <div>
            <h3 className="text-sm font-medium text-[#d4d4d4] mb-2">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#d4d4d4] mb-2">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#d4d4d4] mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
