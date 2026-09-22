import React, { useState, useEffect } from 'react';
import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherMap     from '../components/map/WeatherMap';
import PopularCities  from '../components/weather/PopularCities';
import ForecastList   from '../components/weather/ForecastList';
import SummaryChart   from '../components/weather/SummaryChart';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import { useForecast }       from '../hooks/useForecast';
import { usePopularCities }  from '../hooks/usePopularCities';

const OWM_KEY = import.meta.env.VITE_OWM_KEY || '';

export default function Dashboard({ searchCity }) {
  const [activeCity, setActiveCity] = useState('Hyderabad');

  // Sync incoming search from TopBar
  useEffect(() => {
    if (searchCity && searchCity !== activeCity) {
      setActiveCity(searchCity);
    }
  }, [searchCity]);

  const { data: weather, loading: wLoading, error: wError, refresh: searchWeather } =
    useCurrentWeather(activeCity);

  const { daily, hourly, loading: fLoading } =
    useForecast(activeCity, 10);

  const { data: popularCities, loading: pLoading } =
    usePopularCities();

  // When city changes, refresh weather
  useEffect(() => {
    searchWeather(activeCity);
  }, [activeCity]);

  const handleCityClick = (city) => setActiveCity(city);

  return (
    <div className="flex flex-col gap-3 p-4 h-full"
         style={{ overflowY: 'auto', overflowX: 'hidden' }}>

      {/* Error banner */}
      {wError && (
        <div className="rounded-xl px-4 py-2.5 text-sm fade-in"
             style={{
               background: 'rgba(239,68,68,0.12)',
               border: '1px solid rgba(239,68,68,0.3)',
               color: '#fca5a5',
             }}>
          ⚠️ {wError}
        </div>
      )}

      {/* ── TOP ROW ────────────────────────────────────────────── */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: '1fr 1.8fr 1fr', minHeight: '260px' }}
      >
        <CurrentWeather data={weather} loading={wLoading} />

        <WeatherMap
          lat={weather?.lat  ?? 17.385}
          lon={weather?.lon  ?? 78.4867}
          city={weather?.city ?? activeCity}
          apiKey={OWM_KEY}
        />

        <PopularCities
          data={popularCities}
          loading={pLoading}
          onCityClick={handleCityClick}
        />
      </div>

      {/* ── BOTTOM ROW ─────────────────────────────────────────── */}
      <div
        className="grid gap-3 flex-1"
        style={{ gridTemplateColumns: '1fr 2.2fr', minHeight: '260px' }}
      >
        <ForecastList daily={daily} loading={fLoading} />

        <SummaryChart hourly={hourly} loading={fLoading} />
      </div>
    </div>
  );
}
