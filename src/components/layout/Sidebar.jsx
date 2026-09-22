import React, { useState } from 'react';
import {
  LayoutDashboard, Map, Compass, Bookmark, Settings, LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Map,             label: 'Map',       id: 'map'       },
  { icon: Compass,         label: 'Explore',   id: 'explore'   },
  { icon: Bookmark,        label: 'Saved',     id: 'saved'     },
  { icon: Settings,        label: 'Settings',  id: 'settings'  },
];

export default function Sidebar() {
  const [active, setActive] = useState('dashboard');

  return (
    <aside
      className="flex flex-col items-center py-5 px-2 gap-3 h-full"
      style={{
        width: '64px',
        background: 'rgba(0,0,0,0.25)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl mb-4 cursor-pointer"
           style={{ background: 'rgba(79,195,247,0.18)', border: '1px solid rgba(79,195,247,0.3)' }}>
        <span className="text-xl">🌤</span>
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col items-center gap-2 flex-1">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            title={label}
            onClick={() => setActive(id)}
            className={`sidebar-icon-btn ${active === id ? 'active' : ''}`}
          >
            <Icon size={18} strokeWidth={1.8} />
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        title="Logout"
        className="sidebar-icon-btn"
        style={{ marginTop: 'auto' }}
      >
        <LogOut size={16} strokeWidth={1.8} />
      </button>
    </aside>
  );
}
