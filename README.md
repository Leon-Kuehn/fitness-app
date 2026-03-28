<div align="center">

<img src="public/logo.svg" alt="FitFlow Logo" width="120" height="120" />

# FitFlow

**The open-source fitness platform that actually puts you first.**

[![CI](https://github.com/Leon-Kuehn/fitness-app/actions/workflows/ci.yml/badge.svg)](https://github.com/Leon-Kuehn/fitness-app/actions/workflows/ci.yml)
[![Deploy](https://github.com/Leon-Kuehn/fitness-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/Leon-Kuehn/fitness-app/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/Leon-Kuehn/fitness-app/actions/workflows/codeql.yml/badge.svg)](https://github.com/Leon-Kuehn/fitness-app/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](https://github.com/Leon-Kuehn/fitness-app)

[🌐 Live Demo](https://leon-kuehn.github.io/fitness-app) · [📋 Report Bug](https://github.com/Leon-Kuehn/fitness-app/issues/new?template=bug_report.yml) · [💡 Request Feature](https://github.com/Leon-Kuehn/fitness-app/issues/new?template=feature_request.yml) · [📖 Docs](#documentation)

</div>

---

## 🎯 Vision

FitFlow is a **free, open-source** fitness web application built for athletes, gym-goers, and anyone serious about their health. No paywalls. No subscriptions. No data harvesting.

We believe great fitness software should be:
- **Free forever** – not freemium, not trial-limited. Free.
- **Privacy-first** – your data stays yours
- **Community-driven** – built by athletes, for athletes
- **Better by design** – simpler UX than MyFitnessPal, stronger features than free alternatives

---

## ✨ Features

| Feature | Status |
|---------|--------|
| 🏋️ Workout Tracker & Planner | ✅ Available |
| 🥗 Nutrition & Macro Tracking | ✅ Available |
| 📊 Progress Charts & Analytics | ✅ Available |
| 💪 Exercise Library (300+ exercises) | ✅ Available |
| 🔥 Custom Workout Plans | ✅ Available |
| 📱 PWA (Mobile-ready) | 🚧 In Progress |
| 🤝 Social & Community Features | 🗓️ Planned |
| 🤖 AI Coach (personalized plans) | 🗓️ Planned |
| ⌚ Wearable Sync | 🗓️ Planned |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v6 |
| **State** | Zustand |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint + Prettier |
| **CI/CD** | GitHub Actions |
| **Hosting** | GitHub Pages |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/Leon-Kuehn/fitness-app.git
cd fitness-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

---

## 📁 Project Structure

```
fitness-app/
├── .github/
│   ├── ISSUE_TEMPLATE/     # Bug, Feature, User Story templates
│   ├── workflows/          # CI, Deploy, CodeQL pipelines
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Base design system components
│   │   └── layout/         # Layout components
│   ├── pages/              # Route-level page components
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Helper functions
│   ├── data/               # Static data (exercises, etc.)
│   ├── __tests__/          # Test files
│   ├── App.tsx
│   └── main.tsx
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
└── SECURITY.md
```

---

## 🤝 Contributing

We love contributions! FitFlow is built by the community, for the community.

Please read our **[Contributing Guide](CONTRIBUTING.md)** before submitting a PR.

Key rules:
- All PRs go to `develop` branch (never directly to `main`)
- PRs require at least 1 review approval
- All CI checks must pass before merging
- Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard

---

## 🛡️ Security

Found a vulnerability? Please read our **[Security Policy](SECURITY.md)** and report responsibly.

---

## 📜 License

MIT © [Leon Kühn](https://github.com/Leon-Kuehn) – See [LICENSE](LICENSE) for details.

FitFlow will **always** be free and open source.

---

## 🌟 Star History

If FitFlow helps you, please ⭐ star this repo – it helps others find it!

<div align="center">
  <sub>Built with ❤️ by the FitFlow community</sub>
</div>
