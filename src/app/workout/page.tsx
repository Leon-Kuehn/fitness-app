"use client";
import { useState } from "react";
import { format } from "date-fns";
import { CheckCircle2, Circle, Clock, Dumbbell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockWorkouts, mockTodayWorkout } from "@/lib/mock-data";

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [workoutFinished, setWorkoutFinished] = useState(false);

  const toggleExercise = (name: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
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
                  const done = completedExercises.has(exercise.name);
                  return (
                    <div key={exercise.name} className={`rounded-lg border p-3 transition-colors ${done ? "border-[#10b981]/30 bg-[#10b981]/5" : "border-[#2a2a2a] bg-[#242424]"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Dumbbell className="h-4 w-4 text-[#6366f1]" />
                          <span className={`text-sm font-medium ${done ? "line-through text-[#737373]" : "text-[#f5f5f5]"}`}>
                            {exercise.name}
                          </span>
                        </div>
                        <button onClick={() => toggleExercise(exercise.name)} className="text-[#737373] hover:text-[#10b981] transition-colors">
                          {done ? <CheckCircle2 className="h-5 w-5 text-[#10b981]" /> : <Circle className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {exercise.sets.map((set, i) => (
                          <div key={i} className="rounded-md bg-[#1a1a1a] px-2 py-1.5 text-center">
                            <p className="text-xs text-[#737373]">Set {i + 1}</p>
                            <p className="text-xs font-medium text-[#f5f5f5]">
                              {set.reps} reps{set.weight > 0 ? ` @ ${set.weight}lb` : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                {workoutFinished ? (
                  <div className="rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 p-3 text-center">
                    <CheckCircle2 className="h-6 w-6 text-[#10b981] mx-auto mb-1" />
                    <p className="text-sm font-medium text-[#10b981]">Workout Complete!</p>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setCompletedExercises(new Set(mockTodayWorkout.exercises.map((e) => e.name)));
                      setWorkoutFinished(true);
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
        <div className="space-y-3">
          {mockWorkouts.map((workout) => (
            <Card key={workout.id}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#f5f5f5]">{workout.name}</p>
                    <p className="text-xs text-[#737373] mt-0.5">{workout.date}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-[#737373]">
                        <Clock className="h-3 w-3" />{workout.duration} min
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#737373]">
                        <Dumbbell className="h-3 w-3" />{workout.exercises.length} exercises
                      </span>
                    </div>
                  </div>
                  <Badge variant="accent">Completed</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {workout.exercises.map((ex) => (
                    <span key={ex.name} className="rounded-full bg-[#242424] px-2 py-0.5 text-xs text-[#737373]">
                      {ex.name}
                    </span>
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
