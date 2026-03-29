# 📂 Projektstruktur

```
fitness-app/
├── .github/                 # GitHub-Konfiguration
│   ├── ISSUE_TEMPLATE/      # Issue-Vorlagen
│   ├── workflows/           # CI/CD GitHub Actions
│   ├── CODEOWNERS           # Code-Owner Zuweisung
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                  # Statische Assets
├── src/                     # Quellcode
│   ├── app/                 # Next.js App Router
│   ├── components/          # Wiederverwendbare UI-Komponenten
│   ├── lib/                 # Hilfsfunktionen & Utilities
│   └── types/               # TypeScript Typdefinitionen
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Architekturprinzipien

- **Component-first**: Jede UI-Einheit ist eine eigenständige Komponente
- **TypeScript everywhere**: Strikte Typisierung im gesamten Projekt
- **Mobile-first**: Responsive Design von Beginn an
