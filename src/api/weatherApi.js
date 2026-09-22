import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Interceptors ─────────────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API Error:', err.response?.data || err.message);
    return Promise.reject(err);
  }
);

// ─── Weather Endpoints ────────────────────────────────────────

export const fetchCurrentWeather = (city) =>
  api.get('/weather/current', { params: { city } }).then((r) => r.data);

export const fetchCurrentWeatherByCoords = (lat, lon) =>
  api.get('/weather/current', { params: { lat, lon } }).then((r) => r.data);

export const fetchPopularCities = () =>
  api.get('/weather/popular-cities').then((r) => r.data);

// ─── Forecast Endpoints ───────────────────────────────────────

export const fetchDailyForecast = (city, days = 7) =>
  api.get('/forecast/daily', { params: { city, days } }).then((r) => r.data);

export const fetchHourlyForecast = (city) =>
  api.get('/forecast/hourly', { params: { city } }).then((r) => r.data);

// ─── User Endpoints ───────────────────────────────────────────

export const fetchSearchHistory = (limit = 10) =>
  api.get('/user/history', { params: { limit } }).then((r) => r.data);

export const fetchFavorites = () =>
  api.get('/user/favorites').then((r) => r.data);

export const addFavorite = (body) =>
  api.post('/user/favorites', body).then((r) => r.data);

export const removeFavorite = (id) =>
  api.delete(`/user/favorites/${id}`).then((r) => r.data);

export default api;
