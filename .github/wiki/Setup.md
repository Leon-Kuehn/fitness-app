# ⚙️ Setup & Installation

## Voraussetzungen

- Node.js >= 18
- npm >= 9
- Git

## Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/Leon-Kuehn/fitness-app.git
cd fitness-app

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die App läuft dann auf `http://localhost:3000`.

## Verfügbare Skripte

| Befehl | Beschreibung |
|---|---|
| `npm run dev` | Entwicklungsserver starten |
| `npm run build` | Produktions-Build erstellen |
| `npm run start` | Produktionsserver starten |
| `npm run lint` | ESLint ausführen |

## Umgebungsvariablen

Kopiere `.env.example` zu `.env.local` und passe die Werte an:

```bash
cp .env.example .env.local
```

> **Hinweis:** Lade niemals `.env.local` oder echte Secrets in das Repository!
