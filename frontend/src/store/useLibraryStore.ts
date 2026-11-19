/**
 * SILENTRA — Central Reactive State Management (Zustand)
 * 
 * STRICT DATA INTEGRITY:
 * - Operates in DEMO mode when no verified hardware connection exists.
 * - Hardware-bound seats cannot be modified through UI clicks; their state
 *   is strictly driven by verified physical sensor telemetry.
 * - Simulation controls only operate on demo seats.
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
  SeatStatus,
  AppMode
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
  appMode: AppMode;
  
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
  simulateDemoSeatToggle: (seatId: string) => void;
  refreshData: () => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  // When no verified hardware connection exists, defaults to DEMO mode
  appMode: 'DEMO',
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

  // Not connected until live hardware socket / MQTT is verified
  isBrokerConnected: false,
  isEsp32Online: false,
  lastSyncTimestamp: new Date().toLocaleTimeString(),

  setSelectedFloorId: (floorId) => set({ selectedFloorId: floorId, selectedSeatId: null }),
  
  setViewMode: (viewMode) => set({ viewMode }),
  
  setFilterStatus: (filterStatus) => set({ filterStatus }),
  
  selectSeat: (seatId) => set({ selectedSeatId: seatId }),
  
  hoverSeat: (seatId) => set({ hoveredSeatId: seatId }),

  /**
   * Explicit simulation control for DEMO seats only.
   * Hardware-bound seats are strictly guarded and cannot be toggled manually.
   */
  simulateDemoSeatToggle: (seatId) => set((state) => {
    const targetSeat = state.seats.find((s) => s.id === seatId);
    if (!targetSeat) return state;

    // Strict guard: NEVER modify hardware-bound entities through UI simulation
    if (targetSeat.isMonitoredByHardware) {
      console.warn(`[SILENTRA Data Integrity] Seat ${targetSeat.seatCode} is hardware-bound. Manual simulation rejected.`);
      return state;
    }

    const nextStatus: SeatStatus = targetSeat.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
    const isNowOccupied = nextStatus === 'OCCUPIED';

    const updatedSeats = state.seats.map((seat) => {
      if (seat.id === seatId) {
        return {
          ...seat,
          status: nextStatus,
          lastStatusChange: new Date().toISOString(),
        };
      }
      return seat;
    });

    // Recompute seat KPIs
    const newOccupiedCount = updatedSeats.filter((s) => s.status === 'OCCUPIED').length;
    const newAvailableCount = updatedSeats.filter((s) => s.status === 'AVAILABLE').length;

    // Log explicit DEMO activity
    const newActivity: RecentActivity = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      type: isNowOccupied ? 'SEAT_OCCUPIED' : 'SEAT_VACATED',
      entityId: targetSeat.seatCode,
      description: `Simulated seat ${targetSeat.seatCode} state updated to ${nextStatus} [DEMO simulation]`,
      dataOrigin: 'DEMO',
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
        entityId: 'SYS-SYNC',
        description: 'Facility status refreshed [DEMO mode]',
        dataOrigin: 'DEMO',
      },
      ...state.activities.slice(0, 19),
    ],
  })),
}));
