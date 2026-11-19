import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Layers, 
  Armchair, 
  Volume2, 
  BarChart3, 
  FileText, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Library View', path: '/library-view', icon: Box },
  { name: 'Floor Management', path: '/floor-management', icon: Layers },
  { name: 'Seats & Users', path: '/seats-users', icon: Armchair },
  { name: 'Noise Monitoring', path: '/noise-monitoring', icon: Volume2 },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const HorizontalNav: React.FC = () => {
  return (
    <nav className="bg-white border-b border-surface-border">
      <div className="max-w-[1720px] mx-auto px-4">
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 rounded text-xs font-medium whitespace-nowrap transition-colors relative",
                    isActive
                      ? "text-forest bg-forest/5 font-semibold after:absolute after:bottom-[-5px] after:left-2 after:right-2 after:h-[2px] after:bg-forest"
                      : "text-surface-charcoal/70 hover:text-surface-charcoal hover:bg-surface-grey"
                  )
                }
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-forest text-white font-semibold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
