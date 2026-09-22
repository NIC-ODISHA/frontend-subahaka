import React, { useState, useCallback } from 'react';
import Sidebar   from './components/layout/Sidebar';
import TopBar    from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';

// 3D-style animated cloud SVG component
function CloudSvg({ style }) {
  return (
    <svg
      viewBox="0 0 220 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <defs>
        <filter id="cs" x="-10%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="rgba(255,255,255,0.18)" />
        </filter>
        <linearGradient id="cg" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%"   stopColor="#e8f4fd" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.88" />
        </linearGradient>
      </defs>
      {/* Cloud body */}
      <ellipse cx="110" cy="100" rx="96"  ry="26"  fill="url(#cg)" filter="url(#cs)" />
      <circle  cx="72"  cy="84"  r="32"              fill="url(#cg)" filter="url(#cs)" />
      <circle  cx="115" cy="70"  r="42"              fill="url(#cg)" filter="url(#cs)" />
      <circle  cx="158" cy="82"  r="28"              fill="url(#cg)" filter="url(#cs)" />
      <ellipse cx="110" cy="100" rx="90"  ry="20"    fill="url(#cg)" />
    </svg>
  );
}

export default function App() {
  const [searchCity, setSearchCity] = useState(null);

  const handleSearch = useCallback((city) => {
    setSearchCity(city);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(150deg, #1d4080 0%, #0d1f3c 40%, #162e5e 75%, #1a3a6b 100%)',
      }}
    >
      {/* ── Animated background ───────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        }}
      >
        {/* Clouds */}
        <CloudSvg style={{
          position: 'absolute', top: '2%', left: '4%',
          width: '160px', opacity: 0.88,
          animation: 'float 9s ease-in-out infinite',
          filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.12))',
        }} />
        <CloudSvg style={{
          position: 'absolute', top: '1%', left: '36%',
          width: '120px', opacity: 0.72,
          animation: 'float 13s ease-in-out 1.8s infinite',
        }} />
        <CloudSvg style={{
          position: 'absolute', top: '0%', right: '4%',
          width: '190px', opacity: 0.82,
          animation: 'float 11s ease-in-out 3.5s infinite',
          filter: 'drop-shadow(0 12px 32px rgba(255,255,255,0.1))',
        }} />

        {/* Ambient glow spheres */}
        <div style={{
          position: 'absolute', top: '15%', left: '25%',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.055) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', right: '18%',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 65%)',
        }} />
      </div>

      {/* ── App Shell ─────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', height: '100%', overflow: 'hidden',
      }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <TopBar onSearch={handleSearch} />

          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Dashboard searchCity={searchCity} />
          </div>
        </div>
      </div>
    </div>
  );
}
