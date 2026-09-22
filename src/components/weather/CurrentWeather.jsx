import React from 'react';
import { Droplets, Wind, Gauge, Sun } from 'lucide-react';
import { getWeatherEmoji, windDirArrow } from '../../utils/weatherIcons';

function SkeletonCard() {
  return (
    <div className="glass-card p-4 fade-in">
      <div className="shimmer h-4 w-32 rounded mb-2" />
      <div className="shimmer h-3 w-20 rounded mb-6" />
      <div className="flex items-center gap-4 mb-6">
        <div className="shimmer w-16 h-16 rounded-full" />
        <div>
          <div className="shimmer h-12 w-28 rounded mb-1" />
          <div className="shimmer h-4 w-20 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shimmer h-14 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function MetricItem({ icon: Icon, label, value, color }) {
  return (
    <div className="metric-pill">
      <Icon size={15} className={color || 'text-blue-300'} strokeWidth={1.8} />
      <span className="text-xs font-semibold text-white mt-0.5">{value}</span>
      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '10px' }}>
        {label}
      </span>
    </div>
  );
}

export default function CurrentWeather({ data, loading }) {
  if (loading || !data) return <SkeletonCard />;

  const emoji = getWeatherEmoji(data.conditionGroup, data.iconCode);
  const windArrow = windDirArrow(data.windDirection);
  const isDay = data.isDay;

  return (
    <div className="glass-card p-4 fade-in flex flex-col gap-3">
      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold text-white">Current Weather</h2>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {data.localTime}
        </p>
      </div>

      {/* Temperature + Icon */}
      <div className="flex items-center gap-4">
        {/* Weather icon */}
        <div className="flex-shrink-0 relative">
          <span style={{ fontSize: '60px', lineHeight: 1, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
            {emoji}
          </span>
        </div>

        {/* Temp */}
        <div>
          <div className="flex items-start">
            <span
              className="font-bold leading-none"
              style={{
                fontSize: '56px',
                background: 'linear-gradient(135deg, #e0f2fe, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {Math.round(data.temperature)}
            </span>
            <span className="text-xl font-light mt-2 ml-1"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
              °C
            </span>
          </div>
          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {data.condition}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {data.city}{data.country ? `, ${data.country}` : ''}
          </p>
        </div>
      </div>

      {/* 4-column metrics */}
      <div className="grid grid-cols-4 gap-1.5 mt-1">
        <MetricItem
          icon={Sun}
          label="UV"
          value={data.uvIndex || '—'}
          color="text-yellow-400"
        />
        <MetricItem
          icon={Droplets}
          label="Humidity"
          value={`${data.humidity}%`}
          color="text-blue-300"
        />
        <MetricItem
          icon={Wind}
          label="Wind"
          value={`${Math.round(data.windSpeed)}km/h`}
          color="text-cyan-300"
        />
        <MetricItem
          icon={Gauge}
          label="Pressure"
          value={Math.round(data.pressure)}
          color="text-purple-300"
        />
      </div>

      {/* Min / Max */}
      <div className="flex justify-between items-center mt-1 px-1">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Feels like <span className="text-white font-medium">{Math.round(data.feelsLike)}°</span>
        </span>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span className="text-red-300 font-medium">{Math.round(data.tempMax)}°</span>
          {' / '}
          <span className="text-blue-300 font-medium">{Math.round(data.tempMin)}°</span>
        </span>
      </div>
    </div>
  );
}
