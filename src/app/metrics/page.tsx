"use client";
import { useState, useEffect } from "react";
import { Plus, Scale } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockBodyMetrics } from "@/lib/mock-data";

const LBS_TO_KG = 0.453592;

export default function MetricsPage() {
  const [mounted, setMounted] = useState(false);
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");
  useEffect(() => setMounted(true), []);

  const latest = mockBodyMetrics[mockBodyMetrics.length - 1];

  const convertWeight = (lbs: number) =>
    unit === "kg" ? +(lbs * LBS_TO_KG).toFixed(1) : lbs;

  const chartData = mockBodyMetrics.map((m) => ({
    date: m.date.slice(5),
    weight: convertWeight(m.weight),
    bodyFat: m.bodyFat,
  }));

  const measurements = [
    { label: "Chest", value: latest.chest, unit: "in" },
    { label: "Waist", value: latest.waist, unit: "in" },
    { label: "Hips", value: latest.hips, unit: "in" },
    { label: "Bicep", value: latest.bicep, unit: "in" },
  ];

  const displayWeight = convertWeight(latest.weight);

  const weightChange = convertWeight(latest.weight) - convertWeight(mockBodyMetrics[0].weight);
  const bfChange = latest.bodyFat - mockBodyMetrics[0].bodyFat;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Body Metrics</h1>
          <p className="text-sm text-[#737373] mt-1">Track your progress over time</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Unit Toggle */}
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
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center">
          <CardContent className="pt-4">
            <p className="text-xs text-[#737373] mb-1">Current Weight</p>
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

      {/* Weight Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Weight Trend (30 days)</CardTitle>
            <div className="flex items-center gap-1 text-xs text-[#737373]">
              <Scale className="h-3.5 w-3.5" />
              {unit}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {mounted && (
            <ResponsiveContainer width="100%" height={180}>
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
                <Area type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} fill={"url(#weightGrad)"} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Body Fat Chart */}
      <Card>
        <CardHeader><CardTitle className="text-base">Body Fat Trend (30 days)</CardTitle></CardHeader>
        <CardContent>
          {mounted && (
            <ResponsiveContainer width="100%" height={180}>
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
                <Area type="monotone" dataKey="bodyFat" stroke="#10b981" strokeWidth={2} fill={"url(#bfGrad)"} dot={false} />
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
            {measurements.map((m) => (
              <div key={m.label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-center">
                <p className="text-xs text-[#737373] mb-1">{m.label}</p>
                <p className="text-xl font-bold text-[#f5f5f5]">{m.value}</p>
                <p className="text-xs text-[#737373]">{m.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
