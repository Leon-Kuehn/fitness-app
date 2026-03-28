"use client";
import { format } from "date-fns";
import { Flame, Dumbbell, TrendingUp, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockWorkouts, mockTodayWorkout, weeklyCalories, mockUser } from "@/lib/mock-data";
import Link from "next/link";

export default function DashboardPage() {
  const today = format(new Date(), "EEEE, MMMM d");

  const stats = [
    { label: "Weekly Workouts", value: "3 / 5", sub: "completed", icon: Dumbbell, color: "#6366f1" },
    { label: "Calories Today", value: "1,840", sub: "/ 2,200 kcal", icon: Flame, color: "#f59e0b" },
    { label: "Streak", value: `${mockUser.streak} days`, sub: "keep it up 🔥", icon: TrendingUp, color: "#10b981" },
    { label: "Volume", value: "12,450", sub: "lbs this week", icon: Zap, color: "#6366f1" },
  ];

  const recentWorkouts = mockWorkouts.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Good morning, {mockUser.name} 👋</h1>
          <p className="text-sm text-[#737373] mt-1">{today}</p>
        </div>
        <Badge variant="warning">
          <Flame className="h-3 w-3 mr-1" />
          {mockUser.streak} day streak
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

      {/* Today's Workout */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Today&apos;s Workout</CardTitle>
            <Badge variant="default">{mockTodayWorkout.duration} min</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base font-semibold text-[#f5f5f5] mb-3">{mockTodayWorkout.name}</p>
          <div className="space-y-1.5 mb-4">
            {mockTodayWorkout.exercises.slice(0, 3).map((ex) => (
              <div key={ex.name} className="flex items-center justify-between text-sm">
                <span className="text-[#f5f5f5]">{ex.name}</span>
                <span className="text-[#737373]">{ex.sets.length} sets</span>
              </div>
            ))}
            {mockTodayWorkout.exercises.length > 3 && (
              <p className="text-xs text-[#737373]">+{mockTodayWorkout.exercises.length - 3} more exercises</p>
            )}
          </div>
          <Link href="/workout">
            <Button className="w-full">Start Workout</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Weekly Calorie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyCalories} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8 }}
                  labelStyle={{ color: "#f5f5f5" }}
                  itemStyle={{ color: "#737373" }}
                />
                <Bar dataKey="goal" fill="#2a2a2a" radius={[4, 4, 0, 0]} name="Goal" />
                <Bar dataKey="calories" fill="#6366f1" radius={[4, 4, 0, 0]} name="Calories" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Workouts</CardTitle>
            <Link href="/workout">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#f5f5f5]">{workout.name}</p>
                  <p className="text-xs text-[#737373]">{workout.date} &middot; {workout.duration} min</p>
                </div>
                <Badge variant="accent">{workout.exercises.length} exercises</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/plans">
          <Button variant="secondary" className="w-full">View Plans</Button>
        </Link>
        <Link href="/nutrition">
          <Button variant="secondary" className="w-full">Log Nutrition</Button>
        </Link>
        <Link href="/metrics">
          <Button variant="secondary" className="w-full">Track Weight</Button>
        </Link>
      </div>
    </div>
  );
}
