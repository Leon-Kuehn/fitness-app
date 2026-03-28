"use client";
import { useState } from "react";
import { Search, Dumbbell, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockExercises } from "@/lib/mock-data";

const muscleGroups = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];
const difficultyLevels = ["All", "Easy", "Medium", "Hard", "Expert"] as const;

const difficultyMap: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: "Easy", color: "#10b981", bg: "#10b98115" },
  2: { label: "Medium", color: "#f59e0b", bg: "#f59e0b15" },
  3: { label: "Hard", color: "#ef4444", bg: "#ef444415" },
  4: { label: "Expert", color: "#8b5cf6", bg: "#8b5cf615" },
};

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockExercises.filter((ex) => {
    const matchSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(search.toLowerCase());
    const matchGroup = selectedGroup === "All" || ex.muscleGroup === selectedGroup;
    const diffLabel = difficultyMap[ex.difficulty]?.label ?? "";
    const matchDiff = selectedDifficulty === "All" || diffLabel === selectedDifficulty;
    return matchSearch && matchGroup && matchDiff;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Exercise Library</h1>
        <p className="text-sm text-[#737373] mt-1">{filtered.length} of {mockExercises.length} exercises</p>
      </div>

      {/* Search + Filter toggle */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] pl-9 pr-4 py-2.5 text-sm text-[#f5f5f5] placeholder:text-[#737373] outline-none focus:border-[#6366f1] transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters((f) => !f)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
            showFilters ? "bg-[#6366f1] border-[#6366f1] text-white" : "bg-[#1a1a1a] border-[#2a2a2a] text-[#737373] hover:text-[#f5f5f5]"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Muscle group chips */}
      <div className="flex flex-wrap gap-2">
        {muscleGroups.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedGroup === group
                ? "bg-[#6366f1] text-white"
                : "bg-[#1a1a1a] border border-[#2a2a2a] text-[#737373] hover:text-[#f5f5f5]"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Difficulty filter (collapsible) */}
      {showFilters && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#737373] uppercase tracking-wide">Difficulty</p>
          <div className="flex gap-2">
            {difficultyLevels.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                  selectedDifficulty === d
                    ? "bg-[#6366f1] border-[#6366f1] text-white"
                    : "bg-[#1a1a1a] border-[#2a2a2a] text-[#737373] hover:text-[#f5f5f5]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((exercise) => {
          const diff = difficultyMap[exercise.difficulty] ?? { label: "?", color: "#737373", bg: "#73737315" };
          return (
            <Card key={exercise.name} className="hover:border-[#6366f130] transition-colors cursor-pointer">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f120]">
                      <Dumbbell className="h-4 w-4 text-[#6366f1]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f5f5f5]">{exercise.name}</p>
                      <p className="text-xs text-[#737373]">{exercise.muscleGroup}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ color: diff.color, backgroundColor: diff.bg }}
                  >
                    {diff.label}
                  </span>
                </div>
                <p className="text-xs text-[#737373] mb-3 line-clamp-2">{exercise.description}</p>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="text-xs">{exercise.muscleGroup}</Badge>
                  <Badge variant="outline" className="text-xs">{exercise.equipment}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-[#737373]">
            <Dumbbell className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No exercises found</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
