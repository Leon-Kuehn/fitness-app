"use client";
import { NotificationPermission } from "@/components/ui/NotificationPermission";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Flame, Dumbbell, TrendingUp, Zap, Play, ChevronRight, Target, Award, MapPin, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockWorkouts, mockTodayWorkout, weeklyCalories, mockUser } from "@/lib/mock-data";
import Link from "next/link";

function CalorieRing({ consumed, goal }: { consumed: number; goal: number }) {
  const pct = Math.min(consumed / goal, 1);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#1f2937" strokeWidth="12" />
        <circle
          cx="64" cy="64" r={r} fill="none"
          stroke="#f59e0b" strokeWidth="12"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 64 64)"
        />
        <text x="64" y="58" textAnchor="middle" fill="#f5f5f5" fontSize="20" fontWeight="bold">{consumed.toLocaleString()}</text>
        <text x="64" y="76" textAnchor="middle" fill="#737373" fontSize="11">/ {goal.toLocaleString()} kcal</text>
      </svg>
      <p className="text-xs text-[#737373] mt-1">Calories Today</p>
    </div>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const today = format(new Date(), "EEEE, MMMM d");
  const greeting = mounted ? getGreeting() : "Welcome back";

  const caloriesConsumed = 1840;
  const caloriesGoal = 2200;
  const remaining = caloriesGoal - caloriesConsumed;

  const stats = [
    { label: "Weekly Workouts", value: "3 / 5", sub: "completed", icon: Dumbbell, color: "#6366f1" },
    { label: "Streak", value: `${mockUser.streak} days`, sub: "keep it up 🔥", icon: TrendingUp, color: "#10b981" },
    { label: "Volume", value: "12,450", sub: "lbs this week", icon: Zap, color: "#6366f1" },
    { label: "Goal Progress", value: "68%", sub: "of monthly goal", icon: Target, color: "#ec4899" },
  ];

  const recentWorkouts = mockWorkouts.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">{greeting}, {mockUser.name} 👋</h1>
          <p className="text-sm text-[#737373] mt-1">{today}</p>
        </div>
        <Badge variant="warning" className="flex items-center gap-1">
          <Flame className="h-3 w-3 mr-1" />
          {mockUser.streak} day streak
        </Badge>
      </div>

      {/* Calorie Ring + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center py-6">
          <CalorieRing consumed={caloriesConsumed} goal={caloriesGoal} />
          <div className="flex gap-6 mt-4 text-center">
            <div>
              <p className="text-lg font-bold text-[#10b981]">{remaining}</p>
              <p className="text-xs text-[#737373]">remaining</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#ef4444]">320</p>
              <p className="text-xs text-[#737373]">burned</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737373]">{stat.label}</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="h-3.5 w-3.5" style={{ color: stat.color }} />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold text-[#f5f5f5]">{stat.value}</p>
                  <p className="text-xs text-[#737373]">{stat.sub}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Today's Workout */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Today&apos;s Workout</CardTitle>
          <Badge variant="outline">{mockTodayWorkout.duration} min</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-semibold text-[#f5f5f5]">{mockTodayWorkout.name}</p>
          <div className="space-y-2">
            {mockTodayWorkout.exercises.slice(0, 3).map((ex) => (
              <div key={ex.name} className="flex items-center justify-between py-1.5 border-b border-[#1f2937]">
                <span className="text-sm text-[#d4d4d4]">{ex.name}</span>
                <Badge variant="secondary">{ex.sets.length} sets</Badge>
              </div>
            ))}
            {mockTodayWorkout.exercises.length > 3 && (
              <p className="text-xs text-[#737373]">+{mockTodayWorkout.exercises.length - 3} more exercises</p>
            )}
          </div>
          <Link href="/workout">
            <Button className="w-full mt-2 gap-2">
              <Play className="h-4 w-4" />
              Start Workout
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Weekly Calorie Chart */}
      <Card>
        <CardHeader><CardTitle className="text-base">Weekly Calories</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyCalories} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "8px", color: "#f5f5f5" }} />
              <Bar dataKey="calories" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Recent Workouts</CardTitle>
          <Link href="/workout" className="text-xs text-[#6366f1] hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentWorkouts.map((workout) => (
            <div key={workout.name} className="flex items-center justify-between py-2 border-b border-[#1f2937] last:border-0">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f120]">
                  <Dumbbell className="h-4 w-4 text-[#6366f1]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#f5f5f5]">{workout.name}</p>
                  <p className="text-xs text-[#737373]">{workout.date} · {workout.duration} min</p>
                </div>
              </div>
              <Badge variant="secondary">{workout.exercises.length} exercises</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/plans">
          <Button variant="outline" className="w-full gap-2">
            <Award className="h-4 w-4" /> View Plans
          </Button>
        </Link>
        <Link href="/nutrition">
          <Button variant="outline" className="w-full gap-2">
            <Flame className="h-4 w-4" /> Log Nutrition
          </Button>
        </Link>
        <Link href="/metrics">
          <Button variant="outline" className="w-full gap-2">
            <TrendingUp className="h-4 w-4" /> Track Weight
          </Button>
        </Link>
      </div>

      {/* Notification Permission */}
      <NotificationPermission />

      {/* Schnellzugriff */}
      <div>
        <h2 className="text-base font-semibold text-[#f5f5f5] mb-3">Schnellzugriff</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/workout", icon: Dumbbell, label: "Training starten", color: "#6366f1" },
            { href: "/gyms", icon: MapPin, label: "Gymfinder", color: "#10b981" },
            { href: "/ai", icon: Sparkles, label: "KI-Coach", color: "#f59e0b" },
            { href: "/nutrition", icon: Flame, label: "Ernährung", color: "#ec4899" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="flex flex-col items-center gap-2 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-[#6366f1]/50 hover:scale-[1.02] transition-all cursor-pointer text-center"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-medium text-[#d4d4d4]">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
