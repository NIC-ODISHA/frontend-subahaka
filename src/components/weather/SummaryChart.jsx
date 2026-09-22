import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { CONDITION_ICONS } from '../../utils/weatherIcons';

// ─── Custom Tooltip ───────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(5,20,50,0.95)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '10px',
      padding: '8px 12px',
      backdropFilter: 'blur(10px)',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginBottom: '2px' }}>{label}</p>
      <p style={{ color: 'white', fontSize: '15px', fontWeight: 700 }}>
        {payload[0]?.value}°C
      </p>
      <p style={{ color: '#81d4fa', fontSize: '11px' }}>
        🌧 {payload[0]?.payload?.chanceOfRain ?? 0}% rain
      </p>
    </div>
  );
}

// ─── Custom X-axis Tick (show temp above axis) ────────────────
function TempLabel({ x, y, value }) {
  return (
    <text x={x} y={y - 10} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={11} fontWeight={600}>
      {value}°
    </text>
  );
}

// ─── Rain icon row ────────────────────────────────────────────
function RainRow({ data }) {
  return (
    <div className="flex items-center mt-2 pt-2"
         style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Label */}
      <div className="flex flex-col gap-0.5 mr-3" style={{ minWidth: '40px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Rain %</span>
      </div>

      {/* Per-hour icons + percentages */}
      <div className="flex-1 flex justify-between">
        {data.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span style={{ fontSize: '14px' }}>
              {h.chanceOfRain > 60 ? '🌧️' : h.chanceOfRain > 30 ? '🌦️' : '⛅'}
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              {h.chanceOfRain}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Time axis row ────────────────────────────────────────────
function TimeRow({ data }) {
  return (
    <div className="flex mt-2" style={{ paddingLeft: '44px' }}>
      <div className="flex-1 flex justify-between">
        {data.map((h, i) => (
          <span key={i} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', minWidth: '30px' }}>
            {h.time}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────
function ChartSkeleton() {
  return (
    <div className="glass-card p-4 fade-in">
      <div className="shimmer h-4 w-24 rounded mb-4" />
      <div className="shimmer h-40 w-full rounded-xl" />
      <div className="flex gap-2 mt-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="shimmer w-6 h-6 rounded-full" />
            <div className="shimmer h-2 w-8 rounded" />
            <div className="shimmer h-2 w-8 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SummaryChart({ hourly, loading }) {
  const [view, setView] = useState('Summary'); // Summary | Hourly | More Details

  if (loading || !hourly?.length) return <ChartSkeleton />;

  // Limit to 10 hourly data points
  const data = hourly.slice(0, 10);

  // Find "Today" and next day boundary
  const todayIdx    = 0;
  const tomorrowIdx = data.findIndex((h, i) => i > 0 && h.time === '12 AM') ?? 5;

  return (
    <div className="glass-card p-4 fade-in flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Summary</h3>
        <div className="flex items-center rounded-lg overflow-hidden"
             style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {['Summary', 'Hourly', 'More Details'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1 text-xs font-medium transition-all"
              style={{
                background: view === v ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: view === v ? 'white' : 'rgba(255,255,255,0.45)',
                borderRadius: '6px',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* "Today" / "Tomorrow" labels over chart */}
      <div className="relative mb-1 flex gap-0" style={{ paddingLeft: '36px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Today</span>
        {tomorrowIdx > 0 && (
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginLeft: `${tomorrowIdx * 10}%` }}>
            Sat {new Date().getDate() + 1}
          </span>
        )}
      </div>

      {/* Recharts Area Chart */}
      <ResponsiveContainer width="100%" height={130}>
        <AreaChart data={data} margin={{ top: 24, right: 8, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="rgba(79,195,247,0.4)"  stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgba(79,195,247,0.02)" stopOpacity={0}   />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            tick={false}
            axisLine={false}
            tickLine={false}
          />

          <YAxis hide domain={['auto', 'auto']} />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#4fc3f7"
            strokeWidth={2.5}
            fill="url(#tempGradient)"
            dot={{ fill: '#4fc3f7', strokeWidth: 2, r: 4, stroke: 'rgba(255,255,255,0.6)' }}
            activeDot={{ r: 6, fill: '#4fc3f7', stroke: 'white', strokeWidth: 2 }}
            label={<TempLabel />}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Rain % icon row */}
      <RainRow data={data} />

      {/* Time labels */}
      <TimeRow data={data} />
    </div>
  );
}
