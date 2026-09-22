import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { fetchSearchHistory } from '../../api/weatherApi';

export default function TopBar({ onSearch, currentCity }) {
  const [query,       setQuery]       = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSugg,    setShowSugg]    = useState(false);
  const [history,     setHistory]     = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Load recent history on mount
  useEffect(() => {
    fetchSearchHistory(6)
      .then((data) => setHistory(data.map((h) => h.cityName)))
      .catch(() => {});
  }, []);

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      // Filter history as suggestions
      const filtered = history.filter((c) =>
        c.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.length ? filtered : []);
      setShowSugg(true);
    } else {
      setShowSugg(val.length === 0 && history.length > 0);
      setSuggestions(history.slice(0, 5));
    }
  };

  const handleFocus = () => {
    if (history.length > 0) {
      setSuggestions(history.slice(0, 5));
      setShowSugg(true);
    }
  };

  const handleSelect = (city) => {
    setQuery(city);
    setShowSugg(false);
    onSearch(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSugg(false);
      onSearch(query.trim());
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setShowSugg(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex items-center gap-3 px-5 py-3" style={{
      background: 'rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Search bar */}
      <div ref={containerRef} className="relative flex-1 max-w-xs">
        <form onSubmit={handleSubmit} className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInput}
            onFocus={handleFocus}
            placeholder="Search for location"
            className="glass-input w-full pl-9 pr-4 py-2 text-sm rounded-xl"
          />
        </form>

        {/* Suggestions dropdown */}
        {showSugg && suggestions.length > 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 z-50 rounded-xl overflow-hidden"
               style={{
                 background: 'rgba(10,25,60,0.95)',
                 border: '1px solid rgba(255,255,255,0.15)',
                 backdropFilter: 'blur(20px)',
               }}>
            {suggestions.map((city, i) => (
              <button
                key={i}
                className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  borderBottom: i < suggestions.length - 1
                    ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                onClick={() => handleSelect(city)}
              >
                <Search size={12} style={{ color: 'rgba(255,255,255,0.35)' }} />
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notifications */}
      <button className="sidebar-icon-btn relative" title="Notifications">
        <Bell size={17} strokeWidth={1.8} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: '#f59e0b' }} />
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer"
           style={{
             background: 'linear-gradient(135deg, #4fc3f7, #7986cb)',
             border: '2px solid rgba(255,255,255,0.3)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
           }}>
        <span className="text-sm font-semibold text-white select-none">S</span>
      </div>
    </div>
  );
}
