"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Dumbbell,
  UtensilsCrossed,
  TrendingUp,
  Clock,
  ChevronRight,
  Zap,
  Calendar,
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
  mockPlans,
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
  const weeklyWorkouts = getWeeklyWorkoutCount();
  const activePlan = mockPlans[0];
  const recentWorkouts = mockWorkouts.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">
          {mounted ? `${greeting}, ${userName.split(" ")[0]}!` : "\u00A0"}
        </h1>
        <p className="text-sm text-[#737373] mt-1">
          {mounted ? format(now, "EEEE, MMMM d", { locale }) : "\u00A0"}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Streak */}
        <Card className="flex flex-col items-center justify-center py-4 gap-1">
          <Flame className="h-5 w-5 text-[#f59e0b]" />
          <span className="text-2xl font-bold text-[#f5f5f5]">{mockUser.streak}</span>
          <span className="text-xs text-[#737373]">{isDE ? "Tage Streak" : "Day Streak"}</span>
        </Card>

        {/* Today's Calories */}
        <Card className="flex flex-col items-center justify-center py-4 gap-1">
          <UtensilsCrossed className="h-5 w-5 text-[#10b981]" />
          <span className="text-2xl font-bold text-[#f5f5f5]">{today.calories}</span>
          <span className="text-xs text-[#737373]">{isDE ? "kcal heute" : "kcal today"}</span>
        </Card>

        {/* Weekly Workouts */}
        <Card className="flex flex-col items-center justify-center py-4 gap-1">
          <TrendingUp className="h-5 w-5 text-[#6366f1]" />
          <span className="text-2xl font-bold text-[#f5f5f5]">{weeklyWorkouts}</span>
          <span className="text-xs text-[#737373]">{isDE ? "Workouts/Woche" : "Workouts/week"}</span>
        </Card>
      </div>

      {/* Today's Workout */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{isDE ? "Heutiges Workout" : "Today's Workout"}</CardTitle>
            <Badge variant="secondary" className="text-[#f59e0b] border-[#f59e0b]">
              {isDE ? "Geplant" : "Planned"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium text-[#f5f5f5]">{mockTodayWorkout.name}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#737373]">
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
              <Button size="sm" className="gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                {isDE ? "Starten" : "Start"}
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {mockTodayWorkout.exercises.map((ex) => (
              <Badge key={ex.name} variant="outline" className="text-xs">
                {ex.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/workout" className="block cursor-pointer">
          <Card className="flex items-center gap-3 hover:border-[#6366f1]/50 transition-colors">
            <div className="rounded-lg bg-[#6366f1]/20 p-2.5">
              <Dumbbell className="h-5 w-5 text-[#6366f1]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#f5f5f5]">
                {isDE ? "Workout starten" : "Start Workout"}
              </p>
              <p className="text-xs text-[#737373]">
                {isDE ? "Jetzt trainieren" : "Train now"}
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/nutrition" className="block cursor-pointer">
          <Card className="flex items-center gap-3 hover:border-[#10b981]/50 transition-colors">
            <div className="rounded-lg bg-[#10b981]/20 p-2.5">
              <UtensilsCrossed className="h-5 w-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#f5f5f5]">
                {isDE ? "Ernährungsplan" : "Nutrition Plan"}
              </p>
              <p className="text-xs text-[#737373]">
                {isDE ? "Kalorien tracken" : "Track calories"}
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/plans" className="block cursor-pointer">
          <Card className="flex items-center gap-3 hover:border-[#f59e0b]/50 transition-colors">
            <div className="rounded-lg bg-[#f59e0b]/20 p-2.5">
              <Calendar className="h-5 w-5 text-[#f59e0b]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#f5f5f5]">
                {isDE ? "Aktiver Plan" : "Active Plan"}
              </p>
              <p className="text-xs text-[#737373]">{activePlan.name}</p>
            </div>
          </Card>
        </Link>

        <Link href="/progress" className="block cursor-pointer">
          <Card className="flex items-center gap-3 hover:border-[#a855f7]/50 transition-colors">
            <div className="rounded-lg bg-[#a855f7]/20 p-2.5">
              <TrendingUp className="h-5 w-5 text-[#a855f7]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#f5f5f5]">
                {isDE ? "Fortschritt" : "Progress"}
              </p>
              <p className="text-xs text-[#737373]">
                {isDE ? "Statistiken" : "View stats"}
              </p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{isDE ? "Letzte Workouts" : "Recent Workouts"}</CardTitle>
            <Link href="/workout" className="flex items-center gap-0.5 text-xs text-[#6366f1] hover:text-[#4f46e5] transition-colors">
              {isDE ? "Alle anzeigen" : "View all"}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex items-center justify-between py-2 border-b border-[#1f2937] last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-[#f5f5f5]">{workout.name}</p>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-[#737373]">
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
                <Badge variant="secondary" className="text-xs text-[#10b981] border-[#10b981]">
                  {isDE ? "Abgeschlossen" : "Done"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
