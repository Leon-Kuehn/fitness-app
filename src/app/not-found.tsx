"use client";
import { useState } from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft, Zap } from "lucide-react";

const FITNESS_TIPS = [
  "Stay hydrated: drink 2–3 liters of water daily, especially on training days.",
  "Progressive overload is the key to continuous strength gains.",
  "Sleep is your best supplement: 7–9 hours per night optimizes recovery.",
  "Compound exercises like squats and deadlifts activate more muscle groups simultaneously.",
  "Consistency beats intensity: 3×30 min per week beats one 3-hour session.",
];

export default function NotFoundPage() {
  const [tip] = useState(() => FITNESS_TIPS[Math.floor(Math.random() * FITNESS_TIPS.length)]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6366f1]/15 mb-6">
        <Dumbbell className="h-8 w-8 text-[#6366f1]" />
      </div>

      <p className="text-8xl font-black text-[#6366f1] mb-4 leading-none">404</p>

      <h1 className="text-xl font-bold text-[#f5f5f5] mb-2">Page not found</h1>
      <p className="text-sm text-[#737373] max-w-sm mb-8">
        This page doesn&apos;t exist. You may have mistyped the URL or the link is outdated.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl transition-colors mb-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="w-full max-w-sm p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-left">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-[#f59e0b]" />
          <span className="text-xs font-semibold text-[#f59e0b]">Fitness tip of the day</span>
        </div>
        <p className="text-xs text-[#a3a3a3] leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}
