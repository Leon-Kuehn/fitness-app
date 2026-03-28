"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Dumbbell,
  Calendar,
  TrendingUp,
  ShieldCheck,
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  mockGymMembers,
  mockGyms,
  type GymEquipment,
  type GymClass,
  type GymMember,
} from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const gym = mockGyms[0];

// ─── Analytics mock data ──────────────────────────────────────────────────

const checkInTrend = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  count: 180 + Math.floor(Math.random() * 80),
}));

const memberGrowth = [
  { month: "Oct", members: 980 },
  { month: "Nov", members: 1020 },
  { month: "Dec", members: 1060 },
  { month: "Jan", members: 1120 },
  { month: "Feb", members: 1180 },
  { month: "Mar", members: 1240 },
];

const memberSplit = [
  { name: "Regular", value: mockGymMembers.filter((m) => !m.hansefit).length },
  { name: "Hansefit", value: mockGymMembers.filter((m) => m.hansefit).length },
];

const PIE_COLORS = ["#6366f1", "#10b981"];

// Peak hours heatmap: 7 days × 16 hours
const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_HOURS = [
  "6am","7am","8am","9am","10am","11am","12pm",
  "1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm",
];
const heatmapData = HEATMAP_DAYS.map((day, di) =>
  HEATMAP_HOURS.map((_, hi) => {
    const base = [0.4, 0.5, 0.3, 0.3, 0.3, 0.2, 0.2][di];
    const peak = hi >= 10 && hi <= 13 ? 0.4 : 0;
    const noise = Math.random() * 0.3;
    return Math.min(1, base + peak + noise);
  })
);

