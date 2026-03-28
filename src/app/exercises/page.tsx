"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockExercises } from "@/lib/mock-data";

const muscleGroups = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

const difficultyColors = ["#10b981", "#f59e0b", "#ef4444"];

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  const filtered = mockExercises.filter((ex) => {
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(search.toLowerCase());
    const matchGroup = selectedGroup === "All" || ex.muscleGroup === selectedGroup;
    return matchSearch && matchGroup;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Exercise Library</h1>
        <p className="text-sm text-[#737373] mt-1">{mockExercises.length} exercises available</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] pl-9 pr-4 py-2.5 text-sm text-[#f5f5f5] placeholder:text-[#737373] outline-none focus:border-[#6366f1] transition-colors"
        />
      </div>

      {/* Filter chips */}
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

      {/* Exercise Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((exercise) => (
          <Card key={exercise.id}>
            <CardContent>
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-[#f5f5f5]">{exercise.name}</p>
                <div className="flex gap-0.5 ml-2 shrink-0">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: i < exercise.difficulty
                          ? difficultyColors[Math.min(exercise.difficulty - 1, 2)]
                          : "#2a2a2a",
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#737373] mb-3 line-clamp-2">{exercise.description}</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="default">{exercise.muscleGroup}</Badge>
                <Badge variant="muted">{exercise.equipment}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 py-12 text-center text-[#737373]">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No exercises found</p>
          </div>
        )}
      </div>
    </div>
  );
}
