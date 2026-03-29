"use client";
import { useState, useEffect } from "react";
import { Plus, Scale, ChevronDown, ChevronUp, Clock, Dumbbell, Zap } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  mockBodyMetrics, mockWorkoutHistory, generateHeatmapData,
  WorkoutHistoryEntry, HeatmapDay,
} from "@/lib/mock-data";

// ─── Constants ────────────────────────────────────────────────────────────────

const LBS_TO_KG = 0.453592;

const MUSCLE_COLORS: Record<string, string> = {
  Chest: "#6366f1",
  Back: "#10b981",
  Legs: "#f59e0b",
  Shoulders: "#ec4899",
  Biceps: "#3b82f6",
  Triceps: "#8b5cf6",
  Glutes: "#f97316",
  // German fallbacks
  Brust: "#6366f1",
  Rücken: "#10b981",
  Beine: "#f59e0b",
  Schultern: "#ec4899",
  Bizeps: "#3b82f6",
  Trizeps: "#8b5cf6",
  Gesäß: "#f97316",
};

const PERSONAL_RECORDS = [
  { exercise: "Bench Press", weight: "100 kg", date: "Jan 20, 2025", trend: 85 },
  { exercise: "Squat", weight: "120 kg", date: "Feb 15, 2025", trend: 92 },
  { exercise: "Deadlift", weight: "140 kg", date: "Mar 10, 2025", trend: 100 },
  { exercise: "Shoulder Press", weight: "70 kg", date: "Feb 05, 2025", trend: 75 },
  { exercise: "Pull-up", weight: "+20 kg", date: "Feb 28, 2025", trend: 88 },
];

type Tab = "history" | "body" | "records";

// ─── Components ───────────────────────────────────────────────────────────────