// ─── Component ────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");

  // Members state
  const [search, setSearch] = useState("");

  // Equipment state
  const [equipment, setEquipment] = useState<GymEquipment[]>(gym.equipment);
  const [editingEquip, setEditingEquip] = useState<string | null>(null);
  const [editEquipVals, setEditEquipVals] = useState<GymEquipment | null>(null);
  const [showAddEquip, setShowAddEquip] = useState(false);
  const [newEquip, setNewEquip] = useState<Omit<GymEquipment, never>>({
    name: "",
    category: "Cardio",
    count: 1,
    available: 1,
  });

  // Classes state
  const [classes, setClasses] = useState<GymClass[]>(gym.classes);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState<Omit<GymClass, "id">>({
    name: "",
    instructor: "",
    day: "Monday",
    time: "09:00",
    duration: 60,
    spots: 20,
    enrolled: 0,
  });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ─── Access Guard ──────────────────────────────────────────────────────
  if (role !== "gym_admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ef4444]/20">
          <ShieldCheck className="h-8 w-8 text-[#ef4444]" />
        </div>
        <h1 className="text-xl font-bold text-[#f5f5f5]">Access Denied</h1>
        <p className="text-sm text-[#737373]">
          You need a Gym Admin account to access this page.
        </p>
        <Link href="/login">
          <Button variant="primary">Login as Gym Admin</Button>
        </Link>
      </div>
    );
  }

  const filteredMembers: GymMember[] = mockGymMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const hansefitCount = mockGymMembers.filter((m) => m.hansefit).length;
  const activeToday = mockGymMembers.filter(
    (m) => m.lastVisit === new Date().toISOString().slice(0, 10)
  ).length;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "members", label: "Members" },
    { id: "equipment", label: "Equipment" },
    { id: "classes", label: "Classes" },
    { id: "analytics", label: "Analytics" },
  ];

  // ─── Handlers ─────────────────────────────────────────────────────────

  const saveEquipEdit = () => {
    if (!editEquipVals) return;
    setEquipment((prev) =>
      prev.map((e) => (e.name === editingEquip ? editEquipVals : e))
    );
    setEditingEquip(null);
    setEditEquipVals(null);
    showToast("Equipment updated.");
  };

  const addEquipment = () => {
    if (!newEquip.name.trim()) return;
    setEquipment((prev) => [...prev, { ...newEquip }]);
    setNewEquip({ name: "", category: "Cardio", count: 1, available: 1 });
    setShowAddEquip(false);
    showToast("Equipment added!");
  };

  const addClass = () => {
    if (!newClass.name.trim()) return;
    const id = `c${Date.now()}`;
    setClasses((prev) => [...prev, { id, ...newClass }]);
    setNewClass({
      name: "",
      instructor: "",
      day: "Monday",
      time: "09:00",
      duration: 60,
      spots: 20,
      enrolled: 0,
    });
    setShowAddClass(false);
    showToast("Class added!");
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    setConfirmDelete(null);
    showToast("Class deleted.");
  };

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f5f5]">{gym.name}</h1>
          <p className="text-sm text-[#737373]">Admin Dashboard</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Check-ins Today", value: gym.stats.checkInsToday },
            { label: "Members", value: gym.memberCount },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-[#111827] border border-[#1f2937] px-4 py-2 text-center">
              <p className="text-lg font-bold text-[#f5f5f5]">{s.value}</p>
              <p className="text-xs text-[#737373]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 px-4 py-3 text-sm text-[#10b981]">
          ✓ {toast}
        </div>
      )}

      {/* Tab switcher */}
      <div className="flex gap-1 bg-[#1a1a1a] rounded-xl p-1 border border-[#2a2a2a] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#6366f1] text-white"
                : "text-[#737373] hover:text-[#f5f5f5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Overview ──────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Check-ins Today", value: gym.stats.checkInsToday, icon: TrendingUp, color: "#6366f1" },
              { label: "Total Members", value: gym.memberCount, icon: Users, color: "#10b981" },
              { label: "Classes This Week", value: classes.length, icon: Calendar, color: "#f59e0b" },
              { label: "Hansefit Members", value: hansefitCount, icon: ShieldCheck, color: "#ef4444" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="pt-4">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl mb-2"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: stat.color }} />
                    </div>
                    <p className="text-xl font-bold text-[#f5f5f5]">{stat.value}</p>
                    <p className="text-xs text-[#737373]">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  onClick={() => { setActiveTab("classes"); setShowAddClass(true); }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Class
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => { setActiveTab("equipment"); setShowAddEquip(true); }}
                >
                  <Dumbbell className="h-4 w-4 mr-1" /> Add Equipment
                </Button>
                <Button variant="outline" onClick={() => showToast("CSV exported (mock).")}>
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Check-ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockGymMembers.slice(0, 5).map((m) => (
                  <div key={m.id} className="flex items-center justify-between py-2 border-b border-[#1f2937] last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6366f1]/20">
                        <span className="text-xs font-semibold text-[#6366f1]">
                          {m.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#f5f5f5]">{m.name}</p>
                        <p className="text-xs text-[#737373]">{m.lastVisit}</p>
                      </div>
                    </div>
                    <Badge variant="muted">{m.plan}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Members ───────────────────────────────────────────────────── */}
      {activeTab === "members" && (
        <div className="space-y-4">
          {/* Search + stats */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] pl-9 pr-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
              />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {[
              { label: "Total Members", value: mockGymMembers.length },
              { label: "Hansefit", value: hansefitCount },
              { label: "Active Today", value: activeToday },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-[#111827] border border-[#1f2937] px-4 py-2">
                <p className="text-lg font-bold text-[#f5f5f5]">{s.value}</p>
                <p className="text-xs text-[#737373]">{s.label}</p>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-[#737373] text-sm">No members found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filteredMembers.map((m) => (
                <Card key={m.id}>
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6366f1]/20 shrink-0">
                        <span className="text-sm font-semibold text-[#6366f1]">
                          {m.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#f5f5f5]">{m.name}</p>
                        <p className="text-xs text-[#737373]">{m.email}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 items-center text-xs text-[#737373]">
                        <Badge variant="muted">{m.plan}</Badge>
                        {m.hansefit && <Badge variant="accent">Hansefit</Badge>}
                        <span>{m.checkIns} check-ins</span>
                        <span>Last: {m.lastVisit}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Equipment ─────────────────────────────────────────────────── */}
      {activeTab === "equipment" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setShowAddEquip(!showAddEquip)}>
              <Plus className="h-4 w-4 mr-1" /> Add Equipment
            </Button>
          </div>

          {showAddEquip && (
            <Card>
              <CardHeader>
                <CardTitle>Add Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newEquip.name}
                    onChange={(e) => setNewEquip((p) => ({ ...p, name: e.target.value }))}
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
                  />
                  <select
                    value={newEquip.category}
                    onChange={(e) =>
                      setNewEquip((p) => ({
                        ...p,
                        category: e.target.value as GymEquipment["category"],
                      }))
                    }
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#6366f1]"
                  >
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength</option>
                    <option value="Free Weights">Free Weights</option>
                    <option value="Functional">Functional</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Total count"
                    value={newEquip.count}
                    min={1}
                    onChange={(e) =>
                      setNewEquip((p) => ({ ...p, count: Number(e.target.value) }))
                    }
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
                  />
                  <input
                    type="number"
                    placeholder="Available"
                    value={newEquip.available}
                    min={0}
                    onChange={(e) =>
                      setNewEquip((p) => ({ ...p, available: Number(e.target.value) }))
                    }
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="primary" onClick={addEquipment}>
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button variant="ghost" onClick={() => setShowAddEquip(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {equipment.map((item) => (
              <Card key={item.name}>
                <CardContent className="pt-3 pb-3">
                  {editingEquip === item.name && editEquipVals ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-end">
                      <input
                        value={editEquipVals.name}
                        onChange={(e) =>
                          setEditEquipVals((p) => p ? { ...p, name: e.target.value } : p)
                        }
                        className="rounded-xl bg-[#1a1a1a] border border-[#6366f1] px-2 py-1.5 text-sm text-[#f5f5f5] focus:outline-none"
                      />
                      <select
                        value={editEquipVals.category}
                        onChange={(e) =>
                          setEditEquipVals((p) =>
                            p ? { ...p, category: e.target.value as GymEquipment["category"] } : p
                          )
                        }
                        className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-1.5 text-sm text-[#f5f5f5] focus:outline-none"
                      >
                        <option value="Cardio">Cardio</option>
                        <option value="Strength">Strength</option>
                        <option value="Free Weights">Free Weights</option>
                        <option value="Functional">Functional</option>
                      </select>
                      <input
                        type="number"
                        value={editEquipVals.count}
                        min={1}
                        onChange={(e) =>
                          setEditEquipVals((p) => p ? { ...p, count: Number(e.target.value) } : p)
                        }
                        className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-1.5 text-sm text-[#f5f5f5] focus:outline-none"
                      />
                      <div className="flex gap-1">
                        <Button size="sm" variant="primary" onClick={saveEquipEdit}>
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => { setEditingEquip(null); setEditEquipVals(null); }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div>
                          <p className="text-sm font-semibold text-[#f5f5f5]">{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="muted">{item.category}</Badge>
                            <span className="text-xs text-[#737373]">
                              {item.available}/{item.count}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingEquip(item.name);
                          setEditEquipVals({ ...item });
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Classes ───────────────────────────────────────────────────── */}
      {activeTab === "classes" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setShowAddClass(!showAddClass)}>
              <Plus className="h-4 w-4 mr-1" /> Add Class
            </Button>
          </div>

          {showAddClass && (
            <Card>
              <CardHeader>
                <CardTitle>Add Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Class name"
                    value={newClass.name}
                    onChange={(e) => setNewClass((p) => ({ ...p, name: e.target.value }))}
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
                  />
                  <input
                    type="text"
                    placeholder="Instructor"
                    value={newClass.instructor}
                    onChange={(e) => setNewClass((p) => ({ ...p, instructor: e.target.value }))}
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
                  />
                  <select
                    value={newClass.day}
                    onChange={(e) => setNewClass((p) => ({ ...p, day: e.target.value }))}
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#6366f1]"
                  >
                    {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(
                      (d) => <option key={d} value={d}>{d}</option>
                    )}
                  </select>
                  <input
                    type="time"
                    value={newClass.time}
                    onChange={(e) => setNewClass((p) => ({ ...p, time: e.target.value }))}
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#6366f1]"
                  />
                  <input
                    type="number"
                    placeholder="Duration (min)"
                    value={newClass.duration}
                    min={15}
                    onChange={(e) => setNewClass((p) => ({ ...p, duration: Number(e.target.value) }))}
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
                  />
                  <input
                    type="number"
                    placeholder="Spots"
                    value={newClass.spots}
                    min={1}
                    onChange={(e) => setNewClass((p) => ({ ...p, spots: Number(e.target.value) }))}
                    className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#737373] focus:outline-none focus:border-[#6366f1]"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="primary" onClick={addClass}>
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button variant="ghost" onClick={() => setShowAddClass(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {classes.map((cls) => (
              <Card key={cls.id}>
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#f5f5f5]">{cls.name}</p>
                      <p className="text-xs text-[#737373]">
                        {cls.instructor} · {cls.day} {cls.time} · {cls.duration} min ·{" "}
                        {cls.enrolled}/{cls.spots} enrolled
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {confirmDelete === cls.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteClass(cls.id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setConfirmDelete(null)}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmDelete(cls.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-[#ef4444]" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Analytics ─────────────────────────────────────────────────── */}
      {activeTab === "analytics" && (
        <div className="space-y-4">
          {/* Check-in trend */}
          <Card>
            <CardHeader>
              <CardTitle>Check-in Trend (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              {mounted ? (
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={checkInTrend}>
                    <defs>
                      <linearGradient id="ciGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        borderRadius: "8px",
                        color: "#f5f5f5",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#6366f1"
                      fill={"url(#ciGrad)"}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : null}
            </CardContent>
          </Card>

          {/* Peak hours heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Peak Hours Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="flex gap-1 mb-1">
                  <div className="w-8" />
                  {HEATMAP_HOURS.map((h) => (
                    <div key={h} className="w-8 shrink-0 text-center text-[9px] text-[#737373]">
                      {h}
                    </div>
                  ))}
                </div>
                {HEATMAP_DAYS.map((day, di) => (
                  <div key={day} className="flex gap-1 mb-1 items-center">
                    <div className="w-8 text-[10px] text-[#737373]">{day}</div>
                    {heatmapData[di].map((val, hi) => (
                      <div
                        key={hi}
                        className="w-8 h-5 rounded shrink-0"
                        style={{ backgroundColor: `rgba(99,102,241,${val.toFixed(2)})` }}
                        title={`${day} ${HEATMAP_HOURS[hi]}: ${Math.round(val * 130)} visits`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Member growth */}
          <Card>
            <CardHeader>
              <CardTitle>Member Growth (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              {mounted ? (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={memberGrowth}>
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#737373", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                        borderRadius: "8px",
                        color: "#f5f5f5",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="members" fill={"#10b981"} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </CardContent>
          </Card>

          {/* Member split pie */}
          <Card>
            <CardHeader>
              <CardTitle>Member Split</CardTitle>
            </CardHeader>
            <CardContent>
              {mounted ? (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie
                        data={memberSplit}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        dataKey="value"
                      >
                        {memberSplit.map((_, index) => (
                          <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #2a2a2a",
                          borderRadius: "8px",
                          color: "#f5f5f5",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {memberSplit.map((seg, i) => (
                      <div key={seg.name} className="flex items-center gap-2 text-sm">
                        <div
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: PIE_COLORS[i] }}
                        />
                        <span className="text-[#d4d4d4]">{seg.name}</span>
                        <span className="font-semibold text-[#f5f5f5]">{seg.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
