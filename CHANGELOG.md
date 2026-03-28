# Changelog

All notable changes to FitTrack will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **Dashboard**: Time-aware greeting (Good morning/afternoon/evening) based on local time
- **Dashboard**: Animated calorie progress ring showing daily calories consumed vs goal
- **Dashboard**: Goal Progress stat card (monthly goal percentage)
- **Dashboard**: Improved recent workout list with icon avatars and better layout
- **Workout**: Live workout stopwatch timer with start/pause/reset controls
- **Workout**: Automatic 90-second rest countdown timer triggered when marking an exercise complete
- **Workout**: Real-time exercise progress bar showing % of workout completed
- **Workout**: Set cards with grid layout showing reps and weight per set
- **Workout**: Trophy completion screen on workout finish
- **Metrics**: lbs/kg unit toggle for weight display and chart values
- **Metrics**: Trend delta labels showing weight and body fat change since start
- **Metrics**: Improved chart layout with auto-scaled Y axis
- **Nutrition**: Calorie summary cards (Consumed / Remaining / Goal)
- **Nutrition**: Colored macro progress bars with icons for Calories, Protein, Carbs, Fat
- **Nutrition**: Improved meal cards with macro breakdown and calorie display
- **Exercises**: Collapsible difficulty filter panel (Beginner / Intermediate / Advanced)
- **Exercises**: Filter toggle button with active state indicator
- **Exercises**: Two-column grid layout for exercise cards on wider screens
- **Exercises**: Difficulty badge with color-coded styling per exercise card
- **Exercises**: Empty state with icon when no exercises match filters

### Changed
- Dashboard now shows 4 stat cards: Weekly Workouts, Streak, Volume, Goal Progress
- Nutrition page replaces generic Progress component with custom colored bars
- Exercise cards now show muscle group icon avatar and two-line description

---

## [0.1.0] - 2025-03-01

### Added
- Initial project structure with Next.js 15 + TypeScript + Tailwind CSS
- Dashboard with workout summary, nutrition overview and progress charts
- Workout tracker with exercise library and history
- Nutrition tracker with macro tracking and calorie goals
- Body metrics page with charts and measurements
- Custom workout plan builder
- Exercise library with search and muscle group filters
- AI Coach preview page
- Calendar view with workout type indicators
- Dark mode design system
- GitHub Actions CI/CD pipeline (lint, test, build, deploy)
- GitHub Pages deployment at https://leon-kuehn.github.io/fitness-app/
- CONTRIBUTING guide, CODE_OF_CONDUCT, SECURITY policy, LICENSE (MIT)
- Issue and PR templates
- Automated dependency review workflow
