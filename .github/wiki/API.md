# 🔌 API Dokumentation

> 🚧 Wird befüllt sobald das Backend fertiggestellt ist.

## Endpoints (geplant)

### Workouts

| Method | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/workouts` | Alle Workouts abrufen |
| `POST` | `/api/workouts` | Neues Workout erstellen |
| `GET` | `/api/workouts/:id` | Einzelnes Workout |
| `PUT` | `/api/workouts/:id` | Workout aktualisieren |
| `DELETE` | `/api/workouts/:id` | Workout löschen |

### Exercises

| Method | Endpoint | Beschreibung |
|---|---|---|
| `GET` | `/api/exercises` | Übungsliste |
| `POST` | `/api/exercises` | Übung hinzufügen |

## Datenstrukturen

```typescript
type Workout = {
  id: string;
  name: string;
  date: Date;
  exercises: Exercise[];
  notes?: string;
};

type Exercise = {
  id: string;
  name: string;
  sets: Set[];
  muscleGroup: string;
};

type Set = {
  reps: number;
  weight: number;
  unit: 'kg' | 'lbs';
};
```
