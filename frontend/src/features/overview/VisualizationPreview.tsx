import React from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DataOriginBadge } from '../../components/common/DataOriginBadge';
import { 
  Layers, 
  Box, 
  Flame, 
  MapPin, 
  Zap, 
  Info, 
  MousePointerClick
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Seat } from '../../types';

export const VisualizationPreview: React.FC = () => {
  const { 
    floors, 
    selectedFloorId, 
    setSelectedFloorId, 
    viewMode, 
    setViewMode, 
    seats,
    selectedSeatId,
    selectSeat,
    toggleSeatOccupancy
  } = useLibraryStore();

  const currentFloor = floors.find((f) => f.id === selectedFloorId) || floors[0];
  const floorSeats = seats.filter((s) => s.floorId === selectedFloorId);
  const selectedSeat = seats.find((s) => s.id === selectedSeatId);

  return (
    <div className="bg-white border border-surface-border rounded flex flex-col h-full shadow-xs">
      
      {/* 1. TOP CONTROLS TOOLBAR */}
      <div className="p-3 border-b border-surface-border flex flex-wrap items-center justify-between gap-3 bg-surface-grey/30">
        
        {/* Floor Selection */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-surface-charcoal/70 uppercase tracking-wider mr-1">
            Floor:
          </span>
          <div className="flex items-center bg-surface-grey rounded p-0.5 border border-surface-border">
            {floors.map((floor) => (
              <button
                key={floor.id}
                onClick={() => setSelectedFloorId(floor.id)}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded transition-colors",
                  selectedFloorId === floor.id
                    ? "bg-white text-forest font-semibold shadow-xs border border-surface-border"
                    : "text-surface-charcoal/70 hover:text-surface-charcoal"
                )}
              >
                L{floor.floorNumber}
              </button>
            ))}
          </div>
          <span className="text-xs text-surface-charcoal/80 font-medium ml-2 hidden sm:inline">
            {currentFloor?.name}
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-surface-grey rounded p-0.5 border border-surface-border">
          <button
            onClick={() => setViewMode('2d')}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors",
              viewMode === '2d'
                ? "bg-white text-forest font-semibold shadow-xs border border-surface-border"
                : "text-surface-charcoal/70 hover:text-surface-charcoal"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2D CAD</span>
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors",
              viewMode === '3d'
                ? "bg-white text-forest font-semibold shadow-xs border border-surface-border"
                : "text-surface-charcoal/70 hover:text-surface-charcoal"
            )}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Isometric</span>
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors",
              viewMode === 'heatmap'
                ? "bg-white text-forest font-semibold shadow-xs border border-surface-border"
                : "text-surface-charcoal/70 hover:text-surface-charcoal"
            )}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Noise Heatmap</span>
          </button>
        </div>

      </div>

      {/* 2. LEGEND BAR */}
      <div className="px-3 py-2 border-b border-surface-border bg-white flex flex-wrap items-center justify-between text-[11px] gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-surface-charcoal/60 uppercase tracking-wider text-[10px]">
            Occupancy:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39966A]" />
            <span className="text-surface-charcoal/80">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D95757]" />
            <span className="text-surface-charcoal/80">Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#929B96]" />
            <span className="text-surface-charcoal/80">Offline</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-surface-charcoal/60 uppercase tracking-wider text-[10px]">
            Data Feed:
          </span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-forest border border-forest-dark" />
            <span className="text-surface-charcoal/80 font-medium">Physical Hardware (ESP32)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-surface-grey border border-surface-border" />
            <span className="text-surface-charcoal/80">Virtual Simulation [DEMO]</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN VISUALIZATION WORKSPACE */}
      <div className="flex-1 p-4 bg-surface-warm min-h-[380px] flex flex-col justify-center relative overflow-hidden">
        
        {/* VIEW MODE 1: 2D ARCHITECTURAL BLUEPRINT */}
        {viewMode === '2d' && (
          <div className="w-full h-full flex flex-col justify-between">
            
            {/* Architectural Spatial Grid */}
            <div className="border-2 border-surface-border rounded bg-white p-4 relative shadow-inner">
              
              {/* Floor Plan Header Tag */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-forest" />
                  <span className="text-xs font-bold text-surface-charcoal uppercase tracking-wider">
                    Architectural Layout — {currentFloor?.name}
                  </span>
                </div>
                <div className="text-[11px] text-surface-charcoal/60 font-mono">
                  Scale: 1m = Grid Unit · Dimension: {currentFloor?.widthMeters}m × {currentFloor?.lengthMeters}m
                </div>
              </div>

              {/* Entrance Gate Representation */}
              {selectedFloorId === 'floor-1' && (
                <div className="mb-4 p-2 bg-surface-grey/60 border border-dashed border-forest/40 rounded flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                    <span className="font-semibold text-forest">Portal Gate FL01-GATE-01</span>
                    <span className="text-[10px] text-surface-charcoal/60">
                      (Dual IR Break-beam Channels GPIO 25 & 26)
                    </span>
                  </div>
                  <DataOriginBadge origin="HARDWARE" size="sm" />
                </div>
              )}

              {/* Seats Matrix Render */}
              <div className="space-y-4">
                
                {/* Zone 1A: Study Carrels */}
                <div className="border border-surface-border rounded p-3 bg-surface-grey/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-surface-charcoal">
                        Zone ZN-01A: Quiet Study Carrels
                      </span>
                      <span className="text-[10px] text-surface-charcoal/60">
                        (Mic Monitored: 52.4 dB / Limit 55 dB)
                      </span>
                    </div>
                    <span className="text-[11px] text-surface-charcoal/70">
                      Click seat to toggle occupancy test
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {floorSeats.slice(0, 12).map((seat) => (
                      <SeatTile
                        key={seat.id}
                        seat={seat}
                        isSelected={selectedSeatId === seat.id}
                        onSelect={() => selectSeat(seat.id)}
                        onToggle={() => toggleSeatOccupancy(seat.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Zone 1B: Central Reference Desks */}
                {floorSeats.length > 12 && (
                  <div className="border border-surface-border rounded p-3 bg-surface-grey/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-surface-charcoal">
                        Zone ZN-01B: Central Stacks & Reference Desks
                      </span>
                      <span className="text-[10px] text-surface-charcoal/60">
                        (Simulated Ambient Zone: 48.0 dB)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {floorSeats.slice(12, 24).map((seat) => (
                        <SeatTile
                          key={seat.id}
                          seat={seat}
                          isSelected={selectedSeatId === seat.id}
                          onSelect={() => selectSeat(seat.id)}
                          onToggle={() => toggleSeatOccupancy(seat.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* VIEW MODE 2: 3D DIGITAL TWIN PREVIEW */}
        {viewMode === '3d' && (
          <div className="border-2 border-surface-border rounded bg-white p-6 flex flex-col items-center justify-center text-center h-full min-h-[320px]">
            <div className="w-12 h-12 rounded bg-forest/10 border border-forest/30 flex items-center justify-center text-forest mb-3">
              <Box className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-surface-charcoal uppercase tracking-wider mb-1">
              3D Isometric Digital Twin
            </h4>
            <p className="text-xs text-surface-charcoal/70 max-w-md mb-4">
              The Three.js / React Three Fiber interactive viewport is scheduled for Phase 3. 
              The 2D CAD coordinate system above serves as the direct single source of truth for all 3D mesh transforms.
            </p>
            <div className="p-3 bg-surface-grey rounded border border-surface-border text-left font-mono text-[11px] text-surface-charcoal/80 space-y-1">
              <div>• Default Viewport: Isometric (Azimuth 45°, Elevation 35.26°)</div>
              <div>• Parametric Mapping: X = x_2D - W/2, Z = y_2D - L/2</div>
              <div>• Live Monitored Chairs: Seats FL01-ZNA-S001 & FL01-ZNA-S002</div>
            </div>
          </div>
        )}

        {/* VIEW MODE 3: NOISE HEATMAP PREVIEW */}
        {viewMode === 'heatmap' && (
          <div className="border-2 border-surface-border rounded bg-white p-6 flex flex-col h-full min-h-[320px]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D9A441]" />
                <span className="text-xs font-bold text-surface-charcoal uppercase tracking-wider">
                  Acoustic Noise Intensity Distribution — {currentFloor?.name}
                </span>
              </div>
              <span className="text-xs font-mono text-forest">
                Hardware Mic: 52.4 dB SPL (INMP441 I2S)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div className="p-4 rounded border border-surface-border bg-emerald-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-forest">Zone ZN-01A: Study Carrels</span>
                    <DataOriginBadge origin="HARDWARE" size="sm" />
                  </div>
                  <span className="text-[11px] text-surface-charcoal/70">
                    Real-time I2S Audio Sampling
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-forest">52.4 dB</span>
                  <span className="text-xs text-forest font-medium">Within Quiet Limit (55.0 dB)</span>
                </div>
              </div>

              <div className="p-4 rounded border border-surface-border bg-amber-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#D9A441]">Zone ZN-01B: Central Stacks</span>
                    <DataOriginBadge origin="DEMO" size="sm" />
                  </div>
                  <span className="text-[11px] text-surface-charcoal/70">
                    Synthetic Stochastic Walk
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-surface-charcoal">56.1 dB</span>
                  <span className="text-xs text-[#D9A441] font-medium">Ambient Flow (Limit 62.0 dB)</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 4. SELECTED SEAT DETAIL STRIP */}
      {selectedSeat ? (
        <div className="p-3 border-t border-surface-border bg-surface-grey/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-forest text-sm">{selectedSeat.seatCode}</span>
            <StatusBadge status={selectedSeat.status} />
            <DataOriginBadge origin={selectedSeat.dataOrigin} />
            <span className="text-surface-charcoal/70">Zone: {selectedSeat.zoneName}</span>
            <span className="text-surface-charcoal/50">|</span>
            <span className="text-surface-charcoal/70 font-mono">
              Coord: ({selectedSeat.coordX.toFixed(1)}m, {selectedSeat.coordY.toFixed(1)}m)
            </span>
            {selectedSeat.hasPowerOutlet && (
              <span className="flex items-center gap-1 text-forest font-medium">
                <Zap className="w-3 h-3" /> Power Outlet
              </span>
            )}
          </div>
          <button
            onClick={() => toggleSeatOccupancy(selectedSeat.id)}
            className="px-3 py-1 bg-white hover:bg-surface-grey border border-surface-border text-surface-charcoal font-semibold rounded text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <MousePointerClick className="w-3 h-3 text-forest" />
            <span>Toggle Occupancy ({selectedSeat.status === 'AVAILABLE' ? 'Set Occupied' : 'Set Available'})</span>
          </button>
        </div>
      ) : (
        <div className="px-3 py-2 border-t border-surface-border bg-surface-grey/20 flex items-center justify-between text-[11px] text-surface-charcoal/60">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Click any seat above to inspect metadata and test occupancy toggle.</span>
          </div>
          <span className="font-mono">
            {floorSeats.filter((s) => s.status === 'OCCUPIED').length}/{floorSeats.length} Seats In Use on L{currentFloor?.floorNumber}
          </span>
        </div>
      )}

    </div>
  );
};

// ==============================================================================
// SUB-COMPONENT: SEAT TILE
// ==============================================================================

interface SeatTileProps {
  seat: Seat;
  isSelected: boolean;
  onSelect: () => void;
  onToggle: () => void;
}

const SeatTile: React.FC<SeatTileProps> = ({ 
  seat, 
  isSelected, 
  onSelect, 
  onToggle 
}) => {
  const isOccupied = seat.status === 'OCCUPIED';

  return (
    <div
      onClick={onSelect}
      onDoubleClick={onToggle}
      title={`${seat.seatCode} (${seat.status}) - ${seat.dataOrigin}\nClick to inspect · Double-click to toggle`}
      className={cn(
        "p-2 rounded border transition-all cursor-pointer select-none text-left flex flex-col justify-between h-[68px]",
        isSelected 
          ? "ring-2 ring-forest border-forest bg-forest/5" 
          : "hover:border-forest/50 bg-white",
        seat.isMonitoredByHardware
          ? "border-l-4 border-l-forest shadow-2xs"
          : "border-surface-border"
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-[11px] font-bold text-surface-charcoal truncate">
          {seat.seatCode.split('-').pop()}
        </span>
        <span
          className={cn(
            "w-2 h-2 rounded-full shrink-0",
            isOccupied ? "bg-[#D95757]" : "bg-[#39966A]"
          )}
        />
      </div>

      <div className="flex items-center justify-between mt-1 text-[10px]">
        <span
          className={cn(
            "font-semibold",
            isOccupied ? "text-[#D95757]" : "text-[#245B45]"
          )}
        >
          {isOccupied ? 'Occupied' : 'Available'}
        </span>

        {seat.isMonitoredByHardware ? (
          <span className="text-[9px] font-bold text-forest bg-forest/10 px-1 py-0.2 rounded border border-forest/20">
            HW
          </span>
        ) : (
          <span className="text-[9px] text-surface-charcoal/50">
            DEMO
          </span>
        )}
      </div>
    </div>
  );
};
