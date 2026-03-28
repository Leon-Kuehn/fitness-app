"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Clock, Dumbbell, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockWorkoutHistory, generateHeatmapData, WorkoutHistoryEntry, HeatmapDay } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const MUSCLE_COLORS: Record<string, string> = {
  Brust: "#6366f1",
  Rücken: "#10b981",
  Beine: "#f59e0b",
  Schultern: "#ec4899",
  Bizeps: "#3b82f6",
  Trizeps: "#8b5cf6",
  Gesäß: "#f97316",
};

const PERSONAL_RECORDS = [
  { exercise: "Bankdrücken", weight: "100 kg", date: "20.01.2025", trend: 85 },
  { exercise: "Kniebeuge", weight: "120 kg", date: "15.02.2025", trend: 92 },
  { exercise: "Kreuzheben", weight: "140 kg", date: "10.03.2025", trend: 100 },
  { exercise: "Schulterdrücken", weight: "70 kg", date: "05.02.2025", trend: 75 },
  { exercise: "Klimmzüge", weight: "+20 kg", date: "28.02.2025", trend: 88 },
];

function HeatmapGrid({ data }: { data: HeatmapDay[] }) {
  const intensityColors = [
    "#1a1a1a",
    "#4338ca",
    "#6366f1",
    "#818cf8",
  ] as const;

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
                title={`${day.date}: ${["Kein Training", "Leicht", "Mittel", "Intensiv"][day.intensity]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-[#737373]">
        <span>Weniger</span>
        {intensityColors.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span>Mehr</span>
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

type TimeRange = "Letzte Woche" | "Monat" | "3 Monate" | "Jahr" | "Alles";

export default function HistoryPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("Alles");
  const [heatmapData, setHeatmapData] = useState<HeatmapDay[]>([]);
  const TIME_RANGES: TimeRange[] = ["Letzte Woche", "Monat", "3 Monate", "Jahr", "Alles"];

  useEffect(() => {
    setHeatmapData(generateHeatmapData());
  }, []);

  const workouts = mockWorkoutHistory;

  const thisWeek = workouts.filter((w) => {
    const d = new Date(w.date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });
  const lastWeek = workouts.filter((w) => {
    const d = new Date(w.date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 7 && diff <= 14;
  });
  const older = workouts.filter((w) => {
    const d = new Date(w.date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 14;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Trainingsverlauf</h1>
        <p className="text-sm text-[#737373] mt-1">{workouts.length} Workouts aufgezeichnet</p>
      </div>

      {/* Time filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TIME_RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              timeRange === r
                ? "bg-[#6366f1] text-white border-[#6366f1]"
                : "bg-[#1a1a1a] text-[#737373] border-[#2a2a2a] hover:text-[#f5f5f5]"
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Heatmap */}
          <Card>
            <CardHeader><CardTitle className="text-base">Aktivitäts-Übersicht (12 Wochen)</CardTitle></CardHeader>
            <CardContent>
              {heatmapData.length > 0 && <HeatmapGrid data={heatmapData} />}
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="space-y-4">
            {thisWeek.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Diese Woche</p>
                <div className="space-y-3">{thisWeek.map((w) => <WorkoutEntryRow key={w.id} entry={w} />)}</div>
              </div>
            )}
            {lastWeek.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Letzte Woche</p>
                <div className="space-y-3">{lastWeek.map((w) => <WorkoutEntryRow key={w.id} entry={w} />)}</div>
              </div>
            )}
            {older.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#737373] uppercase tracking-wider mb-3">Früher</p>
                <div className="space-y-3">{older.map((w) => <WorkoutEntryRow key={w.id} entry={w} />)}</div>
              </div>
            )}
          </div>
        </div>

        {/* PRs Sidebar */}
        <div className="lg:w-72 shrink-0">
          <Card className="sticky top-6">
            <CardHeader><CardTitle className="text-base">🏆 Persönliche Rekorde</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {PERSONAL_RECORDS.map((pr) => (
                <div key={pr.exercise} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#f5f5f5]">{pr.exercise}</span>
                    <span className="text-sm font-bold text-[#6366f1]">{pr.weight}</span>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-full h-1.5">
                    <div
                      className="bg-[#6366f1] h-1.5 rounded-full"
                      style={{ width: `${pr.trend}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#737373]">{pr.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
