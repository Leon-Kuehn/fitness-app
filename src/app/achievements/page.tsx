"use client";
import { useState } from "react";
import { Trophy, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAchievements, Achievement } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<Achievement["category"], string> = {
  workout: "🏋️ Workout",
  streak: "🔥 Streaks",
  nutrition: "🥗 Ernährung",
  strength: "💪 Kraft",
  gym: "🗺️ Gym",
  ai: "🤖 KI",
};

const XP_TOTAL = mockAchievements.filter((a) => a.unlocked).reduce((s, a) => s + a.xpReward, 0);
const XP_NEXT_LEVEL = 1200;
const CURRENT_LEVEL = 7;

type FilterTab = "Alle" | "Freigeschaltet" | "Gesperrt";
type CategoryFilter = "Alle" | Achievement["category"];

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <Card className={cn("transition-all", !achievement.unlocked && "opacity-60")}>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <span className="text-3xl">{achievement.icon}</span>
          <div className="flex flex-col items-end gap-1">
            <Badge variant={achievement.unlocked ? "default" : "secondary"} className="text-xs">
              +{achievement.xpReward} XP
            </Badge>
            {!achievement.unlocked && <Lock className="h-3.5 w-3.5 text-[#737373]" />}
          </div>
        </div>
        <div>
          <p className={cn("font-semibold text-sm", achievement.unlocked ? "text-[#f5f5f5]" : "text-[#737373]")}>
            {achievement.name}
          </p>
          <p className="text-xs text-[#737373] mt-0.5">{achievement.description}</p>
        </div>
        {achievement.unlocked && achievement.unlockedDate ? (
          <p className="text-xs text-[#10b981]">✓ Freigeschaltet am {achievement.unlockedDate}</p>
        ) : (
          <p className="text-xs text-[#737373] italic">{achievement.unlockHint}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function AchievementsPage() {
  const [filterTab, setFilterTab] = useState<FilterTab>("Alle");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Alle");

  const unlocked = mockAchievements.filter((a) => a.unlocked).length;
  const total = mockAchievements.length;

  const filtered = mockAchievements.filter((a) => {
    const tabMatch =
      filterTab === "Alle" ? true : filterTab === "Freigeschaltet" ? a.unlocked : !a.unlocked;
    const catMatch = categoryFilter === "Alle" || a.category === categoryFilter;
    return tabMatch && catMatch;
  });

  const categories: CategoryFilter[] = ["Alle", "workout", "streak", "nutrition", "strength", "gym", "ai"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f59e0b]/20">
          <Trophy className="h-5 w-5 text-[#f59e0b]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Deine Erfolge</h1>
          <p className="text-sm text-[#737373]">{unlocked} von {total} Abzeichen freigeschaltet</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Gesamt XP", value: `${XP_TOTAL} XP`, color: "#f59e0b" },
          { label: "Level", value: `Level ${CURRENT_LEVEL}`, color: "#6366f1" },
          { label: "Freigeschaltet", value: `${unlocked} / ${total}`, color: "#10b981" },
          { label: "Nächstes Ziel", value: `${XP_NEXT_LEVEL - XP_TOTAL} XP fehlen`, color: "#ec4899" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3">
              <p className="text-xs text-[#737373]">{stat.label}</p>
              <p className="text-lg font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* XP Progress */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#f5f5f5] font-medium">Level {CURRENT_LEVEL}</span>
            <span className="text-[#737373]">{XP_TOTAL} / {XP_NEXT_LEVEL} XP</span>
          </div>
          <div className="w-full bg-[#2a2a2a] rounded-full h-2.5">
            <div
              className="bg-[#6366f1] h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${(XP_TOTAL / XP_NEXT_LEVEL) * 100}%` }}
            />
          </div>
          <p className="text-xs text-[#737373]">{XP_NEXT_LEVEL - XP_TOTAL} XP bis Level {CURRENT_LEVEL + 1}</p>
        </CardContent>
      </Card>

      {/* Filter tabs */}
      <div className="flex gap-2 border-b border-[#2a2a2a] pb-0">
        {(["Alle", "Freigeschaltet", "Gesperrt"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
              filterTab === tab
                ? "border-[#6366f1] text-[#6366f1]"
                : "border-transparent text-[#737373] hover:text-[#f5f5f5]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              "shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              categoryFilter === cat
                ? "bg-[#6366f1] text-white border-[#6366f1]"
                : "bg-[#1a1a1a] text-[#737373] border-[#2a2a2a] hover:text-[#f5f5f5]"
            )}
          >
            {cat === "Alle" ? "Alle" : CATEGORY_LABELS[cat as Achievement["category"]]}
          </button>
        ))}
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
