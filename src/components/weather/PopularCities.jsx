import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CONDITION_ICONS, getConditionColor } from '../../utils/weatherIcons';

function CityRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-2.5 px-3">
      <div className="flex items-center gap-3">
        <div className="shimmer w-6 h-6 rounded-full" />
        <div className="shimmer h-3.5 w-20 rounded" />
      </div>
      <div className="shimmer h-3 w-24 rounded" />
    </div>
  );
}

export default function PopularCities({ data, loading, onCityClick }) {
  return (
    <div className="glass-card p-4 fade-in flex flex-col gap-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white">Popular Cities</h3>
        <button
          className="text-xs flex items-center gap-0.5"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          View more
          <ChevronRight size={12} />
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {loading
          ? [...Array(5)].map((_, i) => <CityRowSkeleton key={i} />)
          : data.map((city, i) => {
              const emoji = CONDITION_ICONS[city.conditionGroup] || '🌡️';
              const colorClass = getConditionColor(city.conditionGroup);

              return (
                <button
                  key={city.city + i}
                  className="city-row group text-left"
                  onClick={() => onCityClick && onCityClick(city.city)}
                >
                  {/* Icon */}
                  <span
                    style={{ fontSize: '18px', flexShrink: 0 }}
                    title={city.conditionGroup}
                  >
                    {emoji}
                  </span>

                  {/* City name */}
                  <span
                    className="flex-1 text-sm font-medium"
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    {city.city}
                  </span>

                  {/* Condition + temp */}
                  <div className="text-right">
                    <span className={`text-xs ${colorClass}`}>
                      {city.condition}
                    </span>
                  </div>
                </button>
              );
            })}
      </div>
    </div>
  );
}
