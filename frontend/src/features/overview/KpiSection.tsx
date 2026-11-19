import React from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { KpiCard } from '../../components/common/KpiCard';
import { 
  Users, 
  Armchair, 
  UserCheck, 
  UserX, 
  Volume2 
} from 'lucide-react';

export const KpiSection: React.FC = () => {
  const { kpis } = useLibraryStore();

  const occupancyRate = ((kpis.occupiedSeats / (kpis.totalSeats || 1)) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {/* 1. People Inside */}
      <KpiCard
        label="People Inside"
        value={kpis.peopleInside}
        subValue={`Capacity: ${kpis.maxBuildingCapacity} (${((kpis.peopleInside / kpis.maxBuildingCapacity) * 100).toFixed(0)}% building load)`}
        icon={Users}
        trend={{ text: "+6 in last hour", isPositive: true }}
      />

      {/* 2. Total Monitored Seats */}
      <KpiCard
        label="Total Monitored Seats"
        value={kpis.totalSeats}
        subValue={`${kpis.hardwareMonitoredSeats} Hardware (ESP32) · ${kpis.demoSimulatedSeats} Demo`}
        icon={Armchair}
        trend={{ text: "Across 3 Floors", isNeutral: true }}
      />

      {/* 3. Occupied Seats */}
      <KpiCard
        label="Occupied Seats"
        value={kpis.occupiedSeats}
        subValue={`${occupancyRate}% utilization rate`}
        icon={UserCheck}
        trend={{ text: "29 In Use", isNeutral: true }}
      />

      {/* 4. Available Seats */}
      <KpiCard
        label="Available Seats"
        value={kpis.availableSeats}
        subValue={`${kpis.availableSeats} desks ready for study`}
        icon={UserX}
        trend={{ text: "1 Hardware · 18 Demo", isPositive: true }}
      />

      {/* 5. Current Noise Level */}
      <KpiCard
        label="Acoustic Noise Level"
        value={`${kpis.currentNoiseLevelDb.toFixed(1)} dB`}
        subValue={`Limit: ${kpis.noiseThresholdLimitDb} dB (INMP441 I2S)`}
        icon={Volume2}
        trend={{ 
          text: kpis.noiseStatus === 'NORMAL' ? 'Optimal (Quiet)' : 'Threshold Warning',
          isPositive: kpis.noiseStatus === 'NORMAL'
        }}
      />
    </div>
  );
};
