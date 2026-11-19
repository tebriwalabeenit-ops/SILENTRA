/**
 * SILENTRA — Central Reactive State Management (Zustand)
 */

import { create } from 'zustand';
import { 
  Floor, 
  Zone, 
  Seat, 
  HardwareDevice, 
  RecentActivity, 
  KpiMetrics, 
  ViewMode, 
  SeatStatus 
} from '../types';
import { 
  INITIAL_FLOORS, 
  INITIAL_ZONES, 
  INITIAL_SEATS, 
  PHYSICAL_DEVICES, 
  INITIAL_ACTIVITIES, 
  INITIAL_KPIS 
} from '../data/mockData';

interface LibraryState {
  // Operational Mode
  appMode: 'HYBRID' | 'HARDWARE_ONLY' | 'SIMULATION_ONLY';
  
  // Navigation & Selection
  selectedFloorId: string;
  viewMode: ViewMode;
  filterStatus: 'ALL' | SeatStatus;
  selectedSeatId: string | null;
  hoveredSeatId: string | null;

  // Data Collections
  floors: Floor[];
  zones: Zone[];
  seats: Seat[];
  devices: HardwareDevice[];
  activities: RecentActivity[];
  kpis: KpiMetrics;

  // Connection State
  isBrokerConnected: boolean;
  isEsp32Online: boolean;
  lastSyncTimestamp: string;

  // Actions
  setSelectedFloorId: (floorId: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setFilterStatus: (status: 'ALL' | SeatStatus) => void;
  selectSeat: (seatId: string | null) => void;
  hoverSeat: (seatId: string | null) => void;
  toggleSeatOccupancy: (seatId: string) => void;
  refreshData: () => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  appMode: 'HYBRID',
  selectedFloorId: 'floor-1',
  viewMode: '2d',
  filterStatus: 'ALL',
  selectedSeatId: null,
  hoveredSeatId: null,

  floors: INITIAL_FLOORS,
  zones: INITIAL_ZONES,
  seats: INITIAL_SEATS,
  devices: PHYSICAL_DEVICES,
  activities: INITIAL_ACTIVITIES,
  kpis: INITIAL_KPIS,

  isBrokerConnected: true,
  isEsp32Online: true,
  lastSyncTimestamp: new Date().toLocaleTimeString(),

  setSelectedFloorId: (floorId) => set({ selectedFloorId: floorId, selectedSeatId: null }),
  
  setViewMode: (viewMode) => set({ viewMode }),
  
  setFilterStatus: (filterStatus) => set({ filterStatus }),
  
  selectSeat: (seatId) => set({ selectedSeatId: seatId }),
  
  hoverSeat: (seatId) => set({ hoveredSeatId: seatId }),

  toggleSeatOccupancy: (seatId) => set((state) => {
    const updatedSeats = state.seats.map((seat) => {
      if (seat.id === seatId) {
        const nextStatus: SeatStatus = seat.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
        return {
          ...seat,
          status: nextStatus,
          lastStatusChange: new Date().toISOString(),
        };
      }
      return seat;
    });

    const targetSeat = updatedSeats.find((s) => s.id === seatId);
    if (!targetSeat) return state;

    const isNowOccupied = targetSeat.status === 'OCCUPIED';

    // Update KPIs
    const newOccupiedCount = updatedSeats.filter((s) => s.status === 'OCCUPIED').length;
    const newAvailableCount = updatedSeats.filter((s) => s.status === 'AVAILABLE').length;

    // Create Activity Log Entry
    const newActivity: RecentActivity = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      type: isNowOccupied ? 'SEAT_OCCUPIED' : 'SEAT_VACATED',
      entityId: targetSeat.seatCode,
      description: targetSeat.isMonitoredByHardware
        ? `Hardware switch ${isNowOccupied ? 'closed' : 'opened'} on ${targetSeat.seatCode} (Real ESP32 Trigger)`
        : `Simulated seat state toggled to ${targetSeat.status} (Manual UI Test)`,
      dataOrigin: targetSeat.dataOrigin,
    };

    return {
      seats: updatedSeats,
      activities: [newActivity, ...state.activities.slice(0, 19)],
      kpis: {
        ...state.kpis,
        occupiedSeats: newOccupiedCount,
        availableSeats: newAvailableCount,
      },
      lastSyncTimestamp: new Date().toLocaleTimeString(),
    };
  }),

  refreshData: () => set((state) => ({
    lastSyncTimestamp: new Date().toLocaleTimeString(),
    activities: [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        type: 'HEARTBEAT',
        entityId: 'SYS-MONITOR',
        description: 'Facility status re-synchronized across 3 floors and 48 monitored points',
        dataOrigin: 'HARDWARE',
      },
      ...state.activities.slice(0, 19),
    ],
  })),
}));
