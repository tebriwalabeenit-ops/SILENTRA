import React, { useState } from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { DataOriginBadge } from '../../components/common/DataOriginBadge';
import { 
  Activity, 
  LogIn, 
  LogOut, 
  Volume2, 
  HeartHandshake, 
  UserCheck, 
  UserX
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { DataOrigin } from '../../types';

export const RecentActivityFeed: React.FC = () => {
  const { activities } = useLibraryStore();
  const [filter, setFilter] = useState<'ALL' | DataOrigin>('ALL');

  const filteredActivities = activities.filter((act) => {
    if (filter === 'ALL') return true;
    return act.dataOrigin === filter;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ENTRY':
        return <LogIn className="w-3.5 h-3.5 text-forest" />;
      case 'EXIT':
        return <LogOut className="w-3.5 h-3.5 text-status-occupied" />;
      case 'SEAT_OCCUPIED':
        return <UserCheck className="w-3.5 h-3.5 text-forest" />;
      case 'SEAT_VACATED':
        return <UserX className="w-3.5 h-3.5 text-surface-charcoal/60" />;
      case 'NOISE_WARNING':
        return <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />;
      case 'HEARTBEAT':
      default:
        return <HeartHandshake className="w-3.5 h-3.5 text-forest" />;
    }
  };

  return (
    <div className="bg-white border border-surface-border rounded p-3.5 shadow-xs">
      
      {/* Header & Filter Controls */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-forest" />
          <h3 className="text-xs font-bold text-surface-charcoal uppercase tracking-wider">
            Live Facility Activity
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-surface-grey rounded p-0.5 border border-surface-border text-[10px]">
          <button
            onClick={() => setFilter('ALL')}
            className={cn(
              "px-2 py-0.5 rounded font-medium transition-colors",
              filter === 'ALL'
                ? "bg-white text-forest font-semibold shadow-2xs border border-surface-border"
                : "text-surface-charcoal/70 hover:text-surface-charcoal"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('HARDWARE')}
            className={cn(
              "px-2 py-0.5 rounded font-medium transition-colors",
              filter === 'HARDWARE'
                ? "bg-white text-forest font-semibold shadow-2xs border border-surface-border"
                : "text-surface-charcoal/70 hover:text-surface-charcoal"
            )}
          >
            Hardware
          </button>
          <button
            onClick={() => setFilter('DEMO')}
            className={cn(
              "px-2 py-0.5 rounded font-medium transition-colors",
              filter === 'DEMO'
                ? "bg-white text-forest font-semibold shadow-2xs border border-surface-border"
                : "text-surface-charcoal/70 hover:text-surface-charcoal"
            )}
          >
            Demo
          </button>
        </div>
      </div>

      {/* Activity List Stream */}
      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
        {filteredActivities.length === 0 ? (
          <div className="p-4 text-center text-xs text-surface-charcoal/60">
            No events found for current filter.
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="p-2 rounded bg-surface-grey/30 border border-surface-border hover:bg-surface-grey/60 transition-colors flex items-start gap-2 text-xs"
            >
              <div className="mt-0.5 w-5 h-5 rounded bg-white border border-surface-border flex items-center justify-center shrink-0">
                {getActivityIcon(act.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-semibold text-surface-charcoal font-mono text-[11px] truncate">
                    {act.entityId}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <DataOriginBadge origin={act.dataOrigin} size="sm" />
                    <span className="text-[10px] text-surface-charcoal/50 font-mono">
                      {act.timestamp}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-surface-charcoal/80 leading-snug">
                  {act.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
