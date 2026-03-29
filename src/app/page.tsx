"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Dumbbell,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { format, subDays, isAfter } from "date-fns";
import { de as deLocale } from "date-fns/locale";
import {
  mockUser,
  mockWorkouts,
  mockTodayWorkout,
  mockNutritionDays,
} from "@/lib/mock-data";

function getGreeting(lang: "de" | "en", hour: number): string {
  if (lang === "de") {
    if (hour < 12) return "Guten Morgen";
    if (hour < 18) return "Guten Tag";
    return "Guten Abend";
  }
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getWeeklyWorkoutCount(): number {
  const oneWeekAgo = subDays(new Date(), 7);
  return mockWorkouts.filter(
    (w) => w.completed && isAfter(new Date(w.date), oneWeekAgo)
  ).length;
}

const CALORIE_GOAL = 2200;
const MONTHLY_GOAL_PCT = 68;
const TOTAL_VOLUME_LBS = 12400;

export default function DashboardPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDE = language === "de";
  const locale = isDE ? deLocale : undefined;
  const now = mounted ? new Date() : new Date(0);
  const greeting = mounted ? getGreeting(language, now.getHours()) : "";
  const userName = user?.name ?? mockUser.name;
  const today = mockNutritionDays[0];
  const recentWorkouts = mockWorkouts.slice(0, 3);

  // suppress unused var warning — weeklyWorkouts is computed for potential future use
  void getWeeklyWorkoutCount();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="font-extrabold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            color: "var(--color-text)",
          }}
        >
          {mounted ? `${greeting}, ${userName.split(" ")[0]} 👋` : "\u00A0"}
        </h1>
        <p
          className="mt-1"
          style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}
        >
          {mounted ? format(now, "EEEE, MMMM d", { locale }) : "\u00A0"}
        </p>
      </div>

      {/* KPI Cards row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Streak */}
        <Card className="flex flex-col gap-1 py-5 px-4">
          <span
            className="uppercase font-semibold"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}
          >
            {isDE ? "Tage Streak" : "Day Streak"}
          </span>
          <span
            className="font-extrabold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--color-primary)",
            }}
          >
            {mockUser.streak}
          </span>
          <Flame className="h-4 w-4 mt-1" style={{ color: "var(--color-warning)" }} />
        </Card>

        {/* Calories */}
        <Card className="flex flex-col gap-1 py-5 px-4">
          <span
            className="uppercase font-semibold"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}
          >
            kcal
          </span>
          <span
            className="font-extrabold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--color-primary)",
            }}
          >
            {today.calories.toLocaleString()}
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
            / {CALORIE_GOAL.toLocaleString()}
          </span>
        </Card>

        {/* Volume */}
        <Card className="flex flex-col gap-1 py-5 px-4">
          <span
            className="uppercase font-semibold"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}
          >
            {isDE ? "Volumen" : "Volume"}
          </span>
          <span
            className="font-extrabold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--color-primary)",
            }}
          >
            {(TOTAL_VOLUME_LBS / 1000).toFixed(1)}k
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>lbs</span>
        </Card>

        {/* Monthly Goal */}
        <Card className="flex flex-col gap-1 py-5 px-4">
          <span
            className="uppercase font-semibold"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", letterSpacing: "0.08em" }}
          >
            {isDE ? "Monatsziel" : "Monthly Goal"}
          </span>
          <span
            className="font-extrabold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--color-primary)",
            }}
          >
            {MONTHLY_GOAL_PCT}%
          </span>
          <div
            className="mt-2 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${MONTHLY_GOAL_PCT}%`,
                background: "var(--color-success)",
              }}
            />
          </div>
        </Card>
      </div>

      {/* Today's Workout CTA */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p
                className="font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  color: "var(--color-text)",
                }}
              >
                {mockTodayWorkout.name}
              </p>
              <div
                className="flex items-center gap-3 mt-1"
                style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
              >
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {mockTodayWorkout.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Dumbbell className="h-3.5 w-3.5" />
                  {mockTodayWorkout.exercises.length}{" "}
                  {isDE ? "Übungen" : "exercises"}
                </span>
              </div>
            </div>
            <Link href="/workout">
              <Button size="lg" className="gap-2 font-semibold">
                <Zap className="h-4 w-4" />
                {isDE ? "Starten" : "Start"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2
            className="font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-base)",
              color: "var(--color-text)",
            }}
          >
            {isDE ? "Letzte Workouts" : "Recent Workouts"}
          </h2>
          <Link
            href="/workout"
            className="flex items-center gap-0.5 transition-colors"
            style={{ fontSize: "var(--text-xs)", color: "var(--color-primary)" }}
          >
            {isDE ? "Alle anzeigen" : "View all"}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-2">
          {recentWorkouts.map((workout) => (
            <Card key={workout.id} className="py-3 px-4">
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
                      className="flex items-center gap-3 mt-0.5"
                      style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}
                    >
                      <span>{workout.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell className="h-3 w-3" />
                        {workout.exercises.length}{" "}
                        {isDE ? "Übungen" : "exercises"}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    style={{ color: "var(--color-success)", borderColor: "var(--color-success)" }}
                  >
                    {isDE ? "Fertig" : "Done"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
