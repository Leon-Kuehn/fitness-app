"use client";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Clock, Dumbbell, Play, Pause, RotateCcw, Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockWorkouts, mockTodayWorkout } from "@/lib/mock-data";

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
    <div className="text-center">
      <p className="text-4xl font-mono font-bold text-[#f5f5f5] tracking-widest">
        {h > 0 && `${fmt(h)}:`}{fmt(m)}:{fmt(s)}
      </p>
      <p className="text-xs text-[#737373] mt-1">Workout Time</p>
    </div>
  );
}

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");
  const [completedSets, setCompletedSets] = useState<Record<string, Set<number>>>({});
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSets = mockTodayWorkout.exercises.reduce((s, ex) => s + ex.sets.length, 0);
  const doneSets = Object.values(completedSets).reduce((s, v) => s + v.size, 0);
  const progress = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Workout</h1>
        <p className="text-sm text-[#737373] mt-1">{format(new Date(), "EEEE, MMMM d")}</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2a2a2a]">
        {(["today", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              activeTab === tab ? "bg-[#6366f1] text-white" : "text-[#737373] hover:text-[#f5f5f5]"
            }`}
          >
            {tab === "today" ? "Today" : "History"}
          </button>
        ))}
      </div>

      {activeTab === "today" && (
        <div className="space-y-4">
          {/* Timer Card */}
          <Card className="text-center">
            <CardContent className="pt-6 pb-4 space-y-4">
              <WorkoutTimer running={timerRunning} />
              {restTimer > 0 && (
                <div className="bg-[#f59e0b10] border border-[#f59e0b30] rounded-lg px-4 py-2">
                  <p className="text-sm text-[#f59e0b] font-medium">Rest: {restTimer}s remaining</p>
                </div>
              )}
              <div className="flex items-center justify-center gap-3">
                {!workoutStarted ? (
                  <Button onClick={() => { setWorkoutStarted(true); setTimerRunning(true); }} className="gap-2">
                    <Play className="h-4 w-4" /> Start Workout
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setTimerRunning((r) => !r)} className="gap-2">
                      {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {timerRunning ? "Pause" : "Resume"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setTimerRunning(false); setWorkoutStarted(false); }} className="gap-1 text-[#737373]">
                      <RotateCcw className="h-3.5 w-3.5" /> Reset
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          {workoutStarted && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#737373]">
                <span>{doneSets} / {totalSets} sets done</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-[#1f2937] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10b981] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Confetti banner */}
          {workoutFinished && (
            <div className="confetti-banner flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-[#10b981]/20 to-[#6366f1]/20 border border-[#10b981]/40">
              <Trophy className="h-6 w-6 text-[#10b981]" />
              <div className="text-center">
                <p className="font-bold text-[#10b981] text-lg">🎉 Workout abgeschlossen!</p>
                <p className="text-xs text-[#737373]">Großartige Leistung!</p>
              </div>
            </div>
          )}

          {/* Exercises */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{mockTodayWorkout.name}</CardTitle>
                <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                  <Clock className="h-3.5 w-3.5" />
                  {mockTodayWorkout.duration} min
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTodayWorkout.exercises.map((exercise) => {
                  const exerciseDone = (completedSets[exercise.name]?.size ?? 0) >= exercise.sets.length;
                  return (
                    <div key={exercise.name} className={`rounded-xl border p-4 transition-all ${
                      exerciseDone ? "border-[#10b981] bg-[#10b98108]" : "border-[#1f2937]"
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-medium ${exerciseDone ? "text-[#10b981]" : "text-[#f5f5f5]"}`}>
                          {exercise.name}
                        </span>
                        {exerciseDone && <span className="text-xs text-[#10b981] font-medium">✓ Fertig</span>}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {exercise.sets.map((set, i) => (
                          <div
                            key={i}
                            onClick={() => toggleSet(exercise.name, i)}
                            className={`rounded-lg px-2 py-1.5 text-center cursor-pointer transition-all select-none ${
                              completedSets[exercise.name]?.has(i)
                                ? "bg-[#10b981]/20 border border-[#10b981]/50"
                                : "bg-[#1a1a1a] hover:bg-[#242424] border border-transparent"
                            }`}
                          >
                            <p className="text-xs text-[#737373]">Set {i + 1}</p>
                            <p className="text-sm font-medium text-[#f5f5f5]">{set.reps} reps</p>
                            {set.weight > 0 && <p className="text-xs text-[#6366f1]">{set.weight} lb</p>}
                            {completedSets[exercise.name]?.has(i) && (
                              <p className="text-xs text-[#10b981]">✓</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                {workoutFinished ? (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#10b98115] border border-[#10b981]">
                    <Trophy className="h-5 w-5 text-[#10b981]" />
                    <span className="font-semibold text-[#10b981]">Workout Complete!</span>
                  </div>
                ) : (
                  <Button
                    className="w-full"
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
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4">
          {mockWorkouts.map((workout) => (
            <Card key={workout.name}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{workout.name}</CardTitle>
                  <Badge variant="secondary" className="text-[#10b981] border-[#10b981]">Completed</Badge>
                </div>
                <p className="text-xs text-[#737373]">{workout.date}</p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-[#737373] mb-3">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {workout.duration} min</span>
                  <span className="flex items-center gap-1"><Dumbbell className="h-3.5 w-3.5" /> {workout.exercises.length} exercises</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {workout.exercises.map((ex) => (
                    <Badge key={ex.name} variant="outline" className="text-xs">{ex.name}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
