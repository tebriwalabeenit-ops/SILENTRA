import React from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { PieChart } from 'lucide-react';

export const OccupancySummary: React.FC = () => {
  const { floors, zones, seats } = useLibraryStore();

  return (
    <div className="bg-white border border-surface-border rounded p-3.5 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-surface-border">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-forest" />
          <h3 className="text-xs font-bold text-surface-charcoal uppercase tracking-wider">
            Occupancy Breakdown
          </h3>
        </div>
        <span className="text-[11px] text-surface-charcoal/60 font-mono">
          Floor & Zone Distribution
        </span>
      </div>

      {/* Floor-wise Progress Bars */}
      <div className="space-y-3">
        {floors.map((floor) => {
          const floorSeats = seats.filter((s) => s.floorId === floor.id);
          const occupied = floorSeats.filter((s) => s.status === 'OCCUPIED').length;
          const total = floorSeats.length || 1;
          const percent = ((occupied / total) * 100).toFixed(0);

          return (
            <div key={floor.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-surface-charcoal">
                  Level {floor.floorNumber} — {floor.name.split('—')[1]?.trim() || floor.name}
                </span>
                <span className="font-mono text-surface-charcoal/80">
                  {occupied} / {total} ({percent}%)
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-surface-grey rounded-full overflow-hidden flex">
                <div 
                  className="bg-forest h-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Zone-wise Table Summary */}
      <div className="mt-4 pt-3 border-t border-surface-border">
        <span className="text-[10px] font-bold text-surface-charcoal/70 uppercase tracking-wider block mb-2">
          Zone Capacity & Ambient Noise
        </span>
        <div className="space-y-1.5 text-xs">
          {zones.map((zone) => {
            const isHw = zone.id === 'zone-1a';
            return (
              <div 
                key={zone.id}
                className="flex items-center justify-between p-1.5 rounded bg-surface-grey/40 hover:bg-surface-grey/80 transition-colors"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-medium text-surface-charcoal truncate">
                    {zone.name}
                  </span>
                  {isHw ? (
                    <span className="text-[9px] font-bold text-forest bg-forest/10 px-1 py-0.2 rounded border border-forest/20 shrink-0">
                      2 HW SEATS
                    </span>
                  ) : (
                    <span className="text-[9px] font-medium text-surface-charcoal/50 bg-white px-1 py-0.2 rounded border border-surface-border shrink-0">
                      DEMO
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                  <span className="text-surface-charcoal font-semibold">
                    {zone.occupiedCount}/{zone.capacity}
                  </span>
                  <span className="text-surface-charcoal/40">·</span>
                  <span className="text-surface-charcoal/70" title="Estimated noise baseline">
                    {zone.currentDecibels} dB <span className="text-[9px] text-surface-charcoal/50">(Est)</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
