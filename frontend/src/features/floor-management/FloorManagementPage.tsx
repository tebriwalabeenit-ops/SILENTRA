import React from 'react';
import { Layers } from 'lucide-react';
import { SectionPlaceholder } from '../../components/common/SectionPlaceholder';

export const FloorManagementPage: React.FC = () => {
  return (
    <SectionPlaceholder
      title="Floor Configuration — Under Development"
      subtitle="Floor dimension calibration, architectural boundary definitions, and zone policy management scheduled for future phases."
      icon={Layers}
      targetPhase="Scheduled: Facility Configuration Phase"
      scheduledFeatures={[
        "Floor dimension setup and metric scaling (Width × Length in meters).",
        "Zone definition linking spatial regions to noise policies and study types.",
        "Portal gate mapping linking physical IR break-beam sensor channels to floor entrances.",
        "Capacity threshold configuration with automated fire-safety limits.",
        "Multi-floor activation and zone boundary polygon management."
      ]}
    />
  );
};
