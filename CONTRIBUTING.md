# Contributing to FitFlow

First off, **thank you** for considering contributing to FitFlow! 🎉
This project thrives because of people like you.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Branch Strategy](#branch-strategy)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Rules](#pull-request-rules)
- [Who Can Do What](#who-can-do-what)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)

---

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold it.

---

## How Can I Contribute?

### Reporting Bugs
- Use the [Bug Report template](https://github.com/Leon-Kuehn/fitness-app/issues/new?template=bug_report.yml)
- Include steps to reproduce, expected vs. actual behavior
- Attach screenshots if possible

### Suggesting Features
- Use the [Feature Request template](https://github.com/Leon-Kuehn/fitness-app/issues/new?template=feature_request.yml)
- Explain the problem it solves, not just the solution
- Check if it already exists before posting

### Code Contributions
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue before starting work to avoid duplication
- Fork the repo, make your changes, open a PR

---

## Branch Strategy

We follow a structured branching model:

```
main          ← Production-ready code only. Protected.
develop       ← Integration branch. All PRs target this.
feature/*     ← New features (e.g., feature/workout-tracker)
bugfix/*      ← Bug fixes (e.g., bugfix/calorie-calculation)
hotfix/*      ← Critical fixes for production
docs/*        ← Documentation-only changes
chore/*       ← Maintenance, dependency updates
```

### Rules:
- **NEVER push directly to `main`** – only via PR from `develop`
- **NEVER push directly to `develop`** – only via PR from feature branches
- Branch names must be lowercase with hyphens (no underscores, no spaces)
- Delete your branch after the PR is merged

---

## Development Workflow

```bash
# 1. Fork the repo and clone it
git clone https://github.com/YOUR_USERNAME/fitness-app.git
cd fitness-app

# 2. Add the upstream remote
git remote add upstream https://github.com/Leon-Kuehn/fitness-app.git

# 3. Always branch off develop
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name

# 4. Make your changes, commit often
git add .
git commit -m "feat: add workout timer component"

# 5. Push and open PR to develop
git push origin feature/your-feature-name
```

---

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description

Optional longer description.
```

### Types:

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting (no logic change) |
| `refactor` | Code restructuring |
| `test` | Adding or fixing tests |
| `chore` | Build process, deps, tooling |
| `perf` | Performance improvement |
| `ci` | CI/CD changes |

### Examples:
```
feat(workouts): add rest timer between sets
fix(nutrition): correct calorie calculation for protein
docs(readme): update installation instructions
test(utils): add unit tests for BMI calculator
```

---

## Pull Request Rules

### Before Opening a PR:
- [ ] Code follows our style guide (run `npm run lint`)
- [ ] All tests pass (`npm run test`)
- [ ] TypeScript has no errors (`npm run type-check`)
- [ ] New features include tests
- [ ] Documentation is updated if needed
- [ ] PR targets the `develop` branch (NOT `main`)

### PR Requirements:
- Fill out the PR template completely
- Link the related issue (`Closes #123`)
- Add relevant labels
- Request a review from a maintainer
- Keep PRs focused – one feature/fix per PR
- PRs with failing CI checks will NOT be merged

---

## Who Can Do What

| Role | Permissions |
|------|-------------|
| **Owner** (Leon-Kuehn) | Full repo control, merge to `main`, release management |
| **Maintainer** | Review PRs, merge to `develop`, manage issues and labels |
| **Contributor** | Open PRs to `develop`, comment on issues |
| **Community** | Open issues, discussions, star and fork |

### Becoming a Maintainer:
Regular, high-quality contributions over time may lead to a maintainer invitation. There is no formal application – it's based on demonstrated commitment to the project.

---

## Coding Standards

### TypeScript
- Strict mode enabled – no `any` types allowed
- Prefer `interface` over `type` for object shapes
- Use explicit return types on exported functions
- Avoid default exports for non-page components

### React
- Functional components only (no class components)
- Custom hooks for reusable logic (`useWorkout`, `useNutrition`)
- Props interfaces must be named `ComponentNameProps`
- Keep components small and focused (max ~150 lines)

### CSS / Tailwind
- Use Tailwind utilities; avoid custom CSS unless necessary
- Follow mobile-first responsive design
- Use design tokens from `tailwind.config.ts`

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `camelCase.ts` prefixed with `use`
- Utils: `camelCase.ts`
- Tests: `ComponentName.test.tsx`

---

## Testing Requirements

- Minimum **80% test coverage** for new code
- Unit tests for all utility functions
- Component tests for all UI components
- Integration tests for critical user flows

Run tests:
```bash
npm run test           # watch mode
npm run test:coverage  # coverage report
```

---

Thank you for helping make FitFlow the best free fitness platform out there! 💪
