import React, { useState } from 'react';
import { CONDITION_ICONS } from '../../utils/weatherIcons';

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2 px-2">
      <div className="shimmer w-8 h-8 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <div className="shimmer h-3 w-16 rounded mb-1" />
      </div>
      <div className="shimmer h-3 w-12 rounded" />
    </div>
  );
}

export default function ForecastList({ daily, loading, activeCityIndex }) {
  const [days,      setDays]      = useState(7);
  const [activeRow, setActiveRow] = useState(activeCityIndex ?? 3);

  const displayData = daily.slice(0, days);

  return (
    <div className="glass-card p-4 fade-in flex flex-col gap-2 h-full">
      {/* Header + Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Forecast</h3>
        <div className="flex items-center rounded-lg overflow-hidden"
             style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {[7, 10].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className="px-3 py-1 text-xs font-medium transition-all"
              style={{
                background: days === d ? 'rgba(255,255,255,0.18)' : 'transparent',
                color: days === d ? 'white' : 'rgba(255,255,255,0.45)',
                borderRadius: '6px',
              }}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-0.5 overflow-y-auto flex-1" style={{ maxHeight: '300px' }}>
        {loading
          ? [...Array(6)].map((_, i) => <RowSkeleton key={i} />)
          : displayData.map((day, i) => {
              const emoji = CONDITION_ICONS[day.conditionGroup] || '🌡️';
              const isActive = i === activeRow;

              return (
                <button
                  key={day.date}
                  className={`forecast-row ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveRow(i)}
                >
                  {/* Icon */}
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{emoji}</span>

                  {/* Temp range */}
                  <div className="flex items-center gap-1 text-sm font-semibold"
                       style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.8)', minWidth: '80px' }}>
                    <span style={{ color: '#93c5fd' }}>{Math.round(day.tempMax)}°</span>
                    <span style={{ color: 'rgba(255,255,255,0.35)' }}>/</span>
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>{Math.round(day.tempMin)}°</span>
                  </div>

                  {/* Date */}
                  <div className="flex-1 text-right">
                    <span className="text-xs"
                          style={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)' }}>
                      {day.date}
                    </span>
                  </div>
                </button>
              );
            })}
      </div>
    </div>
  );
}
