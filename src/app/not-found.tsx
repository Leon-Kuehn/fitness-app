"use client";
import { useState } from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft, Zap } from "lucide-react";

const FITNESS_TIPS = [
  "Trinke täglich mindestens 2–3 Liter Wasser, besonders an Trainingstagen.",
  "Progressives Overloading ist das Geheimnis kontinuierlicher Kraftzuwächse.",
  "Schlaf ist dein bestes Supplement: 7–9 Stunden pro Nacht optimieren die Regeneration.",
  "Compound-Übungen wie Kniebeuge und Kreuzheben aktivieren mehr Muskeln gleichzeitig.",
  "Regelmäßigkeit schlägt Intensität: 3×30 Min. pro Woche ist besser als einmal 3 Stunden.",
];

export default function NotFoundPage() {
  const [tip] = useState(() => FITNESS_TIPS[Math.floor(Math.random() * FITNESS_TIPS.length)]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6366f1]/15 mb-6">
        <Dumbbell className="h-8 w-8 text-[#6366f1]" />
      </div>

      <p className="text-8xl font-black text-[#6366f1] mb-4 leading-none">404</p>

      <h1 className="text-xl font-bold text-[#f5f5f5] mb-2">Seite nicht gefunden</h1>
      <p className="text-sm text-[#737373] max-w-sm mb-8">
        Diese Seite existiert leider nicht. Vielleicht hast du dich vertippt oder der Link ist veraltet.
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl transition-colors mb-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zum Dashboard
      </Link>

      <div className="w-full max-w-sm p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-left">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-[#f59e0b]" />
          <span className="text-xs font-semibold text-[#f59e0b]">Fitness-Tipp des Tages</span>
        </div>
        <p className="text-xs text-[#a3a3a3] leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}
