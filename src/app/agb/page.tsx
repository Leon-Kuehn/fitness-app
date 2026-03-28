import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von FitTrack",
};

export default function AGBPage() {
  return (
    <div className="mx-auto max-w-3xl py-8">
      <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">Allgemeine Geschäftsbedingungen</h1>
      <p className="text-xs text-[#737373] mb-8">Stand: Januar 2025</p>

      <Section title="§ 1 Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der FitTrack-Plattform
          (nachfolgend &ldquo;Dienst&rdquo;) der FitTrack GmbH, Musterstraße 1, 12345 Musterstadt
          (nachfolgend &ldquo;Anbieter&rdquo;).
        </p>
        <p>
          Mit der Registrierung oder Nutzung des Dienstes erklärt sich der Nutzer mit diesen AGB
          einverstanden.
        </p>
      </Section>

      <Section title="§ 2 Leistungsbeschreibung">
        <p>
          FitTrack ist eine digitale Plattform zur Unterstützung beim Fitness-Tracking, der
          Trainingsplanung und Ernährungsprotokollierung. Der Anbieter stellt folgende Leistungen
          bereit:
        </p>
        <ul>
          <li>Trainingsplanung und -protokollierung</li>
          <li>Ernährungstagebuch und Kalorientracking</li>
          <li>Fortschrittsauswertungen und Metriken</li>
          <li>KI-gestützte Trainingsempfehlungen</li>
          <li>Gym-Management für Studiobetreiber</li>
        </ul>
      </Section>

      <Section title="§ 3 Vertragsschluss und Registrierung">
        <p>
          Der Vertrag zwischen Nutzer und Anbieter kommt durch die Registrierung auf der Plattform
          zustande. Der Nutzer muss mindestens 16 Jahre alt sein. Mit der Registrierung bestätigt
          der Nutzer, dass die angegebenen Daten korrekt und vollständig sind.
        </p>
        <p>
          Die Zugangsdaten sind vertraulich zu behandeln und dürfen nicht an Dritte weitergegeben
          werden. Der Nutzer ist verpflichtet, den Anbieter unverzüglich zu informieren, wenn er
          Kenntnis davon erlangt, dass seine Zugangsdaten unbefugt genutzt werden.
        </p>
      </Section>

      <Section title="§ 4 Nutzungspflichten">
        <p>Der Nutzer verpflichtet sich:</p>
        <ul>
          <li>Den Dienst nicht missbräuchlich zu nutzen</li>
          <li>Keine rechtswidrigen Inhalte hochzuladen oder zu verbreiten</li>
          <li>Die Rechte Dritter nicht zu verletzen</li>
          <li>Keine automatisierten Zugriffe ohne ausdrückliche Genehmigung durchzuführen</li>
          <li>Sicherheitsmechanismen des Dienstes nicht zu umgehen</li>
        </ul>
      </Section>

      <Section title="§ 5 Kündigung">
        <p>
          Der Nutzer kann sein Konto jederzeit ohne Einhaltung einer Kündigungsfrist kündigen. Die
          Kündigung erfolgt über die Einstellungen-Seite oder per E-Mail an info@fittrack.app.
        </p>
        <p>
          Der Anbieter ist berechtigt, Nutzerkonten zu sperren oder zu kündigen, wenn der Nutzer
          gegen diese AGB verstößt.
        </p>
      </Section>

      <Section title="§ 6 Haftungsbeschränkung">
        <p>
          Der Anbieter haftet uneingeschränkt für Schäden aus der Verletzung des Lebens, des Körpers
          oder der Gesundheit, die auf einer fahrlässigen oder vorsätzlichen Pflichtverletzung des
          Anbieters beruhen.
        </p>
        <p>
          Für sonstige Schäden haftet der Anbieter nur bei Vorsatz und grober Fahrlässigkeit. Die
          Haftung für leichte Fahrlässigkeit ist ausgeschlossen.
        </p>
      </Section>

      <Section title="§ 7 Datenschutz">
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Informationen zur Verarbeitung Ihrer
          Daten finden Sie in unserer{" "}
          <a href="/datenschutz" className="text-[#6366f1] hover:underline">
            Datenschutzerklärung
          </a>
          .
        </p>
      </Section>

      <Section title="§ 8 Änderungen der AGB">
        <p>
          Der Anbieter behält sich vor, diese AGB mit angemessener Vorankündigungsfrist von mindestens
          30 Tagen zu ändern. Änderungen werden per E-Mail oder durch eine Benachrichtigung in der
          App mitgeteilt.
        </p>
        <p>
          Widerspricht der Nutzer den geänderten AGB nicht innerhalb von 30 Tagen nach Bekanntgabe,
          gelten die geänderten AGB als akzeptiert.
        </p>
      </Section>

      <Section title="§ 9 Anwendbares Recht und Gerichtsstand">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
        </p>
        <p>
          Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist Musterstadt, sofern der
          Nutzer Kaufmann ist oder keinen allgemeinen Gerichtsstand in Deutschland hat.
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
