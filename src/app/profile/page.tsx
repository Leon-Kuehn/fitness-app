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

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Profil</h1>
        <p className="text-sm text-[#737373] mt-1">Deine persönlichen Fitnessdaten</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shrink-0">
              <span className="text-3xl font-bold text-white">{profile.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-[#f5f5f5] truncate">{profile.name}</h2>
              <Badge variant="default" className="mt-1 text-xs">{profile.goal}</Badge>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[#737373]">Level {CURRENT_LEVEL}</span>
                <div className="flex-1 h-1.5 bg-[#1f2937] rounded-full overflow-hidden max-w-[120px]">
                  <div
                    className="h-full bg-[#6366f1] rounded-full transition-all"
                    style={{ width: `${(XP_TOTAL / XP_NEXT_LEVEL) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-[#737373]">{XP_TOTAL} / {XP_NEXT_LEVEL} XP</span>
              </div>
            </div>
            {!editMode && (
              <Button variant="outline" size="sm" onClick={() => setEditMode(true)} className="shrink-0 gap-1.5">
                <Edit2 className="h-3.5 w-3.5" />
                Bearbeiten
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-[#6366f1]" />
              Persönliche Daten
            </CardTitle>
            {editMode && (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} className="gap-1.5 h-7 text-xs">
                  <Save className="h-3.5 w-3.5" /> Speichern
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel} className="gap-1.5 h-7 text-xs text-[#737373]">
                  <X className="h-3.5 w-3.5" /> Abbrechen
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            [
              { label: "Name", key: "name" as const, type: "text", suffix: undefined },
              { label: "Age", key: "age" as const, type: "number", suffix: "years" },
              { label: "Height", key: "height" as const, type: "number", suffix: "cm" },
              { label: "Weight", key: "weight" as const, type: "number", suffix: "kg" },
            ]
          ).map(({ label, key, type, suffix }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-[#737373] w-24">{label}</span>
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

          {/* Gender select */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373] w-24">Geschlecht</span>
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

          {/* Goal select */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373] w-24">Ziel</span>
            {editMode ? (
              <select
                value={draft.goal}
                onChange={(e) => setDraft((d) => ({ ...d, goal: e.target.value }))}
                className="flex-1 max-w-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-1.5 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#6366f1] transition-colors"
              >
                {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            ) : (
              <Badge variant="default" className="text-xs">{profile.goal}</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-[#6366f1]" />
            Level & XP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">Aktuelles Level</span>
            <Badge className="text-sm px-3 py-1">Level {CURRENT_LEVEL}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">Total XP</span>
            <span className="text-sm font-medium text-[#f5f5f5]">{XP_TOTAL} XP</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[#737373]">
              <span>Progress to Level {CURRENT_LEVEL + 1}</span>
              <span>{XP_TOTAL} / {XP_NEXT_LEVEL}</span>
            </div>
            <div className="h-2 bg-[#1f2937] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full transition-all"
                style={{ width: `${Math.min((XP_TOTAL / XP_NEXT_LEVEL) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4 text-[#f59e0b]" />
            Freigeschaltete Abzeichen ({unlockedAchievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                title={achievement.name}
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#6366f1]/50 transition-colors"
              >
                <span className="text-2xl">{achievement.icon}</span>
                <p className="text-[10px] text-[#737373] text-center leading-tight line-clamp-2">{achievement.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
