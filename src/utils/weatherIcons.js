// Maps OWM condition groups and icon codes to emoji/SVG labels.
// conditionGroup comes from OWM's "main" field: Clear, Clouds, Rain, Drizzle,
// Thunderstorm, Snow, Mist, Fog, Haze, etc.

export const CONDITION_ICONS = {
  Clear:        '☀️',
  Clouds:       '🌥️',
  Rain:         '🌧️',
  Drizzle:      '🌦️',
  Thunderstorm: '⛈️',
  Snow:         '❄️',
  Mist:         '🌫️',
  Fog:          '🌫️',
  Haze:         '🌁',
  Smoke:        '🌁',
  Dust:         '💨',
  Sand:         '💨',
  Ash:          '🌋',
  Squall:       '🌬️',
  Tornado:      '🌪️',
};

export const CONDITION_COLORS = {
  Clear:        'text-yellow-400',
  Clouds:       'text-blue-300',
  Rain:         'text-blue-400',
  Drizzle:      'text-cyan-400',
  Thunderstorm: 'text-purple-400',
  Snow:         'text-white',
  Mist:         'text-gray-400',
  Fog:          'text-gray-400',
  Haze:         'text-gray-400',
  default:      'text-white',
};

// Returns a detailed weather SVG icon component for the current weather card
export function getWeatherEmoji(conditionGroup, iconCode) {
  const isNight = iconCode && iconCode.endsWith('n');

  if (conditionGroup === 'Clear') return isNight ? '🌙' : '☀️';
  if (conditionGroup === 'Clouds') return isNight ? '☁️' : '⛅';
  return CONDITION_ICONS[conditionGroup] || '🌡️';
}

export function getConditionColor(conditionGroup) {
  return CONDITION_COLORS[conditionGroup] || CONDITION_COLORS.default;
}

// Wind direction arrow helper
export function windDirArrow(direction) {
  const map = {
    N: '↑', NNE: '↑', NE: '↗', ENE: '→',
    E: '→', ESE: '→', SE: '↘', SSE: '↓',
    S: '↓', SSW: '↓', SW: '↙', WSW: '←',
    W: '←', WNW: '←', NW: '↖', NNW: '↑',
  };
  return map[direction] || '→';
}

// Format a unix timestamp to readable time string
export function formatTime(epoch) {
  if (!epoch) return '--';
  return new Date(epoch * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
}

// UV Index label
export function uvLabel(uv) {
  if (uv <= 2) return { label: 'Low',       color: 'text-green-400' };
  if (uv <= 5) return { label: 'Moderate',  color: 'text-yellow-400' };
  if (uv <= 7) return { label: 'High',      color: 'text-orange-400' };
  if (uv <= 10) return { label: 'V. High',  color: 'text-red-400' };
  return              { label: 'Extreme',   color: 'text-purple-400' };
}