function HeatmapGrid({ data }: { data: HeatmapDay[] }) {
  const intensityColors = ["#1a1a1a", "#4338ca", "#6366f1", "#818cf8"] as const;
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: intensityColors[day.intensity] }}
                title={`${day.date}: ${["Rest", "Light", "Moderate", "Intense"][day.intensity]}`}
                role="img"
                aria-label={`${day.date}: ${["Rest", "Light", "Moderate", "Intense"][day.intensity]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-[#737373]">
        <span>Less</span>
        {intensityColors.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function WorkoutEntryRow({ entry }: { entry: WorkoutHistoryEntry }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-[#2a2a2a] rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 p-4 hover:bg-[#1f1f1f] transition-colors text-left"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366f1]/20 shrink-0">
          <Dumbbell className="h-4 w-4 text-[#6366f1]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#f5f5f5]">{entry.name}</p>
          <p className="text-xs text-[#737373]">{entry.date}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 text-xs text-[#737373]">
            <Clock className="h-3 w-3" /> {entry.durationMin} min
          </div>
          <div className="flex items-center gap-1 text-xs text-[#737373]">
            <Zap className="h-3 w-3" /> {entry.volumeKg.toLocaleString()} kg
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-[#737373]" /> : <ChevronDown className="h-4 w-4 text-[#737373]" />}
        </div>
      </button>
      <div className="flex gap-1.5 px-4 pb-3 flex-wrap">
        {entry.muscleGroups.map((mg) => (
          <span
            key={mg}
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: `${MUSCLE_COLORS[mg] ?? "#6366f1"}20`, color: MUSCLE_COLORS[mg] ?? "#6366f1" }}
          >
            {mg}
          </span>
        ))}
      </div>
      {expanded && (
        <div className="px-4 pb-4 space-y-1.5 border-t border-[#2a2a2a] pt-3">
          {entry.exercises.map((ex) => (
            <div key={ex.name} className="flex items-center justify-between">
              <span className="text-sm text-[#d4d4d4]">{ex.name}</span>
              <Badge variant="secondary" className="text-xs">{ex.sets}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>("history");
  const [unit, setUnit] = useState<"lbs" | "kg">("kg");
  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([]);
  useEffect(() => {
    setMounted(true);
    setHeatmapData(generateHeatmapData());
  }, []);

  const workouts = mockWorkoutHistory;
  const latest = mockBodyMetrics[mockBodyMetrics.length - 1];

  const convertWeight = (lbs: number) =>
    unit === "kg" ? +(lbs * LBS_TO_KG).toFixed(1) : lbs;

  const chartData = mockBodyMetrics.map((m) => ({
    date: m.date.slice(5),
    weight: convertWeight(m.weight),
    bodyFat: m.bodyFat,
  }));

  const displayWeight = convertWeight(latest.weight);
  const weightChange = convertWeight(latest.weight) - convertWeight(mockBodyMetrics[0].weight);
  const bfChange = latest.bodyFat - mockBodyMetrics[0].bodyFat;

  const thisWeek = workouts.filter((w) => {
    const diff = (Date.now() - new Date(w.date).getTime()) / 86400000;
    return diff <= 7;
  });
  const lastWeek = workouts.filter((w) => {
    const diff = (Date.now() - new Date(w.date).getTime()) / 86400000;
    return diff > 7 && diff <= 14;
  });
  const older = workouts.filter((w) => {
    const diff = (Date.now() - new Date(w.date).getTime()) / 86400000;
    return diff > 14;
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: "history", label: "Workout History" },
    { key: "body", label: "Body Metrics" },
    { key: "records", label: "Personal Records" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Progress</h1>
        <p className="text-sm text-[#737373] mt-1">{workouts.length} workouts recorded</p>
      </div>

      {/* Activity heatmap */}
      <Card>
        <CardHeader><CardTitle className="text-base">Activity (12 weeks)</CardTitle></CardHeader>
        <CardContent>
          {heatmapData.length > 0 && <HeatmapGrid data={heatmapData} />}
        </CardContent>
      </Card>

      {/* Tab switcher */}
      <div
        role="tablist"
        aria-label="Progress sections"
        className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2a2a2a]"
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cn(
              "flex-1 py-2 rounded-lg text-xs font-medium transition-colors",
              tab === key ? "bg-[#6366f1] text-white" : "text-[#737373] hover:text-[#f5f5f5]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* History tab */}
      {tab === "history" && (
        <div className="space-y-4">
          {thisWeek.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">This Week</p>
              <div className="space-y-3">{thisWeek.map((w) => <WorkoutEntryRow key={w.id} entry={w} />)}</div>
            </div>
          )}
          {lastWeek.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Last Week</p>
              <div className="space-y-3">{lastWeek.map((w) => <WorkoutEntryRow key={w.id} entry={w} />)}</div>
            </div>
          )}
          {older.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Earlier</p>
              <div className="space-y-3">{older.map((w) => <WorkoutEntryRow key={w.id} entry={w} />)}</div>
            </div>
          )}
          {workouts.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Dumbbell className="h-10 w-10 text-[#2a2a2a]" />
              <p className="text-sm font-medium text-[#737373]">No workouts yet</p>
              <p className="text-xs text-[#404040]">Complete your first workout to see it here.</p>
            </div>
          )}
        </div>
      )}

      {/* Body metrics tab */}
      {tab === "body" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-1">
              {(["lbs", "kg"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    unit === u ? "bg-[#6366f1] text-white" : "text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Log
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="text-center">
              <CardContent className="pt-4">
                <p className="text-xs text-[#737373] mb-1">Weight</p>
                <p className="text-3xl font-bold text-[#f5f5f5]">{displayWeight}</p>
                <p className="text-xs text-[#737373]">{unit}</p>
                <p className={`text-xs mt-1 font-medium ${weightChange < 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                  {weightChange >= 0 ? "+" : ""}{weightChange.toFixed(1)} {unit} since start
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <p className="text-xs text-[#737373] mb-1">Body Fat</p>
                <p className="text-3xl font-bold text-[#10b981]">{latest.bodyFat}</p>
                <p className="text-xs text-[#737373]">%</p>
                <p className={`text-xs mt-1 font-medium ${bfChange < 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                  {bfChange >= 0 ? "+" : ""}{bfChange.toFixed(1)}% since start
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Weight chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Weight Trend</CardTitle>
                <div className="flex items-center gap-1 text-xs text-[#737373]">
                  <Scale className="h-3.5 w-3.5" /> {unit}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {mounted && (
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="date" tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "8px", color: "#f5f5f5" }} />
                    <Area type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} fill="url(#weightGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Body fat chart */}
          <Card>
            <CardHeader><CardTitle className="text-base">Body Fat Trend</CardTitle></CardHeader>
            <CardContent>
              {mounted && (
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="bfGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="date" tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "8px", color: "#f5f5f5" }} />
                    <Area type="monotone" dataKey="bodyFat" stroke="#10b981" strokeWidth={2} fill="url(#bfGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Measurements */}
          <Card>
            <CardHeader><CardTitle className="text-base">Measurements</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Chest", value: latest.chest },
                  { label: "Waist", value: latest.waist },
                  { label: "Hips", value: latest.hips },
                  { label: "Bicep", value: latest.bicep },
                ].map((m) => (
                  <div key={m.label} className="bg-[#242424] rounded-xl p-4 text-center">
                    <p className="text-xs text-[#737373] mb-1">{m.label}</p>
                    <p className="text-xl font-bold text-[#f5f5f5]">{m.value}</p>
                    <p className="text-xs text-[#737373]">in</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Personal records tab */}
      {tab === "records" && (
        <Card>
          <CardHeader><CardTitle className="text-base">Personal Records</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {PERSONAL_RECORDS.map((pr) => (
              <div key={pr.exercise} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#f5f5f5]">{pr.exercise}</span>
                  <span className="text-sm font-bold text-[#6366f1]">{pr.weight}</span>
                </div>
                <div className="w-full bg-[#2a2a2a] rounded-full h-1.5">
                  <div
                    className="bg-[#6366f1] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${pr.trend}%` }}
                    role="progressbar"
                    aria-valuenow={pr.trend}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <p className="text-xs text-[#737373]">{pr.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
