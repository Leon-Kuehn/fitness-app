"use client";
import { format } from "date-fns";
import { Plus, Utensils } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockNutritionDays, weeklyCalories } from "@/lib/mock-data";

export default function NutritionPage() {
  const today = mockNutritionDays[0];
  const macros = [
    { label: "Calories", value: today.calories, goal: today.goal.calories, unit: "kcal", color: "#6366f1" },
    { label: "Protein", value: today.protein, goal: today.goal.protein, unit: "g", color: "#10b981" },
    { label: "Carbs", value: today.carbs, goal: today.goal.carbs, unit: "g", color: "#f59e0b" },
    { label: "Fat", value: today.fat, goal: today.goal.fat, unit: "g", color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Nutrition</h1>
          <p className="text-sm text-[#737373] mt-1">{format(new Date(), "EEEE, MMMM d")}</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Log Meal
        </Button>
      </div>

      {/* Today Macros */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Macros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {macros.map((macro) => (
              <div key={macro.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737373]">{macro.label}</span>
                  <span className="text-xs font-medium text-[#f5f5f5]">{macro.value} / {macro.goal} {macro.unit}</span>
                </div>
                <Progress value={macro.value} max={macro.goal} color={macro.color} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meals */}
      <Card>
        <CardHeader>
          <CardTitle>Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {today.meals.map((meal) => (
              <div key={meal.name} className="rounded-lg bg-[#242424] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-3.5 w-3.5 text-[#6366f1]" />
                    <span className="text-sm font-medium text-[#f5f5f5]">{meal.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#f5f5f5]">{meal.calories} kcal</span>
                </div>
                <div className="flex gap-3 text-xs text-[#737373]">
                  <span>P: <span className="text-[#10b981]">{meal.protein}g</span></span>
                  <span>C: <span className="text-[#f59e0b]">{meal.carbs}g</span></span>
                  <span>F: <span className="text-[#ef4444]">{meal.fat}g</span></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyCalories}>
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
    </div>
  );
}
