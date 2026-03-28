"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { GymFinderGym } from "@/lib/mock-data";

// Fix Leaflet default icon issue in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createGymIcon() {
  return L.divIcon({
    html: `<div style="background:#6366f1;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.4)"><span style="transform:rotate(45deg);font-size:14px;display:block;text-align:center;line-height:26px">🏋️</span></div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  });
}

function createUserIcon() {
  return L.divIcon({
    html: `<div style="background:#3b82f6;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 4px rgba(59,130,246,0.3)"></div>`,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

interface FlyToProps {
  lat: number;
  lon: number;
  zoom?: number;
}

function FlyTo({ lat, lon, zoom = 15 }: FlyToProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], zoom, { duration: 1 });
  }, [lat, lon, zoom, map]);
  return null;
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - half);
}

interface GymMapProps {
  gyms: GymFinderGym[];
  activeGymId?: string | null;
  onGymSelect?: (id: string) => void;
}

export default function GymMap({ gyms, activeGymId, onGymSelect }: GymMapProps) {
  const userMarkerRef = useRef<L.Marker | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const gymIcon = createGymIcon();
  const userIcon = createUserIcon();
  const activeGym = gyms.find((g) => g.id === activeGymId);

  function handleLocateMe() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      if (!mapRef.current) return;
      mapRef.current.flyTo([lat, lng], 15, { duration: 1 });
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([lat, lng]);
      } else {
        const m = L.marker([lat, lng], { icon: userIcon }).addTo(mapRef.current);
        userMarkerRef.current = m;
      }
    });
  }

  return (
    <div className="relative w-full" style={{ minHeight: "350px" }}>
      <MapContainer
        center={[48.0, 7.85]}
        zoom={12}
        style={{ width: "100%", height: "100%", minHeight: "350px" }}
        ref={(map) => { if (map) mapRef.current = map; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {activeGym && (
          <FlyTo lat={activeGym.lat} lon={activeGym.lon} />
        )}
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            position={[gym.lat, gym.lon]}
            icon={gymIcon}
            eventHandlers={{
              click: () => onGymSelect?.(gym.id),
            }}
          >
            <Popup>
              <div style={{ minWidth: "180px", fontFamily: "sans-serif" }}>
                <strong style={{ fontSize: "14px" }}>{gym.name}</strong>
                <p style={{ margin: "4px 0", fontSize: "12px", color: "#555" }}>{gym.address}</p>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#f59e0b" }}>{renderStars(gym.rating)} {gym.rating}</p>
                {gym.isHansefit && (
                  <span style={{ background: "#6366f1", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "4px", marginRight: "4px" }}>Hansefit</span>
                )}
                <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
                  <a
                    href={`/gym`}
                    style={{ background: "#6366f1", color: "#fff", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", textDecoration: "none" }}
                  >
                    Mehr Details
                  </a>
                  <a
                    href={`https://www.openstreetmap.org/directions?to=${gym.lat},${gym.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "#242424", color: "#f5f5f5", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", textDecoration: "none" }}
                  >
                    Route
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <button
        onClick={handleLocateMe}
        style={{
          position: "absolute",
          top: "80px",
          right: "10px",
          zIndex: 1000,
          background: "#1a1a1a",
          color: "#f5f5f5",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        📍 Mein Standort
      </button>
    </div>
  );
}
