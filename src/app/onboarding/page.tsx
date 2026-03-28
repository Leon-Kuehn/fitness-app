"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Check, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockGymFinderGyms } from "@/lib/mock-data";

type Goal = "Abnehmen" | "Muskelaufbau" | "Ausdauer" | "Fit bleiben" | null;
type Level = "Beginner" | "Fortgeschritten" | "Profi" | null;
type Frequency = "2" | "3" | "4" | "5+" | null;

const GOALS: { label: Goal; icon: string; desc: string }[] = [
  { label: "Abnehmen", icon: "🔥", desc: "Kalorien verbrennen & Gewicht verlieren" },
  { label: "Muskelaufbau", icon: "💪", desc: "Muskelmasse aufbauen & stärker werden" },
  { label: "Ausdauer", icon: "🏃", desc: "Ausdauer & Kondition verbessern" },
  { label: "Fit bleiben", icon: "🎯", desc: "Gesund & aktiv bleiben" },
];

const LEVELS: { label: Level; icon: string; desc: string }[] = [
  { label: "Beginner", icon: "🌱", desc: "Ich fange gerade an" },
  { label: "Fortgeschritten", icon: "⚡", desc: "Ich trainiere regelmäßig" },
  { label: "Profi", icon: "🏆", desc: "Ich trainiere intensiv" },
];

const FREQS: Frequency[] = ["2", "3", "4", "5+"];

