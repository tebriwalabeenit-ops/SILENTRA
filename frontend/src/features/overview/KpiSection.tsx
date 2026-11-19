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

  const occupancyRate = ((kpis.occupiedSeats / (kpis.totalSeats || 1)) * 100).toFixed(0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {/* 1. People Inside */}
      <KpiCard
        label="People Inside"
        value={kpis.peopleInside}
        subValue={`Building limit: ${kpis.maxBuildingCapacity} (${((kpis.peopleInside / kpis.maxBuildingCapacity) * 100).toFixed(0)}% load)`}
        icon={Users}
        trend={{ text: "Net +6/hr", isPositive: true }}
      />

      {/* 2. Total Monitored Seats */}
      <KpiCard
        label="Monitored Seats"
        value={kpis.totalSeats}
        subValue={`${kpis.hardwareMonitoredSeats} Hardware Target · ${kpis.demoSimulatedSeats} Demo`}
        icon={Armchair}
        trend={{ text: "3 Floors", isNeutral: true }}
      />

      {/* 3. Occupied Seats */}
      <KpiCard
        label="Occupied Seats"
        value={kpis.occupiedSeats}
        subValue={`${occupancyRate}% utilization (Demo baseline)`}
        icon={UserCheck}
        trend={{ text: "In Use", isNeutral: true }}
      />

      {/* 4. Available Seats */}
      <KpiCard
        label="Available Seats"
        value={kpis.availableSeats}
        subValue={`${kpis.availableSeats} desks ready for study`}
        icon={UserX}
        trend={{ text: "Ready", isPositive: true }}
      />

      {/* 5. Current Noise Level (EXPLICITLY LABELED ESTIMATED / DEMO) */}
      <KpiCard
        label="Acoustic Noise Level"
        value={`${kpis.currentNoiseLevelDb.toFixed(1)} dB`}
        subValue="Ambient Baseline (Limit: 55 dB)"
        icon={Volume2}
        badge={
          <span className="text-[9px] font-semibold text-surface-charcoal/70 bg-surface-grey px-1.5 py-0.5 rounded border border-surface-border uppercase">
            ESTIMATED
          </span>
        }
        trend={{ 
          text: "Quiet Baseline",
          isPositive: true
        }}
      />
    </div>
  );
};
