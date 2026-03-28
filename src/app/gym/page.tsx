"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Users,
  Clock,
  User,
  Check,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockGyms } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const gym = mockGyms[0];
const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const CATEGORIES = ["All", "Cardio", "Strength", "Free Weights", "Functional"] as const;
type Category = (typeof CATEGORIES)[number];

export default function GymPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInMsg, setCheckInMsg] = useState("");
  const [equipCat, setEquipCat] = useState<Category>("All");
  const [bookedClasses, setBookedClasses] = useState<Set<string>>(new Set());
  const [bookMsg, setBookMsg] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckIn = () => {
    if (checkedIn) return;
    setCheckedIn(true);
    setCheckInMsg("✓ Checked in successfully!");
    setTimeout(() => setCheckInMsg(""), 3000);
  };

  const handleBook = (classId: string) => {
    setBookedClasses((prev) => new Set([...prev, classId]));
    setBookMsg((prev) => ({ ...prev, [classId]: "✓ Booked!" }));
    setTimeout(() => {
      setBookMsg((prev) => {
        const next = { ...prev };
        delete next[classId];
        return next;
      });
    }, 3000);
  };

  const filteredEquipment =
    equipCat === "All"
      ? gym.equipment
      : gym.equipment.filter((e) => e.category === equipCat);

  const classesByDay = DAYS_ORDER.reduce<Record<string, typeof gym.classes>>(
    (acc, day) => {
      const dayClasses = gym.classes.filter((c) => c.day === day);
      if (dayClasses.length > 0) acc[day] = dayClasses;
      return acc;
    },
    {}
  );

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "equipment", label: "Equipment" },
    { id: "classes", label: "Classes" },
    { id: "pricing", label: "Pricing" },
    { id: "busy", label: "Busy Times" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-xl bg-[#111827] border border-[#1f2937] p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-[#f5f5f5]">{gym.name}</h1>
              {gym.hansefit && (
                <Badge variant="accent">Hansefit</Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#737373]">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{gym.address}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#737373]">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>{gym.phone}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#737373]">
              <Users className="h-3.5 w-3.5 shrink-0" />
              <span>{gym.memberCount.toLocaleString()} members</span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            {checkInMsg ? (
              <div className="flex items-center gap-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 px-3 py-2 text-sm text-[#10b981]">
                <CheckCircle className="h-4 w-4" />
                {checkInMsg}
              </div>
            ) : (
              <Button
                variant={checkedIn ? "secondary" : "primary"}
                onClick={handleCheckIn}
                disabled={checkedIn}
              >
                {checkedIn ? "Checked In ✓" : "Check In"}
              </Button>
            )}
          </div>
        </div>
      </div>

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

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Total Members", value: gym.memberCount.toLocaleString() },
              { label: "Avg Daily Visits", value: gym.stats.avgDailyVisits },
              { label: "Peak Hour", value: gym.stats.peakHour },
              { label: "Popular Day", value: gym.stats.popularDay },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-4">
                  <p className="text-lg font-bold text-[#f5f5f5]">{stat.value}</p>
                  <p className="text-xs text-[#737373] mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Description */}
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-[#d4d4d4] leading-relaxed">{gym.description}</p>
            </CardContent>
          </Card>

          {/* Opening hours */}
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DAYS_ORDER.map((day) => (
                  <div
                    key={day}
                    className={`flex justify-between items-center rounded-lg px-3 py-2 text-sm ${
                      day === today
                        ? "bg-[#6366f1]/10 border border-[#6366f1]/20"
                        : "bg-[#1a1a1a]"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        day === today ? "text-[#6366f1]" : "text-[#d4d4d4]"
                      }`}
                    >
                      {day.slice(0, 3)}
                    </span>
                    <span className="text-[#737373]">{gym.openingHours[day]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Equipment Tab */}
      {activeTab === "equipment" && (
        <div className="space-y-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setEquipCat(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  equipCat === cat
                    ? "bg-[#6366f1] text-white"
                    : "bg-[#1a1a1a] border border-[#2a2a2a] text-[#737373] hover:text-[#f5f5f5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredEquipment.map((item) => (
              <Card key={item.name}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-[#f5f5f5]">{item.name}</p>
                      <Badge variant="muted" className="mt-1 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <div
                      className={`h-2.5 w-2.5 rounded-full mt-1 ${
                        item.available > 0 ? "bg-[#10b981]" : "bg-[#ef4444]"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-[#737373]">
                      <span>{item.available} available</span>
                      <span>{item.count} total</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#2a2a2a]">
                      <div
                        className="h-1.5 rounded-full bg-[#10b981]"
                        style={{
                          width: `${(item.available / item.count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Classes Tab */}
      {activeTab === "classes" && (
        <div className="space-y-4">
          {Object.entries(classesByDay).map(([day, classes]) => (
            <div key={day}>
              <h3
                className={`text-sm font-semibold mb-2 ${
                  day === today ? "text-[#6366f1]" : "text-[#d4d4d4]"
                }`}
              >
                {day} {day === today && "— Today"}
              </h3>
              <div className="space-y-2">
                {classes.map((cls) => {
                  const spotsLeft = cls.spots - cls.enrolled;
                  const pct = (cls.enrolled / cls.spots) * 100;
                  const isFull = spotsLeft === 0;
                  const isAlmost = spotsLeft > 0 && spotsLeft <= 3;
                  const isBooked = bookedClasses.has(cls.id);

                  return (
                    <Card key={cls.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-[#f5f5f5]">
                                {cls.name}
                              </p>
                              {isFull && <Badge variant="warning">Full</Badge>}
                              {isAlmost && !isFull && (
                                <Badge variant="warning">Almost Full</Badge>
                              )}
                              {!isFull && !isAlmost && (
                                <Badge variant="accent">Available</Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-[#737373]">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {cls.instructor}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {cls.time} · {cls.duration} min
                              </span>
                            </div>
                            <div className="mt-2 space-y-1">
                              <div className="flex justify-between text-xs text-[#737373]">
                                <span>{cls.enrolled}/{cls.spots} enrolled</span>
                                <span>{spotsLeft} spots left</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-[#2a2a2a]">
                                <div
                                  className={`h-1.5 rounded-full ${
                                    isFull
                                      ? "bg-[#ef4444]"
                                      : isAlmost
                                      ? "bg-[#f59e0b]"
                                      : "bg-[#10b981]"
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0">
                            {bookMsg[cls.id] ? (
                              <span className="text-xs text-[#10b981]">{bookMsg[cls.id]}</span>
                            ) : (
                              <Button
                                size="sm"
                                variant={isBooked ? "secondary" : isFull ? "ghost" : "primary"}
                                disabled={isFull || isBooked}
                                onClick={() => handleBook(cls.id)}
                              >
                                {isBooked ? "Booked ✓" : isFull ? "Full" : "Book"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pricing Tab */}
      {activeTab === "pricing" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gym.pricing.map((tier, idx) => {
            const isPopular = idx === 1;
            return (
              <Card
                key={tier.name}
                className={isPopular ? "border-[#6366f1] ring-1 ring-[#6366f1]/30" : ""}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-[#f5f5f5]">{tier.name}</h3>
                    {isPopular && <Badge variant="default">Most Popular</Badge>}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#f5f5f5]">
                      €{tier.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-[#737373]">/{tier.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                        <Check className="h-4 w-4 text-[#10b981] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={isPopular ? "primary" : "outline"}
                    className="w-full"
                  >
                    Choose {tier.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Busy Times Tab */}
      {activeTab === "busy" && (
        <div className="space-y-4">
          {/* Live count */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#10b981] animate-pulse" />
                <p className="text-sm text-[#f5f5f5]">
                  Currently checked in:{" "}
                  <span className="font-bold text-[#10b981]">
                    {gym.stats.checkInsToday}
                  </span>{" "}
                  people
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hourly traffic */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Traffic</CardTitle>
            </CardHeader>
            <CardContent>
              {mounted ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={gym.hourlyTraffic}>
                    <XAxis
                      dataKey="hour"
                      tick={{ fill: "#737373", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      interval={1}
                    />
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
                    <Bar dataKey="count" fill={"#6366f1"} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </CardContent>
          </Card>

          {/* 7-day trend */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Check-in Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {mounted ? (
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={gym.checkInHistory}>
                    <defs>
                      <linearGradient id="cgGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#737373", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
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
                      fill={"url(#cgGrad)"}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : null}
            </CardContent>
          </Card>

          {/* Tip */}
          <div className="rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 p-4">
            <p className="text-sm text-[#f5f5f5]">
              💡 <span className="font-semibold">Best time to visit:</span> early morning (6–8am)
              or after 8pm for the lowest crowds.
            </p>
          </div>
        </div>
      )}

      {/* AI Coach Banner */}
      <div className="rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 p-5">
        <p className="text-sm text-[#d4d4d4]">
          🤖 <span className="font-semibold text-[#f5f5f5]">AI Coach Integration:</span> Your AI
          Coach has access to {gym.name}&apos;s equipment list and will suggest exercises using the
          available machines at your gym.
        </p>
      </div>
    </div>
  );
}
