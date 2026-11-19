import React from 'react';
import { BarChart3 } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const AnalyticsPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Facility Utilization Analytics — Under Development"
      subtitle="Analyze longitudinal patron behavior, peak occupancy hours, and seating demand patterns."
      icon={BarChart3}
      targetPhase="Scheduled: Analytics & Reporting Phase"
      scheduledFeatures={[
        "Hourly and day-of-week occupancy heat matrices for library staffing and facility optimization.",
        "Directional gate arrival and departure velocity curves showing net library headcount trends.",
        "Zone popularity ranking and power-outlet utilization preferences.",
        "Historical noise violation frequency categorized by floor, zone, and time of day.",
        "Seat hoarding detection: identifying reserved seats left physically unoccupied."
      ]}
    />
  );
};
