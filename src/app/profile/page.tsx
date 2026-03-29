"use client";
import { useState, useEffect } from "react";
import { User, Edit2, Save, X, Settings, Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { mockAchievements } from "@/lib/mock-data";

interface ProfileData {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  goal: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Alex Müller",
  age: "28",
  height: "178",
  weight: "75",
  gender: "Male",
  goal: "Muscle Gain",
};

const GOALS = ["Muscle Gain", "Weight Loss", "Endurance", "Strength", "General Fitness"];
const GENDERS = ["Male", "Female", "Non-Binary", "Prefer Not to Say"];
const XP_TOTAL = mockAchievements.filter((a) => a.unlocked).reduce((s, a) => s + a.xpReward, 0);
const CURRENT_LEVEL = 7;
const XP_NEXT_LEVEL = 1200;

type Tab = "profile" | "achievements" | "settings";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(DEFAULT_PROFILE);

  useEffect(() => {
    const stored = localStorage.getItem("fittrack_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ProfileData;
        setProfile(parsed);
        setDraft(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  const handleSave = () => {
    setProfile(draft);
    localStorage.setItem("fittrack_profile", JSON.stringify(draft));
    setEditMode(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditMode(false);
  };

  const unlockedAchievements = mockAchievements.filter((a) => a.unlocked);

  const fields: { label: string; key: keyof ProfileData; type: string; suffix?: string }[] = [
    { label: "Name", key: "name", type: "text" },
    { label: "Age", key: "age", type: "number", suffix: "yrs" },
    { label: "Height", key: "height", type: "number", suffix: "cm" },
    { label: "Weight", key: "weight", type: "number", suffix: "kg" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1
          className="font-extrabold"
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--color-text)" }}
        >
          Profile
        </h1>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }} className="mt-1">
          Your personal fitness profile
        </p>
      </div>

      {/* Tab Bar */}
      <div
        className="flex gap-1 rounded-xl p-1"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: tab === id ? "var(--color-primary)" : "transparent",
              color: tab === id ? "#fff" : "var(--color-text-muted)",
            }}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Profile Tab ──────────────────────────────────────────────── */}
      {tab === "profile" && (
        <div className="space-y-4">
          {/* Avatar + name */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
                  style={{ background: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                >
                  {profile.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    className="font-bold"
                    style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--color-text)" }}
                  >
                    {profile.name}
                  </h2>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>{profile.goal}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
                    >
                      Level {CURRENT_LEVEL}
                    </Badge>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                      {XP_TOTAL} / {XP_NEXT_LEVEL} XP
                    </span>
                  </div>
                </div>
                {!editMode && (
                  <Button size="sm" variant="secondary" onClick={() => setEditMode(true)} className="shrink-0 gap-1.5">
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Info</CardTitle>
                {editMode && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave} className="gap-1.5">
                      <Save className="h-3.5 w-3.5" /> Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel} className="gap-1.5">
                      <X className="h-3.5 w-3.5" /> Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map(({ label, key, type, suffix }) => (
                <div key={key} className="flex items-center justify-between">
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>{label}</span>
                  {editMode ? (
                    <input
                      type={type}
                      value={draft[key]}
                      onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                      className="flex-1 max-w-xs rounded-lg px-3 py-1.5 text-sm outline-none text-right"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-primary)",
                        color: "var(--color-text)",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }} className="font-medium">
                      {profile[key]}{suffix ? ` ${suffix}` : ""}
                    </span>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between">
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>Gender</span>
                {editMode ? (
                  <select
                    value={draft.gender}
                    onChange={(e) => setDraft((d) => ({ ...d, gender: e.target.value }))}
                    className="flex-1 max-w-xs rounded-lg px-3 py-1.5 text-sm outline-none"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-primary)",
                      color: "var(--color-text)",
                    }}
                  >
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                ) : (
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }} className="font-medium">
                    {profile.gender}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>Goal</span>
                {editMode ? (
                  <select
                    value={draft.goal}
                    onChange={(e) => setDraft((d) => ({ ...d, goal: e.target.value }))}
                    className="flex-1 max-w-xs rounded-lg px-3 py-1.5 text-sm outline-none"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-primary)",
                      color: "var(--color-text)",
                    }}
                  >
                    {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                ) : (
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text)" }} className="font-medium">
                    {profile.goal}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* XP Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Level & XP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>Current Level</span>
                <Badge
                  variant="outline"
                  style={{ color: "var(--color-primary)", borderColor: "var(--color-primary)" }}
                >
                  Level {CURRENT_LEVEL}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>Total XP</span>
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                >
                  {XP_TOTAL} XP
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    Progress to Level {CURRENT_LEVEL + 1}
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    {XP_TOTAL} / {XP_NEXT_LEVEL}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((XP_TOTAL / XP_NEXT_LEVEL) * 100, 100)}%`,
                      background: "var(--color-primary)",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Achievements Tab ─────────────────────────────────────────── */}
      {tab === "achievements" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements ({unlockedAchievements.length} unlocked)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {unlockedAchievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text)" }}
                    >
                      {achievement.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Settings Tab ─────────────────────────────────────────────── */}
      {tab === "settings" && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Settings className="h-10 w-10" style={{ color: "var(--color-text-muted)" }} />
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
            App settings and preferences
          </p>
          <Link href="/settings">
            <Button variant="secondary">Open Settings</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
