import { useState, useEffect } from 'react';
import { fetchPopularCities } from '../api/weatherApi';

export function usePopularCities() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchPopularCities();
        setData(result);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load cities');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
}