interface UserProfile {
  goal: Goal;
  level: Level;
  frequency: Frequency;
  gymId: string | null;
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full bg-[#2a2a2a] rounded-full h-1.5">
      <div
        className="bg-[#6366f1] h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${(step / total) * 100}%` }}
      />
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({ goal: null, level: null, frequency: null, gymId: null });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const TOTAL_STEPS = 6;

  useEffect(() => {
    setMounted(true);
  }, []);

  function next() { if (step < TOTAL_STEPS) setStep((s) => s + 1); }
  function back() { if (step > 1) setStep((s) => s - 1); }

  function finish() {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_profile", JSON.stringify(profile));
      localStorage.setItem("onboarding_complete", "true");
    }
    router.push("/");
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#737373]">
            <span>Schritt {step} von {TOTAL_STEPS}</span>
            {step > 1 && (
              <button onClick={back} className="flex items-center gap-1 hover:text-[#f5f5f5] transition-colors">
                <ChevronLeft className="h-3 w-3" /> Zurück
              </button>
            )}
          </div>
          <ProgressBar step={step} total={TOTAL_STEPS} />
        </div>

        {/* Step content */}
        <div
          key={step}
          className="animate-fade-in bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] space-y-6"
        >
          {/* Step 1: Willkommen */}
          {step === 1 && (
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6366f1] mx-auto">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#f5f5f5]">Willkommen bei FitTrack!</h1>
                <p className="text-[#737373] mt-2">Dein persönlicher Fitness-Begleiter. Lass uns dein Profil einrichten.</p>
              </div>
              <Button className="w-full gap-2" onClick={next}>
                Jetzt starten <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Ziel */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#f5f5f5]">Was ist dein Ziel?</h2>
                <p className="text-sm text-[#737373] mt-1">Wähle dein primäres Fitnessziel</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map(({ label, icon, desc }) => (
                  <button
                    key={label}
                    onClick={() => { setProfile((p) => ({ ...p, goal: label })); }}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all",
                      profile.goal === label
                        ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                        : "border-[#2a2a2a] text-[#737373] hover:border-[#6366f1]/50 hover:text-[#f5f5f5]"
                    )}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-xs opacity-75">{desc}</span>
                  </button>
                ))}
              </div>
              <Button className="w-full" onClick={next} disabled={!profile.goal}>
                Weiter <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 3: Level */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#f5f5f5]">Dein Fitnesslevel</h2>
                <p className="text-sm text-[#737373] mt-1">Wie erfahren bist du?</p>
              </div>
              <div className="space-y-3">
                {LEVELS.map(({ label, icon, desc }) => (
                  <button
                    key={label}
                    onClick={() => { setProfile((p) => ({ ...p, level: label })); }}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                      profile.level === label
                        ? "border-[#6366f1] bg-[#6366f1]/10"
                        : "border-[#2a2a2a] hover:border-[#6366f1]/50"
                    )}
                  >
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className={cn("font-medium", profile.level === label ? "text-[#6366f1]" : "text-[#f5f5f5]")}>{label}</p>
                      <p className="text-xs text-[#737373]">{desc}</p>
                    </div>
                    {profile.level === label && <Check className="h-4 w-4 text-[#6366f1] ml-auto" />}
                  </button>
                ))}
              </div>
              <Button className="w-full" onClick={next} disabled={!profile.level}>
                Weiter <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 4: Frequenz */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#f5f5f5]">Trainingsfrequenz</h2>
                <p className="text-sm text-[#737373] mt-1">Wie viele Tage pro Woche möchtest du trainieren?</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                {FREQS.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setProfile((p) => ({ ...p, frequency: f })); }}
                    className={cn(
                      "flex flex-col items-center justify-center w-20 h-20 rounded-xl border text-2xl font-bold transition-all",
                      profile.frequency === f
                        ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                        : "border-[#2a2a2a] text-[#737373] hover:border-[#6366f1]/50 hover:text-[#f5f5f5]"
                    )}
                  >
                    {f}
                    <span className="text-xs font-normal mt-1">Tage</span>
                  </button>
                ))}
              </div>
              <Button className="w-full" onClick={next} disabled={!profile.frequency}>
                Weiter <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 5: Studio */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-bold text-[#f5f5f5]">Verbinde dein Studio</h2>
                <p className="text-sm text-[#737373] mt-1">Optional – du kannst das auch später tun</p>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {mockGymFinderGyms.map((gym) => (
                  <button
                    key={gym.id}
                    onClick={() => { setProfile((p) => ({ ...p, gymId: gym.id })); }}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all",
                      profile.gymId === gym.id
                        ? "border-[#6366f1] bg-[#6366f1]/10"
                        : "border-[#2a2a2a] hover:border-[#6366f1]/50"
                    )}
                  >
                    <div>
                      <p className={cn("text-sm font-medium", profile.gymId === gym.id ? "text-[#6366f1]" : "text-[#f5f5f5]")}>{gym.name}</p>
                      <p className="text-xs text-[#737373]">{gym.address}</p>
                    </div>
                    {profile.gymId === gym.id && <Check className="h-4 w-4 text-[#6366f1]" />}
                  </button>
                ))}
              </div>
              <Button className="w-full" onClick={next}>
                Weiter <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <button onClick={next} className="w-full text-center text-xs text-[#737373] hover:text-[#f5f5f5] transition-colors">
                Überspringen
              </button>
            </div>
          )}

          {/* Step 6: Fertig */}
          {step === 6 && (
            <div className="text-center space-y-4">
              <div className="text-5xl animate-bounce">🎉</div>
              <div>
                <h2 className="text-2xl font-bold text-[#f5f5f5]">Alles bereit!</h2>
                <p className="text-[#737373] mt-2">Dein FitTrack-Profil ist eingerichtet.</p>
              </div>
              <div className="bg-[#0f0f0f] rounded-xl p-4 space-y-2 text-sm text-left">
                {profile.goal && <div className="flex justify-between"><span className="text-[#737373]">Ziel:</span><span className="text-[#f5f5f5]">{profile.goal}</span></div>}
                {profile.level && <div className="flex justify-between"><span className="text-[#737373]">Level:</span><span className="text-[#f5f5f5]">{profile.level}</span></div>}
                {profile.frequency && <div className="flex justify-between"><span className="text-[#737373]">Training:</span><span className="text-[#f5f5f5]">{profile.frequency}× / Woche</span></div>}
                {profile.gymId && <div className="flex justify-between"><span className="text-[#737373]">Studio:</span><span className="text-[#f5f5f5]">{mockGymFinderGyms.find((g) => g.id === profile.gymId)?.name}</span></div>}
              </div>
              <Button className="w-full gap-2" onClick={finish}>
                <Check className="h-4 w-4" /> Zum Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
