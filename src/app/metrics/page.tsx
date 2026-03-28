"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockBodyMetrics } from "@/lib/mock-data";

export default function MetricsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const latest = mockBodyMetrics[mockBodyMetrics.length - 1];
  const chartData = mockBodyMetrics.map((m) => ({
    date: m.date.slice(5),
    weight: m.weight,
    bodyFat: m.bodyFat,
  }));

  const measurements = [
    { label: "Chest", value: latest.chest, unit: "in" },
    { label: "Waist", value: latest.waist, unit: "in" },
    { label: "Hips", value: latest.hips, unit: "in" },
    { label: "Bicep", value: latest.bicep, unit: "in" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">Body Metrics</h1>
          <p className="text-sm text-[#737373] mt-1">Track your progress over time</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Log Measurement
        </Button>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center">
          <CardContent>
            <p className="text-xs text-[#737373] mb-1">Current Weight</p>
            <p className="text-3xl font-bold text-[#f5f5f5]">{latest.weight}</p>
            <p className="text-xs text-[#737373]">lbs</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent>
            <p className="text-xs text-[#737373] mb-1">Body Fat</p>
            <p className="text-3xl font-bold text-[#10b981]">{latest.bodyFat}</p>
            <p className="text-xs text-[#737373]">%</p>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Trend (30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 200 }}>
            {mounted && <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#737373", fontSize: 10 }} axisLine={false} tickLine={false} interval={6} />
                <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8 }}
                  labelStyle={{ color: "#f5f5f5" }}
                  itemStyle={{ color: "#6366f1" }}
                />
                <Area type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} fill="url(#weightGrad)" name="Weight (lbs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Body Fat Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Body Fat Trend (30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#737373", fontSize: 10 }} axisLine={false} tickLine={false} interval={6} />
                <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8 }}
                  labelStyle={{ color: "#f5f5f5" }}
                  itemStyle={{ color: "#10b981" }}
                />
                <Area type="monotone" dataKey="bodyFat" stroke="#10b981" strokeWidth={2} fill="url(#fatGrad)" name="Body Fat (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Measurements */}
      <Card>
        <CardHeader>
          <CardTitle>Measurements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {measurements.map((m) => (
              <div key={m.label} className="rounded-lg bg-[#242424] p-3 text-center">
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
