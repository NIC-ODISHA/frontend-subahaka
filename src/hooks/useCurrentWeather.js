import { useState, useEffect, useCallback } from 'react';
import { fetchCurrentWeather, fetchCurrentWeatherByCoords } from '../api/weatherApi';

export function useCurrentWeather(initialCity = 'Hyderabad') {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [city, setCity]       = useState(initialCity);

  const load = useCallback(async (cityOrCoords) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (typeof cityOrCoords === 'string') {
        result = await fetchCurrentWeather(cityOrCoords);
        setCity(cityOrCoords);
      } else if (cityOrCoords?.lat && cityOrCoords?.lon) {
        result = await fetchCurrentWeatherByCoords(cityOrCoords.lat, cityOrCoords.lon);
        setCity(result.city);
      }
      setData(result);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(initialCity); }, []);

  return { data, loading, error, city, refresh: load };
}
