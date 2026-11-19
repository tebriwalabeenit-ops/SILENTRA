/**
 * SILENTRA — Strict TypeScript Core Domain Interfaces
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
  | 'SIMULATION' 
  | 'MANUAL';

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
  boundaryPolygon: Array<{ x: number; y: number }>;
  noiseThresholdDb: number;
  capacity: number;
  currentDecibels?: number;
}

export interface Seat {
  id: string;
  floorId: string;
  zoneId: string;
  seatCode: string;
  coordX: number;
  coordY: number;
  rotationDeg: number;
  seatType: SeatType;
  hasPowerOutlet: boolean;
  status: SeatStatus;
  isMonitoredByHardware: boolean;
  isSimulated: boolean;
  lastOccupiedTimestamp?: string;
  allocatedStudentName?: string;
}

export interface Floor {
  id: string;
  floorNumber: number;
  name: string;
  widthMeters: number;
  lengthMeters: number;
  floorGeometry: FloorGeometry;
  maxCapacity: number;
  currentHeadcount: number;
  isActive: boolean;
}

export interface NoiseTelemetry {
  zoneId: string;
  floorId: string;
  decibelSpl: number;
  peakSpl: number;
  thresholdLimitDb: number;
  isViolation: boolean;
  timestamp: string;
  dataOrigin: DataOrigin;
}

export interface HeadcountSummary {
  floorId: string;
  totalInLibrary: number;
  floorOccupancy: number;
  floorCapacity: number;
  occupancyPercentage: number;
}

export interface Alert {
  id: string;
  alertType: AlertType;
  severity: AlertSeverity;
  floorId?: string;
  zoneId?: string;
  seatId?: string;
  message: string;
  isAcknowledged: boolean;
  createdAt: string;
}
