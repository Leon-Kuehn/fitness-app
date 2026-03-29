# 🤝 Contributing

Vielen Dank für dein Interesse, zur Fitness App beizutragen!

## Branch-Strategie

```
main          ← Stabiler Produktionscode (geschützt)
feature/*     ← Neue Features
bugfix/*      ← Fehlerbehebungen
chore/*       ← Wartung, Abhängigkeiten, CI
```

## Workflow

1. Fork oder Branch von `main` erstellen
2. Änderungen implementieren
3. Pull Request öffnen mit dem PR-Template
4. Code Review abwarten
5. Merge nach Approval

## Commit Konvention

Wir nutzen [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: neue Funktion
fix: Fehlerbehebung
docs: Dokumentation
chore: Wartungsarbeiten
refactor: Refactoring ohne Funktionsänderung
test: Tests hinzufügen oder ändern
```

## Code Style

- TypeScript Strict Mode
- ESLint-Regeln einhalten (`npm run lint`)
- Komponenten in PascalCase
- Hilfsfunktionen in camelCase
