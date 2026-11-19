import React from 'react';
import { KpiSection } from './KpiSection';
import { VisualizationPreview } from './VisualizationPreview';
import { OccupancySummary } from './OccupancySummary';
import { RecentActivityFeed } from './RecentActivityFeed';
import { SensorConnectivityCard } from './SensorConnectivityCard';

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-4">
      
      {/* 1. TOP DENSE KPI CARDS */}
      <KpiSection />

      {/* 2. MAIN WORKSPACE: LEFT 60% VISUALIZATION / RIGHT 40% SUMMARY PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT COLUMN: Library Spatial Visualization Preview */}
        <div className="lg:col-span-7 xl:col-span-8 h-full">
          <VisualizationPreview />
        </div>

        {/* RIGHT COLUMN: 3 Compact Enterprise Information Panels */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <OccupancySummary />
          <RecentActivityFeed />
          <SensorConnectivityCard />
        </div>

      </div>

    </div>
  );
};
