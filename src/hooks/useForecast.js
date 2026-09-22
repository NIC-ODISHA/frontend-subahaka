import { useState, useEffect, useCallback } from 'react';
import { fetchDailyForecast, fetchHourlyForecast } from '../api/weatherApi';

export function useForecast(city, forecastDays = 7) {
  const [daily,   setDaily]   = useState([]);
  const [hourly,  setHourly]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const load = useCallback(async (targetCity, days) => {
    if (!targetCity) return;
    setLoading(true);
    setError(null);
    try {
      const [dailyData, hourlyData] = await Promise.all([
        fetchDailyForecast(targetCity, days),
        fetchHourlyForecast(targetCity),
      ]);
      setDaily(dailyData);
      setHourly(hourlyData);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load forecast data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(city, forecastDays);
  }, [city, forecastDays, load]);

  return { daily, hourly, loading, error, refresh: load };
}
