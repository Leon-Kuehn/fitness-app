"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Plus, Utensils, Flame, Beef, Wheat, Droplets, LucideIcon, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockNutritionDays, weeklyCalories } from "@/lib/mock-data";

function MacroBar({ label, value, goal, color, icon: Icon }: {
  label: string; value: number; goal: number; color: string; icon: LucideIcon;
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
  const [showLogModal, setShowLogModal] = useState(false);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const macros = [
    { label: "Calories", value: today.calories, goal: today.goal.calories, color: "#6366f1", icon: Flame },
    { label: "Protein", value: today.protein, goal: today.goal.protein, color: "#10b981", icon: Beef },
    { label: "Carbs", value: today.carbs, goal: today.goal.carbs, color: "#f59e0b", icon: Wheat },
    { label: "Fat", value: today.fat, goal: today.goal.fat, color: "#ef4444", icon: Droplets },
  ];

  const caloriesPct = Math.round((today.calories / today.goal.calories) * 100);
  const remaining = today.goal.calories - today.calories;

  function handleLogMeal(e: React.FormEvent) {
    e.preventDefault();
    setShowLogModal(false);
    setMealName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Nutrition</h1>
          <p className="text-sm text-[#737373] mt-1">{format(new Date(), "EEEE, MMMM d")}</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowLogModal(true)}>
          <Plus className="h-4 w-4" /> Log Meal
        </Button>
      </div>

      {/* Calorie Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-[#737373] mb-1">Consumed</p>
            <p className="text-2xl font-bold text-[#f5f5f5]">{today.calories}</p>
            <p className="text-xs text-[#737373]">kcal</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-[#737373] mb-1">Remaining</p>
            <p className={`text-2xl font-bold ${remaining >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
              {Math.abs(remaining)}
            </p>
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
            <div key={meal.name} className="flex items-center justify-between py-2 border-b border-[#1f2937] last:border-0">
              <div>
                <p className="text-sm font-medium text-[#f5f5f5]">{meal.name}</p>
                <p className="text-xs text-[#737373]">P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g</p>
              </div>
              <span className="text-sm font-semibold text-[#f5f5f5]">{meal.calories} kcal</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Weekly Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyCalories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: 8 }}
                labelStyle={{ color: "#f5f5f5" }}
                itemStyle={{ color: "#6366f1" }}
              />
              <Bar dataKey="calories" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Log Meal Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#111827] border border-[#1f2937] rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#f5f5f5]">Log Meal</h2>
              <button onClick={() => setShowLogModal(false)} className="text-[#737373] hover:text-[#f5f5f5] transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleLogMeal} className="space-y-3">
              <div>
                <label className="text-xs text-[#737373] mb-1 block">Meal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Breakfast"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#4b5563] focus:outline-none focus:border-[#6366f1]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#737373] mb-1 block">Calories (kcal)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#4b5563] focus:outline-none focus:border-[#6366f1]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-[#737373] mb-1 block">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#4b5563] focus:outline-none focus:border-[#6366f1]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#737373] mb-1 block">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#4b5563] focus:outline-none focus:border-[#6366f1]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#737373] mb-1 block">Fat (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#4b5563] focus:outline-none focus:border-[#6366f1]"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowLogModal(false)}>Cancel</Button>
                <Button type="submit" className="flex-1">Log Meal</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
