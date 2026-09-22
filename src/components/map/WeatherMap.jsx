import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Settings2, MoreHorizontal } from 'lucide-react';
import L from 'leaflet';

// Fix Leaflet default icon paths with Vite bundler
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Pulsing red location marker
const PulseIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative;width:16px;height:16px;">
      <div style="
        position:absolute;inset:-4px;border-radius:50%;
        background:rgba(239,68,68,0.25);
        animation:pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite;
      "></div>
      <div style="
        position:absolute;inset:0;border-radius:50%;
        background:#ef4444;
        border:2.5px solid white;
        box-shadow:0 0 10px rgba(239,68,68,0.9);
      "></div>
    </div>
    <style>
      @keyframes pulseRing {
        0%,100%{transform:scale(1);opacity:0.8}
        50%{transform:scale(2.5);opacity:0}
      }
    </style>
  `,
  iconSize:   [16, 16],
  iconAnchor: [8, 8],
});

// Internal component that updates map center reactively (must be inside MapContainer)
function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 8, { animate: true, duration: 1.2 });
  }, [center[0], center[1]]);
  return null;
}

export default function WeatherMap({ lat = 17.385, lon = 78.4867, city = 'Hyderabad', apiKey = '' }) {
  const center = [lat, lon];

  return (
    <div
      className="glass-card overflow-hidden relative fade-in"
      style={{ minHeight: '260px', padding: 0 }}
    >
      {/* Overlay controls */}
      <div
        className="absolute top-3 right-3 z-[1000] flex gap-2"
        aria-label="Map controls"
      >
        <button className="glass-btn p-1.5 rounded-lg" title="Map settings">
          <Settings2 size={14} strokeWidth={1.8} />
        </button>
        <button className="glass-btn p-1.5 rounded-lg" title="More options">
          <MoreHorizontal size={14} strokeWidth={1.8} />
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        style={{ height: '260px', width: '100%', borderRadius: '16px' }}
      >
        {/* ── Base Map ──────────────────────────────── */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ── OWM Precipitation overlay ─────────────── */}
        {apiKey && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.55}
          />
        )}

        {/* ── OWM Clouds overlay ────────────────────── */}
        {apiKey && (
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`}
            opacity={0.3}
          />
        )}

        {/* ── City marker ───────────────────────────── */}
        <Marker position={center} icon={PulseIcon}>
          <Popup closeButton={false}>
            <div
              style={{
                background: 'rgba(10,25,60,0.95)',
                padding: '6px 12px',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                border: '1px solid rgba(255,255,255,0.18)',
                whiteSpace: 'nowrap',
              }}
            >
              📍 {city}
            </div>
          </Popup>
        </Marker>

        {/* ── Reactive center ───────────────────────── */}
        <MapCenterUpdater center={center} />
      </MapContainer>
    </div>
  );
}
