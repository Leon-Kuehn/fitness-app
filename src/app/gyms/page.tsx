"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Clock, Phone, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockGymFinderGyms, GymFinderGym } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const GymMap = dynamic(() => import("@/components/map/GymMap"), { ssr: false });

const FILTER_CHIPS = ["Alle", "Hansefit", "24h geöffnet", "Mit Pool", "Mit Sauna", "Crossfit"];

function AmenityIcons({ amenities }: { amenities: string[] }) {
  const icons: Record<string, string> = {
    Parkplatz: "🅿️",
    WiFi: "📶",
    Sauna: "🧖",
    Pool: "🏊",
  };
  return (
    <div className="flex gap-1 flex-wrap">
      {amenities.map((a) => (
        <span key={a} className="text-sm" title={a}>{icons[a] ?? "•"} {a}</span>
      ))}
    </div>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="text-[#f59e0b] text-sm">
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))} {rating.toFixed(1)}
    </span>
  );
}

function GymCard({
  gym,
  isActive,
  onClick,
}: {
  gym: GymFinderGym;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-[#6366f1]/50",
        isActive ? "border-[#6366f1] bg-[#6366f1]/5" : "border-[#2a2a2a]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[#f5f5f5] text-sm">{gym.name}</h3>
            <p className="text-xs text-[#737373] flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" /> {gym.address}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">{gym.distanceKm} km</Badge>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <RatingStars rating={gym.rating} />
          {gym.isHansefit && <Badge variant="default" className="text-xs">Hansefit</Badge>}
          {gym.is24h && <Badge variant="secondary" className="text-xs">24h</Badge>}
        </div>
        <div className="flex items-center gap-1 text-xs text-[#737373]">
          <Clock className="h-3 w-3" /> {gym.openToday}
        </div>
        <AmenityIcons amenities={gym.amenities} />
        <div className="flex items-center gap-1 text-xs text-[#737373]">
          <Phone className="h-3 w-3" /> {gym.phone}
        </div>
      </CardContent>
    </Card>
  );
}

export default function GymsPage() {
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [activeGymId, setActiveGymId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredGyms = mockGymFinderGyms.filter((gym) => {
    const matchesSearch =
      search === "" ||
      gym.name.toLowerCase().includes(search.toLowerCase()) ||
      gym.address.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    switch (activeFilter) {
      case "Hansefit": return gym.isHansefit;
      case "24h geöffnet": return gym.is24h;
      case "Mit Pool": return gym.amenities.includes("Pool");
      case "Mit Sauna": return gym.amenities.includes("Sauna");
      case "Crossfit": return gym.name.toLowerCase().includes("crossfit");
      default: return true;
    }
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#f5f5f5]">Gymfinder</h1>
        <p className="text-sm text-[#737373] mt-1">Finde das perfekte Studio in deiner Nähe</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737373]" />
        <input
          type="text"
          placeholder="Stadt, PLZ oder Adresse..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
              activeFilter === chip
                ? "bg-[#6366f1] text-white border-[#6366f1]"
                : "bg-[#1a1a1a] text-[#737373] border-[#2a2a2a] hover:text-[#f5f5f5]"
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-[#737373]">{filteredGyms.length} Studios gefunden</p>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map — top on mobile, right on desktop */}
        <div className="lg:order-2 lg:w-3/5 rounded-xl overflow-hidden border border-[#2a2a2a]" style={{ minHeight: "350px" }}>
          <GymMap
            gyms={filteredGyms}
            activeGymId={activeGymId}
            onGymSelect={setActiveGymId}
          />
        </div>

        {/* Card list — bottom on mobile, left on desktop */}
        <div className="lg:order-1 lg:w-2/5 space-y-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-1">
          {filteredGyms.map((gym) => (
            <GymCard
              key={gym.id}
              gym={gym}
              isActive={activeGymId === gym.id}
              onClick={() => setActiveGymId(activeGymId === gym.id ? null : gym.id)}
            />
          ))}
          {filteredGyms.length === 0 && (
            <p className="text-center text-[#737373] py-8">Keine Studios gefunden</p>
          )}
        </div>
      </div>
    </div>
  );
}
