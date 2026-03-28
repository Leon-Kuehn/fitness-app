"use client";
import { format } from "date-fns";
import { Plus, Utensils, Flame, Beef, Wheat, Droplets } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockNutritionDays, weeklyCalories } from "@/lib/mock-data";

function MacroBar({ label, value, goal, color, icon: Icon }: {
  label: string; value: number; goal: number; color: string; icon: React.ElementType;
}) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5" style={{ color }} />
          <span className="text-xs font-medium text-[#d4d4d4]">{label}</span>
        </div>
        <span className="text-xs text-[#737373]">{value} / {goal}{label === "Calories" ? " kcal" : "g"}</span>
      </div>
      <div className="h-2 bg-[#1f2937] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function NutritionPage() {
  const today = mockNutritionDays[0];

  const macros = [
    { label: "Calories", value: today.calories, goal: today.goal.calories, color: "#6366f1", icon: Flame },
    { label: "Protein", value: today.protein, goal: today.goal.protein, color: "#10b981", icon: Beef },
    { label: "Carbs", value: today.carbs, goal: today.goal.carbs, color: "#f59e0b", icon: Wheat },
    { label: "Fat", value: today.fat, goal: today.goal.fat, color: "#ef4444", icon: Droplets },
  ];

  const caloriesPct = Math.round((today.calories / today.goal.calories) * 100);
  const remaining = today.goal.calories - today.calories;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Nutrition</h1>
          <p className="text-sm text-[#737373] mt-1">{format(new Date(), "EEEE, MMMM d")}</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Log Meal
        </Button>
      </div>

      {/* Calorie Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-[#737373] mb-1">Consumed</p>
            <p className="text-2xl font-bold text-[#6366f1]">{today.calories}</p>
            <p className="text-xs text-[#737373]">kcal</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-[#737373] mb-1">Remaining</p>
            <p className={`text-2xl font-bold ${remaining >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>{Math.abs(remaining)}</p>
            <p className="text-xs text-[#737373]">kcal</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-[#737373] mb-1">Goal</p>
            <p className="text-2xl font-bold text-[#f5f5f5]">{today.goal.calories}</p>
            <p className="text-xs text-[#737373]">kcal</p>
          </CardContent>
        </Card>
      </div>

      {/* Macros */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Today&apos;s Macros</CardTitle>
            <span className="text-xs text-[#737373]">{caloriesPct}% of goal</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {macros.map((m) => (
            <MacroBar key={m.label} {...m} />
          ))}
        </CardContent>
      </Card>

      {/* Meals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Meals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {today.meals.map((meal) => (
            <div key={meal.name} className="flex items-center justify-between p-3 rounded-xl border border-[#1f2937] hover:border-[#2a2a2a] transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6366f120]">
                  <Utensils className="h-4 w-4 text-[#6366f1]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#f5f5f5]">{meal.name}</p>
                  <p className="text-xs text-[#737373]">
                    P: {meal.protein}g &middot; C: {meal.carbs}g &middot; F: {meal.fat}g
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#f5f5f5]">{meal.calories}</p>
                <p className="text-xs text-[#737373]">kcal</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Chart */}
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
    </div>
  );
}
