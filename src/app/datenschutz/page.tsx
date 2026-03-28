import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von FitTrack gemäß DSGVO",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl py-8">
      <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Datenschutzerklärung</h1>
      <p className="text-xs text-[#737373] mb-8">Stand: Januar 2025</p>

      <Section title="1. Verantwortlicher">
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <address className="not-italic mt-3 text-[#737373]">
          FitTrack GmbH<br />
          Musterstraße 1<br />
          12345 Musterstadt<br />
          Deutschland<br />
          E-Mail: datenschutz@fittrack.app<br />
          Telefon: +49 (0) 123 456789
        </address>
      </Section>

      <Section title="2. Erhebung und Verarbeitung personenbezogener Daten">
        <p>
          Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung
          einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
          Die Erhebung und Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig
          nur nach Einwilligung des Nutzers.
        </p>
        <SubSection title="2.1 Beim Besuch unserer Website">
          <p>
            Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und
            Informationen vom Computersystem des aufrufenden Rechners. Folgende Daten werden
            hierbei erhoben:
          </p>
          <ul>
            <li>Informationen über den Browsertyp und die verwendete Version</li>
            <li>Das Betriebssystem des Nutzers</li>
            <li>Den Internet-Service-Provider des Nutzers</li>
            <li>Die IP-Adresse des Nutzers</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Websites, von denen das System des Nutzers auf unsere Internetseite gelangt</li>
          </ul>
        </SubSection>
        <SubSection title="2.2 Bei der Registrierung">
          <p>
            Bei der Registrierung für unsere Dienste erheben wir folgende Daten: Name, E-Mail-Adresse,
            Passwort (verschlüsselt), Geburtsdatum (optional), Körpermaße (optional).
          </p>
        </SubSection>
      </Section>

      <Section title="3. Cookies">
        <p>
          Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
          gespeichert werden. Wir unterscheiden zwischen:
        </p>
        <SubSection title="3.1 Notwendige Cookies">
          <p>
            Diese Cookies sind für den Betrieb der Website unbedingt erforderlich. Sie ermöglichen
            grundlegende Funktionen wie die Seitennavigation und den Zugriff auf gesicherte Bereiche.
          </p>
        </SubSection>
        <SubSection title="3.2 Funktionale Cookies">
          <p>
            Diese Cookies ermöglichen es der Website, erweiterte Funktionalität und Personalisierung
            bereitzustellen, wie z. B. gespeicherte Spracheinstellungen oder Themen-Präferenzen.
          </p>
        </SubSection>
        <SubSection title="3.3 Analyse-Cookies">
          <p>
            Mit Ihrer Einwilligung verwenden wir Analyse-Cookies, um zu verstehen, wie Besucher
            mit unserer Website interagieren. Die dadurch gewonnenen Informationen helfen uns,
            unsere Website kontinuierlich zu verbessern.
          </p>
        </SubSection>
      </Section>

      <Section title="4. Ihre Rechte">
        <p>Sie haben gemäß DSGVO folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
        <ul>
          <li><strong className="text-[#f5f5f5]">Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten verlangen.</li>
          <li><strong className="text-[#f5f5f5]">Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger personenbezogener Daten verlangen.</li>
          <li><strong className="text-[#f5f5f5]">Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen.</li>
          <li><strong className="text-[#f5f5f5]">Einschränkungsrecht (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.</li>
          <li><strong className="text-[#f5f5f5]">Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer personenbezogenen Daten widersprechen.</li>
          <li><strong className="text-[#f5f5f5]">Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können verlangen, Ihre Daten in einem strukturierten, maschinenlesbaren Format zu erhalten.</li>
        </ul>
        <p className="mt-4">
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: datenschutz@fittrack.app
        </p>
        <p className="mt-2">
          Darüber hinaus haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
        </p>
      </Section>

      <Section title="5. Datensicherheit">
        <p>
          Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer)
          in Verbindung mit der jeweils höchsten Verschlüsselungsstufe. Wir bedienen uns geeigneter
          technischer und organisatorischer Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder
          vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen
          den unbefugten Zugriff Dritter zu schützen.
        </p>
      </Section>

      <Section title="6. Änderungen dieser Datenschutzerklärung">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
          rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der
          Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue
          Datenschutzerklärung.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-[#f5f5f5] mb-3 pb-2 border-b border-[#2a2a2a]">
        {title}
      </h2>
      <div className="text-sm text-[#a3a3a3] space-y-3 leading-relaxed [&_ul]:mt-2 [&_ul]:ml-4 [&_ul]:space-y-1 [&_ul]:list-disc [&_ul]:text-[#737373]">
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <h3 className="text-sm font-medium text-[#d4d4d4] mb-2">{title}</h3>
      {children}
    </div>
  );
}
