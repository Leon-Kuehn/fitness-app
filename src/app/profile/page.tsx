"use client";
import { useState, useEffect } from "react";
import { User, Edit2, Save, X, Award, Dumbbell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  gender: "Männlich",
  goal: "Muskelaufbau",
};

const GOALS = ["Muskelaufbau", "Abnehmen", "Ausdauer verbessern", "Kraft steigern", "Allgemeine Fitness"];
const GENDERS = ["Männlich", "Weiblich", "Divers", "Keine Angabe"];

const XP_TOTAL = mockAchievements.filter((a) => a.unlocked).reduce((s, a) => s + a.xpReward, 0);
const CURRENT_LEVEL = 7;
const XP_NEXT_LEVEL = 1200;

export default function ProfilePage() {
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
    { label: "Alter", key: "age", type: "number", suffix: "Jahre" },
    { label: "Größe", key: "height", type: "number", suffix: "cm" },
    { label: "Gewicht", key: "weight", type: "number", suffix: "kg" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Profil</h1>
        <p className="text-sm text-[#737373] mt-1">Deine persönlichen Fitnessdaten</p>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[#6366f1] flex items-center justify-center text-2xl font-bold text-white shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-[#f5f5f5]">{profile.name}</h2>
              <p className="text-sm text-[#737373]">{profile.goal}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">Level {CURRENT_LEVEL}</Badge>
                <span className="text-xs text-[#737373]">{XP_TOTAL} / {XP_NEXT_LEVEL} XP</span>
              </div>
            </div>
            {!editMode && (
              <Button size="sm" variant="outline" onClick={() => setEditMode(true)} className="shrink-0 gap-1.5">
                <Edit2 className="h-3.5 w-3.5" /> Bearbeiten
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Persönliche Daten</CardTitle>
            {editMode && (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} className="gap-1.5">
                  <Save className="h-3.5 w-3.5" /> Speichern
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel} className="gap-1.5">
                  <X className="h-3.5 w-3.5" /> Abbrechen
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map(({ label, key, type, suffix }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-[#737373]">{label}</span>
              {editMode ? (
                <input
                  type={type}
                  value={draft[key]}
                  onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                  className="flex-1 max-w-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#6366f1] transition-colors text-right"
                />
              ) : (
                <span className="text-sm font-medium text-[#f5f5f5]">
                  {profile[key]}{suffix ? ` ${suffix}` : ""}
                </span>
              )}
            </div>
          ))}

          {/* Gender */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">Geschlecht</span>
            {editMode ? (
              <select
                value={draft.gender}
                onChange={(e) => setDraft((d) => ({ ...d, gender: e.target.value }))}
                className="flex-1 max-w-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#6366f1] transition-colors"
              >
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            ) : (
              <span className="text-sm font-medium text-[#f5f5f5]">{profile.gender}</span>
            )}
          </div>

          {/* Goal */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">Ziel</span>
            {editMode ? (
              <select
                value={draft.goal}
                onChange={(e) => setDraft((d) => ({ ...d, goal: e.target.value }))}
                className="flex-1 max-w-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#6366f1] transition-colors"
              >
                {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            ) : (
              <span className="text-sm font-medium text-[#f5f5f5]">{profile.goal}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Level & XP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">Aktuelles Level</span>
            <Badge>Level {CURRENT_LEVEL}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">Total XP</span>
            <span className="text-sm font-semibold text-[#6366f1]">{XP_TOTAL} XP</span>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#737373]">Fortschritt zu Level {CURRENT_LEVEL + 1}</span>
              <span className="text-xs text-[#737373]">{XP_TOTAL} / {XP_NEXT_LEVEL}</span>
            </div>
            <div className="h-2 bg-[#1f2937] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366f1] rounded-full transition-all duration-500"
                style={{ width: `${Math.min((XP_TOTAL / XP_NEXT_LEVEL) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Freigeschaltete Abzeichen ({unlockedAchievements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.name} className="flex items-center gap-3 p-3 bg-[#1f2937] rounded-xl">
                <span className="text-2xl">{achievement.icon}</span>
                <span className="text-sm font-medium text-[#f5f5f5]">{achievement.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
