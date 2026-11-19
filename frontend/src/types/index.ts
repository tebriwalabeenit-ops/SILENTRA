/**
 * SILENTRA — Strict Domain & UI Type Definitions
 */

export type SeatStatus = 
  | 'AVAILABLE' 
  | 'OCCUPIED' 
  | 'SENSOR_OFFLINE' 
  | 'UNCONFIGURED' 
  | 'MAINTENANCE';

export type SeatType = 
  | 'DESK_CHAIR' 
  | 'CARREL' 
  | 'STANDING' 
  | 'SOFA';

export type ZoneType = 
  | 'QUIET' 
  | 'COLLABORATIVE' 
  | 'SILENT' 
  | 'GENERAL';

export type AlertSeverity = 
  | 'INFO' 
  | 'WARNING' 
  | 'CRITICAL';

export type AlertType = 
  | 'NOISE_VIOLATION' 
  | 'SENSOR_FAULT' 
  | 'OVER_CAPACITY' 
  | 'INACTIVITY_TIMEOUT';

export type DataOrigin = 
  | 'HARDWARE' 
  | 'DEMO' 
  | 'MANUAL';

export type ViewMode = 
  | '2d' 
  | '3d' 
  | 'heatmap';

export interface FloorGeometry {
  widthMeters: number;
  lengthMeters: number;
  walls: Array<{ x1: number; y1: number; x2: number; y2: number }>;
  doors: Array<{ x: number; y: number; width: number; angle: number }>;
}

export interface Zone {
  id: string;
  floorId: string;
  zoneCode: string;
  name: string;
  zoneType: ZoneType;
  noiseThresholdDb: number;
  currentDecibels: number;
  capacity: number;
  occupiedCount: number;
  isViolatingNoise: boolean;
}

export interface Seat {
  id: string;
  floorId: string;
  zoneId: string;
  zoneName: string;
  seatCode: string;
  coordX: number; // in meters (0 to width)
  coordY: number; // in meters (0 to length)
  rotationDeg: number;
  seatType: SeatType;
  hasPowerOutlet: boolean;
  status: SeatStatus;
  isMonitoredByHardware: boolean;
  isSimulated: boolean;
  dataOrigin: DataOrigin;
  lastStatusChange: string;
  allocatedStudentName?: string;
}

export interface Floor {
  id: string;
  floorNumber: number;
  name: string;
  widthMeters: number;
  lengthMeters: number;
  maxCapacity: number;
  currentHeadcount: number;
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  isActive: boolean;
}

export interface SensorAssignment {
  sensorType: string;
  pinOrChannel: string;
  targetDescription: string;
  status: 'HEALTHY' | 'WARNING' | 'ERROR';
}

export interface HardwareDevice {
  id: string;
  deviceCode: string;
  macAddress: string;
  ipAddress: string;
  firmwareVersion: string;
  floorId: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  wifiRssiDbm: number;
  freeHeapBytes: number;
  uptimeSeconds: number;
  lastSeenAt: string;
  assignedSensors: SensorAssignment[];
}

export interface RecentActivity {
  id: string;
  timestamp: string;
  type: 'ENTRY' | 'EXIT' | 'SEAT_OCCUPIED' | 'SEAT_VACATED' | 'NOISE_WARNING' | 'HEARTBEAT';
  entityId: string;
  description: string;
  dataOrigin: DataOrigin;
}

export interface KpiMetrics {
  peopleInside: number;
  maxBuildingCapacity: number;
  totalSeats: number;
  hardwareMonitoredSeats: number;
  demoSimulatedSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  offlineSeats: number;
  currentNoiseLevelDb: number;
  noiseThresholdLimitDb: number;
  noiseStatus: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
}
