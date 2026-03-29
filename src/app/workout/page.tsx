"use client";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Check, Clock, Dumbbell, Play, Pause, Square, Trophy, BookOpen, FolderOpen, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { mockWorkouts, mockTodayWorkout } from "@/lib/mock-data";

// ─── Sub-tabs ─────────────────────────────────────────────────────────────────

type TopTab = "workout" | "plans" | "library" | "gyms";

const TOP_TABS: { id: TopTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "workout", label: "Workout", icon: Dumbbell },
  { id: "plans", label: "Plans", icon: FolderOpen },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "gyms", label: "Gym Finder", icon: MapPin },
];

// ─── Timer ────────────────────────────────────────────────────────────────────

function WorkoutTimer({ running }: { running: boolean }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <span
      className="font-mono font-bold tracking-widest"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-xl)",
        color: "var(--color-text)",
      }}
    >
      {h > 0 && `${fmt(h)}:`}{fmt(m)}:{fmt(s)}
    </span>
  );
}

// ─── Active set input ─────────────────────────────────────────────────────────

function SetInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-16 text-center text-sm font-medium rounded-lg px-2 py-1 outline-none"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-primary)",
        color: "var(--color-text)",
      }}
    />
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WorkoutPage() {
  const [topTab, setTopTab] = useState<TopTab>("workout");
  const [completedSets, setCompletedSets] = useState<Record<string, Set<number>>>({});
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [activeSetInputs, setActiveSetInputs] = useState<Record<string, { reps: string; weight: string }>>({});
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSets = mockTodayWorkout.exercises.reduce((s, ex) => s + ex.sets.length, 0);
  const doneSets = Object.values(completedSets).reduce((s, v) => s + v.size, 0);
  const progress = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;

  const getActiveSetKey = (exerciseName: string, setIdx: number) =>
    `${exerciseName}__${setIdx}`;

  const startRest = (seconds: number) => {
    setRestTimer(seconds);
    if (restRef.current) clearInterval(restRef.current);
    restRef.current = setInterval(() => {
      setRestTimer((prev) => {
        if (prev <= 1) { clearInterval(restRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleSet = (exerciseName: string, setIdx: number) => {
    setCompletedSets((prev) => {
      const cur = new Set(prev[exerciseName] ?? []);
      if (cur.has(setIdx)) {
        cur.delete(setIdx);
      } else {
        cur.add(setIdx);
        startRest(90);
      }
      const next = { ...prev, [exerciseName]: cur };
      const allDone = mockTodayWorkout.exercises.every(
        (ex) => (next[ex.name]?.size ?? 0) >= ex.sets.length
      );
      if (allDone) {
        setWorkoutFinished(true);
        setTimerRunning(false);
      }
      return next;
    });
  };

  const updateSetInput = (key: string, field: "reps" | "weight", value: string) => {
    setActiveSetInputs((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? { reps: "", weight: "" }), [field]: value },
    }));
  };

  // Determine the next incomplete set for each exercise
  const getNextSetIdx = (exerciseName: string, totalSetsForExercise: number): number => {
    const done = completedSets[exerciseName] ?? new Set();
    for (let i = 0; i < totalSetsForExercise; i++) {
      if (!done.has(i)) return i;
    }
    return -1;
  };

  return (
    <div className="space-y-5">
      {/* Page title */}
      <div>
        <h1
          className="font-extrabold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            color: "var(--color-text)",
          }}
        >
          Training
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }} className="mt-1">
          {format(new Date(), "EEEE, MMMM d")}
        </p>
      </div>

      {/* Top Tab Bar */}
      <div
        className="flex gap-1 rounded-xl p-1"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {TOP_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTopTab(id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: topTab === id ? "var(--color-primary)" : "transparent",
              color: topTab === id ? "#fff" : "var(--color-text-muted)",
            }}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Workout Tab ─────────────────────────────────────────────────── */}
      {topTab === "workout" && (
        <div className="space-y-4">
          {/* Timer + Controls */}
          <Card>
            <CardContent>
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="text-center">
                  <WorkoutTimer running={timerRunning} />
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }} className="mt-1">
                    {mockTodayWorkout.name}
                  </p>
                </div>

                {restTimer > 0 && (
                  <div
                    className="rounded-lg px-4 py-2 text-center"
                    style={{
                      background: "rgba(255,159,10,0.08)",
                      border: "1px solid rgba(255,159,10,0.25)",
                    }}
                  >
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-warning)" }} className="font-medium">
                      Rest: {restTimer}s remaining
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {!workoutStarted ? (
                    <Button
                      size="lg"
                      onClick={() => { setWorkoutStarted(true); setTimerRunning(true); }}
                      className="gap-2 font-semibold"
                    >
                      <Play className="h-4 w-4" />
                      Start Workout
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setTimerRunning((r) => !r)}
                        className="gap-2"
                      >
                        {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {timerRunning ? "Pause" : "Resume"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setTimerRunning(false); setWorkoutStarted(false); }}
                        className="gap-1"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        <Square className="h-3.5 w-3.5" />
                        Stop
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          {workoutStarted && (
            <div className="space-y-1.5">
              <div
                className="flex justify-between"
                style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
              >
                <span>{doneSets} / {totalSets} sets</span>
                <span>{progress}%</span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: "var(--color-success)" }}
                />
              </div>
            </div>
          )}

          {/* Completion Banner */}
          {workoutFinished && (
            <div
              className="confetti-banner flex items-center justify-center gap-3 py-4 rounded-xl"
              style={{
                background: "linear-gradient(to right, rgba(48,209,88,0.12), rgba(255,55,95,0.12))",
                border: "1px solid rgba(48,209,88,0.3)",
              }}
            >
              <Trophy className="h-6 w-6" style={{ color: "var(--color-success)" }} />
              <div className="text-center">
                <p
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-lg)",
                    color: "var(--color-success)",
                  }}
                >
                  Workout Complete!
                </p>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                  Great performance — keep it up!
                </p>
              </div>
            </div>
          )}

          {/* Exercise Cards */}
          {mockTodayWorkout.exercises.map((exercise) => {
            const done = completedSets[exercise.name] ?? new Set<number>();
            const exerciseDone = done.size >= exercise.sets.length;
            const nextActiveIdx = getNextSetIdx(exercise.name, exercise.sets.length);

            return (
              <Card
                key={exercise.name}
                style={{
                  border: exerciseDone
                    ? "1px solid rgba(48,209,88,0.35)"
                    : "1px solid var(--color-border)",
                  background: exerciseDone ? "rgba(48,209,88,0.05)" : "var(--color-surface-2)",
                }}
              >
                <CardContent>
                  {/* Exercise header */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-base)",
                        color: exerciseDone ? "var(--color-success)" : "var(--color-text)",
                      }}
                    >
                      {exercise.name}
                    </span>
                    {exerciseDone && (
                      <span
                        className="flex items-center gap-1 text-xs font-medium"
                        style={{ color: "var(--color-success)" }}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Done
                      </span>
                    )}
                  </div>

                  {/* Sets */}
                  <div className="space-y-2">
                    {exercise.sets.map((set, i) => {
                      const isCompleted = done.has(i);
                      const isActive = !isCompleted && i === nextActiveIdx && workoutStarted;
                      const key = getActiveSetKey(exercise.name, i);
                      const inputs = activeSetInputs[key] ?? { reps: "", weight: "" };

                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                          style={{
                            background: isCompleted
                              ? "rgba(48,209,88,0.08)"
                              : isActive
                              ? "rgba(255,55,95,0.06)"
                              : "transparent",
                            border: isActive
                              ? "1px solid rgba(255,55,95,0.3)"
                              : "1px solid transparent",
                          }}
                        >
                          {/* Set number */}
                          <span
                            className="w-12 text-xs font-medium shrink-0"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            Set {i + 1}
                          </span>

                          {isCompleted ? (
                            <>
                              <Check className="h-4 w-4 shrink-0" style={{ color: "var(--color-success)" }} />
                              <span
                                className="text-sm"
                                style={{ color: "var(--color-text-muted)" }}
                              >
                                {set.reps} × {set.weight > 0 ? `${set.weight} lb` : "BW"}
                              </span>
                            </>
                          ) : isActive ? (
                            <>
                              <SetInput
                                value={inputs.reps}
                                onChange={(v) => updateSetInput(key, "reps", v)}
                                placeholder={String(set.reps)}
                              />
                              <span style={{ color: "var(--color-text-muted)" }} className="text-xs">×</span>
                              {set.weight > 0 && (
                                <SetInput
                                  value={inputs.weight}
                                  onChange={(v) => updateSetInput(key, "weight", v)}
                                  placeholder={String(set.weight)}
                                />
                              )}
                              <button
                                onClick={() => toggleSet(exercise.name, i)}
                                className="ml-auto rounded-full p-1.5 transition-colors"
                                style={{
                                  background: "var(--color-success)",
                                  color: "#000",
                                }}
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <span
                              className="text-sm"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {set.reps} reps
                              {set.weight > 0 && ` · ${set.weight} lb`}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Finish button */}
          <div className="pb-4">
            {workoutFinished ? (
              <div
                className="flex items-center justify-center gap-2 py-3 rounded-xl"
                style={{ background: "rgba(48,209,88,0.1)", border: "1px solid var(--color-success)" }}
              >
                <Trophy className="h-5 w-5" style={{ color: "var(--color-success)" }} />
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-success)", fontFamily: "var(--font-display)" }}
                >
                  Workout Complete!
                </span>
              </div>
            ) : (
              <Button
                className="w-full font-semibold"
                size="lg"
                onClick={() => {
                  const allSets: Record<string, Set<number>> = {};
                  mockTodayWorkout.exercises.forEach((ex) => {
                    allSets[ex.name] = new Set(ex.sets.map((_, i) => i));
                  });
                  setCompletedSets(allSets);
                  setWorkoutFinished(true);
                  setTimerRunning(false);
                }}
              >
                Finish Workout
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ── Plans Tab ───────────────────────────────────────────────────── */}
      {topTab === "plans" && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <FolderOpen className="h-10 w-10" style={{ color: "var(--color-text-muted)" }} />
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
            View your training plans
          </p>
          <Link href="/plans">
            <Button variant="secondary">Open Plans</Button>
          </Link>
        </div>
      )}

      {/* ── Library Tab ─────────────────────────────────────────────────── */}
      {topTab === "library" && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <BookOpen className="h-10 w-10" style={{ color: "var(--color-text-muted)" }} />
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
            Browse the exercise library
          </p>
          <Link href="/exercises">
            <Button variant="secondary">Open Library</Button>
          </Link>
        </div>
      )}

      {/* ── Gym Finder Tab ──────────────────────────────────────────────── */}
      {topTab === "gyms" && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <MapPin className="h-10 w-10" style={{ color: "var(--color-text-muted)" }} />
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
            Find gyms near you
          </p>
          <Link href="/gyms">
            <Button variant="secondary">Open Gym Finder</Button>
          </Link>
        </div>
      )}

      {/* History section (always shown at bottom of workout tab) */}
      {topTab === "workout" && (
        <div>
          <h2
            className="font-semibold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-base)",
              color: "var(--color-text)",
            }}
          >
            History
          </h2>
          <div className="space-y-2">
            {mockWorkouts.map((workout) => (
              <Card key={workout.name} className="py-3 px-4">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="font-medium"
                        style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }}
                      >
                        {workout.name}
                      </p>
                      <div
                        className="flex gap-3 mt-0.5"
                        style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
                      >
                        <span>{workout.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          {workout.exercises.length} exercises
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{ color: "var(--color-success)", borderColor: "var(--color-success)" }}
                    >
                      Done
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
