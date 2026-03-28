"use client";
import { useRouter } from "next/navigation";
import { Dumbbell, ShieldCheck, Check, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: "member" | "gym_admin") => {
    login(role);
    if (role === "gym_admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6366f1]">
          <Dumbbell className="h-6 w-6 text-white" />
        </div>
        <span className="text-3xl font-bold text-[#f5f5f5]">FitTrack</span>
      </div>
      <p className="text-[#737373] text-sm mb-10 text-center">
        Your intelligent fitness &amp; gym management platform
      </p>

      <h2 className="text-xl font-semibold text-[#f5f5f5] mb-6 text-center">
        Choose your account type
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        {/* Member Card */}
        <button
          onClick={() => handleLogin("member")}
          className="flex-1 group rounded-xl bg-[#111827] border border-[#1f2937] p-6 text-left transition-all hover:border-[#6366f1] hover:bg-[#111827]/80 cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6366f1]/20 mb-4 group-hover:bg-[#6366f1]/30 transition-colors">
            <Dumbbell className="h-6 w-6 text-[#6366f1]" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-[#f5f5f5]">Member</h3>
            <span className="text-xs rounded-full px-2 py-0.5 bg-[#10b981]/20 text-[#10b981] font-medium">
              Hansefit ✓
            </span>
          </div>
          <p className="text-sm text-[#737373] mb-4">
            Track workouts, view gym schedules, book classes, and get AI coaching tailored to your gym.
          </p>
          <ul className="space-y-2">
            {[
              "Workout tracking & plans",
              "Book group classes",
              "Gym equipment availability",
              "AI Coach with gym context",
              "Hansefit membership support",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[#d4d4d4]">
                <Check className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg bg-[#6366f1] py-2 text-center text-sm font-semibold text-white group-hover:bg-[#4f46e5] transition-colors">
            Continue as Member
          </div>
        </button>

        {/* Gym Admin Card */}
        <button
          onClick={() => handleLogin("gym_admin")}
          className="flex-1 group rounded-xl bg-[#111827] border border-[#1f2937] p-6 text-left transition-all hover:border-[#6366f1] hover:bg-[#111827]/80 cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/20 mb-4 group-hover:bg-[#f59e0b]/30 transition-colors">
            <ShieldCheck className="h-6 w-6 text-[#f59e0b]" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-[#f5f5f5]">Gym Admin</h3>
            <span className="text-xs rounded-full px-2 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] font-medium">
              B2B
            </span>
          </div>
          <p className="text-sm text-[#737373] mb-4">
            Manage your gym profile, equipment, classes, members, and view analytics.
          </p>
          <ul className="space-y-2">
            {[
              "Member management",
              "Equipment & class scheduling",
              "Analytics dashboard",
              "Pricing & profile settings",
              "Hansefit integration",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[#d4d4d4]">
                <Check className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg bg-[#f59e0b] py-2 text-center text-sm font-semibold text-white group-hover:bg-[#d97706] transition-colors">
            Continue as Gym Admin
          </div>
        </button>
      </div>

      <div className="mt-10 flex items-center gap-2 text-xs text-[#737373]">
        <Sparkles className="h-3.5 w-3.5 text-[#6366f1]" />
        <span>Demo mode — no real authentication required</span>
      </div>
    </div>
  );
}
